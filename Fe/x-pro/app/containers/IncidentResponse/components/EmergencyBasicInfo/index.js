import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';
import moment from 'moment';

const EmergencyBasicInfo = (props) => {
    const { info } = props;
    const [nInfo, setNInfo] = useState(info);
    useEffect(() => {
        setNInfo(info);
    }, [info]);

    return (
        <Descriptions bordered>
            <Descriptions.Item label="事件名称" key="事件名称1">
                {nInfo.name}
            </Descriptions.Item>
            <Descriptions.Item label="事件类型" span={2} key="事件类型2">
                {nInfo.type}
            </Descriptions.Item>
            <Descriptions.Item label="事件关键字" key="事件关键字3">
                {nInfo.keyword}
            </Descriptions.Item>
            <Descriptions.Item label="事件级别" key="事件级别4">
                {nInfo.level}
            </Descriptions.Item>
            <Descriptions.Item label="事件紧急度" key="事件紧急度5">
                {nInfo.urgency}
            </Descriptions.Item>
            <Descriptions.Item label="事件描述" span={3} key="事件描述6">
                {nInfo.description}
            </Descriptions.Item>
            <Descriptions.Item label="来源IP" key="来源IP7">
                {nInfo.targetIp}
            </Descriptions.Item>
            <Descriptions.Item label="攻击来源" key="攻击来源8">
                {nInfo.attack}
            </Descriptions.Item>
            <Descriptions.Item label="攻击所属业务系统" key="攻击所属业务系统">
                {nInfo.intranetSystem}
            </Descriptions.Item>
            <Descriptions.Item label="目的IP" key="目的IP">
                {nInfo.aimIp}
            </Descriptions.Item>
            <Descriptions.Item label="目的来源" key="目的来源">
                {nInfo.aimSecurityDomain}
            </Descriptions.Item>
            <Descriptions.Item label="目的所属业务系统" key="目的所属业务系统">
                {nInfo.internetSystem}
            </Descriptions.Item>
            <Descriptions.Item label="事件发生时间" key="事件发生时间">
                {moment(nInfo.happenTime).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="事件发现时间" span={2} key="事件发现时间">
                {nInfo.realDiscoverTime
                    ? moment(nInfo.realDiscoverTime).format('YYYY-MM-DD HH:mm:ss')
                    : ''}
            </Descriptions.Item>
        </Descriptions>
    );
};

EmergencyBasicInfo.propTypes = {
    info: PropTypes.object,
};

export default EmergencyBasicInfo;
