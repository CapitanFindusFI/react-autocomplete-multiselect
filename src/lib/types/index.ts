import { CSSProperties } from "styled-components";

export type SelectComponentRenderItemFnProps = {
  item: any;
  disabled: boolean;
};

export type OptionRenderPropertyFnProps = {
  item: any;
};

export type InputEventProps = {
  onInputFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export type OptionEventProps = {
  renderItem?: (params: SelectComponentRenderItemFnProps) => JSX.Element;
  renderProperty?: (params: OptionRenderPropertyFnProps) => string;
};

export type SelectEventProps = InputEventProps &
  OptionEventProps & {
    customCounter?: (items: any[]) => JSX.Element;
    clearButton?: (
      onClick: (e: React.MouseEvent) => void,
      value: string
    ) => JSX.Element;
    confirmButton?: (
      onSubmit: (items: any[]) => void,
      isDisabled: boolean
    ) => JSX.Element;
    onConfirm?: (items: any[]) => void;
    searchFunction: (query: string) => Promise<any[]>;
    onItemSelected: (item: any) => void;
    itemKeyFunction?: (item: any) => string;
  };

export type SelectComponentProps = SelectEventProps & {
  customSelectCSS?: CSSProperties;
  customInputCSS?: CSSProperties;
  customOptionCSS?: CSSProperties;
  selectionMax?: number;
  selectionMin?: number;
  customLoader?: JSX.Element;
  showDefaultLoader?: boolean;
  searchDebounce?: number;
};

export type InputComponentProps = Pick<SelectEventProps, "clearButton"> &
  InputEventProps & {
    customCSS?: CSSProperties;
    placeholder?: string;
    onChange: (value: string) => void;
  };

export type ConfirmComponentProps = {
  label?: string;
  isDisabled?: boolean;
  customCSS?: CSSProperties;
  onSubmit: () => void;
};

export type OptionComponentProps = OptionEventProps & {
  item: any;
  isDisabled?: boolean;
  customCSS?: CSSProperties;
  onSelected: (item: any) => void;
};
