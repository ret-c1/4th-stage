import React, { useEffect, useState } from 'react';
import {
    ShrinkOutlined,
    ArrowsAltOutlined,
    UpOutlined,
    DownOutlined,
    CheckCircleFilled,
} from '@ant-design/icons';
import { Input, Row, Col, Button, Collapse, Timeline, message } from 'antd';
import { searchParams } from '@utils/searchParams';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
    ScItWrapper,
    ScAssessWrapper,
    ScCustomCollapse,
    ScCustomChildCollapse,
    ScCustomChildPanel,
    ScTitle,
    ScTimeLineDiv,
} from './style';
import CircleDot from '../../components/CircleDot';
import SoftWareTable from '../../components/SoftWareTable';
import { AssessStatus } from '../../components/AssessStatus';
import { InfoItem } from '../../components/InfoItem';
// import {
//     threatInfo,
//     infoExpertResolve,
//     infoExpertReject,
//     operaterExpertReject,
//     operaterExpertResolve,
// } from '../api';

const { Panel } = Collapse;

// 定义状态
let engineerStatus = '已上报';
let expertStatus = '已上报';
let opetaterStatus = '已上报';
const AssessInfo = () => {
    const history = useHistory();
    const isAssess = searchParams().type === 'assess';
    const { id, role } = searchParams();
    const [info, setInfo] = useState({});

    useEffect(() => {
        // threatInfo(id).then((res) => {
        //     if (res.code === 200) {
        //         setInfo(res.data);
        //     }
        // });
    }, []);

    if (info.status === 1) {
        engineerStatus = '已上报';
        expertStatus = '未审批';
        opetaterStatus = '未审批';
    } else if (info.status === 2) {
        engineerStatus = '已上报';
        expertStatus = '已通过';
        opetaterStatus = '未审批';
    } else if (info.status === 3) {
        engineerStatus = '已上报';
        expertStatus = '未通过';
        opetaterStatus = '未审批';
    } else if (info.status === 4) {
        engineerStatus = '已上报';
        expertStatus = '已通过';
        opetaterStatus = '已通过';
    } else if (info.status === 5) {
        engineerStatus = '已上报';
        expertStatus = '已通过';
        opetaterStatus = '未通过';
    }

    // 成功跳转
    const jumpback = () => {
        if (role === 'engineer') {
            history.push('/intelligence/list');
        } else if (role === 'infoExpert') {
            history.push('/intelligence/infoexpertlist');
        } else if (role === 'operaterExpert') {
            history.push('/intelligence/operaterlist');
        } else if (role === 'manager') {
            history.push('/intelligence/threatlist');
        }
    };

    // 审批意见
    const [opinion, setOpinion] = useState('');
    const handleOpinion = (e) => {
        setOpinion(e.target.value);
    };

    // 审批不通过
    const handleAssessReject = () => {
        if (role === 'infoExpert') {
            // infoExpertReject({ id, opinion }).then((res) => {
            //     if (res.code === 200) {
            //         message.success('审批成功');
            //         jumpback();
            //     } else {
            //         message.error(res.message);
            //     }
            // });
        } else if (role === 'operaterExpert') {
            // operaterExpertReject({ id, opinion }).then((res) => {
            //     if (res.code === 200) {
            //         message.success('审批成功');
            //         jumpback();
            //     } else {
            //         message.error(res.message);
            //     }
            // });
        }
    };

    // 审批通过
    const handleAssessResolve = () => {
        if (role === 'infoExpert') {
            // infoExpertResolve({ id, opinion }).then((res) => {
            //     if (res.code === 200) {
            //         message.success('审批成功');
            //         jumpback();
            //     } else {
            //         message.error(res.message);
            //     }
            // });
        } else if (role === 'operaterExpert') {
            // operaterExpertResolve({ id, opinion }).then((res) => {
            //     if (res.code === 200) {
            //         message.success('审批成功');
            //         jumpback();
            //     } else {
            //         message.error(res.message);
            //     }
            // });
        }
    };

    return (
        <>
            {isAssess && (
                <ScAssessWrapper>
                    <Row>
                        <Col xl={{ span: 21 }}>
                            <span>审批意见：</span>
                            <Input
                                style={{ width: '943px' }}
                                placeholder="请输入"
                                onChange={(e) => {
                                    handleOpinion(e);
                                }}
                            />
                        </Col>
                        <Col xl={{ span: 3 }}>
                            <Button
                                style={{ marginRight: '8px' }}
                                onClick={() => {
                                    handleAssessReject();
                                }}
                            >
                                不通过
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {
                                    handleAssessResolve();
                                }}
                            >
                                通过
                            </Button>
                        </Col>
                    </Row>
                </ScAssessWrapper>
            )}
            <ScItWrapper>
                <ScCustomCollapse
                    bordered={false}
                    defaultActiveKey={['allInfo']}
                    expandIconPosition="right"
                    expandIcon={({ isActive }) =>
                        isActive ? (
                            <ShrinkOutlined
                                style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                            />
                        ) : (
                            <ArrowsAltOutlined
                                style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                            />
                        )
                    }
                >
                    <Panel
                        header={
                            <span
                                style={{
                                    fontSize: '16px',
                                    color: 'rgba(0,0,0,0.85)',
                                    lineHeight: '24px',
                                    fontWeight: 500,
                                }}
                            >
                                情报基本信息
                            </span>
                        }
                        key="allInfo"
                    >
                        <React.Fragment key="basicInfo">
                            <Row style={{ marginTop: '24px' }}>
                                <Col xl={{ span: 24 }}>
                                    <ScTitle>漏洞信息</ScTitle>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '16px' }}>
                                <Col xl={{ span: 6 }}>
                                    <InfoItem infoKey="漏洞名称" infoValue={info.vulName} />
                                </Col>
                                <Col xl={{ span: 6, offset: 3 }}>
                                    <InfoItem infoKey="CVE编号" infoValue={info.cve} />
                                </Col>
                                <Col xl={{ span: 6, offset: 3 }}>
                                    <InfoItem infoKey="漏洞等级" infoValue={info.vulLevel} />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '16px' }}>
                                <Col xl={{ span: 6 }}>
                                    <InfoItem infoKey="漏洞类型" infoValue={info.vulType} />
                                </Col>
                                <Col xl={{ span: 6, offset: 3 }}>
                                    <InfoItem infoKey="CNND编号" infoValue={info.cnnd} />
                                </Col>
                                <Col xl={{ span: 6, offset: 3 }}>
                                    <InfoItem infoKey="相关链接" infoValue={info.url} />
                                </Col>
                            </Row>
                        </React.Fragment>
                        <React.Fragment key="softWareInfo">
                            <Row style={{ marginTop: '36px', marginBottom: '16px' }}>
                                <ScTitle>软件信息</ScTitle>
                            </Row>
                            <SoftWareTable data={info.threatSoftwares} />
                        </React.Fragment>
                        <React.Fragment key="noticeInfo">
                            <Row style={{ marginTop: '36px', marginBottom: '12px' }}>
                                <ScTitle>公告信息</ScTitle>
                            </Row>
                            <ScCustomChildCollapse
                                bordered={false}
                                defaultActiveKey={['allInfo', '漏洞公告']}
                                expandIconPosition="right"
                                expandIcon={({ isActive }) =>
                                    isActive ? (
                                        <span>
                                            <span
                                                style={{
                                                    marginRight: 5,
                                                    color: '#1890FF',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                收起
                                            </span>
                                            <UpOutlined
                                                style={{ color: '#1890FF', fontSize: '14px' }}
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <span
                                                style={{
                                                    marginRight: 5,
                                                    color: '#1890FF',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                展开
                                            </span>
                                            <DownOutlined
                                                style={{ color: '#1890FF', fontSize: '14px' }}
                                            />
                                        </span>
                                    )
                                }
                            >
                                <ScCustomChildPanel
                                    header={
                                        <span
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.85)',
                                                margin: '0 12px',
                                            }}
                                        >
                                            漏洞公告
                                        </span>
                                    }
                                    key="漏洞公告"
                                >
                                    <p>{info.notice}</p>
                                </ScCustomChildPanel>
                                <ScCustomChildPanel
                                    header={
                                        <span
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.85)',
                                                margin: '0 12px',
                                            }}
                                        >
                                            影响范围
                                        </span>
                                    }
                                    key="影响范围"
                                >
                                    <p>{info.scope}</p>
                                </ScCustomChildPanel>
                                <ScCustomChildPanel
                                    header={
                                        <span
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.85)',
                                                margin: '0 12px',
                                            }}
                                        >
                                            漏洞描述
                                        </span>
                                    }
                                    key="漏洞描述"
                                >
                                    <p>{info.description}</p>
                                </ScCustomChildPanel>
                                <ScCustomChildPanel
                                    header={
                                        <span
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.85)',
                                                margin: '0 12px',
                                            }}
                                        >
                                            缓解措施
                                        </span>
                                    }
                                    key="缓解措施"
                                >
                                    <p>{info.solution}</p>
                                </ScCustomChildPanel>
                                <ScCustomChildPanel
                                    header={
                                        <span
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.85)',
                                                margin: '0 12px',
                                            }}
                                        >
                                            友情提示
                                        </span>
                                    }
                                    key="友情提示"
                                >
                                    <p>{info.tips}</p>
                                </ScCustomChildPanel>
                            </ScCustomChildCollapse>
                        </React.Fragment>
                    </Panel>
                </ScCustomCollapse>
            </ScItWrapper>
            <ScItWrapper style={{ marginTop: 0 }}>
                <ScCustomCollapse
                    bordered={false}
                    defaultActiveKey={['assessProgress']}
                    expandIconPosition="right"
                    expandIcon={({ isActive }) =>
                        isActive ? (
                            <ShrinkOutlined
                                style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                            />
                        ) : (
                            <ArrowsAltOutlined
                                style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                            />
                        )
                    }
                >
                    <Panel
                        header={
                            <span
                                style={{
                                    fontSize: '16px',
                                    color: 'rgba(0,0,0,0.85)',
                                    lineHeight: '24px',
                                    fontWeight: 500,
                                }}
                            >
                                审批进度
                            </span>
                        }
                        key="assessProgress"
                    >
                        <React.Fragment key="assessInfo">
                            <Timeline style={{ padding: '16px 72px 32px 46px' }}>
                                <Timeline.Item
                                    dot={<CircleDot size={9} backgroundColor="#2FC25B" />}
                                >
                                    <ScTimeLineDiv>
                                        <p>工程师</p>
                                        <AssessStatus
                                            status={engineerStatus}
                                            name={info.username}
                                        />
                                    </ScTimeLineDiv>
                                </Timeline.Item>
                                <Timeline.Item
                                    dot={
                                        <CircleDot
                                            size={9}
                                            backgroundColor={
                                                info.status > 1 ? '#2FC25B' : 'rgba(0, 0, 0, 0.15)'
                                            }
                                        />
                                    }
                                >
                                    <ScTimeLineDiv>
                                        <p>情报专家</p>
                                        <AssessStatus
                                            status={expertStatus}
                                            name={info.threatExpertName}
                                            time={
                                                info.threatApproveTime &&
                                                moment(info.threatApproveTime).format(
                                                    'YYYY-MM-DD HH:mm:ss',
                                                )
                                            }
                                            advice={info.threatApproveAdvice}
                                        />
                                    </ScTimeLineDiv>
                                </Timeline.Item>
                                <Timeline.Item
                                    dot={
                                        <CircleDot
                                            size={9}
                                            backgroundColor={
                                                info.status > 3 ? '#2FC25B' : 'rgba(0, 0, 0, 0.15)'
                                            }
                                        />
                                    }
                                >
                                    <ScTimeLineDiv>
                                        <p>运营专家</p>
                                        <AssessStatus
                                            status={opetaterStatus}
                                            name={info.operateExpertName}
                                            time={
                                                info.operateApproveTime &&
                                                moment(info.operateApproveTime).format(
                                                    'YYYY-MM-DD HH:mm:ss',
                                                )
                                            }
                                            advice={info.operateApproveAdvice}
                                        />
                                    </ScTimeLineDiv>
                                </Timeline.Item>
                                <Timeline.Item
                                    dot={
                                        <CheckCircleFilled
                                            style={{
                                                fontSize: '32px',
                                                color:
                                                    info.status > 3
                                                        ? '#2FC25B'
                                                        : 'rgba(0, 0, 0, 0.15)',
                                            }}
                                        />
                                    }
                                >
                                    <ScTimeLineDiv
                                        style={{
                                            color: info.status > 3 ? '#2FC25B' : 'rgba(0,0,0,0.25)',
                                            fontWeight: 500,
                                        }}
                                    >
                                        审批结束
                                    </ScTimeLineDiv>
                                </Timeline.Item>
                            </Timeline>
                        </React.Fragment>
                    </Panel>
                </ScCustomCollapse>
            </ScItWrapper>
        </>
    );
};

export default AssessInfo;
