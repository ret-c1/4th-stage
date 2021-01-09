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
