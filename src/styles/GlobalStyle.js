import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Roboto';
		background: black;
		height: 100vh;
    }
	button {
        background: #FF4791;
		height: 52px;
		width: 299px;
		border-radius: 8px;

		border-style: none;
        font-family: Roboto;
		font-size: 14px;
		font-weight: 700;
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		
		color: #FFFFFF;
		
        box-sizing: border-box;
        
	}
	input {
		height: 52px;
		width: 299px;
		border: 1px solid #D5D5D5;
        border-radius: 8px;
		
		padding: 0 10px;
        font-weight: 400;
        font-size: 19px;
        line-height: 25px;
		display: flex;
		align-items: center;
        
		font-family: Roboto;
		font-size: 14px;
		font-weight: 400;
        box-sizing: border-box;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 15px;
	}
	p{
		color: #FFFFFF;

	}

`;

export default GlobalStyle;
