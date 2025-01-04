import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from 'react-router';

import HomePage from '@/pages/home/page';

const router = createBrowserRouter([
  {
    element: <HomePage />,
  },
  {
    element: <div>Not Found</div>,
  },
  {},
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
