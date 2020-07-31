import Welcome from 'containers/Index/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import Infomation from 'containers/Infomation/Loadable';
import Characteristic from 'containers/Characteristic/Loadable';
import Expert from 'containers/Expert/Loadable';
import Schedule from 'containers/Schedule/Loadable';
import Moment from 'containers/Moment/Loadable';
import Service from 'containers/Service/Loadable';
import Download from 'containers/Download/Loadable';
import News from 'containers/News/Loadable';
import CheckIn from 'containers/CheckIn/Loadable';
import StaffMember from 'containers/StaffMember/Loadable';
import SecondarySchedule from 'containers/SecondarySchedule/Loadable';
import SignUp from 'containers/SignUp/Loadable';
import NewsDetail from 'containers/NewsDetail/Loadable';
import Use from 'containers/Use/Loadable';
import MomentDetail from 'containers/MomentDetail/Loadable';
import MyFllow from 'containers/MyFllow/Loadable';
import Product from 'containers/Product/Loadable';
import VIP from 'containers/VIP/Loadable';
import Logout from 'containers/Logout/Loadable';
import NewsVideoDetail from 'containers/NewsVideoDetail/Loadable';

export const privateRoutes = [
    {
        path: '/',
        exact: true,
        component: Welcome,
    },
    {
        path: '/use',
        component: Use,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/infomation',
        component: Infomation,
    },
    {
        path: '/characteristic',
        component: Characteristic,
    },
    {
        path: '/expert',
        component: Expert,
    },
    {
        path: '/schedule/:id',
        component: SecondarySchedule,
    },
    {
        path: '/schedule',
        component: Schedule,
    },
    {
        path: '/moment/:id',
        component: MomentDetail,
    },
    {
        path: '/moment',
        component: Moment,
    },
    {
        path: '/service',
        component: Service,
    },
    {
        path: '/download',
        component: Download,
    },
    {
        path: '/news/video/:id',
        component: NewsVideoDetail,
    },
    {
        path: '/news/:id',
        component: NewsDetail,
    },
    {
        path: '/news',
        component: News,
    },
    {
        path: '/checkin',
        component: CheckIn,
    },
    {
        path: '/staffmember',
        component: StaffMember,
    },
    {
        path: '/signup',
        component: SignUp,
    },
    {
        path: '/myfllow',
        component: MyFllow,
    },
    {
        path: '/myfllow',
        component: MyFllow,
    },
    {
        path: '/product/:id',
        component: Product,
    },
    {
        path: '/vip',
        component: VIP,
    },
    {
        path: '/logout',
        component: Logout,
    },
];
