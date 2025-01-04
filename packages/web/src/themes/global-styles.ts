import { createGlobalStyle } from '@xstyled/styled-components';
import { theme } from 'styled-bettertools';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  
    &:focus {
      outline: 2px solid ${theme('colors.blue-500')};
    }
  }


  .wait, .wait * {
    cursor: wait !important;
  }

  body {
    font-family: "Open Sans", sans-serif;
    color: ${theme('colors.dark-900')};
    background-color: ${theme('colors.body.white')};
  }
  
  input {
    outline: initial;
    border: initial;
  }
  
  ul, ol {
    list-style: none;
  }
  
  button {
    background: initial;
    border: initial;
    &:focus {
      outline: inherit;
    }
  }
`;
