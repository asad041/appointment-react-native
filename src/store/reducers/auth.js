import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL} from '../actions';
import {setToken, removeToken} from '../../utils/axiosConfig';

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      setToken(payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      removeToken();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};
