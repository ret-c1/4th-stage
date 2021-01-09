import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

export default function configureStore(preloadedState, history) {
    const composeEnhancers = compose;
    const middlewares = [routerMiddleware(history), thunk];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        composeEnhancers(...enhancers),
    );
    return store;
}
