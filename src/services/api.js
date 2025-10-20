import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://www.vectoria.me/api',
  withCredentials: true,
});

export default apiClient;