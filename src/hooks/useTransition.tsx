import { useEffect, useState } from 'react';

export type Phase =
  | 'enter'
  | 'entering'
  | 'entered'
  | 'exit'
  | 'exiting'
  | 'exited';

/**
 * Configuration options for the transition hook.
 */
interface UseTransitionProps {
  /**
   * Controls the visibility state of the component.
   * - `true`: Component transitions to visible state
   * - `false`: Component transitions to hidden state
   */
  in: boolean;

  /**
   * Duration in milliseconds for the enter animation.
   * @default 0
   */
  enterDuration?: number;

  /**
   * Duration in milliseconds for the exit animation.
   * @default 0
   */
  exitDuration?: number;

  /**
   * When `true`, bypasses all transition animations and immediately sets the final state.
   * @default false
   */
  skip?: boolean;
}

/**
 * Manages transition phases for smooth enter/exit animations.
 *
 * This hook implements a state machine that controls the transition phases:
 * - `enter`: Initial state when component begins appearing
 * - `entering`: Active animation state during enter transition
 * - `entered`: Final state when component is fully visible
 * - `exiting`: Active animation state during exit transition
 * - `exited`: Final state when component is hidden
 *
 * The hook uses `requestAnimationFrame` to ensure smooth transitions and manages
 * timing for both enter and exit animations independently.
 *
 * @param props - Configuration object for the transition
 * @returns The current transition phase
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const phase = useTransition({
 *     in: isOpen,
 *     enterDuration: 200,
 *     exitDuration: 150
 *   });
 *
 *   return (
 *     <div data-phase={phase}>
 *       Component content
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Custom timing with transitions enabled
 * const phase = useTransition({
 *   in: isVisible,
 *   enterDuration: 300,
 *   exitDuration: 50,
 *   skip: false
 * });
 * ```
 *
 * @example
 * ```tsx
 * // Simple usage with default values
 * const phase = useTransition({
 *   in: isVisible
 *   // Uses default durations: enterDuration: 0, exitDuration: 0, skip: false
 * });
 * ```
 */
export function useTransition({
  in: isEnter,
  enterDuration = 0,
  exitDuration = 0,
  skip = false,
}: UseTransitionProps) {
  const [phase, setPhase] = useState<Phase>(isEnter ? 'entered' : 'exited');

  useEffect(() => {
    let timer;

    if (skip) {
      return;
    }

    if (isEnter) {
      if (phase === 'entered' || phase === 'entering') return;

      // Step 1: enter
      setPhase('enter');

      requestAnimationFrame(() => {
        // Force reflow before adding active phase
        setPhase('entering');
      });

      timer = window.setTimeout(() => {
        setPhase('entered');
      }, enterDuration);
    } else {
      if (phase === 'exited' || phase === 'exiting') return;

      // Step 1: exit
      setPhase('exit');

      requestAnimationFrame(() => {
        setPhase('exiting');
      });

      timer = window.setTimeout(() => {
        setPhase('exited');
      }, exitDuration);
    }
    return () => {
      window.clearTimeout(timer);
    };
  }, [enterDuration, exitDuration, isEnter]);

  return phase;
}
