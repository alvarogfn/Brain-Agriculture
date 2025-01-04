import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const DashBoardPage = lazy(() => import('./page'));
const ErrorBoundary = lazy(() => import('./error'));

const route: RouteObject = {
  element: <DashBoardPage />,
  ErrorBoundary,
  path: 'dashboard',
};

export default route;
