import { combineReducers } from 'redux';
import { CategoryReducer } from './CategoryReducer';
import { PostReducer } from './PostReducer';
import { CommentReducer } from './CommentReducer';

export default combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  comments: CommentReducer
});
