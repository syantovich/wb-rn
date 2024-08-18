import axios from 'axios';
import {Platform} from 'react-native';
import authService from '../services/AuthService';

const BASE_URL = 'http://10.0.2.2:3000/api/v1';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    os: Platform.OS,
  },
});

instance.interceptors.request.use(async config => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
