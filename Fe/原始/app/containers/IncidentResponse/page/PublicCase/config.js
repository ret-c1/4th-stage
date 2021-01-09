import React from 'react';
import { Tag } from 'antd';
import moment from 'moment';
export const columns = [
    {
        title: '事件关键字',
        dataIndex: 'keyword',
        key: 'keyword',
    },
    {
        title: '事件等级',
        dataIndex: 'level',
        key: 'level',
        filters: [
            { text: '一级', value: '一级' },
            { text: '二级', value: '二级' },
            { text: '三级', value: '三级' },
            { text: '四级', value: '四级' },
            { text: '五级', value: '五级' },
        ],
        onFilter: (value, record) => record.level.indexOf(value) === 0,
        render: (text) => {
            if (text === '一级') {
                return (
                    <Tag color="#B7EB8F">
                        <span style={{ color: '#52C41A' }}>{text}</span>
                    </Tag>
                );
            }
            if (text === '二级') {
                return (
                    <Tag color="#91D5FF">
                        <span style={{ color: '#1890FF' }}>{text}</span>
                    </Tag>
                );
            }
            if (text === '三级') {
                return (
                    <Tag color="#FAAD14">
                        <span style={{ color: '#DE9F21' }}>{text}</span>
                    </Tag>
                );
            }
            if (text === '四级') {
                return (
                    <Tag color="#FFA39E">
                        <span style={{ color: '#F5222D' }}>{text}</span>
                    </Tag>
                );
            }
            if (text === '五级') {
                return (
                    <Tag color="#D3ADF7">
                        <span style={{ color: '#722ED1' }}>{text}</span>
                    </Tag>
                );
            }
            return <Tag>{text}</Tag>;
        },
    },
    {
        title: '应急人员',
        dataIndex: 'emergencyPerson',
        key: 'emergencyPerson',
    },
    {
        title: '发生时间',
        key: 'happenTime',
        dataIndex: 'happenTime',
        render: (text) => text && moment(text).format('YYYY-MM-DD: HH:MM:SS'),
    },
];
