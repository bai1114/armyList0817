import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducer';
import thunk from 'redux-thunk';
//import logger from './logger';

// const logger = store => next => action => {
//   console.log('previous state', store.getState());
//   console.log('dispatching', action);
//   next(action);
//   console.log('next state', store.getState());
// };
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// const store = createStore(
//   reducers, 
//   applyMiddleware(logger, thunk),
//   //composeEnhancers(applyMiddleware(thunk))
// );

const store = createStore(
  reducers, 
  applyMiddleware(thunk)
);


export default store;