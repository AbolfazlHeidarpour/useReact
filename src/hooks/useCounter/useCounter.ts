import { useState } from "react";

/**
 * @author Abolfazl Heidarpour
 * @interface UseCounter
 * @description defines return type of useCounter hook
 * @property {number} counter state for counting
 * @property {() => void} increase increases state by one
 * @property {() => void} decrease decreases state by one
 * @property {() => void} clear sets state to zero
 * @property {() => void} reset sets state to initial value
 * @property {(v: number) => void} update updates state by given argument
 */
export interface UseCounter {
  readonly counter: number;
  readonly increase: () => void;
  readonly decrease: () => void;
  readonly clear: () => void;
  readonly reset: () => void;
  readonly update: (v: number) => void;
}

/**
 * @author Abolfazl Heidarpour
 * @function useCounter
 * @description Utility hook for counting changes
 * @returns {UseCounter}
 */
export default function useCounter(initialValue: number = 0): UseCounter {
  const [counter, setCounter] = useState(initialValue);

  const increase = () => setCounter(prev => prev + 1);

  const decrease = () => setCounter(prev => prev - 1);

  const clear = () => setCounter(0);

  const reset = () => setCounter(initialValue);

  const update = (v: number) => setCounter(v);

  return {
    counter,
    increase,
    decrease,
    clear,
    reset,
    update
  };
}