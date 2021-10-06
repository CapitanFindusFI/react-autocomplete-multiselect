import { CSSProperties } from "styled-components";

export type SelectComponentRenderItemFnProps = {
  item: any;
  selected: boolean;
  disabled: boolean;
};

export type OptionRenderPropertyFnProps = {
  item: any;
};

export type InputEventProps = {
  onInputFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  customClearButton?: (
    onClick: (e: React.MouseEvent) => void,
    value: string
  ) => JSX.Element;
};

export type InputComponentProps = InputEventProps & {
  placeholder?: string;
  onChange: (value: string) => void;
};

export type OptionEventProps = {
  renderItem?: (params: SelectComponentRenderItemFnProps) => JSX.Element;
};

export type OptionComponentProps = OptionEventProps & {
  item: any;
  isDisabled?: boolean;
  onSelected: (item: any) => void;
};

export type SelectEventProps = InputEventProps &
  OptionEventProps & {
    customCounter?: (selectedItems: any[]) => JSX.Element;
    customConfirmButton?: (
      onSubmit: (selectedItems: any[]) => void,
      isDisabled: boolean
    ) => JSX.Element;
    onValidSelection?: (selectedItems: any[]) => void;
    searchFunction: (query: string) => Promise<any[]>;
    onItemSelected?: (selectedItem: any) => void;
    itemKeyFunction?: (item: any) => string;
  };

export type SelectComponentProps = SelectEventProps & {
  customCSS?: CSSProperties;
  selectionMax?: number;
  selectionMin?: number;
  customLoader?: JSX.Element;
  showDefaultLoader?: boolean;
  searchDebounce?: number;
};

export type ConfirmComponentProps = {
  label?: string;
  isDisabled?: boolean;
  onSubmit: () => void;
};
