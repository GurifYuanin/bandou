import axios from 'axios';

const request = axios.create({
  timeout: 3000,
  baseURL: 'http://www.isempty.site/index.php/bandou/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default request;
