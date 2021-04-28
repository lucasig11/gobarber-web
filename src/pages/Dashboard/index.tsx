import React from 'react';
import { FiPower } from 'react-icons/fi';

import { Container, Header, HeaderContent, Profile } from './styles';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
	const { signOut, user } = useAuth();

	return (
		<Container>
			<Header>
				<HeaderContent>
					<img src={logo} alt="GoBarber" />

					<Profile>
						<img
							src={
								user.avatar_url ||
								'https://www.pngkey.com/png/detail/308-3081138_contact-avatar-generic.png'
							}
							alt={user.name}
						/>
						<div>
							<span>Bem-vindo,</span>
							<strong>{user.name}</strong>
						</div>
					</Profile>

					<button type="button" onClick={signOut}>
						<FiPower />
					</button>
				</HeaderContent>
			</Header>
		</Container>
	);
};

export default Dashboard;
