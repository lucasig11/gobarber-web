import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ItemProps {
	isSelected: number;
}

export const Container = styled.div`
	width: 80%;
	margin: 16px;
	max-width: 80%;
	background-color: #1a1c24;
	background: transparent;
	border-radius: 10px;

	div {
		overflow-y: auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: space-between;

		::-webkit-scrollbar {
			height: 10px;
		}
	}
`;

export const Item = styled.div<ItemProps>`
	padding: 5px 40px;
	margin: 8px;
	display: flex;
	width: 80px;
	align-items: center;
	justify-content: center;
	background-color: #ff9000;
	border-radius: 10px;
	font-size: 14px;
	text-align: center;
	cursor: pointer;
	color: #1a1c24;

	&:hover {
		background-color: ${shade(0.2, '#ff9000')};
		color: whitesmoke;
	}

	${(props) =>
		props.isSelected &&
		css`
			background-color: ${shade(0.2, '#ff9000')};
			color: whitesmoke;
		`}
`;
