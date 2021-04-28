import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, AnimationContainer, Background } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const history = useHistory();

	const { signIn } = useAuth();
	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: SignInData) => {
			try {
				formRef.current?.setErrors({});
				// reset errors

				const schema = Yup.object().shape({
					// create schema for validation
					email: Yup.string()
						.required('Campo obrigatório.')
						.email('Email inválido'),
					password: Yup.string().required('Campo obrigatório.'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await signIn({
					email: data.email,
					password: data.password,
				});

				history.push('/dashboard');
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					type: 'error',
					title: 'Erro na autenticação',
					description:
						'Ocorreu um erro ao fazer login. Cheque as credenciais.',
				});
			}
		},
		[signIn, addToast, history],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logo} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu login</h1>

						<Input
							name="email"
							icon={FiMail}
							placeholder="E-mail"
						/>

						<Input
							name="password"
							icon={FiLock}
							type="password"
							placeholder="Senha"
						/>

						<Button type="submit">Entrar</Button>

						<Link to="/forgot-password">Esqueci minha senha</Link>
					</Form>
					<Link to="/signup">
						<FiLogIn />
						Não tem uma conta? Crie aqui.
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default SignIn;
