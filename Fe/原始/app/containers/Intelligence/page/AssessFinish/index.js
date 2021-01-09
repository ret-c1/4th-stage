import React, { useState, useEffect } from 'react';
import { ShrinkOutlined, ArrowsAltOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Collapse, Timeline } from 'antd';
import styled from 'styled-components';
import { searchParams } from '@utils/searchParams';
import moment from 'moment';
import CircleDot from '../../components/CircleDot';
import AssessBasicInfo from '../../components/AssessBasicInfo';
import { AssessStatus } from '../../components/AssessStatus';
import { threatInfo } from '../api';

const { Panel } = Collapse;

const ScItWrapper = styled.div`
    margin: 21px 24px 16px 24px;
    background-color: #fff;
`;

const ScCustomCollapse = styled(Collapse)`
    margin-bottom: 16px;
    background: #fff;
    box-sizing: border-box;
    border-bottom: none;
    & .ant-collapse-header {
        border-bottom: 1px solid #e8e8e8;
    }
`;

const ScTimeLineDiv = styled.div`
    margin-left: 33px;
`;

const AssessFinish = () => {
    const { id } = searchParams();
    const [info, setInfo] = useState({});
    useEffect(() => {
        threatInfo(id).then((res) => {
            if (res.code === 200) {
                setInfo(res.data);
            }
        });
    }, []);

    // 定义状态
    let engineerStatus = '已上报';
    let expertStatus = '已上报';
    let opetaterStatus = '已上报';
    if (info.status === 1) {
        engineerStatus = '已上报';
        expertStatus = '未审批';
        opetaterStatus = '未审批';
    }
    if (info.status === 2) {
        engineerStatus = '已上报';
        expertStatus = '已通过';
        opetaterStatus = '未审批';
    }
    if (info.status === 3) {
        engineerStatus = '已上报';
        expertStatus = '未通过';
        opetaterStatus = '未审批';
    }
    if (info.status === 4) {
        engineerStatus = '已上报';
        expertStatus = '已通过';
        opetaterStatus = '已通过';
    }
    if (info.status === 5) {
        engineerStatus = '已上报';
        expertStatus = '已通过';
        opetaterStatus = '未通过';
    }
    return (
        <>
            <ScItWrapper>
                <AssessBasicInfo allInfo={info} />
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
                                                info.status > 1 ? '#2FC25B' : 'rgba(0,0,0,0.25)'
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
                                                info.status > 3 ? '#2FC25B' : 'rgba(0,0,0,0.25)'
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
                                                        : 'rgba(0,0,0,0.25)',
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

export default AssessFinish;
