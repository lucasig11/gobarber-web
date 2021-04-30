import axios from 'axios';

const api = axios.create({
	baseURL: 'http://172.22.54.245:3333',
});

export default api;
