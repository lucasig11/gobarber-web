import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { TiPencil } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { format, isAfter, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/apiClient';

import {
	User,
	MonthAvailabilityItem,
	DayAvailabilityItem,
} from '../../common/types';
import { useAuth } from '../../hooks/auth';
import { usePopup } from '../../hooks/popup';

import SlideMenu from '../SlideMenu';

import defaultAvatar from '../../assets/avatar_gobarber.png';
import { Container, ProfileContainer, Background, Separator } from './styles';
import Button from '../Button';
import { useToast } from '../../hooks/toast';

interface PopupProfileProps {
	userInfo: User | undefined;
}

interface PopupItem {
	key: number;
	value: string;
}

const PopupProfile: React.FC<PopupProfileProps> = ({
	userInfo,
}: PopupProfileProps) => {
	const { isVisible, closePopup } = usePopup();
	const { user } = useAuth();
	const { addToast } = useToast();

	const [selectedMonth, setSelectedMonth] = useState(
		new Date().getMonth() + 1,
	);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedDay, setSelectedDay] = useState(new Date().getDate());
	const [selectedHour, setSelectedHour] = useState(8);
	const [visible, setVisible] = useState(false);
	const [monthAvailability, setMonthAvailability] = useState<PopupItem[]>([]);
	const [dayAvailability, setDayAvailability] = useState<PopupItem[]>([]);

	const handleHourChange = useCallback((selectedItem, key) => {
		setSelectedHour(key);
	}, []);

	const handleDayChange = useCallback((selectedItem, key) => {
		setSelectedDay(key);
	}, []);

	const handleMonthChange = useCallback((selectedItem, key) => {
		setSelectedMonth(key);
	}, []);

	const handleYearChange = useCallback((selectedItem, key) => {
		setSelectedYear(key);
	}, []);

	const updateUserData = useCallback(() => {
		if (userInfo) {
			api.get(`/providers/${userInfo.id}/availability`, {
				params: {
					year: selectedYear,
					month: selectedMonth,
				},
			}).then((response) => {
				const availableDays: PopupItem[] = [];
				response.data.forEach((day: MonthAvailabilityItem) => {
					if (day.available) {
						availableDays.push({
							key: day.day,
							value: day.day.toString(),
						});
					}
				});
				if (availableDays[0]) {
					setSelectedDay(availableDays[0].key);
				}

				setMonthAvailability(availableDays);
			});
		}
	}, [selectedMonth, selectedYear, userInfo]);

	const handleConfirmSchedule = useCallback(() => {
		if (userInfo) {
			api.post('/appointments', {
				provider_id: userInfo.id,
				date: new Date(
					selectedYear,
					selectedMonth - 1,
					selectedDay,
					selectedHour,
				),
			}).then(
				() => {
					addToast({
						type: 'success',
						title: 'Agendamento marcado com sucesso!',
					});
					updateUserData();
				},
				() => {
					addToast({
						type: 'error',
						title: 'Ocorreu um erro!',
						description:
							'Ocorreu um erro ao marcar o agendamento. Recarregue a p??gina e tente novamente.',
					});
				},
			);
		}
	}, [
		addToast,
		userInfo,
		selectedYear,
		selectedMonth,
		selectedDay,
		selectedHour,
		updateUserData,
	]);

	const formattedDate = useMemo(() => {
		return format(
			new Date(selectedYear, selectedMonth - 1, selectedDay),
			"dd 'de' MMMM",
			{ locale: ptBR },
		);
	}, [selectedYear, selectedMonth, selectedDay]);

	const months = useMemo(() => {
		const m: PopupItem[] = [];
		const now = new Date();

		for (let i = 1; i <= 12; i++) {
			if (isAfter(endOfMonth(new Date(selectedYear, i - 1)), now)) {
				m.push({
					key: i,
					value: format(new Date(selectedYear, i - 1), 'MMMM', {
						locale: ptBR,
					}),
				});
			}
		}

		return m;
	}, [selectedYear]);

	useEffect(() => {
		setVisible(isVisible);
	}, [isVisible]);

	useEffect(() => {
		updateUserData();
	}, [updateUserData]);

	useEffect(() => {
		if (userInfo) {
			if (selectedDay && selectedDay > 0) {
				api.get(`/providers/${userInfo.id}/availability`, {
					params: {
						year: selectedYear,
						month: selectedMonth,
						day: selectedDay,
					},
				}).then((response) => {
					const availableHours: PopupItem[] = [];
					response.data.forEach((hour: DayAvailabilityItem) => {
						if (hour.available) {
							availableHours.push({
								key: hour.hour,
								value: `${hour.hour.toString()}h`,
							});
						}
					});
					setDayAvailability(availableHours);
				});
			}
		}
	}, [selectedMonth, selectedYear, selectedDay, userInfo]);

	return (
		<Container isVisible={Number(visible)}>
			<Background />
			<ProfileContainer>
				<div>
					<button type="button" onClick={closePopup}>
						<p>Voltar</p>
						<FiArrowLeft />
					</button>

					{user && userInfo && userInfo?.id === user.id && (
						<Link to="/profile" onClick={closePopup}>
							<p>Editar perfil</p>
							<TiPencil />
						</Link>
					)}
				</div>

				<div>
					<img
						src={userInfo?.avatar_url || defaultAvatar}
						alt={userInfo?.name}
					/>
					<h1>{userInfo?.name}</h1>
					<span />
					<SlideMenu
						items={[
							{
								key: new Date().getFullYear(),
								value: new Date().getFullYear().toString(),
							},
							{
								key: new Date().getFullYear() + 1,
								value: (
									new Date().getFullYear() + 1
								).toString(),
							},
						]}
						onChange={handleYearChange}
						initialValue={selectedYear}
					/>
					<Separator />
					<SlideMenu
						items={months}
						initialValue={selectedMonth}
						onChange={handleMonthChange}
					/>
					<Separator />
					<SlideMenu
						items={monthAvailability}
						initialValue={new Date().getDate()}
						onChange={handleDayChange}
						state={selectedDay}
					/>
					{dayAvailability.length > 0 ? (
						<>
							<p>{`Hor??rios dispon??veis em ${formattedDate}`}</p>
							<span />
							<SlideMenu
								items={dayAvailability}
								onChange={handleHourChange}
							/>

							{user &&
								userInfo &&
								userInfo?.id !== user.id &&
								selectedHour && (
									<Button onClick={handleConfirmSchedule}>
										Marcar agendamento!
									</Button>
								)}
							<span />
						</>
					) : (
						<h5>Nenhum hor??rio dispon??vel para este dia.</h5>
					)}
				</div>
			</ProfileContainer>
		</Container>
	);
};

export default PopupProfile;
