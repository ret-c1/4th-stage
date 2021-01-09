import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form, Upload, Row, Col, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { ScModalSubmit } from '../../style';
import { getTaskList, taskAdd } from '../../api';

const CodeAuditList = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [tableList, setTableList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, changeLoading] = useState(false);
    const [isVisible, changeIsVisible] = useState(false);
    const [fileResName, setFileResName] = useState([]);
    const [params, changeParams] = useState({
        pageSize: 10,
        pageIndex: 1,
        param: {
            projectIds: [275],
        },
    });
    const getList = (searchParam) => {
        getTaskList({ ...params, param: { ...params.param, ...searchParam } }).then((res) => {
            if (res.code === 200) {
                changeLoading(false);
                setTotal(res.message.total);
                setTableList(res.message.rows);
            }
        });
    };
    useEffect(() => {
        getList();
    }, [params]);
    // 分页
    const pageChange = (page) => {
        changeParams({ ...params, pageIndex: page });
    };
    const onFinish = (values) => {
        const queryParams = {
            assetIds: ['2_1'],
            name: values.taskName,
            rightNow: 1,
            projectIds: [1],
            strategyId: 10,
            type: 2,
            notify: 0,
            reportFileName: fileResName,
            acctId: '',
            versionId: '',
            cycles: [],
            projectIdAdmin: '',
            strategyName: '',
            hosts: '',
            ipType: null,
            notifyInit: false,
            dateTimeNinit: '',
            retest: false,
            fileList: [],
            dynamicItem: [],
            ruleId: null,
        };
        taskAdd(queryParams).then((res) => {
            if (res.code === 200) {
                handleCancel();
                getList();
            }
        });
    };
    const handleChange = (info) => {
        info.fileList.forEach((file) => {
            if (file.response) {
                setFileResName(file.response.message.uploadFileName);
            }
        });
    };

    const handleCancel = () => {
        changeIsVisible(false);
    };
    const columns = [
        {
            title: '任务ID',
            dataIndex: 'taskId',
            key: 'taskId',
            sorter: (a, b) => a.taskId - b.taskId,
        },
        {
            title: '任务名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '发起人',
            dataIndex: 'createName',
            key: 'createName',
        },
        {
            title: '开始时间',
            key: 'startDate',
            dataIndex: 'startDate',
            width: 120,
        },
        {
            title: '结束时间',
            key: 'endDate',
            dataIndex: 'endDate',
            width: 120,
        },
        {
            title: '任务类别',
            key: 'ruleTypeString',
            dataIndex: 'ruleTypeString',
        },
        {
            title: '策略类型',
            key: 'taskStrategy',
            dataIndex: 'taskStrategy',
        },
        {
            title: '状态',
            key: 'statusString',
            dataIndex: 'statusString',
        },
        {
            title: '评审结果',
            key: 'result',
            dataIndex: 'result',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() =>
                        history.push({
                            pathname: '/codeaudit/loophole',
                            state: {
                                taskId: record.taskId,
                                name: record.name,
                            },
                        })
                    }
                >
                    查看漏洞
                </Button>
            ),
        },
    ];

    return (
        <Card style={{ margin: 30 }}>
            <div style={{ textAlign: 'right', marginBottom: '8px' }}>
                <Button onClick={() => changeIsVisible(true)}>上传报告</Button>
            </div>
            <Table
                columns={columns}
                tableLayout="fixed"
                loading={loading}
                rowKey="ruleId"
                dataSource={tableList || []}
                pagination={{
                    pageSize: 10,
                    onChange: pageChange,
                    total,
                    showTotal: () => `共 ${total} 条`,
                    showSizeChanger: false,
                }}
            />
            <Modal title="上传报告" visible={isVisible} onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    name="role"
                    autoComplete="off"
                    onFinish={onFinish}
                    style={{ paddingBottom: '30px' }}
                >
                    <Form.Item
                        label="任务名称"
                        name="taskName"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                        rules={[
                            {
                                required: true,
                                message: '请填写任务名称!',
                            },
                        ]}
                    >
                        <Input placeholder="请填写任务名称" />
                    </Form.Item>
                    <Row>
                        <Col span={19}>
                            <Form.Item
                                label="文件上传"
                                name="fileName"
                                labelCol={{ span: 6 }}
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择要导入的文件!',
                                    },
                                ]}
                            >
                                <Input placeholder="请选择文件" />
                            </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                            <Upload
                                name="file"
                                action="/DevSocOps/api/file/upload/report"
                                accept="xml"
                                headers={{
                                    Authorization: `Bearer ${sessionStorage.getItem('DevSocOps')}`,
                                }}
                                showUploadList={false}
                                onChange={handleChange}
                                beforeUpload={(file) =>
                                    form.setFieldsValue({ fileName: file && file.name })
                                }
                            >
                                <Button type="primary">选择文件</Button>
                            </Upload>
                        </Col>
                    </Row>
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
        </Card>
    );
};

export default CodeAuditList;
