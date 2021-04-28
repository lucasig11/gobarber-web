import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format, isToday } from 'date-fns';

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

const Dashboard: React.FC = () => {
	const { user, signOut } = useAuth();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedMonth, setSelectedMonth] = useState(new Date());
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([]);

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
