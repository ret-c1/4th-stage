// import { connect } from 'react-redux';
import {
    ROLE_PROJECT,
    ROLE_ENGINEER,
    ROLE_INTELLIGENCEEXPERT,
    ROLE_OPERATIONEXPERT,
} from '@config';
import IntelligenceList from './page/IntelligenceList/Loadable';
import IntelligenceCreate from './page/IntelligenceCreate/Loadable';
import AssessInfo from './page/AssessInfo/Loadable';
import AssessFinish from './page/AssessFinish/Loadable';
import ThreatList from './page/ThreatList/Loadable';
import InfoExpertList from './page/InfoExpertList/Loadable';
import OperatorList from './page/OperatorList/Loadable';
import ThreatDetection from './page/ThreatDetection/Loadable';
import ThreatDetail from './page/ThreatDetail/Loadable';
import TaskDetail from './page/TaskDetail/Loadable';
import Troubleshooting from './page/Threat/Troubleshooting/Loadable';

export const intelligenceRouter = {
    path: '/intelligence',
    exact: true,
    component: IntelligenceList,
    title: '情报管理',
    key: 'console_intelligence_manager',
    children: [
        {
            path: '/intelligence/list',
            exact: true,
            component: IntelligenceList,
            title: '情报上报',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/list/create',
            component: IntelligenceCreate,
            title: '情报上报-提交',
            isShow: false,
            role: [],
            offspring: [],
        },
        {
            path: '/intelligence/infoexpertlist',
            component: InfoExpertList,
            title: '情报审核-情报专家', // 情报专家
            isShow: true,
            role: [ROLE_INTELLIGENCEEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/operaterlist',
            component: OperatorList,
            title: '情报审核-运营专家', // 运营专家
            isShow: true,
            role: [ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/intelligence/assessInfo',
            component: AssessInfo,
            title: '情报审核-详情',
            isShow: false,
            role: [],
            offspring: [],
        },
        {
            path: '/intelligence/assessfinish',
            component: AssessFinish,
            title: '情报标示',
            isShow: false,
            role: [],
            offspring: [],
        },
        {
            path: '/intelligence/threatlist',
            component: ThreatList,
            title: '威胁列表',
            isShow: true,
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
            path: '/intelligence/threatdetection/process',
            component: Troubleshooting,
            title: '排查', // 威胁排查全流程
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER], // 项目经理由威胁排查进入，工程师从工作台认领
            offspring: [],
        },
    ],
};
