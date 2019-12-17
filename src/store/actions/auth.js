import _ from 'lodash';
import axios from 'axios';
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
} from './types';
import {setToast} from './toast';
import {setBaseUrl} from '../../utils/axiosConfig';

setBaseUrl();

export const loadUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/auth');
    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
  } catch (error) {
    const {data} = error.response;
    if (data.msg) {
      dispatch(setToast(data.msg));
    } else {
      dispatch(setToast(error.message));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerUser = values => async disptach => {
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
    const {data} = error.response;
    if (data && data.errors) {
      _.map(data.errors, value => {
        disptach(setToast(value.msg));
      });
    } else {
      disptach(setToast(error.message));
    }
  }
};

export const loginUser = values => async disptach => {
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
    const {data} = error.response;
    if (data && data.msg) {
      disptach(setToast(data.msg));
    } else {
      disptach(setToast(error.message));
    }
  }
};

export const logout = () => dispatch => {
  //   dispatch({ type: RESET_APPOINTMENTS });
  dispatch({type: LOGOUT});
};
