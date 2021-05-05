import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../services/apiClient';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import defaultAvatar from '../../assets/avatar_gobarber.png';

import { Container, Content, AvatarInput } from './styles';

interface ProfileData {
	name: string;
	email: string;
	old_password: string;
	password: string;
	password_confirmation: string;
	isProvider: boolean;
}

const Profile: React.FC = () => {
	const { addToast } = useToast();
	const { user, updateUser } = useAuth();
	const [isLoading, setLoading] = useState(false);
	const [isChecked, setChecked] = useState(user.isProvider);
	const formRef = useRef<FormHandles>(null);
	const history = useHistory();

	const handleSubmit = useCallback(
		async (data: ProfileData) => {
			try {
				formRef.current?.setErrors({});
				// reset errors

				const schema = Yup.object().shape({
					// create schema for validation
					name: Yup.string().required('Campo obrigatório.'),
					email: Yup.string()
						.required('Campo obrigatório.')
						.email('Email inválido'),
					old_password: Yup.string(),

					password: Yup.string().when('old_password', {
						is: (val: string) => !!val.length,
						then: Yup.string()
							.min(6, 'Mínimo de 6 dígitos')
							.required('Campo obrigatório'),
						otherwise: Yup.string(),
					}),

					password_confirmation: Yup.string()
						.when('old_password', {
							is: (val: string) => !!val.length,
							then: Yup.string()
								.min(6, 'Mínimo de 6 dígitos')
								.required('Campo obrigatório'),
							otherwise: Yup.string(),
						})
						.oneOf(
							[Yup.ref('password'), null],
							'As senhas devem ser iguais',
						),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const {
					name,
					email,
					old_password,
					password,
					password_confirmation,
				} = data;

				const formData = {
					user_id: user.id,
					name,
					email,
					isProvider: isChecked,
					...(data.old_password
						? {
								old_password,
								password,
								password_confirmation,
						  }
						: {}),
				};

				const response = await api.put('/profile', formData);

				updateUser(response.data);
				history.push('/dashboard');

				addToast({
					type: 'success',
					title: 'Perfil atualizado!',
					description:
						'As informações do seu perfil foram atualizadas!',
				});
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					type: 'error',
					title: 'Erro no cadastro.',
					description:
						'Ocorreu um erro ao fazer o cadastro, tente novamente.',
				});
			}
		},
		[addToast, history, updateUser, user.id, isChecked],
	);

	const handleAvatarChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const data = new FormData();

			if (e.target.files) {
				data.append('avatar', e.target.files[0]);
				setLoading(true);

				try {
					const response = await api.patch('/users/avatar', data);
					updateUser(response.data);
					addToast({
						type: 'success',
						title: 'Avatar atualizado!',
						description:
							'Sua imagem de perfil foi atualizada com sucesso!',
					});
				} catch {
					addToast({
						type: 'error',
						title: 'Ocorreu um erro!',
						description:
							'Ocorreu um erro ao atualizar seu avatar, tente novamente.',
					});
				} finally {
					setLoading(false);
				}
			}
		},
		[addToast, updateUser],
	);

	return (
		<Container>
			<header>
				<div>
					<Link to="/">
						<FiArrowLeft />
						Voltar
					</Link>
				</div>
			</header>

			<Content>
				<Form
					ref={formRef}
					initialData={{
						name: user.name,
						email: user.email,
					}}
					onSubmit={handleSubmit}
				>
					<AvatarInput>
						<img
							src={user.avatar_url || defaultAvatar}
							alt={user.name}
						/>
						<label htmlFor="avatar">
							{isLoading ? (
								<Spinner
									animation="border"
									size="sm"
									variant="dark"
								/>
							) : (
								<FiCamera />
							)}
							<input
								type="file"
								id="avatar"
								onChange={handleAvatarChange}
							/>
						</label>
					</AvatarInput>

					<h1>Meu perfil</h1>
					{isChecked ? (
						<span>
							<ImCheckboxChecked
								onClick={() => setChecked(!isChecked)}
							/>
							<p>Você está visível como prestador.</p>
						</span>
					) : (
						<span>
							<ImCheckboxUnchecked
								onClick={() => setChecked(!isChecked)}
							/>
							<p>Quero aparecer como prestador.</p>
						</span>
					)}

					<Input name="name" icon={FiUser} placeholder="Nome" />
					<Input name="email" icon={FiMail} placeholder="E-mail" />

					<Input
						containerStyle={{ marginTop: 24 }}
						name="old_password"
						icon={FiLock}
						type="password"
						placeholder="Senha atual"
					/>
					<Input
						name="password"
						icon={FiLock}
						type="password"
						placeholder="Nova senha"
					/>
					<Input
						name="password_confirmation"
						icon={FiLock}
						type="password"
						placeholder="Confirmar senha"
					/>

					<Button type="submit">Confirmar alterações</Button>
				</Form>
			</Content>
		</Container>
	);
};

export default Profile;
