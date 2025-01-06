import * as yup from 'yup';

import i18n from '@/i18n';

export const cropCreateSchema = yup.object({
  cropName: yup.string().required(i18n.t('validations.required')),
});

export type CropCreateSchema = yup.InferType<typeof cropCreateSchema>;
