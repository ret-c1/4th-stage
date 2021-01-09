import request from '@utils/request';

// 获取漏洞列表
export const getWorkOrderList = (formdata) =>
    request('/api/workOrder/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 分配处置人
export const postOrder = (formdata) =>
    request('/api/workOrder/dispatch', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 工单详情
export const getWorkOrderDetail = (formdata) =>
    request('/api/workOrder/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 漏洞详情
export const getVulDetail = (formdata) =>
    request('/api/vulnerability/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 工单处置
export const commitOrder = (formdata) =>
    request('/api/workOrder/commit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
