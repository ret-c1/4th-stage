import request from '@utils/request';

// TI 恶意IP基本信息
export const getIpBase = (formdata) =>
    request('/api/threat/ti/evil/ip/base', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 恶意IP分析详情
export const getIpDetail = (formdata) =>
    request('/api/threat/ti/evil/ip/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 恶意文件复制链接上传
export const tiUrlUpload = (formdata) =>
    request('/api/ti/upload/url', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 获取TI平台查询文件情报url
export const getTiUrl = (formdata) =>
    request('/api/threat/ti/getUrl', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 恶意样本情报信息
export const getIntelligenceInfo = (formdata) =>
    request('/api/threat/ti/evil/sample/intelligenceInfo', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 恶意样本IP信息
export const getIpInfo = (formdata) =>
    request('/api/threat/ti/evil/sample/ipInfo', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 恶意样本域名信息
export const getDomainInfo = (formdata) =>
    request('/api/threat/ti/evil/sample/domainInfo', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 恶意样本文件信息
export const getFileInfo = (formdata) =>
    request('/api/threat/ti/evil/sample/fileInfo', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 情报添加页-恶意ip保存
export const getIpsSave = (formdata) =>
    request('/api/threat/evil/ip/extension', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询标签
export const getLabels = (formdata) =>
    request('/api/label/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
