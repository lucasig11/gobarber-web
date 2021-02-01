import React, { useCallback, useContext, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import { AuthContext } from '../../contexts/AuthContext';

interface SignInData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { signIn } = useContext(AuthContext);

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

				signIn({
					email: data.email,
					password: data.password,
				});
			} catch (err) {
				const errors = getValidationErrors(err);
				formRef.current?.setErrors(errors);
			}
		},
		[signIn],
	);

	return (
		<Container>
			<Content>
				<img src={logo} alt="GoBarber" />
				<Form ref={formRef} onSubmit={handleSubmit}>
					<h1>Faça seu login</h1>

					<Input name="email" icon={FiMail} placeholder="E-mail" />

					<Input
						name="password"
						icon={FiLock}
						type="password"
						placeholder="Senha"
					/>

					<Button type="submit">Entrar</Button>

					<a href="forgot">Esqueci minha senha</a>
				</Form>
				<a href="create">
					<FiLogIn />
					Não tem uma conta? Crie aqui.
				</a>
			</Content>
			<Background />
		</Container>
	);
};

export default SignIn;
