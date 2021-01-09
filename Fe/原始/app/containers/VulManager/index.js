import { ROLE_PROJECT, ROLE_ENGINEER } from '@config';
import OperationPage from './page/Operation/Loadable';
import OperationDetailPage from './page/OperationDetail/Loadable';

// 只有项目经理有权限
export const vulManagerRouter = {
    path: '/vulmanager',
    exact: true,
    component: OperationPage,
    title: '漏洞管理',
    key: 'VulManager',
    children: [
        {
            path: '/vulmanager/list',
            component: OperationPage,
            exact: true,
            title: '运维响应',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [
                {
                    path: '/vulmanager/list/project',
                    component: OperationPage,
                    exact: true,
                    title: '项目经理',
                    isShow: true,
                    role: [ROLE_PROJECT],
                    offspring: [],
                },
                {
                    path: '/vulmanager/list/engineer',
                    component: OperationPage,
                    exact: true,
                    title: '工程师',
                    isShow: true,
                    role: [ROLE_ENGINEER],
                    offspring: [],
                },
            ],
        },
        {
            path: '/vulmanager/detail',
            component: OperationDetailPage,
            title: '详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
    ],
};
