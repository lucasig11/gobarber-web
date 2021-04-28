import axios from 'axios';

const api = axios.create({
	baseURL: 'http://172.28.107.183:3333',
});

export default api;
