import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const middleware = [thunk];
const finalCreateStore = compose(applyMiddleware(...middleware))(createStore);

export default finalCreateStore;
