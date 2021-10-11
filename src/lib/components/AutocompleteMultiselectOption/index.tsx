import React, { useEffect, useState } from "react";
import { OptionComponentProps } from "../../types";
import * as S from "./styles";

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

  const itemNode =
    renderItem && typeof renderItem === "function" ? (
      renderItem({ item, selected: isSelected, disabled: isDisabled })
    ) : (
      <S.Content>{JSON.stringify(item)}</S.Content>
    );

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
      {itemNode}
    </S.Item>
  );
};

AutocompleteMultiselectOption.defaultProps = {
  isDisabled: false,
};

export default AutocompleteMultiselectOption;
