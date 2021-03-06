import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
	max-width: 1120px;
	margin: 64px auto;
	display: flex;
`;

export const Schedule = styled.div`
	flex: 1;
	margin-right: 120px;

	h1 {
		font-size: 36px;
	}

	p {
		margin-top: 8px;
		color: #ff9000;
		display: flex;
		align-items: center;
		font-weight: 500;

		span {
			display: flex;
			align-items: center;
			text-transform: capitalize;
		}

		/* aplica do segundo span pra frente */
		span + span::before {
			content: '';
			width: 1px;
			height: 16px;
			background: #ff9000;
			margin: 0 8px;
		}
	}

	.spinner-border {
		width: 80px;
		height: 80px;
		position: relative;
		top: 30%;
		left: 50%;
		margin-right: -50%;
	}
`;

export const NextAppointment = styled.div`
	margin-top: 64px;

	> strong {
		color: #999591;
		font-size: 20px;
		font-weight: 400;
	}

	div {
		background-color: #3e3b47;
		display: flex;
		align-items: center;
		padding: 16px 24px;
		border-radius: 10px;
		margin-top: 24px;
		position: relative;

		&::before {
			position: absolute;
			height: 80%;
			width: 1px;
			left: 0;
			top: 10%;
			content: '';
			background: #ff9000;
		}

		img {
			object-fit: cover;
			width: 80px;
			height: 80px;
			border-radius: 50%;
		}

		strong {
			margin-left: 24px;
			color: #fff;
			font-size: 20px;
		}

		span {
			margin-left: auto;
			display: flex;
			align-items: center;
			color: #999591;

			svg {
				color: #ff9000;
				margin-right: 8px;
			}
		}
	}
`;

export const Section = styled.section`
	margin-top: 49px;

	strong {
		color: #999591;
		font-size: 20px;
		line-height: 26px;
		border-bottom: 1px solid #3e3b47;
		display: block;
		padding-bottom: 16px;
		margin: 40px 0 20px;
	}

	> p {
		justify-content: center;
		color: ${shade(0.2, '#999591')};
	}
`;

export const Calendar = styled.aside`
	width: 380px;

	.DayPicker {
		background: #28262e;
		border-radius: 10px;
	}
	.DayPicker-wrapper {
		padding-bottom: 0;
	}
	.DayPicker,
	.DayPicker-Month {
		width: 100%;
	}
	.DayPicker-Month {
		border-collapse: separate;
		border-spacing: 8px;
		margin: 16px;
	}
	.DayPicker-Day {
		width: 40px;
		height: 40px;
	}
	.DayPicker-Day--available:not(.DayPicker-Day--outside) {
		background: #3e3b47;
		border-radius: 10px;
		color: #fff;
	}
	.DayPicker:not(.DayPicker--interactionDisabled)
		.DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
		background: ${shade(0.2, '#3e3b47')};
	}
	.DayPicker-Day--today {
		font-weight: normal;
	}
	.DayPicker-Day--disabled {
		color: #666360 !important;
		background: transparent !important;
	}
	.DayPicker-Day--selected {
		background: #ff9000 !important;
		border-radius: 10px;
		color: #232129 !important;
	}
`;
