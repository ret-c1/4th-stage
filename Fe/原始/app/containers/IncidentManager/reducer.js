import * as types from './const';

const initialState = {
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
        },
        dataSource: [],
    },
    warningRecord: {},
    logRecord: {},
    eventRecord: {},
    readyTimeList: {},
    projectList: [],
};

export const happeningReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECORD_READY_TIME:
            return {
                ...state,
                readyTimeList: {
                    ...state.readyTimeList,
                    ...action.payload,
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
                        ...state.resultList.params,
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
        case types.GET_PROJECT_ACTION:
            return {
                ...state,
                projectList: action.payload.data && action.payload.data.records,
            };
        default:
            return state;
    }
};
