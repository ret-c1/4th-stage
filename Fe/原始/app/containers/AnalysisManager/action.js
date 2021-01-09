import request from '@utils/request';
import { message } from 'antd';
import * as types from './const';
// 记录准备提交时间
export const recordReadyTimeAction = (payload) => (dispatch) => {
    dispatch({
        type: types.RECORD_READY_TIME,
        payload,
    });
};
// 获取已选择的资产IP
export const getChoosePropertyAction = (payload) => (dispatch) => {
    dispatch({
        type: types.GET_CHOOSE_PROPERTY_ACTION,
        payload,
    });
};
// 清空已选择的资产IP
export const clearPropertyAction = (payload) => (dispatch) => {
    dispatch({
        type: types.CLEAR_PROPERTY_ACTION,
        payload,
    });
};

// 告警事件选择记录
export const warningEventAction = (params) => (dispatch) => {
    dispatch({
        type: types.GET_WARNING_EVENT_PENDING,
        params,
    });
    request('/api/threat/warnEvents', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: types.GET_WARNING_EVENT_FULFILLED,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};

// 获取告警记录列表
export const getWarningListAction = (planId) => (dispatch) => {
    dispatch({
        type: types.GET_WARNING_LIST_PENDING,
        params: planId,
    });
    request('/api/threat/analysis/warns', {
        method: 'POST',
        body: JSON.stringify(planId || {}),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: types.GET_WARNING_LIST_FULFILLED,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};

// 新增/编辑告警分析
export const addWarningAction = (params) => (dispatch) => {
    request(params.id ? '/api/threat/analysis/warn/update' : '/api/threat/analysis/warn/add', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(() => dispatch(getWarningListAction({})))
        .catch((err) => message.error(err));
};

// 查询告警分析记录
export const queryWarningAction = (params) => (dispatch) => {
    request('/api/threat/analysis/warn', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: types.QUERY_WARNING_ACTION,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};

// 获取日志记录列表
export const getLogListAction = (planId) => (dispatch) => {
    dispatch({
        type: types.GET_LOG_LIST_PENDING,
        params: planId,
    });
    request('/api/threat/analysis/logs', {
        method: 'POST',
        body: JSON.stringify(planId || {}),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: types.GET_LOG_LIST_FULFILLED,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};

// 新增/编辑日志分析
export const addLogAction = (params) => (dispatch) => {
    request(params.id ? '/api/threat/analysis/log/update' : '/api/threat/analysis/log/add', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(() => dispatch(getLogListAction({})))
        .catch((err) => message.error(err));
};

// 查询日志分析记录
export const queryLogAction = (params) => (dispatch) => {
    request('/api/threat/analysis/log', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: types.QUERY_LOG_ACTION,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};
// 项目名称
export const getProjectAction = (params) => (dispatch) => {
    request('/api/project/view', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: types.GET_PROJECT_ACTION,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};
