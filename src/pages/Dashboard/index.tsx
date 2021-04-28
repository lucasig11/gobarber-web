import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format, isToday, parseISO, isAfter } from 'date-fns';
import { FiClock, FiPower } from 'react-icons/fi';

import Spinner from 'react-bootstrap/Spinner';
import ptBR from 'date-fns/locale/pt-BR';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-day-picker/lib/style.css';

import api from '../../services/apiClient';
import { useAuth } from '../../hooks/auth';

import AppointmentsList from '../../components/AppointmentsList';

import logo from '../../assets/logo.svg';
import defaultAvatar from '../../assets/avatar_gobarber.png';

import {
	Container,
	Header,
	HeaderContent,
	Profile,
	Content,
	Schedule,
	NextAppointment,
	Section,
	Calendar,
} from './styles';

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
	// States
	const [isLoading, setLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedMonth, setSelectedMonth] = useState(new Date());
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([]);
	const [appointments, setAppointments] = useState<Appointment[]>([]);

	// Callbacks
	const handleDayChange = useCallback(
		(day: Date, modifiers: DayModifiers) => {
			if (modifiers.available && !modifiers.disabled) {
				setSelectedDate(day);
			}
		},
		[],
	);

	const handleMonthChange = useCallback((month: Date) => {
		setSelectedMonth(month);
	}, []);

	// Effects
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
		setLoading(true);
		api.get<Appointment[]>('/appointments/me', {
			params: {
				year: selectedDate.getFullYear(),
				month: selectedDate.getMonth() + 1,
				day: selectedDate.getDate(),
			},
		})
			.then((response) => {
				const formattedAppointments = response.data.map(
					(appointment) => {
						return {
							...appointment,
							formattedHour: format(
								parseISO(appointment.date),
								'HH:mm',
							),
						};
					},
				);
				setAppointments(formattedAppointments);
				console.log(response.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [selectedDate]);

	// Memoes
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

	const nextAppointment = useMemo(() => {
		return appointments.find((appointment) => {
			return isAfter(parseISO(appointment.date), new Date());
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

					{isLoading ? (
						<Spinner animation="border" variant="secondary" />
					) : (
						<>
							{isToday(selectedDate) && nextAppointment && (
								<NextAppointment>
									<strong>Próximo agendamento</strong>
									<div>
										<img
											src={
												nextAppointment.user
													.avatar_url || defaultAvatar
											}
											alt={nextAppointment.user.name}
										/>
										<strong>
											{nextAppointment.user.name}
										</strong>

										<span>
											<FiClock />
											{nextAppointment.formattedHour}
										</span>
									</div>
								</NextAppointment>
							)}

							<Section>
								<AppointmentsList
									appointments={morningAppointments}
									title="Manhã"
								/>

								<AppointmentsList
									appointments={afternoonAppointments}
									title="Tarde"
								/>
							</Section>
						</>
					)}
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
