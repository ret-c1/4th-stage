import request from '@utils/request';
// 查看情报详情
export const threatInfo = (value) =>
    request(`/api/threat/${value}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

// 根据项目获取客户列表ids
export const clientListReq = (formdata) =>
    request(`/api/threat/clients`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查找项目经理下的项目
export const allProject = (formdata) =>
    request(`/api/project/view`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 分页查询情报资产
export const threatAssetsList = (formdata) =>
    request(`/api/threat/assets`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 资产类型统计
export const AssetsType = (formdata) =>
    request(`/api/threat/task/asset/statistics`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 模糊查询项目
export const queryProjects = (formdata) =>
    request(`/api/project/queryProjects`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 创建项目
export const createProject = (formdata) =>
    request(`/api/project/add`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 导入IP资产
export const IPImport = (formdata) =>
    request(`/api/asset/ip/import`, {
        method: 'POST',
        body: formdata,
        headers: {},
    });

// 查询所有用户
export const allUser = (formdata) =>
    request(`/api/user/page`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 我要排查、派发任务
export const distributeTask = (formdata) =>
    request(`/api/threat/task`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 获取资产详情
export const getAssetInfo = (formdata) =>
    request(`/api/asset/ip/query`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });
