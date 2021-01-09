import { ROLE_ADMIN } from '@config';
import SystemStaff from './page/Staff/Loadable';
import SystemRoles from './page/Roles/Loadable';
import AddStaff from './page/AddStaff/Loadable';

// 只有项目经理有权限
export const systemRouter = {
    path: '/system',
    exact: true,
    component: SystemStaff,
    title: '系统管理',
    key: 'console_system_manager',
    children: [
        {
            path: '/system/staff',
            exact: true,
            component: SystemStaff,
            title: '用户管理',
            isShow: true,
            role: [ROLE_ADMIN],
            offspring: [],
        },
        {
            path: '/system/roles',
            exact: true,
            component: SystemRoles,
            title: '角色管理',
            isShow: true,
            role: [ROLE_ADMIN],
            offspring: [],
        },
        {
            path: '/system/staff/add',
            exact: true,
            component: AddStaff,
            title: '新增用户',
            isShow: false,
            offspring: [],
            role: [ROLE_ADMIN],
        },
        {
            path: '/system/staff/edit',
            exact: true,
            component: AddStaff,
            title: '编辑用户',
            isShow: false,
            offspring: [],
            role: [ROLE_ADMIN],
        },
    ],
};
