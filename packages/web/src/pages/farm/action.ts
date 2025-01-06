import type { ActionFunctionArgs } from 'react-router';

import { formDataToObject } from '@/helpers/formdata-to-object/formdata-to-object';

async function farmCreateAction({ request }: ActionFunctionArgs) {
  let data = await request.formData();
  const a = formDataToObject(data);
  console.log(data.get('farmOwner'));
  console.log(a);
}

export default farmCreateAction;
