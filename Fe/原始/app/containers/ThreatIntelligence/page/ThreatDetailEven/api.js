import request from '@utils/request';

// 人员日志信息查询
export const getStaffLog = (formdata) =>
    request('/api/log/people/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询安全事件情报详情
export const viewSecurityEvent = (formdata) =>
    request('/api/threat/securityEvent/view', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 日志人员总数
export const getLogPeople = (formdata) =>
    request('/api/log/people/total', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询情报进度
export const getThreatProcess = (id) =>
    request(`/api/threat/process/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
// export const getThreatProcess = (formdata) =>
//     request(`/api/threat/process`, {
//         method: 'POST',
//         body: JSON.stringify(formdata),
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
// 威胁情报下载
export const threatDownload = (formdata) =>
    request('/api/threat/download', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
