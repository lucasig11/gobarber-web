import React, {
	InputHTMLAttributes,
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isFocused, setFocused] = useState(false);
	const [isFilled, setFilled] = useState(false);
	const { fieldName, defaultValue, error, registerField } = useField(name);

	const handleInputFocus = useCallback(() => {
		setFocused(true);
	}, []);

	const handleInputUnfocus = useCallback(() => {
		setFocused(false);

		setFilled(!!inputRef.current?.value);
	}, []);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return (
		<Container isFilled={isFilled} isFocused={isFocused}>
			{Icon && <Icon size={20} />}
			<input
				onFocus={handleInputFocus}
				onBlur={handleInputUnfocus}
				defaultValue={defaultValue}
				ref={inputRef}
				{...rest}
			/>
		</Container>
	);
};

export default Input;
