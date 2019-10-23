import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { get, includes } from 'lodash';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from './reducers/index';

const client = axios.create({ // all axios can be used, shown in axios documentation
	options: {
	  responseType: 'json',
	}
});

const axiosMiddlewareConfig = {
	interceptors: {
	  response: [
		{
		  success: (...rest) => {
			setTimeout(() => {
			  localStorage.setItem('activeSession', false);
			}, 1000);
			return rest[1].data;
		  },
		},
	  ]
	},
	onError: async ({
	  dispatch, action, error, next
	}) => {
	  setTimeout(() => {
		localStorage.setItem('activeSession', false);
	  }, 1000);
	  let errorObj;
	  if (error.request && error.request.responseType === 'blob') {
		const resText = await new Promise((resolve) => {
		  const reader = new FileReader();
		  reader.addEventListener('loadend', () => {
			resolve(reader.result);
		  });
		  reader.readAsText(error.response.data);
		});
		error.response.data = JSON.parse(resText);
	  }
	  const status = get(error.response, 'status', 400);
	  if (status === 401 || status === 403) {
		dispatch({ type: LOGOUT_SUCESSFUL });
		errorObj = {
		  status,
		  data: getErrorObject(get(error, 'response.data', 'Something went wrong')),
		};
	  } else if (status === 503 || status === 504) {
		errorObj = {
		  status,
		  data: getErrorObject('The server appears to be temporarily unavailable. Please try after some time.'),
		};
	  } else {
		errorObj = {
		  status,
		  data: get(error, 'response.data', getErrorObject('The system encountered an unexpected error. Please try again.')),
		};
	  }
	  if (errorObj.data && includes(errorObj.data.message, '<title>HTTP Status 401 – Unauthorized</title>')) {
		errorObj.data = getErrorObject('Session expired! Please login again.');
	  }
	  const nextAction = {
		error: errorObj,
		meta: {
		  previousAction: action,
		},
	  };
	  if (action.types && action.types.length === 3) {
		nextAction.type = action.types[2];
	  } else {
		nextAction.type = `${action.type}_FAIL`;
	  }
	  next(nextAction);
	  return nextAction;
	}
};

const middlewares = [
	// Add other middleware on this line...
  
	// thunk middleware can also accept an extra argument to be passed to each thunk action
	// https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
	axiosMiddleware(client, axiosMiddlewareConfig),
];

const configureStoreProd = initialState => {
	const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));

	return store;
}

const configureStoreDev = initialState => {
	const devMiddlewares = [
		// Redux middleware spits an error on you when you try to mutate ur state either inside a dispatch or between dispatches
		reduxImmutableStateInvariant(),
		...middlewares
	];
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
	const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...devMiddlewares, logger)));

	return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;