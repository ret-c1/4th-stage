/**
 * [设置bottom]
 * @return {[type]} [action]
 */
export const setBottomAction = (bottom) => (dispatch) => {
    dispatch({
        type: 'SET_BOTTOM',
        asbottom: bottom,
    });
};
