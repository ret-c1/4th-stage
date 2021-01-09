import { ROLE_OUTSOURC_MANERGER, ROLE_OUTSOURC_ENGINEER } from '@config';
import WorkloadPage from './page/Workload/Loadable'; // 工作量列表
import OutsourcSupplierPage from './page/OutsourcSupplier/Loadable'; // 供应商管理

export const outsourcManageRouter = {
    path: '/outsourc',
    exact: true,
    component: WorkloadPage,
    title: '外包管理',
    key: 'outsourcing_manager',
    children: [
        {
            path: '/outsourc/workload',
            component: WorkloadPage,
            exact: true,
            title: '工作量列表',
            isShow: true,
            role: [ROLE_OUTSOURC_MANERGER, ROLE_OUTSOURC_ENGINEER],
            offspring: [],
        },
        {
            path: '/outsourc/outsourcsupplier',
            component: OutsourcSupplierPage,
            exact: true,
            title: '用户管理',
            isShow: true,
            role: [ROLE_OUTSOURC_MANERGER],
            offspring: [],
        },
    ],
};
