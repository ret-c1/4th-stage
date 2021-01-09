import {
    ROLE_PROJECT,
    ROLE_ENGINEER,
    ROLE_INTELLIGENCEEXPERT,
    ROLE_OPERATIONEXPERT,
} from '@config';
import IntelligencePage from './page/Intelligence/Loadable'; // 情报列表
import Create0DayPage from './page/Create0Day/Loadable'; // 情报上报 - 0/n day
import CreateEvenPage from './page/CreateEven/Loadable'; // 情报上报 - 安全事件
import CreateDonePage from './page/CreateDone/Loadable'; // 情报上报 - 成功
import WaitVerifyPage from './page/WaitVerify/Loadable'; // 情报审核 - 待审核列表
import AlreadyVerifyPage from './page/AlreadyVerify/Loadable'; // 情报审核 - 已审核列表
import Verify0DayPage from './page/Verify0Day/Loadable'; // 情报审核 - 0day审核（情报专家/运营专家）
import VerifyEvenPage from './page/VerifyEven/Loadable'; // 情报审核 - 0day审核（情报专家/运营专家）
import ThreatPage from './page/Threat/Loadable'; // 威胁列表 - 待排查/已派发/已排查
import ThreatDetailEvenPage from './page/ThreatDetailEven/Loadable'; // 威胁列表 - 安全事件详情
import ThreatDetail0DayPage from './page/ThreatDetail0Day/Loadable'; // 威胁列表 - 0day详情
import MaliciousIPPage from './page/MaliciousIP/Loadable'; // 恶意IP列表全部
import MaliciousIPMyPage from './page/MaliciousIPMy/Loadable'; // 恶意IP列表我新增导入的
import NewIpDetail from './page/MaliciousIPMy/component/newIpDetail'; // 我导入新增的IP列表详情页
import MaliciousIPDetail from './page/MaliciousIPDetail/Loadable'; // 恶意IP列表详情页
import ThreatDetection from './page/ThreatDetection/Loadable'; // 威胁排查确认页
import Troubleshooting from './page/ThreatProcess/Troubleshooting/Loadable'; // 威胁排查全流程
import TaskDetail from './page/TaskDetail/Loadable'; // 威胁任务列表
import ThreatDetail from './page/ThreatProcessDetail/Loadable'; // 排查详情页
export const threatIntelligenceRouter = {
    path: '/intelligence',
    exact: true,
    component: IntelligencePage,
    title: '情报管理',
    key: 'console_intelligence_manager',
    children: [
        {
            path: '/intelligence/list',
            component: IntelligencePage,
            exact: true,
            title: '我的列表',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/list/create0day',
            component: Create0DayPage,
            exact: true,
            title: '情报上报 - 0/N day',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/list/createeven',
            component: CreateEvenPage,
            exact: true,
            title: '情报上报 - 安全事件',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/list/evendetail',
            component: ThreatDetailEvenPage,
            // component: CreateEvenPage,
            exact: true,
            title: '安全事件详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/list/0daydetail',
            component: ThreatDetail0DayPage,
            // component: Create0DayPage,
            exact: true,
            title: '0/N day详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/list/createdone',
            component: CreateDonePage,
            exact: true,
            title: '情报上报 - 成功',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/approved-1th',
            component: WaitVerifyPage,
            exact: true,
            title: '情报审核 - 情报专家', // 待审核
            isShow: true,
            role: [ROLE_INTELLIGENCEEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/approved-1th/already',
            component: AlreadyVerifyPage,
            exact: true,
            title: '情报审核 - 已审核', // 情报专家
            isShow: false,
            role: [ROLE_INTELLIGENCEEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/approved-1th/0day',
            component: Verify0DayPage,
            exact: true,
            title: '情报审核 - 0day审核', // 情报专家
            isShow: false,
            role: [ROLE_INTELLIGENCEEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/approved-1th/even',
            component: VerifyEvenPage,
            exact: true,
            title: '情报审核 - 事件审核', // 情报专家
            isShow: false,
            role: [ROLE_INTELLIGENCEEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/approved-2th',
            component: WaitVerifyPage,
            exact: true,
            title: '情报审核 - 运营专家', // 待审核
            isShow: true,
            role: [ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/approved-2th/already',
            component: AlreadyVerifyPage,
            exact: true,
            title: '情报审核 - 已审核', // 运营专家
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/approved-2th/0day',
            component: Verify0DayPage,
            exact: true,
            title: '情报审核 - 0/N day审核', // 运营专家
            isShow: false,
            role: [ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/approved-2th/even',
            component: VerifyEvenPage,
            exact: true,
            title: '情报审核 - 事件审核', // 运营专家
            isShow: false,
            role: [ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/approved-1th/evendetail',
            component: ThreatDetailEvenPage,
            exact: true,
            title: '安全事件详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/approved-1th/0daydetail',
            component: ThreatDetail0DayPage,
            exact: true,
            title: '0/N day详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/approved-2th/evendetail',
            component: ThreatDetailEvenPage,
            exact: true,
            title: '安全事件详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/approved-2th/0daydetail',
            component: ThreatDetail0DayPage,
            exact: true,
            title: '0/N day详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/threat',
            component: ThreatPage,
            exact: true,
            title: '威胁列表',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/threat/wait',
            component: ThreatPage,
            exact: true,
            title: '待排查', // 待排查
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/threat/todo',
            component: ThreatPage,
            exact: true,
            title: '已派发',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/threat/done',
            component: ThreatPage,
            exact: true,
            title: '已排查',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/threat/evendetail',
            component: ThreatDetailEvenPage,
            exact: true,
            title: '安全事件详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/threat/0daydetail',
            component: ThreatDetail0DayPage,
            exact: true,
            title: '0/N day详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/maliciousip',
            component: MaliciousIPPage,
            exact: true,
            title: '恶意IP列表',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/maliciousip/use',
            component: MaliciousIPMyPage,
            exact: true,
            title: '我新增/导入的', // 恶意IP列表
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/maliciousip/use/detail',
            component: NewIpDetail,
            exact: true,
            title: '详情', // 我新增、导入的详情
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/maliciousipDetail',
            component: MaliciousIPDetail,
            exact: true,
            title: '恶意Ip列表详情页',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/intelligence/threatDetail',
            component: ThreatDetail,
            title: '排查详情查看',
            exact: true,
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/taskDetail',
            component: TaskDetail,
            title: '任务详情查看',
            exact: true,
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/threatdetection',
            component: ThreatDetection,
            title: '威胁排查',
            exact: true,
            isShow: false,
            role: [],
            offspring: [],
        },
        {
            path: '/intelligence/threatdetection/process',
            component: Troubleshooting,
            title: '排查', // 威胁排查全流程
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER], // 项目经理由威胁排查进入，工程师从工作台认领
            offspring: [],
        },
    ],
};
