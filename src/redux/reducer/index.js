import { combineReducers } from 'redux';
import soldiers from './soldiers';
// import redirect from './redirect';
// import searchInput from './searchInput';
// import status from './status';

const reducers = combineReducers({
  soldiers,
  // redirect,
  // searchInput,
  // status,
});

export default reducers;