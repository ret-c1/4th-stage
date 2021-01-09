import { ROLE_PROJECT, ROLE_ENGINEER } from '@config';
import ISrclist from './page/ISrclist/Loadable';
import AddISrc from './page/AddISrc/Loadable';
import ISrcisrcVullist from './page/IsrcisrcVullist/Loadable';

export const isrcRouter = {
    path: '/isrc',
    exact: true,
    title: '雷神众测',
    component: ISrclist,
    key: 'ISrc',
    children: [
        {
            path: '/isrc/list',
            component: ISrclist,
            title: '列表',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/isrc/addisrc',
            component: AddISrc,
            title: '创建众测',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/isrc/isrcVullist',
            component: ISrcisrcVullist,
            title: '漏洞详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
    ],
};
