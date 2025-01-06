import * as yup from 'yup';

import i18n from '@/i18n';

import { comboboxOption } from './combobox-option';

export const farmCreateSchema = yup.object({
  arableArea: yup.number().required(),
  farmArea: yup
    .number()
    .required()
    .when(
      ['arableArea', 'vegetationArea'],
      ([arableArea, vegetationArea], schema) => {
        const arableAreaNumber = Number(arableArea ?? '0');
        const vegetationAreaNumber = Number(vegetationArea ?? '0');

        return schema.moreThan(
          arableAreaNumber + vegetationAreaNumber - 1,
          i18n.t('validations.number.farmArea'),
        );
      },
    ),
  farmCity: yup.string().required(),
  farmName: yup.string().required(),
  farmOwner: comboboxOption.default(null).required(),
  farmState: yup.string().required(),
  vegetationArea: yup.number().required(),
});

export type FarmCreateSchema = yup.InferType<typeof farmCreateSchema>;
