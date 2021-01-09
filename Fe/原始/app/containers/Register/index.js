import ForgetPassword from './ForgetPassword/Loadable';
import ConfirmPassword from './ForgetPassword/next';
import Register from './Register/Loadable';
import SuccessInfo from './SuccessInfo/Loadable';

export const registerRouter = [
    {
        path: '/forget',
        component: ForgetPassword,
    },
    {
        path: '/confirm',
        component: ConfirmPassword,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/successInfo',
        component: SuccessInfo,
    },
];
