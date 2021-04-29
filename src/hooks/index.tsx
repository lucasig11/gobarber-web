import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { PopupProvider } from './popup';

const AppProvider: React.FC = ({ children }) => (
	<AuthProvider>
		<ToastProvider>
			<PopupProvider>{children}</PopupProvider>
		</ToastProvider>
	</AuthProvider>
);

export default AppProvider;
