import { useState, useDebugValue } from "react";

export function useStateWithLabel<T>(
  initialValue: T,
  name: string
): [T, (value: T) => void] {
  const [value, setValue] = useState(initialValue);
  useDebugValue(`${name}: ${value}`);
  return [value, setValue];
}
