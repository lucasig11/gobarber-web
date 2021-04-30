/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { parseISO, differenceInDays } from 'date-fns';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import { User } from '../../common/types';
import api from '../../services/apiClient';
import Header from '../../components/Header';
import { usePopup } from '../../hooks/popup';
import { useToast } from '../../hooks/toast';

import defaultAvatar from '../../assets/avatar_gobarber.png';

import { Container, Content, ProvidersList, Provider } from './styles';

const Dashboard: React.FC = () => {
	const { openPopup } = usePopup();
	const { addToast } = useToast();

	const [isLoading, setLoading] = useState(false);
	const [users, setUsers] = useState<User[]>([]);

	const calcAccountAge = useCallback((date: string) => {
		return differenceInDays(new Date(), parseISO(date));
	}, []);

	useEffect(() => {
		api.get('/providers')
			.then((response) => setUsers(response.data))
			.catch(() =>
				addToast({
					type: 'error',
					title: 'Erro ao carregar usuários.',
					description:
						'Houve um erro ao carregar os usuários, recarregue a página e tente novamente.',
				}),
			)
			.finally(() => setLoading(false));
	}, [addToast]);

	return (
		<>
			<Container>
				<Header />
				<Content>
					<h1>Clientes e profissionais</h1>
					{isLoading ? (
						<Spinner animation="border" variant="secondary" />
					) : (
						<ProvidersList>
							<div>
								<div>
									{users.length > 0 &&
										users.map((user) => {
											const {
												avatar_url,
												name,
												id,
											} = user;

											return (
												<Provider key={id}>
													<img
														src={
															avatar_url ||
															defaultAvatar
														}
														alt={name}
														onClick={() => {
															openPopup({ user });
														}}
													/>
													<button
														type="button"
														onClick={() => {
															openPopup({ user });
														}}
													>
														<span>{name}</span>
														<p>
															{`Entrou há ${calcAccountAge(
																user.created_at,
															)} dias.`}
														</p>
													</button>
												</Provider>
											);
										})}
								</div>
							</div>
						</ProvidersList>
					)}
				</Content>
			</Container>
		</>
	);
};

export default Dashboard;
