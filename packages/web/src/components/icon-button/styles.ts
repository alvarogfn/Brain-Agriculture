import styled from "@xstyled/styled-components";
import { theme } from "styled-bettertools";

import type { StyledButtonProps } from ".";

export const StyledButton = styled.buttonBox<StyledButtonProps>`
  background-color: ${theme("colors.iconButton.background")};

  border-width: ${theme("borderWidths.1")};
  border-style: solid;
  border-color: ${theme("colors.iconButton.border")};

  cursor: pointer;

  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme("space.3")};

  &:hover {
    background-color: ${theme("colors.iconButton.hovered")};
  }

  &:active {
    box-shadow: ${theme("shadows.inset-1")};
  }
`;
