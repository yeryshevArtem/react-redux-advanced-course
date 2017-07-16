import { combineReducers } from 'redux';
import commentsReducers from './comments';

const rootReducer = combineReducers({
  comments: commentsReducers
});

export default rootReducer;
