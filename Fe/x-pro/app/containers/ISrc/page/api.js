import request from '@utils/request';

// 获取选择项目列表
export const getISrcDetail = (param) =>
    request(`/api/isrc/${param}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取渗透测试列表分页
export const getISrcTable = (formdata) =>
    request('/api/isrcs', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getAddISrc = (formdata) =>
    request('/api/isrc', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getPullHole = (id, formdata) =>
    request(`/api/isrc/weakness/pull/${id}`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getHoleData = (formdata) =>
    request(`/api/isrc/weaknesses`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
