import {
    SET_TABEL_CHECKED,
    SET_TABEL_ALLCHECKED,
    ASSET_UNDO_LIST_PENDING,
    ASSET_UNDO_LIST_FULFILLED,
    ASSET_DOING_LIST_PENDING,
    ASSET_DOING_LIST_FULFILLED,
    GET_RESULT_LIST_PENDING,
    GET_RESULT_LIST_FULFILLED,
    QUERY_EVENT_ACTION,
} from './action';

const initialState = {
    checked: [],
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
    eventRecord: {},
};

export const intelligenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABEL_CHECKED:
            return { ...state, checked: action.payload };
        case SET_TABEL_ALLCHECKED:
            return { ...state, checked: action.payload };
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
        case QUERY_EVENT_ACTION:
            return {
                ...state,
                eventRecord: action.payload.data,
            };
        default:
            return state;
    }
};
