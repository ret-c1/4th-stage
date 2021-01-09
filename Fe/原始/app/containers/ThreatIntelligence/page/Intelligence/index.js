import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Form,
    Row,
    Col,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    message,
    Select,
    Popconfirm,
    Input,
    // Tag,
} from 'antd';
import CommonTabs from '@containers/ThreatIntelligence/components/CommonTabs';
import { searchParams } from '@utils/searchParams';
import moment from 'moment';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import CircleDot from '../../components/CircleDot';
import { ScCard } from '../../styled';
import { getThreatsEngineer, getEmployee, getThreatNames, removeThreat } from './api';
const { RangePicker } = DatePicker;
const { Option } = Select;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const IntelligencePage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { key } = searchParams();
    const [expand, setExpand] = useState(false);
    const [currentKey, setCurrentKey] = useState('0');
    const tableParams = {
        limit: 10,
        offset: 0,
        param: {
            publishStatus: parseInt(key || currentKey, 10),
        },
    };
    const [params, setParams] = useState({
        limit: 10,
        offset: 0,
        param: {
            publishStatus: parseInt(key || currentKey, 10),
        },
    });
    const [dataSource, setDataSource] = useState({});
    const [employeeList, setEmployeeList] = useState([]);
    const [threatNames, setThreatNames] = useState([]);
    const getList = () => {
        getThreatsEngineer(params).then((res) => {
            if (res.code === 200) {
                setDataSource(res.data);
            } else {
                message.error(res.message);
            }
        });
    };
    useEffect(() => {
        getList();
    }, [params]);

    const handleSearch = (val) => {
        getEmployee({ name: val }).then((res) => {
            if (res.code === 200) {
                setEmployeeList(res.data);
            }
        });
    };
    const handleSearchName = (val) => {
        getThreatNames({ name: val }).then((res) => {
            if (res.code === 200) {
                setThreatNames(res.data);
            }
        });
    };
    const remove = (id) => {
        removeThreat({ id }).then((res) => {
            if (res.code === 200) {
                getList();
            }
        });
    };
    // const [isShowTags, changeIsShowTags] = useState({});
    const columns = [
        {
            title: '情报类型',
            dataIndex: 'threatType',
            key: 'threatType',
            render: (text) => (
                <>
                    {text === 2 && '0/N day'}
                    {text === 3 && '安全事件'}
                </>
            ),
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: (text) => (
                <Tooltip title={text} placement="topLeft">
                    {text}
                </Tooltip>
            ),
        },
        // {
        //     title: '情报来源',
        //     dataIndex: 'source',
        //     key: 'source',
        // },
        // {
        //     title: '情报标签',
        //     dataIndex: 'labels',
        //     key: 'labels',
        //     render: (text, record) => (
        //         <>
        //             {text &&
        //                 text.length > 5 &&
        //                 !isShowTags[`${record.id}`] &&
        //                 text.slice(0, 5).map((item) => (
        //                     <Tag color="blue" key={item}>
        //                         {item}
        //                     </Tag>
        //                 ))}
        //             {text &&
        //                 (text.length <= 5 || (text.length > 5 && isShowTags[`${record.id}`])) &&
        //                 text.map((item) => (
        //                     <Tag color="blue" key={item}>
        //                         {item}
        //                     </Tag>
        //                 ))}
        //             {text && text.length > 5 && (
        //                 <Button
        //                     type="link"
        //                     style={{ fontSize: 12 }}
        //                     onClick={() => {
        //                         changeIsShowTags({
        //                             ...isShowTags,
        //                             [`${record.id}`]: !isShowTags[`${record.id}`],
        //                         });
        //                     }}
        //                 >
        //                     共{text.length}个
        //                     {isShowTags[`${record.id}`] ? (
        //                         <>
        //                             <UpOutlined />
        //                             收起
        //                         </>
        //                     ) : (
        //                         <>
        //                             <DownOutlined />
        //                             展开
        //                         </>
        //                     )}
        //                 </Button>
        //             )}
        //         </>
        //     ),
        // },
        {
            title: '情报状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
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
                return null;
            },
        },
        {
            // 回滚代码
            title: '待办人员',
            key: 'dealUser',
            dataIndex: 'dealUser',
        },
        {
            title: '上报时间',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '上报单位',
            key: 'reportUnit',
            dataIndex: 'reportUnit',
        },
        {
            title: '上报人',
            key: 'userName',
            dataIndex: 'userName',
        },
        {
            title: '操作',
            key: 'action',
            width: 220,
            render: (text, record) => (
                <>
                    {record.status < 2 && record.publishStatus === 0 && (
                        <Popconfirm title="是否确认删除?" onConfirm={() => remove(record.id)}>
                            <Button type="link">删除</Button>
                        </Popconfirm>
                    )}
                    <Button
                        type="link"
                        onClick={() => {
                            if (record.status > 0) {
                                history.push(
                                    `/intelligence/list/${
                                        record.threatType === 3 ? 'evendetail' : '0daydetail'
                                    }?stage=detail&sourceType=0&id=${record.id}`,
                                );
                            } else {
                                history.push(
                                    `/intelligence/list/${
                                        record.threatType === 3 ? 'createeven' : 'create0day'
                                    }?stage=detail&sourceType=0&id=${record.id}&publishStatus=${
                                        record.publishStatus
                                    }`,
                                );
                            }
                        }}
                    >
                        查看
                    </Button>
                    {(record.status === 0 || record.status === 3) && (
                        <Button
                            type="link"
                            onClick={() =>
                                history.push(
                                    `/intelligence/list/${
                                        record.threatType === 3 ? 'createeven' : 'create0day'
                                    }?stage=edit&sourceType=0&id=${record.id}&publishStatus=${
                                        record.publishStatus
                                    }`,
                                )
                            }
                        >
                            编辑
                        </Button>
                    )}
                </>
            ),
        },
    ];

    const getFields = () => {
        const count = expand ? 6 : 2;
        const children = [
            <Col span={8} key="name">
                <Form.Item name="name" label="名称">
                    <Select
                        allowClear
                        showSearch
                        placeholder="请输入"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearchName}
                        notFoundContent={null}
                    >
                        {threatNames.map((item) => (
                            <Option key={item} value={item}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>,
            <Col span={8} key="status">
                <Form.Item name="status" label="情报状态">
                    <Select placeholder="请选择" allowClear>
                        <Option value={0}>未提交</Option>
                        <Option value={1}>待审核</Option>
                        <Option value={2}>情报专家通过</Option>
                        <Option value={3}>情报专家不通过</Option>
                        <Option value={4}>运营专家通过</Option>
                    </Select>
                </Form.Item>
            </Col>,
            <Col span={8} key="reportUnit">
                <Form.Item name="reportUnit" label="上报单位">
                    <Input />
                </Form.Item>
            </Col>,
            <Col span={8} key="threatType">
                <Form.Item name="threatType" label="情报类型">
                    <Radio.Group>
                        <Radio value={2}>0/N day</Radio>
                        <Radio value={3}>安全事件</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>,
            <Col span={8} key="createTime">
                <Form.Item name="createTime" label="上报时间">
                    <RangePicker showTime style={{ width: '90%' }} allowClear />
                </Form.Item>
            </Col>,

            <Col span={8} key="userId">
                <Form.Item name="userId" label="上报人">
                    <Select
                        allowClear
                        showSearch
                        placeholder="请输入"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearch}
                        notFoundContent={null}
                    >
                        {employeeList.map((item) => (
                            <Option key={item.value} value={item.value}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>,
        ];
        return children.slice(0, count);
    };

    const onFinish = (values) => {
        const val = values;
        const format = {
            ...params.param,
            ...val,
            startCreateTime:
                val.createTime && val.createTime.length > 0 && val.createTime[0].valueOf(),
            endCreateTime:
                val.createTime && val.createTime.length > 0 && val.createTime[1].valueOf(),
        };
        delete format.createTime;
        setParams({
            limit: 10,
            offset: 0,
            param: { ...format },
        });
    };
    const pageChange = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    const onShowSizeChange = (current, pageSize) => {
        setParams({ ...params, limit: pageSize, offset: 0 });
    };
    return (
        <>
            <CommonTabs
                keys={key || currentKey}
                onCallback={(v) => {
                    setCurrentKey(v);
                    setParams({
                        limit: 10,
                        offset: 0,
                        param: { ...params.param, publishStatus: parseInt(v, 10) },
                    });
                }}
                tabList={[
                    { key: '0', name: '未发布', pageUrl: '/intelligence/list?key=0' },
                    { key: '1', name: '仅对内', pageUrl: '/intelligence/list?key=1' },
                    { key: '2', name: '可对外', pageUrl: '/intelligence/list?key=2' },
                ]}
                rightNode={
                    <Button
                        type="primary"
                        onClick={() => history.push('/intelligence/list/create0day?stage=add')}
                    >
                        情报上报
                    </Button>
                }
            />
            <ScCard>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                    onValuesChange={(changedValues, allValues) => {
                        if (!changedValues[Object.keys(changedValues)[0]]) {
                            onFinish(allValues);
                        }
                    }}
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
                <Table
                    rowKey="id"
                    style={{ marginTop: '16px' }}
                    columns={columns}
                    dataSource={dataSource.records || []}
                    pagination={{
                        pageSizeOptions: pageOptions,
                        onShowSizeChange,
                        showSizeChanger: true,
                        showTotal: () => `共 ${dataSource.total} 条`,
                        current: params.offset / params.limit + 1,
                        onChange: pageChange,
                        total: dataSource.total,
                    }}
                />
            </ScCard>
        </>
    );
};

// IntelligencePage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(IntelligencePage);
