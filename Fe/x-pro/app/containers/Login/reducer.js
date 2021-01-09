import { authAction, authStateAction } from '@utils/authority';
import { SET_LOGIN_STATUS, SET_LOGOUT_STATUS } from './action';

const authority = true;
const initialState = {
    isAuthenticated: authority,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            authAction.set(action.token);
            authStateAction.set('true');
            return {
                ...state,
                pending: true,
                isAuthenticated: 'true',
            };
        case SET_LOGOUT_STATUS:
            authStateAction.remove();
            authAction.remove();
            return {
                ...state,
                isAuthenticated: 'false',
            };
        default:
            return state;
    }
};
