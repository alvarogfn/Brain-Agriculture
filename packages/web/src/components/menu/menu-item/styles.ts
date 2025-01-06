import styled, { css } from '@xstyled/styled-components';
import { ifProp, theme } from 'styled-bettertools';

interface StyledMenuItemProps {
  selected?: boolean;
}

const activeStyles = css`
  background-color: ${theme('colors.gray-200')};
`;

export const StyledMenuItem = styled.divBox<StyledMenuItemProps>`
  padding: ${theme('space.2')} ${theme('space.6')};

  cursor: pointer;

  background-color: ${theme('colors.white')};
  font-size: 1.1rem;

  ${ifProp('selected', activeStyles)};

  &:hover {
    ${activeStyles}
  }

  &:focus {
    outline: 1px solid ${theme('colors.blue-400')};
  }
`;
