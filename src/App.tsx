import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import GlobalStyles from './styles/global';

import Routes from './routes';

import AppProvider from './hooks/index';

const App: React.FC = () => (
	<Router>
		<AppProvider>
			<Routes />
		</AppProvider>
		<GlobalStyles />
	</Router>
);

export default App;
