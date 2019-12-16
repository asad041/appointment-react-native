import _ from 'lodash';
import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
} from './types';
import {setToast} from './toast';

export const loadUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/auth');
    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = values => async disptach => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(values);

    const response = await axios.post('/api/users', body, config);
    disptach({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    disptach({
      type: REGISTER_FAIL,
    });
  }
};

export const login = values => async disptach => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(values);

    const response = await axios.post('/api/auth', body, config);
    disptach({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    disptach(setToast(error.message));
  }
};

export const logout = () => dispatch => {
  //   dispatch({ type: RESET_APPOINTMENTS });
  dispatch({type: LOGOUT});
};
