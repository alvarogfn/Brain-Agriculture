import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const FarmCreatePage = lazy(() => import('./page'));
const ErrorBoundary = lazy(() => import('./error'));

const route: RouteObject = {
  element: <FarmCreatePage />,
  ErrorBoundary,
  path: 'farm/create',
};

export default route;
