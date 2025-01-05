import { memo, useMemo } from 'react';
import type { FieldValues } from 'react-hook-form';

import { FieldFormMask } from './field-form-mask';
import { FieldFormText } from './field-form-text';

import type { FieldFormProps, FieldFormTypes } from '.';

const types: FieldFormTypes = {
  mask: FieldFormMask,
  text: FieldFormText,
};

function FieldForm<FormValues extends FieldValues>({
  label = '',
  name,
  type = 'text',
  ...props
}: FieldFormProps<FormValues>) {
  const Comp = useMemo(() => types[type], [type]);

  return <Comp id={name} label={label} {...props} name={name} />;
}

export default memo(FieldForm) as typeof FieldForm;
