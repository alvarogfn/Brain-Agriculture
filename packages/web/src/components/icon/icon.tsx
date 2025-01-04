import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { useColor } from '@xstyled/styled-components';

import icons from '@/icons';

import type { IconProps } from '.';

function Icon(
  { color = '', 'data-testid': datatestId = 'icon', name, ...props }: IconProps,
  ref: ForwardedRef<SVGSVGElement>,
) {
  const IconSvg = icons[name];

  if (!IconSvg) throw new Error(`Icon "${name}" not found`);

  const fill = useColor(color, color);

  return (
    <IconSvg
      data-testid={`${datatestId}-${name}`}
      fill={String(fill)}
      height="100%"
      ref={ref}
      width="100%"
      {...props}
    />
  );
}

export default forwardRef(Icon);
