import {combineReducers} from 'redux';
import toast from './toast';
import auth from './auth';

export default combineReducers({
  toast,
  auth,
});
