import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from 'react-router';

import HomePage from '@/pages/home/page';

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: '/',
  },
  {
    element: <div>Not Found</div>,
    path: '*',
  },
  {},
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
