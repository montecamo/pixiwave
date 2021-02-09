export type TaggedData<Type = string, Data = any> = [Type, Data];

export function attachTag<Type, Data>(
  type: Type,
  data: Data
): TaggedData<Type, Data> {
  return [type, data];
}

export function getTaggedType<Type, Data>(
  tagged: TaggedData<Type, Data>
): Type {
  return tagged[0];
}

export function getTaggedData<Type, Data>(
  tagged: TaggedData<Type, Data>
): Data {
  return tagged[1];
}
