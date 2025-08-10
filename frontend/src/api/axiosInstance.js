import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.PUBLIC_BACKEND_URL}`, // Flask backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
