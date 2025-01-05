import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import type { useIMask } from 'react-imask';

import type { InputProps } from '@/components/input';

export type FieldFormMaskProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  disabled?: boolean;
  maskOpts: Parameters<typeof useIMask>['0'];
  name: FieldPath<FormValues>;
  onMasked?: (maskedValue: string) => void;
  type?: 'mask';
} & InputProps;
