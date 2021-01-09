import request from '@utils/request';
// 查询漏洞闭环率
export const queryVulFinishRate = () =>
    request('/api/hw/statistics/risk/vulFinishRate', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询漏洞 提交 分配 评审 完成 验证数据
export const queryVulManage = () =>
    request('/api/hw/statistics/risk/vulManage', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询系统风险排名数据
export const queryLoopholeRate = (formdata) =>
    request('/api/hw/statistics/risk/listRiskSystem', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(formdata),
    });
// // 查询系统风险排名
// export const queryListRiskSystem = () =>
//     request('/api/hw/statistics/risk/listRiskSystem', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
// // 查询服务花费时间
// export const queryServerCost = () =>
//     request('/api/hw/risk/serverCost', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
// // 查询漏洞验证情况
// export const queryVulCheck = () =>
//     request('/api/hw/statistics/risk/vulCheck', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
// // 查询漏洞完成情况
// export const queryVulSort = () =>
//     request('/api/hw/statistics/risk/vulSort', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
// // 查询漏洞处置情况
// export const queryVulHandle = () =>
//     request('/api/hw/statistics/risk/vulHandle', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
