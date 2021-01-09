import { SET_GLOBAL_CONFIG } from './action';

const initialState = {
    useinfo: {},
    role: [],
    menu: [],
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GLOBAL_CONFIG:
            return {
                ...state,
                useinfo: action.payload.user || {},
                role: action.payload.role || [],
                menu: action.payload.permission || [],
            };
        default:
            return state;
    }
};
