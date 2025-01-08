import type { ComponentType } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import type { FieldFormComboboxProps } from './field-form-combobox';
import type { FieldFormMaskProps } from './field-form-mask';
import type { FieldFormMultiSelectProps } from './field-form-multi-select';
import type { FieldFormTextProps } from './field-form-text';

type FieldFormKeys = 'combobox' | 'mask' | 'multi-select' | 'text';

export type FieldFormTypes = Record<FieldFormKeys, ComponentType<any>>;

export type FieldFormProps<
  FormValues extends FieldValues,
  GenericOne = never,
> = {
  control: Control<FormValues>;
  label: string;
  name: Path<FormValues>;
  type?: FieldFormKeys;
} & (
  | FieldFormComboboxProps<FormValues, GenericOne>
  | FieldFormMaskProps<FormValues>
  | FieldFormMultiSelectProps<FormValues, GenericOne>
  | FieldFormTextProps<FormValues>
);
