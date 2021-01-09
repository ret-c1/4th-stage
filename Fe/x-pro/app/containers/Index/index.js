// import DataAnalysis from '@containers/DemonStrate/page/Loadable';
import Dashboad from './page/Dashboad/Loadable';

export const indexRouter = {
    path: '/',
    exact: true,
    component: Dashboad,
    title: '工作台',
    key: 'WorkingDesk',
    children: [
        {
            path: '/dashboad',
            component: Dashboad,
            title: 'Dashboad',
            isShow: true,
            exact: true,
            children: [],
        },
    ],
};
