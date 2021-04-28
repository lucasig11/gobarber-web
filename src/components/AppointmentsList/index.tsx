import React from 'react';
import { FiClock } from 'react-icons/fi';

import defaultAvatar from '../../assets/avatar_gobarber.png';

import { Appointment } from './styles';

interface Appointment {
	id: string;
	date: string;
	formattedHour: string;
	user: {
		name: string;
		avatar_url: string;
	};
}

interface IAppointmentsProps {
	title: string;
	appointments: Appointment[];
}

const AppointmentsList: React.FC<IAppointmentsProps> = ({
	title,
	appointments,
	...rest
}) => {
	return (
		<>
			<strong>{title}</strong>
			{appointments.length === 0 && <p>Nenhum agendamento marcado</p>}
			{appointments.map((appointment) => {
				return (
					<Appointment key={appointment.id}>
						<span>
							<FiClock />
							{appointment.formattedHour}
						</span>
						<div>
							<img
								src={
									appointment.user.avatar_url || defaultAvatar
								}
								alt={appointment.user.name}
							/>
							<strong>{appointment.user.name}</strong>
						</div>
					</Appointment>
				);
			})}
		</>
	);
};

export default AppointmentsList;
