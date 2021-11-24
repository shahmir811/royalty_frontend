import { useAppSelector } from 'app/hooks';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const { isAuthenticated } = useAppSelector(state => state.auth);
	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
