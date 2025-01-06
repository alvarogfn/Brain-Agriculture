import styled from '@xstyled/styled-components';
import { theme } from 'styled-bettertools';

export const StyledBadgeList = styled.ulBox`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme('space.2')};
  margin-top: 2;
`;
