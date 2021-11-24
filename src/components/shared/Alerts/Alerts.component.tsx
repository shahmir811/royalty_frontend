import { Alert } from 'react-bootstrap';

import './Alerts.styles.scss';

interface AlertPropType {
	type: string;
	message: string;
	removeAlert: () => void;
}

const Alerts = ({ type, message, removeAlert }: AlertPropType) => {
	return (
		<div className='alert-class'>
			<Alert variant={type} onClose={() => removeAlert()} dismissible>
				{message}
			</Alert>
		</div>
	);
};

export default Alerts;
