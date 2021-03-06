import React, { useEffect, useState } from "react";
import { OptionComponentProps } from "../../types";
import * as S from "./styles";

const AutocompleteMultiselectOption: React.FC<OptionComponentProps> = ({
  item,
  query,
  isDisabled = false,
  onSelected,
  renderItem,
}) => {
  const [isSelectable, setIsSelectable] = useState<boolean>(true);

  const onItemSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (isSelectable) {
      if (onSelected && typeof onSelected === "function") onSelected(item);
    }
  };

  const itemNode = React.useMemo(() => {
    if (renderItem && typeof renderItem === "function") {
      return renderItem({
        item,
        selected: item._selected,
        disabled: isDisabled,
        query,
      });
    }

    return <S.Content>{JSON.stringify(item)}</S.Content>;
  }, [item, query, isDisabled, renderItem]);

  useEffect(() => {
    const isNewSelectable = item._selected || (!isDisabled && !item._selected);
    setIsSelectable(isNewSelectable);
  }, [isDisabled, item._selected]);

  return (
    <S.Item
      isDisabled={!isSelectable}
      isSelected={item._selected}
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
