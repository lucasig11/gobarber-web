import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format, isToday, parseISO, isAfter } from 'date-fns';
import { FiClock } from 'react-icons/fi';

import Spinner from 'react-bootstrap/Spinner';
import ptBR from 'date-fns/locale/pt-BR';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-day-picker/lib/style.css';

import api from '../../services/apiClient';
import { useAuth } from '../../hooks/auth';
import { Appointment, MonthAvailabilityItem } from '../../common/types';
import AppointmentsList from '../../components/AppointmentsList';
import Header from '../../components/Header';

import defaultAvatar from '../../assets/avatar_gobarber.png';

import {
	Container,
	Content,
	Schedule,
	NextAppointment,
	Section,
	Calendar,
} from './styles';

const Dashboard: React.FC = () => {
	const { user } = useAuth();

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
		<>
			<Container>
				<Header />

				<Content>
					<Schedule>
						<h1>Hor??rios agendados</h1>
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
										<strong>Pr??ximo agendamento</strong>
										<div>
											<img
												src={
													nextAppointment.user
														.avatar_url ||
													defaultAvatar
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
										title="Manh??"
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
							disabledDays={[
								{ daysOfWeek: [0, 6] },
								...disabledDays,
							]}
							modifiers={{
								available: { daysOfWeek: [1, 2, 3, 4, 5] },
							}}
							selectedDays={selectedDate}
							onDayClick={handleDayChange}
							onMonthChange={handleMonthChange}
							months={[
								'Janeiro',
								'Fevereiro',
								'Mar??o',
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
		</>
	);
};

export default Dashboard;
