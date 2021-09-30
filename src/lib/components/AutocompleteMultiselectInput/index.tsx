import React, { useEffect, useState } from "react";
import { InputComponentProps } from "../../types";
import * as S from "./styles";

const AutocompleteMultiselectInput: React.FC<InputComponentProps> = ({
  customCSS,
  placeholder,
  onChange,
}) => {
  const [isInputFocused, setInputFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputFocused(false);
  };
  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputFocused(true);
  };
  const onClearClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setInputValue("");
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    setInputValue(currentTarget.value);
  };

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue]);

  const clearButton = !inputValue.length ? null : (
    <S.ClearInput onClick={onClearClick}>X</S.ClearInput>
  );

  return (
    <S.InputContainer
      style={customCSS}
      isFocused={inputValue.length > 0 || isInputFocused}
    >
      <S.InputElement
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        onChange={onInputChange}
        value={inputValue}
        placeholder={placeholder}
      />
      {clearButton}
    </S.InputContainer>
  );
};

AutocompleteMultiselectInput.defaultProps = {
  placeholder: "Write something here...",
  customCSS: {},
};

export default AutocompleteMultiselectInput;
