// import DataAnalysis from '@containers/DemonStrate/page/Loadable';
import {
    ROLE_ADMIN,
    ROLE_PROJECT,
    ROLE_ENGINEER,
    ROLE_PRINCIPAL,
    ROLE_INTELLIGENCEEXPERT,
    ROLE_OPERATIONEXPERT,
} from '@config';
import Dashboad from './page/Dashboad/Loadable';

export const indexRouter = {
    path: '/',
    exact: true,
    component: Dashboad,
    // component: DataAnalysis,
    title: '工作台',
    key: 'WorkingDesk',
    children: [
        {
            path: '/dashboad',
            component: Dashboad,
            title: '工作台',
            isShow: true,
            role: [
                ROLE_ADMIN,
                ROLE_PROJECT,
                ROLE_ENGINEER,
                ROLE_PRINCIPAL,
                ROLE_INTELLIGENCEEXPERT,
                ROLE_OPERATIONEXPERT,
            ],
            offspring: [],
        },
    ],
};
