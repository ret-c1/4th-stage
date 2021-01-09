import { SET_LOGIN_STATUS, SET_LOGOUT_STATUS } from './action';

const initialState = {
    pending: true,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return { ...state, pending: true };
        case SET_LOGOUT_STATUS:
            return { ...state, pending: true };
        default:
            return state;
    }
};
