import type { ActionFunction } from 'react-router';
import { redirect } from 'react-router';

import { fetchFarmerCreate } from '@/api/farmer-create';
import { formDataToObject } from '@/helpers/formdata-to-object/formdata-to-object';
import type { FarmerCreateSchema } from '@/validators/farmer-create-schema';

export const farmerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = formDataToObject<FarmerCreateSchema>(formData);

  await fetchFarmerCreate(data);
  return redirect('/farmer');
};
