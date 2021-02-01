export type Stack<T> = Array<T>;

export function makeStack<T>(size: number): (value: T) => Stack<T> {
  return (value) => new Array(size).fill(value);
}

export function pushStack<T>(stack: Stack<T>): (value: T) => Stack<T> {
  return (value) => [value].concat(stack.slice(0, -1));
}

export function getStackSize<T>(stack: Stack<T>): number {
  return stack.length;
}
