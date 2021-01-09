export const SET_GLOBAL_CONFIG = 'SET_GLOBAL_CONFIG'; // 用户信息
export const SET_GLOBAL_ROUTETREE = 'SET_GLOBAL_ROUTETREE'; // 记录routerTree

// 用户信息
export const setGlobalConfigAction = (payload) => ({
    type: SET_GLOBAL_CONFIG,
    payload,
});
// 路由
export const setGlobalRouteTree = (payload) => ({
    type: SET_GLOBAL_ROUTETREE,
    payload,
});
