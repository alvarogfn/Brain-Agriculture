import type { ForwardedRef, ReactNode } from 'react';

import type { UseFloatingOptions } from '@floating-ui/react';
import type {
  UseMultipleSelectionSelectedItemsChange,
  UseComboboxHighlightedIndexChange,
  UseComboboxIsOpenChange,
  UseComboboxInputValueChange,
  UseMultipleSelectionGetSelectedItemPropsOptions as GetSelectedItemProps,
} from 'downshift';

export type RecordKey = number | string | symbol;

type GetPropsFunction = (
  props?: Record<RecordKey, unknown>,
) => Record<RecordKey, unknown>;

export interface MultiSelectRenderInputProps<Item> {
  [k: string]: unknown;
  getInputProps: GetPropsFunction;
  getLabelProps: GetPropsFunction;

  getSelectedItemProps: (
    props: GetSelectedItemProps<Item>,
  ) => Record<RecordKey, unknown>;

  getToggleButtonProps: GetPropsFunction;
  isOpen: boolean;
  removeSelectedItem: (item: Item) => void;
  selectedItems: Item[];
}

export interface MultiSelectRenderMenuProps {
  [k: string]: unknown;
  children: ReactNode;
  getMenuProps: GetPropsFunction;
  isOpen: boolean;
}

export interface MultiSelectRenderItemProps<Item> {
  [k: string]: unknown;

  getItemProps: GetPropsFunction;
  isHighlighted: boolean;
  item: Item;
  selectedItems: Item[] | null;
}

export interface MultiSelectProps<Item> {
  defaultSelectedItems?: Item[];
  floatingProps?: UseFloatingOptions;
  inputValue?: string;
  isOpen?: boolean;
  items: Item[];
  itemToKey?: (item: Item | null) => number | string;
  itemToString?: (item: Item | null) => string;
  onHighlightedIndexChange?: (
    changes: UseComboboxHighlightedIndexChange<Item>,
  ) => void;
  onInputValueChange?: (changes: UseComboboxInputValueChange<Item>) => void;
  onIsOpenChange?: (changes: UseComboboxIsOpenChange<Item>) => void;
  onSelectedItemsChange?: (
    changes: UseMultipleSelectionSelectedItemsChange<Item>,
  ) => void;
  ref?: ForwardedRef<HTMLInputElement>;
  renderInput: (props: MultiSelectRenderInputProps<Item>) => ReactNode;
  renderItem: (props: MultiSelectRenderItemProps<Item>) => ReactNode;
  renderMenu: (props: MultiSelectRenderMenuProps) => ReactNode;
  selectedItems?: Item[];
}
