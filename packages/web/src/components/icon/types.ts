import type { ComponentPropsWithRef } from 'react';

import type { ColorProps } from '@xstyled/system';

import type { Icons } from '@/icons';

export type IconProps = {
  name: Icons;
} & ColorProps &
  ComponentPropsWithRef<'svg'>;
