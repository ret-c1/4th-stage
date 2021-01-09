import request from '@utils/request';

// 工程师情报列表
export const getEngineerList = (formdata) =>
    request('/api/threats/engineer', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 情报专家列表
export const getExpertList = (formdata) =>
    request('/api/threats/expert', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 运营专家列表
export const getOperateList = (formdata) =>
    request('/api/threats/operate', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 威胁情报列表
export const getThreatList = (formdata) =>
    request('/api/threats/manager', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 情报专家名单
export const getExpertsList = () =>
    request('/api/threat/experts', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

// 运营专家名单
export const getOperatersList = () =>
    request('/api/threat/operaters', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

// 创建威胁情报漏洞分类模糊查询
export const getVulType = (value) =>
    request(`/api/vulnerability/types?vtype=${value}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

// 创建威胁情报漏洞分类模糊查询
export const createThreat = (formdata) =>
    request('/api/threat', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查看情报详情
export const threatInfo = (value) =>
    request(`/api/threat/${value}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

// 情报专家通过
export const infoExpertResolve = (formdata) =>
    request(`/api/threat/expert/pass`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 情报专家不通过
export const infoExpertReject = (formdata) =>
    request(`/api/threat/expert/refuse`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 运营专家通过
export const operaterExpertResolve = (formdata) =>
    request(`/api/threat/operate/pass`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 运营专家不通过
export const operaterExpertReject = (formdata) =>
    request(`/api/threat/operate/refuse`, {
        method: 'POST',
        body: JSON.stringify(formdata),
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

// 我要排查批量创建
export const createTroubleShooting = (formdata) =>
    request(`/api/threat/troubleAsset/analysis/situation/batch`, {
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
