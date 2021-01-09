import request from '@utils/request';

// 威胁类别统计
export const queryThreatCategory = () =>
    request('/api/hw/statistics/securityEvent/threatCategory', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
// 工单排查统计
export const queryWorkOrder = (formdata) =>
    request('/api/hw/statistics/securityEvent/workOrder', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 安全事件趋势统计
export const queryTrend = () =>
    request('/api/hw/statistics/securityEvent/trend', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });

// 事件类型统计
export const queryEventType = (formdata) =>
    request('/api/hw/statistics/securityEvent/eventType', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 威胁分诊统计
export const queryThreatTriage = () =>
    request('/api/hw/statistics/securityEvent/threatTriage', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
