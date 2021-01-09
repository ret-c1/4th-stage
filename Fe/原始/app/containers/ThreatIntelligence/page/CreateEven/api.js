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
// 查询安全事件情报详情
export const viewSecurityEvent = (formdata) =>
    request('/api/threat/securityEvent/view', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 创建安全事件情报详情
export const addSecurityEvent = (formdata) =>
    request('/api/threat/securityEvent/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 修改安全事件情报详情
export const updateSecurityEvent = (formdata) =>
    request('/api/threat/securityEvent/update', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 工程师情报提交
export const engineerSubmit = (formdata) =>
    request('/api/threat/engineer/submit', {
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
// 查询情报进度
export const getThreatProcess = (id) =>
    request(`/api/threat/process/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
// export const getThreatProcess = (formdata) =>
//     request(`/api/threat/process`, {
//         method: 'POST',
//         body: JSON.stringify(formdata),
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
// 模糊查询安服下的部门
export const getDepartList = (formdata) =>
    request('/api/depart/name/query', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
