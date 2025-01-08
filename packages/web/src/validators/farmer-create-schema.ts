import * as yup from 'yup';

import i18n from '@/i18n';

export const farmerCreateSchema = yup.object({
  documentId: yup
    .string()
    .when(([identifier], schema) => {
      if (identifier.length <= 11)
        return schema.length(11, i18n.t('validations.string.CPF'));
      return schema.length(14, i18n.t('validations.string.CNPJ'));
    })
    .required(i18n.t('validations.required')),
  name: yup.string().required(i18n.t('validations.required')),
});

export type FarmerCreateSchema = yup.InferType<typeof farmerCreateSchema>;
