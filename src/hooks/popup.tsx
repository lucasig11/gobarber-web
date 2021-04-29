import React, { createContext, useCallback, useContext, useState } from 'react';
import { User } from '../common/types';

import PopupProfile from '../components/PopupProfile';

interface PopupContextData {
	closePopup(): void;
	openPopup(userInfo: PopupProfileInfo): void;
	isVisible: boolean;
}

interface PopupProfileInfo {
	user: User;
}

const PopupContext = createContext<PopupContextData>({} as PopupContextData);

export const PopupProvider: React.FC = ({ children }) => {
	const [isVisible, setVisible] = useState(false);
	const [userInfo, setUserInfo] = useState<User>();

	const openPopup = useCallback(({ user }: PopupProfileInfo) => {
		setVisible(true);
		setUserInfo(user);
	}, []);

	const closePopup = useCallback(() => {
		setVisible(false);
	}, []);

	return (
		<PopupContext.Provider value={{ isVisible, openPopup, closePopup }}>
			<PopupProfile userInfo={userInfo} />
			{children}
		</PopupContext.Provider>
	);
};

export function usePopup(): PopupContextData {
	const context = useContext(PopupContext);

	if (!context) {
		throw new Error('usePopup must be used whitin a PopupProvider');
	}

	return context;
}
