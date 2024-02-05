import api from '../api';

const resource = '/pages';

const allPages = () => api.get(resource);

export default allPages;
