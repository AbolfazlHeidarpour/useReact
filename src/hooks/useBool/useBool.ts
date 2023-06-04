import { useState } from "react";

/**
 * @author Abolfazl Heidarpour
 * @name UseBool
 * @type [state, setTrue, setFalse, toggle]
 * @description defines return type of useBool hook in form of an array
 */
export type UseBool = [
  boolean,
  () => void,
  () => void,
  () => void
];

/**
 * @author Abolfazl Heidarpour
 * @function useBool
 * @param {boolean} initValue 
 * @returns {UseBool}
 * @description Utility hook to use boolean states
 */
export default function useBool(initValue: boolean): UseBool {
  const [state, setState] = useState(initValue);

  const setTrue = () => setState(true);

  const setFalse = () => setState(false);

  const toggle = () => setState(!state);

  return [state, setTrue, setFalse, toggle];
}