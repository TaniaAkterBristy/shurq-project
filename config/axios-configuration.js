import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // Save token to local storage
    localStorage.setItem('token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const axiosBaseUrl = () => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://shurq.co/':  'https://shurq.co/';
  return axios;
};

export {
  setAuthToken,
  axiosBaseUrl
};
