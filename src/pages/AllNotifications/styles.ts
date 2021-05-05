import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface NotificationProps {
	read?: number;
}

export const Container = styled.div``;

export const Content = styled.main`
	max-width: 1120px;
	margin: 30px auto;
	display: flex;
	flex-direction: column;
	align-items: center;

	> p {
		margin: 0 auto 30px auto;
		padding: 0;
		width: 100%;
		text-align: center;
		border-bottom: 1px solid ${shade(0.5, '#999591')};
	}

	.spinner-border {
		width: 80px;
		height: 80px;
		margin: 120px;
	}
`;

export const ContentHeader = styled.div`
	display: flex;
	flex-direction: row;
	width: 80%;
	max-width: 1120px;
	margin: 0 auto 20px;
	color: #999591;
	align-items: center;

	a {
		text-decoration: none;
		color: inherit;
		letter-spacing: 6px;
		font-size: 12px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 100;
		text-transform: uppercase;
		display: flex;
		align-items: center;

		&:hover {
			color: #ff9000;
		}

		svg {
			color: inherit;
			width: 24px;
			height: 24px;
			margin-right: 16px;
		}
	}
	p {
		margin: 0;
		text-align: center;
		/* position: absolute; */
		width: 80%;
		/* left: 50%; */
		font-size: 18px;
	}
`;

export const Notification = styled.div<NotificationProps>`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 60%;
	height: 70px;
	background-color: #3e3b47;
	border-radius: 10px;
	justify-content: space-between;
	margin: 10px;

	p {
		display: flex;
		align-items: center;
		margin: auto;
		margin-left: 0;

		strong {
			color: #ff9000;
			margin: auto 4px;
		}
	}

	span {
		margin: 10px;
		text-align: center;
		padding: 0 10px;
		color: #999591;
		background-color: #312e38;
		border-radius: 10px;
	}

	button {
		border: 0;
		background: none;

		svg {
			margin: 10px;
			color: #999591;
		}
	}

	button:first-child {
		margin-left: 10px;
		svg {
			${(props) =>
				!props.read &&
				css`
					color: #ff9000;
				`}

			&:hover {
				color: #ff9000;
			}
		}
	}

	p + button {
		margin-right: 20px;

		svg:hover {
			color: #bc3737;
		}
	}
`;
