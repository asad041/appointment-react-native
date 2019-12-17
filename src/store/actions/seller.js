import _ from 'lodash';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GET_SELLERS,
  GET_SELLER,
  SELLER_LOADING,
  NOT_FOUND_SELLER,
} from './types';
import {setToast} from './toast';
import {setBaseUrl, setAuthToken, getToken} from '../../utils/axiosConfig';

setBaseUrl();

export const getSellers = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      setAuthToken(token);
    }
    const response = await axios.get('/api/slots');
    dispatch({
      type: GET_SELLERS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(setToast(error.message));
  }
};

export const getSeller = id => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      setAuthToken(token);
    }

    const response = await axios.get(`/api/slots/user/${id}`);
    dispatch({
      type: GET_SELLER,
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
      type: NOT_FOUND_SELLER,
    });
  }
};

export const setSellerLoading = (flag = true) => dispatch => {
  dispatch({
    type: SELLER_LOADING,
    payload: flag,
  });
};
