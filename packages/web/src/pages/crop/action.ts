import type { ActionFunctionArgs } from 'react-router';

import { formDataToObject } from '@/helpers/formdata-to-object';

async function cropCreateAction({ request }: ActionFunctionArgs) {
  let data = await request.formData();
  const objectData = formDataToObject(data);
  console.log(data.get('cropName'));
  console.log(objectData);
}

export default cropCreateAction;
