export function memoize(
  func: Function,
  keyExtractor: (...args: Array<any>) => string
) {
  const table = {};

  return (...args: Array<any>) => {
    const key = keyExtractor(...args);

    if (table[key]) {
      return table[key];
    }

    const result = func(...args);

    table[key] = result;

    return result;
  };
}
