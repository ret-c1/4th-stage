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

export const getMaintenance = (params) =>
    request('/api/asset/page', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });
