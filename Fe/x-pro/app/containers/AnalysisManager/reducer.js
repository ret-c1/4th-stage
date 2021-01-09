import * as types from './const';

const initialState = {
    warningList: {
        loading: false,
        params: {},
        dataSource: [],
    },
    warningEvent: {
        loading: false,
        params: {
            limit: 10,
            offset: 0,
            param: {
                destIps: [],
            },
        },
        dataSource: [],
    },
    chooseProperty: [],
    warningRecordSource: [],
    warningRecord: {},
    logList: {
        loading: false,
        params: {},
        dataSource: [],
    },
    logRecord: {},
    projectList: [],
    readyTimeList: {},
};

export const analysisReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECORD_READY_TIME:
            return {
                ...state,
                readyTimeList: {
                    ...state.readyTimeList,
                    ...action.payload,
                },
            };
        case types.GET_CHOOSE_PROPERTY_ACTION:
            return {
                ...state,
                chooseProperty: action.payload.propertyParams,
                warningRecordSource: action.payload.selectedRows,
            };
        case types.CLEAR_PROPERTY_ACTION:
            return {
                ...state,
                chooseProperty: [],
                warningRecordSource: [],
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
        case types.GET_PROJECT_ACTION:
            return {
                ...state,
                projectList: action.payload.data && action.payload.data.records,
            };
        default:
            return state;
    }
};
