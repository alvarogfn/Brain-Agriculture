import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import type { MultiSelectProps } from '@/components/multi-select';

export type FieldFormMultiSelectProps<FormValues extends FieldValues, Item> = {
  control: Control<FormValues>;
  defaultSelectedItem?: Item;
  disabled?: boolean;
  label: string;
  name: FieldPath<FormValues>;
  onInputValueChange?: (value: string) => void;
  onSelectedItemsChange?: (item: Item[]) => void;
  placeholder?: string;
  type?: 'multi-select';
} & Omit<
  MultiSelectProps<Item>,
  | 'defaultSelectedItems'
  | 'onInputValueChange'
  | 'onSelectedItemsChange'
  | 'renderInput'
  | 'renderItem'
  | 'renderLabel'
  | 'renderMenu'
  | 'selectedItems'
>;
