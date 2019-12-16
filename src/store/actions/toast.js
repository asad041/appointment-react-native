import uuid from 'uuid';
import {SET_TOAST, REMOVE_TOAST} from './index';

export const setToast = (message, timeout = 4000) => dispatch => {
  const id = uuid.v4();

  dispatch({
    type: SET_TOAST,
    payload: {message, id},
  });

  setTimeout(() => dispatch({type: REMOVE_TOAST, payload: id}), timeout);
};
