import request from '@utils/request';

// 获取用户信息
export const getUseinfo = () =>
    request('/api/info', {
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
