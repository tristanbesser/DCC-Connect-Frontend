import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:32792/',
    withCredentials: true
});

export default axiosInstance;