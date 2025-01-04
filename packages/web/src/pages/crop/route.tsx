import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const CropCreatePage = lazy(() => import('./page'));
const ErrorBoundary = lazy(() => import('./error'));

const route: RouteObject = {
  element: <CropCreatePage />,
  ErrorBoundary,
  path: 'crop/create',
};

export default route;
