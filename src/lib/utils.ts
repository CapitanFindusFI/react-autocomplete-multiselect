import { SelectItem } from "./types";

export function getItemIndex(
  list: SelectItem<any>[],
  item: SelectItem<any>,
  searchBy = "_key"
): number {
  if (!list.length) return -1;
  return list.findIndex(
    (el: SelectItem<any>) => el[searchBy] === item[searchBy]
  );
}

export function isItemInList(
  list: SelectItem<any>[],
  item: SelectItem<any>,
  searchBy = "_key"
): boolean {
  return getItemIndex(list, item, searchBy) > -1;
}
