export type Value = any;
export type Case = [() => boolean, Value];

export function fswitch(...[cas, ...cases]: Array<Case>): Value {
  if (cas === undefined) return undefined;

  if (cas[0]()) {
    return cas[1];
  }

  return fswitch(...cases);
}

export function fdefault(): boolean {
  return true;
}
