import { ChangeEventHandler, useState } from 'react';

/**
 * @author Abolfazl Heidarpour
 * @type UseString<T>
 * @property {string} state
 * @property {ChangeEventHandler<T>} onChange
 * @property {() => void} clear
 * @property {(v: string) => void} update
 * @property {() => void} reset
 * @description generic type defines return type of useString hook
 */
export type UseString<T> = {
  readonly state: string;
  readonly onChange: ChangeEventHandler<T>;
  readonly clear: () => void;
  readonly update: (v: string) => void;
  readonly reset: () => void;
}

/**
 * @author Abolfazl Heidarpour
 * @function useString
 * @description Utility hook for working with string states
 * @param {string} initValue
 * @returns {UseString<T>}
 */
export default function useString<T extends HTMLInputElement>(initValue = ''): UseString<T> {
  const [state, setState] = useState(initValue);

  const onChange: ChangeEventHandler<T> = ({ target: { value }}) => setState(value);

  const clear = () => setState('');

  const reset = () => setState(initValue);

  const update = (v: string) => setState(v);

  return { onChange, clear, reset, update, state };
}