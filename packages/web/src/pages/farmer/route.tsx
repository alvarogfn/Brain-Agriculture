import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const FarmerPage = lazy(() => import('./page'));
const ErrorBoundary = lazy(() => import('./error'));

const route: RouteObject = {
  element: <FarmerPage />,
  ErrorBoundary,
  path: 'farmer/create',
};

export default route;
