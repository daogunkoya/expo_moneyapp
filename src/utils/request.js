import { Alert } from 'react-native';
import axios from 'axios';
import { api_url } from './env';
import * as SecureStore from 'expo-secure-store';
import camelize from 'camelize';

const API_URL = api_url;
const STORE_ID = '2bda0c37-4eac-44e5-a014-6c029d76dc62';
const instance = axios.create({
  baseURL: API_URL || '/',
  timeout: 20000,
});

instance.interceptors.request.use(
  async config => {
    try {
      const token = await SecureStore.getItemAsync('ACCESSTOKEN');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }

    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Access-Control-Allow-Origin'] = '*';
    ////config.headers['authorization'] = `Bearer ${token}`;
    config.headers.Accept = 'application/json';

     // Add store_id to all requests as a query parameter
     config.params = config.params || {};
     config.params.process_store_id = STORE_ID;

     //console.log('Axios Request Config:', JSON.stringify(config, null, 2)); // Log config

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  res => {
    const { data, status } = res;

   // console.log('Axios Response Data:', JSON.stringify(data, null, 2)); 
   //console.log('Axios Response Status:', status);

    if (status === undefined) {
      return Promise.reject(new Error(''));
    }
    return camelize(data);
  },
  error => {
    const { data, status } = error?.response || {};
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      if (data?.message) {
        Alert.alert('Error', data.message);
      } else {
        Alert.alert('Error', error.message);
      }
    }

    switch (status) {
      case 404:
        if (data?.error === 'DUPLICATE_ENTRY') {
          Alert.alert('Warning', 'Duplicate entry found. Please check your payload.');
          return Promise.reject(new Error(data.message || 'Error'));
        }
        return Promise.reject(new Error(data.message || 'Error'));
      case 422:
          // Normalize the data structure
          const errorData = data?.errors || data?.data?.errors;

          if (!errorData) {
              Alert.alert('Unprocessable Entity', 'An unknown error occurred.');
              return Promise.reject(new Error('Unprocessable Entity'));
          }

          // Flatten error messages and join with newlines
          const errorMessage = Object.values(errorData)
              .flat() // Flatten nested arrays
              .join('\n'); // Combine into a single string

          Alert.alert('Unprocessable Entity', errorMessage);
          return Promise.reject(new Error(errorMessage));

        // const errorMessage = [].concat(...Object.values(data.errors)).join('\n');
        // Alert.alert('Unprocessable Entity', errorMessage);
        // return Promise.reject(new Error(errorMessage || 'Unprocessable Entity'));
      case 401:
        Alert.alert('Unauthorized', 'Session expired. Please log in again.');
        // Handle logout or session expiration logic here
        return data;
      case 400:
        console.log('400 error mes', data['errors']);
        Alert.alert('Bad Request', data.errors || 'Bad request');
        return Promise.reject(new Error(data.errors || 'Bad Request'));
      default:
        if (error) {
          Alert.alert('Error', error.message);
          return Promise.reject(error);
        }
        return data;
    }
  }
);

const serializeParams = (obj, prefix) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? `${prefix}[${p}]` : p;
      if (obj[p] !== undefined && obj[p] !== null) {
        const v = obj[p];
        str.push((v !== null && typeof v === 'object') ?
          serializeParams(v, k) :
          `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
      }
    }
  }
  return str.join('&');
};

const service = {
  get: (url, params) => instance.get(`${url}?${serializeParams(params)}`),
  post: (url, params, options) => instance.post(url, params, options),
  put: (url, params) => instance.put(url, params),
  delete: (url, params) => instance.delete(url, { params }),
  head: (url, params) => instance.head(url, { params }),
  options: (url, params) => instance.options(url, { params }),
  patch: (url, params) => instance.patch(url, params),
};

export default service;
