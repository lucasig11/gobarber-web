import styled from 'styled-components';

export const Appointment = styled.div`
	display: flex;
	align-items: center;

	& + div {
		margin-top: 16px;
	}

	span {
		margin-left: auto;
		display: flex;
		align-items: center;
		color: #f4ede8;
		width: 70px;

		svg {
			color: #ff9000;
			margin-right: 8px;
		}
	}

	div {
		flex: 1;
		background-color: #3e3b47;
		display: flex;
		align-items: center;
		padding: 16px 24px;
		border-radius: 10px;
		margin-left: 24px;

		img {
			object-fit: cover;
			width: 56px;
			height: 56px;
			border-radius: 50%;
		}

		strong {
			margin: auto;
			text-align: center;
			padding: 5px 0;
			margin-left: 24px;
			font-size: 18px;
			color: #fff;
		}
	}
`;
