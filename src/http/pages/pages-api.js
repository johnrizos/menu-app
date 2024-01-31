import api from '../api';

const resource = '/pages';
console.log("api", api);

const allPages = () => api.get(resource);

export default allPages;
