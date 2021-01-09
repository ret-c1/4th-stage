import request from '@utils/request';

// 众测大屏接口
export const getIsrc = (formdata) =>
    request('/api/hw/statistics/isrc', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 事件管理接口
export const getEvent = (formdata) =>
    request('/api/hw/statistics/eventManager', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 应急响应接口
export const getEmergency = (formdata) =>
    request('/api/hw/statistics/hwEmergency', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 健康度接口
export const getHealthy = (formdata) =>
    request('/api/hw/statistics/hwHealth', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// SLA接口
export const getSLA = (formdata) =>
    request('/api/hw/statistics/levelSpend', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 事件响应接口
export const getResponsive = (formdata) =>
    request('/api/hw/statistics/eventSpend', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 事件完成接口
export const getEventFinish = (formdata) =>
    request('/api/hw/statistics/eventPic', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
