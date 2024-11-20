import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.dccconnect.com',
});

export default axiosInstance;