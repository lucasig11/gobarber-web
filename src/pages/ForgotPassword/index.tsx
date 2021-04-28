import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, AnimationContainer, Background } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface ForgotPasswordata {
	email: string;
}

const ForgotPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: ForgotPasswordata) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Campo obrigatório.')
						.email('Email inválido'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					type: 'error',
					title: 'Erro na recuperação de senha.',
					description:
						'Ocorreu um erro ao realizar a recuperação de senha. Tente novamente.',
				});
			}
		},
		[addToast],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logo} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Recuperar senha</h1>

						<Input
							name="email"
							icon={FiMail}
							placeholder="E-mail"
						/>

						<Button type="submit">
							Enviar e-mail de recuperação
						</Button>
					</Form>
					<Link to="/">
						<FiArrowLeft />
						Voltar para a página de login.
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ForgotPassword;
