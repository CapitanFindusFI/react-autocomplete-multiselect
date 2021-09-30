import React, { useState } from "react";
import { OptionComponentProps } from "../../types";
import * as S from "./styles";

const defaultLabelRenderer = ({ item }: any) => JSON.stringify(item);

const AutocompleteMultiselectOption: React.FC<OptionComponentProps> = ({
  item,
  customCSS,
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
    : ({ item, isSelected }: any) => <span>{itemTextRenderFn({ item })}</span>;

  return (
    <S.Wrapper style={customCSS}>
      <S.Item isSelected={isSelected} onClick={onItemSelect}>
        {itemRenderFn({ item, selected: item._selected })}
      </S.Item>
    </S.Wrapper>
  );
};

AutocompleteMultiselectOption.defaultProps = {
  customCSS: {},
  renderProperty: defaultLabelRenderer,
};

export default AutocompleteMultiselectOption;
