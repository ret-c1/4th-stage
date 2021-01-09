import ListPage from './page/List/Loadable'; // 资产列表
import ChangeLogPage from './page/ChangeLog/Loadable'; // 变更记录
import ScrappedPage from './page/Scrapped/Loadable'; // 报废记录
import DestoryPage from './page/Destory/Loadable'; // 注销记录
import MaintenancePage from './page/Maintenance/Loadable'; // 资产维护
import DashboadPage from './page/Dashboad/Loadable'; // 资产概览
import BusinessSystemPage from './page/BusinessSystem/Loadable'; // 业务系统信息
// 主机
import ComputingDevicePage from './page/ComputingDevice/Loadable';
import ComputingDeviceDetailsPage from './page/ComputingDevice/Details';
import ComputingDeviceChangePage from './page/ComputingDevice/Change';
// import ComputingDeviceStep1Page from './page/ComputingDevice/Step1';
import ComputingDeviceStep2Page from './page/ComputingDevice/Step2';
import ComputingDeviceStep3Page from './page/ComputingDevice/Step3';
import ComputingDeviceStep4Page from './page/ComputingDevice/Step4';

// 网站
import WebsitePage from './page/Website/Loadable';
import WebsiteDetailsPage from './page/Website/Details';
import WebsiteChangePage from './page/Website/Change';
// import WebsiteStep1Page from './page/Website/Step1';
import WebsiteStep2Page from './page/Website/Step2';
import WebsiteStep3Page from './page/Website/Step3';
import WebsiteStep4Page from './page/Website/Step4';

// 数据库
import DatabasePage from './page/Database/Loadable';
import DatabaseDetailsPage from './page/Database/Details';
import DatabaseChangePage from './page/Database/Change';
// import DatabaseStep1Page from './page/Database/Step1';
import DatabaseStep2Page from './page/Database/Step2';
import DatabaseStep3Page from './page/Database/Step3';

// 软件
import SoftwarePage from './page/Software/Loadable';
import SoftwareDetailsPage from './page/Software/Details';
import SoftwareChangePage from './page/Software/Change';
// import SoftwareStep1Page from './page/Software/Step1';
import SoftwareStep2Page from './page/Software/Step2';
import SoftwareStep3Page from './page/Software/Step3';

// 网络
import NetworkPage from './page/Network/Loadable';
import NetworkDetailsPage from './page/Network/Details';
import NetworkChangePage from './page/Network/Change';
// import NetworkStep1Page from './page/Network/Step1';
import NetworkStep2Page from './page/Network/Step2';
import NetworkStep3Page from './page/Network/Step3';
import NetworkStep4Page from './page/Network/Step4';

// 代码
import ScmPage from './page/Scm/Loadable';
import ScmDetailsPage from './page/Scm/Details';
import ScmChangePage from './page/Scm/Change';
// import ScmStep1Page from './page/Scm/Step1';
import ScmStep2Page from './page/Scm/Step2';
import ScmStep3Page from './page/Scm/Step3';

// Application
import ApplicationPage from './page/Application/Loadable';
import ApplicationDetailsPage from './page/Application/Details';
import ApplicationChangePage from './page/Application/Change';
// import ApplicationStep1Page from './page/Application/Step1';
import ApplicationStep2Page from './page/Application/Step2';
import ApplicationStep3Page from './page/Application/Step3';

// Email
import EmailPage from './page/Email/Loadable';
import EmailDetailsPage from './page/Email/Details';
import EmailChangePage from './page/Email/Change';
// import EmailStep1Page from './page/Email/Step1';
import EmailStep2Page from './page/Email/Step2';
import EmailStep3Page from './page/Email/Step3';

// Wechat
import WechatPage from './page/Wechat/Loadable';
import WechatDetailsPage from './page/Wechat/Details';
import WechatChangePage from './page/Wechat/Change';
// import WechatStep1Page from './page/Wechat/Step1';
import WechatStep2Page from './page/Wechat/Step2';
import WechatStep3Page from './page/Wechat/Step3';

