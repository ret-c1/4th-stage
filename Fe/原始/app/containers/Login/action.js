export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_LOGOUT_STATUS = 'SET_LOGOUT_STATUS';

// 登陆
// feature1016 新增：通过访问一个接口判断登录状态
export const loginAction = (token) => (dispatch) => {
    dispatch({
        type: SET_LOGIN_STATUS,
        token,
    });
};

// 登出
export const logoutAction = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: SET_LOGOUT_STATUS,
        });
    }, 500);
};
