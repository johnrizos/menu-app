import axios from 'axios';

// check if is local or production
const isLocal = window.location.hostname === 'localhost';
const isTest = window.location.hostname === '192.168.1.72';
export const backendURL = isLocal ? 'http://localhost:8000' : 'https://api.favour.gr';
let baseURL = isLocal ? 'http://localhost:8000/api/v1/customers/shops/1' : 'https://api.favour.gr/api/v1/customers/shops/1';
if (isTest) {
    // console.log('isTest');
    baseURL = "http://192.168.1.72:8000/api/v1/customers/shops/1";
}
const api = axios.create({
    baseURL: baseURL,
});

export default api;
