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

export const addSystem = (formdata) =>
    request('/api/business/system/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

export const getBusiness = (params) =>
    request('/api/business/system/page', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

export const getDetail = (params) =>
    request('/api/business/system/view', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

export const getAsset = (params) =>
    request('/api/asset/view', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

export const dealDelete = (params) =>
    request('/api/business/system/delete', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

export const getRank = (params) =>
    request('/api/business/system/rank/detai', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

export const exportSystem = (projectId) =>
    request('/api/business/system/export', {
        method: 'POST',
        body: JSON.stringify(projectId),
        headers: {
            'content-type': 'application/json',
        },
    });

export const dealImport = (formdata) =>
    request('/api/business/system/import', {
        method: 'POST',
        body: formdata,
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
