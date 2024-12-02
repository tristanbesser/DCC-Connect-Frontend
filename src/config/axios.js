import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.dccconnect.com',
    withCredentials: true
});

export default axiosInstance;