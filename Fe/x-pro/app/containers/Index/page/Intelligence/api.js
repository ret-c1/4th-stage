import request from '@utils/request';

// 查找项目经理下的项目
export const allProject = (formdata) =>
    request('/api/project/view', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 项目经理列表
export const getThreatsManager = (formdata) =>
    request('/api/threats/manager', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 人员列表
export const getEmployee = (formdata) =>
    request('/api/employee', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 模糊匹配情报名称
export const getThreatNames = (formdata) =>
    request('/api/threat/names', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查找今日最新情报
export const getTodayNews = (formdata) =>
    request('/api/threats/manager', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 重点关注情报
export const getFocusNews = (formdata) =>
    request('/api/threat/focus', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查找TOP10情报
export const getTop10 = (formdata) =>
    request('/api/threat/top10', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
