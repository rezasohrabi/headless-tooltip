import React, { isValidElement, ReactNode, useCallback, useMemo } from 'react';
import { getReactMajorVersion } from '../utils';

export function useEnhancedChildren(children: ReactNode) {
  /**
   * Check if a component is a forward ref component.
   * @param Component
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isForwardRefComponent = useCallback((Component: any): boolean => {
    const version = getReactMajorVersion();

    if (version >= 19) {
      // React 19+ forwardRef may not be used at all; ref is passed directly
      // There's no reliable way to detect if component accepts ref
      // So just assume it *might* accept ref
      return true;
    }

    // React <= 18 use the $$typeof symbol check
    const forwardRefSymbol =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (React as any).ForwardRef || Symbol.for('react.forward_ref');

    return (
      typeof Component === 'object' &&
      Component !== null &&
      Component.type.$$typeof === forwardRefSymbol
    );
  }, []);

  /**
   * Memoized computation of the children element.
   * If the `children` prop is a valid React element, it is returned as-is.
   * Otherwise, it wraps the `children` in a `<span>` element.
   *
   * @constant
   * @type {React.ReactNode}
   * @returns {React.ReactNode} The memoized children element, either as-is or wrapped in a `<span>`.
   * @param {React.ReactNode} children - The children prop to be rendered.
   * @dependencies [children] - Recomputes only when the `children` prop changes.
   */

  const childrenElement = useMemo(() => {
    if (isValidElement(children) && isForwardRefComponent(children)) {
      return children;
    }
    return <span>{children}</span>;
  }, [children, isForwardRefComponent]);

  return childrenElement;
}
