import React from 'react';
import { Timeline } from 'antd';
// import { searchParams } from '@utils/searchParams';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CheckCircleFilled } from '@ant-design/icons';
import moment from 'moment';
import { ScTimeLineDiv } from './style';
import CircleDot from '../CircleDot';
import { AssessStatus } from './status';

// 定义状态
let engineerStatus = '已上报';
let expertStatus = '待审批';
let opetaterStatus = '未审批';
const AssessInfo = (props) => {
    const { detail } = props;
    // const history = useHistory();
    // const isAssess = searchParams().type === 'assess';
    // const { id, role } = searchParams()
    if (detail && detail.status === 0) {
        engineerStatus = '未提交';
        expertStatus = '未审批';
        opetaterStatus = '未审批';
    } else if (detail && detail.status === 1) {
        engineerStatus = '已上报';
        expertStatus = '未审批';
        opetaterStatus = '未审批';
    } else if (detail && detail.status === 2) {
        engineerStatus = '已上报';
        expertStatus = '已通过';
        opetaterStatus = '未审批';
    } else if (detail && detail.status === 3) {
        engineerStatus = '已上报';
        expertStatus = '未通过';
        opetaterStatus = '未审批';
    } else if (detail && detail.status === 4) {
        engineerStatus = '已上报';
        expertStatus = '已通过';
        opetaterStatus = '已通过';
    }

    return (
        <Timeline style={{ padding: '16px 72px 32px 46px' }}>
            <Timeline.Item dot={<CircleDot size={9} backgroundColor="#2FC25B" />}>
                <ScTimeLineDiv>
                    <p>工程师</p>
                    <AssessStatus
                        status={engineerStatus}
                        name={detail && detail.userName}
                        time={
                            detail &&
                            detail.createTime &&
                            moment(detail.createTime).format('YYYY-MM-DD HH:mm:ss')
                        }
                    />
                </ScTimeLineDiv>
            </Timeline.Item>
            <Timeline.Item
                dot={
                    <CircleDot
                        size={9}
                        backgroundColor={
                            detail && detail.status > 1 ? '#2FC25B' : 'rgba(0, 0, 0, 0.15)'
                        }
                    />
                }
            >
                <ScTimeLineDiv>
                    <p>情报专家</p>
                    <AssessStatus
                        status={expertStatus}
                        name={detail && detail.threatExpertName}
                        time={
                            detail &&
                            detail.threatApproveTime &&
                            moment(detail.threatApproveTime).format('YYYY-MM-DD HH:mm:ss')
                        }
                        advice={detail && detail.threatApproveAdvice}
                    />
                </ScTimeLineDiv>
            </Timeline.Item>
            <Timeline.Item
                dot={
                    <CircleDot
                        size={9}
                        backgroundColor={
                            detail && detail.status > 3 ? '#2FC25B' : 'rgba(0, 0, 0, 0.15)'
                        }
                    />
                }
            >
                <ScTimeLineDiv>
                    <p>运营专家</p>
                    <AssessStatus
                        status={opetaterStatus}
                        name={detail && detail.operateExpertName}
                        time={
                            detail &&
                            detail.operateApproveTime &&
                            moment(detail.operateApproveTime).format('YYYY-MM-DD HH:mm:ss')
                        }
                        advice={detail && detail.operateApproveAdvice}
                    />
                </ScTimeLineDiv>
            </Timeline.Item>
            <Timeline.Item
                dot={
                    <CheckCircleFilled
                        style={{
                            fontSize: '32px',
                            color: detail && detail.status > 3 ? '#2FC25B' : 'rgba(0, 0, 0, 0.15)',
                        }}
                    />
                }
            >
                <ScTimeLineDiv
                    style={{
                        color: detail && detail.status > 3 ? '#2FC25B' : 'rgba(0,0,0,0.25)',
                        fontWeight: 500,
                    }}
                >
                    审批结束
                </ScTimeLineDiv>
            </Timeline.Item>
        </Timeline>
    );
};
AssessInfo.propTypes = {
    detail: PropTypes.object,
};
export default AssessInfo;
