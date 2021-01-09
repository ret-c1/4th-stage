import request from '@utils/request';
import { message } from 'antd';
export const SET_TABEL_CHECKED = 'SET_TABEL_CHECKED'; // 单选
export const SET_TABEL_ALLCHECKED = 'SET_TABEL_ALLCHECKED'; // 全选
export const ASSET_UNDO_LIST_PENDING = 'ASSET_UNDO_LIST_PENDING';
export const ASSET_UNDO_LIST_FULFILLED = 'ASSET_UNDO_LIST_FULFILLED';
export const ASSET_DOING_LIST_PENDING = 'ASSET_DOING_LIST_PENDING';
export const ASSET_DOING_LIST_FULFILLED = 'ASSET_DOING_LIST_FULFILLED';
export const GET_RESULT_LIST_PENDING = 'GET_RESULT_LIST_PENDING';
export const GET_RESULT_LIST_FULFILLED = 'GET_RESULT_LIST_FULFILLED';
export const QUERY_EVENT_ACTION = 'QUERY_EVENT_ACTION';

// 单选
export const tabelcheckAction = (payload) => ({
    type: SET_TABEL_CHECKED,
    payload,
});

// 全选
export const tabelallcheckAction = (payload) => ({
    type: SET_TABEL_ALLCHECKED,
    payload,
});

// 未排查列表
export const assetUndoListAction = (params) => (dispatch) => {
    dispatch({
        type: ASSET_UNDO_LIST_PENDING,
        params,
    });
    request('/api/threat/asset/undo/invests', {
        method: 'POST',
        body: JSON.stringify(params || {}),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: ASSET_UNDO_LIST_FULFILLED,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};
// 排查中列表
export const assetDoingListAction = (params) => (dispatch) => {
    dispatch({
        type: ASSET_DOING_LIST_PENDING,
        params,
    });
    request('/api/threat/asset/doing/invests', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) => {
            dispatch({
                type: ASSET_DOING_LIST_FULFILLED,
                payload: res,
            });
        })
        .catch((err) => message.error(err.message));
};

// 事件排查结果列表
export const getResultListAction = (params) => (dispatch) => {
    dispatch({
        type: GET_RESULT_LIST_PENDING,
        params,
    });
    request('/api/threat/analysis/invests', {
        method: 'POST',
        body: JSON.stringify(params || {}),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: GET_RESULT_LIST_FULFILLED,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};
// 查询研判记录
export const queryEventAction = (params) => (dispatch) => {
    request('/api/threat/analysis/event/query', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: QUERY_EVENT_ACTION,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};
