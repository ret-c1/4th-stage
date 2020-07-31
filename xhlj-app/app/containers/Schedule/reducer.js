import { getSchedule, setSchedule } from 'utils/authority';
const localSchedule = getSchedule();
const scheduleState = {
    schedule: localSchedule,
    tab: 0,
};

export const setScheduleReducer = (state = scheduleState, action) => {
    switch (action.type) {
        case 'GET_SCHEDULE':
            return state;
        case 'SET_SCHEDULE':
            setSchedule(action.asschedule);
            return Object.assign({}, state, {
                schedule: action.asschedule,
            });
        case 'MEMORYTABS':
            return Object.assign({}, state, {
                tab: action.tab,
            });
        default:
            return state;
    }
};
