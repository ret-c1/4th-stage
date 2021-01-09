import request from '@utils/request';

export const threatInfo = (value) =>
    request(`/api/threat/${value}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

export const getClientName = (params) =>
    request('/api/threat/relate/clients', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

// 威胁资产关键指标
export const getAssetKey = (params) =>
    request('/api/threat/asset/keyIndex', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });
// 任务列表
export const getTaskList = (params) =>
    request('/api/threat/plans', {
        method: 'POST',
        body: JSON.stringify(params || {}),
        headers: {
            'content-type': 'application/json',
        },
    });
