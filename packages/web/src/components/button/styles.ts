import styled from '@xstyled/styled-components';
import { theme } from 'styled-bettertools';

export const StyledButton = styled.buttonBox`
  padding: 10px 15px;
  border-radius: ${theme('radii.xl')};

  background-color: ${theme('colors.blue-300')};

  display: flex;
  justify-content: center;
  align-items: center;

  height: 34px;
  width: 173px;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    background: ${theme('colors.button.disabled.background')};
  }
`;
