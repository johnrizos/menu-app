import axios from 'axios';

// check if is local or production
const isLocal = window.location.hostname === 'localhost';
const baseURL = isLocal ? 'http://localhost:8000/api/v1/shops/1' : 'https://https://api.favour.gr/v1/shops/1';
const api = axios.create({
    baseURL: baseURL,
});

export default api;
