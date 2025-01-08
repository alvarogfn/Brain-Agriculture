import { lazy } from 'react';
import { Outlet } from 'react-router';
import type { RouteObject } from 'react-router';

import { farmerAction } from './action';

const FarmerCreatePage = lazy(() => import('./create'));
const FarmerListPage = lazy(() => import('./list'));

const route: RouteObject = {
  children: [
    {
      action: farmerAction,
      element: <FarmerCreatePage />,
      errorElement: <FarmerCreatePage />,
      path: 'create',
    },
    {
      element: <FarmerListPage />,
      path: '',
    },
  ],
  element: <Outlet />,
  path: 'farmer',
};

export default route;
