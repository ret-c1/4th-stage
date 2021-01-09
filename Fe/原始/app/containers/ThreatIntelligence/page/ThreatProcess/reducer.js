import * as types from './const';

const initialState = {
    troubleAsset: {
        loading: false,
        params: {},
        dataSource: [],
    },
    warningEvent: {
        loading: false,
        params: {
            limit: 10,
            offset: 0,
            param: {},
        },
        dataSource: [],
    },
    warningList: {
        loading: false,
        params: {},
        dataSource: [],
    },
    logList: {
        loading: false,
        params: {},
        dataSource: [],
    },
    eventList: {
        loading: false,
        params: {},
        dataSource: [],
    },
    resultList: {
        loading: false,
        params: {
            limit: 10,
            offset: 0,
            param: {},
        },
        dataSource: [],
    },
    chooseProperty: [],
    chooseWarningProperty: [],
    propertyModal: {
        visible: false,
        id: 0,
        modalData: {},
    },
    currentStep: 0,
    warningRecord: {},
    logRecord: {},
    eventRecord: {},
    assetRecordSource: [],
    warningRecordSource: [],
    validId: {},
    readyTimeList: {},
};

export const threatReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECORD_READY_TIME:
            return {
                ...state,
                readyTimeList: {
                    ...state.readyTimeList,
                    ...action.payload,
                },
            };
        case types.SAVE_ID_ACTION:
            return {
                ...state,
                validId: action.payload,
            };
        case types.GET_SITUATION_PENDING:
            return {
                ...state,
                troubleAsset: {
                    ...state.troubleAsset,
                    loading: true,
                    params: action.params,
                },
            };
        case types.GET_SITUATION_FULFILLED:
            return {
                ...state,
                troubleAsset: {
                    ...state.troubleAsset,
                    loading: false,
                    dataSource: action.payload.data || {},
                },
            };
        case types.GET_WARNING_EVENT_PENDING:
            return {
                ...state,
                warningEvent: {
                    ...state.warningEvent,
                    loading: true,
                    params: {
                        ...state.warningEvent.params,
                        ...action.params,
                    },
                },
            };
        case types.GET_WARNING_EVENT_FULFILLED:
            return {
                ...state,
                warningEvent: {
                    ...state.warningEvent,
                    loading: false,
                    dataSource: action.payload.data || {},
                },
            };
        case types.GET_CHOOSE_PROPERTY_ACTION:
            return {
                ...state,
                chooseProperty: action.payload.propertyParams,
                assetRecordSource: action.payload.selectedRows,
            };
        case types.CLEAR_PROPERTY_ACTION:
            return {
                ...state,
                chooseProperty: [],
                assetRecordSource: [],
            };
        case types.GET_CHOOSE_WARNING_PROPERTY_ACTION:
            return {
                ...state,
                chooseWarningProperty: action.payload.propertyParams,
                warningRecordSource: action.payload.selectedRows,
            };
        case types.CLEAR_WARNING_PROPERTY_ACTION:
            return {
                ...state,
                chooseWarningProperty: [],
                warningRecordSource: [],
            };
        case types.CHECK_PROPERTY_DETAIL_FULFILLED:
            return {
                ...state,
                propertyModal: {
                    ...state.propertyModal,
                    visible: true,
                    modalData: action.payload.data || {},
                },
            };
        case types.CHANGE_PROPERTY_MODAL_ACTION:
            return {
                ...state,
                propertyModal: {
                    ...state.propertyModal,
                    visible: false,
                },
            };
        case types.GET_WARNING_LIST_PENDING:
            return {
                ...state,
                warningList: {
                    ...state.warningList,
                    loading: true,
                    params: action.params,
                },
            };
        case types.GET_WARNING_LIST_FULFILLED:
            return {
                ...state,
                warningList: {
                    ...state.warningList,
                    loading: false,
                    dataSource: action.payload.data || [],
                },
            };
        case types.GET_LOG_LIST_PENDING:
            return {
                ...state,
                logList: {
                    ...state.logList,
                    loading: true,
                    params: action.params,
                },
            };
        case types.GET_LOG_LIST_FULFILLED:
            return {
                ...state,
                logList: {
                    ...state.logList,
                    loading: false,
                    dataSource: action.payload.data || [],
                },
            };
        case types.GET_EVENT_LIST_PENDING:
            return {
                ...state,
                eventList: {
                    ...state.eventList,
                    loading: true,
                    params: action.params,
                },
            };
        case types.GET_EVENT_LIST_FULFILLED:
            return {
                ...state,
                eventList: {
                    ...state.eventList,
                    loading: false,
                    dataSource: action.payload.data || [],
                },
            };
        case types.GET_RESULT_LIST_PENDING:
            return {
                ...state,
                resultList: {
                    ...state.resultList,
                    loading: true,
                    params: {
                        ...state.warningEvent.params,
                        ...action.params,
                    },
                },
            };
        case types.GET_RESULT_LIST_FULFILLED:
            return {
                ...state,
                resultList: {
                    ...state.resultList,
                    loading: false,
                    dataSource: action.payload.data || {},
                },
            };
        case types.GOTO_STEP_ACTION:
            return {
                ...state,
                currentStep: action.payload,
            };
        case types.QUERY_WARNING_ACTION:
            return {
                ...state,
                warningRecord: action.payload.data,
            };
        case types.QUERY_LOG_ACTION:
            return {
                ...state,
                logRecord: action.payload.data,
            };
        case types.QUERY_EVENT_ACTION:
            return {
                ...state,
                eventRecord: action.payload.data,
            };
        default:
            return state;
    }
};
