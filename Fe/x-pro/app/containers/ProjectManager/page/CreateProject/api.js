import request from '@utils/request';

// 导入项目
export const importProject = (formdata) =>
    request('/api/project/import', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

//  新增项目信息
export const getNewProject = (formdata) =>
    request('/api/project/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

export const getTopCity = () =>
    request('/api/city/tops', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
export const getBottomCity = (formdata) =>
    request('/api/city/children', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 模糊查询项目
export const getProjects = (formdata) =>
    request(`/api/project/query`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
