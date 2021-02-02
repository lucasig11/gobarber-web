import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const handleSubmit = useCallback(async (data: SignUpData) => {
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
		} catch (err) {
			const errors = getValidationErrors(err);
			formRef.current?.setErrors(errors);
		}
	}, []);

	return (
		<Container>
			<Background />
			<Content>
				<AnimationContainer>
					<img src={logo} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu cadastro</h1>

						<Input name="name" icon={FiUser} placeholder="Nome" />
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

						<Button type="submit">Cadastrar</Button>
					</Form>
					<Link to="/">
						<FiArrowLeft />
						Voltar para a página de login
					</Link>
				</AnimationContainer>
			</Content>
		</Container>
	);
};

export default SignUp;
