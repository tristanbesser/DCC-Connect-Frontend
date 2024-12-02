import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:32770',
    withCredentials: true
});

export default axiosInstance;