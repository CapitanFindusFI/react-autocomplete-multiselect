import React, { useState } from "react";
import { OptionComponentProps } from "../../types";
import * as S from "./styles";

const defaultLabelRenderer = ({ item }: any) => JSON.stringify(item);

const AutocompleteMultiselectOption: React.FC<OptionComponentProps> = ({
  item,
  customCSS,
  isDisabled = false,
  onSelected,
  renderItem,
  renderProperty,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(item._selected);

  const onItemSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsSelected(!isSelected);
    onSelected(item);
  };

  const itemTextRenderFn = renderProperty
    ? renderProperty
    : defaultLabelRenderer;

  const itemRenderFn = renderItem
    ? renderItem
    : ({ item, disabled }: any) => <span>{itemTextRenderFn({ item })}</span>;

  return (
    <S.Wrapper style={customCSS}>
      <S.Item
        isDisabled={isDisabled}
        isSelected={isSelected}
        onClick={onItemSelect}
      >
        {itemRenderFn({ item, disabled: isDisabled })}
      </S.Item>
    </S.Wrapper>
  );
};

AutocompleteMultiselectOption.defaultProps = {
  isDisabled: false,
  customCSS: {},
  renderProperty: defaultLabelRenderer,
};

export default AutocompleteMultiselectOption;
