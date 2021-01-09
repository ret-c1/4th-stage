// import { connect } from 'react-redux';
// import {
//     ROLE_PROJECT,
//     ROLE_ENGINEER,
//     ROLE_INTELLIGENCEEXPERT,
//     ROLE_OPERATIONEXPERT,
// } from '@config';
// import Troubleshooting from './Troubleshooting';
// import {
//     saveIdAction,
//     getChooseWarningPropertyAction,
//     clearWarningPropertyAction,
//     gotoStepAction,
//     getChoosePropertyAction,
//     clearPropertyAction,
//     checkPropertyDetailAction,
//     changePropertyModalAction,
//     situationAction,
//     warningEventAction,
//     addWarningAction,
//     addLogAction,
//     addEventAction,
//     getWarningListAction,
//     getLogListAction,
//     getEventListAction,
//     getResultListAction,
//     queryWarningAction,
//     queryLogAction,
//     queryEventAction,
// } from './action';
//
// const mapStateToProps = (state) => ({
//     rxRole: state.global.role,
//     rxInfo: state.global.useinfo,
//     validId: state.threat.validId,
//     chooseProperty: state.threat.chooseProperty,
//     chooseWarningProperty: state.threat.chooseWarningProperty,
//     propertyModal: state.threat.propertyModal,
//     currentStep: state.threat.currentStep,
//     assetRecordSource: state.threat.assetRecordSource,
//     warningRecordSource: state.threat.warningRecordSource,
//     troubleAsset: state.threat.troubleAsset,
//     warningEvent: state.threat.warningEvent,
//     warningList: state.threat.warningList,
//     logList: state.threat.logList,
//     eventList: state.threat.eventList,
//     warningRecord: state.threat.warningRecord,
//     logRecord: state.threat.logRecord,
//     eventRecord: state.threat.eventRecord,
//     resultList: state.threat.resultList,
//     global: state.global,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     saveId: (payload) => {
//         dispatch(saveIdAction(payload));
//     },
//     gotoStep: (params) => {
//         dispatch(gotoStepAction(params));
//     },
//     getChooseProperty: (params) => {
//         dispatch(getChoosePropertyAction(params));
//     },
//     clearProperty: () => {
//         dispatch(clearPropertyAction());
//     },
//     getChooseWarningProperty: (params) => {
//         dispatch(getChooseWarningPropertyAction(params));
//     },
//     clearWarningProperty: () => {
//         dispatch(clearWarningPropertyAction());
//     },
//     checkPropertyDetail: (id) => {
//         dispatch(checkPropertyDetailAction(id));
//     },
//     changePropertyModal: () => {
//         dispatch(changePropertyModalAction());
//     },
//     getSituation: (params) => {
//         dispatch(situationAction(params));
//     },
//     getWarningEvent: (params) => {
//         dispatch(warningEventAction(params));
//     },
//     getWarningList: (params) => {
//         dispatch(getWarningListAction(params));
//     },
//     getLogList: (params) => {
//         dispatch(getLogListAction(params));
//     },
//     getEventList: (params) => {
//         dispatch(getEventListAction(params));
//     },
//     getResultList: (params) => {
//         dispatch(getResultListAction(params));
//     },
//     queryWarning: (params) => {
//         dispatch(queryWarningAction(params));
//     },
//     queryLog: (params) => {
//         dispatch(queryLogAction(params));
//     },
//     queryEvent: (params) => {
//         dispatch(queryEventAction(params));
//     },
//     addWarning: (params, step) => {
//         dispatch(addWarningAction(params, step));
//     },
//     addLog: (params, step) => {
//         dispatch(addLogAction(params, step));
//     },
//     addEvent: (params, step) => {
//         dispatch(addEventAction(params, step));
//     },
// });
//
// export const connectTroubleshooting = connect(mapStateToProps, mapDispatchToProps)(Troubleshooting);
//
// export const threatRouter = {
//     path: '/threat',
//     exact: true,
//     component: connectTroubleshooting,
//     title: '预警管理？',
//     children: [
//         {
//             path: '/threat/list',
//             exact: true,
//             component: connectTroubleshooting,
//             title: '预警列表',
//             isShow: true,
//             children: [],
//         },
//     ],
// };
