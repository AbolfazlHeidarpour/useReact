import { useEffect, useState } from "react";

/**
 * @author Abolfazl Heidarpour
 * @interface WindowDimensions
 * @property {number} width
 * @property {number} height
 * @description data model of window dimensions
 */
export interface WindowDimensions {
  readonly width: number;
  readonly height: number;
}

/**
 * @author Abolfazl Heidarpour
 * @type WindowDimensionsType
 * @description utility type to determine whether get inner dimensions of window object, or its outer dimensions
 */
export type WindowDimensionsType = 'INNER' | 'OUTER';

/**
 * @author Abolfazl Heidarpour
 * @function useWindowDimensions
 * @description Utility hook for listening to changes of width and height of window object
 * @param {WindowDimensionsType} type 
 * @returns {WindowDimensions} state
 */
export default function useWindowDimensions(type: WindowDimensionsType = 'INNER'): WindowDimensions {
  const [state, setState] = useState<WindowDimensions>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    function resize() {
      if (type === 'INNER') {
        setState({
          width: window.innerWidth,
          height: window.innerHeight
        });
      } else {
        setState({
          width: window.outerWidth,
          height: window.outerHeight
        });
      }
    }

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, [type, setState]);

  return state;
}