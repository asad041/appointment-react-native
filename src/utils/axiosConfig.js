import axios from 'axios';

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
