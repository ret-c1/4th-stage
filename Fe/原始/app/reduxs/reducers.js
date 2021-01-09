import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '@utils/history';
import { globalReducer } from '@layouts/Main/reducer';
import { loginReducer } from '@containers/Login/reducer';
import { projectReducer } from '@containers/ProjectManager/reducer';
import { intelligenceReducer } from '@containers/Intelligence/reducer';
import { threatReducer } from '@containers/Intelligence/page/Threat/reducer';
import { analysisReducer } from '@containers/AnalysisManager/reducer';
import { happeningReducer } from '@containers/IncidentManager/reducer';

const createRootReducer = (injectedReducers = {}) => {
    const rootReducer = combineReducers({
        router: connectRouter(history),
        global: globalReducer,
        login: loginReducer,
        project: projectReducer,
        intelligence: intelligenceReducer,
        threat: threatReducer,
        analysis: analysisReducer,
        happening: happeningReducer,
        ...injectedReducers,
    });
    return rootReducer;
};

export default createRootReducer;
