import {
    SET_TABEL_CHECKED,
    SET_TABEL_ALLCHECKED,
    GET_ASSET_KEY_ACTION,
    ASSET_UNDO_LIST_PENDING,
    ASSET_UNDO_LIST_FULFILLED,
    ASSET_DOING_LIST_PENDING,
    ASSET_DOING_LIST_FULFILLED,
    GET_RESULT_LIST_PENDING,
    GET_RESULT_LIST_FULFILLED,
    GET_TASK_LIST_PENDING,
    GET_TASK_LIST_FULFILLED,
    QUERY_EVENT_ACTION,
} from './action';

const initialState = {
    checked: [],
    assetKey: {},
    assetUndoList: {
        loading: false,
        params: {
            limit: 10,
            offset: 0,
            param: {},
        },
        dataSource: {},
    },
    assetDoingList: {
        loading: false,
        params: {
            limit: 10,
            offset: 0,
            param: {},
        },
        dataSource: {},
    },
    resultList: {
        loading: false,
        params: {
            limit: 10,
            offset: 0,
            param: {},
        },
        dataSource: {},
    },
    taskList: {
        loading: false,
        params: {
            limit: 10,
            offset: 0,
            param: {},
        },
        dataSource: {},
    },
    eventRecord: {},
};

export const intelligenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABEL_CHECKED:
            return { ...state, checked: action.payload };
        case SET_TABEL_ALLCHECKED:
            return { ...state, checked: action.payload };
        case GET_ASSET_KEY_ACTION:
            return { ...state, assetKey: action.payload.data };
        case ASSET_UNDO_LIST_PENDING:
            return {
                ...state,
                assetUndoList: {
                    ...state.assetUndoList,
                    loading: true,
                    params: {
                        ...state.assetUndoList.params,
                        ...action.params,
                    },
                },
            };
        case ASSET_UNDO_LIST_FULFILLED:
            return {
                ...state,
                assetUndoList: {
                    ...state.assetUndoList,
                    loading: false,
                    dataSource: action.payload.data || {},
                },
            };
        case ASSET_DOING_LIST_PENDING:
            return {
                ...state,
                assetDoingList: {
                    ...state.assetDoingList,
                    loading: true,
                    params: {
                        ...state.assetDoingList.params,
                        ...action.params,
                    },
                },
            };
        case ASSET_DOING_LIST_FULFILLED:
            return {
                ...state,
                assetDoingList: {
                    ...state.assetDoingList,
                    loading: false,
                    dataSource: action.payload.data || {},
                },
            };
        case GET_RESULT_LIST_PENDING:
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
        case GET_RESULT_LIST_FULFILLED:
            return {
                ...state,
                resultList: {
                    ...state.resultList,
                    loading: false,
                    dataSource: action.payload.data || {},
                },
            };
        case GET_TASK_LIST_PENDING:
            return {
                ...state,
                taskList: {
                    ...state.taskList,
                    loading: true,
                    params: {
                        ...state.taskList.params,
                        ...action.params,
                    },
                },
            };
        case GET_TASK_LIST_FULFILLED:
            return {
                ...state,
                taskList: {
                    ...state.taskList,
                    loading: false,
                    dataSource: action.payload.data || {},
                },
            };
        case QUERY_EVENT_ACTION:
            return {
                ...state,
                eventRecord: action.payload.data,
            };
        default:
            return state;
    }
};
