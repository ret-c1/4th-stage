import {
    ROLE_PROJECT,
    ROLE_ENGINEER,
    ROLE_INTELLIGENCEEXPERT,
    ROLE_OPERATIONEXPERT,
} from '@config';
import ReportPage from './page/Report/Loadable';
import ExaminePage from './page/Examine/Loadable';
import Assess from './page/Examine/assess';
import SyncPage from './page/Sync/Loadable';
import CasePage from './page/ManagerCase/Loadable';
// import EngineerCase from './page/EngineerCase/Loadable';
import EventPage from './page/Event/Loadable';
import EventCheck from './page/EventCheck/Loadable';
import ReportList from './page/ReportList/Loadable';
// import HiddenPage from './page/Hidden/Loadable';
import MemberList from './page/MemberList/Loadable';
import EmergencyPage from './page/Emergency/Loadable';
import EngineerHandle from './page/ReportList/handle';
import EngineerSuccess from './page/ReportList/handleSuccess';
import HandleCheck from './page/Handle/Loadable';
import CaseAssess from './page/CaseAssess/Loadable';
import SingleStep1Page from './page/Single/Step1/Loadable';
import SingleStep2Page from './page/Single/Step2/Loadable';
import SingleStep3Page from './page/Single/Step3/Loadable';
import SingleStep4Page from './page/Single/Step4/Loadable';
import ListPage from './page/List/Loadable';

// 应急案例改版 - 2020-0529
import PublicCasePage from './page/PublicCase/Loadable';
import PublicCaseImportPage from './page/PublicCaseImport/Loadable';
import PublicCaseImportDonePage from './page/PublicCaseImportDone/Loadable';
import PublicCaseImportFailPage from './page/PublicCaseImportDone/fail';
import PublicCaseDetailPage from './page/PublicCaseDetail/Loadable';

export const incidentRouter = {
    path: '/incident',
    exact: true,
    component: EventPage,
    title: '应急响应',
    key: 'console_incident_response',
    children: [
        // {
        //     path: '/incident/event',
        //     component: EventPage,
        //     exact: true,
        //     title: '事件列表',
        //     isShow: true,
        //     role: [ROLE_PROJECT, ROLE_ENGINEER],
        //     children: [],
        // },
        {
            path: '/incident/list',
            component: ListPage,
            exact: true,
            title: '应急列表',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [
                {
                    path: '/incident/list/project',
                    component: ListPage,
                    exact: true,
                    title: '项目经理',
                    isShow: true,
                    role: [ROLE_PROJECT],
                    offspring: [],
                },
                {
                    path: '/incident/list/engineer',
                    component: ListPage,
                    exact: true,
                    title: '工程师',
                    isShow: true,
                    role: [ROLE_ENGINEER],
                    offspring: [],
                },
            ],
        },
        {
            path: '/incident/event/check',
            component: EventCheck,
            exact: true,
            title: '事件查看',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/incident/reportList',
            component: ReportList,
            exact: true,
            title: '应急报告',
            isShow: true,
            role: [ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/incident/reportList/handle',
            component: EngineerHandle,
            exact: true,
            title: '工程师处置',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/engineer/success',
            component: EngineerSuccess,
            exact: true,
            title: '处置完成',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/report',
            component: ReportPage,
            title: '查看报告',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/examine',
            component: ExaminePage,
            exact: true,
            title: '应急评审',
            isShow: true,
            role: [ROLE_PROJECT],
            offspring: [],
        },
        {
            path: '/incident/assess',
            exact: true,
            component: Assess,
            title: '查看信息',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/sync',
            component: SyncPage,
            title: '应急同步',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/managerCase',
            component: CasePage,
            exact: true,
            title: '案例审核',
            isShow: true,
            role: [ROLE_PROJECT],
            offspring: [],
        },
        // {
        //     path: '/incident/engineerCase',
        //     component: EngineerCase,
        //     exact: true,
        //     title: '应急案例',
        //     isShow: true,
        //     role: [ROLE_ENGINEER, ROLE_PROJECT],
        //     children: [],
        // },
        {
            path: '/incident/single',
            component: SingleStep1Page,
            exact: true,
            title: '创建应急',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/single/step1',
            component: SingleStep1Page,
            title: '基本信息',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/single/step2',
            component: SingleStep2Page,
            title: '应急信息',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/single/step3',
            component: SingleStep3Page,
            title: '排查记录及结果',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/single/step4',
            component: SingleStep4Page,
            title: '完成',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/emergency',
            component: EmergencyPage,
            title: '应急处置',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/handleCheck',
            component: HandleCheck,
            title: '查看处置',
            isShow: false,
            role: [],
            offspring: [],
        },
        {
            path: '/incident/memberList',
            component: MemberList,
            title: '小组成员',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/engineerCase/caseAssess',
            component: CaseAssess,
            exact: true,
            title: '案例详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER, ROLE_INTELLIGENCEEXPERT, ROLE_OPERATIONEXPERT],
            offspring: [],
        },
        {
            path: '/incident/publiccase',
            component: PublicCasePage,
            exact: true,
            title: '应急案例',
            isShow: true,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/incident/publiccase/import',
            component: PublicCaseImportPage,
            exact: true,
            title: '应急案例 - 导入',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/incident/publiccase/import/done',
            component: PublicCaseImportDonePage,
            exact: true,
            title: '应急案例 - 导入 - 成功',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/incident/publiccase/import/fail',
            component: PublicCaseImportFailPage,
            exact: true,
            title: '应急案例 - 导入 - 失败',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
        {
            path: '/incident/publiccase/detail',
            component: PublicCaseDetailPage,
            exact: true,
            title: '应急案例 - 详情',
            isShow: false,
            role: [ROLE_PROJECT, ROLE_ENGINEER],
            offspring: [],
        },
    ],
};
