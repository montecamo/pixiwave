
export const makeStack = (length) => (value) => new Array(length).fill(value);

export const pushStack = (stack) => (value) => stack.slice(1).concat(value);
