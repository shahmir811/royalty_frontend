import { Link } from 'react-router-dom';

import './SideMenu.styles.scss';

const SideMenu = () => {
	return (
		<div className='side-menu-wrapping-div'>
			<ul className='side-menu-unorder-list'>
				<Link to='/home'>
					<li className='side-menu-item'>Home</li>
				</Link>
				<Link to='/tax'>
					<li className='side-menu-item'>Tax</li>
				</Link>
				<Link to='/users'>
					<li className='side-menu-item'>User Management</li>
				</Link>
				<Link to='/customers'>
					<li className='side-menu-item'>Customers Management</li>
				</Link>
				<Link to='/customer-credit'>
					<li className='side-menu-item'>Customer Credit Management</li>
				</Link>
				<Link to='/locations'>
					<li className='side-menu-item'>Location Management</li>
				</Link>
				<Link to='/inventory'>
					<li className='side-menu-item'>Inventory Management</li>
				</Link>
				<Link to='/purchase'>
					<li className='side-menu-item'>Purchase Management</li>
				</Link>
				<Link to='/sales'>
					<li className='side-menu-item'>Sales Management</li>
				</Link>
				<Link to='/sales-quotation'>
					<li className='side-menu-item'>Sales Quotations</li>
				</Link>
			</ul>
		</div>
	);
};

export default SideMenu;
