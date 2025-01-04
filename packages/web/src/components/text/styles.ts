import styled, { css } from '@xstyled/styled-components';
import { switchProp } from 'styled-bettertools';

export const StyledText = styled.pBox`
  ${switchProp('as', {
    h2: css`
      font-size: 1.6rem;
      font-weight: 600;
    `,
  })};
`;
