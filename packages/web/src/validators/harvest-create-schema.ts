import * as yup from 'yup';

import i18n from '@/i18n';

import { comboboxOption } from './combobox-option';

export const harvestCreateSchema = yup.object({
  crops: yup
    .array()
    .of(comboboxOption)
    .required(i18n.t('validations.required')),
  farmName: comboboxOption.required(i18n.t('validations.required')),
  harvestName: yup.string().required(i18n.t('validations.required')),
  harvestYear: yup.number().required(i18n.t('validations.required')),
});

export type HarvestCreateSchema = yup.InferType<typeof harvestCreateSchema>;
