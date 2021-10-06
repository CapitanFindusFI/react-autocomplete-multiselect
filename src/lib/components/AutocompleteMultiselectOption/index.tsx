import React, { useEffect, useState } from "react";
import { OptionComponentProps } from "../../types";
import * as S from "./styles";

const defaultLabelRenderer = ({ item }: any) => JSON.stringify(item);
const defaultItemRender = ({ item }: any) => (
  <S.Content>{defaultLabelRenderer({ item })}</S.Content>
);

const AutocompleteMultiselectOption: React.FC<OptionComponentProps> = ({
  item,
  isDisabled = false,
  onSelected,
  renderItem,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(item._selected);
  const [isSelectable, setIsSelectable] = useState<boolean>(true);

  const onItemSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (isSelectable) {
      setIsSelected(!isSelected);
      if (onSelected && typeof onSelected === "function") onSelected(item);
    }
  };

  const itemRenderFn = renderItem ? renderItem : defaultItemRender;

  useEffect(() => {
    const isNewSelectable = isSelected || (!isDisabled && !isSelected);
    setIsSelectable(isNewSelectable);
  }, [isDisabled, isSelected]);

  return (
    <S.Item
      isDisabled={!isSelectable}
      isSelected={isSelected}
      onClick={onItemSelect}
    >
      {itemRenderFn({ item, selected: isSelected, disabled: isDisabled })}
    </S.Item>
  );
};

AutocompleteMultiselectOption.defaultProps = {
  isDisabled: false,
};

export default AutocompleteMultiselectOption;
