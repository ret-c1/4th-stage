import request from '@utils/request';

// 根据排期申请记录查询对应的分组列表
export const queryGroups = (params) =>
    request('/api/resource/apply/groups', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });
// 已排期资源列表
export const getAlreadyTechnologyList = (params) =>
    request('/api/resource/apply/already/technology/page', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });
// 已结束资源列表
export const getOverTechnologyrList = (params) =>
    request('/api/resource/apply/over/technology/page', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });
// 转派资源
export const dispatchResource = (params) =>
    request('/api/resource/apply/dispatch', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

// 未排期未转派资源列表
export const getNoDispatchTechnologyList = (params) =>
    request('/api/resource/apply/ready/technology/page', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

// 未排期已转派列表
export const getDispatchTechnology = (params) =>
    request('/api/resource/apply/dispatch/technology/page', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });
// 创建排期
export const saveSchedule = (params) =>
    request('/api/resource/apply/schedule/save', {
        method: 'POST',
        body: JSON.stringify(params),
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
// 查询指定时间段的人员排期记录(项目经理)
export const queryScheduleManager = (formdata) =>
    request('/api/resource/schedule/people/manager/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询指定时间段的人员排期记录(技术负责人)
export const queryScheduleStaffTechnology = (params) =>
    request('/api/resource/schedule/people/technology/page', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询指定时间段的个人排期记录(技术负责人)
export const querySchedulePersonalTechnology = (params) =>
    request('/api/resource/schedule/personal/technology/page', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });
// 根据projectId获取部门列表
export const getDepartsList = (formdata) =>
    request('/api/resource/apply/manager/departs', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询组织下技术负责人列表
export const getDepartsTechPeople = (formdata) =>
    request('/api/depart/tech/peoples', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getDepartTree = (formdata) =>
    request('/api/depart/tree', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查看排期记录
export const getScheduleDetail = (formdata) =>
    request('/api/resource/apply/schedule/get', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 组织下所有用户 批量添加用户时modal框中的用户列表
export const getDepartAllPeople = (formdata) =>
    request('/api/depart/all/peoples', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 根据用户查询所属组织列表
export const getUserFromDepart = (formdata) =>
    request('/api/depart/by/user', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
