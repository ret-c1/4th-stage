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
// 应急案例项目工程师分页
export const getEngineerCases = (formdata) =>
    request('/api/emergency/engineerCases', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 人员列表
export const getEmployee = (formdata) =>
    request('/api/employee', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
