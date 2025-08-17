import { HTMLAttributes } from 'react';
import { PositionType } from 'react-uni-popper';

/**
 * Props interface for the Tooltip component.
 *
 * @example
 * ```tsx
 * <Tooltip
 *   content="This is a helpful tooltip"
 *   placement="top"
 *   openDelay={300}
 * >
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** The trigger element that will show the tooltip on hover/focus */
  children: React.ReactNode;

  /** Additional CSS class names for the tooltip container */
  className?: string;

  /** The content to display inside the tooltip. Can be text, JSX, or any React node */
  content: React.ReactNode;

  /**
   * The preferred placement of the tooltip relative to the trigger element.
   * @default "top"
   */
  placement?: PositionType;

  /**
   * Distance in pixels between the tooltip and the trigger element.
   * @default 4
   */
  offset?: number;

  /**
   * CSS z-index value for the tooltip. Useful for layering.
   * @default undefined
   */
  zIndex?: number;

  /**
   * Controls whether the tooltip is visible. Useful for controlled tooltips.
   * @default undefined
   */
  open?: boolean;

  /**
   * Delay in milliseconds before showing the tooltip after hover/focus.
   * @default 300
   */
  openDelay?: number;

  /**
   * Delay in milliseconds before hiding the tooltip after losing hover/focus.
   * @default 200
   */
  closeDelay?: number;

  /**
   * When true, prevents the tooltip from closing when hovering over the tooltip itself.
   * Useful for interactive tooltips with buttons or links.
   * @default false
   */
  disableInteractive?: boolean;

  /**
   * Callback function called when the tooltip open state changes.
   * @param open - The new open state of the tooltip
   * @returns {void}
   *
   * @default undefined
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * DOM element to render the tooltip into. Useful for rendering in modals or specific containers.
   * @default document.body
   */
  portalContainer?: HTMLElement;

  /**
   * Whether to show an arrow pointing to the trigger element.
   * @default false
   */
  arrow?: boolean;

  /**
   * Size of the arrow in pixels. Only applies when arrow is true.
   * @default 12
   */
  arrowSize?: number;

  /**
   * Additional CSS class names for the arrow element.
   * Useful for custom arrow styling.
   * @default undefined
   */
  arrowClassName?: string;

  /**
   * Configuration for tooltip enter/exit animations.
   * @default { enable: false, enterDuration: 300, exitDuration: 300 }
   */
  transition?: {
    /**
     * Whether to enable transition animations.
     * @default false
     */
    enable?: boolean;

    /**
     * Duration of the enter animation in milliseconds.
     * @default 300
     */
    enterDuration?: number;

    /**
     * Duration of the exit animation in milliseconds.
     * @default 300
     */
    exitDuration?: number;
  };
}
