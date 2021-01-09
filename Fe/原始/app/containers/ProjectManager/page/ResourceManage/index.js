import React, { useState, useEffect } from 'react';
import {
    Table,
    Card,
    Tabs,
    Button,
    DatePicker,
    Select,
    Modal,
    Form,
    Input,
    Tag,
    Row,
    Col,
} from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { searchParams } from '@utils/searchParams';
import ResourceTabs from '@containers/ProjectManager/components/ResourceTabs';
import { ScSearch, ScSearchLeft, ScModalSubmit } from './style';
import {
    getAlreadyManagerList,
    getReadyManagerList,
    getOverManagerList,
    releaseResource,
    saveResource,
    getNameDepartsList,
} from './api';

const { TabPane } = Tabs;
const { Option } = Select;
// 通用columns
const columns = [
    {
        title: '申请时间',
        dataIndex: 'applyTime',
        key: 'applyTime',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        sorter: (a, b) => a.applyTime - b.applyTime,
    },
    {
        title: '预计起始时间',
        dataIndex: 'carryTime',
        key: 'carryTime',
        render: (text, record) => (
            <span>
                {moment(record.startScheduleDate).format('YYYY-MM-DD')}
                {record.startSchedulePeriod}~{moment(record.endScheduleDate).format('YYYY-MM-DD')}
                {record.endSchedulePeriod}
            </span>
        ),
    },
    {
        title: '预计人数',
        dataIndex: 'requirePeoples',
        key: 'requirePeoples',
        sorter: (a, b) => a.requirePeoples - b.requirePeoples,
    },
];

// 未排期 只可以查看计划
const noColumns = (history, projectId) => [
    ...columns,
    ...[
        {
            title: '备注',
            key: 'remark',
            dataIndex: 'remark',
        },
        {
            title: '申请部门',
            key: 'departName',
            dataIndex: 'departName',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() => {
                        history.push(
                            `/project/resourceTask?view=0&id=${record.id}&projectId=${projectId}&departId=${record.departId}&departName=${record.departName}&startDate=${record.startScheduleDate}&endDate=${record.endScheduleDate}`,
                        );
                    }}
                >
                    查看
                </Button>
            ),
        },
    ],
];
// 已结束 只可以查看计划
const finishColumns = (history, projectId) => [
    ...columns,
    ...[
        {
            title: '调配时间',
            key: 'deployTime',
            dataIndex: 'deployTime',
            render: (text) => moment(text).format('YYYY-MM-DD'),
            sorter: (a, b) => a.deployTime - b.deployTime,
        },
        {
            title: '参与人',
            key: 'participateNames',
            dataIndex: 'participateNames',
            render: (text) => {
                let isShowTag = false;
                if (text && text.split(',').length > 4) {
                    return (
                        <>
                            {text.split(',').map((item) => (
                                <Tag key={item}>{item}</Tag>
                            ))}
                            <Button
                                type="link"
                                onClick={() => {
                                    isShowTag = !isShowTag;
                                }}
                            >
                                展开
                            </Button>
                        </>
                    );
                }
                return text && text.split(',').map((item) => <Tag key={item}>{item}</Tag>);
            },
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() => {
                        history.push(
                            `/project/resourceTask?view=0&id=${record.id}&projectId=${projectId}&departId=${record.departId}&departName=${record.departName}&startDate=${record.startScheduleDate}&endDate=${record.endScheduleDate}`,
                        );
                    }}
                >
                    查看
                </Button>
            ),
        },
    ],
];

const changeSchedulePeriodTime = (period) => {
    switch (period) {
        case '上午':
            return 0;
        case '下午':
            return 12;
        default:
            return 24;
    }
};

