import React, {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ReactUniPopper, { PositionType } from 'react-uni-popper';
import useTransition from './useTransition';
import useOnEscape from './hooks/useOnEscape';

type TimeoutRef = ReturnType<typeof setTimeout> | null;

/**
 * Generates a unique identifier for a tooltip.
 *
 * @returns A string in the format `tooltip-<randomString>`, where `<randomString>`
 * is a randomly generated alphanumeric string of 7 characters.
 */
function getId() {
  return `tooltip-${Math.random().toString(36).slice(2, 9)}`;
}

function getReactElementRef(
  element: React.ReactElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): React.Ref<any> | null {
  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in older versions
  if (parseInt(React.version, 10) >= 19) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (element?.props as any)?.ref || null;
  }
  // @ts-expect-error element.ref is not included in the ReactElement type
  // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70189
  return element?.ref || null;
}

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  children: React.ReactNode;
  className?: string;
  content: React.ReactNode;
  placement?: PositionType;
  offset?: number;
  zIndex?: number;
  open?: boolean;
  openDelay?: number;
  closeDelay?: number;
  disableInteractive?: boolean;
  onOpenChange?: (open: boolean) => void;
  portalContainer?: HTMLElement;
  arrow?: boolean;
  arrowSize?: number;
  arrowClassName?: string;
  transition?: {
    enable?: boolean;
    enterDuration?: number;
    exitDuration?: number;
  };
}

/**
 * Tooltip component that provides a customizable tooltip for wrapping child elements.
 * It supports controlled and uncontrolled modes, delay for opening/closing, and placement options.
 *
 * @param {React.ReactNode} children - The child element(s) that trigger the tooltip.
 * @param {React.ReactNode} content - The content to display inside the tooltip.
 * @param {string} [placement='top'] - The preferred placement of the tooltip relative to the trigger element.
 * @param {string} [className=''] - Additional CSS classes to apply to the tooltip.
 * @param {number} [offset=4] - The offset distance between the tooltip and the trigger element.
 * @param {number} [zIndex] - The z-index value for the tooltip. Should be provided based on your application's z-index hierarchy.
 * @param {boolean} [open] - Controls the open state of the tooltip (for controlled mode).
 * @param {number} [openDelay=300] - Delay in milliseconds before the tooltip opens.
 * @param {number} [closeDelay=200] - Delay in milliseconds before the tooltip closes.
 * @param {(open: boolean) => void} [onOpenChange] - Callback triggered when the open state changes.
 * @param {boolean} [disableInteractive=false] - If true, disables interactive behavior for the tooltip.
 * @param {HTMLElement} [portalContainer] - The DOM element where the tooltip will be rendered.
 * @param {boolean} [arrow] - If true, adds an arrow to the tooltip.
 * @param {number} [arrowSize=12] - The size of the arrow.
 * @param {string} [arrowClassName=''] - Additional CSS classes to apply to the arrow.
 * @param {object} [props] - Additional props to pass to the tooltip container.
 *
 * @returns {React.ReactElement} The Tooltip component wrapping the child element(s).
 *
 * @example
 * ```
 * <Tooltip content="This is a tooltip" placement="bottom">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
function Tooltip({
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

  function getReactMajorVersion(): number {
    const version = React.version?.split('.')[0];
    return parseInt(version || '0', 10);
  }

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

  const isControlled = open !== undefined;
  const controlledState = isControlled ? open : isOpen;

  const phase = useTransition({
    in: controlledState,
    enterDuration: enterDuration,
    exitDuration: exitDuration,
    skip: !enable,
  });

  const isOpenState = enable ? phase !== 'exited' : controlledState;

  console.log('phase', phase, enable, enterDuration, exitDuration);

  /**
   * Generates data attributes for CSS transitions based on the current phase
   */
  const getTransitionDataAttributes = useCallback(() => {
    if (!enable) return {};

    const dataKey = `data-${phase}`;
    return { [dataKey]: '' };
  }, [enable, phase]);

  /**
   * Closes the tooltip by updating its state and triggering the `onOpenChange` callback.
   *
   * - If the tooltip is not controlled (`isControlled` is false), it sets the `isOpen` state to `false`.
   * - Regardless of the control state, it invokes the `onOpenChange` callback with `false` if the callback is provided.
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
   * Handles the opening of the tooltip, with an optional delay.
   *
   * @param useDelay - A boolean indicating whether to apply a delay before opening the tooltip.
   *                   If `true` and `openDelay` is greater than 0, the tooltip will open after the specified delay.
   *                   If `false`, the tooltip will open immediately.
   *
   * The function clears any existing close timeout to prevent conflicts, and if a delay is specified,
   * it sets a timeout to open the tooltip after the delay. Otherwise, it opens the tooltip immediately.
   *
   * Dependencies:
   * - `isControlled`: Determines if the tooltip is controlled externally.
   * - `openDelay`: The delay duration (in milliseconds) before opening the tooltip when `useDelay` is `true`.
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
   * Handles the closing of the tooltip, with an optional delay.
   *
   * @param useDelay - A boolean indicating whether to apply a delay before closing the tooltip.
   *                   If `true` and `closeDelay` is greater than 0, the tooltip will close after the specified delay.
   *                   If `false`, the tooltip will close immediately.
   *
   * The function clears any existing open timeout to prevent conflicts, and if a delay is specified,
   * it sets a timeout to close the tooltip after the delay. Otherwise, it closes the tooltip immediately.
   *
   * Dependencies:
   * - `isControlled`: Determines if the tooltip is controlled externally.
   * - `closeDelay`: The delay duration (in milliseconds) before closing the tooltip when `useDelay` is `true`.
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
          (childRef as React.MutableRefObject<typeof node>).current = node;
        }
      },
      'aria-describedby': isOpenState ? tooltipId : undefined,
      onMouseOver: (e: React.MouseEvent) => {
        handleOpen(true);
        childrenElement?.props.onMouseOver?.(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        handleClose(true);
        childrenElement?.props.onMouseLeave?.(e);
      },
      onFocus: (e: React.FocusEvent) => {
        handleOpen(false);
        childrenElement?.props.onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent) => {
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
