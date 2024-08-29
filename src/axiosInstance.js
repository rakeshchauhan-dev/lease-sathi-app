// src/axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config'; // Adjust the path as necessary

const axiosInstance = axios.create({
  baseURL: config.API_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (request) => {
    // You can add headers, logs, or modify the request here
    console.log('Request:', request);
    return request;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can log or modify the response here
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
