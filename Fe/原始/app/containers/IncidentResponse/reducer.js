import { SET_TABEL_CHECKED, SET_TABEL_ALLCHECKED } from './action';

const initialState = {
    checked: [],
};

export const asstesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABEL_CHECKED:
            return { ...state, checked: action.payload };
        case SET_TABEL_ALLCHECKED:
            return { ...state, checked: action.payload };
        default:
            return state;
    }
};
