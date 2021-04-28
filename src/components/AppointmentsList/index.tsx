import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import React, { useCallback } from 'react';
import { FiClock } from 'react-icons/fi';

import defaultAvatar from '../../assets/avatar_gobarber.png';
import { IAppointmentsProps } from '../../common/types';

import { Appointment, AppointmentInfo } from './styles';

const AppointmentsList: React.FC<IAppointmentsProps> = ({
	title,
	appointments,
}) => {
	const formatDate = useCallback((date: string) => {
		return format(parseISO(date), "HH'h'mm'm' 'do dia' d 'de' MMMM", {
			locale: ptBR,
		});
	}, []);
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
						<AppointmentInfo>
							<img
								src={
									appointment.user.avatar_url || defaultAvatar
								}
								alt={appointment.user.name}
							/>
							<div>
								<strong>{appointment.user.name}</strong>
								<p>
									Agendamento criado às{' '}
									{formatDate(appointment.created_at)}
								</p>
							</div>
						</AppointmentInfo>
					</Appointment>
				);
			})}
		</>
	);
};

export default AppointmentsList;
