import request from '@utils/request';

export const getReadyManagerList = (formdata) =>
    request('/api/resource/apply/ready/manager/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getShow = () =>
    request('/api/workbench/show', {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getAddRecord = (formdata) =>
    request('/api/workbench/memo/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getPlanShow = (formdata) =>
    request('/api/workbench/task', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const queryEmergency = (formdata) =>
    request('/api/emergency/queryEmergencyByPlanId', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 根据任务id获取 威胁排查的threadId&projectId
export const queryThreat = (formdata) =>
    request('/api/threat/getByPlanId', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
