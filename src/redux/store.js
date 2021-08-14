import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './saga';
import rootReducer from './reducers';
import configAxios from '../api/config';

// axios middleware
const createAxiosMiddleware = (axios) => () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
  return (next) => (action) => next(action);
};

// Build app middleware
const sagaMiddleware = createSagaMiddleware();
const axiosMiddleware = createAxiosMiddleware(configAxios);

const bindMiddleware = (middleware) => {
  if (process?.env?.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reduxCompose = compose(bindMiddleware([sagaMiddleware, axiosMiddleware]));

// Build app store
const appStore = createStore(rootReducer, reduxCompose);

// Run saga middleware
sagaMiddleware.run(rootSaga);

export default appStore;
