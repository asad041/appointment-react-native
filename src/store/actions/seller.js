import _ from 'lodash';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {GET_SELLERS} from './types';
import {setToast} from './toast';
import {setBaseUrl, setAuthToken} from '../../utils/axiosConfig';

setBaseUrl();

export const getSellers = () => async dispatch => {
  try {
    if (AsyncStorage.token) {
      setAuthToken(AsyncStorage.token);
    }
    const response = await axios.get('/api/slots');
    console.log(response.data);
    dispatch({
      type: GET_SELLERS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(setToast(error.message));
  }
};
