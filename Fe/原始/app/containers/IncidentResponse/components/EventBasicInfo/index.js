import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';
import moment from 'moment';

const EventBasicInfo = (props) => {
    const { info } = props;
    return (
        <Descriptions bordered column={3}>
            <Descriptions.Item label="事件名称" key="事件名称">
                {info.eventName}
            </Descriptions.Item>
            <Descriptions.Item label="事件类型" span={2} key="事件类型">
                {info.eventType}
            </Descriptions.Item>
            <Descriptions.Item label="事件关键字" key="事件关键字">
                {info.eventKeyword}
            </Descriptions.Item>
            <Descriptions.Item label="事件级别" key="事件级别">
                {info.eventLevel}
            </Descriptions.Item>
            <Descriptions.Item label="事件紧急度" key="事件紧急度">
                {info.eventEmergencyLevel}
            </Descriptions.Item>
            <Descriptions.Item label="事件描述" span={3} key="事件描述">
                {info.eventDescription}
            </Descriptions.Item>
            <Descriptions.Item label="来源IP" key="来源IP">
                {info.sourceIps}
            </Descriptions.Item>
            <Descriptions.Item label="攻击来源" key="攻击来源">
                {info.attachSource}
            </Descriptions.Item>
            <Descriptions.Item label="攻击所属业务系统" key="攻击所属业务系统">
                {info.sourceSystem}
            </Descriptions.Item>
            <Descriptions.Item label="目的IP" key="目的IP">
                {info.destIps}
            </Descriptions.Item>
            <Descriptions.Item label="目的来源" key="目的来源">
                {info.destSource}
            </Descriptions.Item>
            <Descriptions.Item label="目的所属业务系统" key="目的所属业务系统">
                {info.destSystem}
            </Descriptions.Item>
            <Descriptions.Item label="事件发生时间" key="事件发生时间">
                {moment(info.eventAppearTime).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="事件发现时间" span={2} key="事件发现时间">
                {moment(info.eventFoundTime).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
        </Descriptions>
    );
};

EventBasicInfo.propTypes = {
    info: PropTypes.object,
};

export default EventBasicInfo;
