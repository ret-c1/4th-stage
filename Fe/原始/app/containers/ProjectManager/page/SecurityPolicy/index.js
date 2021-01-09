import React, { useState, useEffect } from 'react';
import { searchParams } from '@utils/searchParams';
import {
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Divider,
    Table,
    Drawer,
    Modal,
    Upload,
    Button,
} from 'antd';
import moment from 'moment';
import AddSecurityPolicy from './AddSecurityPolicy';
import EditSecurityPolicy from './EditSecurityPolicy';
import { getSecurityPolicy, getFileSecurityPolicy, getDelSecurityPolicy } from '../api';
import { ScContent, ScForm, ScButton } from '../styled';

const { RangePicker } = DatePicker;

const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '记录日期',
        dataIndex: 'recordDate',
        key: 'recordDate',
        render: (text) => <div>{moment(text).format('YYYY-MM-DD')}</div>,
    },
    {
        title: '申请单编号',
        dataIndex: 'applyNo',
        key: 'applyNo',
    },
    {
        title: '策略类型',
        dataIndex: 'strategyType',
        key: 'strategyType',
    },
    {
        title: '变更内容',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: '申请策略个数',
        dataIndex: 'applyNum',
        key: 'applyNum',
    },
    {
        title: '申请单位',
        dataIndex: 'applyOrganization',
        key: 'applyOrganization',
    },
    {
        title: '申请经办人',
        dataIndex: 'applyProcessor',
        key: 'applyProcessor',
    },
    {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator',
    },
    {
        title: '完成日期',
        dataIndex: 'finishDate',
        key: 'finishDate',
        render: (text) => <div>{moment(text).format('YYYY-MM-DD')}</div>,
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
    },
];
const SecurityPolicy = () => {
    const [form] = Form.useForm();
    const { id } = searchParams();
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [formdata, setFormData] = useState({
        projectId: id,
        applyNo: '',
        applyOrganization: '',
        strategyType: '',
        startDate: '',
        endDate: '',
        applyProcessor: '',
        operator: '',
        finishDate: '',
    });
    const action = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <ScButton type="link" size="small" onClick={() => showDrawer(record.id)}>
                        编辑
                    </ScButton>
                    <ScButton
                        type="link"
                        size="small"
                        onClick={() => {
                            delRecord(record.id);
                        }}
                    >
                        删除
                    </ScButton>
                </div>
            ),
        },
    ];
    const pageChange = (page, pageSize) => {
        setOffset((page - 1) * pageSize);
        setLimit(pageSize);
    };
    const formFinish = (values) => {
        if (values.finishDate) {
            const time = {
                finishDate: moment(values.finishDate.valueOf()).format('YYYY-MM-DD'),
            };
            const data = { ...time };
            console.log(data);
            setFormData({ ...formdata, ...data });
        } else if (values.rangeTime) {
            const time = {
                startDate: moment(values.rangeTime[0].valueOf()).format('YYYY-MM-DD'),
                endDate: moment(values.rangeTime[1].valueOf()).format('YYYY-MM-DD'),
            };
            const data = { ...time };
            console.log(data);
            setFormData({ ...formdata, ...data });
        } else if (values.finishDate && values.rangeTime) {
            const time = {
                startDate: moment(values.rangeTime[0].valueOf()).format('YYYY-MM-DD'),
                endDate: moment(values.rangeTime[1].valueOf()).format('YYYY-MM-DD'),
                finishDate: moment(values.finishDate.valueOf()).format('YYYY-MM-DD'),
            };
            const data = { ...time };
            console.log(data);
            setFormData({ ...formdata, ...data });
        } else {
            setFormData({ ...formdata, ...values });
        }
    };

    //    抽屉
    const [visiblePolicy, setVisiblePolicy] = useState(false);
    const [update, setupdate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [idPolicy, setIdPolicy] = useState(0);

    const showDrawer = (ids) => {
        setVisiblePolicy(true);
        setVisibleEdit(true);
        setIdPolicy(ids);
    };

    const onClose = () => {
        setVisiblePolicy(false);
        setVisibleEdit(false);
        setupdate(true);
    };
    //  模态框  IP
    const [file1, setFile] = useState({});
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        console.log(file1);
        const formd = new FormData();
        formd.append('id', id);
        formd.append('file', file1);
        getFileSecurityPolicy(formd).then((res) => {
            if (res.code === 200) {
                console.log('获取数据成功');
                setFile({});
                setupdate(true);
            } else {
                console.log('获取数据失败');
            }
        });
        setVisible(false);
    };
    const handleCancel = (e) => {
        console.log(e);
        setFile('');
        setVisible(false);
    };
    const fileChange = (file) => {
        setFile(file);
    };
    const exportXlsx = () => {
        const iFrame = document.createElement('iframe');
        const elink = document.createElement('a');
        elink.style.display = 'none';
        iFrame.style.display = 'none';
        elink.href = `/api/asset/ip/export?projectId=${id}`;
        iFrame.appendChild(elink);
        document.body.appendChild(iFrame);
        elink.click();
        document.body.removeChild(iFrame);
    };
    //  删除
    const delRecord = (ids) => {
        getDelSecurityPolicy({ id: ids }).then((res) => {
            if (res.code === 200) {
                console.log('删除数据成功');
                setupdate(true);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    useEffect(() => {
        getSecurityPolicy({ limit, offset, param: { ...formdata } }).then((res) => {
            if (res.code === 200) {
                setTableData(res.data.records);
                setTotal(res.data.total);
            }
        });
        setupdate(false);
    }, [offset, limit, formdata, update]);

    return (
        <>
            <ScContent>
                <ScForm form={form} style={{ marginTop: '10px' }} onFinish={formFinish}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="申请单编号" name="applyNo">
                                <Input placeholder="请输入申请单编号" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="策略类型" name="strategyType">
                                <Input placeholder="请输入策略类型" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="申请单位" name="applyOrganization">
                                <Input placeholder="请输入申请单位" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="申请经办人" name="applyProcessor">
                                <Input placeholder="请输入申请经办人" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="操作人" name="operator">
                                <Input placeholder="请输入操作人" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="日期" name="rangeTime">
                                <RangePicker
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="完成日期" name="finishDate">
                                <DatePicker
                                    showTime
                                    placeholder="请选择时间"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                            <ScButton type="primary" htmlType="submit">
                                查询
                            </ScButton>
                            <ScButton
                                onClick={() => {
                                    form.resetFields();
                                    setFormData({
                                        projectId: id,
                                        applyNo: '',
                                        applyOrganization: '',
                                        strategyType: '',
                                        startDate: '',
                                        endDate: '',
                                        applyProcessor: '',
                                        operator: '',
                                        finishDate: '',
                                    });
                                }}
                            >
                                重置
                            </ScButton>
                        </Col>
                    </Row>
                </ScForm>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
                <Row justify="space-between" style={{ marginBottom: '20px' }}>
                    <Col>{/* <ScButton type="primary">统计总结</ScButton> */}</Col>
                    <Col>
                        <ScButton type="primary" onClick={showDrawer}>
                            新增
                        </ScButton>
                        <ScButton type="primary" onClick={showModal}>
                            导入
                        </ScButton>
                        <ScButton
                            type="primary"
                            onClick={() => {
                                exportXlsx();
                            }}
                        >
                            导出
                        </ScButton>
                    </Col>
                </Row>
                <Table
                    columns={columns.concat(action)}
                    dataSource={tableData}
                    pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
                    rowKey={(record) => record.id}
                />
                <Drawer
                    title="新增配置"
                    width={720}
                    onClose={onClose}
                    visible={visiblePolicy}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <AddSecurityPolicy handleCancel={onClose} />
                </Drawer>
                <Drawer
                    title="编辑配置"
                    width={720}
                    onClose={onClose}
                    visible={visibleEdit}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <EditSecurityPolicy handleCancel={onClose} idPolicy={idPolicy} />
                </Drawer>
                <Modal
                    title="导入资产信息"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="导入"
                    cancelText="取消"
                >
                    <Form name="filesubmit" initialValues={{ remember: true }}>
                        <Form.Item
                            label="文件上传"
                            name="file"
                            rules={[{ required: true, message: '请选择上传的文件!' }]}
                        >
                            <Row>
                                <Col>
                                    <Input placeholder="未选择任何文件" value={file1.name} />
                                </Col>
                                <Col>
                                    <Upload
                                        beforeUpload={(file) => {
                                            fileChange(file);
                                            return false;
                                        }}
                                        showUploadList={false}
                                    >
                                        <Button style={{ marginLeft: '10px' }}>选择文件</Button>
                                    </Upload>
                                    {/* <input ref={fileref} type="file" onchange=(file) /> */}
                                    {/* ref.current.click() */}
                                    {/* <Button style={{ marginLeft: '10px' }} onclic={handlclickfile}>选择文件</Button> */}
                                </Col>
                                <Col>
                                    <a
                                        href="https://x.com.cn/staticsrc/网络安全技术防护策略配置变更记录表V1.0模板.xlsx"
                                        style={{ marginLeft: '10px' }}
                                    >
                                        模板下载
                                    </a>
                                </Col>
                            </Row>
                            <p style={{ marginTop: '10px' }}>
                                如果“资产IP+编号”的在系统中已存在，将更新现有资产信息。
                            </p>
                        </Form.Item>
                    </Form>
                </Modal>
            </ScContent>
        </>
    );
};
export default SecurityPolicy;
