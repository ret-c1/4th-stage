export const REGISTER_ACTION = 'REGISTER_ACTION';
export const GET_VERIFICATION_ACTION = 'GET_VERIFICATION_ACTION';

export const registerAction = () => (dispatch) => {
    dispatch({
        type: REGISTER_ACTION,
    });
};
export const getVerificationAction = () => (dispatch) => {
    dispatch({
        type: GET_VERIFICATION_ACTION,
    });
};
