import React, { useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';

import {
	Container,
	Header,
	HeaderContent,
	Profile,
	Content,
	Schedule,
	NextAppointment,
	Section,
	Appointment,
	Calendar,
} from './styles';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.svg';
import defaultAvatar from '../../assets/avatar_gobarber.png';

const Dashboard: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const { signOut, user } = useAuth();

	return (
		<Container>
			<Header>
				<HeaderContent>
					<img src={logo} alt="GoBarber" />

					<Profile>
						<img
							src={user.avatar_url || defaultAvatar}
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

			<Content>
				<Schedule>
					<h1>Horários agendados</h1>

					<p>
						<span>Hoje</span>
						<span>Dia 06</span>
						<span>Segunda-feira</span>
					</p>

					<NextAppointment>
						<strong>Atendimento a seguir</strong>
						<div>
							<img src={defaultAvatar} alt="username" />
							<strong>Lucas</strong>
							<span>
								<FiClock />
								08:00
							</span>
						</div>
					</NextAppointment>

					<Section>
						<strong>Manhã</strong>
						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>
							<div>
								<img src={defaultAvatar} alt="username" />
								<strong>Lucas Fonseca</strong>
							</div>
						</Appointment>

						<Appointment>
							<span>
								<FiClock />
								09:00
							</span>
							<div>
								<img src={defaultAvatar} alt="username" />
								<strong>Lucas Reis</strong>
							</div>
						</Appointment>

						<strong>Tarde</strong>
						<Appointment>
							<span>
								<FiClock />
								14:00
							</span>
							<div>
								<img src={defaultAvatar} alt="username" />
								<strong>Lula Crackudo</strong>
							</div>
						</Appointment>
					</Section>
				</Schedule>
				<Calendar />
			</Content>
		</Container>
	);
};

export default Dashboard;
