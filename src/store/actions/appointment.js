import _ from 'lodash';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {GET_APPOINTMENTS, ADD_APPOINTMENT} from './types';
import {setToast} from './toast';
import {setBaseUrl, setAuthToken, getToken} from '../../utils/axiosConfig';

setBaseUrl();

export const getAppointments = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      setAuthToken(token);
    }

    const response = await axios.get('/api/appointment/buyer');
    dispatch({
      type: GET_APPOINTMENTS,
      payload: response.data,
    });
  } catch (error) {
    const {data} = error.response;
    if (data && data.msg) {
      dispatch(setToast(data.msg));
    } else {
      dispatch(setToast(error.message));
    }
  }
};

export const addAppointment = values => async disptach => {
  try {
    const token = await AsyncStorage.getItem('@token');

    if (token) {
      setAuthToken(token);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(values);

    const response = await axios.post('/api/appointment/add', body, config);
    disptach({
      type: ADD_APPOINTMENT,
      payload: response.data,
    });
    disptach(setToast('Appointment request added successfully'));
  } catch (error) {
    const {data} = error.response;
    if (data && data.errors) {
      _.map(data.errors, value => {
        disptach(setToast(value.msg));
      });
    } else if (data && data.msg) {
      disptach(setToast(data.msg));
    } else {
      disptach(setToast(error.message));
    }
  }
};
