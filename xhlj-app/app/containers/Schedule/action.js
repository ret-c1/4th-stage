/**
 * [设置bottom]
 * @return {[type]} [action]
 */
export const setScheduleAction = (schedule) => (dispatch) => {
    dispatch({
        type: 'SET_SCHEDULE',
        asschedule: schedule,
    });
};

export const setMemoryTabs = (tab) => ({
    type: 'MEMORYTABS',
    tab,
});
