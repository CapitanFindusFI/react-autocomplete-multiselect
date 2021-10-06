import React, { useEffect, useState } from "react";
import { OptionComponentProps } from "../../types";
import * as S from "./styles";

const defaultLabelRenderer = ({ item }: any) => JSON.stringify(item);
const defaultItemRender = ({ item }: any) => (
  <span>{defaultLabelRenderer({ item })}</span>
);

const AutocompleteMultiselectOption: React.FC<OptionComponentProps> = ({
  item,
  isSelectingDisabled = false,
  onSelected,
  renderItem,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(item._selected);
  const [isDisabled, setIsDisabled] = useState<boolean>(isSelectingDisabled);

  const onItemSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    setIsSelected(!isSelected);
    if (onSelected && typeof onSelected === "function") onSelected(item);
  };

  const itemRenderFn = renderItem ? renderItem : defaultItemRender;

  useEffect(() => {
    isSelected ? setIsDisabled(false) : setIsDisabled(isSelectingDisabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectingDisabled]);

  return (
    <S.Item
      isDisabled={isDisabled}
      isSelected={isSelected}
      onClick={onItemSelect}
    >
      {itemRenderFn({ item, selected: isSelected, disabled: isDisabled })}
    </S.Item>
  );
};

AutocompleteMultiselectOption.defaultProps = {
  isSelectingDisabled: false,
};

export default AutocompleteMultiselectOption;
