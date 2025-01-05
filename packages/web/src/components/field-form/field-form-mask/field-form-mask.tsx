import type { Ref } from 'react';
import { memo, useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIMask } from 'react-imask';

import { Input } from '@/components/input';
import { useForkRef } from '@/hooks/use-fork-ref';

import type { FieldFormMaskProps } from '.';

function FieldFormMask<FormValues extends FieldValues>({
  $variant,
  control,
  disabled,
  helperText,
  maskOpts,
  name,
  onChange,
  onMasked,
  ...props
}: FieldFormMaskProps<FormValues>) {
  const handleFieldState = (errorMessage?: string) => ({
    helperText: errorMessage ?? helperText ?? '',
    variant: errorMessage || $variant === 'error' ? 'error' : 'default',
  });

  const { field, fieldState } = useController({ control, disabled, name });

  const { ref, unmaskedValue } = useIMask(maskOpts, {
    defaultValue: field.value,
    onAccept: (masked) => onMasked?.(masked),
  });

  const forkRef = useForkRef(field.ref, ref) as Ref<HTMLInputElement>;

  useEffect(() => {
    field.onChange(unmaskedValue);
  }, [field.onChange, unmaskedValue]);

  return (
    <Input
      {...props}
      disabled={field.disabled}
      name={field.name}
      onBlur={field.onBlur}
      ref={forkRef}
      {...handleFieldState(fieldState.error?.message)}
    />
  );
}

export default memo(FieldFormMask);
