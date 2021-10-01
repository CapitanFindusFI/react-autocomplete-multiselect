import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SelectComponentProps } from "../../types";
import { getItemIndex, isItemInList } from "../../utils";
import AutocompleteMultiselectInput from "../AutocompleteMultiselectInput";
import AutocompleteMultiselectLoader from "../AutocompleteMultiselectLoader";
import AutocompleteMultiselectOption from "../AutocompleteMultiselectOption";
import * as S from "./styles";

const AutocompleteMultiselect: React.FC<SelectComponentProps> = ({
  customSelectCSS,
  customOptionCSS,
  customInputCSS,
  customLoader,
  showDefaultLoader,
  searchFunction,
  itemKeyFunction,
  renderItem,
}) => {
  const [showingItems, setShowingItems] = useState<any>([]);
  const [availableItems, setAvailableItems] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onInputChange = (value: string) => setSearchValue(value);

  const getItemKey = useCallback(
    (item: any) => {
      return itemKeyFunction ? itemKeyFunction(item) : JSON.stringify(item);
    },
    [itemKeyFunction]
  );

  const listLoader: JSX.Element | null = useMemo(() => {
    if (!customLoader && !showDefaultLoader) return null;
    return customLoader ? customLoader : null;
  }, [customLoader, showDefaultLoader]);

  const updateSelectedItems = (itemIndex: number) => {
    const newSelectedItems = selectedItems.slice();
    const targetItem = showingItems[itemIndex];
    targetItem._selected = !targetItem._selected;
    if (targetItem._selected) {
      setSelectedItems([...newSelectedItems, targetItem]);
    } else {
      newSelectedItems.splice(itemIndex, 1);
      setSelectedItems(newSelectedItems);
    }
  };

  const onItemSelected = (item: any) => {
    const newItems = showingItems.slice();
    const itemIndex = getItemIndex(newItems, item);
    updateSelectedItems(itemIndex);
  };

  const doSearch = useCallback(
    async (searchValue: string) => {
      setIsLoading(true);
      try {
        const httpList = await searchFunction(searchValue);
        const itemsList = httpList.map((el: any) => ({
          ...el,
          _key: getItemKey(el),
        }));
        setAvailableItems(itemsList);
      } catch (e) {
        console.error(e);
        setAvailableItems([]);
      } finally {
        setIsLoading(false);
      }
    },
    [searchFunction, getItemKey]
  );

  useEffect(() => {
    if (!searchValue) {
      setAvailableItems([]);
    } else {
      doSearch(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    const mappedItems = availableItems.map((item: any) => {
      const alreadySelected = isItemInList(selectedItems, item);
      return {
        ...item,
        _selected: alreadySelected,
      };
    });
    setShowingItems(mappedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableItems]);

  const itemsList = !showingItems.length
    ? null
    : showingItems.map((item: any) => (
        <AutocompleteMultiselectOption
          key={item._key}
          item={item}
          renderItem={renderItem}
          onSelected={onItemSelected}
        />
      ));

  const selectedCounter = !selectedItems.length ? null : (
    <span>{selectedItems.length} selected</span>
  );

  const selectOptions = isLoading ? (
    listLoader
  ) : (
    <S.OptionsWrapper>{itemsList}</S.OptionsWrapper>
  );

  return (
    <S.Wrapper style={customSelectCSS}>
      <AutocompleteMultiselectInput onChange={onInputChange} />
      {selectedCounter}
      {selectOptions}
    </S.Wrapper>
  );
};

AutocompleteMultiselect.defaultProps = {
  customSelectCSS: {},
  customOptionCSS: {},
  customInputCSS: {},
  customLoader: <AutocompleteMultiselectLoader />,
  showDefaultLoader: true,
};

export default AutocompleteMultiselect;
