import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const HomePage = lazy(() => import('./page'));

const route: Pick<RouteObject, 'element' | 'path'> = {
  element: <HomePage />,
  path: '/*',
};

export default route;
