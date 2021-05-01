import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

import { MenuItem } from './styles';

type MenuBarProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	title: string;
	icon: IconType;
	blip?: boolean;
};

const MenuBarItem: React.FC<MenuBarProps> = ({
	title,
	icon,
	blip,
	children,
	...rest
}) => {
	const Icon = icon;
	return (
		<MenuItem {...rest}>
			{blip && <p />}
			<span>{title}</span>
			<Icon />
			{children}
		</MenuItem>
	);
};

export default MenuBarItem;
