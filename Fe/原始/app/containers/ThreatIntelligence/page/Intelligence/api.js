import request from '@utils/request';

// 工程师情报列表
export const getThreatsEngineer = (formdata) =>
    request('/api/threats/engineer', {
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
