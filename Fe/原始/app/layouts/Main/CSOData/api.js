import request from '@utils/request';

// 获取活动栏
export const getActiveLog = (formdata) =>
    request('/api/log/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
