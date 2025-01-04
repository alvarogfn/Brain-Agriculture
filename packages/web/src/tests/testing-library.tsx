/* eslint-disable @typescript-eslint/no-restricted-imports */
import type { ReactNode } from 'react';

import type { queries, Queries } from '@testing-library/dom';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';

import { Providers } from './providers';

function customRender<
  Container extends HTMLElement,
  BaseElement extends Container,
  Q extends Queries = typeof queries,
>(
  ui: ReactNode,
  options?: RenderOptions<Q, Container, BaseElement>,
): RenderResult<Q, Container, BaseElement> {
  return render(ui, { wrapper: Providers, ...options });
}

// eslint-disable-next-line import-x/export
export * from '@testing-library/react';

// eslint-disable-next-line import-x/export
export { customRender as render };
