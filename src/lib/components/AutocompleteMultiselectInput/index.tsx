import React, { useEffect, useMemo, useState } from "react";
import { InputComponentProps } from "../../types";
import * as S from "./styles";

const AutocompleteMultiselectInput: React.FC<InputComponentProps> = ({
  placeholder,
  onChange,
  onInputBlur,
  onInputFocus,
  customClearButton,
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

  const clearButtonEl = useMemo(() => {
    if (customClearButton && typeof customClearButton === "function")
      return customClearButton(onClearClick, inputValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customClearButton]);

  useEffect(() => {
    if (onChange && typeof onChange === "function") onChange(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <S.InputContainer>
      <S.InputElement
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onInputChange}
        value={inputValue}
        placeholder={placeholder}
      />
      {clearButtonEl || defaultClearButton}
    </S.InputContainer>
  );
};

export default AutocompleteMultiselectInput;
