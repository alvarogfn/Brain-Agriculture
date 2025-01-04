import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from 'react-router';

import CropRoute from '@/pages/crop/route';
import DashBoardRoute from '@/pages/dashboard/route';
import FarmRoute from '@/pages/farm/route';
import FarmerRoute from '@/pages/farmer/route';
import HarvestRoute from '@/pages/harvest/route';
import HomeRoute from '@/pages/home/route';

const router = createBrowserRouter([
  {
    ...HomeRoute,
    children: [DashBoardRoute, FarmerRoute, FarmRoute, HarvestRoute, CropRoute],
  },
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
