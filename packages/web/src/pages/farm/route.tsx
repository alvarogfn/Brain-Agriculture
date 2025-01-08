import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';

import i18n from '@/i18n';

import farmCreateAction from './action';

const FarmCreatePage = lazy(() => import('./page'));

const route: RouteObject = {
  action: farmCreateAction,
  element: <FarmCreatePage />,
  errorElement: <FarmCreatePage />,
  path: 'farm/create',
};

export default route;