const Resource = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [visible, changeVisible] = useState(false);
    const [activeKey, changeActiveKey] = useState('1');
    const [applyDate, changeApplyDate] = useState();
    const [departId, changeDepartId] = useState();
    const [tableList, setTableList] = useState({});
    const [nameDepartsList, changeNameDepartsList] = useState([]);
    const [params, changeParams] = useState({
        limit: 10,
        offset: 0,
        param: {
            projectId: parseInt(searchParams().id, 10),
        },
    });
    // 已排期 ，可编辑计划，释放资源
    const undoColumns = [
        ...columns,
        ...[
            {
                title: '调配时间',
                key: 'deployTime',
                dataIndex: 'deployTime',
                render: (text) => moment(text).format('YYYY-MM-DD'),
                sorter: (a, b) => a.deployTime - b.deployTime,
            },
            {
                title: '参与人',
                key: 'participateNames',
                dataIndex: 'participateNames',
                render: (text) => {
                    let isShowTag = false;
                    if (text && text.split(',').length > 4) {
                        return (
                            <>
                                {text.split(',').map((item) => (
                                    <Tag key={item}>{item}</Tag>
                                ))}
                                <Button
                                    type="link"
                                    onClick={() => {
                                        isShowTag = !isShowTag;
                                    }}
                                >
                                    展开
                                </Button>
                            </>
                        );
                    }
                    return text && text.split(',').map((item) => <Tag key={item}>{item}</Tag>);
                },
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
                                    `/project/resourceTask?edit=0&id=${record.id}&projectId=${params.param.projectId}&departId=${record.departId}&departName=${record.departName}&startDate=${record.startScheduleDate}&endDate=${record.endScheduleDate}`,
                                )
                            }
                        >
                            编辑计划
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                // 资源申请结束时间 moment().format('x')
                                releaseResource({ id: record.id }).then((res1) => {
                                    if (res1.code === 200) {
                                        setTableList([]);
                                        getAlreadyManagerList(params).then((res) => {
                                            if (res.code === 200) {
                                                setTableList({
                                                    records: res.data.records,
                                                    total: res.data.total,
                                                });
                                            }
                                        });
                                    }
                                });
                            }}
                        >
                            结束
                        </Button>
                    </>
                ),
            },
        ],
    ];
    const queryTable = () => {
        if (activeKey === '10') {
            setTableList([]);
            getAlreadyManagerList(params).then((res) => {
                if (res.code === 200) {
                    setTableList({
                        records: res.data.records,
                        total: res.data.total,
                    });
                }
            });
        }
        if (activeKey === '20') {
            setTableList([]);
            getReadyManagerList(params).then((res) => {
                if (res.code === 200) {
                    setTableList({
                        records: res.data.records,
                        total: res.data.total,
                    });
                }
            });
        }
        if (activeKey === '30') {
            setTableList([]);
            getOverManagerList(params).then((res) => {
                if (res.code === 200) {
                    setTableList({
                        records: res.data.records,
                        total: res.data.total,
                    });
                }
            });
        }
    };

    useEffect(() => {
        getNameDepartsList({}).then((res) => {
            if (res.code === 200) {
                changeNameDepartsList(res.data);
            }
        });
        getAlreadyManagerList(params).then((res) => {
            if (res.code === 200) {
                setTableList({
                    records: res.data.records,
                    total: res.data.total,
                });
            }
        });
    }, []);

    useEffect(() => {
        queryTable();
    }, [activeKey, params]);

    const showModal = () => {
        changeVisible(true);
    };

    const handleOk = () => {
        changeVisible(false);
    };

    const handleCancel = () => {
        changeVisible(false);
    };

    const pageChange = (page, pageSize) => {
        changeParams({ ...params, offset: (page - 1) * pageSize });
    };

    const onFinish = (values) => {
        const saveParams = values;
        saveParams.startScheduleDate = parseInt(values.startScheduleDate.format('x'), 10);
        saveParams.endScheduleDate = parseInt(values.endScheduleDate.format('x'), 10);
        saveParams.requirePeoples = parseInt(values.requirePeoples, 10);
        saveParams.requireDays = parseInt(values.requireDays, 10);
        saveParams.departId = parseInt(values.departId, 10);
        saveResource({ ...saveParams, projectId: params.param.projectId }).then((res) => {
            if (res.code === 200) {
                queryTable();
            }
        });
        handleOk();
    };

    const onValuesChange = (changedValues, allValues) => {
        // 资源申请
        const {
            startScheduleDate,
            endScheduleDate,
            startSchedulePeriod,
            endSchedulePeriod,
        } = allValues;
        if (
            changedValues.startScheduleDate ||
            changedValues.endScheduleDate ||
            changedValues.startSchedulePeriod ||
            changedValues.endSchedulePeriod
        ) {
            if (startScheduleDate && endScheduleDate && startSchedulePeriod && endSchedulePeriod) {
                const startTime = moment(startScheduleDate)
                    .add(changeSchedulePeriodTime(startSchedulePeriod), 'hours')
                    .format('x');
                const endTime = moment(endScheduleDate)
                    .add(changeSchedulePeriodTime(endSchedulePeriod), 'hours')
                    .format('x');
                form.setFieldsValue({
                    requireDays: ((endTime - startTime) / 86400000).toFixed(1),
                });
            }
        }
    };

    const operations = (
        <>
            <Button
                style={{ marginRight: 10 }}
                onClick={() =>
                    history.push(`/schedule/staff?manager=0&projectId=${params.param.projectId}`)
                }
            >
                人员排期
            </Button>
            <Button type="primary" onClick={showModal}>
                资源申请
            </Button>
        </>
    );

    const Search = () => (
        <ScSearch>
            <ScSearchLeft>
                <div>
                    申请时间：
                    <DatePicker
                        style={{ width: 224 }}
                        locale={locale}
                        onChange={(date) => changeApplyDate(parseInt(date.format('x'), 10))}
                    />
                </div>
                <div style={{ marginLeft: 10 }}>
                    申请部门：
                    <Select
                        allowClear
                        placeholder="请选择"
                        style={{ width: 224 }}
                        showSearch
                        value={departId}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        optionFilterProp="children"
                        onChange={(v) => changeDepartId(v)}
                    >
                        {nameDepartsList.map((item) => (
                            <Option value={item.id} key={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </ScSearchLeft>
            <Button
                type="primary"
                onClick={() => {
                    changeParams({
                        limit: 10,
                        offset: 0,
                        param: { ...params.param, applyDate, departId },
                    });
                }}
            >
                查询
            </Button>
        </ScSearch>
    );

    return (
        <>
            <ResourceTabs keys="2" />
            <Card style={{ margin: 30 }}>
                <Tabs
                    type="card"
                    onChange={(keys) => changeActiveKey(keys)}
                    tabBarExtraContent={operations}
                >
                    <TabPane tab="已排期" key="10">
                        {Search()}
                        <Table
                            rowKey="id"
                            columns={undoColumns}
                            dataSource={tableList.records || []}
                            pagination={{
                                pageSize: 10,
                                onChange: pageChange,
                                total: tableList.total || 0,
                                showSizeChanger: false,
                                showTotal: () => `共 ${tableList.total} 条`,
                            }}
                        />
                    </TabPane>
                    <TabPane tab="未排期" key="20">
                        {Search()}
                        <Table
                            rowKey="id"
                            columns={noColumns(history, params.param.projectId)}
                            dataSource={tableList.records || []}
                            pagination={{
                                pageSize: 10,
                                onChange: pageChange,
                                total: tableList.total || 0,
                                showSizeChanger: false,
                                showTotal: () => `共 ${tableList.total} 条`,
                            }}
                        />
                    </TabPane>
                    <TabPane tab="已结束" key="30">
                        {Search()}
                        <Table
                            rowKey="id"
                            columns={finishColumns(history, params.param.projectId)}
                            dataSource={tableList.records || []}
                            pagination={{
                                pageSize: 10,
                                onChange: pageChange,
                                total: tableList.total || 0,
                                showSizeChanger: false,
                                showTotal: () => `共 ${tableList.total} 条`,
                            }}
                        />
                    </TabPane>
                </Tabs>
            </Card>
            <Modal visible={visible} title="资源申请" onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    name="application"
                    autoComplete="off"
                    style={{ padding: '10px 0 30px 0' }}
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10, offset: 2 }}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        label="预计开始时间"
                        name="startScheduleDate"
                        rules={[
                            {
                                required: true,
                                message: '请选择预计开始时间!',
                            },
                        ]}
                    >
                        <Row justify="space-between">
                            <Col span={15}>
                                <Form.Item name="startScheduleDate">
                                    <DatePicker format="YYYY-MM-DD" locale={locale} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="startSchedulePeriod">
                                    <Select>
                                        <Option value="上午">上午</Option>
                                        <Option value="下午">下午</Option>
                                        <Option value="晚上">晚上</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="endScheduleDate"
                        label="预计结束时间"
                        rules={[
                            {
                                required: true,
                                message: '请选择预计结束时间!',
                            },
                        ]}
                    >
                        <Row justify="space-between">
                            <Col span={15}>
                                <Form.Item name="endScheduleDate">
                                    <DatePicker format="YYYY-MM-DD" locale={locale} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="endSchedulePeriod">
                                    <Select>
                                        <Option value="上午">上午</Option>
                                        <Option value="下午">下午</Option>
                                        <Option value="晚上">晚上</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="requireDays" label="预计天数">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="requirePeoples"
                        label="预计人数"
                        rules={[
                            {
                                required: true,
                                message: '请填写预计人数!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="remark" label="备注">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="departId"
                        label="申请部门"
                        rules={[
                            {
                                required: true,
                                message: '请选择申请部门!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                        >
                            {nameDepartsList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <ScModalSubmit>
                        <Form.Item wrapperCol={{ span: 12, offset: 17 }}>
                            <Button style={{ marginRight: '10px' }} onClick={handleCancel}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </ScModalSubmit>
                </Form>
            </Modal>
        </>
    );
};

export default Resource;
