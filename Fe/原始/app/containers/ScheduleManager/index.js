import { ROLE_PRINCIPAL, ROLE_PROJECT, ROLE_ENGINEER } from '@config';
import Schedule from './page/Index/Loadable';
import StaffSchedule from './page/Staff/Loadable';
import PersonalSchedule from './page/Personal/Loadable';
import TaskSchedule from './page/Task/Loadable';

export const scheduleRouter = {
    path: '/schedule',
    exact: true,
    component: Schedule,
    title: '日程管理',
    key: 'console_schedule_manager',
    children: [
        {
            path: '/schedule/list',
            exact: true,
            component: Schedule,
            title: '项目排期',
            isShow: true,
            role: [ROLE_PRINCIPAL],
            offspring: [],
        },
        {
            path: '/schedule/task',
            exact: true,
            component: TaskSchedule,
            title: '排期查看',
            isShow: false,
            role: [ROLE_PRINCIPAL],
            offspring: [],
        },
        {
            path: '/schedule/staff',
            exact: true,
            component: StaffSchedule,
            title: '人员排期',
            role: [ROLE_PRINCIPAL, ROLE_PROJECT], // 技术负责人（看到自己所属的数据范围，从这里日程管理直接进入）和项目经理（自己项目内的只能从工作计划进入）
            isShow: true,
            offspring: [],
        },
        {
            path: '/schedule/personal',
            exact: true,
            component: PersonalSchedule,
            title: '个人排期',
            role: [ROLE_PROJECT, ROLE_PRINCIPAL, ROLE_ENGINEER], // 所有人都可以看到自己的
            isShow: true,
            offspring: [],
        },
    ],
};
