export type TagsTable = {
  [type: string]: {
    [functionType: string]: Function;
  };
};

export function makeTagsTable(): TagsTable {
  return {};
}

export function putTagsTable(
  table: TagsTable,
  dataType: string,
  functionType: string,
  func: Function
): void {
  if (!table[dataType]) {
    table[dataType] = { [functionType]: func };
  }

  table[dataType][functionType] = func;
}

export function getTagsTable(
  table: TagsTable,
  dataType: string,
  functionType: string
): Function | void {
  return table[dataType][functionType];
}
