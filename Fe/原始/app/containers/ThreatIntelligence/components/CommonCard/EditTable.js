import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Popconfirm, Tag, message, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { DownOutlined, UpOutlined, PlusOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import styled from 'styled-components';
import { getIpBase, getIpDetail, getIpsSave } from '../../api';
import logo360 from '../../assets/logo_360.png';
import logoAnheng from '../../assets/logo_anheng.png';
import logoQianxin from '../../assets/logo_qianxin.png';
import logoVT from '../../assets/logo_VT.png';
import logoWeibu from '../../assets/logo_weibu.png';
const color = {
    error: ['rgba(245, 34, 45, 0.06)', '#D9363F'], // 高
    warning: ['rgba(250, 173, 20, 0.09)', '#DE9A12'], // 低
    success: ['rgba(47, 194, 91, 0.08)', '#32B85A'], // 成功
    danger: ['rgba(24, 144, 255, 0.08)', '#1890FF'], // 中
};
const renderImg = (type) => {
    switch (type) {
        case '360威胁情报平台':
            return logo360;
        case '奇安信威胁情报平台':
            return logoQianxin;
        case 'virustotal':
            return logoVT;
        case '微步':
            return logoWeibu;
        default:
            return logoAnheng;
    }
};
const renderColor = (type, controlLight) => {
    if (controlLight && controlLight.name && controlLight.name === type) {
        return 'rgba(24, 144, 255, 1)';
    }
    return 'rgba(0, 0, 0, 0.45)';
};
const ScLogo = styled.span`
    background: url(${(props) => renderImg(props.type)}) no-repeat;
    background-size: 36px 36px;
    background-color: ${(props) => renderColor(props.type, props.controlLight)};
    border-radius: 36px;
    width: 36px;
    height: 36px;
`;
const EditableCell = ({
    editing,
    dataIndex,
    title,
    placeholder,
    disabled,
    record,
    index,
    children,
    ...restProps
}) => (
    <td
        className={restProps.className}
        colSpan={restProps.colSpan}
        rowSpan={restProps.rowSpan}
        style={restProps.style}
    >
        {editing ? (
            <Form.Item
                name={dataIndex !== 'key' && dataIndex}
                style={{
                    margin: 0,
                }}
            >
                <Input placeholder={placeholder} disabled={disabled} />
            </Form.Item>
        ) : (
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
            >
                {children}
            </Form.Item>
        )}
    </td>
);

EditableCell.propTypes = {
    editing: PropTypes.bool,
    dataIndex: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    record: PropTypes.object,
    index: PropTypes.object,
    children: PropTypes.array,
};
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const EditTable = (props) => {
    const { isEditBasic, detail, onCallBack } = props;
    const [form] = Form.useForm();
    const { stage } = searchParams();
    const editStatus = stage === 'add' || stage === 'edit' || isEditBasic;
    const [data, setData] = useState([]);
    const [count, setCount] = useState(detail && detail.ips ? detail.ips.length - 1 : 0);
    const [editingKey, setEditingKey] = useState('');
    const [tiDetailType, setTiDetailType] = useState([]);
    const [isShowTags, changeIsShowTags] = useState({});
    const [isTags, changeIsInnerShowTags] = useState({});
    const isEditing = (record) => record.key === editingKey;
    const [checkIndex, changeCheckIndex] = useState(0); // 当前展开详情的文件index
    const [controlLight, setControlLight] = useState('');
    const changeLight = (name) => {
        if (name) {
            setControlLight({ name });
        }
    };
    useEffect(() => {
        let initialData = [];
        if (detail && detail.ips && detail.ips.length > 0) {
            initialData = detail.ips;
            setCount(initialData.length);
            setData(
                initialData.map((item, index) => {
                    console.log('item', item);
                    return {
                        ...item,
                        key: index,
                    };
                }),
            );
        }
    }, [detail]);

    const edit = (record) => {
        form.setFieldsValue({
            value: '',
            geo: '',
            destIp: '',
            destSystem: '',
            labels: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = (key) => {
        const newData = [...data];
        setEditingKey('');
        setData(newData.filter((item) => item.key !== key));
    };
    const add = () => {
        const newData1 = {
            key: count + 1,
            value: '',
            geo: '',
            destIp: '',
            destSystem: '',
            labels: '',
        };
        setData([...data, newData1]);
        setCount(count + 1);
        setEditingKey(count + 1);
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            const ips = [];
            newData.forEach((item) => {
                if (item.key !== editingKey) {
                    ips.push(item.value);
                }
            });
            if (ips.length > 0 && ips.includes(row.value)) {
                message.warning(`${row.value}此ip已重复`);
            } else if (row.value.indexOf(';') !== -1 || row.value.indexOf(',') !== -1) {
                message.warning('只能填写一个攻击IP/域名');
            } else {
                getIpsSave({ value: row.value }).then((res) => {
                    if (res.code === 200 && res.data) {
                        if (index > -1) {
                            setTiDetailType([...tiDetailType, res.data.type]);
                            const item = newData[index];
                            newData.splice(index, 1, {
                                ...item,
                                ...row,
                                geo: res.data.geo || '',
                                labels: res.data.tags || [],
                                extensions: res.data.extensions || [],
                            });
                        } else {
                            newData.push({ ...row, ...res.data });
                        }
                        setData(newData);
                        setEditingKey('');
                    } else {
                        message.error(res.message);
                    }
                    // else if (index > -1) {
                    //     const item = newData[index];
                    //     newData.splice(index, 1, {
                    //         ...item,
                    //         ...row,
                    //     });
                    // } else {
                    //     newData.push({ ...row, ...res.data });
                    // }
                });
                onCallBack(newData);
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: '攻击IP/域名',
            dataIndex: 'value',
            key: 'value',
            editable: true,
            placeholder: '如：1.1.1.1',
            width: 200,
            render: (text, record, index) => (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        type="link"
                        onClick={() => {
                            window.open(`
                                    https://ti.x.com.cn/ip/${text}/ipThreatIntelligence
                                `);
                        }}
                    >
                        {text}
                    </Button>
                    {record.extensions &&
                        record.extensions.external_references &&
                        record.extensions.external_references.length > 0 &&
                        record.extensions.external_references.map((item1) => (
                            <div key={item1.source_name} style={{ width: 40 }}>
                                <Tooltip title={item1.source_name}>
                                    <Button
                                        type="link"
                                        onClick={() => window.open(item1.url, '_blank')}
                                    >
                                        <ScLogo
                                            type={item1.source_name}
                                            onMouseEnter={() => {
                                                changeCheckIndex(index);
                                                changeLight(item1.source_name);
                                            }}
                                            onMouseLeave={() => {
                                                changeCheckIndex(index);
                                                changeLight(null);
                                            }}
                                            controlLight={checkIndex === index && controlLight}
                                        />
                                    </Button>
                                </Tooltip>
                            </div>
                        ))}
                </div>
            ),
        },
        {
            title: '攻击来源（地理位置）',
            dataIndex: 'geo',
            key: 'geo',
            editable: true,
            placeholder: '根据IP自动生成',
            disabled: true,
        },
        {
            title: '目的IP/域名',
            dataIndex: 'destIp',
            key: 'destIp',
            editable: true,
            placeholder: '如：1.1.1.1;1.1.1.2英文分号隔开',
        },
        {
            title: '目的系统',
            key: 'destSystem',
            dataIndex: 'destSystem',
            editable: true,
            placeholder: '如：oa系统',
        },
        {
            title: '威胁情报标签',
            key: 'labels',
            dataIndex: 'labels',
            editable: false,
            placeholder: '如：oa系统',
            render: (text, record) => (
                <>
                    {text &&
                        text.length > 5 &&
                        !isShowTags[`${record.value}`] &&
                        text.slice(0, 5).map((item) => (
                            <Tag color="rgba(245,34,45,0.06)" key={item}>
                                <span style={{ color: '#D9363F' }}>{item}</span>
                            </Tag>
                        ))}
                    {text &&
                        (text.length <= 5 || (text.length > 5 && isShowTags[`${record.value}`])) &&
                        text.map((item) => (
                            <Tag color="rgba(245,34,45,0.06)" key={item}>
                                <span style={{ color: '#D9363F' }}>{item}</span>
                            </Tag>
                        ))}
                    {text && text.length > 5 && (
                        <Button
                            type="link"
                            onClick={() => {
                                changeIsShowTags({
                                    ...isShowTags,
                                    [`${record.value}`]: !isShowTags[`${record.value}`],
                                });
                            }}
                        >
                            {isShowTags[`${record.value}`] ? (
                                <>
                                    <UpOutlined />
                                    收起
                                </>
                            ) : (
                                <>
                                    <DownOutlined />
                                    展开
                                </>
                            )}
                        </Button>
                    )}
                </>
            ),
        },
    ];
    if (editStatus) {
        columns.push({
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            type="link"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </Button>
                        <Popconfirm title="是否确认删除?" onConfirm={() => cancel(record.key)}>
                            <Button type="link">删除</Button>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Button
                            type="link"
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >
                            编辑
                        </Button>
                        <Popconfirm title="是否确认删除?" onConfirm={() => cancel(record.key)}>
                            <Button type="link">删除</Button>
                        </Popconfirm>
                    </span>
                );
            },
        });
    }
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                placeholder: col.placeholder,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const [ipDetail, setIpDetail] = useState({});

    const getTabled = (record, expanded, page, pageSize) => {
        if (!expanded) {
            if (tiDetailType && tiDetailType[record.key - 1]) {
                getIpDetail({
                    type: tiDetailType && tiDetailType[record.key - 1],
                    value: record && record.value,
                    page,
                    size: pageSize,
                }).then((res) => {
                    if (res.code === 200) {
                        setIpDetail({ ...ipDetail, [`${record.value}`]: res.data });
                    }
                });
            } else {
                getIpBase({ value: record.value }).then((res1) => {
                    if (res1.code === 200) {
                        setTiDetailType([...tiDetailType, res1.data && res1.data.type]);
                        getIpDetail({
                            type: res1.data && res1.data.type,
                            value: record && record.value,
                            page,
                            size: pageSize,
                        }).then((res) => {
                            if (res.code === 200) {
                                setIpDetail({ ...ipDetail, [`${record.value}`]: res.data });
                            }
                        });
                    }
                });
            }
        } else {
            const newData = ipDetail;
            if (newData[`${record.value}`]) delete newData[`${record.value}`];
            setIpDetail(newData);
        }
    };
    const expandedRowRender = (record) => {
        const columnsIn = {};
        if (
            ipDetail &&
            ipDetail[`${record.value}`] &&
            ipDetail[`${record.value}`].table &&
            ipDetail[`${record.value}`].total &&
            ipDetail[`${record.value}`].total > 0
        ) {
            if (ipDetail[`${record.value}`].table.header) {
                const ipColumns = [];
                ipDetail[`${record.value}`].table.header.forEach((item) => {
                    ipColumns.push({
                        title: item.name,
                        dataIndex: item.type,
                        key: item.type,
                        render: (text, record1) => {
                            if (item.type === 'threat_type') {
                                return (
                                    <>
                                        {text &&
                                            text.length > 3 &&
                                            !isTags[`${record1.value}`] &&
                                            text.slice(0, 3).map((item1) => (
                                                <Tag
                                                    color={color[`${item1.grade}`][0]}
                                                    key={item1.name}
                                                >
                                                    <span
                                                        style={{
                                                            color: color[`${item1.grade}`][1],
                                                        }}
                                                    >
                                                        {item1.name}
                                                    </span>
                                                </Tag>
                                            ))}
                                        {text &&
                                            (text.length <= 3 ||
                                                (text.length > 3 && isTags[`${record1.value}`])) &&
                                            text.map((item1) => (
                                                <Tag
                                                    color={color[`${item1.grade}`][0]}
                                                    key={item1.name}
                                                >
                                                    <span
                                                        style={{
                                                            color: color[`${item1.grade}`][1],
                                                        }}
                                                    >
                                                        {item1.name}
                                                    </span>
                                                </Tag>
                                            ))}
                                        {text && text.length > 3 && (
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    changeIsInnerShowTags({
                                                        ...isTags,
                                                        [`${record1.value}`]: !isTags[
                                                            `${record1.value}`
                                                        ],
                                                    });
                                                }}
                                            >
                                                {isTags[`${record1.value}`] ? (
                                                    <>
                                                        <UpOutlined />
                                                        收起
                                                    </>
                                                ) : (
                                                    <>
                                                        <DownOutlined />
                                                        展开
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </>
                                );
                            }
                            if (item.type === 'extra_infor') {
                                return <>{text.text}</>;
                            }
                            if (item.type === 'grade') {
                                switch (text) {
                                    case 'error':
                                        return <Tag color="#F5222D">高危</Tag>;
                                    case 'warning':
                                        return <Tag color="#FAAD14">低危</Tag>;
                                    case 'danger':
                                        return <Tag color="#1890FF">中危</Tag>;
                                    case 'success':
                                        return <Tag color="#2FC25B">安全</Tag>;
                                    default:
                                        return null;
                                }
                            }
                            return text;
                        },
                    });
                });
                columnsIn[`${record.value}`] = ipColumns;
            }
            return (
                <Table
                    rowKey="x_ti_id"
                    footer={() => '1'}
                    columns={columnsIn[`${record.value}`]}
                    dataSource={ipDetail[`${record.value}`].table.body}
                    pagination={{
                        pageSizeOptions: pageOptions,
                        onShowSizeChange: (current, pageSize) =>
                            getTabled(record, false, current, pageSize),
                        showSizeChanger: true,
                        showTotal: () => `共 ${ipDetail[`${record.value}`].total} 条`,
                        total: ipDetail[`${record.value}`].total,
                        onChange: (page, pageSize) => getTabled(record, false, page, pageSize),
                    }}
                />
            );
        }
        // if (ipDetail[`${record.value}`] && ipDetail[`${record.value}`].total === 0) {
        //     return (
        //         <div style={{ textAlign: 'center' }}>
        //             <h2 style={{ color: 'red' }}>TI系统暂无此ip分析数据</h2>
        //         </div>
        //     );
        // }
        return (
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: 'red' }}>TI系统暂无此ip分析数据</h2>
            </div>
        );
    };
    return (
        <Form form={form} component={false}>
            <Form.Item label="恶意IP/域名信息" labelCol={{ span: 24 }}>
                {/* <Button>导入</Button> */}
                {/* <Button type="link">下载攻击ip/域名</Button> */}
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    rowKey="key"
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    expandIcon={(props1) => (
                        <Button
                            type="link"
                            onClick={(e) => {
                                e.stopPropagation();
                                getTabled(props1.record, props1.expanded, 1, 5);
                                props1.onExpand(props1.record, e);
                            }}
                        >
                            分析详情
                            {props1.expanded ? <UpOutlined /> : <DownOutlined />}
                        </Button>
                    )}
                    expandable={{
                        expandedRowRender,
                    }}
                />
                {editStatus && (
                    <Button
                        style={{
                            width: '100%',
                            marginTop: 16,
                            marginBottom: 8,
                        }}
                        type="dashed"
                        onClick={add}
                    >
                        <PlusOutlined />
                        添加
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};
EditTable.propTypes = {
    isEditBasic: PropTypes.bool,
    detail: PropTypes.object,
    onCallBack: PropTypes.func,
};
export default EditTable;
