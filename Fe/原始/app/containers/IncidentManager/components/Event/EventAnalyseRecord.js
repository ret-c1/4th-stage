import React from 'react';
import { Descriptions } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const EventAnalyseRecord = (props) => {
    const { eventRecord } = props;
    return (
        <>
            <Descriptions column={{ md: 2 }} title="事件信息">
                <Descriptions.Item label="事件名称" key="eventName">
                    {eventRecord && eventRecord.eventName}
                </Descriptions.Item>
                <Descriptions.Item label="事件描述" key="eventDescription">
                    {eventRecord && eventRecord.eventDescription}
                </Descriptions.Item>
                <Descriptions.Item label="事件类型" key="eventType">
                    {eventRecord && eventRecord.eventType}
                </Descriptions.Item>
                <Descriptions.Item label="事件关键字" key="eventKeyword">
                    {eventRecord && eventRecord.eventKeyword}
                </Descriptions.Item>
                <Descriptions.Item label="事件级别" key="eventLevel">
                    {eventRecord && eventRecord.eventLevel}
                </Descriptions.Item>
                <Descriptions.Item label="紧急程度" key="eventEmergencyLevel">
                    {eventRecord && eventRecord.eventEmergencyLevel}
                </Descriptions.Item>
                <Descriptions.Item label="发现时间" key="eventFoundTime">
                    {eventRecord &&
                        eventRecord.eventFoundTime &&
                        moment(eventRecord.eventFoundTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="发生时间" key="eventAppearTime">
                    {eventRecord &&
                        eventRecord.eventAppearTime &&
                        moment(eventRecord.eventAppearTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="来源IP" key="sourceIps">
                    {eventRecord && eventRecord.sourceIps}
                </Descriptions.Item>
                <Descriptions.Item label="目的IP" key="destIps">
                    {eventRecord && eventRecord.destIps}
                </Descriptions.Item>
                <Descriptions.Item label="攻击来源" key="attachSource">
                    {eventRecord && eventRecord.attachSource}
                </Descriptions.Item>
                <Descriptions.Item label="目的来源" key="destSource">
                    {eventRecord && eventRecord.destSource}
                </Descriptions.Item>
                <Descriptions.Item label="来源系统" key="sourceSystem">
                    {eventRecord && eventRecord.sourceSystem}
                </Descriptions.Item>
                <Descriptions.Item label="目的系统" key="destSystem">
                    {eventRecord && eventRecord.destSystem}
                </Descriptions.Item>
                <Descriptions.Item label="账号" key="account">
                    {eventRecord && eventRecord.account}
                </Descriptions.Item>
                <Descriptions.Item label="密码" key="password">
                    {eventRecord && eventRecord.password}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title="研判结论" column={{ md: 1 }}>
                <Descriptions.Item label="分析结果" key="result">
                    {eventRecord && eventRecord.result === 0 && <span>有效事件</span>}
                    {eventRecord && eventRecord.result === 1 && <span>隐患事件 </span>}
                    {eventRecord && eventRecord.result === 2 && <span>无效事件</span>}
                </Descriptions.Item>
                <Descriptions.Item label="分析结果" key="conclusion">
                    {eventRecord && eventRecord.conclusion}
                </Descriptions.Item>
                <Descriptions.Item label="处置建议" key="suggestion">
                    {eventRecord && eventRecord.suggestion}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};

EventAnalyseRecord.propTypes = {
    eventRecord: PropTypes.object,
};
export default EventAnalyseRecord;
