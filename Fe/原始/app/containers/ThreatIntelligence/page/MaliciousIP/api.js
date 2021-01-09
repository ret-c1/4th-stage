import request from '@utils/request';

// 查询并获取所有恶意Ip列表的数据
export const getMaliciousIP = (formdata) =>
    request('/api/threat/evil/ip/all/page', {
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
// 导出全部恶意IP接口
export const getMaliciousExport = (formdata) =>
    request(`/api/threat/evil/ip/all/export`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 根据IP查询所关联的情报列表
export const getMaliciousSearchByIp = (formdata) =>
    request('/api/threat/searchByIp', {
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
