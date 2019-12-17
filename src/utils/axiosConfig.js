import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const setBaseUrl = (url = 'http://localhost:5000') => {
  axios.defaults.baseURL = url;
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const setToken = async token => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch (error) {}
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('@token');
  } catch (error) {}
};

export const removeToken = async () => {
  try {
    return await AsyncStorage.getItem('@token');
  } catch (error) {}
};
