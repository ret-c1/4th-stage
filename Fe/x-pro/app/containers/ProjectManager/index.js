// 资产新模块
import { assetsChildrenRouter } from '@containers/AssetsManage';
import ProjectPage from './page/Project/Loadable';
import ProjectPageDetail from './page/ProjectDetail/Loadable';
import AssetsManage from './page/AssetsManage/Loadable';
import DocumentManagePage from './page/DocumentManage/Loadable';
import ProjectTask from './page/Task/Loadable';
import ReportList from './page/ReportList/Loadable';
import WorkAnalysis from './page/WorkAnalysis/Loadable';
import SafeRecord from './page/SafeRecord/Loadable';
import SetMember from './page/SetMember/Loadable';
import SecurityPolicy from './page/SecurityPolicy/Loadable';
// import ProjectInfo from './page/ProjectInfo/Loadable';
// import AddNewProject from './page/AddNewProject/Loadable';
import CreateProject from './page/CreateProject/Loadable'; // 创建、编辑项目（新）
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
            children: [],
        },
        {
            path: '/project/detail',
            component: ProjectPageDetail,
            title: '项目详情',
            isShow: false,
            children: [],
        },
        {
            path: '/project/projectInfo',
            component: CreateProject,
            title: '项目编辑',
            isShow: false,
            children: [],
        },
        {
            path: '/project/dashboad',
            component: DashboadPage,
            title: '仪表盘',
            isShow: false,
            children: [],
        },
        {
            path: '/project/AssetsManage',
            component: AssetsManage,
            title: '资产管理',
            isShow: false,
            children: [],
        },
        {
            path: '/project/task',
            component: ProjectTask,
            title: '工作计划',
            isShow: false,
            children: [],
        },
        {
            path: '/project/reportlist',
            component: ReportList,
            title: '报告列表',
            isShow: false,
            children: [],
        },
        {
            path: '/project/workanalysis',
            component: WorkAnalysis,
            title: '工作量分析',
            isShow: false,
            children: [],
        },
        {
            path: '/project/saferecord',
            component: SafeRecord,
            title: '安全设备更新记录',
            isShow: false,
            children: [],
        },
        {
            path: '/project/securitypolicy',
            component: SecurityPolicy,
            title: '安全策略配置变更',
            isShow: false,
            children: [],
        },
        {
            path: '/project/add',
            component: CreateProject,
            title: '新建项目',
            isShow: false,
            children: [],
        },
        {
            path: '/project/resourcelist',
            component: Resource,
            title: '工作任务',
            isShow: false,
            children: [
                {
                    path: '/project/resourceTask',
                    component: TaskSchedule,
                    title: '任务排期',
                    isShow: false,
                    children: [],
                },
            ],
        },
        {
            path: '/project/workload',
            component: WorkloadPage,
            title: '工作量列表',
            isShow: true,
            children: [],
        },
        {
            path: '/project/memberSet',
            component: SetMember,
            title: '项目组成员设置',
            isShow: false,
            children: [],
        },
        {
            path: '/project/documentManage',
            component: DocumentManagePage,
            title: '文档管理',
            isShow: false,
            children: [],
        },
        ...assetsChildrenRouter,
    ],
};
