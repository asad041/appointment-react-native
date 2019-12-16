import {combineReducers} from 'redux';
import toast from './toast';
import auth from './auth';
import seller from './seller';

export default combineReducers({
  toast,
  auth,
  seller,
});
