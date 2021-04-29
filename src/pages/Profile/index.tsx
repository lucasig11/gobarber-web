import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

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
	password: string;
}

const Profile: React.FC = () => {
	const { addToast } = useToast();
	const { user, updateUser } = useAuth();
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
					password: Yup.string().min(6, 'Mínimo de 6 digitos.'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await api.post('/users', data);

				history.push('/');

				addToast({
					type: 'success',
					title: 'Conta registrada com sucesso!',
					description: 'Você já pode fazer seu login.',
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
		[addToast, history],
	);

	const handleAvatarChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const data = new FormData();

			if (e.target.files) {
				data.append('avatar', e.target.files[0]);

				api.patch('/users/avatar', data).then((response) => {
					updateUser(response.data);

					addToast({
						type: 'success',
						title: 'Avatar atualizado!',
						description:
							'Sua imagem de perfil foi atualizada com sucesso!',
					});
				});
			}
		},
		[],
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
							<FiCamera />
							<input
								type="file"
								id="avatar"
								onChange={handleAvatarChange}
							/>
						</label>
					</AvatarInput>

					<h1>Meu perfil</h1>

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
