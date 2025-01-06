import type { ForwardedRef } from 'react';
import { forwardRef, memo, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { autoUpdate, offset, useFloating } from '@floating-ui/react';
import { useCombobox, useMultipleSelection } from 'downshift';

import { useForkRef } from '@/hooks/use-fork-ref';
import { sameWidth } from '@/lib/floating-middlewares';

import type { MultiSelectProps } from './types';

function MultiSelect<Item>(
  {
    defaultSelectedItems,
    floatingProps = {},
    inputValue,
    isOpen,
    items,
    itemToKey,
    itemToString,
    onHighlightedIndexChange,
    onInputValueChange,
    onIsOpenChange,
    onSelectedItemsChange,
    renderInput,
    renderItem,
    renderMenu,
    selectedItems,
  }: MultiSelectProps<Item>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    addSelectedItem,
    getDropdownProps,
    getSelectedItemProps,
    removeSelectedItem,
    selectedItems: controlledSelectedItems,
  } = useMultipleSelection<Item>({
    defaultSelectedItems,
    onSelectedItemsChange,
    selectedItems,
  });

  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    setInputValue,
    ...combobox
  } = useCombobox<Item>({
    defaultHighlightedIndex: 0,
    inputValue,
    isOpen,
    items,
    itemToKey,
    itemToString,
    onHighlightedIndexChange,
    onInputValueChange,
    onIsOpenChange,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) addSelectedItem(selectedItem);
    },
    selectedItem: null,
    stateReducer: (_, { changes, type }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick: {
          return {
            ...changes,
            highlightedIndex: 0,
            inputValue: '',
            isOpen: true,
          };
        }
        default: {
          return changes;
        }
      }
    },
  });

  const { floatingStyles, refs } = useFloating({
    ...floatingProps,
    middleware: [sameWidth(), offset({ mainAxis: 5 })],
    whileElementsMounted: combobox.isOpen ? autoUpdate : undefined,
  });

  const forkedSelectRef = useForkRef(ref, refs.setReference);

  const inputElement = useMemo(() => {
    return renderInput({
      getInputProps: (inputProps) => {
        return getInputProps({
          ...getDropdownProps({
            ...inputProps,
            preventKeyAction: combobox.isOpen,
            ref: forkedSelectRef,
          }),
        });
      },
      getLabelProps,
      getSelectedItemProps,
      getToggleButtonProps,
      isOpen: combobox.isOpen,
      removeSelectedItem,
      selectedItems: controlledSelectedItems,
    });
  }, [
    renderInput,
    getLabelProps,
    getToggleButtonProps,
    forkedSelectRef,
    combobox.isOpen,
    removeSelectedItem,
    controlledSelectedItems,
    getDropdownProps,
  ]);

  const itemsElement = useMemo(
    () =>
      items.map((item, index) =>
        renderItem({
          getItemProps: (itemProps) =>
            getItemProps({
              ...itemProps,
              index,
              item,
            }),
          isHighlighted: combobox.highlightedIndex === index,
          item,
          selectedItems: controlledSelectedItems,
        }),
      ),
    [
      items,
      renderItem,
      getItemProps,
      combobox.highlightedIndex,
      controlledSelectedItems,
    ],
  );

  const menuElement = useMemo(() => {
    return renderMenu({
      children: itemsElement,
      getMenuProps: (menuProps = {}) => {
        return getMenuProps({
          ...menuProps,
          ref: refs.setFloating,
          style: floatingStyles,
        });
      },
      isOpen: combobox.isOpen,
    });
  }, [
    combobox.isOpen,
    itemsElement,
    getMenuProps,
    floatingStyles,
    refs.setFloating,
    renderMenu,
  ]);

  return (
    <>
      {inputElement}
      {createPortal(menuElement, document.body)}
    </>
  );
}

export default memo(forwardRef(MultiSelect)) as typeof MultiSelect;
