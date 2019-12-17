import {combineReducers} from 'redux';
import toast from './toast';
import auth from './auth';
import seller from './seller';
import appointment from './appointment';

export default combineReducers({
  toast,
  auth,
  seller,
  appointment,
});
