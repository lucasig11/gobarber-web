import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignUpData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const handleSubmit = useCallback(async (data: SignUpData) => {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Campo obrigatório.'),
				email: Yup.string()
					.required('Campo obrigatório.')
					.email('Email inválido'),
				password: Yup.string()
					.required('Campo obrigatório.')
					.min(6, 'Mínimo de 6 digitos.'),
			});
			await schema.validate(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<Container>
			<Background />

			<Content>
				<img src={logo} alt="GoBarber" />
				<Form onSubmit={handleSubmit}>
					<h1>Faça seu cadastro</h1>

					<Input name="name" icon={FiUser} placeholder="Nome" />
					<Input name="email" icon={FiMail} placeholder="E-mail" />

					<Input
						name="password"
						icon={FiLock}
						type="password"
						placeholder="Senha"
					/>

					<Button type="submit">Cadastrar</Button>
				</Form>
				<a href="create">
					<FiArrowLeft />
					Voltar para a página de login
				</a>
			</Content>
		</Container>
	);
};

export default SignUp;
