import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    Row,
    Col,
    Divider,
    DatePicker,
    Table,
    Drawer,
    Modal,
    Upload,
    Button,
} from 'antd';
import { searchParams } from '@utils/searchParams';
import RecordChange from './RecordChange';
import EditRecordChange from './EditRecordChange';
import { columnsProtuct } from '../config';
import { getSafeRecord, getFileSecurityRecord, getDelSecurityRecord } from '../api';
import { ScContent, ScForm, ScButton } from '../styled';

const { RangePicker } = DatePicker;

const SafeRecord = () => {
    const { id } = searchParams();
    const [form] = Form.useForm();
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [formdata, setFormData] = useState({
        projectId: id,
        prodNo: '',
        prodName: '',
        prodType: '',
        startDate: '',
        endDate: '',
        upgradeType: '',
        operator: '',
        upgradeWay: '',
    });
    const action = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                console.log('1');
                return (
                    <>
                        <Button type="link" onClick={() => showDrawer(record.id)}>
                            编辑
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                delRecord(record.id);
                            }}
                        >
                            删除
                        </Button>
                    </>
                );
            },
        },
    ];
    const delRecord = (ids) => {
        getDelSecurityRecord({ id: ids }).then((res) => {
            if (res.code === 200) {
                console.log('删除数据成功');
                setupdate(true);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const formFinish = (values) => {
        const time = {
            startDate: moment(values.rangeTime[0].valueOf()).format('YYYY-MM-DD'),
            endDate: moment(values.rangeTime[1].valueOf()).format('YYYY-MM-DD'),
        };

        setFormData({ ...values, ...time, projectId: id });
    };

    const pageChange = (page, pageSize) => {
        setOffset((page - 1) * pageSize);
        setLimit(pageSize);
    };

    //  抽屉
    const [visibleRecord, setVisibleRecord] = useState(false);
    const [visibleRecordEdit, setVisibleRecordEdit] = useState(false);
    const [idRecord, setIdRecord] = useState(0);

    const [update, setupdate] = useState(false);
    const showDrawer = (ids) => {
        if (ids) {
            setVisibleRecordEdit(true);
            setIdRecord(ids);
        } else {
            setVisibleRecord(true);
        }
    };

    const onClose = () => {
        setVisibleRecord(false);
        setVisibleRecordEdit(false);
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
        getFileSecurityRecord(formd).then((res) => {
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
    useEffect(() => {
        getSafeRecord({ limit, offset, param: { ...formdata } }).then((res) => {
            if (res.code === 200) {
                for (let i = 0; i < res.data.total; i += 1) {
                    res.data.records[i].upgradeDate = moment(tableData.upgradeDate).format(
                        'YYYY-MM-DD',
                    );
                    res.data.records[i].recordDate = moment(tableData.recordDate).format(
                        'YYYY-MM-DD',
                    );
                }
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
                            <Form.Item label="日期" name="rangeTime">
                                <RangePicker
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="产品编号" name="prodNo">
                                <Input placeholder="请输入产品编号" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label=" 产品名称" name="prodName">
                                <Input placeholder="请输入产品名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="产品类型" name="prodType">
                                <Input placeholder="请输入产品类型" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="升级类型" name="upgradeType">
                                <Input placeholder="请输入升级类型" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="操作人" name="operator">
                                <Input placeholder="请输入操作人" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="升级方式" name="upgradeWay">
                                <Input placeholder="请输入升级方式" />
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
                                        prodNo: '',
                                        prodName: '',
                                        prodType: '',
                                        startDate: '',
                                        endDate: '',
                                        upgradeType: '',
                                        operator: '',
                                        upgradeWay: '',
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
                        <ScButton type="primary" onClick={() => showDrawer()}>
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
                    columns={columnsProtuct.concat(action)}
                    dataSource={tableData}
                    pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
                    rowKey={(record) => record.id}
                />
                <Drawer
                    title="新增变更记录"
                    width={720}
                    onClose={onClose}
                    visible={visibleRecord}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <RecordChange handleCancel={onClose} />
                </Drawer>
                <Drawer
                    title="编辑变更记录"
                    width={720}
                    onClose={onClose}
                    visible={visibleRecordEdit}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <EditRecordChange handleCancel={onClose} idRecord={idRecord} />
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
                                </Col>
                                <Col>
                                    <a
                                        href="https://x.com.cn/staticsrc/网络安全产品升级记录表模板.xlsx"
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
export default SafeRecord;
