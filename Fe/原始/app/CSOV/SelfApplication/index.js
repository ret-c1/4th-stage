import { ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN } from '@config';
import VulManergePage from './page/VulManerge/Loadable';
import HWBeforePage from './page/HW/Index/Loadable';
import HWMiddlePage from './page/HW/Middle/Loadable';
import HWAfterPage from './page/HW/After/Loadable';

export const csovSelfRouter = {
    path: '/csovself',
    exact: true,
    component: HWBeforePage,
    title: '我的应用',
    // key: 'console_visual_analysis_demo',
    key: 'ProjectManagement',
    children: [
        {
            path: '/csovself/sv1',
            component: HWBeforePage,
            title: '云服务',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [],
        },
        {
            path: '/csovself/professional',
            component: VulManergePage,
            title: '专业服务',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [
                {
                    path: '/csovself/professional/vul',
                    component: VulManergePage,
                    title: '漏洞管理',
                    isShow: true,
                    role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
                    offspring: [],
                },
            ],
        },
        {
            path: '/csovself/sv3',
            component: HWBeforePage,
            title: '运营服务',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [],
        },
        {
            path: '/csovself/sv4',
            component: HWBeforePage,
            title: '设备服务',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [],
        },
        {
            path: '/csovself/sv5',
            component: HWBeforePage,
            title: '资源服务',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [],
        },
        {
            path: '/csovself/sv6',
            component: HWBeforePage,
            title: '智能服务',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [],
        },
        {
            path: '/csovself/hw',
            component: HWBeforePage,
            title: '场景服务',
            exact: true,
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [
                {
                    path: '/csovself/hw/before',
                    component: HWBeforePage,
                    title: '护网场景',
                    isShow: true,
                    role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
                    offspring: [],
                },
                {
                    path: '/csovself/hw/middle',
                    component: HWMiddlePage,
                    title: '护网场景',
                    isShow: false,
                    role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
                    offspring: [],
                },
                {
                    path: '/csovself/hw/after',
                    component: HWAfterPage,
                    title: '护网场景',
                    isShow: false,
                    role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
                    offspring: [],
                },
            ],
        },
        {
            path: '/csovself/sv8',
            component: HWBeforePage,
            title: 'APP服务',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [],
        },
    ],
};
