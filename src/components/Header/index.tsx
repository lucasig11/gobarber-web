import React, { useCallback } from 'react';
import { BsBellFill, BsFillPersonLinesFill } from 'react-icons/bs';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import defaultAvatar from '../../assets/avatar_gobarber.png';
import logo from '../../assets/logo.svg';

import MenuBarItem from '../MenuBarItem';
import { useAuth } from '../../hooks/auth';
import { usePopup } from '../../hooks/popup';
import { Container, HeaderContent, Profile, MenuBar } from './styles';

const Header: React.FC = () => {
	const { openPopup } = usePopup();
	const { user, signOut } = useAuth();
	const history = useHistory();

	const handleProvidersClick = useCallback(() => {
		history.push('/providers');
	}, [history]);

	const handleNotificationsClick = useCallback(() => {
		history.push('/notifications');
	}, [history]);

	return (
		<Container>
			<HeaderContent>
				<Link to="/">
					<img src={logo} alt="GoBarber" />
				</Link>

				<Profile>
					<img
						src={user.avatar_url || defaultAvatar}
						alt={user.name}
					/>
					<div>
						<span>Olá,</span>
						<button
							type="button"
							onClick={() => openPopup({ user })}
						>
							<strong>{user.name}</strong>
						</button>
					</div>
				</Profile>

				<MenuBar>
					<MenuBarItem
						title="Notificações"
						blip
						icon={BsBellFill}
						onClick={handleNotificationsClick}
					/>
					<MenuBarItem
						title="Prestadores"
						icon={BsFillPersonLinesFill}
						onClick={handleProvidersClick}
					/>
					<MenuBarItem
						title="Sair"
						icon={FiPower}
						onClick={signOut}
					/>
				</MenuBar>
			</HeaderContent>
		</Container>
	);
};

export default Header;
