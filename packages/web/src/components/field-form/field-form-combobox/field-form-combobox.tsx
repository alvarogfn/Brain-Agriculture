import { memo } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Combobox } from '@/components/combobox';
import type {
  ComboboxRenderItemProps,
  ComboboxRenderMenuProps,
} from '@/components/combobox';
import { Input } from '@/components/input';
import { Menu } from '@/components/menu';

import type { FieldFormComboboxProps } from '.';

function FieldFormCombobox<FormValues extends FieldValues, Item>({
  control,
  disabled,
  items,
  itemToString = String,
  label,
  name,
  onInputValueChange,
  onSelectedItemChange,
  placeholder,
}: FieldFormComboboxProps<FormValues, Item>) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <Combobox<Item>
          defaultSelectedItem={field.value}
          items={items}
          itemToString={itemToString}
          onInputValueChange={({ inputValue }) => {
            if (onInputValueChange) onInputValueChange(inputValue);
          }}
          onSelectedItemChange={({ selectedItem }) => {
            field.onChange(selectedItem);
            if (onSelectedItemChange) onSelectedItemChange(selectedItem);
          }}
          renderInput={({ getInputProps, getLabelProps, selectedItem }) => {
            return (
              <Input
                {...getInputProps({ ...field })}
                containerProps={getLabelProps()}
                label={label}
                name={name}
                placeholder={placeholder}
                value={itemToString(selectedItem) ?? ''}
              />
            );
          }}
          renderItem={({
            getItemProps,
            isHighlighted,
            item,
            selectedItem,
          }: ComboboxRenderItemProps<Item>) => (
            <Menu.Item
              aria-label={itemToString(item)}
              key={itemToString(item)}
              selected={item === selectedItem || isHighlighted}
              {...getItemProps()}
            >
              {itemToString(item)}
            </Menu.Item>
          )}
          renderMenu={({
            children,
            getMenuProps,
            isOpen,
          }: ComboboxRenderMenuProps) => (
            <Menu
              visibility={isOpen ? 'visible' : 'hidden'}
              {...getMenuProps()}
            >
              {children}
            </Menu>
          )}
          selectedItem={field.value ?? null}
        />
      )}
    />
  );
}

export default memo(FieldFormCombobox) as typeof FieldFormCombobox;
