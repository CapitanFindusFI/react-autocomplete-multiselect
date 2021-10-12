import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { selectReducer } from "../reducer";
import { SelectComponentProps, SelectItem } from "../types";
import AutocompleteMultiselectInput from "./AutocompleteMultiselectInput";
import AutocompleteMultiselectLoader from "./AutocompleteMultiselectLoader";
import AutocompleteMultiselectOption from "./AutocompleteMultiselectOption";
import * as ActionType from "../actions";
import * as S from "./styles";

const AutocompleteMultiselect: React.FC<SelectComponentProps> = ({
  customCSS,
  customLoader,
  showDefaultLoader,
  searchDebounce,
  selectionMin = -1,
  selectionMax = -1,
  inputPlaceholder,
  customInput,
  customCounter,
  customClearButton,
  onSelectionChange,
  searchFunction,
  itemKeyFunction,
  renderItem,
}) => {
  const [{ query, loading, showingItems, selectedItems }, dispatch] =
    React.useReducer(selectReducer, {
      query: "",
      loading: false,
      selectedItems: [],
      showingItems: [],
      availableItems: [],
    });

  const [isSelectingDisabled, setSelectingDisabled] = useState<boolean>(false);
  const debouncedSearch = useDebouncedCallback(
    (value) => doSearch(value),
    searchDebounce || 500
  );

  const getItemKey = useCallback(
    (item: any) =>
      itemKeyFunction ? itemKeyFunction(item) : JSON.stringify(item),
    [itemKeyFunction]
  );

  const doSearch = useCallback(
    async (searchValue: string) => {
      dispatch({ type: ActionType.SET_QUERY, payload: searchValue });
      if (!searchValue) {
        dispatch({ type: ActionType.SET_AVAILABLE_ITEMS, payload: [] });
      } else {
        dispatch({ type: ActionType.SET_LOADING });
        try {
          const _remap = (el: any) => ({ ...el, _key: getItemKey(el) });
          const httpList = await searchFunction(searchValue).then(
            (list: any[]) => list.map(_remap)
          );
          dispatch({ type: ActionType.SET_AVAILABLE_ITEMS, payload: httpList });
        } catch (e) {
          console.error(e);
          dispatch({ type: ActionType.SET_AVAILABLE_ITEMS, payload: [] });
        } finally {
          dispatch({ type: ActionType.UNSET_LOADING });
        }
      }
    },
    [searchFunction, getItemKey]
  );

  useEffect(() => {
    const howManySelected = selectedItems.length;
    let isSelectionValid = false;
    if (selectionMax === -1) {
      isSelectionValid = howManySelected >= selectionMin;
    } else if (selectionMin === -1) {
      isSelectionValid = howManySelected > 0;
    } else if (selectionMin > -1 && selectionMax > -1) {
      isSelectionValid =
        howManySelected >= selectionMin && howManySelected <= selectionMax;
    }

    const disableSelect = selectionMax > -1 && howManySelected === selectionMax;
    setSelectingDisabled(disableSelect);
    if (onSelectionChange && typeof onSelectionChange === "function")
      onSelectionChange({ selectedItems, valid: isSelectionValid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems, selectionMax, selectionMin]);

  const onClearSelection = () => dispatch({ type: ActionType.DESELECT_ALL });

  const onItemDeselected = (item: SelectItem<unknown>) =>
    dispatch({ type: ActionType.DESELECT_ITEM, payload: item });

  const onItemSelected = (item: any) =>
    dispatch({ type: ActionType.SELECT_ITEM, payload: item });

  const onInputChange = (value: string) => debouncedSearch(value);

  const itemsList = !showingItems.length
    ? null
    : showingItems.map((item: any) => (
        <AutocompleteMultiselectOption
          key={`${item._key}-option`}
          item={item}
          query={query}
          isDisabled={isSelectingDisabled}
          renderItem={renderItem}
          onSelected={onItemSelected}
        />
      ));

  const selectLoader: JSX.Element | null = useMemo(() => {
    if (!customLoader && !showDefaultLoader) return null;
    return customLoader ? customLoader : null;
  }, [customLoader, showDefaultLoader]);

  const defaultInput: JSX.Element = useMemo(() => {
    return (
      <AutocompleteMultiselectInput
        onChange={onInputChange}
        customClearButton={customClearButton}
        placeholder={inputPlaceholder}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customClearButton]);

  const selectInput: JSX.Element =
    customInput && typeof customInput === "function"
      ? customInput({
          onChange: onInputChange,
          clearSelection: onClearSelection,
        })
      : defaultInput;

  const selectCounter =
    customCounter && typeof customCounter === "function"
      ? customCounter({ selectedItems, onItemClick: onItemDeselected })
      : null;

  const selectOptions = loading ? (
    selectLoader
  ) : (
    <S.OptionsWrapper style={customCSS?.list || {}}>
      {itemsList}
    </S.OptionsWrapper>
  );

  return (
    <S.Wrapper style={customCSS?.container || {}}>
      {selectInput}
      {selectCounter}
      {selectOptions}
    </S.Wrapper>
  );
};

AutocompleteMultiselect.defaultProps = {
  customCSS: {
    container: {},
    list: {},
  },
  customLoader: <AutocompleteMultiselectLoader />,
  showDefaultLoader: true,
  searchDebounce: 300,
  selectionMin: -1,
  selectionMax: -1,
  inputPlaceholder: "Write something here...",
};

export default AutocompleteMultiselect;
