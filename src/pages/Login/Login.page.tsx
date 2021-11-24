import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import './Login.styles.scss';

import { loginUserAsync, removeErrors } from 'store/auth/authSlice';
import Alerts from 'components/shared/Alerts/Alerts.component';
import { Navigate } from 'react-router-dom';

interface DataType {
	email: string;
	password: string;
}

const Login = () => {
	const [data, setData] = useState<DataType>({
		email: '',
		password: '',
	});
	const dispatch = useAppDispatch();
	const { loading, errors, isAuthenticated } = useAppSelector(
		state => state.auth
	);

	const { email, password } = data;

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginUserAsync(data));
	};

	if (isAuthenticated) return <Navigate to='/home' />;

	return (
		<>
			{errors && (
				<Alerts
					type='danger'
					message='Oops! something went wrong'
					removeAlert={() => dispatch(removeErrors())}
				/>
			)}

			<Container>
				<h1 className='page-h1-title'>Login to Royalty App</h1>

				<Row className='justify-content-md-center'>
					<Col md={{ span: 8, offset: 0 }}>
						<Form onSubmit={onSubmitHandler}>
							<Form.Group className='mb-3' controlId='formBasicEmail'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									name='email'
									type='email'
									placeholder='Enter email'
									value={email}
									onChange={onChangeHandler}
								/>
								<Form.Text className='text-muted'>
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group className='mb-3' controlId='formBasicPassword'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									name='password'
									type='password'
									placeholder='Password'
									value={password}
									onChange={onChangeHandler}
								/>
							</Form.Group>
							<Button variant='primary' type='submit' disabled={loading}>
								{!loading ? (
									'Submit'
								) : (
									<Spinner animation='border' variant='light' />
								)}
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Login;
