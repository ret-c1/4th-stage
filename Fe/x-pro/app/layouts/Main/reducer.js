import { SET_GLOBAL_CONFIG, SET_GLOBAL_ROUTETREE } from './action';

const initialState = {
    useinfo: {},
    role: [],
    menu: [],
    routes: [],
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
        case SET_GLOBAL_ROUTETREE:
            return {
                ...state,
                routes: action.payload.routes || [],
            };
        default:
            return state;
    }
};
