import { lazy } from 'react';
import type { RouteObject } from 'react-router';

import farmCreateAction from './action';

const FarmCreatePage = lazy(() => import('./page'));
const ErrorBoundary = lazy(() => import('./error'));

const route: RouteObject = {
  action: farmCreateAction,
  element: <FarmCreatePage />,
  ErrorBoundary,
  path: 'farm/create',
};

export default route;
