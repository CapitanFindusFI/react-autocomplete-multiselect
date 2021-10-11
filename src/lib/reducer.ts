import * as ActionType from "./actions";
import {
  SelectItem,
  SelectReducerStateType,
  SelectReducerActionType,
} from "./types";
import { getItemIndex, isItemInList } from "./utils";

export function selectReducer(
  state: SelectReducerStateType,
  action: SelectReducerActionType
): SelectReducerStateType {
  const { selectedItems, showingItems } = state;
  const { type, payload } = action;
  if (!type) return state;

  switch (type) {
    case ActionType.SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionType.UNSET_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case ActionType.SELECT_ITEM: {
      const item = payload as SelectItem<unknown>;
      const newShowingItems = showingItems.slice();

      const showingItemIndex = getItemIndex(newShowingItems, item);
      const showingTargetItem = newShowingItems[showingItemIndex];

      showingTargetItem._selected = !showingTargetItem._selected;
      let _selectedItems;
      if (showingTargetItem._selected) {
        _selectedItems = [...selectedItems, showingTargetItem];
      } else {
        const newSelectedItems = selectedItems.slice();
        const selectedItemIndex = getItemIndex(newSelectedItems, item);
        newSelectedItems.splice(selectedItemIndex, 1);
        _selectedItems = [...newSelectedItems];
      }

      return {
        ...state,
        selectedItems: _selectedItems,
        showingItems: [...newShowingItems],
      };
    }
    case ActionType.SET_AVAILABLE_ITEMS: {
      const newAvailableItems = payload as SelectItem<unknown>[];
      let newShowingItems: SelectItem<unknown>[] = [];
      if (newAvailableItems.length) {
        newShowingItems = newAvailableItems.map((item: SelectItem<unknown>) => {
          const isAlreadySelected = isItemInList(selectedItems, item);
          return {
            ...item,
            _selected: isAlreadySelected,
            _visible: !isAlreadySelected,
          };
        });
      }
      return {
        ...state,
        availableItems: newAvailableItems,
        showingItems: newShowingItems,
      };
    }
    default:
      return state;
  }
}
