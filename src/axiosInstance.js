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
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('authToken'); // Replace 'authToken' with your token's key
    if (token) {
      // Add the token to the Authorization header
      request.headers.Authorization = `Bearer ${token}`;
    }
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
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
