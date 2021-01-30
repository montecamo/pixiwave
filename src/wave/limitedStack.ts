export type Stack<T> = Array<T>;

export function makeStack<T>(length: number): (value: T) => Stack<T> {
  return (value) => new Array(length).fill(value);
}

export function pushStack<T>(stack: Stack<T>): (value: T) => Stack<T> {
  return (value) => stack.slice(1).concat(value);
}

export function getStackLength<T>(stack: Stack<T>): number {
  return stack.length;
}
