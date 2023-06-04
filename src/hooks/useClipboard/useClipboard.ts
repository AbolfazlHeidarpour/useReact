import { useState } from "react";

/**
 * @author Abolfazl Heidarpour
 * @type ClipboardMessage
 * @description Defines messages for copying to clipboard function
 */
export type ClipboardMessage = 'Copying to clipboard failed' | 'Copied to clipboard' | 'Clipboard not supported'; 

/**
 * @author Abolfazl Heidarpour
 * @type CopyToClipboard
 * @description signature of copyToClipboard function
 */
export type CopyToClipboard = (v: string) => Promise<ClipboardMessage>; 

/**
 * @author Abolfazl Heidarpour
 * @type UseClipboard
 * @description defines return type of useClipboard hook
 */
export type UseClipboard = [string, CopyToClipboard];

/**
 * @author Abolfazl Heidarpour
 * @function useClipboard
 * @returns {UseClipboard}
 * @description Utility hook for copying string values to clipboard
 */
export default function useClipboard(): UseClipboard {
  const [state, setState] = useState<string>(''); 

  const copyToClipboard: CopyToClipboard = async value => {
    if (!navigator?.clipboard)
      return 'Clipboard not supported';

    try {
      await navigator.clipboard.writeText(value);
      setState(value);
      return 'Copied to clipboard';
    } catch (e) {
      console.error(e);
      setState('');
      return 'Copying to clipboard failed';
    }
  };

  return [state, copyToClipboard];
}