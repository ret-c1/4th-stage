import React, { useEffect, useState } from 'react';
import { Input, DatePicker, Divider, Form, Button, Row, Col, Table, Select, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
// import {
//     getItemDetail,
//     getPenetrationtestTable,
//     getDelReport,
//     getCommitReport,
//     getDetailItem,
// } from '../api';
import SubmitReportModal from '../../components/SubmitReportModal';
import { ScContent, ScButton, ScForm } from '../styled';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Penetrationtestcolumns = [
    {
        title: '客户名称',
        dataIndex: 'clientName',
        width: '175px',
    },
    {
        title: '报告名称',
        dataIndex: 'reportName',
        width: '175px',
    },
    {
        title: 'web应用',
        dataIndex: 'webApplicationName',
    },
    {
        title: '域名',
        dataIndex: 'analysisObject',
    },
    {
        title: '漏洞统计',
        dataIndex: ['highVulnerability', 'middleVulnerability', 'lowVulnerability'],
        render: (text, record) => (
            <>
                <div>
                    高：<span style={{ color: '#e92b1d' }}>{record.highVulnerability}</span>
                </div>
                <div>
                    中：<span style={{ color: '#ee8035' }}>{record.middleVulnerability}</span>
                </div>
                <div>
                    低：<span style={{ color: '#00a0ea' }}>{record.lowVulnerability}</span>
                </div>
            </>
        ),
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
    },
    {
        title: '报告状态',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            let status = '';
            switch (text) {
                case 1:
                    status = '未提交';
                    break;
                case 2:
                    status = '待评审';
                    break;
                case 3:
                    status = '不通过';
                    break;
                default:
                    status = '已通过';
                    break;
            }
            return status;
        },
    },
    {
        title: '评审结果',
        dataIndex: ['valid', 'invalid', 'miss', 'doubt'],
        render: (text, record) => (
            <>
                <div>
                    有效：<span style={{ color: '#66bb3b' }}>{record.valid}</span>
                </div>
                <div>
                    存疑：<span style={{ color: '#ea883a' }}>{record.doubt}</span>
                </div>
                <div>
                    无效：<span style={{ color: '#999' }}>{record.invalid}</span>
                </div>
                <div>
                    误报：<span style={{ color: '#999' }}>{record.miss}</span>
                </div>
            </>
        ),
    },
];
const PenetrationtestPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const action = [
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    {record.status === 3 || record.status === 1 ? (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={() => {
                                history.push(`/penetration/detail?type=edit&&id=${record.id}`);
                            }}
                        >
                            编辑
                        </ScButton>
                    ) : null}
                    {record.status === 2 || record.status === 4 ? (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={() => {
                                history.push(`/penetration/detail?id=${record.id}`);
                            }}
                        >
                            查看
                        </ScButton>
                    ) : null}
                    {record.status === 1 || record.status === 3 ? (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={() => {
                                showModal(record.id, record.projectId);
                            }}
                        >
                            提交报告
                        </ScButton>
                    ) : (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={() => {
                                history.push(
                                    `/penetration/reportdetail?id=${record.id}&&type=isPreView`,
                                );
                            }}
                        >
                            预览报告
                        </ScButton>
                    )}
                    {record.status === 1 ? (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={() => {
                                delFunc(record.id);
                            }}
                        >
                            删除
                        </ScButton>
                    ) : null}
                </div>
            ),
        },
    ];
    //  选择项项目的选择项目状态
    const [dataItem] = useState([]);
    // 表格分页以及表格总数与表格数据状态
    const [total] = useState(0);
    const [tableData] = useState([]);
    const [params, setParams] = useState({
        limit: 10,
        offset: 0,
        param: {
            type: 1,
        },
    });

    const pageChange = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    const getPenetrationtestPage = () => {
        // getPenetrationtestTable(params).then((res) => {
        //     if (res.code === 200) {
        //         setTabledata(res.data.records);
        //         setTotal(res.data.total);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    };
    const FormFinish = (value) => {
        const formdata = value;
        if (value.rangeTime) {
            formdata.createTimeEnd = moment(value.rangeTime[0]).format('YYYY-MM-DD HH:mm:ss');
            formdata.createTimeBegin = moment(value.rangeTime[1]).format('YYYY-MM-DD HH:mm:ss');
        }
        setParams({ limit: 10, offset: 0, param: { ...params.param, ...formdata } });
    };

    useEffect(() => {
        getPenetrationtestPage();
    }, [params]);
    // 删除报告
    const delFunc = (ids) => {
        console.log(ids);
        // getDelReport({ id: ids }).then((res) => {
        //     if (res.code === 200) {
        //         console.log('删除数据成功');
        //         getPenetrationtestPage();
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    };
    useEffect(() => {
        // getItemDetail().then((res) => {
        //     if (res.code === 200) {
        //         setDataItem(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    }, []);

    // 有关模态框的操作
    const [visible, setVisible] = useState(false);
    const [itemData] = useState({});
    const showModal = (ids, projectId) => {
        console.log(ids, projectId);
        // getCommitReport({ id: ids }).then((res) => {
        //     if (res.code === 200) {
        //         console.log('提交报告成功');
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        // getDetailItem({ id: projectId }).then((res) => {
        //     if (res.code === 200) {
        //         setItemData(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <>
            <ScContent>
                <ScForm
                    form={form}
                    className="ant-advanced-search-form"
                    name="advanced_search"
                    onFinish={FormFinish}
                >
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="报告名称：" name="reportName">
                                <Input placeholder="请输入报告名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="项目：" name="projectId">
                                <Select placeholder="请选择项目">
                                    {dataItem.map((item) => (
                                        <Option value={item.value} key={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="域名：" name="analysisObject">
                                <Input placeholder="请输入域名" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="报告状态" name="status">
                                <Select placeholder="请选择状态">
                                    <Option value="1">未提交</Option>
                                    <Option value="2">待评审</Option>
                                    <Option value="3">不通过</Option>
                                    <Option value="4">已通过</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="客户名称：" name="clientName">
                                <Input placeholder="请输入报告名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="合同编号：" name="contractNo">
                                <Input placeholder="请输入合同编号" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Web应用名称：" name="webApplicationName">
                                <Input placeholder="请输入Web应用名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="起止时间" name="rangeTime">
                                <RangePicker
                                    placeholder={['开始时间', '结束时间']}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={24}
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <ScButton
                                type="primary"
                                htmlType="submit"
                                style={{
                                    margin: '0 8px',
                                }}
                            >
                                查询
                            </ScButton>
                            <ScButton
                                onClick={() => {
                                    form.resetFields();
                                    setParams({
                                        limit: 10,
                                        offset: 0,
                                        param: {
                                            type: 1,
                                        },
                                    });
                                }}
                            >
                                重置
                            </ScButton>
                        </Col>
                    </Row>
                </ScForm>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
                <Row justify="end">
                    <Col>
                        <Button
                            style={{ textAlign: 'right', marginBottom: '10px' }}
                            type="primary"
                            onClick={() => {
                                history.push(`/penetration/add`);
                            }}
                        >
                            新建报告
                        </Button>
                    </Col>
                </Row>
                <Table
                    size="small"
                    columns={Penetrationtestcolumns.concat(action)}
                    dataSource={tableData}
                    pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
                    rowKey={(record) => record.id}
                />
                <Modal
                    title="工作量记录"
                    visible={visible}
                    width="600px"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <SubmitReportModal itemData={itemData} func={handleOk} />
                </Modal>
            </ScContent>
        </>
    );
};
export default PenetrationtestPage;
