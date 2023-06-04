import { useRef } from "react";

/**
 * @author Abolfazl Heidarpour
 * @type PrevRef
 * @description defines structure of refrence which is used to track previous value
 * @property {T} value current value of state
 * @property {T | null} prev previous value of state
 */
export type PrevRef<T> = {
  readonly value: T;
  readonly prev: T | null;
}

/**
 * @author Abolfazl Heidarpour
 * @type PrevPredicate
 * @description signature of helper method which checks equality of new value and current stored value in ref
 */
export type PrevPredicate<T> = (newValue: T, currentValue: T) => boolean;

/**
 * @function usePrev
 * @description Utility hook for tracking previous value of a state
 * @param {T} value 
 * @param {PrevPredicate<T>} predicate optional
 * @returns {T | null}
 */
export default function usePrev<T>(value: T, predicate?: PrevPredicate<T>): T | null {
  const ref = useRef<PrevRef<T>>({prev: null, value});
  const currentValue = ref.current.value;

  if (predicate ? !predicate(value, currentValue) : value !== currentValue)
    ref.current = {
      value,
      prev: currentValue
    };

  return ref.current.prev;
}