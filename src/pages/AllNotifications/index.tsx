/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useState } from 'react';
import { FaCircle, FaTrashAlt } from 'react-icons/fa';
import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../services/apiClient';
import { useToast } from '../../hooks/toast';
import Header from '../../components/Header';
import { INotification } from '../../common/types';
import { Container, Content, Notification, ContentHeader } from './styles';

const AllNotifications: React.FC = () => {
	const { addToast } = useToast();
	const [isLoading, setLoading] = useState(false);
	const [notifications, setNotifications] = useState<INotification[]>([]);

	const parseDate = useCallback((date: string) => {
		return format(parseISO(date), 'dd/MM');
	}, []);

	const updateNotifications = useCallback(() => {
		setLoading(true);
		api.get('/notifications')
			.then((response) => setNotifications(response.data.reverse()))
			.catch(() => {
				addToast({
					type: 'error',
					title: 'Ocorreu um erro!',
					description:
						'Houve um erro ao carregar suas notificações, tente novamente.',
				});
			})
			.finally(() => setLoading(false));
	}, [addToast]);

	const readNotification = useCallback(
		async (notification_id: string) => {
			try {
				await api.patch('/notifications', {
					notification_id,
				});
				updateNotifications();
			} catch {
				addToast({
					type: 'error',
					title: 'Ocorreu um erro!',
					description:
						'Houve um erro ao carregar suas notificações, tente novamente.',
				});
			}
		},
		[addToast, updateNotifications],
	);

	const deleteNotification = useCallback(
		async (notification_id: string) => {
			try {
				await api.delete('/notifications', {
					params: {
						notification_id,
					},
				});
				updateNotifications();
			} catch {
				addToast({
					type: 'error',
					title: 'Ocorreu um erro!',
					description:
						'Houve um erro ao carregar suas notificações, tente novamente.',
				});
			}
		},
		[addToast, updateNotifications],
	);

	const parseMessage = useCallback((s: string) => {
		return s.replace(
			/(\d{1,4}([/])\d{1,2}([/])\d{1,4}|\d{1,2}h)/g,
			' <strong>$&</strong> ',
		);
	}, []);

	useEffect(() => {
		updateNotifications();
	}, [updateNotifications]);

	return (
		<Container>
			<Header />
			<Content>
				<ContentHeader>
					<Link to="/">
						<FiArrowLeft />
						Voltar
					</Link>
					{!isLoading &&
						(notifications.length === 0 ? (
							<p>Você não tem nenhuma notificação.</p>
						) : (
							<p>Notificações ({notifications.length})</p>
						))}
				</ContentHeader>
				{isLoading && (
					<Spinner animation="border" variant="secondary" />
				)}
				{!isLoading &&
					notifications.map((notification) => {
						const { id, content, created_at, read } = notification;
						return (
							<Notification key={id} read={Number(read)}>
								<button
									id="notification"
									type="button"
									onClick={() => readNotification(id)}
								>
									<FaCircle size={10} />
								</button>
								<span>{parseDate(created_at)}</span>

								<p
									dangerouslySetInnerHTML={{
										__html: `${parseMessage(content)}`,
									}}
								/>

								<button
									type="button"
									onClick={() => deleteNotification(id)}
								>
									<FaTrashAlt size={15} />
								</button>
							</Notification>
						);
					})}
			</Content>
		</Container>
	);
};

export default AllNotifications;
