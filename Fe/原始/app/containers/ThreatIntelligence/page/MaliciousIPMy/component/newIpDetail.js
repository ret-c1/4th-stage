import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { searchParams } from '@utils/searchParams';
import moment from 'moment';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
    Row,
    Col,
    Form,
    Button,
    Table,
    Divider,
    Input,
    PageHeader,
    Card,
    Select,
    Tag,
    Popconfirm,
} from 'antd';
import styled from 'styled-components';
import AddMaliciousIPModal from './AddMaliciousIPModal';
import ImportModal from './ImportModal';
import { getMaliciousIPMyDetail, removeEvilIp, removeEvilIpBatch, getLabelsPage } from '../api';

const { Option } = Select;

const ScHeaderInfo = styled.span`
    background: rgba(230, 247, 255, 1);
    border-radius: 10px;
    font-size: 12px;
    border: 1px solid rgba(145, 213, 255, 1);
    color: rgba(24, 144, 255, 1);
    font-weight: 400;
`;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const NewIpDetail = () => {
    const { threatId } = searchParams();
    const [form] = Form.useForm();
    const [modalRecord, setModalRecord] = useState({});
    const tableParams = {
        limit: 10,
        offset: 0,
        param: {
            threatId,
        },
    };
    // 查询条件
    const [params, setParams] = useState({
        offset: 0,
        limit: 10,
        param: {
            threatId,
        },
    });
    // 全部恶意IP表格数据
    const [tableData, setTableData] = useState([]);
    // 全部恶意IP总数
    const [total, setTotal] = useState(0);
    const [expand, setExpand] = useState(false);
    // 新增模态框的是否显示
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 导入模态框的是否显示
    const [isImportModalVisible, setIsImportModalVisible] = useState(false);
    // 点击新增与编辑模态框的区别，数字1对应新增模态框，数字2对应编辑模态框
    const [IsAddorEdit, setIsAddorEdit] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const getMaliciousIPMyFunc = (info) => {
        getMaliciousIPMyDetail(info).then((res) => {
            if (res.code === 200) {
                setTableData(res.data.records);
                setTotal(res.data.total);
            }
        });
    };
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

    useEffect(() => {
        getMaliciousIPMyFunc(params);
    }, [params]);
    const [isShowTags, changeIsShowTags] = useState({});
    const columnsMyDetail = [
        {
            title: '攻击IP/域名',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: '攻击来源（地理位置）',
            dataIndex: 'geo',
            key: 'geo',
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            render: (text, record) => {
                const tags = [...(text || []), ...(record.tiTags || []), ...(record.hwTags || [])];
                return (
                    <>
                        {tags &&
                            tags.length > 5 &&
                            !isShowTags[`${record.value}`] &&
                            tags.slice(0, 5).map((item) => {
                                if (
                                    record.tiTags &&
                                    record.tiTags.length > 0 &&
                                    record.tiTags.includes(item)
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
                                (tags.length > 5 && isShowTags[`${record.value}`])) &&
                            tags.map((item) => {
                                if (
                                    record.tiTags &&
                                    record.tiTags.length > 0 &&
                                    record.tiTags.includes(item)
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
                );
            },
        },
        {
            title: '发布时间',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
    ];

    // 删除
    const remove = (value) => {
        removeEvilIp({ value, threatId }).then((res) => {
            if (res.code === 200) {
                getMaliciousIPMyFunc(tableParams);
            }
        });
    };
    // 批量删除
    const batchRemove = () => {
        removeEvilIpBatch({ values: selectedRowKeys, threatId }).then((res) => {
            if (res.code === 200) {
                getMaliciousIPMyFunc(tableParams);
            }
        });
    };
    const pageChange = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    const onShowSizeChange = (current, pageSize) => {
        setParams({ ...params, limit: pageSize, offset: 0 });
    };
    // 传递给子组件的回调函数，带回是否进行查询页面
    const checkFunc = () => {
        setParams(tableParams);
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
        if (selectedKeys && selectedKeys.length >= 0) {
            setSelectedRowKeys(selectedKeys);
        }
    };
    const onFinish = (values) => {
        setParams({
            limit: 10,
            offset: 0,
            param: {
                ...params.param,
                ...values,
            },
        });
    };
    const action = {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => (
            <>
                <Button
                    type="link"
                    onClick={() => {
                        setIsModalVisible(true);
                        setIsAddorEdit(2);
                        setModalRecord(record);
                    }}
                >
                    编辑
                </Button>
                <Popconfirm title="是否确认删除?" onConfirm={() => remove(record.value)}>
                    <Button type="link">删除</Button>
                </Popconfirm>
            </>
        ),
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
                <Form.Item label="情报标签" name="labels">
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
            <PageHeader
                ghost={false}
                title="文件名称"
                subTitle={<ScHeaderInfo>{total}个</ScHeaderInfo>}
            />
            <Card style={{ background: '#ffffff', marginTop: 20 }}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
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
                <Popconfirm title="是否批量删除?" onConfirm={batchRemove}>
                    <Button
                        disabled={selectedRowKeys.length === 0 || tableData.length === 0}
                        style={{ marginBottom: 12 }}
                    >
                        批量删除
                    </Button>
                </Popconfirm>
                <Table
                    rowKey="value"
                    columns={columnsMyDetail.concat(action)}
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
                />
            </Card>
            <AddMaliciousIPModal
                buttonState={IsAddorEdit}
                modalRecord={modalRecord}
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

// OperationPage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(NewIpDetail);
