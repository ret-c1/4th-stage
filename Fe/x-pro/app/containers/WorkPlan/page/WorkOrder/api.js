import request from '@utils/request';

// 查找项目经理下的项目
export const allProject = (formdata) =>
    request('/api/project/view', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
