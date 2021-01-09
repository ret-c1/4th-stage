import ResearchPage from './page/Research/Loadable';
import EventPage from './page/Event/Loadable';

export const happeningRouter = {
    path: '/events',
    exact: true,
    component: ResearchPage,
    title: '事件管理',
    key: 'console_happening_manager',
    children: [
        {
            path: '/events/research',
            component: ResearchPage,
            title: '事件研判',
            isShow: true,
            children: [],
        },
        {
            path: '/events/event',
            component: EventPage,
            exact: true,
            title: '事件列表',
            isShow: true,
            children: [],
        },
    ],
};
