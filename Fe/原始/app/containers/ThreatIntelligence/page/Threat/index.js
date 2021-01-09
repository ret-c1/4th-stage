import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
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
    Input,
    // Tag,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import CommonTabs from '@containers/ThreatIntelligence/components/CommonTabs';
import { searchParams } from '@utils/searchParams';
import CircleDot from '../../components/CircleDot';
import { InvestModal } from './InvestModal';
import { ScCard } from '../../styled';
import { tabelallcheckAction, tabelcheckAction } from '../../action';
import { allProject, getThreatsManager, getEmployee, getThreatNames } from './api';

const { RangePicker } = DatePicker;
const { Option } = Select;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const ThreatPage = (props) => {
    const { rxChecked, rxTabelcheck, rxTabelcheckall, rxRole } = props;
    const [form] = Form.useForm();
    const history = useHistory();
    const { key } = searchParams();
    const [expand, setExpand] = useState(false);
    const [currentKey, setCurrentKey] = useState('1');
    const tableParams = {
        limit: 10,
        offset: 0,
        param: {
            state: parseInt(key || currentKey, 10),
        },
    };
    const [params, setParams] = useState({
        limit: 10,
        offset: 0,
        param: {
            state: parseInt(key || currentKey, 10),
        },
    });
    const [dataSource, setDataSource] = useState({});
    const [employeeList, setEmployeeList] = useState([]);

    // 排查模态框
    const [visible, setVisible] = useState(false);
    // 点击排查时：定义变量记录情报id
    const [processId, setProcessId] = useState(-1);
    const [projectParams] = useState({
        limit: 10,
        offset: 0,
        param: { status: 0, type: 0 },
    });
    const [allProjectData, setAllProjectData] = useState({});
    const [threatNames, setThreatNames] = useState([]);

    useEffect(() => {
        // 根据ulr记住当前tab
        const pathStr = history.location.pathname.split('/');
        if (pathStr[pathStr.length - 1] === 'wait') setCurrentKey('1');
        if (pathStr[pathStr.length - 1] === 'todo') setCurrentKey('2');
        if (pathStr[pathStr.length - 1] === 'done') setCurrentKey('3');
    }, []);

    useEffect(() => {
        getThreatsManager(params).then((res) => {
            if (res.code === 200) {
                setDataSource(res.data);
            } else {
                message.error(res.message);
            }
        });
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
    const pageChange = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    const onShowSizeChange = (current, pageSize) => {
        setParams({ ...params, limit: pageSize, offset: 0 });
    };
    const pageProjectChange = (page, pageSize) => {
        allProject({ ...projectParams, offset: (page - 1) * pageSize }).then((res) => {
            if (res.code === 200) {
                setAllProjectData(res.data);
            } else {
                message.error(res.message);
            }
        });
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const showInvest = (id) => {
        allProject(projectParams).then((res) => {
            if (res.code === 200) {
                setAllProjectData(res.data);
            } else {
                message.error(res.message);
            }
        });
        setVisible(true);
        setProcessId(id);
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
            title: '审核状态',
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
                            <span>情报专家不通过</span>
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
            title: '发布状态',
            dataIndex: 'publishStatus',
            key: 'publishStatus',
            render: (text) => {
                if (text === 0) {
                    return <span>未发布</span>;
                }
                if (text === 1) {
                    return <span style={{ color: '#475E99' }}>对内发布</span>;
                }
                if (text === 2) {
                    return <span style={{ color: '#2FC25B' }}>对外发布</span>;
                }
                return null;
            },
        },
        // {
        //     title: '上报时间',
        //     key: 'createTime',
        //     dataIndex: 'createTime',
        //     render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        // },
        {
            title: '发布时间',
            key: 'publishTime',
            dataIndex: 'publishTime',
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
            render: (text, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() =>
                            history.push(
                                `/intelligence/threat/${
                                    record.threatType === 3 ? 'evendetail' : '0daydetail'
                                }?stage=detail&sourceType=0&id=${record.id}`,
                            )
                        }
                    >
                        查看
                    </Button>
                    {rxRole.indexOf('项目经理') !== -1 && (
                        <Button type="link" onClick={() => showInvest(record.id)}>
                            排 查
                        </Button>
                    )}
                    {currentKey === '2' && (
                        <Button
                            type="link"
                            onClick={() => {
                                history.push(`/intelligence/threatDetail?threatId=${record.id}`);
                            }}
                        >
                            进度
                        </Button>
                    )}
                </>
            ),
        },
    ];

    const getFields = () => {
        const count = expand ? 7 : 2;
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
                <Form.Item name="status" label="审核状态">
                    <Select placeholder="请选择" allowClear>
                        <Option value={1}>待审核</Option>
                        <Option value={2}>情报专家通过</Option>
                        <Option value={3}>情报专家不通过</Option>
                        <Option value={4}>运营专家通过</Option>
                    </Select>
                </Form.Item>
            </Col>,
            <Col span={8} key="publishStatus">
                <Form.Item name="publishStatus" label="发布状态">
                    <Radio.Group>
                        <Radio value={2}>对外发布</Radio>
                        <Radio value={1}>对内发布</Radio>
                        <Radio value={0}>未发布</Radio>
                    </Radio.Group>
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
            <Col span={8} key="reportUnit">
                <Form.Item name="reportUnit" label="上报单位">
                    <Input />
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
        const formParams = values;
        const startCreateTime = values.createTime && values.createTime[0].valueOf();
        const endCreateTime = values.createTime && values.createTime[1].valueOf();
        delete formParams.createTime;
        setParams({
            limit: 10,
            offset: 0,
            param: {
                ...params.param,
                ...formParams,
                startCreateTime,
                endCreateTime,
            },
        });
    };

    return (
        <>
            <CommonTabs
                keys={currentKey}
                onCallback={(v) => {
                    setCurrentKey(v);
                    setParams({
                        limit: 10,
                        offset: 0,
                        param: { ...params.param, publishStatus: parseInt(v, 10) },
                    });
                }}
                tabList={[
                    { key: '1', name: '待排查', pageUrl: '/intelligence/threat/wait?key=1' },
                    { key: '2', name: '已派发', pageUrl: '/intelligence/threat/todo?key=2' },
                    { key: '3', name: '已排查', pageUrl: '/intelligence/threat/done?key=3' },
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
                        <Col span={expand ? 16 : 8} style={{ textAlign: 'right' }}>
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
            <InvestModal
                visible={visible}
                handleCancel={handleCancel}
                data={{
                    dataSource: allProjectData,
                    pagination: {
                        pageSizeOptions: pageOptions,
                        onShowSizeChange,
                        showSizeChanger: true,
                        showTotal: () => `共 ${allProjectData.total} 条`,
                        onChange: pageProjectChange,
                        total: allProjectData.total,
                    },
                }}
                rxChecked={rxChecked}
                rxTabelcheck={rxTabelcheck}
                rxTabelcheckall={rxTabelcheckall}
                id={processId}
            />
        </>
    );
};

ThreatPage.propTypes = {
    rxRole: PropTypes.array,
    rxChecked: PropTypes.array,
    rxTabelcheck: PropTypes.func,
    rxTabelcheckall: PropTypes.func,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
    rxChecked: state.intelligence.checked,
});

const mapDispatchToProps = (dispatch) => ({
    rxTabelcheck: (id) => {
        dispatch(tabelcheckAction(id));
    },
    rxTabelcheckall: (ids) => {
        dispatch(tabelallcheckAction(ids));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThreatPage);
