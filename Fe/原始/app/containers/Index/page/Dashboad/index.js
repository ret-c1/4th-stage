import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Avatar, Table, Button, Form, Drawer, Input, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
// import { gloabconfig } from '@containers/config';
// import { authAction } from '@utils/authority';
import { ScContent } from '../styled';
import picture1 from '../../asset/1.png';
import picture2 from '../../asset/2.png';
import picture3 from '../../asset/3.png';
import picture4 from '../../asset/4.png';
import { getShow, getAddRecord, getPlanShow, queryEmergency, queryThreat } from '../api';

const { TextArea } = Input;
const columns = [
    {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
    },
    {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
    },
    {
        title: '任务类型',
        dataIndex: 'type',
        key: 'type',
    },
];
const DashboadPage = () => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const formFinish = (value) => {
        getAddRecord({ content: value.content }).then((res) => {
            if (res.code === 200) {
                // setDataShow(res.data);
            }
        });
    };
    const [dataShow, setDataShow] = useState({});
    const [limit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [tableData, settableData] = useState([]);
    const [total, setTotal] = useState(0);
    const action = [
        {
            title: '操作',
            dataIndex: 'executor',
            key: 'executor',
            align: 'center',
            render: (text, record) => (
                <>
                    {record.type === '应急任务' ? (
                        <Button
                            type="link"
                            onClick={() => {
                                queryEmergency({ id: record.id }).then((res) => {
                                    if (res.code === 200) {
                                        const { emergencyId, eventId } = res.data;
                                        if (eventId) {
                                            history.push(
                                                `/incident/emergency?id=${emergencyId}&eventId=${eventId}`,
                                            );
                                        } else {
                                            history.push(`/incident/emergency?id=${emergencyId}`);
                                        }
                                    }
                                });
                            }}
                        >
                            处置应急
                        </Button>
                    ) : null}
                    {record.type === '威胁排查任务' ? (
                        <Button
                            type="link"
                            onClick={() => {
                                queryThreat({ planId: record.id }).then((res) => {
                                    if (res.code === 200) {
                                        const { projectId, threatId } = res.data;
                                        history.push(
                                            `/intelligence/threatdetection/process?planId=${record.id}&threatId=${threatId}&projectId=${projectId}`,
                                        );
                                    }
                                });
                            }}
                        >
                            威胁排查
                        </Button>
                    ) : null}
                    {record.executor === 60 ? (
                        <Button
                            type="link"
                            onClick={() => {
                                history.push(
                                    `/penetration/add?planId=${record.id}&&projectName=${record.projectName}`,
                                );
                                // window.open(
                                //     `${gloabconfig.redirecturl}/#/penetrate/addReport?planId=${
                                //         record.id
                                //     }&projectName=${
                                //         record.projectName
                                //     }&display=true&token=${authAction.get()}`,
                                // );
                            }}
                        >
                            新建报告
                        </Button>
                    ) : null}
                    {record.executor === 61 ? (
                        <Button
                            type="link"
                            onClick={() => {
                                history.push({
                                    pathname: '/scan/add',
                                    state: {
                                        planId: record.id,
                                        projectName: record.projectName,
                                    },
                                });
                            }}
                        >
                            新建报告
                        </Button>
                    ) : null}
                    {record.executor === 62 ? (
                        <Button
                            type="link"
                            onClick={() => {
                                // window.open(
                                //     `${
                                //         gloabconfig.redirecturl
                                //     }/#/penetrate/secureConfigCheckAdd?planId=${
                                //         record.id
                                //     }&projectName=${
                                //         record.projectName
                                //     }&display=true&token=${authAction.get()}`,
                                // );
                                window.open('http://1.1.1.1:27003');
                            }}
                        >
                            新建报告
                        </Button>
                    ) : null}
                </>
            ),
        },
    ];
    const pageChange = (page, pageSize) => {
        setOffset((page - 1) * pageSize);
    };
    useEffect(() => {
        getPlanShow({ limit, offset, param: {} }).then((res) => {
            if (res.code === 200) {
                settableData(res.data.records);
                setTotal(res.data.total);
            }
        });
    }, [limit, offset]);
    useEffect(() => {
        getShow().then((res) => {
            if (res.code === 200) {
                setDataShow(res.data);
            }
        });
        getPlanShow({ limit, offset, param: {} }).then((res) => {
            if (res.code === 200) {
                settableData(res.data.records);
                setTotal(res.data.total);
            }
        });
    }, []);
    return (
        <>
            <ScContent>
                <Card hoverable>
                    <Row gutter={180}>
                        <Col span={5}>
                            <Row
                                justify="space-between"
                                onClick={() => history.push('/project/list')}
                            >
                                <Col>
                                    <Avatar shape="square" size={64} src={picture1} />
                                </Col>
                                <Col>
                                    <div>
                                        <span style={{ fontSize: '30px' }}>
                                            {dataShow.projectNum}
                                        </span>
                                        <p>服务项目数</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={5}>
                            <Row
                                justify="space-between"
                                onClick={() => history.push('/penetration/list')}
                            >
                                <Col>
                                    <Avatar shape="square" size={64} src={picture2} />
                                </Col>
                                <Col>
                                    <div>
                                        <span style={{ fontSize: '30px' }}>
                                            {dataShow.reportNum}
                                        </span>
                                        <p>创建报告数</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={5}>
                            <Row
                                justify="space-between"
                                onClick={() => history.push('/vulmanager/list/project')}
                            >
                                <Col>
                                    <Avatar shape="square" size={64} src={picture3} />
                                </Col>
                                <Col>
                                    <div>
                                        <span style={{ fontSize: '30px' }}>
                                            {dataShow.vulnerabilityNum}
                                        </span>
                                        <p>发现漏洞数</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={5}>
                            <Row justify="space-between">
                                <Col>
                                    <Avatar shape="square" size={64} src={picture4} />
                                </Col>
                                <Col>
                                    <div>
                                        <span style={{ fontSize: '20px' }}>
                                            {dataShow.lastLoginTime}
                                        </span>
                                        <p style={{ marginTop: '10px' }}>最近服务时间</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Row style={{ marginTop: '20px' }} gutter={12}>
                    <Col span={12}>
                        <Card hoverable>
                            <strong style={{ fontSize: '15px' }}>待办事项</strong>
                            <Table
                                columns={columns.concat(action)}
                                style={{ marginTop: '10px' }}
                                dataSource={tableData}
                                rowKey={(record) => record.id}
                                pagination={{
                                    defaultCurrent: 1,
                                    total,
                                    onChange: pageChange,
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card hoverable>
                            <strong style={{ fontSize: '15px' }}>备忘录</strong>
                            <div style={{ marginTop: '10px' }}>
                                <Button type="primary" onClick={showDrawer}>
                                    <PlusOutlined /> 新建备忘
                                </Button>
                            </div>
                            <Row gutter={10} style={{ marginTop: '10px' }}>
                                <Col span={12}>
                                    <TextArea rows={4} />
                                </Col>
                                <Col span={12}>
                                    <TextArea rows={4} />
                                </Col>
                            </Row>
                            <Pagination
                                defaultCurrent={1}
                                total={20}
                                style={{
                                    textAlign: 'right',
                                    marginTop: '20px',
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
                <Drawer
                    title="新建备忘"
                    width={720}
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" onFinish={formFinish}>
                        <Form.Item name="content">
                            <TextArea rows={4} />
                        </Form.Item>
                        <div
                            style={{
                                textAlign: 'right',
                                marginTop: '20px',
                            }}
                        >
                            <Button onClick={onClose} style={{ marginRight: 8 }}>
                                返回
                            </Button>
                            <Button onClick={onClose} htmlType="submit">
                                保存
                            </Button>
                        </div>
                    </Form>
                </Drawer>
            </ScContent>
        </>
    );
};
export default DashboadPage;
