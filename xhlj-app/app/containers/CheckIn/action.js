/**
 * [设置token]
 * @return {[type]} [action]
 */
export const setTokenAction = (token) => (dispatch) => {
    dispatch({
        type: 'SET_TOKEN',
        astoken: token,
    });
};

/**
 * [用户角色role]
 * @return {[type]} [action]
 */
export const setRoleAction = (role) => (dispatch) => {
    dispatch({
        type: 'SET_ROLE',
        asrole: role,
    });
};

/**
 * [会议签到类型SignType]
 * @return {[type]} [action]
 */
export const setSignTypeAction = (signType) => (dispatch) => {
    dispatch({
        type: 'SET_SIGNTYPE',
        assignType: signType,
    });
};

/**
 * [二维码字符]
 * @return {[type]} [action]
 */
export const setCodeStringAction = (codeString) => (dispatch) => {
    dispatch({
        type: 'SET_CODESTRING',
        ascodeString: codeString,
    });
};

/**
 * [用户id]
 * @return {[type]} [action]
 */
export const setUserIdAction = (userId) => (dispatch) => {
    dispatch({
        type: 'SET_USERID',
        asuserid: userId,
    });
};

/**
 * [酒店id]
 * @return {[type]} [action]
 */
export const setHotelIdAction = (hotelId) => (dispatch) => {
    dispatch({
        type: 'SET_HOTELID',
        ashotelId: hotelId,
    });
};
