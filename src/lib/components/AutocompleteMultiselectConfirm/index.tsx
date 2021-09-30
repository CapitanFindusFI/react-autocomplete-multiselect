import React from "react";
import { ConfirmComponentProps } from "../../types";
import * as S from "./styles";

const AutocompleteMultiselectConfirm: React.FC<ConfirmComponentProps> = ({
  label,
  customCSS,
  onSubmit,
}) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <S.Confirm onClick={onButtonClick} style={customCSS}>
      {label}
    </S.Confirm>
  );
};

AutocompleteMultiselectConfirm.defaultProps = {
  label: "Confirm",
  customCSS: {},
};

export default AutocompleteMultiselectConfirm;
