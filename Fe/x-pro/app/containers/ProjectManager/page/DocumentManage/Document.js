import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {
    Form,
    Input,
    Row,
    Col,
    Divider,
    Table,
    Button,
    Tag,
    message,
    Popconfirm,
    Tabs,
    DatePicker,
    Modal,
    Select,
    Steps,
    Result,
    Upload,
    Alert,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import { exportFile } from '@utils/downloadExport';
import { getFileList, delFile, getFileLabelList, uploadFile, addFile } from './api';
import { ScForm, ScButton } from '../styled';
const { CheckableTag } = Tag;
const { TabPane } = Tabs;
const { Option } = Select;
const { Step } = Steps;
const { Dragger } = Upload;

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
const Document = () => {
    const { id, stage, projectName } = searchParams();
    const history = useHistory();
    const [form] = Form.useForm();
    const [params, setParams] = useState({
        offset: 0,
        limit: 10,
        param: {
            projectId: parseInt(id, 10),
            labels: [],
            stage: parseInt(stage, 10) || 9,
        },
    });
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const reloadFetch = () => {
        getFileList(params).then((res) => {
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
    const [tagsData, setLabelTags] = useState([]);
    useEffect(() => {
        getFileLabelList({
            limit: 20,
            offset: 0,
            param: {
                type: parseInt(stage, 10),
            },
        }).then((res) => {
            if (res.code === 200) {
                setLabelTags(res.data.records);
            } else {
                message.error(res.message);
            }
        });
    }, [stage]);
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
            title: '文件名',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 200,
            ellipsis: true,
        },
        {
            title: '提交人',
            dataIndex: 'userName',
        },
        {
            title: '上传时间',
            dataIndex: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '文件类型',
            dataIndex: 'label',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() =>
                            exportFile({
                                url: record.url,
                                method: 'GET',
                                data: '',
                                name: record.name,
                            })
                        }
                    >
                        下载
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

    const formFinish = () => {
        form.validateFields().then((values) => {
            setParams({
                ...params,
                param: {
                    ...params.param,
                    ...values,
                    createTime: values.createTime && moment(values.createTime).valueOf(),
                },
            });
        });
    };

    const delRecord = (ids) => {
        delFile({ id: ids }).then((res) => {
            if (res.code === 200) {
                reloadFetch();
            } else {
                message.error(res.message);
            }
        });
    };
    // 标签选择
    const [selectedTags, setSelectedTags] = useState([]);
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        setParams({
            ...params,
            param: {
                ...params.param,
                labels: nextSelectedTags,
            },
        });
        setSelectedTags(nextSelectedTags);
    };
    // table选择
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedRowKey) => {
        setSelectedRowKeys(selectedRowKey);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const exportFiles = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请选择文档');
        } else if (selectedRowKeys.length > 10) {
            message.error('只允许导出10条数据!');
        } else {
            exportFile({
                url: `/api/file/download?ids=${selectedRowKeys.toString()}`,
                method: 'GET',
                data: '',
                name: `${projectName}-${moment().format('YYYYMMDD')}.zip`,
            });
        }
    };
    // modal
    const [visible, setVisible] = useState(false);
    const labelModal = () => {
        setVisible(true);
        if (selectedTags.length > 0) {
            modalForm.setFieldsValue({ label: selectedTags[0] });
        }
    };
    const [modalForm] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [fileUrl, setFileUrl] = useState('');
    const [fileList, setFileList] = useState([]);
    const resetState = () => {
        setFileList([]);
        setFileUrl('');
        setCurrentStep(0);
        modalForm.resetFields();
    };
    const next = () => {
        modalForm.validateFields().then((values) => {
            addFile({
                projectId: parseInt(id, 10),
                name: fileList.length > 0 && fileList[0].name,
                stage: parseInt(stage, 10) || 9,
                url: fileUrl,
                remark: values.remark,
                label: values.label,
            }).then((res) => {
                if (res.code === 200) {
                    setCurrentStep(currentStep + 1);
                } else {
                    message.error(res.message);
                }
            });
        });
    };
    const prev = () => {
        if (currentStep !== 0) {
            setCurrentStep(currentStep - 1);
        } else {
            setVisible(false);
            resetState();
        }
    };
    const handleCancel = () => {
        setVisible(false);
        reloadFetch();
        setFileList([]);
        setFileUrl('');
        setCurrentStep(0);
        modalForm.resetFields();
    };
    // 上传文件是否超过大小
    const [fileExceed, setFileExceed] = useState(false);
    const uploadGetFile = (info) => {
        let file = [...info.fileList];
        file = file.slice(-1);
        if (file.length) {
            // 上传文件时
            if (file[0].size > 500 * 1024 * 1024) {
                setFileExceed(true);
            } else {
                setFileExceed(false);
                const formd = new FormData();
                formd.append('attach', info.file);
                formd.append('type', 2);
                uploadFile(formd).then((res) => {
                    if (res.code === 200) {
                        setFileList(file);
                        setFileUrl(res.data);
                    } else {
                        message.error(res.message);
                    }
                });
            }
        } else {
            // 删除文件时触发的change
            setFileUrl('');
            setFileExceed(false);
        }
    };
    const footer = [
        <Button key="cancle" onClick={prev}>
            取消
        </Button>,
        <Button type="primary" key="next" onClick={next}>
            下一步
        </Button>,
    ];
    return (
        <>
            <Tabs
                activeKey={stage}
                type="card"
                onChange={(v) => {
                    setParams({
                        limit: 10,
                        offset: 0,
                        param: {
                            ...params.param,
                            stage: parseInt(v, 10),
                        },
                    });
                    history.push(
                        `${history.location.pathname}?id=${id}&key=1&stage=${v}&projectName=${projectName}`,
                    );
                }}
            >
                {TabPaneHeader.map((item) => (
                    <TabPane tab={item.name} key={item.value}>
                        <div>
                            <span style={{ marginRight: 8 }}>文本标签:</span>
                            {tagsData.map((tag) => (
                                <CheckableTag
                                    key={tag.id}
                                    checked={selectedTags.indexOf(tag.name) > -1}
                                    onChange={(checked) => handleChange(tag.name, checked)}
                                >
                                    {tag.name}
                                </CheckableTag>
                            ))}
                        </div>
                        <Divider
                            orientation="left"
                            style={{
                                color: '#333',
                                fontWeight: 'normal',
                            }}
                        />
                        <ScForm form={form} style={{ marginTop: '10px' }} name="formSearch">
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="文件名" name="name">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="userName" label="提交人">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="上传时间" name="createTime">
                                        <DatePicker />
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
                                                    projectId: parseInt(id, 10),
                                                    stage: parseInt(stage, 10),
                                                    labels: selectedTags,
                                                },
                                            });
                                        }}
                                    >
                                        重置
                                    </Button>
                                </Col>
                            </Row>
                        </ScForm>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col span={2}>
                                <Button type="primary" onClick={labelModal}>
                                    文档上传
                                </Button>
                            </Col>
                            <Col span={19}>
                                <Button onClick={exportFiles}>批量下载</Button>
                            </Col>
                            <Col span={2} style={{ marginTop: 8 }}>
                                文档数量：
                            </Col>
                            <Col
                                span={1}
                                style={{
                                    fontSize: 24,
                                    fontWeight: 500,
                                    color: '#1890FF',
                                }}
                            >
                                {total || 0}
                            </Col>
                        </Row>
                        <div style={{ marginBottom: 16 }}>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `已选择 ${selectedRowKeys.length || 0} 项` : ''}
                            </span>
                        </div>
                        <Table
                            size="small"
                            rowSelection={rowSelection}
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
                    </TabPane>
                ))}
            </Tabs>
            <Modal
                title="文档上传"
                visible={visible}
                onCancel={handleCancel}
                width={800}
                okText="提交"
                cancelText="取消"
                footer={currentStep === 1 ? false : footer}
            >
                <Steps current={currentStep} style={{ width: '50%', margin: '0 auto' }}>
                    <Step title="文档上传" />
                    <Step title="上传成功" />
                </Steps>
                {currentStep === 0 && (
                    <div style={{ paddingTop: 40, margin: '0 auto', width: '80%' }}>
                        <Form
                            form={modalForm}
                            name="modalFormSearch"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 21 }}
                        >
                            <Form.Item label="文件类型" name="label">
                                <Select placeholder="请选择">
                                    {tagsData.map((item) => {
                                        if (item.name !== '简报') {
                                            return (
                                                <Option key={item.id} value={item.name}>
                                                    {item.name}
                                                </Option>
                                            );
                                        }
                                        return null;
                                    })}
                                </Select>
                            </Form.Item>
                            <div style={{ height: 200, paddingLeft: 74 }}>
                                {fileExceed && (
                                    <Alert
                                        description="上传文件超过500M，建议压缩后上传。"
                                        type="error"
                                        showIcon
                                        style={{ marginBottom: '10px' }}
                                    />
                                )}
                                <Form.Item
                                    label=""
                                    wrapperCol={{ span: 17 }}
                                    name="files"
                                    rules={[{ required: true, message: '请上传文件' }]}
                                >
                                    <Dragger
                                        style={{ width: 530 }}
                                        fileList={fileList}
                                        onChange={uploadGetFile}
                                        beforeUpload={() => false}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            点击选择或将文件拖拽到这里上传，每次只能上传一个文件（500M）
                                        </p>
                                        <p className="ant-upload-hint">
                                            支持扩展名：.doc；.docx；.pdf；.xlsx；.jpg；.pptx；.ppt；
                                            .png；.zip；.csv；.txt；
                                        </p>
                                    </Dragger>
                                </Form.Item>
                            </div>
                            <Form.Item label="备注" name="remark" style={{ marginTop: 40 }}>
                                <Input.TextArea placeholder="请输入 0/20字" maxLength={20} />
                            </Form.Item>
                        </Form>
                    </div>
                )}
                {currentStep === 1 && (
                    <Result
                        status="success"
                        title="上传成功"
                        extra={[
                            <Button type="primary" key="back" onClick={handleCancel}>
                                返回列表
                            </Button>,
                            <Button key="continue" onClick={resetState}>
                                继续上传
                            </Button>,
                        ]}
                    />
                )}
            </Modal>
        </>
    );
};
export default Document;
