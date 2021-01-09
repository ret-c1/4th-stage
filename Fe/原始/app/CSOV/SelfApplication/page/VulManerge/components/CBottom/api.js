import request from '@utils/request';
// 查询漏洞闭环率
export const queryVulHandle = () =>
    request('/api/hw/statistics/risk/vulHandle', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
//  漏洞完成情况排序
export const queryvulSort = (formdata) =>
    request('/api/hw/statistics/risk/vulSort', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(formdata),
    });
//  // 查询漏洞 提交 分配 评审 完成 验证数据
export const queryVulManage = () =>
    request('/api/hw/statistics/risk/vulManage', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
