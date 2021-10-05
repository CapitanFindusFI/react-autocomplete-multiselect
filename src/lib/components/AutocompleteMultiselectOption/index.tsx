import React, { useState } from "react";
import { OptionComponentProps } from "../../types";
import * as S from "./styles";

const defaultLabelRenderer = ({ item }: any) => JSON.stringify(item);
const defaultItemRender = ({ item }: any) => (
  <span>{defaultLabelRenderer({ item })}</span>
);

const AutocompleteMultiselectOption: React.FC<OptionComponentProps> = ({
  item,
  customCSS,
  isDisabled = false,
  onSelected,
  renderItem,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(item._selected);

  const onItemSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    if(isDisabled){
      return
    }
    e.preventDefault();
    setIsSelected(!isSelected);
    if (onSelected && typeof onSelected === "function") onSelected(item);
  };

  const itemRenderFn = renderItem ? renderItem : defaultItemRender;

  return (
    <S.Item
      isDisabled={isDisabled}
      isSelected={isSelected}
      style={customCSS}
      onClick={onItemSelect}
    >
      {itemRenderFn({ item, disabled: isDisabled })}
    </S.Item>
  );
};

AutocompleteMultiselectOption.defaultProps = {
  isDisabled: false,
  customCSS: {},
};

export default AutocompleteMultiselectOption;
