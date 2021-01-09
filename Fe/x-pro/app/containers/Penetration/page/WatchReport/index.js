import React, { useEffect, useState } from 'react';
import {
    Typography,
    Tree,
    Layout,
    Row,
    Col,
    Input,
    Collapse,
    Table,
    Button,
    Rate,
    Drawer,
    Form,
    Modal,
    // message,
    Spin,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { searchParams } from '@utils/searchParams';
import SubmitReportModal from '../../components/SubmitReportModal';
import SysVulDeltailForm from '../../components/SystemTableDrawerForm/SysVulDeltailForm';
// import {
//     getReportDetail,
//     getHoleData,
//     getPenetrationData,
//     getSubmitReview,
//     getRemarkCommit,
//     getcommitReport,
//     getDetailItem,
//     getGeneratorReport,
//     getDownReport,
//     getReportStatus,
// } from '../api';
import { ScContent, ScCard } from '../styled';

const { Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRowsate: ', selectedRows);
    },
};
const treeData = [
    {
        title: '1.摘要',
        key: '1',
        children: [
            {
                title: '1.1.安全问题分布图',
                key: '1-1',
            },
            {
                title: '1.2.安全问题摘要总汇表',
                key: '1-2',
            },
            {
                title: '1.3.安全分析',
                key: '1-3',
            },
        ],
    },
    {
        title: '2.服务概述',
        key: '2',
        children: [
            {
                title: '2.1.测试流程',
                key: '2-1',
            },
            {
                title: '2.2.测试对象与人员',
                key: '2-2',
            },
            {
                title: '2.3.参考依据',
                key: '2-3',
            },
            {
                title: '2.4.预期收益',
                key: '2-4',
            },
        ],
    },
    {
        title: '3.测试服务说明',
        key: '3',
        children: [
            {
                title: '3.1.测试对象与环境',
                key: '3-1',
            },
            {
                title: '3.2.测试对象与人员',
                key: '3-2',
            },
            {
                title: '3.3.准备工作',
                key: '3-3',
            },
            {
                title: '3.4.工具及相关资料',
                key: '3-4',
            },
        ],
    },
    {
        title: '4.测试过程详述',
        key: '4',
        children: [
            {
                title: '4.1.测试发现问题整理',
                key: '4-1',
            },
            {
                title: '4.2.undefined结果',
                key: '4-2',
            },
        ],
    },
    {
        title: '5.测试结果与建议',
        key: '5',
        children: [
            {
                title: '5.1.安全建议',
                key: '5-1',
            },
            {
                title: '5.2.其他建议',
                key: '5-2',
            },
        ],
    },
    {
        title: '6.致谢',
        key: '6',
        disabled: true,
    },
];

