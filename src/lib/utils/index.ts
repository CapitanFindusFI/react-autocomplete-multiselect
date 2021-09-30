export function getItemIndex(
  list: any[],
  item: any,
  searchBy = "_key"
): number {
  if (!list.length) return -1;
  return list.findIndex((el: any) => el[searchBy] === item[searchBy]);
}

export function isItemInList(
  list: any[],
  item: any,
  searchBy = "_key"
): boolean {
  return getItemIndex(list, item, searchBy) > -1;
}
