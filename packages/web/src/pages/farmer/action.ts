import type { ActionFunction } from 'react-router';

import { formDataToObject } from '@/helpers/formdata-to-object/formdata-to-object';

export const farmerAction: ActionFunction = async ({ request }) => {
  let data = await request.formData();
  const a = formDataToObject(data);

  console.log(a);
};
