import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;

    }

    body {
        background: #312e38;
        color: #fff;
        -webkit-font-smoothing: antialiased;
        overflow-y: overlay;
        overflow-x: hidden;
    }

    body, input, button {
        font-family: 'Roboto Slab', serif;
		font-size: 16px;
    }

	h1, h2, h3, h4, h5, h6, strong {
		font-weight: 500;
	}

	button {
		cursor: pointer;
	}

    /* width */
	::-webkit-scrollbar {
		border-radius: 30px;
        margin-right: 10px;
	}
   
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 10px;
    }

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: rgba(100, 100, 100, 0.4);
	}
`;
