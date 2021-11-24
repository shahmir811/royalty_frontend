import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { store } from './app/store';
import { Provider } from 'react-redux';

interface PropType {
	children: React.ReactNode;
}

const Root = (props: PropType) => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>{props.children}</BrowserRouter>
			</Provider>
		</React.StrictMode>
	);
};

export default Root;
