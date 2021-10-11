import * as ActionType from "./actions";
import { SelectItem, SelectReducerStateType, SelectReducerActionType } from "./types";
import { getItemIndex, isItemInList } from "./utils";

export function selectReducer(
  state: SelectReducerStateType,
  action: SelectReducerActionType
): SelectReducerStateType {
  const { selectedItems, showingItems, availableItems } = state;
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
      const newSelectedItems = selectedItems.slice();
      const item = payload as SelectItem<unknown>;
      const showingItemIndex = getItemIndex(showingItems, item);
      const showingTargetItem = showingItems[showingItemIndex];
      showingTargetItem._selected = !showingTargetItem._selected;
      showingTargetItem._visible = !showingTargetItem._visible;
      if (showingTargetItem._selected) {
        return {
          ...state,
          selectedItems: [...newSelectedItems, showingTargetItem],
        };
      } else {
        const selectedItemIndex = getItemIndex(newSelectedItems, item);
        newSelectedItems.splice(selectedItemIndex, 1);
        return {
          ...state,
          selectedItems: newSelectedItems,
        };
      }
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
