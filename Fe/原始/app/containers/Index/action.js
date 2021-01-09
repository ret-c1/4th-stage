export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_LOGOUT_STATUS = 'SET_LOGOUT_STATUS';

// 登陆
export const loginAction = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: SET_LOGIN_STATUS,
        });
    }, 500);
};

// 登出
export const logoutAction = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: SET_LOGOUT_STATUS,
        });
    }, 500);
};
