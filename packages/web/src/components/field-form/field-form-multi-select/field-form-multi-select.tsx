import { memo } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Badge } from '@/components/badge';
import { Box } from '@/components/box';
import { Input } from '@/components/input';
import { Menu } from '@/components/menu';
import { MultiSelect } from '@/components/multi-select';
import type {
  MultiSelectRenderItemProps,
  MultiSelectRenderMenuProps,
} from '@/components/multi-select';

import { StyledBadgeList } from './styles';

import type { FieldFormMultiSelectProps } from '.';

function FieldFormMultiSelect<FormValues extends FieldValues, Item>({
  control,
  disabled,
  inputValue,
  items,
  itemToKey = String,
  itemToString = String,
  label,
  name,
  onInputValueChange,
  onSelectedItemsChange,
  placeholder,
  ...props
}: FieldFormMultiSelectProps<FormValues, Item>) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={name}
      render={({ field }) => {
        return (
          <MultiSelect<Item>
            {...props}
            defaultSelectedItems={field.value ?? []}
            inputValue={inputValue}
            items={items}
            itemToKey={itemToKey}
            itemToString={itemToString}
            onInputValueChange={({ inputValue }) => {
              if (onInputValueChange) onInputValueChange(inputValue);
            }}
            onSelectedItemsChange={({ selectedItems }) => {
              field.onChange(selectedItems);
              if (onSelectedItemsChange) onSelectedItemsChange(selectedItems);
            }}
            renderInput={({
              getInputProps,
              getLabelProps,
              getSelectedItemProps,
              removeSelectedItem,
              selectedItems,
            }) => {
              return (
                <Box>
                  <Input
                    {...getInputProps({
                      disabled: field.disabled,
                      name: field.name,
                      onBlur: field.onBlur,
                      ref: field.ref,
                    })}
                    containerProps={getLabelProps()}
                    label={label}
                    placeholder={placeholder}
                    value={inputValue}
                  />
                  <StyledBadgeList>
                    {selectedItems.map((selectedItem, index) => (
                      <Badge
                        as="li"
                        key={itemToString(selectedItem)}
                        {...getSelectedItemProps({ index, selectedItem })}
                        onRemove={() => removeSelectedItem(selectedItem)}
                        showRemoveButton
                      >
                        {itemToString(selectedItem)}
                      </Badge>
                    ))}
                  </StyledBadgeList>
                </Box>
              );
            }}
            renderItem={({
              getItemProps,
              isHighlighted,
              item,
              selectedItem,
            }: MultiSelectRenderItemProps<Item>) => (
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
            }: MultiSelectRenderMenuProps) => (
              <Menu
                visibility={isOpen ? 'visible' : 'hidden'}
                {...getMenuProps()}
              >
                {children}
              </Menu>
            )}
          />
        );
      }}
    />
  );
}

export default memo(FieldFormMultiSelect) as typeof FieldFormMultiSelect;
