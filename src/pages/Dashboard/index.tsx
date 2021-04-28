import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format, isToday, parseISO } from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';

import 'react-day-picker/lib/style.css';

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
import api from '../../services/apiClient';

interface MonthAvailabilityItem {
	day: number;
	available: boolean;
}

interface Appointment {
	id: string;
	date: string;
	formattedHour: string;
	user: {
		name: string;
		avatar_url: string;
	};
}

const Dashboard: React.FC = () => {
	const { user, signOut } = useAuth();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedMonth, setSelectedMonth] = useState(new Date());
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([]);
	const [appointments, setAppointments] = useState<Appointment[]>([]);

	const handleDayChange = useCallback(
		(day: Date, modifiers: DayModifiers) => {
			if (modifiers.available) {
				setSelectedDate(day);
			}
		},
		[],
	);

	const handleMonthChange = useCallback((month: Date) => {
		setSelectedMonth(month);
	}, []);

	useEffect(() => {
		api.get(`/providers/${user.id}/availability`, {
			params: {
				year: selectedMonth.getFullYear(),
				month: selectedMonth.getMonth() + 1,
			},
		}).then((response) => {
			setMonthAvailability(response.data);
		});
	}, [selectedMonth, user.id]);

	useEffect(() => {
		api.get<Appointment[]>('/appointments/me', {
			params: {
				year: selectedDate.getFullYear(),
				month: selectedDate.getMonth() + 1,
				day: selectedDate.getDate(),
			},
		}).then((response) => {
			const formattedAppointments = response.data.map((appointment) => {
				return {
					...appointment,
					formattedHour: format(parseISO(appointment.date), 'HH:mm'),
				};
			});
			setAppointments(formattedAppointments);
			console.log(response.data);
		});
	}, [selectedDate]);

	const disabledDays = useMemo(() => {
		const dates = monthAvailability
			.filter((monthDay) => monthDay.available === false)
			.map((monthDay) => {
				const year = selectedMonth.getFullYear();
				const month = selectedMonth.getMonth();

				return new Date(year, month, monthDay.day);
			});

		return dates;
	}, [selectedMonth, monthAvailability]);

	const parsedDay = useMemo(
		() => format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR }),
		[selectedDate],
	);

	const parsedWeekDay = useMemo(
		() =>
			format(selectedDate, 'cccc', {
				locale: ptBR,
			}),
		[selectedDate],
	);

	const morningAppointments = useMemo(() => {
		return appointments.filter((appointment) => {
			return parseISO(appointment.date).getHours() < 12;
		});
	}, [appointments]);

	const afternoonAppointments = useMemo(() => {
		return appointments.filter((appointment) => {
			return parseISO(appointment.date).getHours() >= 12;
		});
	}, [appointments]);

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
						{isToday(selectedDate) && <span>Hoje</span>}
						<span>{parsedDay}</span>
						<span>{parsedWeekDay}</span>
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
						<strong>
							{appointments.length > 0
								? 'Manhã'
								: 'Nenhum agendamento marcado'}
						</strong>
						{morningAppointments.map((appointment) => {
							return (
								<Appointment key={appointment.id}>
									<span>
										<FiClock />
										{appointment.formattedHour}
									</span>
									<div>
										<img
											src={
												appointment.user.avatar_url ||
												defaultAvatar
											}
											alt={appointment.user.name}
										/>
										<strong>{appointment.user.name}</strong>
									</div>
								</Appointment>
							);
						})}

						<strong>
							{appointments.length > 0
								? 'Tarde'
								: 'Nenhum agendamento marcado'}
						</strong>
						{afternoonAppointments.map((appointment) => {
							return (
								<Appointment key={appointment.id}>
									<span>
										<FiClock />
										{appointment.formattedHour}
									</span>
									<div>
										<img
											src={
												appointment.user.avatar_url ||
												defaultAvatar
											}
											alt={appointment.user.name}
										/>
										<strong>{appointment.user.name}</strong>
									</div>
								</Appointment>
							);
						})}
					</Section>
				</Schedule>
				<Calendar>
					<DayPicker
						weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
						fromMonth={new Date()}
						disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
						modifiers={{
							available: { daysOfWeek: [1, 2, 3, 4, 5] },
						}}
						selectedDays={selectedDate}
						onDayClick={handleDayChange}
						onMonthChange={handleMonthChange}
						months={[
							'Janeiro',
							'Fevereiro',
							'Março',
							'Abril',
							'Maio',
							'Junho',
							'Julho',
							'Agosto',
							'Setembro',
							'Outubro',
							'Novembro',
							'Dezembro',
						]}
					/>
				</Calendar>
			</Content>
		</Container>
	);
};

export default Dashboard;
