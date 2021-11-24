import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import './Header.styles.scss';

import { logoutUser } from 'store/auth/authSlice';
import { useAppSelector, useAppDispatch } from 'app/hooks';

const Header = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector(state => state.auth);

	const showLoginLogoutButton = () => {
		if (isAuthenticated) {
			return (
				<Nav.Link href='#' onClick={() => dispatch(logoutUser())}>
					Logout
				</Nav.Link>
			);
		}

		return (
			<Nav.Link as={Link} to='/login'>
				Login
			</Nav.Link>
		);
	};

	return (
		<div className='top-navbar-div'>
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand as={Link} to='/'>
					Royalty
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link as={Link} to='/home'>
							Home
						</Nav.Link>
					</Nav>
					<Nav>
						<NavDropdown title='Dropdown' id='basic-nav-dropdown'>
							<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.2'>
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href='#action/3.4'>
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
						{showLoginLogoutButton()}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
