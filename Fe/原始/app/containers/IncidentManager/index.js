import {
    ROLE_PROJECT,
    ROLE_ENGINEER,
    ROLE_INTELLIGENCEEXPERT,
    ROLE_OPERATIONEXPERT,
} from '@config';
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
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/events/event',
            component: EventPage,
            exact: true,
            title: '事件列表',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
    ],
};
