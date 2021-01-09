import request from '@utils/request';

// 获取选择项目列表
export const getItemDetail = () =>
    request('/api/projects', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取渗透测试列表分页
export const getPenetrationtestTable = (formdata) =>
    request('/api/report/af/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  获取项目名称列表
export const getItem = (formdata) =>
    request('/api/project/match', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取漏洞分类
export const gethHoleList = () =>
    request('/api/vulnerability/template', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取web应用名称分类
export const getWebList = (formdata) =>
    request('/api/asset/web/match', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取应用信息详情
export const getWebDetail = (formdata) =>
    request('/api/asset/web/query', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  获取漏洞分类详情
export const getHoleDictory = (formdata) =>
    request('/api/vulnerability/dictionary', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getSubmitTable = (formdata) =>
    request('/api/report/create/Infiltrate', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除报告
export const getDelReport = (formdata) =>
    request('/api/report/delete', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询报告状态
export const getCheckReport = (formdata) =>
    request('/api/report/check', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查看 web详情
export const getWebDrawerDetail = (formdata) =>
    request('/api/asset/web/query', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询报告详情
export const getReportDetail = (formdata) =>
    request('/api/report/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  获得漏洞统计数据
export const getHoleData = (formdata) =>
    request('/api/report/vulnerability/count', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取渗透测试列表数据
export const getPenetrationData = (formdata) =>
    request('/api/report/vulnerability', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取漏洞信息列表所有数据
export const getHoleAllData = (formdata) =>
    request('/api/vulnerability/view', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 提交报告
export const getCommitReport = (formdata) =>
    request('/api/report/commit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询项目详情
export const getDetailItem = (formdata) =>
    request('/api/project/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 添加工作量
export const getAddWork = (formdata) =>
    request('/api/workload/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 新建人工测试漏洞
export const getNewPerVul = (formdata) =>
    request('/api/vulnerability/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除人工渗透测试列表数据
export const getDelPerVul = (formdata) =>
    request('/api/vulnerability/delete', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查找人工渗透漏洞详情
export const getPerVulDetail = (formdata) =>
    request('/api/vulnerability/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询报告客户名称，网站域名
export const getDetailReport = (formdata) =>
    request('/api/report/introduction', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 编辑人工测试漏洞列表
export const getEditVulList = (formdata) =>
    request('/api/vulnerability/edit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 导入扫描报告
export const getImportScanReport = (formdata) =>
    request('/api/vulnerability/webscan/import', {
        method: 'POST',
        body: formdata,
    });
// 提交评审有效无效误报存疑
export const getSubmitReview = (formdata) =>
    request('/api/vulnerability/review', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 报告评价接口
export const getRemarkCommit = (formdata) =>
    request('/api/report/assess', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 提交评审报告
export const getcommitReport = (formdata) =>
    request('/api/report/review', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 生成报告
export const getGeneratorReport = (formdata) =>
    request('/api/report/generator', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getDownReport = (formdata) =>
    request('/api/report/generator/status', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 场景选择获取漏洞场景
export const getVulScene = (formdata) =>
    request('/api/vulnerability/scene', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 生成报告的下载状态
export const getReportStatus = (formdata) =>
    request('/api/report/generator/status', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
