import request from '@utils/request';

// 外包公司列表
export const getDepartTree = (formdata) =>
    request('/api/outsourcing/list', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 外包公司-所属人员列表
export const getDepartPeople = (formdata) =>
    request('/api/outsourcing/users', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
