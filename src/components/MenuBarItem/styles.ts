import styled from 'styled-components';

export const MenuItem = styled.button`
	display: flex;
	align-items: center;
	background: transparent;
	border: 0;
	color: #999591;
	text-decoration: none;

	svg:hover {
		color: #ff9000;

		span {
			display: block;
		}

		p {
			display: none;
		}
	}

	span {
		color: inherit;
		font-size: 12px;
		letter-spacing: 6px;
		text-decoration: none;
		text-transform: uppercase;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 100;
		display: none;
		margin-left: 8px;
	}

	svg {
		color: inherit;
		width: 20px;
		height: 20px;
		margin: auto 10px;
	}

	p {
		margin: 0;
		padding: 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		position: absolute;
		background-color: tomato;
	}
`;
