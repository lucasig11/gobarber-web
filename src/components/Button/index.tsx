import React, { ButtonHTMLAttributes } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
	<Container type="button" disabled={loading} {...rest}>
		{loading ? (
			<Spinner size="sm" animation="border" variant="dark" />
		) : (
			children
		)}
	</Container>
);

export default Button;
