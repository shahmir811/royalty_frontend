import axios from '../baseUrl';

const setAuthToken = (token?: string) => {
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		localStorage.setItem('token', token);
	} else {
		delete axios.defaults.headers.common['Authorization'];
		localStorage.removeItem('token');
	}
};

export default setAuthToken;
