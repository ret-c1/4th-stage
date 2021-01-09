import { ROLE_DEMONSTRATE } from '@config';
import Demonstrate from './page/Loadable';

export const demonstrateRouter = {
    path: '/demonstrate',
    exact: true,
    component: Demonstrate,
    title: '可视化展示样例',
    key: 'console_visual_analysis_demo',
    children: [
        {
            path: '/demonstrate/list',
            component: Demonstrate,
            title: '可视化展示',
            isShow: true,
            role: [ROLE_DEMONSTRATE],
            offspring: [],
        },
    ],
};
