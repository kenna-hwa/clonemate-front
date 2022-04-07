import axios from 'axios';

const API = axios.create({
	BASE_URL: '',
    headers: {
      	'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default API;