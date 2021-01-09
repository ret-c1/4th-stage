import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    Row,
    Col,
    Divider,
    Table,
    Modal,
    Button,
    Tag,
    Select,
    message,
    Popconfirm,
} from 'antd';
import { searchParams } from '@utils/searchParams';
import {
    getPeopleList,
    addPeopleList,
    delPeopleList,
    userList,
    getRole,
    changeManger,
} from './api';
import { ScContent, ScForm, ScButton } from '../styled';
const { Option } = Select;
let selectedRowKey2 = [];
let selectedRow2 = [];
const columnsInner = [
    {
        title: '序号',
        dataIndex: 'id',
        width: 60,
        render: (text, record, index) => index + 1,
    },
    {
        title: '姓名',
        width: 100,
        dataIndex: 'name',
    },
    {
        title: '角色',
        dataIndex: 'roleNames',
    },
    {
        title: '子级部门',
        dataIndex: 'departName',
    },
    {
        title: '手机',
        dataIndex: 'phone',
    },
];

const SetMember = () => {
    const { id } = searchParams();
    const [form] = Form.useForm();
    const [roleLists, setRoleLists] = useState([]);
    useEffect(() => {
        getRole({
            limit: 1000,
            offset: 0,
            param: {},
        }).then((res) => {
            if (res.code === 200) {
                setRoleLists(res.data.records);
            }
        });
    }, []);
    const [params, setParams] = useState({
        offset: 0,
        limit: 10,
        param: {
            projectId: id,
        },
    });

    const [total, setTotal] = useState(0);
    const [tableData, setTableData] = useState([]);
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '角色',
            dataIndex: 'roleNames',
            render: (text) => (text && text.length > 1 ? text.join(',') : text),
        },
        {
            title: '是否项目经理',
            dataIndex: 'isManager',
        },
        {
            title: '子级部门',
            dataIndex: 'departName',
            render: (text) => text || '-',
        },
        {
            title: '供应商',
            dataIndex: 'outsourcingPartner',
            render: (text) => text || '-',
        },
        {
            title: '手机',
            dataIndex: 'phone',
            render: (text) => text || '-',
        },
        {
            title: '新增时间',
            dataIndex: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <>
                    {record.isManager === '否' && (
                        <Button
                            type="link"
                            onClick={() => {
                                delRecord(record.id);
                            }}
                        >
                            删除
                        </Button>
                    )}
                    {record.isManager === '否' && (
                        <Popconfirm
                            title="是否变更项目经理？变更后项目数据权限将迁移"
                            onConfirm={() => confirm({ projectId: id, userId: record.id })}
                            okText="是"
                            cancelText="否"
                        >
                            <Button type="link">变更</Button>
                        </Popconfirm>
                    )}
                </>
            ),
        },
    ];
    const peopleListFunc = () => {
        getPeopleList(params).then((res) => {
            if (res.code === 200) {
                setTableData(res.data.records);
                setTotal(res.data.total);
            }
        });
    };
    useEffect(() => {
        peopleListFunc();
    }, [params]);
    const confirm = (param) => {
        changeManger(param).then((res) => {
            if (res.code === 200) {
                peopleListFunc();
            } else {
                message.error(res.message);
            }
        });
    };

    const formFinish = () => {
        form.validateFields().then((values) => {
            setParams({ ...params, param: { ...params.param, ...values } });
        });
    };

    const pageChange = (page, pageSize) => {
        setParams({ ...params, limit: pageSize, offset: (page - 1) * pageSize });
    };

    const delRecord = (ids) => {
        delPeopleList({ projectId: id, userIds: [ids] }).then((res) => {
            if (res.code === 200) {
                peopleListFunc();
            } else {
                message.error(res.message);
            }
        });
    };
    // modal
    const [visible, setVisible] = useState(false);
    const memberModal = () => {
        setVisible(true);
    };
    const [modalForm] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [clear, changeClear] = useState(false);
    const [modalParams, setModalParams] = useState({
        offset: 0,
        limit: 10,
        param: {},
    });
    const [modalTotal, setModalTotal] = useState(0);
    const [modalTableData, setModalTableData] = useState([]);
    const handleCancel = () => {
        setSelectedRowKeys([]);
        selectedRowKey2 = [];
        selectedRow2 = [];
        changeClear(true);
        modalForm.resetFields();
        setModalParams({
            offset: 0,
            limit: 10,
            param: {},
        });
        setVisible(false);
    };
    const getUserList = () => {
        userList(modalParams).then((res) => {
            if (res.code === 200) {
                setModalTableData(res.data.records);
                setModalTotal(res.data.total);
            }
        });
    };
    useEffect(() => {
        if (visible) {
            getUserList();
        }
    }, [modalParams, visible]);
    const pageModalChange = (page, pageSize) => {
        setModalParams({ ...modalParams, limit: pageSize, offset: (page - 1) * pageSize });
    };
    const modalFinish = () => {
        modalForm.validateFields().then((values) => {
            setModalParams({ ...modalParams, param: { ...modalParams.param, ...values } });
        });
    };

    const handleOk = () => {
        addPeopleList({ projectId: id, userIds: selectedRowKey2 }).then((res) => {
            if (res.code === 200) {
                peopleListFunc();
                handleCancel();
            } else {
                message.error(res.message);
            }
        });
    };
    const rowSelection = {
        selectedRowKeys: clear ? [] : selectedRowKeys,
        onChange: (keys, rows) => {
            changeClear(false);
            selectedRow2.push(...rows);
            selectedRowKey2.push(...keys);
            setSelectedRowKeys(keys);
        },
    };
    return (
        <>
            <ScContent>
                <ScForm form={form} style={{ marginTop: '10px' }} name="formSearch">
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="姓名" name="name">
                                <Input placeholder="请输入" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="roleId" label="角色">
                                <Select placeholder="请选择" allowClear>
                                    {roleLists.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="手机" name="phone">
                                <Input placeholder="请输入" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <ScButton type="primary" onClick={formFinish}>
                                查询
                            </ScButton>
                            <Button
                                style={{ margin: '0 8px' }}
                                onClick={() => {
                                    form.resetFields();
                                    setParams({
                                        offset: 0,
                                        limit: 10,
                                        param: {
                                            projectId: id,
                                        },
                                    });
                                }}
                            >
                                重置
                            </Button>
                        </Col>
                    </Row>
                </ScForm>
                <Divider
                    orientation="left"
                    style={{
                        color: '#333',
                        fontWeight: 'normal',
                        margin: '-12px 0 12px 0',
                    }}
                />
                <Button type="primary" style={{ marginBottom: '10px' }} onClick={memberModal}>
                    添加成员
                </Button>
                <Table
                    size="small"
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
                    rowKey="id"
                />
                <Modal
                    title="添加成员"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="添加"
                    width={800}
                    cancelText="取消"
                >
                    <Form form={modalForm} name="modalFormSearch">
                        <Row jusitfy="center">
                            <Col
                                span={4}
                                style={{
                                    fontSize: 16,
                                    color: 'rgba(0, 0, 0, 0.85)',
                                }}
                            >
                                1
                            </Col>
                            <Col spam={1}>
                                <div
                                    style={{
                                        width: 30,
                                        height: 16,
                                        background: 'rgba(24, 144, 255, 0.1)',
                                        borderRadius: 40,
                                        fontSize: 12,
                                        color: 'rgba(24, 144, 255, 1)',
                                        textAlign: 'center',
                                    }}
                                >
                                    {modalTotal}
                                </div>
                            </Col>
                            <Col span={6} offset={1}>
                                <Form.Item label="姓名" name="name">
                                    <Input placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="手机号" name="phone">
                                    <Input placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <ScButton type="primary" onClick={modalFinish}>
                                    查询
                                </ScButton>
                                <Button
                                    style={{ margin: '0 8px' }}
                                    onClick={() => {
                                        modalForm.resetFields();
                                        setModalParams({
                                            offset: 0,
                                            limit: 10,
                                            param: {},
                                        });
                                    }}
                                >
                                    重置
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Divider style={{ margin: '-12px 0 12px 0' }} />
                    {selectedRowKey2.length > 0 && (
                        <Row style={{ marginBottom: '12px' }}>
                            <span>已选{selectedRowKey2.length}项：</span>
                            {selectedRow2.map((item) => (
                                <Tag closable key={item && item.id}>
                                    {item && item.name}
                                </Tag>
                            ))}
                            <Button
                                type="link"
                                style={{ marginTop: '-6px' }}
                                onClick={() => {
                                    setSelectedRowKeys([]);
                                    selectedRowKey2 = [];
                                    selectedRow2 = [];
                                    changeClear(true);
                                }}
                            >
                                清空
                            </Button>
                        </Row>
                    )}
                    <Table
                        size="small"
                        rowSelection={rowSelection}
                        columns={columnsInner}
                        dataSource={modalTableData}
                        pagination={{
                            defaultCurrent: 1,
                            total: modalTotal,
                            onChange: pageModalChange,
                        }}
                        rowKey="id"
                    />
                </Modal>
            </ScContent>
        </>
    );
};
export default SetMember;
