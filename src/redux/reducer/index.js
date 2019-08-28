import { combineReducers } from 'redux';
import soldiers from './soldiers';
import directSubs from './directSubs';
// import searchInput from './searchInput';
import image from './image';
import directSup from './directSup';


const reducers = combineReducers({
  soldiers,
  image,
  directSubs,
  directSup,
  // searchInput,
});

export default reducers;