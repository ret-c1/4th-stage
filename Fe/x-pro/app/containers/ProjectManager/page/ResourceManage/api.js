import request from '@utils/request';

// 已排期资源列表
export const getAlreadyManagerList = (formdata) =>
    request('/api/resource/apply/already/manager/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 未排期资源列表
export const getReadyManagerList = (formdata) =>
    request('/api/resource/apply/ready/manager/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 已结束资源列表
export const getOverManagerList = (formdata) =>
    request('/api/resource/apply/over/manager/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 编辑计划，查看资源申请记录
export const getResourceRecord = (formdata) =>
    request('/api/resource/apply/get', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 点击结束，释放资源
export const releaseResource = (formdata) =>
    request('/api/resource/apply/release', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 资源申请
export const saveResource = (formdata) =>
    request('/api/resource/apply/save', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 项目经理查询项目排期，根据资源申请记录的起始时间查询排期记录
export const getProjectSchedule = (formdata) =>
    request('/api/resource/schedule/people/manager/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 创建计划
export const savePlan = (formdata) =>
    request('/api/resource/schedule/plan', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 项目详情
export const getProjectDetail = (formdata) =>
    request('/api/project/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 任务类型即工作计划类型
export const getPlanType = (formdata) =>
    request('/api/plan/types', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 根据名称查询部门列表
export const getNameDepartsList = (formdata) =>
    request('/api/depart/name/list', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 资源排期关联的计划表
export const getRelationPlans = (formdata) =>
    request('/api/resource/apply/relation/plans', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 组织下所有用户
export const getDepartAllPeople = (formdata) =>
    request('/api/depart/all/peoples', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
