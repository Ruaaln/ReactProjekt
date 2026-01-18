import axios from 'axios';

const adminClient = axios.create({
  baseURL: 'http://localhost:5000'
});

adminClient.interceptors.request.use((config) => {
  const password = localStorage.getItem('admin-password');
  if (password) {
    config.headers['admin-password'] = password;
  }
  return config;
});

export default adminClient;
