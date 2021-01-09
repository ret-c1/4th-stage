import request from '@utils/request';

// 情报专家列表
export const getThreatsExpert = (formdata) =>
    request('/api/threats/expert', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 运营专家列表
export const getThreatsOperate = (formdata) =>
    request('/api/threats/operate', {
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
// 删除情报
export const removeThreat = (formdata) =>
    request('/api/threat/remove', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
