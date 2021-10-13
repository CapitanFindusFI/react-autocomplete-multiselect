# React Autocomplete-Multiselect

This project was made because after I've found out that the (still awesome) [react-select](https://react-select.com/) library wasn't suiting my usecase, I had to create a library on my own, also for testing React npm published components. This library was made using React without CRA, [use-debounce](https://github.com/xnimorz/use-debounce), [styled-components](https://styled-components.com/), [webpack](https://webpack.js.org/) and of course [TypeScript](https://www.typescriptlang.org/).

## Install

Just run `yarn add react-autocomplete-multiselect` or `npm i react-autocomplete-multiselect`

## Usage

This library introduces a simple React component, which is `<AutocompleteMultiselect/>` and following here are all the available properties and events to customize it

### Available events

##### `searchFunction: (query: string) => Promise<any[]>;`

Mandatory, it's a function which accept a `query` parameter and use it to return a Promise with a list of items as result. This will be debounced using `debounceTime` and triggered after input

##### `customInput?: ({clearSelection: () => void, onChange: (newValue: string) => void}) => JSX.Element;`

Optional, if provided can be used to pass a custom JSX.Element which requires an `onChange` handler fired by the input (must have an <input/> tag). Also, provides `clearSelection` callback which clears all selected items

##### `customCounter?: ({selectedItems: any[], onItemClick: (item: any) => void}) => JSX.Element;`

Optional, if provided accepts a function by passing the list of `selectedItems` and returns a JSX Element which will be displayed before the list of items. Also, it can handle deselection directly from the JSX.Element by integrating the provided `onItemClick` callback

##### `onSelectionChange?: ({selectedItems: any[], valid: boolean}) => void;`

Optional, callback which gets fired when the selection changes, with a boolean indicating wherever the selection matches the min/max boundaries or not. Provides the selectedItems as argument

##### `onItemSelected?: (selectedItem: any) => void;`

Optional, fires a callback when an item is selected by providing the selected item as argument

##### `itemKeyFunction?: (item: any) => string;`

Optional (recommended), is a function which get used to create list keys to render list items. It takes the input item as argument and can return a string with whatever you want. Selected items will be compared using the value returned by this function, and defaults to a (ugly) `JSON.stringify(item)`

##### `customClearButton?: ({onClick: (e: React.MouseEvent) => void, value: string}) => JSX.Element;`

Optional, will be fired when some text is getting written. Requires an `onClick` event handler which can be used to clear the input, and provides the searchValue as parameter, if needed

##### `renderItem?: ({item: any, selected: boolean, disabled: boolean, query: string}) => JSX.Element;`

Optional, a custom renderer for the list item. _Will be rendered inside a `<li>` tag_

### Available properties

##### `customCSS?: {container?: CSSProperties, list?: CSSProperties};`

Optional, defaults to `{}`, custom CSS properties to be passed to the component wrapper (`container`) or to the list (`list`)

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

##### `noResultsComponent?: JSX.Element;`
Optional, a custom renderer for a empty list.