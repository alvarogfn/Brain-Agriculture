import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { useId } from 'react';

import {
  StyledInput,
  StyledLabel,
  StyledHelperText,
  StyledContainer,
} from './styles';

import type { InputProps } from '.';

function Input(
  {
    containerProps,
    $variant,
    helperText,
    labelProps,
    labelText,
    id,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const automaticId = useId();

  return (
    <StyledContainer>
      <StyledLabel {...labelProps} htmlFor={id ?? automaticId}>
        {labelText}
      </StyledLabel>
      <StyledInput
        $variant={$variant}
        id={id ?? automaticId}
        ref={ref}
        {...props}
      />
      {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
    </StyledContainer>
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
