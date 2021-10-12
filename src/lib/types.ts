import { CSSProperties } from "styled-components";

export type SelectItem<T> = T & {
  _key: string;
  _selected: boolean;
  _visible: boolean;
};

export type SelectReducerStateType = {
  query: string;
  loading: boolean;
  selectedItems: SelectItem<unknown>[];
  showingItems: SelectItem<unknown>[];
  availableItems: SelectItem<unknown>[];
};

export type SelectReducerActionType = {
  type: string;
  payload?: any;
};

export type SelectComponentRenderItemFnProps = {
  item: any;
  selected: boolean;
  disabled: boolean;
  query: string;
};

export type OptionRenderPropertyFnProps = {
  item: SelectItem<any>;
};

export type CustomCounterFnProps = {
  selectedItems: SelectItem<any>[];
  onItemClick: (item: SelectItem<any>) => void;
};

export type CustomClearButtonFnProps = {
  onClick: (e: React.MouseEvent) => void;
  value: string;
};

export type CustomConfirmButtonFnProps = {
  onSubmit: (selectedItems: SelectItem<any>[]) => void;
  isDisabled: boolean;
};

export type CustomInputFnProps = {
  onChange: (newValue: string) => void;
};

export type SelectionChangeFnProps = {
  selectedItems: SelectItem<any>[];
  valid: boolean;
};

export type InputEventProps = {
  customClearButton?: ({
    onClick,
    value,
  }: CustomClearButtonFnProps) => JSX.Element;
};

export type InputComponentProps = InputEventProps & {
  placeholder?: string;
  onChange: (value: string) => void;
};

export type OptionEventProps = {
  renderItem?: (params: SelectComponentRenderItemFnProps) => JSX.Element;
};

export type OptionComponentProps = OptionEventProps & {
  item: SelectItem<any>;
  isDisabled?: boolean;
  query: string;
  onSelected: (item: SelectItem<any>) => void;
};

export type SelectCustomCSSProps = {
  container?: CSSProperties;
  list?: CSSProperties;
};

export type SelectEventProps = InputEventProps &
  OptionEventProps & {
    customInput?: ({ onChange }: CustomInputFnProps) => JSX.Element;
    customCounter?: ({
      selectedItems,
      onItemClick,
    }: CustomCounterFnProps) => JSX.Element;
    customConfirmButton?: ({
      onSubmit,
      isDisabled,
    }: CustomConfirmButtonFnProps) => JSX.Element;
    onSelectionChange?: ({
      selectedItems,
      valid,
    }: SelectionChangeFnProps) => void;
    searchFunction: (query: string) => Promise<any[]>;
    onItemSelected?: (selectedItem: SelectItem<any>) => void;
    itemKeyFunction?: (item: SelectItem<any>) => string;
  };

export type SelectComponentProps = SelectEventProps & {
  customCSS?: SelectCustomCSSProps;
  selectionMax?: number;
  selectionMin?: number;
  customLoader?: JSX.Element;
  showDefaultLoader?: boolean;
  searchDebounce?: number;
  inputPlaceholder?: string;
};

export type ConfirmComponentProps = {
  label?: string;
  isDisabled?: boolean;
  onSubmit: () => void;
};
