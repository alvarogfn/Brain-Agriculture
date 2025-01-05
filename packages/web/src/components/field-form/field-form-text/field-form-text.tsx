import { memo } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Input } from '@/components/input';

import type { FieldFormTextProps } from '.';

function FieldFormText<FormValues extends FieldValues>({
  $variant,
  control,
  disabled,
  helperText,
  name,
  onChange,
  ...props
}: FieldFormTextProps<FormValues>) {
  const handleFieldState = (errorMessage?: string) => ({
    helperText: errorMessage ?? helperText ?? '',
    variant: errorMessage || $variant === 'error' ? 'error' : 'default',
  });

  return (
    <Controller
      control={control}
      disabled={disabled}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...props}
          {...field}
          {...handleFieldState(fieldState.error?.message)}
          onChange={(ev) => {
            if (onChange) onChange(ev);
            field.onChange(ev);
          }}
          type="text"
          value={field.value ?? ''}
        />
      )}
    />
  );
}

export default memo(FieldFormText);
