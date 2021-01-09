import request from '@utils/request';

// 获取项目成员列表
export const getPeopleList = (formdata) =>
    request('/api/project/peoples/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 添加项目成员
export const addPeopleList = (formdata) =>
    request('/api/project/people/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除项目成员
export const delPeopleList = (formdata) =>
    request('/api/project/people/remove', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 用户分页
export const userList = (formdata) =>
    request('/api/user/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 角色分页
export const getRole = (formdata) =>
    request('/api/role/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 变更项目经理
export const changeManger = (formdata) =>
    request('/api/project/manager/change', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
