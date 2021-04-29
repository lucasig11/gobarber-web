import styled from 'styled-components';

export const Container = styled.div`
	padding: 32px 0;
	background: #28262e;
`;

export const HeaderContent = styled.div`
	max-width: 1120px;
	margin: 0 auto;
	display: flex;
	align-items: center;

	> img {
		height: 80px;
	}

	div + div {
		display: flex;
		flex-direction: row;
		align-items: right;
		margin-left: auto;
	}
	button,
	a {
		background: transparent;
		border: 0;

		svg {
			color: #999591;
			margin-left: 20px;
			width: 20px;
			height: 20px;

			&:hover {
				color: #ff9000;
			}
		}
	}
`;

export const Profile = styled.div`
	display: flex;
	align-items: center;
	margin-left: 80px;

	img {
		object-fit: cover;
		width: 56px;
		height: 56px;
		border-radius: 50%;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-left: 16px;
		line-height: 24px;

		span {
			color: #f4ede8;
		}

		button {
			strong {
				text-decoration: none;
				color: #ff9000;

				&:hover {
					opacity: 0.8;
				}
			}
		}
	}
`;
