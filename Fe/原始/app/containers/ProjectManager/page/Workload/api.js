import request from '@utils/request';

// 项目管理-工作量列表
export const getOutsourcingList = (formdata) =>
    request('/api/workload/project/page', {
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

// 查看
export const lookWorkLoad = (formdata) =>
    request('/api/workload/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
