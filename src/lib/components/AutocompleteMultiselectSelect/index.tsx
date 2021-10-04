import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { SelectComponentProps } from "../../types";
import { getItemIndex, isItemInList } from "../../utils";
import AutocompleteMultiselectConfirm from "../AutocompleteMultiselectConfirm";
import AutocompleteMultiselectInput from "../AutocompleteMultiselectInput";
import AutocompleteMultiselectLoader from "../AutocompleteMultiselectLoader";
import AutocompleteMultiselectOption from "../AutocompleteMultiselectOption";
import * as S from "./styles";

const onSearch$ = new Subject();

const AutocompleteMultiselect: React.FC<SelectComponentProps> = ({
  customSelectCSS,
  customOptionCSS,
  customInputCSS,
  customLoader,
  showDefaultLoader,
  searchDebounce,
  onConfirm,
  searchFunction,
  itemKeyFunction,
  renderItem,
}) => {
  const [showingItems, setShowingItems] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getItemKey = useCallback(
    (item: any) => {
      return itemKeyFunction ? itemKeyFunction(item) : JSON.stringify(item);
    },
    [itemKeyFunction]
  );

  const doSearch = useCallback(
    async (searchValue: string) => {
      if (!searchValue) {
        setAvailableItems([]);
      } else {
        setIsLoading(true);
        try {
          const httpList = await searchFunction(searchValue).then(
            (list: any[]) => {
              return list.map((el: any) => ({
                ...el,
                _key: getItemKey(el),
              }));
            }
          );
          setAvailableItems(httpList);
        } catch (e) {
          console.error(e);
          setAvailableItems([]);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [searchFunction, setIsLoading, getItemKey]
  );

  useEffect(() => {
    const debounceMs = searchDebounce ? searchDebounce : 300;
    const searchSubscription = onSearch$
      .pipe(debounceTime(debounceMs))
      .subscribe((value) => doSearch(value as string));

    return () => {
      searchSubscription.unsubscribe();
    };
  }, [searchDebounce, doSearch]);

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

  const onInputChange = (value: string) => {
    onSearch$.next(value);
  };

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

  const listLoader: JSX.Element | null = useMemo(() => {
    if (!customLoader && !showDefaultLoader) return null;
    return customLoader ? customLoader : null;
  }, [customLoader, showDefaultLoader]);

  const itemsList = !showingItems.length
    ? null
    : showingItems.map((item: any) => (
        <AutocompleteMultiselectOption
          key={item._key}
          item={item}
          customCSS={customOptionCSS}
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

  const selectConfirm = !selectedItems.length ? null : (
    <AutocompleteMultiselectConfirm onSubmit={() => onConfirm(selectedItems)} />
  );

  return (
    <S.Wrapper style={customSelectCSS}>
      <AutocompleteMultiselectInput
        customCSS={customInputCSS}
        onChange={onInputChange}
      />
      {selectedCounter}
      {selectOptions}
      {selectConfirm}
    </S.Wrapper>
  );
};

AutocompleteMultiselect.defaultProps = {
  customSelectCSS: {},
  customOptionCSS: {},
  customInputCSS: {},
  customLoader: <AutocompleteMultiselectLoader />,
  showDefaultLoader: true,
  searchDebounce: 300,
};

export default AutocompleteMultiselect;
