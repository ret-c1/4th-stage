import { loginRouter } from '@containers/Login'; // 登录
import { registerRouter } from '@containers/Register'; // 注册和忘记密码
import { nomatchRouter } from '@containers/NoMatch'; // 404
// 工作台
import { indexRouter } from '@containers/Index'; // 首页
// 项目管理
import { projectRouter } from '@containers/ProjectManager';
// 安全情报模块
// import { intelligenceRouter } from '@containers/Intelligence';
// 安全情报模块 - 新（2020-05-29）
import { threatIntelligenceRouter } from '@containers/ThreatIntelligence';
// 分析管理
import { analysisRouter } from '@containers/AnalysisManager';
// 事件管理
import { happeningRouter } from '@containers/IncidentManager';
// 应急响应
import { incidentRouter } from '@containers/IncidentResponse';
// 漏洞管理
import { vulManagerRouter } from '@containers/VulManager';
// 日程管理
import { scheduleRouter } from '@containers/ScheduleManager';
// 系统管理
import { systemRouter } from '@containers/SystemManager';
// 演示大屏
import { demonstrateRouter } from '@containers/DemonStrate';

// 渗透测试
import { penetrationRouter } from '@containers/Penetration';

// 漏洞扫描
import { vulnerabilityScanRouter } from '@containers/VulnerabilityScan';

// 代码审计
import { codeAuditRouter } from '@containers/CodeAudit';
// 雷神众测
import { isrcRouter } from '@containers/ISrc';

// 外包管理
import { outsourcManageRouter } from '@containers/OutsourcManage';

import { ROLE_ADMIN, ROLE_PROJECT, ROLE_ENGINEER } from '@config';
const checkConfigRouter = {
    path: '/checkconfig',
    exact: true,
    component: () => {},
    title: '配置检查',
    key: 'WorkingDesk',
    children: [
        {
            path: '/checkconfig/list',
            component: () => {},
            title: '报告列表',
            isShow: true,
            role: [ROLE_ADMIN, ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
    ],
};

// 私有路由
export const consoleRoutes = [
    indexRouter,
    projectRouter,
    threatIntelligenceRouter,
    analysisRouter,
    happeningRouter,
    incidentRouter,
    scheduleRouter,
    penetrationRouter,
    vulnerabilityScanRouter,
    checkConfigRouter,
    codeAuditRouter,
    vulManagerRouter,
    isrcRouter,
    outsourcManageRouter,
    systemRouter,
    demonstrateRouter,
];

// 展开所有路由
export const flattenConsoleRoutes = [];
const renderprivate = (data) => {
    data.forEach((item) => {
        flattenConsoleRoutes.push({
            exact: item.exact,
            path: item.path,
            title: item.title,
            component: item.component,
        });
        if (item.children && item.children.length > 0) {
            renderprivate(item.children);
        }
        if (item.offspring && item.offspring.length > 0) {
            renderprivate(item.offspring);
        }
    });
};
renderprivate(consoleRoutes);

// 面包屑
export const renderBreadcrumbs = () => {
    const obj = {};
    flattenConsoleRoutes.forEach((item) => {
        obj[item.path] = item.title;
    });
    return obj;
};

// 开放路由
export const publicRoutes = [...loginRouter, ...registerRouter, ...nomatchRouter];
