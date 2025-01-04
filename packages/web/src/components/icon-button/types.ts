import type { ComponentPropsWithRef } from "react";

import type { Color, SystemProp } from "@xstyled/styled-components";

import type { Icons } from "@/icons";
import type { DefaultTheme } from "@/themes/default";

import type { Icon } from "../icon";
import type { StyledButton } from "./styles";

export type IconButtonProps = {
  bg?: SystemProp<Color<DefaultTheme>, DefaultTheme>;
  color?: SystemProp<Color<DefaultTheme>, DefaultTheme>;
  icon: Icons;
  iconProps?: ComponentPropsWithRef<typeof Icon>;
} & ComponentPropsWithRef<typeof StyledButton>;

export type StyledButtonProps = {
  size?: number;
};
