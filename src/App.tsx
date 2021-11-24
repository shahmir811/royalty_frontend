import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

import './App.scss';
import { useAppDispatch } from 'app/hooks';
import { setUser } from 'store/auth/authSlice';

import Header from './components/shared/Header/Header.component';
import SideMenu from './components/shared/SideMenu/SideMenu.component';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute.component';

import NotFound from 'pages/NotFound/NotFound.page';
import setAuthToken from 'store/utils/setAuthToken';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const LandingPage = lazy(() => import('./pages/Landing/Landing.page'));
const LoginPage = lazy(() => import('./pages/Login/Login.page'));
const HomePage = lazy(() => import('pages/Home/Home.page'));
const TaxPage = lazy(() => import('pages/Tax/Tax.page'));
const UsersPage = lazy(() => import('pages/Users/Users.page'));
const CustomersPage = lazy(() => import('pages/Customers/Customers.page'));
const CustomerCreditPage = lazy(
	() => import('pages/CustomerCredit/CustomerCredit.page')
);
const LocationsPage = lazy(() => import('pages/Locations/Locations.page'));
const InventoryPage = lazy(() => import('pages/Inventory/Inventory.page'));
const PurchasePage = lazy(() => import('pages/Purchase/Purchase.page'));
const SalesPage = lazy(() => import('pages/Sales/Sales.page'));
const SalesQuotationPage = lazy(
	() => import('pages/SalesQuotation/SalesQuotation.page')
);

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
				<Row>
					<Col xs lg='2'>
						<SideMenu />
					</Col>
					<Col>
						<Container>
							<Routes>
								<Route path='/' element={<LandingPage />} />
								<Route path='/login' element={<LoginPage />} />
								<Route
									path='/home'
									element={<PrivateRoute component={HomePage} />}
								/>
								<Route
									path='/tax'
									element={<PrivateRoute component={TaxPage} />}
								/>
								<Route
									path='/users'
									element={<PrivateRoute component={UsersPage} />}
								/>
								<Route
									path='/customers'
									element={<PrivateRoute component={CustomersPage} />}
								/>
								<Route
									path='/customer-credit'
									element={<PrivateRoute component={CustomerCreditPage} />}
								/>
								<Route
									path='/locations'
									element={<PrivateRoute component={LocationsPage} />}
								/>
								<Route
									path='/inventory'
									element={<PrivateRoute component={InventoryPage} />}
								/>
								<Route
									path='/purchase'
									element={<PrivateRoute component={PurchasePage} />}
								/>
								<Route
									path='/sales'
									element={<PrivateRoute component={SalesPage} />}
								/>
								<Route
									path='/sales-quotation'
									element={<PrivateRoute component={SalesQuotationPage} />}
								/>
								<Route path='*' element={<NotFound />} />
							</Routes>
						</Container>
					</Col>
				</Row>
			</Suspense>
		</div>
	);
};

export default App;
