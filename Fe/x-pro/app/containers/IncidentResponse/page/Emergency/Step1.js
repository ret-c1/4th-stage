import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { message } from 'antd';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { ScCustomCollapse, ScCustomPanel } from './styled';
import EmergencytBasicInfo from '../../components/EmergencyBasicInfo';
import Step1CheckRecord from './components/Step1CheckRecord';
import Step1Judgement from './components/Step1Judgement';
// import { queryRecord, logRecord, warningRecord } from '../api';

const Step1 = (props) => {
    const { eventId, emergencyInfo } = props;
    console.log(eventId);
    // 获取事件告警分析记录详细信息
    const [warningInfo] = useState(null);

    // 获取事件日志分析记录详细信息
    const [logInfo] = useState(null);

    // 获取事件研判记录详细信息
    const [queryInfo] = useState({});
    useEffect(() => {
        // queryRecord({ id: eventId }).then((res) => {
        //     if (res.code === 200) {
        //         // setQueryInfo(res.data);
        //         // 如果关联日志分析记录
        //         if (res.data.threatLogAnalysisId) {
        //             // logRecord({ id: res.data.threatLogAnalysisId }).then((logRes) => {
        //             //     if (logRes.code === 200) {
        //             //         setLogInfo(logRes.data);
        //             //     } else {
        //             //         message.error(logRes.message);
        //             //     }
        //             // });
        //         }
        //         // 如果关联告警分析记录
        //         if (res.data.threatWarnAnalysisId) {
        //             // warningRecord({ id: res.data.threatWarnAnalysisId }).then((warnRes) => {
        //             //     if (warnRes.code === 200) {
        //             //         setWarningInfo(warnRes.data);
        //             //     } else {
        //             //         message.error(warnRes.message);
        //             //     }
        //             // });
        //         }
        //     } else {
        //         message.error(res.message);
        //     }
        // });
    }, []);
    return (
        <div style={{ paddingBottom: '56px' }}>
            <ScCustomCollapse
                bordered={false}
                defaultActiveKey={['eventBasicInfo', 'eventCheckRecord', 'eventJudgement']}
                expandIconPosition="right"
                expandIcon={({ isActive }) =>
                    isActive ? (
                        <ShrinkOutlined style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }} />
                    ) : (
                        <ArrowsAltOutlined
                            style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                        />
                    )
                }
            >
                <ScCustomPanel
                    header={
                        <span
                            style={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.85)',
                                lineHeight: '24px',
                                fontWeight: 500,
                            }}
                        >
                            应急信息
                        </span>
                    }
                    key="eventBasicInfo"
                >
                    <div style={{ padding: '16px 32px 32px' }}>
                        <EmergencytBasicInfo info={emergencyInfo} />
                    </div>
                </ScCustomPanel>
                <ScCustomPanel
                    header={
                        <span
                            style={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.85)',
                                lineHeight: '24px',
                                fontWeight: 500,
                            }}
                        >
                            排查记录
                        </span>
                    }
                    key="eventCheckRecord"
                >
                    <div style={{ padding: '16px 32px 32px' }}>
                        <Step1CheckRecord oWarningInfo={warningInfo} oLogInfo={logInfo} />
                    </div>
                </ScCustomPanel>
                <ScCustomPanel
                    header={
                        <span
                            style={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.85)',
                                lineHeight: '24px',
                                fontWeight: 500,
                            }}
                        >
                            研判结果
                        </span>
                    }
                    key="eventJudgement"
                >
                    <div style={{ padding: '16px 32px 32px' }}>
                        <Step1Judgement info={queryInfo} />
                    </div>
                </ScCustomPanel>
            </ScCustomCollapse>
        </div>
    );
};

Step1.propTypes = {
    eventId: PropTypes.string,
    emergencyInfo: PropTypes.object,
};

export default Step1;
