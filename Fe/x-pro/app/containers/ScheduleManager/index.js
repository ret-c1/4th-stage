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
            children: [],
        },
        {
            path: '/schedule/task',
            exact: true,
            component: TaskSchedule,
            title: '排期查看',
            isShow: false,
            children: [],
        },
        {
            path: '/schedule/staff',
            exact: true,
            component: StaffSchedule,
            title: '人员排期',
            isShow: true,
            children: [],
        },
        {
            path: '/schedule/personal',
            exact: true,
            component: PersonalSchedule,
            title: '个人排期',
            isShow: true,
            children: [],
        },
    ],
};
