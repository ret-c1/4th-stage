import request from '@utils/request';
// 查询事件研判记录
export const queryRecord = (formdata) =>
    request(`/api/threat/analysis/event/query`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询所有用户
export const allUser = (formdata) =>
    request(`/api/user/page`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 事件研判分派应急/创建应急
export const emergencyDistribute = (formdata) =>
    request(`/api/emergency/threat/dispatch`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 事件列表
export const getEvent = (formdata) =>
    request('/api/threat/analysis/invests', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 未排查列表
export const assetUndoListAction = (params) =>
    request('/api/threat/asset/undo/invests', {
        method: 'POST',
        body: JSON.stringify(params || {}),
        headers: {
            'content-type': 'application/json',
        },
    });

// 排查中列表
export const assetDoingListAction = (params) =>
    request('/api/threat/asset/doing/invests', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

// 事件排查结果列表
export const getResultListAction = (params) =>
    request('/api/threat/analysis/invests', {
        method: 'POST',
        body: JSON.stringify(params || {}),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询研判记录
export const queryEventAction = (params) =>
    request('/api/threat/analysis/event/query', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });
