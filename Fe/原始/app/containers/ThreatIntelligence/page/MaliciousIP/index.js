import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import {
    DownOutlined,
    UpOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined,
} from '@ant-design/icons';
import {
    Row,
    Col,
    Form,
    Button,
    Table,
    Tabs,
    Divider,
    Alert,
    Input,
    Tag,
    Select,
    Tooltip,
} from 'antd';
import styled from 'styled-components';
import { ScTableContent, ScBackground } from './styled';
import CircleDot from '../../components/CircleDot';
import AddMaliciousIPModal from './component/AddMaliciousIPModal';
import ImportModal from './component/ImportModal';
import { getMaliciousIP, getMaliciousSearchByIp, getMaliciousExport, getLabelsPage } from './api';
import logo360 from '../../assets/logo_360.png';
import logoAnheng from '../../assets/logo_anheng.png';
import logoQianxin from '../../assets/logo_qianxin.png';
import logoVT from '../../assets/logo_VT.png';
import logoWeibu from '../../assets/logo_weibu.png';

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
const { TabPane } = Tabs;
const { Option } = Select;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const MaliciousIPPage = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    // 新增模态框的是否显示
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 导入模态框的是否显示
    const [isImportModalVisible, setIsImportModalVisible] = useState(false);

    // 点击多选对应显示 “已选择个恶意IP”
    const [clearVisible, setClearVisible] = useState(false);
    // 点击多选对应显示已选择的数字
    const [clearNumber, setClearNumber] = useState(0);
    // 导出数量
    const [exportNumber, setExportNumber] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [isExportSuccess, changeIsExportSuccess] = useState(false);
    const [expand, setExpand] = useState(false);
    const [isShowInnerTags, changeIsShowInnerTags] = useState({});
    const tableParams = {
        offset: 0,
        limit: 10,
        param: {},
    };
    // 查询条件
    const [params, setParams] = useState({
        offset: 0,
        limit: 10,
        param: {},
    });
    // 全部恶意IP表格数据
    const [tableData, setTableData] = useState([]);
    // 全部恶意IP总数
    const [total, setTotal] = useState(0);
    const [isShowTags, changeIsShowTags] = useState({});
    const [checkIndex, changeCheckIndex] = useState(0); // 当前展开详情的文件index
    const [controlLight, setControlLight] = useState('');
    const changeLight = (name) => {
        if (name) {
            setControlLight({ name });
        }
    };
    const searchLabels = (key) => {
        form.setFieldsValue({ labels: [key] });
        setParams({
            ...params,
            param: { ...params.param, labels: [key] },
        });
    };
    const columns = [
        {
            title: '攻击IP/域名',
            dataIndex: 'value',
            key: 'value',
            sorter: true,
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
        },
        {
            title: 'ip标签',
            dataIndex: 'tags',
            key: 'tags',
            render: (text, record) => {
                const tags = [...(text || []), ...(record.tiTags || []), ...(record.hwTags || [])];
                return (
                    <>
                        {tags &&
                            tags.length > 5 &&
                            !isShowTags[`${record.ipId}`] &&
                            tags.slice(0, 5).map((item, index1) => {
                                if (
                                    record.tiTags &&
                                    record.tiTags.length > 0 &&
                                    record.tiTags.includes(item)
                                ) {
                                    return (
                                        <Tag
                                            color="green"
                                            key={index1.toString()}
                                            onClick={() => searchLabels(item)}
                                        >
                                            {item}
                                        </Tag>
                                    );
                                }
                                if (
                                    record.hwTags &&
                                    record.hwTags.length > 0 &&
                                    record.hwTags.includes(item)
                                ) {
                                    return (
                                        <Tag
                                            color="red"
                                            key={index1.toString()}
                                            onClick={() => searchLabels(item)}
                                        >
                                            {item}
                                        </Tag>
                                    );
                                }
                                return (
                                    <Tag
                                        color="blue"
                                        key={index1.toString()}
                                        onClick={() => searchLabels(item)}
                                    >
                                        {item}
                                    </Tag>
                                );
                            })}
                        {tags &&
                            (tags.length <= 5 ||
                                (tags.length > 5 && isShowTags[`${record.ipId}`])) &&
                            tags.map((item, index1) => {
                                if (
                                    record.tiTags &&
                                    record.tiTags.length > 0 &&
                                    record.tiTags.includes(item)
                                ) {
                                    return (
                                        <Tag
                                            color="green"
                                            key={index1.toString()}
                                            onClick={() => searchLabels(item)}
                                        >
                                            {item}
                                        </Tag>
                                    );
                                }
                                if (
                                    record.hwTags &&
                                    record.hwTags.length > 0 &&
                                    record.hwTags.includes(item)
                                ) {
                                    return (
                                        <Tag
                                            color="red"
                                            key={index1.toString()}
                                            onClick={() => searchLabels(item)}
                                        >
                                            {item}
                                        </Tag>
                                    );
                                }
                                return (
                                    <Tag
                                        color="blue"
                                        key={index1.toString()}
                                        onClick={() => searchLabels(item)}
                                    >
                                        {item}
                                    </Tag>
                                );
                            })}
                        {tags && tags.length > 5 && (
                            <Button
                                type="link"
                                style={{ fontSize: 12 }}
                                onClick={() => {
                                    changeIsShowTags({
                                        ...isShowTags,
                                        [`${record.ipId}`]: !isShowTags[`${record.ipId}`],
                                    });
                                }}
                            >
                                {isShowTags[`${record.ipId}`] ? (
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
            },
        },
        {
            title: '上报单位',
            key: 'from',
            dataIndex: 'from',
        },
        {
            title: '上报人数',
            key: 'reportUserCount',
            dataIndex: 'reportUserCount',
            sorter: true,
        },
    ];

    const [labelsData, setLabelsData] = useState({});
    const handleInputChange = (e) => {
        getLabelsPage({
            limit: 100,
            offset: 0,
            param: {
                name: e,
            },
        }).then((res) => {
            if (res.code === 200) {
                setLabelsData(res.data);
            }
        });
    };

    // 传递给子组件的回调函数，带回是否进行查询页面
    const checkFunc = () => {
        setParams(tableParams);
    };
    // 切换tab
    const tabChange = (value) => {
        if (value === '2') {
            history.push('/intelligence/maliciousip/use');
        }
    };

    // 列表多选对应的对象
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            onSelectChange(selectedKeys);
        },
    };
    // 列表多选发生改变时对应的函数
    const onSelectChange = (selectedKeys) => {
        changeIsExportSuccess(false);
        if (selectedKeys && selectedKeys.length >= 0) {
            setSelectedRowKeys(selectedKeys);
            setClearVisible(true);
            setClearNumber(selectedKeys.length);
            if (selectedKeys && selectedKeys.length === 0) {
                setClearVisible(false);
            }
        } else {
            setClearVisible(false);
        }
    };

    const formCheck = (value) => {
        setParams({ limit: 10, offset: 0, param: { ...params.param, ...value } });
    };
    const pageChange = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    const onShowSizeChange = (current, pageSize) => {
        setSelectedRowKeys([]);
        setClearVisible(false);
        setClearNumber(0);
        setParams({ ...params, limit: pageSize, offset: 0 });
    };
    //  排序
    const onChange = (pagination, filters, sorter) => {
        const newParams = params.param;
        if (sorter.order) {
            if (sorter.field === 'value') {
                delete newParams.countOrderType;
                setParams({
                    ...params,
                    offset: 0,
                    param: { ...newParams, timeOrderType: sorter.order === 'ascend' ? 1 : 2 },
                });
            }
            if (sorter.field === 'reportUserCount') {
                delete newParams.timeOrderType;
                setParams({
                    ...params,
                    offset: 0,
                    param: { ...newParams, countOrderType: sorter.order === 'ascend' ? 1 : 2 },
                });
            }
        } else {
            delete newParams.timeOrderType;
            delete newParams.countOrderType;
            setParams({
                ...params,
                offset: 0,
                param: newParams,
            });
        }
    };
    const getMaliciousIPFunc = (info) => {
        getMaliciousIP(info).then((res) => {
            if (res.code === 200) {
                setTableData(res.data.records);
                setTotal(res.data.total);
            }
        });
    };

    useEffect(() => {
        getMaliciousIPFunc(params);
    }, [params]);

    const [tableData1, setTableData1] = useState([]);

    const getTabled = (record, expanded) => {
        if (!expanded) {
            getMaliciousSearchByIp({
                ip: record.value,
                orderType: 2,
                reportUnit: record.from,
            }).then((res) => {
                if (res.code === 200) {
                    setTableData1({
                        ...tableData1,
                        [`${record.ipId}`]: res.data,
                    });
                }
            });
        } else {
            const newData = tableData1;
            if (newData[`${record.ipId}`]) {
                delete newData[`${record.ipId}`];
            }
            setTableData1(newData);
        }
    };

    const expandedRowRender = (record) => {
        const columnsInner = [
            {
                title: '发布时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                title: '情报名称',
                dataIndex: 'threatName',
                key: 'threatName',
                render: (text, record1) => (
                    <Button
                        type="link"
                        onClick={() =>
                            history.push(
                                `/intelligence/threat/${
                                    record1.threatType === 3 ? 'evendetail' : '0daydetail'
                                }?stage=detail&sourceType=0&id=${record1.threatId}`,
                            )
                        }
                    >
                        {text}
                    </Button>
                ),
            },
            {
                title: '发布来源',
                dataIndex: 'source',
                key: 'source',
                render: (text, record1) => {
                    if (text === '1') {
                        return (
                            <>
                                {text}
                                <Button
                                    type="link"
                                    onClick={() => {
                                        history.push({
                                            pathname: '/intelligence/maliciousipDetail',
                                            state: {
                                                tiTags: record1.tiTags,
                                                value: record.value,
                                            },
                                        });
                                    }}
                                >
                                    分析详情
                                </Button>
                            </>
                        );
                    }
                    return text;
                },
            },
            {
                title: '标签',
                dataIndex: 'tags',
                key: 'tags',
                render: (text, record1) => {
                    const tags = [
                        ...(text || []),
                        ...(record1.tiTags || []),
                        ...(record1.hwTags || []),
                    ];
                    return (
                        <>
                            {tags &&
                                tags.length > 5 &&
                                !isShowInnerTags[`${record.threatId}`] &&
                                tags.slice(0, 5).map((item) => {
                                    if (
                                        record1.tiTags &&
                                        record1.tiTags.length > 0 &&
                                        record1.tiTags.includes(item)
                                    ) {
                                        return (
                                            <Tag color="green" key={item}>
                                                {item}
                                            </Tag>
                                        );
                                    }
                                    if (
                                        record.hwTags &&
                                        record.hwTags.length > 0 &&
                                        record.hwTags.includes(item)
                                    ) {
                                        return (
                                            <Tag color="red" key={item}>
                                                {item}
                                            </Tag>
                                        );
                                    }
                                    return (
                                        <Tag color="blue" key={item}>
                                            {item}
                                        </Tag>
                                    );
                                })}
                            {tags &&
                                (tags.length <= 5 ||
                                    (tags.length > 5 && isShowInnerTags[`${record.threatId}`])) &&
                                tags.map((item) => {
                                    if (
                                        record1.tiTags &&
                                        record1.tiTags.length > 0 &&
                                        record1.tiTags.includes(item)
                                    ) {
                                        return (
                                            <Tag color="green" key={item}>
                                                {item}
                                            </Tag>
                                        );
                                    }
                                    if (
                                        record.hwTags &&
                                        record.hwTags.length > 0 &&
                                        record.hwTags.includes(item)
                                    ) {
                                        return (
                                            <Tag color="red" key={item}>
                                                {item}
                                            </Tag>
                                        );
                                    }
                                    return (
                                        <Tag color="blue" key={item}>
                                            {item}
                                        </Tag>
                                    );
                                })}
                            {tags && tags.length > 5 && (
                                <Button
                                    type="link"
                                    style={{ fontSize: 12 }}
                                    onClick={() => {
                                        changeIsShowInnerTags({
                                            ...isShowInnerTags,
                                            [`${record.threatId}`]: !isShowInnerTags[
                                                `${record.threatId}`
                                            ],
                                        });
                                    }}
                                >
                                    {isShowInnerTags[`${record.threatId}`] ? (
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
                },
            },
            {
                title: '审核状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record1) => {
                    if (
                        (record1.tags && record1.tags.length > 0) ||
                        (record1.hwTags && record1.hwTags.length > 0)
                    ) {
                        if (text === 0) {
                            return (
                                <div>
                                    <CircleDot
                                        size={8}
                                        style={{ marginRight: '8px' }}
                                        backgroundColor="#FAAD14"
                                    />
                                    <span>未提交</span>
                                </div>
                            );
                        }
                        if (text === 1) {
                            return (
                                <div>
                                    <CircleDot
                                        size={8}
                                        style={{ marginRight: '8px' }}
                                        backgroundColor="#FAAD14"
                                    />
                                    <span>待审核</span>
                                </div>
                            );
                        }
                        if (text === 2) {
                            return (
                                <div>
                                    <CircleDot
                                        size={8}
                                        style={{ marginRight: '8px' }}
                                        backgroundColor="#2FC25B"
                                    />
                                    <span>情报专家审核通过</span>
                                </div>
                            );
                        }
                        if (text === 3) {
                            return (
                                <div>
                                    <CircleDot
                                        size={8}
                                        style={{ marginRight: '8px' }}
                                        backgroundColor="#F5222D"
                                    />
                                    <span>不通过</span>
                                </div>
                            );
                        }
                        if (text === 4) {
                            return (
                                <div>
                                    <CircleDot
                                        size={8}
                                        style={{ marginRight: '8px' }}
                                        backgroundColor="#2FC25B"
                                    />
                                    <span>运营专家审核通过</span>
                                </div>
                            );
                        }
                    }
                    return null;
                },
            },
            {
                title: '发布状态',
                dataIndex: 'publishStatus',
                key: 'publishStatus',
                render: (text, record1) => {
                    if (
                        (record1.tags && record1.tags.length > 0) ||
                        (record1.hwTags && record1.hwTags.length > 0)
                    ) {
                        if (text === 0) {
                            return <span>未发布</span>;
                        }
                        if (text === 1) {
                            return <span style={{ color: '#475E99' }}>对内发布</span>;
                        }
                        if (text === 2) {
                            return <span style={{ color: '#2FC25B' }}>对外发布</span>;
                        }
                    }
                    return null;
                },
            },
        ];
        if (tableData1 && tableData1[`${record.ipId}`]) {
            return (
                <Table
                    columns={columnsInner}
                    dataSource={tableData1[`${record.ipId}`]}
                    pagination={false}
                    rowKey={(recordInner, indexInner) =>
                        `${record.ipId}${recordInner.threatId}${indexInner.toString()}`
                    }
                />
            );
        }
        return (
            <Table columns={columnsInner} dataSource={[]} pagination={false} rowKey="threatId" />
        );
    };
    // 点击导出对应的函数
    const exportIp = (type) => {
        getMaliciousExport({ ips: type === 'part' ? selectedRowKeys : [] }).then((res) => {
            if (res.code === 200) {
                const a = document.createElement('a');
                a.setAttribute('href', res.data);
                a.setAttribute('referrerpolicy', 'origin');
                a.click();
                changeIsExportSuccess(true);
                setExportNumber(type === 'part' ? selectedRowKeys.length : total);
            }
        });
    };
    const getFields = () => {
        const count = expand ? 3 : 2;
        const children = [
            <Col span={8}>
                <Form.Item label="攻击IP/域名" name="attackIpdomain">
                    <Input placeholder="如：1.1.1.1" />
                </Form.Item>
            </Col>,
            <Col span={8}>
                <Form.Item label="ip标签" name="labels">
                    <Select
                        showSearch
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请输入关键词"
                        onSearch={handleInputChange}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                    >
                        {labelsData &&
                            labelsData.records &&
                            labelsData.records.length > 0 &&
                            labelsData.records.map((item) => (
                                <Option key={item.id} value={item.name}>
                                    {item.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
            </Col>,
            <Col span={8}>
                <Form.Item label="攻击来源" name="geo">
                    <Input placeholder="请输入地理位置" />
                </Form.Item>
            </Col>,
        ];
        return children.slice(0, count);
    };
    return (
        <>
            <ScBackground />
            <Tabs activeKey="1" style={{ margin: '0 20px' }} onChange={tabChange}>
                <TabPane tab="全部" key="1" style={{ backgroundColor: 'rgba(240,242,245,1)' }}>
                    <ScTableContent>
                        <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                            onFinish={formCheck}
                            wrapperCol={{ span: 18 }}
                        >
                            <Row gutter={24}>
                                {getFields()}
                                <Col span={expand ? 24 : 8} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit">
                                        查询
                                    </Button>
                                    <Button
                                        style={{ margin: '0 8px' }}
                                        onClick={() => {
                                            form.resetFields();
                                            setParams(tableParams);
                                        }}
                                    >
                                        重置
                                    </Button>
                                    <Button
                                        type="link"
                                        style={{ fontSize: 12 }}
                                        onClick={() => setExpand(!expand)}
                                    >
                                        {expand ? (
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
                                </Col>
                            </Row>
                        </Form>
                        <Divider dashed />
                        <Row style={{ marginBottom: '10px' }}>
                            <Col span={4}>
                                <Button
                                    disabled={
                                        selectedRowKeys.length === 0 || tableData.length === 0
                                    }
                                    onClick={() => exportIp('part')}
                                >
                                    导出
                                </Button>
                                <Button
                                    disabled={tableData.length === 0}
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                        exportIp('all');
                                    }}
                                >
                                    导出全部
                                </Button>
                            </Col>
                            <Col span={20} style={{ textAlign: 'right' }}>
                                <Button onClick={() => setIsImportModalVisible(true)}>导入</Button>
                                <Button
                                    type="primary"
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => setIsModalVisible(true)}
                                >
                                    新增
                                </Button>
                            </Col>
                        </Row>
                        {clearVisible && (
                            <div style={{ position: 'relative' }}>
                                <Alert
                                    message={`已选择${clearNumber}个恶意IP`}
                                    type="info"
                                    showIcon
                                    onClose={() => setClearVisible(false)}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        zIndex: '1000',
                                        top: '4px',
                                        left: '140px',
                                    }}
                                >
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setSelectedRowKeys([]);
                                            setClearNumber(0);
                                            setClearVisible(false);
                                        }}
                                    >
                                        清空
                                    </Button>
                                </div>
                            </div>
                        )}
                        {isExportSuccess && (
                            <Alert
                                message={<>成功导出{exportNumber}个 恶意IP</>}
                                type="success"
                                closable
                                onClose={() => changeIsExportSuccess(false)}
                            />
                        )}
                        <Table
                            rowKey="ipId"
                            columns={columns}
                            onChange={onChange}
                            pagination={{
                                pageSizeOptions: pageOptions,
                                onShowSizeChange,
                                showSizeChanger: true,
                                showTotal: () => `共 ${total} 条`,
                                total,
                                current: params.offset / params.limit + 1,
                                onChange: pageChange,
                            }}
                            rowSelection={rowSelection}
                            dataSource={tableData}
                            expandIcon={(props1) => (
                                <Button
                                    type="link"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        getTabled(props1.record, props1.expanded);
                                        props1.onExpand(props1.record, e);
                                    }}
                                >
                                    {props1.expanded ? (
                                        <MinusSquareOutlined />
                                    ) : (
                                        <PlusSquareOutlined />
                                    )}
                                </Button>
                            )}
                            expandable={{ expandedRowRender }}
                        />
                    </ScTableContent>
                </TabPane>
                <TabPane
                    tab="我新增/导入的"
                    key="2"
                    style={{ backgroundColor: 'rgba(240,242,245,1)' }}
                />
            </Tabs>
            <AddMaliciousIPModal
                modalVisibleState={isModalVisible}
                setModalVisibleState={setIsModalVisible}
                checkFunc={checkFunc}
            />
            <ImportModal
                modalVisibleState={isImportModalVisible}
                setModalVisibleState={setIsImportModalVisible}
            />
        </>
    );
};

const withConnect = connect(null, null);

export default compose(withConnect, memo)(MaliciousIPPage);
