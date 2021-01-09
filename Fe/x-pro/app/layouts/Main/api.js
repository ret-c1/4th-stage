// eslint-disable-next-line import/no-cycle
import request from '@utils/request';

// 获取用户信息
export const getUseinfo = () =>
    request('/userinfo.json', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });

// 登出
export const logout = () =>
    request('/api/logout', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
export const getMenu = (formdata) =>
    request('/api/menu/tree', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
