import { useEffect } from 'react';

/**
 * Hook that executes a callback when the Escape key is pressed.
 * Only active when `isOpen` is true.
 *
 * @param callback - Function to execute on Escape key press
 * @param isOpen - Whether the escape listener should be active
 *
 * @example
 * ```tsx
 * useOnEscape(() => {
 *   console.log('Escape key pressed!');
 * }, isOpen);
 * ```
 */
export function useOnEscape(callback: () => void, isOpen: boolean) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, isOpen]);
}
