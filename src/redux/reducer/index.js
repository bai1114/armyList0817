import { combineReducers } from 'redux';
import soldiers from './soldiers';
import directSubs from './directSubs';
import searchInput from './searchInput';
import image from './image';
import directSup from './directSup';
import redirect from './redirect';



const reducers = combineReducers({
  soldiers,
  image,
  directSubs,
  directSup,
  searchInput,
  redirect,
});

export default reducers;