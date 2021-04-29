import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import defaultAvatar from '../../assets/avatar_gobarber.png';
import logo from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';
import { usePopup } from '../../hooks/popup';
import { Container, HeaderContent, Profile } from './styles';

const Header: React.FC = () => {
	const { openPopup } = usePopup();
	const { user, signOut } = useAuth();

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

				<div>
					<Link to="/providers">
						<BsFillPersonFill />
					</Link>

					<button type="button" onClick={signOut}>
						<FiPower />
					</button>
				</div>
			</HeaderContent>
		</Container>
	);
};

export default Header;
