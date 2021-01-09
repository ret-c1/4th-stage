import request from '@utils/request';

// 外包管理-工作量列表
export const getOutsourcingList = (formdata) =>
    request('/api/workload/outsourcing/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 任务类型
export const getTypes = (formdata) =>
    request('/api/plan/types', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 模糊匹配项目名
export const getProjectNames = (formdata) =>
    request('/api/project/query', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 工作量提交
export const addWorkLoad = (formdata) =>
    request('/api/workload/addOutsource', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 编辑工作量
export const editWorkLoad = (formdata) =>
    request('/api/workload/editOutsource', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查看
export const lookWorkLoad = (formdata) =>
    request('/api/workload/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
