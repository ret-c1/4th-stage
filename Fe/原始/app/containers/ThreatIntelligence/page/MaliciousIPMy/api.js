import request from '@utils/request';

// 查询并获取我的恶意Ip列表的数据
export const getMaliciousIPMy = (formdata) =>
    request('/api/threat/evil/owner/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询并获取我的恶意Ip详情类表
export const getMaliciousIPMyDetail = (formdata) =>
    request('/api/threat/evil/ip/owner/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 新增恶意IP数据
export const getMaliciousIPAdd = (formdata) =>
    request('/api/threat/evil/ip/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 编辑
export const getMaliciousIPEdit = (formdata) =>
    request('/api/threat/evil/ip/edit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 导出我的恶意IP接口
export const getMyMaliciousExport = (formdata) =>
    request(`/api/threat/evil/ip/owner/export`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 删除恶意IP
export const removeEvilIp = (formdata) =>
    request('/api/threat/evil/ip/remove', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除情报
export const removeThreat = (formdata) =>
    request('/api/threat/remove', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 批量删除恶意IP
export const removeEvilIpBatch = (formdata) =>
    request('/api/threat/evil/ip/batch/remove', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询恶意IP标签
export const getLabelsPage = (formdata) =>
    request('/api/label/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 导入恶意IP数据
export const getMaliciousIPImport = (formdata) =>
    request('/api/threat/evil/ip/import', {
        method: 'POST',
        body: formdata,
    });
