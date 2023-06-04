import { useCallback, useState, useMemo } from "react";

/**
 * @author Abolfazl Heidarpour
 * @interface StepperMethods
 * @description defines helper methods to manipulate stepper state
 * @property {() => void} nextStep go to next step
 * @property {() => void} prevStep go to previous step
 * @property {() => void} lastStep jump to last step
 * @property {() => void} firstStep jump to first step
 * @property {(v: number) => void} goToStep change step by given argument
 * @property {boolean} hasNextStep checks if there is further step to go
 * @property {boolean} hasPrevStep checks if there is step to go backward
 */
export interface StepperMethods {
  readonly nextStep: () => void;
  readonly prevStep: () => void;
  readonly lastStep: () => void;
  readonly firstStep: () => void;
  readonly hasNextStep: boolean;
  readonly hasPrevStep: boolean;
  readonly goToStep: (v: number) => void;
}

/**
 * @author Abolfazl Heidarpour
 * @type UseStepper
 * @description defines return type of useStepper hook
 */
export type UseStepper = [number, StepperMethods];

/**
 * @author Abolfazl Heidarpour
 * @function useStepper
 * @description Utility hook for stepper states
 * @param {number} min minimum value of stepper
 * @param {number} max maximum value of stepper
 */
export default function useStepper(min: number = 1, max: number): UseStepper {
  const [state, setState] = useState(min);

  const hasNextStep = useMemo(() => state + 1 <= max, [max, state]);

  const hasPrevStep = useMemo(() => state - 1 >= min, [min, state]);

  const nextStep = useCallback(
    () => hasNextStep && setState((prev) => prev + 1),
    [setState, hasNextStep]
  );

  const prevStep = useCallback(
    () => hasPrevStep && setState((prev) => prev - 1),
    [setState, hasPrevStep]
  );

  const lastStep = () => setState(max);

  const firstStep = () => setState(min);

  const goToStep = (v: number) => setState(v);

  return [
    state,
    {
      nextStep,
      prevStep,
      lastStep,
      firstStep,
      hasNextStep,
      hasPrevStep,
      goToStep
    }
  ];
}
