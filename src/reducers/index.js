import { combineReducers } from 'redux';
import AdminReducer from './admin';
import AdminTemplate from './admin_template';
import UserReducer from './user';

export default combineReducers({
  AdminReducer, AdminTemplate, UserReducer
});
