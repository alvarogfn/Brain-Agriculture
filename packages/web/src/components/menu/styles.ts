import styled from '@xstyled/styled-components';
import { theme } from 'styled-bettertools';

export const StyledMenu = styled.divBox`
  list-style: none;

  border-style: solid;
  border-radius: ${theme('radii.md')};
  border-color: ${theme('colors.gray-200')};
  border-width: 0.1rem;

  background-color: ${theme('colors.white')};

  box-shadow: ${theme('shadows.default')};

  padding: ${theme('space.1')} 0;

  z-index: 1000;
`;
