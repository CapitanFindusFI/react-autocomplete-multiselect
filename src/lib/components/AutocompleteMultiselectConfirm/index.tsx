import React from "react";
import { ConfirmComponentProps } from "../../types";
import * as S from "./styles";

const AutocompleteMultiselectConfirm: React.FC<ConfirmComponentProps> = ({
  label,
  isDisabled = false,
  customCSS,
  onSubmit,
}) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDisabled) return null;
    if (onSubmit && typeof onSubmit === "function") onSubmit();
  };

  return (
    <S.Confirm
      onClick={onButtonClick}
      isDisabled={isDisabled}
      disabled={isDisabled}
      style={customCSS}
    >
      {label}
    </S.Confirm>
  );
};

AutocompleteMultiselectConfirm.defaultProps = {
  label: "Confirm",
  isDisabled: false,
  customCSS: {},
};

export default AutocompleteMultiselectConfirm;
