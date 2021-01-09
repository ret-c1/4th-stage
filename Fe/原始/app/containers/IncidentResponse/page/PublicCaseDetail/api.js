import request from '@utils/request';

// 所有用户
export const getAllpeople = (formdata) =>
    request('/api/user/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查看案例详情
export const getCaseDetail = (formdata) =>
    request('/api/emergency/case/select', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getStaffLog = (formdata) =>
    request('/api/log/people/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 日志人员总数
export const getLogPeople = (formdata) =>
    request('/api/log/people/total', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 应急案例下载 /api/emergency/case/download
export const emergencyDownload = (formdata) =>
    request('/api/emergency/case/download', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
