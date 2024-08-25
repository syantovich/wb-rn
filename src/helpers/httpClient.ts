import axios from 'axios';
import i18n from 'i18next';
import {Platform} from 'react-native';

import {userStore} from '../store';
import {IAuthResponse} from '../types/auth';

const BASE_URL = 'http://10.0.2.2:3000/api/v1';

const t = i18n.t.bind(i18n);
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
  const token = userStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = userStore.getRefreshToken();
        const response = await axios.post<IAuthResponse>(
          `${BASE_URL}/auth/refresh`,
          {
            token: refreshToken,
          },
        );
        const userInfo = response.data;
        userStore.setAllUserInfo(userInfo);
        originalRequest.headers.Authorization = `Bearer ${userInfo.token}`;
        return instance(originalRequest);
      } catch (refreshError) {
        await userStore.logout(t);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
