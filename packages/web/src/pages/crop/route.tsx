import { lazy } from 'react';
import type { RouteObject } from 'react-router';

import cropCreateAction from './action';

const CropCreatePage = lazy(() => import('./page'));
const ErrorBoundary = lazy(() => import('./error'));

const route: RouteObject = {
  action: cropCreateAction,
  element: <CropCreatePage />,
  ErrorBoundary,
  path: 'crop/create',
};

export default route;
