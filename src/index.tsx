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
import {
  autoUpdate,
  flip,
  offset as offsetMiddleware,
  shift,
  useFloating,
  arrow as arrowMiddleware,
} from '@floating-ui/react-dom';
import { createPortal } from 'react-dom';

export type PositionType =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

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

/**
 * A custom React hook that listens for the "Escape" key press and triggers a callback function
 * when the key is pressed, provided the `isOpen` flag is true.
 *
 * @param callback - A function to be executed when the "Escape" key is pressed.
 * @param isOpen - A boolean indicating whether the listener should be active.
 *
 * @example
 * ```tsx
 * useOnEscape(() => {
 *   console.log('Escape key pressed!');
 * }, isOpen);
 * ```
 */
function useOnEscape(callback: () => void, isOpen: boolean) {
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

interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

/**
 * A React component that renders its children into a specified DOM container
 * using React's `createPortal` function. If no container is provided, it defaults
 * to rendering into the `document.body`.
 *
 * @param {PortalProps} props - The props for the Portal component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the portal.
 * @param {HTMLElement} [props.container] - The DOM element where the portal content
 * will be rendered. Defaults to `document.body` if not provided.
 *
 * @returns {React.ReactPortal} A React portal that renders the children into the specified container.
 */
function Portal({ children, container }: PortalProps) {
  return createPortal(children, container || document.body);
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
  ...props
}: TooltipProps): ReactElement {
  const [tooltipId] = useState(getId());
  const [isOpen, setIsOpen] = useState(false);
  const openTimeout = useRef<TimeoutRef>(null);
  const closeTimeout = useRef<TimeoutRef>(null);

  const arrowRef = useRef<HTMLDivElement | null>(null);

  /**
   * Configures the floating UI element with specified placement, strategy, and middleware.
   *
   * @constant
   * @property {Object} floatingStyles - The styles to be applied to the floating element.
   * @property {Object} refs - References to the floating and reference elements.
   * @function useFloating - A hook that provides utilities for positioning floating elements.
   * @param {Object} options - Configuration options for the floating element.
   * @param {string} options.placement - The preferred placement of the floating element (e.g., 'top', 'bottom').
   * @param {string} options.strategy - The positioning strategy ('absolute' or 'fixed').
   * @param {Array} options.middleware - An array of middleware functions to modify the positioning behavior.
   * @middleware flip - Ensures the floating element stays visible by flipping its placement when necessary.
   * @middleware shift - Adjusts the floating element to remain within the viewport.
   * @middleware offsetMiddleware - Adds an offset to the floating element's position.
   * @param {Object} offsetMiddleware.options - Configuration for the offset middleware.
   * @param {number} offsetMiddleware.options.mainAxis - The offset distance along the main axis.
   */
  const {
    floatingStyles,
    refs,
    middlewareData,
    placement: finalPlacement,
  } = useFloating({
    placement,
    strategy: 'absolute',
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      shift(),
      arrow ? arrowMiddleware({ element: arrowRef }) : undefined,
      /**
       * Applies an offset to the floating element's position.
       * When arrow is enabled, the offset is calculated using the formula:
       * offset + (√(2 * arrowSize²) / 2)
       * This formula accounts for the arrow's diagonal length when rotated 45°,
       * ensuring proper spacing between the tooltip and its target.
       * When arrow is disabled, uses the base offset value.
       */
      offsetMiddleware(
        arrow ? offset + Math.sqrt(2 * arrowSize ** 2) / 2 : offset,
      ),
    ],
  });

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
  function isForwardRefComponent(Component: any): boolean {
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
  }

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
  }, [children]);

  const isControlled = open !== undefined;
  const isOpenState = isControlled ? open : isOpen;

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
        refs.setReference(node);
        const childRef = getReactElementRef(childrenElement);

        if (typeof childRef === 'function') {
          childRef(node);
        } else if (childRef && 'current' in childRef) {
          (childRef as React.MutableRefObject<typeof node>).current = node;
        }
      },
      'aria-describedby': isOpenState ? tooltipId : undefined,
      onMouseOver: () => {
        handleOpen(true);
        childrenElement?.props.onMouseOver?.();
      },
      onMouseLeave: () => {
        handleClose(true);
        childrenElement?.props.onMouseLeave?.();
      },
      onFocus: () => {
        handleOpen(false);
        childrenElement?.props.onFocus?.();
      },
      onBlur: () => {
        handleClose(false);
        childrenElement?.props.onBlur?.();
      },
      tabIndex: childrenElement?.props.tabIndex || 0,
    }),
    [childrenElement, handleClose, handleOpen, isOpenState, refs, tooltipId],
  );

  const Trigger = cloneElement(childrenElement, childrenProps);

  /**
   * Calculates the CSS positioning styles for the tooltip arrow based on its placement.
   *
   * The arrow is positioned using a combination of absolute positioning and negative margins:
   * - For x/y positioning, uses the coordinates provided by Floating UI's arrow middleware
   * - For the side opposite to the tooltip placement, uses a negative margin of -arrowLen/2
   *   This creates the effect of the arrow protruding from the tooltip by half its length
   *
   * @param {PositionType} placement - The tooltip placement (e.g. 'top', 'bottom-start', etc)
   * @param {Object} arrowData - Arrow position data from Floating UI
   * @param {number} [arrowData.x] - X coordinate for arrow positioning
   * @param {number} [arrowData.y] - Y coordinate for arrow positioning
   * @param {number} arrowLen - Length of the arrow in pixels
   * @returns {React.CSSProperties} CSS styles object for arrow positioning
   *
   * @example
   * // For a top placement with arrowLen = 12:
   * // Returns styles that position arrow at bottom of tooltip
   * // with negative margin of -6px (half the arrow length)
   * getArrowPositionStyle('top', {x: 100, y: 50}, 12)
   * // => { left: '100px', top: '50px', bottom: '-6px' }
   */
  function getArrowPositionStyle(
    placement: PositionType,
    arrowData: { x?: number; y?: number } = {},
    arrowLen: number,
  ): React.CSSProperties {
    const side = placement.split('-')[0];
    const staticSideMap = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    };

    const style: React.CSSProperties = {
      left: arrowData.x != null ? `${arrowData.x}px` : '',
      top: arrowData.y != null ? `${arrowData.y}px` : '',
      right: '',
      bottom: '',
      [staticSideMap[side]]: `${-arrowLen / 2}px`,
    };

    return style;
  }

  return (
    <>
      {Trigger}
      {isOpenState && content && (
        <Portal container={portalContainer}>
          <div
            className="headless-popper"
            ref={refs.setFloating}
            id={tooltipId}
            role="tooltip"
            style={{
              zIndex: zIndex,
              position: 'absolute',
              top: 0,
              left: 0,
              ...floatingStyles,
            }}
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
            <div className={`headless-tooltip ${className}`} {...props}>
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
                    ...getArrowPositionStyle(
                      finalPlacement,
                      middlewareData.arrow,
                      arrowSize,
                    ),
                  }}
                />
              )}
              {content}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

export default Tooltip;
