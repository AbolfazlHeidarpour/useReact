import { ChangeEventHandler, useRef, useState } from "react";

/**
 * @author Abolfazl Heidarpour
 * @interface InputValues
 * @property {boolean} checked
 * @property {string} value
 * @property {Date | null} date
 * @property {number} number
 * @property {FileList | null} files
 */
export interface InputValues {
  readonly checked: boolean;
  readonly value: string;
  readonly date: Date | null;
  readonly number: number;
  readonly files: FileList | null;
}

/**
 * @author Abolfazl Heidarpour
 * @interface InputMethods
 * @property {ChangeEventHandler<HTMLInputElement>} onChange
 * @property {() => void} focus 
 * @property {() => void} click
 * @property {() => void} blur
 */
export interface InputMethods {
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
  readonly focus: () => void;
  readonly click: () => void;
  readonly blur: () => void;
}

export type UseInput = [InputValues, InputMethods];

/**
 * @author Abolfazl Heidarpour
 * @function useInput
 * @description Utility hook for working with input elements
 */
export default function useInput(
  { 
    checked = false, 
    value = '', 
    date = null,
    number = 0, 
    files = null
  }: InputValues): UseInput {
  const [state, setState] = useState<InputValues>({
    checked, 
    value, 
    date, 
    number, 
    files
  });
  const ref = useRef<HTMLInputElement>(null);

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { 
      target: { 
        checked, 
        value, 
        valueAsDate, 
        valueAsNumber, 
        files
       }
    } = e;

    setState(({
      checked,
      value,
      number: valueAsNumber,
      date: valueAsDate,
      files
    }));
  };

  const focus = () => ref.current?.focus();
  
  const blur = () => ref.current?.blur();

  const click = () => ref.current?.click();

  return [state, { onChange, focus, click, blur }];
}