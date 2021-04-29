import { lighten } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
	isVisible: number;
}

export const Container = styled.section<ContainerProps>`
	width: 100vw;
	height: 100vh;
	position: fixed;
	z-index: 2;

	${(props) =>
		props.isVisible
			? css`
					display: visible;
			  `
			: css`
					display: none;
			  `}
`;

export const Background = styled.div`
	background-color: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(1px);
	position: absolute;
	height: 100vh;
	width: 100vw;
	z-index: -1;
	filter: blur(10px);
	-webkit-filter: blur(10px);
`;

export const ProfileContainer = styled.div`
	width: 30%;
	margin: 5% auto;
	height: 80vh;
	border-radius: 10px;
	background-color: #28262e;
	opacity: 1;
	min-height: 500px;
	overflow-x: auto;
	margin-bottom: 40px;

	::-webkit-scrollbar {
		width: 10px;
	}
	> div {
		width: 100%;
		height: 10px;
		padding-top: 5px;
		display: flex;
		flex-direction: row;
		align-content: space-between;
		text-align: center;

		button,
		a {
			background: none;
			border: 0;
			color: inherit;
			margin: 8px auto auto 16px;
			font-size: 16px;
			font-weight: 100;
			cursor: pointer;
			float: right;

			&:hover {
				color: #ff9000;

				p {
					visibility: visible;
				}
			}

			svg {
				color: inherit;
				width: 26px;
				height: 26px;
				margin: 0 5px 5px auto;
			}

			p {
				float: inherit;
				visibility: hidden;
			}

			& + button,
			& + a {
				float: left;
				margin: 8px 16px auto auto;

				svg {
					margin: 0 auto 5px 5px;
				}
			}
		}
	}

	div + div {
		display: flex;
		flex-direction: column;
		align-items: center;

		br {
			line-height: 1px;
		}
		img {
			object-fit: cover;
			min-width: 80px;
			min-height: 80px;
			border-radius: 50%;
			margin: 24px 0 auto;
		}
		h1 {
			font-size: 24px;
			margin-top: 20px;
		}

		> p {
			margin: 10px;
			width: 90%;
			margin: 15px;
			font-size: 20px;
		}

		span {
			width: 90%;
			padding-bottom: 5px;
			text-align: left;
			border-bottom: 1px solid ${lighten(0.1, '#28262e')};
		}
	}

	h5 {
		font-size: 18px;
		margin: 50px;
		opacity: 0.5;
	}
`;

export const Separator = styled.span`
	line-height: 2px;
	margin: -5px;
	padding: 0;
	border: 0 !important;
`;
