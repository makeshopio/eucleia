import { combineReducers } from 'redux';
import users from './modules/users';
import user from './modules/user';

export default combineReducers({
  users,
  user
});
