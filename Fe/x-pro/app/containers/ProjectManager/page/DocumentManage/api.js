import request from '@utils/request';

// 文档分页查询
export const getFileList = (formdata) =>
    request('/api/file/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 根据阶段查标签
export const getFileLabelList = (formdata) =>
    request('/api/label/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除文档
export const delFile = (formdata) =>
    request('/api/file/remove', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 文件批量下载
export const downloadFile = (ids) =>
    request(`/api/file/download?ids=${ids}`, {
        method: 'GET',
        // body: JSON.stringify(formdata),
        headers: {
            // 'content-type': 'application/json',
        },
    });

// 文件上传
export const uploadFile = (formdata) =>
    request('/api/upload', {
        method: 'POST',
        body: formdata,
        headers: {
            // 'content-type': 'application/json',
        },
    });
// 上传文档
export const addFile = (formdata) =>
    request('/api/file/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 标签分页查询
export const getLabelList = (formdata) =>
    request('/api/label/file/manage', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 新增标签
export const addLabel = (formdata) =>
    request('/api/label/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除标签
export const delLabel = (formdata) =>
    request('/api/label/delete', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 编辑标签
export const updateLabel = (formdata) =>
    request('/api/label/update', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
