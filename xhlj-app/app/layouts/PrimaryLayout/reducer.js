import { setBottom, getBottom } from 'utils/authority';

const localBottom = getBottom();
const bottomState = {
    bottom: localBottom,
};

export const setBottomReducer = (state = bottomState, action) => {
    switch (action.type) {
        case 'GET_BOTTOM':
            return state;
        case 'SET_BOTTOM':
            setBottom(action.asbottom);
            return Object.assign({}, state, {
                bottom: action.asbottom,
            });
        default:
            return state;
    }
};
