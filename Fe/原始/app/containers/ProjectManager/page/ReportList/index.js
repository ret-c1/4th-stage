import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Divider, Button, Table, Select, Tooltip } from 'antd';
import { searchParams } from '@utils/searchParams';
import { useHistory } from 'react-router-dom';
// import { gloabconfig } from '@containers/config';
// import { authAction } from '@utils/authority';
import { getReportListPage, getReportAuthor } from '../api';
import { ScContent, ScForm, ScButton } from '../styled';
const columns = [
    {
        title: '报告名称',
        dataIndex: 'reportName',
        key: 'reportName',
        width: 200,
        render: (text, record) => {
            const name = ['reportName'];
            const type = 'type';
            if (record[type] === 1) {
                return (
                    <span>
                        {record[name]
                            .split('-')
                            .slice(1)
                            .join('-')
                            .slice(0, 30)}
                    </span>
                );
            }
            return <span>{record[name].slice(0, 30)}</span>;
        },
    },
    {
        title: '报告作者',
        dataIndex: 'createUserName',
        key: 'createUserName',
    },
    {
        title: '报告类型',
        dataIndex: 'type',
        key: 'type',
        render: (text) => {
            let type = '';
            switch (text) {
                case 1:
                    type = '渗透测试';
                    break;
                case 2:
                    type = '漏洞扫描';
                    break;
                case 3:
                    type = '配置检查';
                    break;
                default:
                    type = '其他';
                    break;
            }
            return type;
        },
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
                    status = '未评审';
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
        title: '分析对象',
        dataIndex: 'analysisObject',
        key: 'analysisObject',
        width: 200,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text && text.split(',').length <= 3 && text}
                {text &&
                    text.split(',').length > 3 &&
                    text
                        .split(',')
                        .slice(0, 3)
                        .join(',')}
            </Tooltip>
        ),
    },
    {
        title: '漏洞统计',
        dataIndex: ['highVulnerability', 'middleVulnerability', 'lowVulnerability'],
        render: (text, record) => (
            <>
                <div>
                    高：<span style={{ color: 'red' }}>{record.highVulnerability}</span>
                </div>
                <div>
                    中：<span style={{ color: 'orange' }}>{record.middleVulnerability}</span>
                </div>
                <div>
                    低：<span style={{ color: 'blue' }}>{record.lowVulnerability}</span>
                </div>
            </>
        ),
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '版本号',
        dataIndex: 'version',
        key: 'version',
    },
];
const { Option } = Select;
const ReportList = () => {
    const [form] = Form.useForm();
    const { id } = searchParams();
    const history = useHistory();

    const action = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div>
                    {record.status === 2 ? (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={() => {
                                if (record.type === 3) {
                                    // window.open(
                                    //     `${
                                    //         gloabconfig.redirecturl
                                    //     }/#/penetrate/secureConfigCheckReport?token=${authAction.get()}`,
                                    // );
                                } else if (record.type === 2) {
                                    history.push({
                                        pathname: '/scan/report',
                                        state: {
                                            reportId: record.reportId,
                                            reportName: record.reportName,
                                            source: '/project/reportlist',
                                        },
                                    });
                                } else if (record.type === 1) {
                                    history.push(
                                        `/penetration/reportdetail?id=${record.reportId}&&type=Review`,
                                    );
                                }
                            }}
                        >
                            评审
                        </ScButton>
                    ) : null}
                    {record.status === 4 ? (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={() => {
                                if (record.type === 3) {
                                    window.open('http://1.1.1.1:27003');
                                    // window.open(
                                    //     `${
                                    //         gloabconfig.redirecturl
                                    //     }/#/penetrate/secureConfigCheckAdd?planId=${
                                    //         record.id
                                    //     }&projectName=${
                                    //         record.projectName
                                    //     }&display=true&token=${authAction.get()}`,
                                    // );
                                } else if (record.type === 2) {
                                    history.push({
                                        pathname: '/scan/report',
                                        state: {
                                            reportId: record.reportId,
                                            reportName: record.reportName,
                                        },
                                    });
                                    // window.open(
                                    //     `${gloabconfig.redirecturl}/#/penetrate/scanAdd?planId=${
                                    //         record.id
                                    //     }&projectName=${
                                    //         record.projectName
                                    //     }&display=true&token=${authAction.get()}`,
                                    // );
                                } else if (record.type === 1) {
                                    history.push(
                                        `/penetration/reportdetail?id=${record.reportId}&&type=generatereport`,
                                    );
                                    // window.open(
                                    //     `${gloabconfig.redirecturl}/#/penetrate/addReport?planId=${
                                    //         record.id
                                    //     }&projectName=${
                                    //         record.projectName
                                    //     }&display=true&token=${authAction.get()}`,
                                    // );
                                }
                            }}
                        >
                            生成报告
                        </ScButton>
                    ) : null}
                    {record.downloadStatus ? (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={() => {
                                window.open(`/api${record.downloadUrl.split('/api')[1]}`);
                            }}
                        >
                            下载
                        </ScButton>
                    ) : null}
                </div>
            ),
        },
    ];

    const [formdata, setFormData] = useState({
        reportName: '',
        createUserId: '',
        type: '',
        status: '',
        clientName: '',
        contractNo: '',
        version: '',
        analysisObject: '',
        history: false,
        projectId: id,
    });

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [tableData, setTabledata] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const fromFinish = (values) => {
        console.log(values);
        formdata.reportName = values.reportName;
        formdata.createUserId = values.createUserId;
        formdata.type = values.type;
        formdata.status = values.status;
        setFormData({ ...formdata });
    };
    const pageChange = (page, pageSize) => {
        setOffset((page - 1) * pageSize);
        setLimit(pageSize);
    };
    useEffect(() => {
        getReportAuthor({}).then((res) => {
            if (res.code === 200) {
                setSelectData(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
    }, []);
    useEffect(() => {
        getReportListPage({ offset, limit, param: { ...formdata } }).then((res) => {
            if (res.code === 200) {
                setTabledata(res.data.records);
                setTotal(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    }, [offset, limit, formdata]);
    return (
        <>
            <ScContent>
                <ScForm form={form} style={{ marginTop: '10px' }} onFinish={fromFinish}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="报告名称" name="reportName">
                                <Input placeholder="请输入报告名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="报告作者" name="createUserId">
                                <Select placeholder="请输入报告作者">
                                    {selectData.map((item) => (
                                        <Option value={item.value} key={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label=" 报告类型" name="type">
                                <Select placeholder="请选择">
                                    <Option value="1">渗透测试</Option>
                                    <Option value="2">漏洞扫描</Option>
                                    <Option value="3">配置检查</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="报告状态" name="status">
                                <Select placeholder="请选择">
                                    <Option value="2">待评审</Option>
                                    <Option value="3">已通过</Option>
                                    <Option value="4">未通过</Option>
                                </Select>
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
                            <ScButton type="primary" htmlType="submit">
                                查询
                            </ScButton>
                            <ScButton
                                onClick={() => {
                                    form.resetFields();
                                    setFormData({
                                        reportName: '',
                                        createUserId: '',
                                        type: '',
                                        status: '',
                                        clientName: '',
                                        contractNo: '',
                                        version: '',
                                        analysisObject: '',
                                        history: false,
                                        projectId: id,
                                    });
                                }}
                            >
                                重置
                            </ScButton>
                        </Col>
                    </Row>
                </ScForm>
                <Row justify="space-between">
                    <Col>
                        <Button type="primary" disabled>
                            批量下载
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => {
                                setFormData({
                                    ...formdata,
                                    history: true,
                                });
                            }}
                        >
                            查询历史版本
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <Table
                    columns={columns.concat(action)}
                    dataSource={tableData}
                    pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
                    rowKey={(record) => record.reportId}
                />
            </ScContent>
        </>
    );
};

export default ReportList;
