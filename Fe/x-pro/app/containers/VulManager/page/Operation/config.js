import React from 'react';
import { Tooltip } from 'antd';
import { TYPE_INPUT, TYPE_SELECT } from '@components/FormItem/utils';
import moment from 'moment';

export const columns = [
    {
        title: '漏洞名称',
        dataIndex: 'vulName',
        width: 172,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '客户名称',
        dataIndex: 'clientName',
        width: 172,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '项目名称',
        dataIndex: 'projectName',
        width: 172,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '漏洞类型',
        dataIndex: 'vulType',
    },
    {
        title: '漏洞状态',
        dataIndex: 'vulBugStatus',
    },
    {
        title: '漏洞风险程度',
        dataIndex: 'vulLevel',
    },
    {
        title: '漏洞处置人',
        dataIndex: 'userName',
    },
    {
        title: '应用名称',
        dataIndex: 'applicationName',
    },
    {
        title: '资产IP',
        dataIndex: 'vulIp',
    },
    {
        title: '更新时间',
        dataIndex: 'lastUpdateTime',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
];

export const basicFormconfig = [
    {
        type: TYPE_INPUT,
        name: 'clientName',
        label: '客户名称',
        placeholder: '',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'projectName',
        label: '项目名称',
        placeholder: '',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'vulName',
        label: '漏洞名称',
        placeholder: '',
        width: 200,
        options: [],
    },
    {
        type: TYPE_SELECT,
        name: 'vulBugStatus',
        label: '漏洞状态',
        placeholder: '',
        width: 200,
        options: [
            {
                value: '待分配',
                text: '待分配',
            },
            {
                value: '待处置',
                text: '待处置',
            },
            {
                value: '待验证',
                text: '待验证',
            },
            {
                value: '已修复',
                text: '已修复',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'level',
        label: '漏洞风险程度',
        placeholder: '',
        width: 200,
        options: [
            {
                value: '高危',
                text: '高危',
            },
            {
                value: '中危',
                text: '中危',
            },
            {
                value: '低危',
                text: '低危',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'ip',
        label: '资产IP',
        placeholder: '',
        width: 200,
        options: [],
    },
];
