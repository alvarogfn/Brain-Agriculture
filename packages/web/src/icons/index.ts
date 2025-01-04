import { createElement } from 'react';

const icons = {
  base: () => createElement('svg'),
};

export type Icons = keyof typeof icons;

export default icons;
