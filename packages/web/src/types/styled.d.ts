/* eslint-disable @typescript-eslint/no-restricted-imports */
import type { ITheme } from '@xstyled/styled-components';
import '@xstyled/system';
import 'styled-components';

import type { DefaultTheme } from '@/themes/default';

interface AppTheme extends ITheme, DefaultTheme {}

declare module '@xstyled/system' {
  export interface Theme extends AppTheme {}
}
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
