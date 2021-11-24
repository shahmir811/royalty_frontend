import { FC } from 'react';
import { useAppSelector } from 'app/hooks';
import { Navigate } from 'react-router-dom';

interface PropType {
	component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
	const { isAuthenticated } = useAppSelector(state => state.auth);

	// const { isAuthenticated, loading } = authState;
	// if (loading) return <Spinner />;
	if (isAuthenticated) return <Component />;
	return <Navigate to='/login' />;
};

export default PrivateRoute;
