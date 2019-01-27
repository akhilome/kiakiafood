import axios from 'axios';
import { getToken } from '../utils/localStorage';

const instance = axios.create({
  baseURL: 'https://kiakiafood.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const configInstance = { ...config };
  configInstance.headers['x-auth'] = getToken();
  return configInstance;
});

export default instance;
