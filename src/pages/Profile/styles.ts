import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
	> header {
		height: 144px;
		background: #28262e;
		display: flex;
		align-items: center;

		div {
			width: 100%;
			max-width: 1120px;
			margin: 0 auto;
			color: #999591;

			&:hover {
				color: #ff9000;
			}

			svg {
				color: inherit;
				width: 24px;
				height: 24px;
				margin-right: 16px;
				display: flex;
				align-items: center;
				float: left;
			}

			a {
				text-decoration: none;
				color: inherit;
				letter-spacing: 6px;
				font-size: 12px;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
					Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
					'Helvetica Neue', sans-serif;
				font-weight: 100;
				text-transform: uppercase;
			}
		}
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	place-content: center;
	margin: 0 auto;
	width: 100%;
	margin: -174px auto 0;

	form {
		margin: 80px 0;
		width: 340px;
		text-align: center;
		display: flex;
		flex-direction: column;

		h1 {
			margin-bottom: 24px;
			font-size: 20px;
			text-align: left;
		}

		> span {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			p {
				margin: auto;
				margin-left: 10px;
			}
			> svg {
				margin: 5px;
				float: left;
				color: #ff9000;

				&:hover {
					cursor: pointer;
				}
			}
		}

		a {
			color: #f4ede8;
			display: block;
			margin-top: 24px;
			text-decoration: none;
			transition: color 0.2s;

			&:hover {
				color: ${shade(0.2, '#f4ede8')};
			}
		}

		input[name='old_password'] {
			margin-top: 24px;
		}
	}
`;

export const AvatarInput = styled.div`
	margin-bottom: 32px;
	position: relative;
	align-self: center;

	img {
		object-fit: cover;
		width: 186px;
		height: 186px;
		border-radius: 50%;
	}

	label {
		position: absolute;
		width: 48px;
		height: 48px;
		background: #ff9000;
		border-radius: 50%;
		right: 0;
		bottom: 0;
		border: none;
		transition: background-color 0.2s;

		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		svg {
			width: 20px;
			height: 20px;
			color: #312e38;
		}

		&:hover {
			background: ${shade(0.2, '#ff9000')};
		}

		input {
			display: none;
		}
	}
`;
