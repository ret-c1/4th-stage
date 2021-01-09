import {
    ROLE_PROJECT,
    ROLE_ENGINEER,
    ROLE_INTELLIGENCEEXPERT,
    ROLE_OPERATIONEXPERT,
} from '@config';
import Log from './page/LogAnalysis/Loadable';
import Warning from './page/Warning/Loadable';

export const analysisRouter = {
    path: '/analysis',
    exact: true,
    component: Warning,
    title: '分析管理',
    key: 'console_analysis_manager',
    children: [
        {
            path: '/analysis/warning',
            component: Warning,
            title: '告警分析',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/analysis/log',
            component: Log,
            title: '日志分析',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
    ],
};
