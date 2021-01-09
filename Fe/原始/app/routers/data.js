import { ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN } from '@config';
// 应用
import { csovAppRouter } from '@CSOV/Application';
// 我的应用
import { csovSelfRouter } from '@CSOV/SelfApplication';

export const csodataRouter2 = {
    path: '/csovsv9',
    exact: true,
    component: csovAppRouter.component,
    title: '免费试用',
    // key: 'console_visual_analysis_demo',
    key: 'ProjectManagement',
    children: [
        {
            path: '/csovsv9/free',
            component: csovAppRouter.component,
            title: '免费试用',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            children: [],
        },
    ],
};

// 私有路由
export const dataRoutes = [csovAppRouter, csovSelfRouter, csodataRouter2];

// 展开所有路由
export const flattenDataRoutes = [];
const renderprivate = (data) => {
    data.forEach((item) => {
        flattenDataRoutes.push({
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
renderprivate(dataRoutes);

// 面包屑
export const renderBreadcrumbs = () => {
    const obj = {};
    flattenDataRoutes.forEach((item) => {
        obj[item.path] = item.title;
    });
    return obj;
};
