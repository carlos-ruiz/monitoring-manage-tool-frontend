import axios from 'axios';

const axios_instance = axios.create({
  baseURL: 'http://172.16.5.171:8000/api/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axios_instance;
