import { ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN } from '@config';
import SiteMapPage from './page/SiteMap/Loadable';

export const csovAppRouter = {
    path: '/csovapp',
    exact: true,
    component: SiteMapPage,
    title: '应用',
    // key: 'console_visual_analysis_demo',
    key: 'ProjectManagement',
    children: [
        {
            path: '/csovapp/sitemap',
            component: SiteMapPage,
            title: '运营地图',
            isShow: true,
            role: [ROLE_DEMONSTRATE, ROLE_PROJECT, ROLE_ENGINEER, ROLE_ADMIN],
            offspring: [],
        },
    ],
};
