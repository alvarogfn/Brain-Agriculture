import type { ForwardedRef } from 'react';
import { forwardRef, memo, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { autoUpdate, offset, useFloating } from '@floating-ui/react';
import { useCombobox } from 'downshift';

import { useForkRef } from '@/hooks/use-fork-ref';
import { sameWidth } from '@/lib/floating-middlewares';

import type { ComboboxProps } from '.';

function Combobox<Item>(
  {
    defaultSelectedItem,
    floatingProps = {},
    isOpen,
    items,
    onIsOpenChange,
    renderInput,
    renderItem,
    renderMenu,
    selectedItem,
    ...props
  }: ComboboxProps<Item>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    ...downshift
  } = useCombobox<Item>({
    defaultSelectedItem,
    ...props,
    isOpen,
    items,
    selectedItem,
  });

  const { floatingStyles, refs } = useFloating({
    ...floatingProps,
    middleware: [sameWidth(), offset({ mainAxis: 5 })],
    whileElementsMounted: downshift.isOpen ? autoUpdate : undefined,
  });

  const forkedSelectRef = useForkRef(ref, refs.setReference);

  const labelElement = useMemo(
    () =>
      renderInput({
        getInputProps: (inputProps) =>
          getInputProps({
            ...inputProps,
            ref: forkedSelectRef,
          }),
        getLabelProps,
        getToggleButtonProps,
        isOpen: downshift.isOpen,
        selectedItem: downshift.selectedItem,
      }),
    [
      renderInput,
      getLabelProps,
      getToggleButtonProps,
      forkedSelectRef,
      downshift.isOpen,
      downshift.selectedItem,
    ],
  );

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
          isHighlighted: downshift.highlightedIndex === index,
          item,
          selectedItem: downshift.selectedItem,
        }),
      ),
    [
      items,
      renderItem,
      getItemProps,
      downshift.selectedItem,
      downshift.highlightedIndex,
    ],
  );

  const menuElement = useMemo(
    () =>
      renderMenu({
        children: itemsElement,
        getMenuProps: (menuProps = {}) =>
          getMenuProps({
            ...menuProps,
            ref: refs.setFloating,
            style: floatingStyles,
          }),
        isOpen: downshift.isOpen,
      }),
    [
      downshift.isOpen,
      itemsElement,
      getMenuProps,
      floatingStyles,
      refs.setFloating,
      renderMenu,
    ],
  );

  return (
    <>
      {labelElement}
      {createPortal(menuElement, document.body)}
    </>
  );
}

export default memo(forwardRef(Combobox)) as typeof Combobox;
