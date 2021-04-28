import { lighten } from 'polished';
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
`;

export const AppointmentInfo = styled.div`
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

	div {
		flex-direction: column;
		align-content: left;

		strong {
			margin: auto;
			text-align: left;
			padding: 5px 0;
			margin-left: 24px;
			font-size: 18px;
			color: #fff;
			border-bottom: 2px solid ${lighten(0.1, '#3e3b47')};
		}

		p {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
				Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
				sans-serif;
			font-weight: 600;
			margin: 5px auto auto 24px;
			justify-content: left;
			font-size: 12px;
			color: ${lighten(0.4, '#3e3b47')};
		}
	}
`;
