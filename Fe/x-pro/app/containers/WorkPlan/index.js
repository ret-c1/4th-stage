import IndexPage from './page/Index/Loadable'; // 中转
// import PMPage from './page/PM/Loadable'; // 项目经理 计划
import ModifyPage from './page/Modify/Loadable'; // 新增&编辑计划
import WorkOrderPage from './page/WorkOrder/Loadable'; // 工单
import ReceivePage from './page/Receive/Loadable'; // 认领
import VulnerabilityScanPage from './page/VulnerabilityScan/Loadable'; // 扫描操作页
import DonePage from './page/Done/Loadable'; // 确认

export const workPlanRouter = {
    path: '/workplan',
    exact: true,
    component: IndexPage,
    title: '工作计划',
    key: 'console_hw_daily',
    children: [
        {
            path: '/workplan/list',
            component: IndexPage,
            exact: true,
            title: '列表',
            isShow: true,
            children: [],
        },
        {
            path: '/workplan/create',
            component: ModifyPage,
            exact: true,
            title: '新增计划',
            isShow: false,
            children: [],
        },
        {
            path: '/workplan/edit',
            component: ModifyPage,
            exact: true,
            title: '编辑计划',
            isShow: false,
            children: [],
        },
        {
            path: '/workplan/order',
            component: WorkOrderPage,
            exact: true,
            title: '工单',
            isShow: false,
            children: [],
        },
        {
            path: '/workplan/receive',
            component: ReceivePage,
            exact: true,
            title: '计划认领',
            isShow: false,
            children: [],
        },
        {
            path: '/workplan/vulscan',
            component: VulnerabilityScanPage,
            exact: true,
            title: '执行任务',
            isShow: false,
            children: [],
        },
        {
            path: '/workplan/vulscan/done',
            component: DonePage,
            exact: true,
            title: '任务确认',
            isShow: false,
            children: [],
        },
    ],
};
