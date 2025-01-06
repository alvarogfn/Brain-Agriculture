import styled, { css } from '@xstyled/styled-components';
import { switchProp, theme } from 'styled-bettertools';

export const StyledContainer = styled.divBox`
  display: flex;
  flex-direction: column;

  font-size: 1.6rem;
`;

export const StyledHelperText = styled.pBox`
  font-size: 1rem;
  padding: ${theme('space.2')};
`;

export const StyledLabel = styled.labelBox`
  padding-inline: ${theme('space.2')};
`;

interface StyledInputProps {
  $variant?: 'error' | 'normal';
}

export const StyledInput = styled.inputBox<StyledInputProps>`
  padding: 0.5rem;

  border-radius: 3px;

  border: 1px solid ${theme('colors.gray-400')};

  ${switchProp('$variant', {
    error: css`
      color: darkred;
    `,
  })};
`;
