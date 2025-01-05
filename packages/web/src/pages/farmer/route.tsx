import { lazy } from 'react';
import type { RouteObject } from 'react-router';

import { farmerAction } from './action';

const FarmerPage = lazy(() => import('./page'));
const ErrorBoundary = lazy(() => import('./error'));

const route: RouteObject = {
  action: farmerAction,
  element: <FarmerPage />,
  ErrorBoundary,
  path: 'farmer/create',
};

export default route;
