import { Alert } from 'react-native';
import { api_url } from './env';
import * as SecureStore from 'expo-secure-store';
import camelize from 'camelize';

const API_URL = '';

const serializeParams = (obj, prefix) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? `${prefix}[${p}]` : p;
      if (obj[p] !== undefined && obj[p] !== null) {
        const v = obj[p];
        str.push(
          v !== null && typeof v === 'object'
            ? serializeParams(v, k)
            : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        );
      }
    }
  }
  return str.join('&');
};

const fetchWithToken = async (url, options = {}) => {
  try {
    const token = await SecureStore.getItemAsync('ACCESSTOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${token}`,
      Accept: 'application/json',
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const { status } = response;

      switch (status) {
        case 404:
          if (errorData?.error === 'DUPLICATE_ENTRY') {
            Alert.alert('Warning', 'Duplicate entry found. Please check your payload.');
          }
          throw new Error(errorData?.message || 'Not Found');
        case 422:
          const errorMessage = [].concat(...Object.values(errorData.errors)).join('\n');
          Alert.alert('Unprocessable Entity', errorMessage);
          throw new Error(errorMessage || 'Unprocessable Entity');
        case 401:
          Alert.alert('Unauthorized', 'Session expired. Please log in again.');
          // Handle logout or session expiration logic here
          throw new Error('Unauthorized');
        case 400:
          Alert.alert('Bad Request', errorData?.errors || 'Bad request');
          throw new Error(errorData?.errors || 'Bad Request');
        default:
          Alert.alert('Error', response.statusText || 'Something went wrong');
          throw new Error(response.statusText || 'Something went wrong');
      }
    }

    const data = await response.json();
    return camelize(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    Alert.alert('Error', error.message);
    throw error;
  }
};

const service = {
  get: (url, params) => {
    const queryString = serializeParams(params);
    return fetchWithToken(`${API_URL}${url}?${queryString}`, {
      method: 'GET',
    });
  },
  post: (url, params, options) =>
    fetchWithToken(`${API_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(params),
      ...options,
    }),
  put: (url, params) =>
    fetchWithToken(`${API_URL}${url}`, {
      method: 'PUT',
      body: JSON.stringify(params),
    }),
  delete: (url, params) =>
    fetchWithToken(`${API_URL}${url}`, {
      method: 'DELETE',
      body: JSON.stringify(params),
    }),
  patch: (url, params) =>
    fetchWithToken(`${API_URL}${url}`, {
      method: 'PATCH',
      body: JSON.stringify(params),
    }),
};

export default service;
