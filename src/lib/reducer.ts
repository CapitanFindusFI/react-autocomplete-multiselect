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
    case ActionType.SET_QUERY: {
      return {
        ...state,
        query: payload,
      };
    }
    case ActionType.DESELECT_ALL: {
      return {
        ...state,
        selectedItems: [],
        showingItems: showingItems.map((item: SelectItem<unknown>) => ({
          ...item,
          _selected: false,
        })),
      };
    }
    case ActionType.SELECT_ITEM: {
      const item = payload as SelectItem<unknown>;

      const _showingItems = showingItems.slice();
      const showingItemIndex = getItemIndex(_showingItems, item);

      const showingTargetItem = { ..._showingItems[showingItemIndex] };
      showingTargetItem._selected = !showingTargetItem._selected;
      _showingItems[showingItemIndex] = showingTargetItem;

      let _selectedItems;
      if (showingTargetItem._selected) {
        _selectedItems = [...selectedItems, showingTargetItem];
      } else {
        _selectedItems = selectedItems.slice();
        const selectedItemIndex = getItemIndex(_selectedItems, item);
        _selectedItems.splice(selectedItemIndex, 1);
      }

      return {
        ...state,
        selectedItems: _selectedItems,
        showingItems: _showingItems,
      };
    }
    case ActionType.DESELECT_ITEM: {
      const item = payload as SelectItem<unknown>

      const _selectedItems = selectedItems.slice();
      const unselectItemIndex = getItemIndex(_selectedItems, item);
      _selectedItems.splice(unselectItemIndex, 1);

      const _showingItems = showingItems.slice();
      const unselectShowingIndex = getItemIndex(_showingItems, item);
      if(unselectShowingIndex > -1){
        _showingItems[unselectShowingIndex]._selected = !_showingItems[unselectShowingIndex]._selected;
      }

      return {
        ...state,
        selectedItems: _selectedItems,
        showingItems: _showingItems
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
