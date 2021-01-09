import React, { useEffect, useState } from 'react';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import PubMessage from '@components/PubMessage';
import { ScCustomCollapse, ScCustomPanel } from './styled';
import EventBasicInfo from '../../components/EventBasicInfo';
import Step1CheckRecord from '../Emergency/components/Step1CheckRecord';
import Step1Judgement from '../Emergency/components/Step1Judgement';
import { warningRecord, logRecord, queryRecord } from '../api';

const EventCheck = () => {
    // 获取事件id
    const { id } = searchParams();

    // 获取事件告警分析记录详细信息
    const [warningInfo, setWarningInfo] = useState(null);
    // 获取事件日志分析记录详细信息
    const [logInfo, setLogInfo] = useState(null);
    // 获取事件研判记录详细信息
    const [queryInfo, setQueryInfo] = useState({});
    useEffect(() => {
        queryRecord({ id }).then((res) => {
            if (res.code === 200) {
                setQueryInfo(res.data);
                // 如果关联日志分析记录
                if (res.data.threatLogAnalysisId) {
                    logRecord({ id: res.data.threatLogAnalysisId }).then((logRes) => {
                        if (logRes.code === 200) {
                            setLogInfo(logRes.data);
                        } else {
                            PubMessage('error', logRes.message);
                        }
                    });
                }
                // 如果关联告警分析记录
                if (res.data.threatWarnAnalysisId) {
                    warningRecord({ id: res.data.threatWarnAnalysisId }).then((warnRes) => {
                        if (warnRes.code === 200) {
                            setWarningInfo(warnRes.data);
                        } else {
                            PubMessage('error', warnRes.message);
                        }
                    });
                }
            } else {
                PubMessage('error', res.message);
            }
        });
    }, []);

    // 获取

    return (
        <div style={{ margin: '21px 24px 56px 24px' }}>
            <ScCustomCollapse
                bordered={false}
                defaultActiveKey={['basicInfo', 'checkRecord', 'judgement']}
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
                            应急事件信息
                        </span>
                    }
                    key="basicInfo"
                >
                    <div style={{ padding: '16px 32px 32px' }}>
                        <EventBasicInfo info={queryInfo} />
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
                    key="checkRecord"
                >
                    <div style={{ padding: '16px 32px 32px' }}>
                        <Step1CheckRecord oLogInfo={logInfo} oWarningInfo={warningInfo} />
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
                    key="judgement"
                >
                    <div style={{ padding: '16px 32px 32px' }}>
                        <Step1Judgement info={queryInfo} />
                    </div>
                </ScCustomPanel>
            </ScCustomCollapse>
        </div>
    );
};

export default EventCheck;
