import { combineReducers } from 'redux';

import { loggedUserReducer } from '../containers/LoginPage/reducer';
import { setBottomReducer } from '../layouts/PrimaryLayout/reducer';
import { setScheduleReducer } from '../containers/Schedule/reducer';
import {
    setTokenReducer,
    setRoleReducer,
    setSignTypeReducer,
    setCodeStringReducer,
    setUserIdReducer,
    setHotelIdReducer,
} from '../containers/CheckIn/reducer';
import { setNewsTabReducer } from '../containers/News/reducer';

export default combineReducers({
    loggedUserReducer,
    setBottomReducer,
    setScheduleReducer,
    setTokenReducer,
    setRoleReducer,
    setSignTypeReducer,
    setCodeStringReducer,
    setUserIdReducer,
    setHotelIdReducer,
    setNewsTabReducer,
});
