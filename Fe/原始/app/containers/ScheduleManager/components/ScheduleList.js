import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ScModalSubmit } from '../style';
import { dispatchResource, getDepartsTechPeople, getUserFromDepart } from '../api';
const { Option } = Select;
const dataList = [];
// 数组扁平
const generateList = (data) => {
    for (let i = 0; i < data.length; i += 1) {
        const node = data[i];
        const { id, name, type } = node;
        dataList.push({ id, name, type });
        if (node.children) {
            generateList(node.children);
        }
    }
};
const columns1 = [
    {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
    },
    {
        title: '预计开始时间',
        dataIndex: 'startScheduleDate',
        key: 'startScheduleDate',
        sorter: (a, b) => a.age - b.age,
        render: (text, record) => (
            <span>
                {moment(text).format('YYYY-MM-DD')}
                {record.startSchedulePeriod}
            </span>
        ),
    },
    {
        title: '预计结束时间',
        dataIndex: 'endScheduleDate',
        key: 'endScheduleDate',
        sorter: (a, b) => a.age - b.age,
        render: (text, record) => (
            <span>
                {moment(text).format('YYYY-MM-DD')}
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
    {
        title: '预计天数',
        dataIndex: 'requireDays',
        key: 'requireDays',
        sorter: (a, b) => a.requireDays - b.requireDays,
    },
    {
        title: '项目经理',
        dataIndex: 'managerName',
        key: 'managerName',
    },
    {
        title: '申请时间',
        dataIndex: 'applyTime',
        key: 'applyTime',
        sorter: (a, b) => a.applyTime - b.applyTime,
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: '排期人员',
        dataIndex: 'scheduleUserName',
        key: 'scheduleUserName',
    },
];
const columns2 = [
    {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
    },
    {
        title: '项目经理',
        dataIndex: 'managerName',
        key: 'managerName',
    },
    {
        title: '申请时间',
        dataIndex: 'applyTime',
        key: 'applyTime',
        sorter: (a, b) => a.applyTime - b.applyTime,
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: '调配时间',
        dataIndex: 'provisionTimes',
        key: 'provisionTimes',
        sorter: (a, b) => a.provisionTimes - b.provisionTimes,
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: '人数',
        dataIndex: 'requirePeoples',
        key: 'requirePeoples',
        sorter: (a, b) => a.requirePeoples - b.requirePeoples,
    },
    {
        title: '天数',
        dataIndex: 'requireDays',
        key: 'requireDays',
        sorter: (a, b) => a.requireDays - b.requireDays,
    },
    {
        title: '排期人员',
        dataIndex: 'scheduleUserName',
        key: 'scheduleUserName',
    },
];
const columns3 = [
    {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
    },
    {
        title: '项目经理',
        dataIndex: 'managerName',
        key: 'managerName',
    },
    {
        title: '申请时间',
        dataIndex: 'applyTime',
        key: 'applyTime',
        sorter: (a, b) => a.applyTime - b.applyTime,
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: '调配时间',
        dataIndex: 'provisionTimes',
        key: 'provisionTimes',
        sorter: (a, b) => a.provisionTimes - b.provisionTimes,
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: '结束时间',
        dataIndex: 'endTimes',
        key: 'endTimes',
        sorter: (a, b) => a.endTimes - b.endTimes,
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: '天数',
        dataIndex: 'requireDays',
        key: 'requireDays',
        sorter: (a, b) => a.requireDays - b.requireDays,
    },
    {
        title: '排期人员',
        dataIndex: 'scheduleUserName',
        key: 'scheduleUserName',
    },
];

const ScheduleList = (props) => {
    const { source, rxInfo, dataSource, pagination, getList } = props;
    const [form] = Form.useForm();
    const history = useHistory();
    const [isShowModal, changeShowModal] = useState(false);
    const [modalData, setModalData] = useState(false);
    const [departsList, setDepartsList] = useState([]);
    const [column, setColumn] = useState([]);
    const [techPeople, setTechPeople] = useState([]);

    const goResource = (record) => {
        if (source.indexOf('未转派') !== -1) {
            dispatchResource({
                id: record.id,
                scheduleDepartId: record.departId,
                uid: rxInfo && rxInfo.id,
            }).then((res) => {
                if (res.code === 200) {
                    history.push({
                        pathname: '/schedule/task',
                        state: {
                            ...record,
                            edit: true,
                        },
                    });
                }
            });
        } else {
            history.push({
                pathname: '/schedule/task',
                state: {
                    ...record,
                    edit: true,
                },
            });
        }
    };
    const unDispatch = [
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => goResource(record)}>
                        排期
                    </Button>
                    {source.indexOf('未转派') !== -1 && (
                        <Button type="link" onClick={() => showModal(record.id)}>
                            转派
                        </Button>
                    )}
                </>
            ),
        },
    ];
    const dispatch = [
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() =>
                        history.push({
                            pathname: '/schedule/task',
                            state: {
                                ...record,
                                vies: true,
                            },
                        })
                    }
                >
                    查看
                </Button>
            ),
        },
    ];

    useEffect(() => {
        if (source.indexOf('待排期') !== -1) {
            setColumn([...columns1, ...unDispatch]);
        }
        if (source.indexOf('已排期') !== -1) {
            setColumn([...columns2, ...dispatch]);
        }
        if (source.indexOf('已结束') !== -1) {
            setColumn([...columns3, ...dispatch]);
        }
    }, [source]);

    const showModal = (id) => {
        getUserFromDepart({ id: rxInfo && rxInfo.id }).then((res) => {
            if (res.code === 200) {
                generateList(res.data);
                setDepartsList(dataList);
                setModalData(id);
                changeShowModal(true);
            }
        });
    };

    const handleOk = () => {
        changeShowModal(false);
    };

    const handleCancel = () => {
        changeShowModal(false);
    };
    const onFinish = (values) => {
        dispatchResource({ ...values, id: modalData });
        handleCancel();
        getList();
    };

    const queryTeachPeople = (v) => {
        getDepartsTechPeople({ departId: v }).then((res) => {
            if (res.code === 200) {
                setTechPeople(res.data);
            }
        });
    };
    return (
        <>
            <Table rowKey="id" columns={column} dataSource={dataSource} pagination={pagination} />
            <Modal
                title="项目转派"
                visible={isShowModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    form={form}
                    name="application"
                    autoComplete="off"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10, offset: 2 }}
                    style={{ paddingBottom: '30px' }}
                >
                    <Form.Item
                        name="scheduleDepartId"
                        label="所属组"
                        rules={[
                            {
                                required: true,
                                message: '请选择所属组!',
                            },
                        ]}
                    >
                        <Select onChange={(v) => queryTeachPeople(v)}>
                            {departsList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}({item.type})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="uid"
                        label="负责人"
                        rules={[
                            {
                                required: true,
                                message: '请选择负责人!',
                            },
                        ]}
                    >
                        <Select>
                            {techPeople.map((item) => (
                                <Option value={item.uid} key={item.uid}>
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
                                转派
                            </Button>
                        </Form.Item>
                    </ScModalSubmit>
                </Form>
            </Modal>
        </>
    );
};
export default ScheduleList;

ScheduleList.propTypes = {
    source: PropTypes.string,
    dataSource: PropTypes.array,
    pagination: PropTypes.object,
    rxInfo: PropTypes.object,
    getList: PropTypes.func,
};
