import styled from '@xstyled/styled-components';
import { theme } from 'styled-bettertools';

import { Icon } from '@/components/icon';

export const StyledContainer = styled.divBox`
  display: flex;
  flex-flow: row nowrap;
  gap: 1.4rem;

  align-items: center;
  justify-content: center;

  background-color: ${theme('colors.blue-300')};

  border-radius: 0.7rem;
  padding: 0.3rem 0.7rem 0.3rem 1.3rem;

  font-size: 1.3rem;
  font-weight: 500;

  max-width: 200px;
  width: min-content;
`;

export const StyledText = styled.pBox`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledButton = styled.buttonBox`
  width: 1.8rem;
  height: 1.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.8rem;

  &:hover {
    background-color: ${theme('colors.blue-400')};
  }
`;

export const StyledIcon = styled(Icon)``;
