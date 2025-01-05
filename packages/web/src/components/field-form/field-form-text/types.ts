import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import type { InputProps } from '@/components/input';

export type FieldFormTextProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  disabled?: boolean;
  name: FieldPath<FormValues>;
  type?: 'text';
} & InputProps;
