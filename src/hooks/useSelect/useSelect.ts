import { useState, useMemo, useEffect } from 'react';

/**
 * @author Abolfazl Heidarpour
 * @interface SelectMethods<T>
 * @description defines helper methods for manipulating select state
 * @property {(v: T) => void} selectItem
 * @property {(i: number) => void} selectIndex
 * @property {() => void} deselect
 */
export interface SelectMethods<T> {
  readonly selectItem: (v: T) => void;
  readonly selectIndex: (i: number) => void;
  readonly deselect: () => void;
}

export type UseSelect<T> = [T | null, number, SelectMethods<T>];

/**
 * @author Abolfazl Heidarpour
 * @function useSelect
 * @description Utility hook to manage selecting item in a list
 * @param {T[]} data list of items
 * @param {T | null} defaultSelected default value of select state
 * @returns {UseSelect<T>}
 */
export default function useSelect<T>(data: T[], defaultSelected: T | null = null): UseSelect<T> {
  const [state, setState] = useState(defaultSelected);
  const index = useMemo(() => (state && data.length > 0) ? data.indexOf(state) : -1, [data, state]);

  const selectIndex = (i: number) => i >= 0 && setState(data[i]);

  const selectItem = (item: T) => item && setState(item);

  const deselect = () => setState(defaultSelected);

  useEffect(() => {
    setState(defaultSelected);
  }, [defaultSelected]);

  return [state, index, { selectIndex, selectItem, deselect }];
}