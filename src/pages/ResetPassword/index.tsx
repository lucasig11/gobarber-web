import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, AnimationContainer, Background } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';

interface ResetPasswordData {
	password: string;
	password_confirmation: string;
}

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ResetPassword: React.FC = () => {
	const [isLoading, setLoading] = useState(false);

	const formRef = useRef<FormHandles>(null);
	const history = useHistory();
	const token = useQuery().get('token');

	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: ResetPasswordData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					password: Yup.string().required('Campo obrigatório.'),
					password_confirmation: Yup.string()
						.oneOf(
							[Yup.ref('password'), null],
							'As senhas devem ser iguais',
						)
						.required('Campo obrigatório.'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const { password, password_confirmation } = data;

				if (!token) {
					throw new Error();
				}

				setLoading(true);

				await api.post('/password/reset', {
					token,
					password,
					password_confirmation,
				});

				history.push('/');
				addToast({
					type: 'success',
					title: 'Senha redefinida!',
					description: 'Você redefiniu a sua senha com sucesso.',
				});
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					type: 'error',
					title: 'Ocorreu um erro!',
					description:
						'Ocorreu um erro ao resetar a sua senha, tente novamente.',
				});
			} finally {
				setLoading(false);
			}
		},
		[addToast, history, token],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logo} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Redefinir senha</h1>

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
							placeholder="Confirmação da senha"
						/>

						<Button loading={isLoading} type="submit">
							Alterar senha!
						</Button>
					</Form>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ResetPassword;
