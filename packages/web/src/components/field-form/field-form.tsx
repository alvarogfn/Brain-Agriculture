import { memo, useMemo } from 'react';
import type { FieldValues } from 'react-hook-form';

import { FieldFormCombobox } from './field-form-combobox';
import { FieldFormMask } from './field-form-mask';
import { FieldFormMultiSelect } from './field-form-multi-select';
import { FieldFormText } from './field-form-text';

import type { FieldFormProps, FieldFormTypes } from '.';

const types: FieldFormTypes = {
  combobox: FieldFormCombobox,
  mask: FieldFormMask,
  'multi-select': FieldFormMultiSelect,
  text: FieldFormText,
};

function FieldForm<FormValues extends FieldValues, GenericOne>({
  label = '',
  name,
  type = 'text',
  ...props
}: FieldFormProps<FormValues, GenericOne>) {
  const Comp = useMemo(() => types[type], [type]);

  return <Comp label={label} {...props} name={name} />;
}

export default memo(FieldForm) as typeof FieldForm;
