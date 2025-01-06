import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import type { ComboboxProps } from '@/components/combobox';

export type FieldFormComboboxProps<FormValues extends FieldValues, Item> = {
  control: Control<FormValues>;
  defaultSelectedItem?: Item;
  disabled?: boolean;
  label: string;
  name: FieldPath<FormValues>;
  onInputValueChange?: (value: string) => void;
  onSelectedItemChange?: (item: Item) => void;
  placeholder?: string;
  type?: 'combobox';
} & Omit<
  ComboboxProps<Item>,
  | 'defaultSelectedItem'
  | 'onInputValueChange'
  | 'onSelectedItemChange'
  | 'renderInput'
  | 'renderItem'
  | 'renderLabel'
  | 'renderMenu'
  | 'selectedItem'
>;
