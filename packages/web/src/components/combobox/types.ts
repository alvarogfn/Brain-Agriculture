import type { ForwardedRef, ReactNode } from 'react';

import type { UseFloatingOptions } from '@floating-ui/react';
import type {
  UseComboboxHighlightedIndexChange,
  UseComboboxInputValueChange,
  UseComboboxIsOpenChange,
  UseComboboxSelectedItemChange,
  UseComboboxStateChange,
} from 'downshift';

export type RecordKey = number | string | symbol;

export interface ComboboxRenderInputProps<Item> {
  [k: string]: unknown;
  getInputProps: (
    props?: Record<RecordKey, unknown>,
  ) => Record<RecordKey, unknown>;
  getLabelProps: (
    props?: Record<RecordKey, unknown>,
  ) => Record<RecordKey, unknown>;
  getToggleButtonProps: (
    props?: Record<RecordKey, unknown>,
  ) => Record<RecordKey, unknown>;
  isOpen: boolean;
  selectedItem: Item | null;
}

export interface ComboboxRenderMenuProps {
  [k: string]: unknown;
  children: ReactNode;
  getMenuProps: (
    props?: Record<RecordKey, unknown>,
  ) => Record<RecordKey, unknown>;
  isOpen: boolean;
}

export interface ComboboxRenderItemProps<Item> {
  [k: string]: unknown;

  getItemProps: (
    props?: Record<RecordKey, unknown>,
  ) => Record<RecordKey, unknown>;
  isHighlighted: boolean;
  item: Item;
  selectedItem: Item | null;
}

export interface ComboboxProps<Item> {
  defaultSelectedItem?: Item | null;
  floatingProps?: UseFloatingOptions;
  inputValue?: string;
  isItemDisabled?: (item: Item, index: number) => boolean;
  isOpen?: boolean;
  items: Item[];
  itemToKey?: (item: Item | null) => number | string;
  itemToString?: (item: Item | null) => string;
  onHighlightedIndexChange?: (
    changes: UseComboboxHighlightedIndexChange<Item>,
  ) => void;
  onInputValueChange?: (changes: UseComboboxInputValueChange<Item>) => void;
  onIsOpenChange?: (changes: UseComboboxIsOpenChange<Item>) => void;
  onSelectedItemChange?: (changes: UseComboboxSelectedItemChange<Item>) => void;
  onStateChange?: (changes: UseComboboxStateChange<Item>) => void;
  ref?: ForwardedRef<HTMLInputElement>;
  renderInput: (props: ComboboxRenderInputProps<Item>) => ReactNode;
  renderItem: (props: ComboboxRenderItemProps<Item>) => ReactNode;
  renderMenu: (props: ComboboxRenderMenuProps) => ReactNode;
  selectedItem?: Item | null;
}
