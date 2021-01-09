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

// 情报专家通过
export const expertPass = (formdata) =>
    request('/api/threat/expert/pass', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 情报专家不通过
export const expertRefuse = (formdata) =>
    request('/api/threat/expert/refuse', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 运营专家通过
export const operatePass = (formdata) =>
    request('/api/threat/operate/pass', {
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
