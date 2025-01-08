import type { FieldValues } from 'react-hook-form';

import type { FarmerFindAllResponseContent } from 'brain-agriculture-backend-types';

import type { FieldFormComboboxProps } from '../field-form/field-form-combobox/types';

export type FieldFormFarmerProps<FormValues extends FieldValues> = Omit<
  FieldFormComboboxProps<FormValues, FarmerFindAllResponseContent>,
  'items' | 'itemToString' | 'onInputValueChange' | 'onSelectedItemChange'
>;
