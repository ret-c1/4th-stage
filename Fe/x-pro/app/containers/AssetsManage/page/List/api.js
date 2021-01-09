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
// 资产列表
export const getAssetList = (formdata) =>
    request('/api/asset/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 资产部门
export const getOrganization = (formdata) =>
    request('/api/asset/organization/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 资产责任人
export const getAssetPerson = (formdata) =>
    request('/api/asset/person/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 导入佩恩资产
export const importPeinAssets = (formdata) =>
    request('/api/asset/greatfind/assets/import', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询佩恩资产
export const getPeinAssets = (formdata) =>
    request('/api/asset/greatfind/projects', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
