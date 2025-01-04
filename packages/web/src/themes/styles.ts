import { createGlobalStyle, th } from '@xstyled/styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  :root {
    font-size: 62.5%;
  }
  
  body {
    font-size: 1.6rem;
    font-family: "Noto Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "wdth" 100;
    color: ${th('colors.cool-gray-800')};
    background-color: ${th('colors.cool-gray-50')};
  }
	
	button {
		border: none;
    background-color: inherit;
    font-family: inherit;
    outline: none;
    
    &:focus {
      outline: none;
    }
	}
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  input {
    border: none;
    outline: none;
    font-family: inherit;
  }
  
  ul, li, ol {
    list-style: none;
    display: block;
  }
`;
