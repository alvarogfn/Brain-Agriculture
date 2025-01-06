import * as yup from 'yup';

export const comboboxOption = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
});
