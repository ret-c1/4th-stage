// import request from '@utils/request';
// import { message } from 'antd';
import * as types from './const';

// 记录准备提交时间
export const recordReadyTimeAction = (payload) => (dispatch) => {
    dispatch({
        type: types.RECORD_READY_TIME,
        payload,
    });
};

// 事件排查结果列表
export const getResultListAction = (planId) => (dispatch) => {
    dispatch({
        type: types.GET_RESULT_LIST_PENDING,
        params: planId,
    });
};

// 获取告警记录列表
export const getWarningListAction = (planId) => (dispatch) => {
    dispatch({
        type: types.GET_WARNING_LIST_PENDING,
        params: planId,
    });
};

// 获取日志记录列表
export const getLogListAction = (planId) => (dispatch) => {
    dispatch({
        type: types.GET_LOG_LIST_PENDING,
        params: planId,
    });
};

// 获取研判事件列表
export const getEventListAction = (planId) => (dispatch) => {
    dispatch({
        type: types.GET_EVENT_LIST_PENDING,
        params: planId,
    });
};

// 新增/编辑告警分析
export const addWarningAction = () => () => {};

// 新增/编辑日志分析
export const addLogAction = () => () => {};
// 新增/编辑事件分析
export const addEventAction = () => () => {};

// 查询告警分析记录
export const queryWarningAction = () => () => {};

// 查询日志分析记录
export const queryLogAction = () => () => {};

// 查询研判记录
export const queryEventAction = () => () => {};
// 项目名称
export const getProjectAction = () => () => {};
