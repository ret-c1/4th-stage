import request from '@utils/request';

// 获取项目列表
export const getList = (formdata) =>
    request('/api/project/view', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getProSearch = (formdata) =>
    request('/api/project/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 导入项目
export const importProject = (formdata) =>
    request('/api/project/import', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

export const delProject = (formdata) =>
    request('/api/project/del', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

export const getItemDetail = (formdata) =>
    request('/api/project/display', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// ip资产
export const getIPAssetPage = (formdata) =>
    request('/api/asset/ip/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getIPAssetType = () =>
    request('/api/asset/getType', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
// web资产
export const getWebAssetPage = (formdata) =>
    request('/api/asset/web/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取报告列表页面
export const getReportListPage = (formdata) =>
    request('/api/report/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取报告作者
export const getReportAuthor = (formdata) =>
    request('/api/employee', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取安全记录列表页面
export const getSafeRecord = (formdata) =>
    request('/api/security/device/upgrade/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getWorkAnalysis = (formdata) =>
    request('/api/workload/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 获取安全策略列表页
export const getSecurityPolicy = (formdata) =>
    request('/api/security/strategy/upgrade/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  新增项目信息
export const getNewProject = (formdata) =>
    request('/api/project/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  查询ip页面
export const getIpPage = (formdata) =>
    request('/api/asset/ip/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  查询web页面
export const getWebPage = (formdata) =>
    request('/api/asset/web/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

//  添加IP资产
export const getAddIpAsset = (formdata) =>
    request('/api/asset/ip/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  添加web资产
export const getAddWebAsset = (formdata) =>
    request('/api/asset/web/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  查看IP资产详情
export const getIpAssetDetail = (formdata) =>
    request('/api/asset/ip/query', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  编辑资产
export const getIpAssetEdit = (formdata) =>
    request('/api/asset/ip/edit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除资产
export const getIpAssetDel = (formdata) =>
    request('/api/asset/ip/del', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getWebAssetDetail = (formdata) =>
    request('/api/asset/web/query', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getWebAssetEdit = (formdata) =>
    request('/api/asset/web/edit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getWebAssetDel = (formdata) =>
    request('/api/asset/web/del', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getfile = (formdata) =>
    request('/api/asset/ip/import', {
        method: 'POST',
        body: formdata,
    });
export const getWebfile = (formdata) =>
    request('/api/asset/web/import', {
        method: 'POST',
        body: formdata,
    });
export const getTopCity = () =>
    request('/api/city/tops', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
export const getBottomCity = (formdata) =>
    request('/api/city/children', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  获取项目详情
export const getProjectDetail = (formdata) =>
    request('/api/project/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getProjectEdit = (formdata) =>
    request('/api/project/edit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  安全设备更新记录
export const getAddSecurityRecord = (formdata) =>
    request('/api/security/device/upgrade/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  安全设备更新记录下的导入
export const getFileSecurityRecord = (formdata) =>
    request('/api/security/device/upgrade/import', {
        method: 'POST',
        body: formdata,
    });
//  删除安全记录数据
export const getDelSecurityRecord = (formdata) =>
    request('/api/security/device/upgrade/del', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getCheckSecurityRecord = (formdata) =>
    request(`/api/security/device/upgrade/${formdata}`, {
        method: 'GET',
        // body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const getUpdateSecurityRecord = (formdata) =>
    request('/api/security/device/upgrade/update', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 安全策略新增
export const getAddSecurityWay = (formdata) =>
    request('/api/security/strategy/upgrade/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//  安全策略导入
export const getFileSecurityPolicy = (formdata) =>
    request('/api/security/strategy/upgrade/import', {
        method: 'POST',
        body: formdata,
    });
// 安全策略删除
export const getDelSecurityPolicy = (formdata) =>
    request('/api/security/strategy/upgrade/del', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询   安全策略内容
export const getCheckSecurityPolicy = (formdata) =>
    request(`/api/security/strategy/upgrade/${formdata}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询系统资产关联详情
export const getSystemAssetDetail = (formdata) =>
    request('/api/asset/web/relate/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询指派等保详情
export const getTaskAssetDetail = (formdata) =>
    request('/api/protection/dispatch/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询指派等保任务成员
export const getTaskPerson = (formdata) =>
    request('/api/user/list/exceptManager', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 点击关联资产已选中的资产
export const getChectedAsset = (formdata) =>
    request('/api/asset/web/relate/checkDetail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 关联资产
export const getRelatedAsset = (formdata) =>
    request('/api/asset/web/relate', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 提交等保任务表单
export const gettaskSubmit = (formdata) =>
    request('/api/protection/dispatch', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 补充工作量
export const getAddWork = (formdata) =>
    request('/api/workload/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
export const editWorkItem = (formdata) =>
    request('/api/workload/edit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
//   删除工作量
export const getDeleteWork = (formdata) =>
    request('/api/workload/del', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// //////////////////////////////////////////////////////////////////////////////////////
// 工作计划相关
// 删除单条计划
export const deletePlan = (formdata) =>
    request('/api/plan/delete', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询工作计划
export const getPlan = (formdata) =>
    request('/api/plan/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 新增编辑工作计划
export const changePlan = (formdata) =>
    request('/api/plan/save', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询所有用户
export const allUser = (formdata) =>
    request(`/api/user/page`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });
// 查询计划类型
export const planTypes = (formdata) =>
    request(`/api/plan/types`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 计划类型树
export const taskTree = (formdata) =>
    request(`/api/plan/tree`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 计划类型树
export const doctaskTree = (formdata) =>
    request(`/api/doc/dashbroad`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 分页查询任务资源
export const taskResource = (formdata) =>
    request(`/api/doc/page`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 分页查询任务资源
export const deleteResource = (formdata) =>
    request(`/api/doc/remove`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 新增计划
export const addResource = (formdata) =>
    request(`/api/doc/add`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 文件上传
export const fileUpload = (formdata) =>
    request(`/api/document/upload`, {
        method: 'POST',
        body: formdata,
    });

// 文件下载
export const fileDownload = (id) =>
    // request(`/api/doc/detail`, {
    request(`/api/doc/download/${id}`, {
        method: 'GET',
        // body: JSON.stringify(formdata),
        headers: { 'response-type': 'arraybuffer' },
    });

// 文件预览
export const filePreview = (formdata) =>
    request(`/api/doc/detail`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });
