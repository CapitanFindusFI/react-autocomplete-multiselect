import React from "react";
import { ConfirmComponentProps } from "../../types";
import * as S from "./styles";

const AutocompleteMultiselectConfirm: React.FC<ConfirmComponentProps> = ({
  label,
  isDisabled = false,
  onSubmit,
}) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    if (onSubmit && typeof onSubmit === "function") onSubmit();
  };

  return (
    <S.Confirm
      onClick={onButtonClick}
      isDisabled={isDisabled}
      disabled={isDisabled}
    >
      {label}
    </S.Confirm>
  );
};

AutocompleteMultiselectConfirm.defaultProps = {
  label: "Confirm",
  isDisabled: false,
};

export default AutocompleteMultiselectConfirm;
