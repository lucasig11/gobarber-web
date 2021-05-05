import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
	max-width: 1120px;
	margin: 64px auto;
	display: flex;
	flex-direction: column;
	align-items: center;

	.spinner-border {
		width: 80px;
		height: 80px;
		margin: 120px;
	}
`;

export const ProvidersList = styled.div`
	width: 900px;
	overflow-y: auto;
	display: flex;

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		align-content: space-between;
		margin: auto 0 auto 0;
	}
`;

export const Provider = styled.div`
	display: flex;
	flex-direction: column;
	float: left;
	padding: 1%;
	margin: 20px;
	margin-right: 10px;
	background-color: #28262e;
	border-radius: 10px;
	word-wrap: break-word;
	align-items: center;

	button {
		border: 0;
		background: none;
	}

	span {
		color: #ff9000;
		font-size: 20px;
		display: block;
		word-wrap: normal;
		margin: 0 auto;
		width: 190px;
		&:hover {
			color: white;
		}
	}

	img {
		margin: 15px;
		object-fit: cover;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		cursor: pointer;
	}

	p {
		font-size: 14px;
		margin: 0 auto;
		justify-content: center;
		color: ${shade(0.2, '#999591')};
	}
`;
