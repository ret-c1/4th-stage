import Penetrationtest from './page/Penetrationtest/Loadable';
import AddPenetration from './page/AddPenetration/Loadable';
import PenetrationDetail from './page/PenetrationDetail/Loadable';
import WatchReport from './page/WatchReport/Loadable';

export const penetrationRouter = {
    path: '/penetration',
    exact: true,
    title: '渗透测试',
    key: 'SecurePenetrate',
    component: Penetrationtest,
    children: [
        {
            path: '/penetration/list',
            exact: true,
            component: Penetrationtest,
            title: '报告列表',
            isShow: true,
            children: [],
        },
        {
            path: '/penetration/add',
            exact: true,
            component: AddPenetration,
            title: '新建报告',
            isShow: true,
            children: [],
        },
        {
            path: '/penetration/detail',
            exact: true,
            component: PenetrationDetail,
            title: '漏洞信息',
            isShow: false,
            children: [],
        },
        {
            path: '/penetration/reportdetail',
            exact: true,
            component: WatchReport,
            title: '报告详情',
            isShow: false,
            children: [],
        },
    ],
};
