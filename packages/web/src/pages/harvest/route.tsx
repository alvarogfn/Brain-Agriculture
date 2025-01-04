import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const HarvestCreatePage = lazy(() => import('./page'));
const ErrorBoundary = lazy(() => import('./error'));

const route: RouteObject = {
  element: <HarvestCreatePage />,
  ErrorBoundary,
  path: 'harvest/create',
};

export default route;