const PenetrationtestPage = () => {
    const history = useHistory();
    const { id } = searchParams();
    console.log(id);
    const [reportData] = useState([]);
    const [holeData] = useState([]);
    const [penetration] = useState([]);

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total] = useState(0);
    const reportStatu =
        (history.location.search && history.location.search.split('&&')[1].split('=')[1]) || '';

    const PenetrationtestDetailTable = [
        {
            title: 'URL',
            dataIndex: 'url',
        },
        {
            title: '漏洞名称',
            dataIndex: 'name',
        },
        {
            title: '漏洞级别',
            dataIndex: 'level',
            render: (text, record) => {
                let e = '';
                if (record.level === '高危') {
                    e = <span style={{ color: '#e92b1d' }}>高危</span>;
                } else if (record.level === '中危') {
                    e = <span style={{ color: '#ee8035' }}>中危</span>;
                } else if (record.level === '低危') {
                    e = <span style={{ color: '#00a0ea' }}>低危</span>;
                }
                return e;
            },
        },
        {
            title: '录入时间',
            dataIndex: 'createTime',
        },
        {
            title: '复测漏洞',
            dataIndex: 'retest',
        },
        {
            title: '评审结果',
            dataIndex: 'vulStatus',
            render: (text, record) => {
                let e = '';
                if (record.vulStatus === '待评审') {
                    e = <span style={{ color: '#ea883a' }}>待评审</span>;
                } else if (record.vulStatus === '有效') {
                    e = <span style={{ color: '#66bb3b' }}>有效</span>;
                } else if (record.vulStatus === '存疑') {
                    e = <span style={{ color: '#ee8035' }}>存疑</span>;
                } else if (record.vulStatus === '误报') {
                    e = <span style={{ color: '#999' }}>误报</span>;
                } else if (record.vulStatus === '无效') {
                    e = <span style={{ color: '#999' }}>无效</span>;
                }
                return e;
            },
        },
        {
            title: '评审',
            dataIndex: 'vulStatus',
            align: 'center',
            render: (text, record) => {
                let e = '';
                if (reportStatu === 'isPreView') {
                    e = <span style={{ color: '#999' }}>预览中</span>;
                } else {
                    e = (
                        <>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => {
                                    submitFun(record.id, '有效');
                                }}
                            >
                                有效
                            </Button>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => {
                                    submitFun(record.id, '无效');
                                }}
                            >
                                无效
                            </Button>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => {
                                    submitFun(record.id, '误报');
                                }}
                            >
                                误报
                            </Button>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => {
                                    submitFun(record.id, '存疑');
                                }}
                            >
                                存疑
                            </Button>
                        </>
                    );
                }
                return e;
            },
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            showDrawer(record.id);
                        }}
                    >
                        查看
                    </Button>
                </>
            ),
        },
    ];

    const pageChange = (page, pageSize) => {
        setOffset((page - 1) * 10);
        setLimit(pageSize);
    };

    const getTableUpdate = (limitparam, offsetparam) => {
        console.log(limitparam, offsetparam);
        // getPenetrationData({ limit: limitparam, offset: offsetparam, param: { id } }).then(
        //     (res) => {
        //         if (res.code === 200) {
        //             setPenetrationData(res.data.records);
        //             setTotal(res.data.total);
        //         } else {
        //             console.log('获取数据失败');
        //         }
        //     },
        // );
    };

    const submitFun = (ids, status) => {
        console.log(ids, status);
        // getSubmitReview({ reportId: id, vulId: ids, vulStatus: status }).then((res) => {
        //     if (res.code === 200) {
        //         getTableUpdate();
        //     } else {
        //         message.warning('报告当前不是评审状态, 无法评审漏洞！');
        //     }
        // });
    };

    useEffect(() => {
        getTableUpdate(limit, offset);
    }, [limit, offset]);

    // 查看的抽屉
    const [visible, setVisible] = useState(false);
    const [VulId, setVulId] = useState(0);
    const showDrawer = (idSys) => {
        setVulId(idSys);
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    // 报告详情
    useEffect(() => {
        // getReportDetail({ id }).then((res) => {
        //     if (res.code === 200) {
        //         if (res.data.status === 1) {
        //             res.data.status = '未提交';
        //         }
        //         if (res.data.status === 2) {
        //             res.data.status = '待评审';
        //         }
        //         if (res.data.status === 3) {
        //             res.data.status = '不通过';
        //         }
        //         if (res.data.status === 4) {
        //             res.data.status = '已通过';
        //         }
        //         setReportData(res.data);
        //         if (res.data.chapter) {
        //             setCheckedKeys(res.data.chapter);
        //             setControlData(res.data.chapter);
        //         }
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        // getHoleData({ id }).then((res) => {
        //     if (res.code === 200) {
        //         setHoleData(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    }, []);
    // 左侧目录与有右侧侧边栏的联动
    const [expandedKeys, setExpandedKeys] = useState(['1', '2', '3', '4', '5', '6']);
    const [checkedKeys, setCheckedKeys] = useState([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '1-1',
        '1-2',
        '1-3',
        '2-1',
        '2-2',
        '2-3',
        '2-4',
        '3-1',
        '3-2',
        '3-3',
        '3-4',
        '4-1',
        '4-2',
        '5-1',
        '5-2',
    ]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [controlData, setControlData] = useState(['1', '2', '3', '4', '5', '6', '7']);
    const [openData, setopenData] = useState(['10', '11', '12', '13', '14', '15', '16', '17']);

    const callback = (key) => {
        setopenData(key);
    };

    const onExpand = (value) => {
        setExpandedKeys(value);
        setAutoExpandParent(false);
    };

    const onCheck = (value) => {
        console.log(value);
        const arr = [];
        for (let i = 0; i < value.length; i += 1) {
            if (value[i].length === 1) {
                arr.push(value[i]);
            }
        }
        arr.push('7');
        setControlData(arr);
        setCheckedKeys(value);
    };
    const onSelect = (value) => {
        setSelectedKeys(value);
    };
    // 审核通过
    const checkResult = (pass) => {
        console.log(pass);
        // getcommitReport({ id, chapter: checkedKeys, content: reportData.content, pass }).then(
        //     (res1) => {
        //         if (res1.code === 200) {
        //             console.log('提交报告成功');
        //             getReportDetail({ id }).then((res) => {
        //                 if (res.code === 200) {
        //                     if (res.data.status === 1) {
        //                         res.data.status = '未提交';
        //                     }
        //                     if (res.data.status === 2) {
        //                         res.data.status = '待评审';
        //                     }
        //                     if (res.data.status === 3) {
        //                         res.data.status = '不通过';
        //                     }
        //                     if (res.data.status === 4) {
        //                         res.data.status = '已通过';
        //                     }
        //                     setReportData(res.data);
        //                     showModal(reportData.projectId);
        //                 } else {
        //                     console.log('获取数据失败');
        //                 }
        //             });
        //         } else {
        //             console.log('获取数据失败');
        //             message.warning('还有漏洞没有评审');
        //         }
        //     },
        // );
    };
    const [form] = Form.useForm();
    const onFinish = (value) => {
        console.log(value);
        // getRemarkCommit({
        //     attitudeComment: value.attitudeComment,
        //     comment: value.comment,
        //     attitude,
        //     ability,
        //     reportId: id,
        // }).then((res) => {
        //     if (res.code === 200) {
        //         console.log('提交评论成功');
        //         checkResult(true);
        //     } else {
        //         console.log('获取数据失败');
        //         message.warning('还有漏洞没有评审');
        //     }
        // });
    };

    useEffect(() => {
        form.setFieldsValue(reportData.content);
    }, [reportData.content]);
    // 有关评分状态的收集
    const [ability, setAbility] = useState(5);
    const [attitude, setAttitude] = useState(5);
    const countChange = (value) => {
        setAbility(value);
    };
    const countTwoChange = (value) => {
        setAttitude(value);
    };
    // 工作计时
    const [visiblemodal, setVisiblemodaol] = useState(false);
    const [itemData] = useState({});
    const showModal = (projectId) => {
        console.log(projectId);
        // getDetailItem({ id: projectId }).then((res) => {
        //     if (res.code === 200) {
        //         setItemData(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        setVisiblemodaol(true);
    };
    const handleOk = () => {
        setVisiblemodaol(false);
    };

    const handleCancel = () => {
        setVisiblemodaol(false);
    };
    // 生成报告
    const [downWait, setDownWait] = useState(false);
    const [downloadId] = useState('');
    const [isShowButton] = useState(false);

    const generatorReport = () => {
        setDownWait(true);
        // getGeneratorReport({
        //     type: '1',
        //     generator: 'true',
        //     chapter: checkedKeys,
        //     content: reportData.content,
        //     id,
        // }).then((res) => {
        //     if (res.code === 200) {
        //         setDownloadId(res.data);
        //         const interval = setInterval(() => {
        //             getReportStatus({ id: res.data }).then((res1) => {
        //                 if (res1.code === 200) {
        //                     clearInterval(interval);
        //                     setDownWait(false);
        //                     setShowButton(true);
        //                 }
        //             });
        //         }, 1000);
        //     }
        // });
    };
    const downloadReport = (ids) => {
        console.log(ids);
        // getDownReport({ id: ids }).then((res) => {
        //     if (res.code === 200) {
        //         if (res.data && res.data.downloadStatus === 1) {
        //             const url = res.data.downloadUrl;
        //             const a = document.createElement('a');
        //             a.setAttribute('href', `/api${url.split('/api')[1]}`);
        //             a.setAttribute('download', res.data.reportName);
        //             a.click();
        //         }
        //     }
        // });
    };
    return (
        <>
            <ScContent>
                <div style={{ textAlign: 'center' }}>
                    <Title level={4} style={{ display: 'inline' }}>
                        {reportData.reportName}
                    </Title>
                </div>
                <ScCard
                    title={
                        <>
                            <span>基本信息</span>
                            <span style={{ color: 'red' }}>({reportData.status})</span>
                        </>
                    }
                    hoverable
                    style={{ marginTop: '20px' }}
                >
                    <Row>
                        <Col span="6">合同编号：{reportData.contractNo}</Col>
                        <Col span="6">客户全称：{reportData.clientName}</Col>
                        <Col span="6">报告作者：{reportData.createUserName}</Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span="6">项目创建时间：{reportData.createTime}</Col>
                        <Col span="6">报告提交时间：{reportData.submitTime}</Col>
                        <Col span="6">报告修改时间：{reportData.lastUpdateTime}</Col>
                        <Col span="6">报告用时：{reportData.hour}</Col>
                    </Row>
                </ScCard>
                <ScCard title="漏洞统计" hoverable>
                    <Row>
                        <Col span="4">漏洞有效个数：{holeData.valid}</Col>
                        <Col span="4">漏洞无效个数：{holeData.invalid}</Col>
                        <Col span="4">存疑个数：{holeData.doubt}</Col>
                        <Col span="4">误报个数：{holeData.miss}</Col>
                        <Col span="4">有效漏洞比例：{holeData.proportion}</Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span="4" style={{ color: '#e92b1d' }}>
                            <strong>高危漏洞：{holeData.highVulnerability}</strong>
                        </Col>
                        <Col span="4" style={{ color: '#ee8035' }}>
                            <strong>中危漏洞：{holeData.middleVulnerability}</strong>
                        </Col>
                        <Col span="4" style={{ color: 'rgb(102,187,59)' }}>
                            <strong>低危漏洞：{holeData.lowVulnerability}</strong>
                        </Col>
                    </Row>
                </ScCard>
                <Layout style={{ marginTop: '20px' }}>
                    <Sider theme="light" width="300px">
                        <h2>目录</h2>
                        <Tree
                            checkable
                            onExpand={onExpand}
                            expandedKeys={expandedKeys}
                            onCheck={onCheck}
                            checkedKeys={checkedKeys}
                            autoExpandParent={autoExpandParent}
                            treeData={treeData}
                            onSelect={onSelect}
                            selectedKeys={selectedKeys}
                        />
                    </Sider>
                    <Content style={{ background: '#fff' }}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            form={form}
                        >
                            {controlData.indexOf('1') !== -1 ? (
                                <Collapse
                                    onChange={callback}
                                    activeKey={openData}
                                    expandIconPosition="right"
                                    style={{ marginBottom: '20px' }}
                                >
                                    <Panel header="1.摘要" key="10">
                                        <Form.Item
                                            label="1.1.安全问题分布图 "
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Form.Item
                                            label="1.2.安全问题摘要总汇表 "
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Form.Item label="1.3.安全分析 " labelCol={{ span: 24 }}>
                                            <TextArea rows={3} value="安全分析" disabled></TextArea>
                                        </Form.Item>
                                    </Panel>
                                </Collapse>
                            ) : (
                                ''
                            )}
                            {controlData.indexOf('2') !== -1 ? (
                                <Collapse
                                    onChange={callback}
                                    activeKey={openData}
                                    expandIconPosition="right"
                                    style={{ marginBottom: '20px' }}
                                >
                                    <Panel header="2.服务概述" key="11">
                                        <Form.Item
                                            label="2.1.测试流程"
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Form.Item
                                            label="2.2.测试对象与人员"
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Form.Item
                                            label="2.3.参考依据"
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Form.Item
                                            label="2.4.预期收益"
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                    </Panel>
                                </Collapse>
                            ) : (
                                ''
                            )}
                            {controlData.indexOf('3') !== -1 ? (
                                <Collapse
                                    onChange={callback}
                                    activeKey={openData}
                                    expandIconPosition="right"
                                    style={{ marginBottom: '20px' }}
                                >
                                    <Panel header="3.测试服务说明" key="12">
                                        <Form.Item
                                            label="3.1.测试对象与环境"
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Form.Item
                                            label="3.2.测试对象与人员"
                                            labelCol={{ span: 24 }}
                                        >
                                            <TextArea
                                                rows={3}
                                                value="测试对象与人员"
                                                disabled
                                            ></TextArea>
                                        </Form.Item>
                                        <Form.Item
                                            label="3.3.准备工作"
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Form.Item
                                            label="3.4.工具及相关资料"
                                            labelCol={{ span: 24 }}
                                        >
                                            <TextArea rows={3} disabled></TextArea>
                                        </Form.Item>
                                    </Panel>
                                </Collapse>
                            ) : (
                                ''
                            )}
                            {controlData.indexOf('4') !== -1 ? (
                                <Collapse
                                    onChange={callback}
                                    activeKey={openData}
                                    expandIconPosition="right"
                                    style={{ marginBottom: '20px' }}
                                >
                                    <Panel header="4.测试过程详述" key="13">
                                        <Form.Item
                                            label="4.1.测试发现问题整理"
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Form.Item
                                            label="4.2.渗透测试结果"
                                            labelCol={{ span: 24 }}
                                        ></Form.Item>
                                        <Table
                                            size="small"
                                            columns={PenetrationtestDetailTable}
                                            dataSource={penetration}
                                            rowSelection={{
                                                ...rowSelection,
                                            }}
                                            pagination={{
                                                defaultCurrent: 1,
                                                total,
                                                onChange: pageChange,
                                            }}
                                            rowKey={(record) => record.id}
                                        />
                                    </Panel>
                                </Collapse>
                            ) : (
                                ''
                            )}
                            {controlData.indexOf('5') !== -1 ? (
                                <Collapse
                                    onChange={callback}
                                    activeKey={openData}
                                    expandIconPosition="right"
                                    style={{ marginBottom: '20px' }}
                                >
                                    <Panel header="5.测试结果与建议" key="14">
                                        <Form.Item
                                            name="安全建议"
                                            label="5.1.安全建议"
                                            labelCol={{ span: 24 }}
                                        >
                                            <TextArea rows={3} disabled></TextArea>
                                        </Form.Item>
                                        <Form.Item
                                            name="5.2.其他建议"
                                            labelCol={{ span: 24 }}
                                            label="5.2.其他建议"
                                        >
                                            <TextArea rows={3} disabled></TextArea>
                                        </Form.Item>
                                    </Panel>
                                </Collapse>
                            ) : (
                                ''
                            )}
                            {controlData.indexOf('6') !== -1 ? (
                                <Collapse
                                    onChange={callback}
                                    activeKey={openData}
                                    expandIconPosition="right"
                                >
                                    <Panel header="致谢" key="15">
                                        <p style={{ margin: '30px' }}>
                                            在本次远程渗透测试过程中，部门的相关人员和在渗透测试过程中进行沟通、协调的相关部门和人员的大力配合，以使得我们的工作能够顺利完成。对于您的大力支持我们深表感谢。
                                        </p>
                                    </Panel>
                                </Collapse>
                            ) : (
                                ''
                            )}
                            {controlData.indexOf('7') !== -1 ? (
                                <Collapse
                                    onChange={callback}
                                    activeKey={openData}
                                    expandIconPosition="right"
                                    style={{ marginTop: '20px' }}
                                >
                                    {reportData.status === '不通过' || reportStatu === 'Review' ? (
                                        <Panel header="评价与建议" key="16">
                                            <Row>
                                                <Col span={12}>
                                                    工程师：{reportData.createUserName}
                                                </Col>
                                                <Col span={12}>
                                                    低效
                                                    <Rate
                                                        defaultValue={5}
                                                        Value={ability}
                                                        onChange={countChange}
                                                    />
                                                    高效
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="attitudeComment"
                                                        label="工作态度"
                                                    >
                                                        <Input
                                                            placeholder="评价工程师"
                                                            style={{ width: '400px' }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    敷衍
                                                    <Rate
                                                        defaultValue={5}
                                                        Value={attitude}
                                                        onChange={countTwoChange}
                                                    />
                                                    认真
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item name="comment" label="评语">
                                                        <TextArea rows={4} placeholder="评语" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                    ) : (
                                        ''
                                    )}
                                </Collapse>
                            ) : (
                                ''
                            )}
                            <Collapse
                                onChange={callback}
                                activeKey={openData}
                                expandIconPosition="right"
                                style={{ marginBottom: '20px' }}
                            >
                                {reportData.status === '待评审' && reportStatu === 'isPreView' ? (
                                    <Panel header="评价与建议" key="17">
                                        <Row>
                                            <Col span={12}>工程师：{reportData.createUserName}</Col>
                                            <Col span={12}>
                                                低效
                                                <Rate
                                                    defaultValue={5}
                                                    Value={ability}
                                                    onChange={countChange}
                                                />
                                                高效
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item name="attitudeComment" label="工作态度">
                                                    <Input
                                                        placeholder="评价工程师"
                                                        style={{ width: '400px' }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                敷衍
                                                <Rate
                                                    defaultValue={5}
                                                    Value={attitude}
                                                    onChange={countTwoChange}
                                                />
                                                认真
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item name="comment" label="评语">
                                                    <TextArea rows={4} placeholder="评语" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                ) : (
                                    ''
                                )}
                            </Collapse>
                            {reportStatu === 'generatereport' || reportData.status === '已通过' ? (
                                <div style={{ textAlign: 'right' }}>
                                    {downWait ? (
                                        <Spin style={{ marginLeft: '25%' }}>
                                            <span>报告生成中，生成后可在报告列表中下载，谢谢</span>
                                        </Spin>
                                    ) : (
                                        ''
                                    )}
                                    <Button
                                        onClick={() => {
                                            history.go(-1);
                                        }}
                                        style={{ float: 'left' }}
                                    >
                                        返回
                                    </Button>
                                    {isShowButton ? (
                                        <Button
                                            onClick={() => downloadReport(downloadId)}
                                            style={{ marginRight: '10px' }}
                                            type="link"
                                        >
                                            下载
                                        </Button>
                                    ) : null}
                                    <Button style={{ float: 'right' }} onClick={generatorReport}>
                                        生成报告
                                    </Button>
                                </div>
                            ) : (
                                ''
                            )}
                            {reportData.status === '不通过' ? (
                                <div style={{ marginTop: '20px' }}>
                                    <Button
                                        onClick={() => {
                                            history.go(-1);
                                        }}
                                    >
                                        返回
                                    </Button>
                                </div>
                            ) : (
                                ''
                            )}
                            {reportData.status === '待评审' && reportStatu === 'Review' ? (
                                <div style={{ marginTop: '20px' }}>
                                    <Button
                                        onClick={() => {
                                            history.go(-1);
                                        }}
                                    >
                                        返回
                                    </Button>
                                    <div style={{ float: 'right' }}>
                                        <Button
                                            onClick={() => {
                                                checkResult('false');
                                                showModal(reportData.projectId);
                                            }}
                                        >
                                            不通过
                                        </Button>
                                        <Button style={{ marginLeft: '10px' }} htmlType="submit">
                                            审核通过
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                        </Form>
                        <Drawer
                            title="漏洞详情"
                            width={720}
                            onClose={onClose}
                            visible={visible}
                            bodyStyle={{ paddingBottom: 80 }}
                        >
                            <SysVulDeltailForm ids={VulId} />
                        </Drawer>
                        <Modal
                            title="工作量记录"
                            visible={visiblemodal}
                            width="600px"
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <SubmitReportModal itemData={itemData} func={handleOk} />
                        </Modal>
                    </Content>
                </Layout>
            </ScContent>
        </>
    );
};
export default PenetrationtestPage;
