import type { ChangeEvent } from 'react';
import { memo, useState } from 'react';
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
  itemToKey = String,
  itemToString = String,
  label,
  name,
  onInputValueChange,
  onSelectedItemChange,
  placeholder,
}: FieldFormComboboxProps<FormValues, Item>) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
            setInputValue(itemToString(selectedItem));
            if (onSelectedItemChange) onSelectedItemChange(selectedItem);
          }}
          renderInput={({ getInputProps, getLabelProps }) => {
            return (
              <Input
                {...getInputProps({
                  ...field,
                  onChange: handleChange,
                  value: inputValue,
                })}
                label={label}
                labelProps={getLabelProps()}
                placeholder={placeholder}
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
              key={itemToKey(item)}
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
