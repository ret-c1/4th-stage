import { loginRouter } from '@containers/Login'; // 登录
// 工作台
import { indexRouter } from '@containers/Index'; // 首页
// 项目管理
import { projectRouter } from '@containers/ProjectManager';
// 分析管理
import { analysisRouter } from '@containers/AnalysisManager';
// 事件管理
import { happeningRouter } from '@containers/IncidentManager';
// 工作计划
import { workPlanRouter } from '@containers/WorkPlan';
// 应急响应
import { incidentRouter } from '@containers/IncidentResponse';
// 漏洞管理
import { vulManagerRouter } from '@containers/VulManager';
// 日程管理
import { scheduleRouter } from '@containers/ScheduleManager';
// 系统管理
import { systemRouter } from '@containers/SystemManager';

// 渗透测试
import { penetrationRouter } from '@containers/Penetration';

// 漏洞扫描
import { vulnerabilityScanRouter } from '@containers/VulnerabilityScan';

// 代码审计
import { codeAuditRouter } from '@containers/CodeAudit';

// 私有路由
export const dynamicRoutes = [
    indexRouter,
    projectRouter,
    workPlanRouter,
    analysisRouter,
    happeningRouter,
    incidentRouter,
    scheduleRouter,
    penetrationRouter,
    vulnerabilityScanRouter,
    vulManagerRouter,
    codeAuditRouter,
    systemRouter,
];

// 开放路由
export const staticRoutes = [...loginRouter];
