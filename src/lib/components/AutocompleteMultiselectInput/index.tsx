import React, { useEffect, useMemo, useState } from "react";
import { InputComponentProps } from "../../types";
import * as S from "./styles";

const AutocompleteMultiselectInput: React.FC<InputComponentProps> = ({
  placeholder,
  onChange,
  customClearButton,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

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
      return customClearButton({ onClick: onClearClick, value: inputValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customClearButton]);

  useEffect(() => {
    if (onChange && typeof onChange === "function") onChange(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <S.InputContainer>
      <S.InputElement
        onChange={onInputChange}
        value={inputValue}
        placeholder={placeholder}
      />
      {clearButtonEl || defaultClearButton}
    </S.InputContainer>
  );
};

export default AutocompleteMultiselectInput;
