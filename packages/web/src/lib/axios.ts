import axios from 'axios';

import { env } from '@/config/env';

const token = localStorage.getItem('accessToken');

const api = axios.create({
  baseURL: env.API_URL,
  headers: { Authorization: token ? `Bearer ${token}` : '' },
  timeout: 1000,
});

export default api;
