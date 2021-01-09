import { REGISTER_ACTION, GET_VERIFICATION_ACTION } from './action';

const initialState = {
    pending: true,
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_ACTION:
            return {
                ...state,
                pending: true,
            };
        case GET_VERIFICATION_ACTION:
            return {
                ...state,
                pending: true,
            };
        default:
            return state;
    }
};
