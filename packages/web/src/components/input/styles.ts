import styled, { css } from "@xstyled/styled-components";
import { ifProp, theme } from "styled-bettertools";

import { Box } from "../box";

import type { StyledTextboxProps } from ".";

export const StyledTextbox = styled(Box)<StyledTextboxProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  border-style: solid;
  border-width: ${theme("borderWidths.1")};

  ${ifProp(
    "$hasError",
    css`
      border-color: ${theme("colors.input.error.border")};
    `,
    css`
      border-color: ${theme("colors.input.border")};
    `,
  )};

  box-shadow: ${theme("shadows.2")};

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const StyledInput = styled.inputBox`
  outline: initial;

  flex-grow: 1;

  padding: 6px;
  width: 100%;

  color: ${theme("colors.input.text")};
  font-weight: ${theme("fontWeights.normal")};
  font-size: ${theme("fontSizes.textbox")};

  &:disabled {
    background-color: ${theme("colors.input.disabled.background")};
    text-align: center;
  }
`;

export const StyledSibling = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100%;
  min-width: 34px;

  border-color: ${theme("colors.input.border")};
  border-width: ${theme("borderWidths.1")};
`;
