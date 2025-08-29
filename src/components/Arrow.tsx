import React, { ReactElement } from 'react';
import { ArrowProps } from '../types';

export function Arrow({
  arrowRef,
  arrowClassName,
  arrowSize,
  arrowStyles,
}: ArrowProps): ReactElement {
  return (
    <div
      ref={arrowRef}
      className={`headless-tooltip-arrow ${arrowClassName}`}
      style={{
        zIndex: -1,
        position: 'absolute',
        pointerEvents: 'none',
        width: arrowSize,
        height: arrowSize,
        transform: 'rotate(45deg)',
        ...arrowStyles,
      }}
    />
  );
}
