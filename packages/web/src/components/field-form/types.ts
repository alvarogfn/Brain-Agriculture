import type { ComponentType } from 'react';
import type { Control, FieldName, FieldValues } from 'react-hook-form';

import type { FieldFormComboboxProps } from './field-form-combobox';
import type { FieldFormMaskProps } from './field-form-mask';
import type { FieldFormMultiSelectProps } from './field-form-multi-select';
import type { FieldFormTextProps } from './field-form-text';

type FieldFormKeys = 'combobox' | 'mask' | 'multi-select' | 'text';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldFormTypes = Record<FieldFormKeys, ComponentType<any>>;

export type FieldFormProps<
  FormValues extends FieldValues,
  GenericOne = never,
> = {
  control: Control<FormValues>;
  label: string;
  name: FieldName<FormValues>;
  type?: FieldFormKeys;
} & (
  | FieldFormComboboxProps<FormValues, GenericOne>
  | FieldFormMaskProps<FormValues>
  | FieldFormMultiSelectProps<FormValues, GenericOne>
  | FieldFormTextProps<FormValues>
);
