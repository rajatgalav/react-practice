import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
const middleware = applyMiddleware(logger);

const configureStoreProd = preloadedState => {
	const store = createStore(rootReducer, preloadedState, compose(middleware));

	return store;
}

const configureStoreDev = preloadedState => {
	const store = createStore(rootReducer, preloadedState, composeEnhancers(middleware));

	return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;