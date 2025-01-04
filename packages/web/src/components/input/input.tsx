import type { ForwardedRef} from "react";
import { forwardRef, useRef } from "react";

import { useForkRef } from "@/hooks/use-fork-ref";

import { StyledInput, StyledSibling, StyledTextbox } from "./styles";

import type { InputProps } from ".";

function Input(
  {
    containerProps,
    "data-testid": datatestId = "input",
    hasError,
    id,
    prefix,
    suffix,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const input = useRef<HTMLInputElement | null>(null);

  const forkRef = useForkRef(input, ref);

  const handleFocus = () => {
    input.current?.focus();
  };

  return (
    <StyledTextbox
      data-testid={`${datatestId}-textbox`}
      hasError={hasError}
      onClick={handleFocus}
      {...containerProps}
    >
      {prefix && (
        <StyledSibling
          borderRightStyle="solid"
          data-testid={`${datatestId}-prefix`}
        >
          {prefix}
        </StyledSibling>
      )}
      <StyledInput data-testid={datatestId} id={id} ref={forkRef} {...props} />
      {suffix && (
        <StyledSibling
          borderLeftStyle="solid"
          data-testid={`${datatestId}-suffix`}
        >
          {suffix}
        </StyledSibling>
      )}
    </StyledTextbox>
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
