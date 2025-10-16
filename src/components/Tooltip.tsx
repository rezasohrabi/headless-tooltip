import React, {
  cloneElement,
  FocusEvent,
  MouseEvent,
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ReactUniPopper from 'react-uni-popper';
import { useTransition, useOnEscape, useEnhancedChildren } from '../hooks';
import { getId, getReactElementRef } from '../utils';
import { TimeoutRef, TooltipProps } from '../types';
import { Arrow } from './Arrow';

export function Tooltip({
  children,
  content,
  placement = 'top',
  className = '',
  offset = 4,
  zIndex,
  open,
  openDelay = 300,
  closeDelay = 200,
  disableInteractive = false,
  onOpenChange,
  portalContainer,
  arrow = false,
  arrowSize = 12,
  arrowClassName,
  transition: { enable = false, enterDuration = 300, exitDuration = 300 } = {},
  ...props
}: TooltipProps): ReactElement {
  const [tooltipId] = useState(getId());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openTimeout = useRef<TimeoutRef>(null);
  const closeTimeout = useRef<TimeoutRef>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [, forceUpdate] = useState<number>(0);

  const isControlled = open !== undefined;
  const controlledState = isControlled ? open : isOpen;

  const phase = useTransition({
    in: controlledState,
    enterDuration: enterDuration,
    exitDuration: exitDuration,
    skip: !enable,
  });

  const isOpenState = enable ? phase !== 'exited' : controlledState;

  /**
   * Creates CSS transition data attributes based on current phase
   */
  const getTransitionDataAttributes = useCallback(() => {
    if (!enable) return {};

    const dataKey = `data-${phase}`;
    return { [dataKey]: '' };
  }, [enable, phase]);

  /**
   * Closes the tooltip and calls onOpenChange callback
   */
  const closeTooltip = useCallback(
    (useDelay: boolean) => {
      if (!isOpenState) return;
      if (
        !isControlled &&
        ((useDelay && closeTimeout.current !== null) || !useDelay)
      ) {
        setIsOpen(false);
      }
      onOpenChange?.(false);
    },
    [isControlled, isOpenState, onOpenChange],
  );

  const openTooltip = useCallback(
    (useDelay: boolean) => {
      if (isOpenState) return;

      if (
        !isControlled &&
        ((useDelay && openTimeout.current !== null) || !useDelay)
      ) {
        setIsOpen(true);
      }
      onOpenChange?.(true);
    },
    [isControlled, isOpenState, onOpenChange],
  );

  /**
   * Opens tooltip with optional delay
   * @param useDelay - Whether to apply openDelay before opening
   */
  const handleOpen = useCallback(
    (useDelay = false) => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
      if (useDelay && openDelay > 0) {
        openTimeout.current = setTimeout(() => {
          openTooltip(true);
        }, openDelay);
      } else {
        openTooltip(false);
      }
    },
    [openDelay, openTooltip],
  );

  /**
   * Closes tooltip with optional delay
   * @param useDelay - Whether to apply closeDelay before closing
   */
  const handleClose = useCallback(
    (useDelay = false) => {
      if (openTimeout.current) {
        clearTimeout(openTimeout.current);
        openTimeout.current = null;
      }

      if (useDelay && closeDelay > 0) {
        closeTimeout.current = setTimeout(() => {
          closeTooltip(true);
        }, closeDelay);
      } else {
        closeTooltip(false);
      }
    },
    [closeDelay, closeTooltip],
  );

  useOnEscape(() => handleClose(false), isOpenState);

  useEffect(
    () => () => {
      if (openTimeout.current) clearTimeout(openTimeout.current);
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    },
    [],
  );

  const childrenElement = useEnhancedChildren(children);

  const childrenProps = useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: (node: any) => {
        targetRef.current = node;
        forceUpdate((prev) => prev + 1);
        const childRef = getReactElementRef(childrenElement);

        if (typeof childRef === 'function') {
          childRef(node);
        } else if (childRef && 'current' in childRef) {
          (childRef as MutableRefObject<typeof node>).current = node;
        }
      },
      'aria-describedby': isOpenState ? tooltipId : undefined,
      onMouseOver: (e: MouseEvent) => {
        handleOpen(true);
        childrenElement?.props.onMouseOver?.(e);
      },
      onMouseLeave: (e: MouseEvent) => {
        handleClose(true);
        childrenElement?.props.onMouseLeave?.(e);
      },
      onFocus: (e: FocusEvent) => {
        handleOpen(false);
        childrenElement?.props.onFocus?.(e);
      },
      onBlur: (e: FocusEvent) => {
        handleClose(false);
        childrenElement?.props.onBlur?.(e);
      },
      tabIndex: childrenElement?.props.tabIndex || 0,
    }),
    [childrenElement, handleClose, handleOpen, isOpenState, tooltipId],
  );

  const Trigger = cloneElement(childrenElement, childrenProps);

  return (
    <>
      {Trigger}
      {isOpenState && content && (
        <ReactUniPopper
          reference={targetRef.current}
          portalContainer={portalContainer}
          zIndex={zIndex}
          placement={placement}
          offset={offset}
          arrow={arrow}
          arrowSize={arrowSize}
          id={tooltipId}
          role="tooltip"
          onMouseEnter={
            disableInteractive ? undefined : () => handleOpen(false)
          }
          onMouseLeave={
            disableInteractive
              ? undefined
              : () => {
                  handleClose(true);
                }
          }
        >
          {({ arrowRef, arrowStyles }) => (
            <div
              {...getTransitionDataAttributes()}
              className={`headless-tooltip ${className}`}
              {...props}
            >
              {arrow && (
                <Arrow
                  arrowRef={arrowRef}
                  arrowClassName={arrowClassName}
                  arrowSize={arrowSize}
                  arrowStyles={arrowStyles}
                />
              )}
              {content}
            </div>
          )}
        </ReactUniPopper>
      )}
    </>
  );
}

export default Tooltip;
