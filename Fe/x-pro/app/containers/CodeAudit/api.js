import request from './request';

// D平台登录
export const login = (formdata) =>
    request('/DevSocOps/api/user/login', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 代码审计列表
export const getTaskList = (formdata) =>
    request('/DevSocOps/api/task/list', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

export const taskAdd = (formdata) =>
    request('/DevSocOps/api/task/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 漏洞详情列表
export const getLoopholeList = (formdata) =>
    request('/DevSocOps/api/vul/select/filter', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

export const vulDetail = (id) =>
    request(`/DevSocOps/api/vul/select?id=${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

export const generateReport = (formdata) =>
    request('/DevSocOps/api/report/export/report', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

export const nextSerialNo = () =>
    request('/DevSocOps/api/file/nextSerialNo', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
