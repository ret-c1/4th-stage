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
// 新增资产
export const addAsset = (formdata) =>
    request('/api/asset/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 资产详情
export const getAssetInfo = (parama) =>
    request('/api/asset/view', {
        method: 'POST',
        body: JSON.stringify(parama),
        headers: {
            'content-type': 'application/json',
        },
    });
