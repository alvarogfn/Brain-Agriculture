import type { ComponentType } from 'react';
import type { Control, FieldName, FieldValues } from 'react-hook-form';

import type { FieldFormMaskProps } from './field-form-mask';
import type { FieldFormTextProps } from './field-form-text';

type FieldFormKeys = 'mask' | 'text';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldFormTypes = Record<FieldFormKeys, ComponentType<any>>;

export type FieldFormProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  label: string;
  name: FieldName<FormValues>;
  type?: FieldFormKeys;
} & (FieldFormMaskProps<FormValues> | FieldFormTextProps<FormValues>);
