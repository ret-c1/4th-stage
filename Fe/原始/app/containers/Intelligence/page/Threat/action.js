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

// 保存planId, threatId
export const saveIdAction = (payload) => (dispatch) => {
    dispatch({
        type: types.SAVE_ID_ACTION,
        payload,
    });
};

// 页面步骤的跳转
export const gotoStepAction = (payload) => (dispatch) => {
    dispatch({
        type: types.GOTO_STEP_ACTION,
        payload,
    });
};

// 隐患资产获取已选择的资产IP
export const getChoosePropertyAction = (payload) => (dispatch) => {
    dispatch({
        type: types.GET_CHOOSE_PROPERTY_ACTION,
        payload,
    });
};
// 隐患资产清空已选择的资产IP
export const clearPropertyAction = (payload) => (dispatch) => {
    dispatch({
        type: types.CLEAR_PROPERTY_ACTION,
        payload,
    });
};
// 告警事件获取已选择的资产IP
export const getChooseWarningPropertyAction = (payload) => (dispatch) => {
    dispatch({
        type: types.GET_CHOOSE_WARNING_PROPERTY_ACTION,
        payload,
    });
};
// 告警事件清空已选择的资产IP
export const clearWarningPropertyAction = (payload) => (dispatch) => {
    dispatch({
        type: types.CLEAR_WARNING_PROPERTY_ACTION,
        payload,
    });
};

// 获取隐患资产列表
export const situationAction = (params) => (dispatch) => {
    dispatch({
        type: types.GET_SITUATION_PENDING,
        params,
    });
    request('/api/threat/troubleAsset/analysis/situation', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) => {
            dispatch({
                type: types.GET_SITUATION_FULFILLED,
                payload: res,
            });
        })
        .catch((err) => message.error(err.message));
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

// 查看资产详情modal
export const changePropertyModalAction = () => (dispatch) => {
    dispatch({
        type: types.CHANGE_PROPERTY_MODAL_ACTION,
    });
};
export const checkPropertyDetailAction = (id) => (dispatch) => {
    request('/api/asset/ip/query', {
        method: 'POST',
        body: JSON.stringify(id),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: types.CHECK_PROPERTY_DETAIL_FULFILLED,
                payload: res,
            }),
        )
        .catch(() => dispatch(changePropertyModalAction()));
};

// 获取告警记录列表
export const getWarningListAction = (params) => (dispatch) => {
    dispatch({
        type: types.GET_WARNING_LIST_PENDING,
        params,
    });
    request('/api/threat/analysis/warns', {
        method: 'POST',
        body: JSON.stringify(params || {}),
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

// 获取日志记录列表
export const getLogListAction = (params) => (dispatch) => {
    dispatch({
        type: types.GET_LOG_LIST_PENDING,
        params,
    });
    request('/api/threat/analysis/logs', {
        method: 'POST',
        body: JSON.stringify(params || {}),
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

// 获取研判事件列表
export const getEventListAction = (params) => (dispatch) => {
    dispatch({
        type: types.GET_EVENT_LIST_PENDING,
        params,
    });
    request('/api/threat/analysis/events', {
        method: 'POST',
        body: JSON.stringify(params || {}),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) =>
            dispatch({
                type: types.GET_EVENT_LIST_FULFILLED,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};

// 事件排查结果列表
export const getResultListAction = (params) => (dispatch) => {
    dispatch({
        type: types.GET_RESULT_LIST_PENDING,
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
                type: types.GET_RESULT_LIST_FULFILLED,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};
// 新增/编辑告警分析
export const addWarningAction = (params) => (dispatch) => {
    request(
        params && params.id ? '/api/threat/analysis/warn/update' : '/api/threat/analysis/warn/add',
        {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json',
            },
        },
    )
        .then(() => {
            dispatch(getWarningListAction({}));
            dispatch(situationAction({ planId: params.planId, threatId: params.threatId }));
        })
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
        .then(() => {
            dispatch(getLogListAction({}));
            dispatch(situationAction({ planId: params.planId, threatId: params.threatId }));
        })
        .catch((err) => message.error(err));
};
// 新增/编辑事件分析
export const addEventAction = (params) => (dispatch) => {
    request(params.id ? '/api/threat/analysis/event/update' : '/api/threat/analysis/event/add', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(() => {
            dispatch(getEventListAction({}));
            dispatch(situationAction({ planId: params.planId, threatId: params.threatId }));
        })
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
                type: types.QUERY_EVENT_ACTION,
                payload: res,
            }),
        )
        .catch((err) => message.error(err));
};
