import React, { useEffect, useState } from "react";
import { InputComponentProps } from "../../types";
import * as S from "./styles";

const AutocompleteMultiselectInput: React.FC<InputComponentProps> = ({
  customCSS,
  placeholder,
  onChange,
  onInputBlur,
  onInputFocus,
  clearButton,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (onInputBlur && typeof onInputBlur === "function") onInputBlur(e);
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (onInputFocus && typeof onInputFocus === "function") onInputFocus(e);
  };
  const onClearClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setInputValue("");
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    setInputValue(currentTarget.value);
  };
  const defaultClearButton = !inputValue.length ? null : (
    <S.ClearInput onClick={onClearClick}>X</S.ClearInput>
  );

  useEffect(() => {
    if (onChange && typeof onChange === "function") onChange(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const clearButtonEl = clearButton
    ? clearButton(onClearClick, inputValue)
    : defaultClearButton;

  return (
    <S.InputContainer style={customCSS}>
      <S.InputElement
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onInputChange}
        value={inputValue}
        placeholder={placeholder}
      />
      {clearButtonEl}
    </S.InputContainer>
  );
};

AutocompleteMultiselectInput.defaultProps = {
  placeholder: "Write something here...",
  customCSS: {},
};

export default AutocompleteMultiselectInput;
