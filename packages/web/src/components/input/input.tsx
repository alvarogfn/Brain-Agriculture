import type { ForwardedRef } from 'react';
import { forwardRef, useId } from 'react';

import {
  StyledInput,
  StyledLabel,
  StyledHelperText,
  StyledContainer,
} from './styles';

import type { InputProps } from '.';

function Input(
  {
    $variant,
    containerProps,
    helperText,
    id,
    label,
    labelProps,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const automaticId = useId();
  const helperTextId = useId();

  return (
    <StyledContainer>
      <StyledLabel {...labelProps} htmlFor={id ?? automaticId}>
        {label}
      </StyledLabel>
      <StyledInput
        $variant={$variant}
        aria-describedby={helperText && helperTextId}
        id={id ?? automaticId}
        ref={ref}
        {...props}
      />
      {helperText && (
        <StyledHelperText id={helperTextId}>{helperText}</StyledHelperText>
      )}
    </StyledContainer>
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
