import React, { createContext, useCallback, useContext } from 'react';

interface ToastContextData {
	addToast(): void;
	removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
	const addToast = useCallback(() => {
		// console.log('toast');
	}, []);
	const removeToast = useCallback(() => {
		// console.log('toast');
	}, []);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
		</ToastContext.Provider>
	);
};

export function useToast(): ToastContextData {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToast must be used whitin a ToastProvider');
	}

	return context;
}
