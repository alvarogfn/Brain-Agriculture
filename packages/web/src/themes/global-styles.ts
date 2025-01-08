import { createGlobalStyle } from '@xstyled/styled-components';
import { theme } from 'styled-bettertools';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  *:focus {
    outline: 1px solid ${theme('colors.blue-700')}
  }
  
  :root {
    font-size: 62.5%;
  }
  
  body {
    font-family: "Noto Sans", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.6rem;
  }
  
  button {
    border: initial;
    cursor: pointer;
    background: initial;
  }
  
  ul, li {
    list-style: none;
  }
`;
