import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { SelectComponentProps } from "../types";
import { getItemIndex, isItemInList } from "../utils";
import AutocompleteMultiselectConfirm from "./AutocompleteMultiselectConfirm";
import AutocompleteMultiselectInput from "./AutocompleteMultiselectInput";
import AutocompleteMultiselectLoader from "./AutocompleteMultiselectLoader";
import AutocompleteMultiselectOption from "./AutocompleteMultiselectOption";
import * as S from "./styles";

const onSearch$ = new Subject();

const AutocompleteMultiselect: React.FC<SelectComponentProps> = ({
  customSelectCSS,
  customOptionCSS,
  customInputCSS,
  customLoader,
  showDefaultLoader,
  searchDebounce,
  selectionMin = -1,
  selectionMax = -1,
  customCounter,
  customClearButton,
  customConfirmButton,
  onConfirm,
  searchFunction,
  itemKeyFunction,
  renderItem,
  onInputFocus,
  onInputBlur,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelectingDisabled, setSelectingDisabled] = useState<boolean>(false);
  const [isConfirmingDisabled, setConfirmingDisabled] =
    useState<boolean>(false);

  const [showingItems, setShowingItems] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const getItemKey = useCallback(
    (item: any) =>
      itemKeyFunction ? itemKeyFunction(item) : JSON.stringify(item),
    [itemKeyFunction]
  );

  const doSearch = useCallback(
    async (searchValue: string) => {
      if (!searchValue) {
        setAvailableItems([]);
      } else {
        setIsLoading(true);
        try {
          const _remap = (el: any) => ({ ...el, _key: getItemKey(el) });
          const httpList = await searchFunction(searchValue).then(
            (list: any[]) => list.map(_remap)
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

  const doConfirm = useCallback(() => {
    if (onConfirm && typeof onConfirm === "function") onConfirm(selectedItems);
  }, [selectedItems, onConfirm]);

  useEffect(() => {
    const debounceMs = searchDebounce || 300;
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

  useEffect(() => {
    let [disableSelect, disableConfirm] = [false, false];
    const howManySelected = selectedItems.length;
    if (selectionMin > -1 && howManySelected < selectionMin) {
      disableConfirm = true;
    } else if (selectionMax > -1 && howManySelected === selectionMax) {
      disableSelect = true;
    }
    setConfirmingDisabled(disableConfirm);
    setSelectingDisabled(disableSelect);
  }, [selectedItems, selectionMax, selectionMin]);

  const onInputChange = (value: string) => onSearch$.next(value);

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
    if (isSelectingDisabled){
      return
    }
    const newItems = showingItems.slice();
    const itemIndex = getItemIndex(newItems, item);
    updateSelectedItems(itemIndex);
  };

  const itemsList = !showingItems.length
    ? null
    : showingItems.map((item: any) => (
        <AutocompleteMultiselectOption
          key={item._key}
          item={item}
          customCSS={customOptionCSS}
          isDisabled={isSelectingDisabled}
          renderItem={renderItem}
          onSelected={onItemSelected}
        />
      ));

  const defaultSelectConfirm = !selectedItems.length ? null : (
    <AutocompleteMultiselectConfirm
      isDisabled={isConfirmingDisabled}
      onSubmit={doConfirm}
    />
  );

  const selectConfirm: JSX.Element | null = useMemo(() => {
    if (customConfirmButton && typeof customConfirmButton === "function") {
      return customConfirmButton(doConfirm, isConfirmingDisabled);
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customConfirmButton]);

  const defaultSelectCounter = !selectedItems.length ? null : (
    <span>{selectedItems.length} selected</span>
  );

  const selectCounter: JSX.Element | null = useMemo(() => {
    if (customCounter && typeof customCounter === "function") {
      return customCounter(selectedItems);
    }
    return null;
  }, [selectedItems, customCounter]);

  const selectLoader: JSX.Element | null = useMemo(() => {
    if (!customLoader && !showDefaultLoader) return null;
    return customLoader ? customLoader : null;
  }, [customLoader, showDefaultLoader]);

  const selectInput: JSX.Element = useMemo(() => {
    return (
      <AutocompleteMultiselectInput
        customCSS={customInputCSS}
        onChange={onInputChange}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
        customClearButton={customClearButton}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customInputCSS, customClearButton]);

  const selectOptions = isLoading ? (
    selectLoader
  ) : (
    <S.OptionsWrapper>{itemsList}</S.OptionsWrapper>
  );

  return (
    <S.Wrapper style={customSelectCSS}>
      {selectInput}
      {selectCounter || defaultSelectCounter}
      {selectOptions}
      {selectConfirm || defaultSelectConfirm}
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
  selectionMin: -1,
  selectionMax: -1,
};

export default AutocompleteMultiselect;