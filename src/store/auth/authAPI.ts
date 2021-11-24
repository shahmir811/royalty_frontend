import axios from '../baseUrl';

import { LoginRequestType } from './authTypes';
import setAuthToken from '../utils/setAuthToken';

export const loginRequest = async (data: LoginRequestType) => {
	try {
		const res = await axios.post('auth/login', data);
		const token = res.data.access_token;
		setAuthToken(token);
		// await localStorage.setItem('token', token);

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		const response = await axios.get('auth/me', config);

		await localStorage.setItem('user', JSON.stringify(response.data.data.user));
		// await localStorage.setItem('isAuthenticated', JSON.stringify(1));

		return response.data;
	} catch (error) {
		console.log(error);
	}
};
