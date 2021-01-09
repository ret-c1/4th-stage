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
// 新增应急案例
export const getAddCase = (formdata) =>
    request('/api/emergency/case/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 应急案例导入文件
export const getUploadFile = (formdata) =>
    request('/api/emergency/upload', {
        method: 'POST',
        body: formdata,
        headers: {
            // 'content-type': 'multipart/form-data',
        },
    });
// 查看案例详情
export const getCaseDetail = (formdata) =>
    request('/api/emergency/case/select', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 模糊查询安服下的部门
export const getDepartList = (formdata) =>
    request('/api/depart/name/query', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
