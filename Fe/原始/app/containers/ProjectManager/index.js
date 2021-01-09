// 资产新模块
import { assetsChildrenRouter } from '@containers/AssetsManage';
import { ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN } from '@config';
import ProjectPage from './page/Project/Loadable';
import ProjectPageDetail from './page/ProjectDetail/Loadable';
import ProjectInfo from './page/ProjectInfo/Loadable';
import AssetsManage from './page/AssetsManage/Loadable';
import ProjectTask from './page/Task/Loadable';
import ReportList from './page/ReportList/Loadable';
import WorkAnalysis from './page/WorkAnalysis/Loadable';
import SafeRecord from './page/SafeRecord/Loadable';
import SecurityPolicy from './page/SecurityPolicy/Loadable';
import AddNewProject from './page/AddNewProject/Loadable';
import Resource from './page/ResourceManage/Loadable';
import TaskSchedule from './page/ResourceManage/TaskSchedule/Loadable';
import DashboadPage from './page/Dashboad/Loadable';
import WorkloadPage from './page/Workload/Loadable'; // 工作量列表

export const projectRouter = {
    path: '/project',
    exact: true,
    component: ProjectPage,
    title: '项目管理',
    key: 'ProjectManagement',
    children: [
        {
            path: '/project/list',
            component: ProjectPage,
            title: '项目列表',
            isShow: true,
            role: [ROLE_ADMIN, ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/detail',
            component: ProjectPageDetail,
            title: '项目详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/projectInfo',
            component: ProjectInfo,
            title: '项目编辑',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/dashboad',
            component: DashboadPage,
            title: '仪表盘',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/AssetsManage',
            component: AssetsManage,
            title: '资产管理',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/task',
            component: ProjectTask,
            title: '工作计划',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/reportlist',
            component: ReportList,
            title: '报告列表',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/workanalysis',
            component: WorkAnalysis,
            title: '工作量分析',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/saferecord',
            component: SafeRecord,
            title: '安全设备更新记录',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/securitypolicy',
            component: SecurityPolicy,
            title: '安全策略配置变更',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/add',
            component: AddNewProject,
            title: '新建项目',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/project/resourcelist',
            component: Resource,
            title: '工作任务',
            isShow: false,
            role: [ROLE_PROJECT],
            offspring: [
                {
                    path: '/project/resourceTask',
                    component: TaskSchedule,
                    title: '任务排期',
                    isShow: false,
                    role: [ROLE_PROJECT],
                    offspring: [],
                },
            ],
        },
        {
            path: '/project/workload',
            component: WorkloadPage,
            title: '工作量列表',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        ...assetsChildrenRouter,
    ],
};
