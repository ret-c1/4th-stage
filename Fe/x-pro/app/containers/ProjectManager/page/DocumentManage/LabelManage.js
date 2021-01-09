import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Form, Table, Modal, Button, message, Popconfirm, Tabs, Input, Select } from 'antd';
import { searchParams } from '@utils/searchParams';
import { useHistory } from 'react-router-dom';
import { getLabelList, delLabel, updateLabel, addLabel } from './api';
const { TabPane } = Tabs;
const { Option } = Select;
const TabPaneHeader = [
    {
        name: '售前阶段',
        value: '9',
    },
    {
        name: '启动阶段',
        value: '10',
    },
    {
        name: '规划阶段',
        value: '11',
    },
    {
        name: '实施阶段',
        value: '12',
    },
    {
        name: '监管/管控阶段',
        value: '13',
    },
    {
        name: '收尾/验收阶段',
        value: '14',
    },
    {
        name: '维保阶段',
        value: '15',
    },
];
const LabelManage = () => {
    const { id, stage } = searchParams();
    const history = useHistory();
    // const [form] = Form.useForm();
    const [params, setParams] = useState({
        offset: 0,
        limit: 10,
        param: {
            type: parseInt(stage, 10) || 9,
        },
    });
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const reloadFetch = () => {
        getLabelList(params).then((res) => {
            if (res.code === 200) {
                setTotal(res.data.total);
                setDataSource(res.data.records);
            } else {
                message.error(res.message);
            }
        });
    };
    useEffect(() => {
        reloadFetch();
    }, [params]);
    // 切换页码
    const onChange = (page, pageSize) => {
        setParams({
            ...params,
            limit: pageSize,
            offset: (page - 1) * pageSize,
        });
    };

    // 切换pagesize
    const onShowSizeChange = (current, pageSize) => {
        setParams({
            ...params,
            limit: pageSize,
            offset: current * 0,
        });
    };
    const columns = [
        {
            title: '标签内容',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '创建人员',
            dataIndex: 'createUserName',
        },
        {
            title: '修改时间',
            dataIndex: 'lastUpdateTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '修改人员',
            dataIndex: 'updateUserName',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => labelModal(record)}>
                        编辑
                    </Button>
                    <Popconfirm
                        title="是否确认删除"
                        onConfirm={() => delRecord(record.id)}
                        okText="是"
                        cancelText="否"
                    >
                        <Button type="link">删除</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const delRecord = (ids) => {
        delLabel({ id: ids }).then((res) => {
            if (res.code === 200) {
                reloadFetch();
            } else {
                message.error(res.message);
            }
        });
    };
    // modal
    const [visible, setVisible] = useState(false);
    const [labelId, setLabelId] = useState(false);
    const labelModal = (records) => {
        if (records && records.id) {
            setLabelId(records.id);
            modalForm.setFieldsValue({
                type: stage,
                name: records.name,
            });
        } else {
            modalForm.setFieldsValue({
                type: stage,
            });
        }
        setVisible(true);
    };
    const [modalForm] = Form.useForm();

    const handleCancel = () => {
        modalForm.resetFields();
        setLabelId(false);
        setVisible(false);
    };

    const handleOk = () => {
        modalForm.validateFields().then((values) => {
            if (labelId) {
                updateLabel({ id: labelId, name: values.name }).then((res) => {
                    if (res.code === 200) {
                        reloadFetch();
                        handleCancel();
                        setLabelId(false);
                    } else {
                        message.error(res.message);
                    }
                });
            } else {
                addLabel(values).then((res) => {
                    if (res.code === 200) {
                        reloadFetch();
                        handleCancel();
                    } else {
                        message.error(res.message);
                    }
                });
            }
        });
    };
    return (
        <Tabs
            activeKey={stage}
            type="card"
            onChange={(v) => {
                setParams({
                    limit: 10,
                    offset: 0,
                    param: {
                        type: parseInt(v, 10),
                    },
                });
                history.push(`${history.location.pathname}?id=${id}&key=2&stage=${v}`);
            }}
        >
            {TabPaneHeader.map((item) => (
                <TabPane tab={item.name} key={item.value}>
                    <Button
                        type="primary"
                        style={{ marginBottom: '10px' }}
                        onClick={() => labelModal()}
                    >
                        新增标签
                    </Button>
                    <Table
                        size="small"
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            current: Number(params.offset) / Number(params.limit) + 1,
                            pageSize: params.limit,
                            onChange,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 50, 100],
                            onShowSizeChange,
                            total,
                            showTotal: () => `共 ${total} 条`,
                        }}
                        rowKey="id"
                    />
                    <Modal
                        title={`${labelId ? '编辑' : '新增'}标签`}
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="提交"
                        cancelText="取消"
                    >
                        <Form
                            form={modalForm}
                            name="modalFormSearch"
                            wrapperCol={{ span: 17 }}
                            labelCol={{ span: 7 }}
                        >
                            <Form.Item
                                label="标签类型"
                                name="type"
                                rules={[{ required: true, message: '请选择标签类型' }]}
                            >
                                <Select placeholder="请选择" disabled={labelId}>
                                    {TabPaneHeader.map((item1) => (
                                        <Option key={item1.value} value={item1.value}>
                                            {item1.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="标签内容"
                                name="name"
                                rules={[{ required: true, message: '请输入名称' }]}
                            >
                                <Input placeholder="请输入0/20字" maxLength={20} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </TabPane>
            ))}
        </Tabs>
    );
};
export default LabelManage;
