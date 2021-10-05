# React Autocomplete-Multiselect
This project was made because after I've found out that the (still awesome) [react-select](https://react-select.com/) library wasn't suiting my usecase, I had to create a library on my own, also for testing React npm published components. This library was made using React without CRA, [rxjs](https://rxjs.dev/guide/overview), [styled-components](https://styled-components.com/), [webpack](https://webpack.js.org/) and of course [TypeScript](https://www.typescriptlang.org/).

## Install
Just run `yarn add react-autocomplete-multiselect` or `npm i react-autocomplete-multiselect`

## Usage
This library introduces a simple React component, which is `<AutocompleteMultiselect/>` and following here are all the available properties and events to customize it

### Available events

##### `searchFunction: (query: string) => Promise<any[]>;`
Mandatory, it's a function which accept a `query` parameter and use it to return a Promise with a list of items as result. This will be debounced using `debounceTime` and triggered after input

##### `customCounter?: (items: any[]) => JSX.Element;`
Optional, if provided accepts a function by passing the list of `selectedItems` and returns a JSX Element which will be displayed before the list of items

##### `customConfirmButton?: (onSubmit: (items: any[]) => void, isDisabled: boolean) => JSX.Element;`
Optional, it can be used to render a custom "confirm" button, available when selectionMin and selectionMax boundaries are satisfied. Requires an `onSubmit` event handler and allows to customize it by providing the `isDisabled` property

##### `onConfirm?: (items: any[]) => void;`
Optional, callback which gets fired after the "confirm" button is being clicked. Provides the selectedItems as argument

##### `onItemSelected?: (item: any) => void;`
Optional, fires a callback when an item is selected by providing the selected item as argument

##### `itemKeyFunction?: (item: any) => string;`
Optional (recommended), is a function which get used to create list keys to render list items. It takes the input item as argument and can return a string with whatever you want. Selected items will be compared using the value returned by this function, and defaults to a (ugly) `JSON.stringify(item)`

##### `onInputFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;`
Optional, fires a callback when the input gets focused (maybe you need that for styling purposes)

##### `onInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;`
Optional, fires a callback when the input gets blurred (maybe you need that for styling purposes)

##### `customClearButton?: (onClick: (e: React.MouseEvent) => void, value: string) => JSX.Element;`
Optional, will be fired when some text is getting written. Requires an `onClick` event handler which can be used to clear the input, and provides the searchValue as parameter, if needed

##### `renderItem?: (params: SelectComponentRenderItemFnProps) => JSX.Element;`
Optional, a custom renderer for the list item. *Will be rendered inside a `<li>` tag*

### Available properties

##### `customSelectCSS?: CSSProperties;`
Optional, the custom CSS properties which will be passed to the component Wrapper

##### `customInputCSS?: CSSProperties;`
Optional, the custom CSS properties which will be passed to the searchbox

##### `customOptionCSS?: CSSProperties;`
Optional, the custom CSS properties which will be passed to every single result item

##### `selectionMax?: number;`
Optional, the maximum number of selectable items. Defaults to -1 which means unlimited

##### `selectionMin?: number;`
Optional, the minimum required number of items to be selected. Defaults to -1 which means no one

##### `customLoader?: JSX.Element;`
Optional, a custom JSX element which will be shown up while your search function is still working. If set, `showDefaultLoader` won't be considered

##### `showDefaultLoader?: boolean;`
Optional, if set to `false` won't display anything while your search function is working. Defaults to `true`

##### `searchDebounce?: number;`
Optional, the number of milliseconds of debouncing between writing some text in the searchbox and triggering the `searchFunction`. Defaults to 300