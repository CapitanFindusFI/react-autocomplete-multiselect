import { CSSProperties } from "styled-components";

export type SelectComponentRenderItemFnProps = {
  item: any;
  selected: boolean;
};

export type OptionRenderPropertyFnProps = {
  item: any;
};

export type OptionEventProps = {
  renderItem?: (params: SelectComponentRenderItemFnProps) => JSX.Element;
  renderProperty?: (params: OptionRenderPropertyFnProps) => string;
};

export type SelectComponentProps = OptionEventProps & {
  customSelectCSS?: CSSProperties;
  customInputCSS?: CSSProperties;
  customOptionCSS?: CSSProperties;
  selectionMax?: number;
  selectionMin?: number;
  searchFunction: (query: string) => Promise<any[]>;
  onItemSelected: (item: any) => void;
  itemKeyFunction?: (item: any) => string;
};

export type InputComponentProps = {
  customCSS?: CSSProperties;
  placeholder?: string;
  onChange: (value: string) => void;
};

export type ConfirmComponentProps = {
    customCSS?: CSSProperties,
    label?: string,
    onSubmit: () => void,
}

export type OptionComponentProps = OptionEventProps & {
  item: any;
  customCSS?: CSSProperties;
  onSelected: (item: any) => void;
};
