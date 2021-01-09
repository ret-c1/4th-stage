import request from '@utils/request';

// 应急同步，获取项目成员列表
export const getEmergencys = (formdata) =>
    request('/api/emergencys', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 事件列表
export const getEvent = (formdata) =>
    request('/api/threat/analysis/invests', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 项目经理应急案例
export const getManagerCase = (formdata) =>
    request('/api/emergency/managerCases', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 工程师应急案例
export const getEngineerCase = (formdata) =>
    request('/api/emergency/engineerCases', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查看小组成员
export const getEmergencyUsers = (formdata) =>
    request('/api/emergency/users', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 删除小组成员
export const deleteMember = (id) =>
    request(`/api/emergency/user/${id}`, {
        method: 'Delete',
        headers: {
            'content-type': 'application/json',
        },
    });

// 获取成员
export const getEmployee = (formdata) =>
    request('/api/employee', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 添加成员
export const addEmergencyMember = (formdata) =>
    request('/api/emergency/user', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 获取报告详情
export const getReportDetail = (formdata) =>
    request('/api/report/detail', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 获取应急处置接口
export const emergencyHandle = (formdata) =>
    request('/api/emergency/handle', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 获取应急信息
export const getEmergencyInfo = (id) =>
    request(`/api/emergency/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

// 关闭应急
export const getEmergencyComplete = (formdata) =>
    request(`/api/emergency/complete`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 应急评审通过
export const getEmergencyPass = (formdata) =>
    request(`/api/emergency/pass`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 应急评审不通过
export const getEmergencyRefuse = (formdata) =>
    request(`/api/emergency/refuse`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 生成报告
export const generator = (formdata) =>
    request(`/api/report/generator`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 生成报告状态
export const generatorStatus = (formdata) =>
    request(`/api/report/generator/status`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询告警分析记录
export const warningRecord = (formdata) =>
    request(`/api/threat/analysis/warn`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询日志分析记录
export const logRecord = (formdata) =>
    request(`/api/threat/analysis/log`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询事件研判记录
export const queryRecord = (formdata) =>
    request(`/api/threat/analysis/event/query`, {
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

// 事件研判分派应急/创建应急
export const emergencyDistribute = (formdata) =>
    request(`/api/emergency/threat/dispatch`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 创建应急
export const createEmergency = (formdata) =>
    request(`/api/emergency`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 编辑应急
export const editEmergency = (formdata) =>
    request(`/api/emergency`, {
        method: 'PUT',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 提交应急
export const commitEmergency = (formdata) =>
    request(`/api/emergency/commit`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 案例详情
export const caseInfo = (formdata) =>
    request(`/api/emergency/case/select`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });

// 案例详情
export const editCase = (formdata) =>
    request(`/api/emergency/case/edit`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
    });
