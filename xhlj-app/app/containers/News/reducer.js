const tabState = {
    tab: 0,
};

export const setNewsTabReducer = (state = tabState, action) => {
    switch (action.type) {
        case 'NEWS_TABS':
            return Object.assign({}, state, {
                tab: action.tab,
            });
        default:
            return state;
    }
};
