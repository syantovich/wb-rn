import axios from 'axios';
import {Platform} from 'react-native';

const BASE_URL = 'http://10.0.2.2:3000/api/v1';
console.log(BASE_URL);
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    os: Platform.OS,
  },
});

export default instance;
