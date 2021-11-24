import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

import './App.scss';
import { useAppDispatch } from 'app/hooks';
import { setUser } from 'store/auth/authSlice';

import Header from './components/shared/Header/Header.component';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute.component';

import NotFound from 'pages/NotFound/NotFound.page';
import setAuthToken from 'store/utils/setAuthToken';
import { Spinner } from 'react-bootstrap';

const LandingPage = lazy(() => import('./pages/Landing/Landing.page'));
const LoginPage = lazy(() => import('./pages/Login/Login.page'));
const HomePage = lazy(() => import('pages/Home/Home.page'));

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const checkUserLogin = () => {
			const loggedInUser = localStorage.getItem('user');
			const token = localStorage.getItem('token');
			if (loggedInUser && token) {
				const foundUser = JSON.parse(loggedInUser);
				dispatch(setUser(foundUser));
				navigate(location.pathname);
				setAuthToken(token);
			} else {
				localStorage.removeItem('user');
				setAuthToken();
			}
		};

		checkUserLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Header />
			<Suspense fallback={<Spinner animation='border' variant='light' />}>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/home' element={<PrivateRoute component={HomePage} />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default App;
