export function makeHashTable(hashExtractor: (any) => any) {
  const table = {};

  return {
    set(key, value) {
      table[hashExtractor(key)] = value;
    },
    get(key) {
      return table[hashExtractor(key)];
    },
  };
}