// 只有项目经理有权限
export const assetsChildrenRouter = [
    {
        path: '/project/assets',
        component: ListPage,
        exact: true,
        title: '资产管理',
        isShow: false,
        children: [
            {
                path: '/project/assets/computingdevice',
                component: ComputingDevicePage,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/computingdevice/step2',
                component: ComputingDeviceStep2Page,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/computingdevice/step3',
                component: ComputingDeviceStep3Page,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/computingdevice/step4',
                component: ComputingDeviceStep4Page,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/computingdevice/detail',
                component: ComputingDeviceDetailsPage,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/computingdevice/change',
                component: ComputingDeviceChangePage,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/website',
                component: WebsitePage,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/website/step2',
                component: WebsiteStep2Page,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/website/step3',
                component: WebsiteStep3Page,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/website/step4',
                component: WebsiteStep4Page,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/website/detail',
                component: WebsiteDetailsPage,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/website/change',
                component: WebsiteChangePage,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/database',
                component: DatabasePage,
                exact: true,
                title: '数据库资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/database/step2',
                component: DatabaseStep2Page,
                exact: true,
                title: '数据库资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/database/step3',
                component: DatabaseStep3Page,
                exact: true,
                title: '数据库资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/database/detail',
                component: DatabaseDetailsPage,
                exact: true,
                title: '数据库资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/database/change',
                component: DatabaseChangePage,
                exact: true,
                title: '数据库资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/software',
                component: SoftwarePage,
                exact: true,
                title: '软件资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/software/step2',
                component: SoftwareStep2Page,
                exact: true,
                title: '软件资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/software/step3',
                component: SoftwareStep3Page,
                exact: true,
                title: '软件资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/software/detail',
                component: SoftwareDetailsPage,
                exact: true,
                title: '软件资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/software/change',
                component: SoftwareChangePage,
                exact: true,
                title: '软件资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/network',
                component: NetworkPage,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/network/step2',
                component: NetworkStep2Page,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/network/step3',
                component: NetworkStep3Page,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/network/step4',
                component: NetworkStep4Page,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/network/detail',
                component: NetworkDetailsPage,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/network/change',
                component: NetworkChangePage,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scm',
                component: ScmPage,
                exact: true,
                title: '代码资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scm/step2',
                component: ScmStep2Page,
                exact: true,
                title: '代码资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scm/step3',
                component: ScmStep3Page,
                exact: true,
                title: '代码资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scm/detail',
                component: ScmDetailsPage,
                exact: true,
                title: '代码资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scm/change',
                component: ScmChangePage,
                exact: true,
                title: '代码资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/application',
                component: ApplicationPage,
                exact: true,
                title: 'Application资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/application/step2',
                component: ApplicationStep2Page,
                exact: true,
                title: 'Application资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/application/step3',
                component: ApplicationStep3Page,
                exact: true,
                title: 'Application资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/application/detail',
                component: ApplicationDetailsPage,
                exact: true,
                title: 'Application资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/application/change',
                component: ApplicationChangePage,
                exact: true,
                title: 'Application资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/email',
                component: EmailPage,
                exact: true,
                title: 'Email资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/email/step2',
                component: EmailStep2Page,
                exact: true,
                title: 'Email资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/email/step3',
                component: EmailStep3Page,
                exact: true,
                title: 'Email资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/email/detail',
                component: EmailDetailsPage,
                exact: true,
                title: 'Email资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/email/change',
                component: EmailChangePage,
                exact: true,
                title: 'Email资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/wechat',
                component: WechatPage,
                exact: true,
                title: 'Wechat资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/wechat/step2',
                component: WechatStep2Page,
                exact: true,
                title: 'Wechat资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/wechat/step3',
                component: WechatStep3Page,
                exact: true,
                title: 'Wechat资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/wechat/detail',
                component: WechatDetailsPage,
                exact: true,
                title: 'Wechat资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/wechat/change',
                component: WechatChangePage,
                exact: true,
                title: 'Wechat资产',
                isShow: false,
                children: [],
            },
        ],
    },
    {
        path: '/project/assets/change',
        component: ChangeLogPage,
        title: '变更记录',
        isShow: false,
        children: [
            {
                path: '/project/assets/change/computingdevice/detail',
                component: ComputingDeviceDetailsPage,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/change/website/detail',
                component: WebsiteDetailsPage,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/change/database/detail',
                component: DatabaseDetailsPage,
                exact: true,
                title: '数据库资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/change/software/detail',
                component: SoftwareDetailsPage,
                exact: true,
                title: '软件资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/change/network/detail',
                component: NetworkDetailsPage,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/change/scm/detail',
                component: ScmDetailsPage,
                exact: true,
                title: '代码资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/change/application/detail',
                component: ApplicationDetailsPage,
                exact: true,
                title: 'APP资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/change/email/detail',
                component: EmailDetailsPage,
                exact: true,
                title: 'Email资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/change/wechat/detail',
                component: WechatDetailsPage,
                exact: true,
                title: 'wechat资产',
                isShow: false,
                children: [],
            },
        ],
    },
    {
        path: '/project/assets/scrapped',
        component: ScrappedPage,
        title: '报废记录',
        isShow: false,
        children: [
            {
                path: '/project/assets/scrapped/computingdevice/detail',
                component: ComputingDeviceDetailsPage,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scrapped/website/detail',
                component: WebsiteDetailsPage,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scrapped/database/detail',
                component: DatabaseDetailsPage,
                exact: true,
                title: '数据库资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scrapped/software/detail',
                component: SoftwareDetailsPage,
                exact: true,
                title: '软件资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scrapped/network/detail',
                component: NetworkDetailsPage,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scrapped/scm/detail',
                component: ScmDetailsPage,
                exact: true,
                title: '代码资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scrapped/application/detail',
                component: ApplicationDetailsPage,
                exact: true,
                title: 'Application资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scrapped/email/detail',
                component: EmailDetailsPage,
                exact: true,
                title: 'Email资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/scrapped/wechat/detail',
                component: WechatDetailsPage,
                exact: true,
                title: 'Wechat资产',
                isShow: false,
                children: [],
            },
        ],
    },
    {
        path: '/project/assets/destory',
        component: DestoryPage,
        title: '注销记录',
        isShow: false,
        children: [
            {
                path: '/project/assets/destory/computingdevice/detail',
                component: ComputingDeviceDetailsPage,
                exact: true,
                title: '主机资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/destory/website/detail',
                component: WebsiteDetailsPage,
                exact: true,
                title: '网站资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/destory/database/detail',
                component: DatabaseDetailsPage,
                exact: true,
                title: '数据库资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/destory/software/detail',
                component: SoftwareDetailsPage,
                exact: true,
                title: '软件资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/destory/network/detail',
                component: NetworkDetailsPage,
                exact: true,
                title: '网络资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/destory/scm/detail',
                component: ScmDetailsPage,
                exact: true,
                title: '代码资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/destory/application/detail',
                component: ApplicationDetailsPage,
                exact: true,
                title: 'Application资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/destory/email/detail',
                component: EmailDetailsPage,
                exact: true,
                title: 'Email资产',
                isShow: false,
                children: [],
            },
            {
                path: '/project/assets/destory/wechat/detail',
                component: WechatDetailsPage,
                exact: true,
                title: 'Wechat资产',
                isShow: false,
                children: [],
            },
        ],
    },
    {
        path: '/project/assets/maintenance',
        component: MaintenancePage,
        exact: true,
        title: '资产维护',
        isShow: false,
        children: [
            {
                path: '/project/assets/maintenance/list',
                component: MaintenancePage,
                exact: true,
                title: '资产维护',
                isShow: false,
                children: [],
            },
        ],
    },
    {
        path: '/project/assets/dashboad',
        component: DashboadPage,
        exact: false,
        title: '资产概览',
        isShow: false,
        children: [
            {
                path: '/project/assets/dashboad/page',
                component: DashboadPage,
                exact: false,
                title: '资产概览',
                isShow: false,
                children: [],
            },
        ],
    },
    {
        path: '/project/assets/businesssystem',
        component: BusinessSystemPage,
        exact: true,
        title: '业务系统信息',
        isShow: false,
        children: [
            {
                path: '/project/assets/businesssystem/list',
                component: BusinessSystemPage,
                exact: true,
                title: '业务系统信息',
                isShow: false,
                children: [],
            },
        ],
    },
];
