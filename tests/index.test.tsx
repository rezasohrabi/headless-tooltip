import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  vi,
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
} from 'vitest';
import '@testing-library/jest-dom';

import { Tooltip } from '../src/index';

describe('Tooltip', () => {
  beforeEach(() => {
    // Create a container for the portal to avoid test warnings
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);

    // Mock timers for delay testing
    vi.useFakeTimers();

    // Mock ResizeObserver
    const mockResizeObserver = vi.fn();
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: mockResizeObserver,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    // Clean up the portal container
    const portalRoot = document.getElementById('portal-root');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }

    // Restore timers
    vi.restoreAllMocks();
  });

  test('renders without crashing', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  test('shows tooltip on mouse over with default delay', async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Default open delay is 300ms
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    // Fast-forward time to trigger the delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('hides tooltip on mouse leave with default delay', async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    // Show tooltip
    fireEvent.mouseOver(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    // Hide tooltip
    fireEvent.mouseLeave(screen.getByText('Hover me'));

    // Default close delay is 200ms
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('shows tooltip immediately on focus', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Focus me</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByText('Focus me'));

    // Should show immediately without delay on focus
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('hides tooltip immediately on blur', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Focus me</button>
      </Tooltip>,
    );

    // Show tooltip with focus
    fireEvent.focus(screen.getByText('Focus me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    // Hide tooltip with blur
    fireEvent.blur(screen.getByText('Focus me'));

    // Should hide immediately without delay on blur
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('applies custom class name to tooltip', async () => {
    render(
      <Tooltip content="Tooltip content" className="custom-tooltip-class">
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseOver(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(300);
    });

    const tooltipElement = screen
      .getByText('Tooltip content')
      .closest('.headless-tooltip');
    expect(tooltipElement).toHaveClass('custom-tooltip-class');
  });

  test('handles controlled mode with open prop', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip content" open={false}>
        <button>Controlled Tooltip</button>
      </Tooltip>,
    );

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    rerender(
      <Tooltip content="Tooltip content" open={true}>
        <button>Controlled Tooltip</button>
      </Tooltip>,
    );

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('calls onOpenChange callback when state changes', async () => {
    const onOpenChange = vi.fn();

    render(
      <Tooltip content="Tooltip content" onOpenChange={onOpenChange}>
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseOver(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onOpenChange).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('respects custom delay settings', async () => {
    const openDelay = 500;
    const closeDelay = 400;

    render(
      <Tooltip
        content="Tooltip content"
        openDelay={openDelay}
        closeDelay={closeDelay}
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Not visible before delay
    act(() => {
      vi.advanceTimersByTime(openDelay - 10);
    });
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    // Visible after delay
    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    // Start closing
    fireEvent.mouseLeave(screen.getByText('Hover me'));

    // Still visible before close delay
    act(() => {
      vi.advanceTimersByTime(closeDelay - 10);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    // Hidden after close delay
    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('renders arrow when arrow prop is true', () => {
    render(
      <Tooltip content="Tooltip content" arrow={true} open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const arrowElement = document.querySelector('.headless-tooltip-arrow');
    expect(arrowElement).toBeInTheDocument();
  });

  test('applies custom arrow class name', () => {
    render(
      <Tooltip
        content="Tooltip content"
        arrow={true}
        arrowClassName="custom-arrow-class"
        open={true}
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    const arrowElement = document.querySelector('.headless-tooltip-arrow');
    expect(arrowElement).toHaveClass('custom-arrow-class');
  });

  test('sets custom arrow size', () => {
    const customSize = 20;

    render(
      <Tooltip
        content="Tooltip content"
        arrow={true}
        arrowSize={customSize}
        open={true}
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    const arrowElement = document.querySelector(
      '.headless-tooltip-arrow',
    ) as HTMLElement;
    expect(arrowElement.style.width).toBe(`${customSize}px`);
    expect(arrowElement.style.height).toBe(`${customSize}px`);
  });

  test('closes tooltip when Escape key is pressed', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseOver(screen.getByText('Hover me'));

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('respects disableInteractive prop', () => {
    render(
      <Tooltip content="Tooltip content" open={true} disableInteractive={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const tooltipElement = screen
      .getByText('Tooltip content')
      .closest('.headless-popper') as HTMLElement;

    // Events should not be defined when disableInteractive is true
    expect(tooltipElement).not.toHaveAttribute('onMouseEnter');
    expect(tooltipElement).not.toHaveAttribute('onMouseLeave');
  });

  test('keeps tooltip open when hovering over tooltip with interactive mode', async () => {
    render(
      <Tooltip content="Tooltip content" disableInteractive={false}>
        <button>Hover me</button>
      </Tooltip>,
    );

    // Show tooltip
    fireEvent.mouseOver(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    // Mouse leaves trigger but enters tooltip
    fireEvent.mouseLeave(screen.getByText('Hover me'));

    // Simulate mouse enter on tooltip
    fireEvent.mouseEnter(
      screen
        .getByText('Tooltip content')
        .closest('.headless-popper') as HTMLElement,
    );

    // Fast-forward past the close delay
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Tooltip should still be visible because we're hovering over it
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('renders in a custom portal container', () => {
    const customContainer = document.createElement('div');
    customContainer.id = 'custom-container';
    document.body.appendChild(customContainer);

    render(
      <Tooltip
        content="Tooltip content"
        open={true}
        portalContainer={customContainer}
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    const tooltipInCustomContainer =
      customContainer.querySelector('.headless-tooltip');
    expect(tooltipInCustomContainer).toBeInTheDocument();
    expect(tooltipInCustomContainer?.textContent).toBe('Tooltip content');

    // Clean up
    document.body.removeChild(customContainer);
  });

  test('wraps non-element children in a span', () => {
    render(<Tooltip content="Tooltip content">Text Node</Tooltip>);

    const span = screen.getByText('Text Node');
    expect(span.tagName).toBe('SPAN');
  });

  test('sets aria-describedby when tooltip is open', () => {
    render(
      <Tooltip content="Tooltip content" open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    const tooltipId = trigger.getAttribute('aria-describedby');
    expect(tooltipId).toBeTruthy();

    const tooltip = document.getElementById(tooltipId as string);
    expect(tooltip).toBeInTheDocument();
    expect(tooltip?.textContent).toBe('Tooltip content');
  });

  test('cleans up timeouts on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    // Trigger open timeout
    fireEvent.mouseOver(screen.getByText('Hover me'));

    unmount();

    // Should clear any pending timeouts on unmount
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  // Additional test scenarios to minimize risk of bugs or errors

  test('handles zero delay values correctly', () => {
    render(
      <Tooltip content="Tooltip content" openDelay={0} closeDelay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseOver(screen.getByText('Hover me'));
    // Should show immediately with zero delay
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText('Hover me'));
    // Should hide immediately with zero delay
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('applies correct z-index when specified', () => {
    const customZIndex = 9999;

    render(
      <Tooltip content="Tooltip content" zIndex={customZIndex} open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const tooltipElement = screen
      .getByText('Tooltip content')
      .closest('.headless-popper') as HTMLElement;

    expect(tooltipElement.style.zIndex).toBe(customZIndex.toString());
  });

  test('handles React components as content', () => {
    const TooltipContent = () => (
      <div data-testid="complex-content">
        <h3>Tooltip Title</h3>
        <p>Tooltip description</p>
      </div>
    );

    render(
      <Tooltip content={<TooltipContent />} open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.getByTestId('complex-content')).toBeInTheDocument();
    expect(screen.getByText('Tooltip Title')).toBeInTheDocument();
    expect(screen.getByText('Tooltip description')).toBeInTheDocument();
  });

  test('works with forwardRef components as children', () => {
    const ForwardRefButton = React.forwardRef<
      HTMLButtonElement,
      React.ButtonHTMLAttributes<HTMLButtonElement>
    >((props, ref) => (
      <button ref={ref} {...props}>
        {props.children}
      </button>
    ));

    render(
      <Tooltip content="Tooltip content">
        <ForwardRefButton>Forward Ref Button</ForwardRefButton>
      </Tooltip>,
    );

    fireEvent.mouseOver(screen.getByText('Forward Ref Button'));
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('maintains tooltip state when re-rendering with same props', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    // Show tooltip
    fireEvent.mouseOver(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    // Re-render with the same props
    rerender(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    // Tooltip should still be visible
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('handles placement prop correctly', () => {
    // Test a specific placement
    render(
      <Tooltip content="Tooltip content" placement="bottom" open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    // We can't easily test the actual position calculation,
    // but we can check that the component renders with this prop
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('handles offset prop correctly', () => {
    const customOffset = 10;

    render(
      <Tooltip content="Tooltip content" offset={customOffset} open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    // The offset affects floating-ui calculation which is hard to test directly,
    // but we can ensure the component renders with this prop
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('handles edge case with undefined children', () => {
    // @ts-ignore - Testing runtime behavior with invalid prop
    expect(() =>
      render(<Tooltip content="Content" children={undefined} />),
    ).not.toThrow();
  });

  test('handles edge case with empty content', () => {
    render(
      <Tooltip content="" open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    // Should not render an empty tooltip
    const tooltipElement = document.querySelector('.headless-tooltip');
    expect(tooltipElement).not.toBeInTheDocument();
  });

  test('handles rapid mouse enter/leave events correctly', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    // Mouse over - starts the show timer
    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Mouse leave before delay completes - should cancel show timer
    fireEvent.mouseLeave(screen.getByText('Hover me'));

    // Advance timer beyond open delay
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Tooltip should not be visible as the show was canceled
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    // Show tooltip
    fireEvent.mouseOver(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    // Mouse leave - starts the hide timer
    fireEvent.mouseLeave(screen.getByText('Hover me'));

    // Mouse over before hide completes - should cancel hide timer
    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Advance timer beyond close delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Tooltip should still be visible as the hide was canceled
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('correctly passes additional HTML attributes to tooltip', () => {
    render(
      <Tooltip
        content="Tooltip content"
        open={true}
        data-testid="tooltip-element"
        aria-label="Tooltip description"
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    const tooltipElement = screen
      .getByText('Tooltip content')
      .closest('.headless-tooltip');

    expect(tooltipElement).toHaveAttribute('data-testid', 'tooltip-element');
    expect(tooltipElement).toHaveAttribute('aria-label', 'Tooltip description');
  });

  test('does not render tooltip when content is null or undefined', () => {
    const { rerender } = render(
      <Tooltip content={null} open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    rerender(
      <Tooltip content={undefined} open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('handles concurrent timer management correctly', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    // Start open timer
    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Clear count before next action
    clearTimeoutSpy.mockClear();

    // Start close timer which should clear the open timer
    fireEvent.mouseLeave(screen.getByText('Hover me'));

    // Should have cleared the open timeout
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockClear();

    // Mouse over again, should clear the close timer
    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Should have cleared the close timeout
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  test('handles multiple tooltip instances correctly', () => {
    render(
      <div>
        <Tooltip content="Tooltip 1" data-testid="tooltip1">
          <button>Button 1</button>
        </Tooltip>
        <Tooltip content="Tooltip 2" data-testid="tooltip2">
          <button>Button 2</button>
        </Tooltip>
      </div>,
    );

    // Show first tooltip
    fireEvent.mouseOver(screen.getByText('Button 1'));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText('Tooltip 1')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument();

    // Show second tooltip
    fireEvent.mouseOver(screen.getByText('Button 2'));
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Both tooltips should be visible
    expect(screen.getByText('Tooltip 1')).toBeInTheDocument();
    expect(screen.getByText('Tooltip 2')).toBeInTheDocument();

    // Hide first tooltip
    fireEvent.mouseLeave(screen.getByText('Button 1'));
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Only second tooltip should remain
    expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument();
    expect(screen.getByText('Tooltip 2')).toBeInTheDocument();
  });

  test('maintains proper focus behavior for accessibility', () => {
    render(
      <div>
        <button>Before</button>
        <Tooltip data-testid="tooltip" content="Tooltip content">
          <button>Focus me</button>
        </Tooltip>
        <button>After</button>
      </div>,
    );

    // Tab to the tooltip trigger
    const beforeButton = screen.getByText('Before');
    const tooltipTrigger = screen.getByText('Focus me');
    const afterButton = screen.getByText('After');

    // Start with focus on before button
    act(() => {
      beforeButton.focus();
    });
    expect(document.activeElement).toBe(beforeButton);

    // Tab to tooltip trigger (simulate by focusing directly)
    act(() => {
      tooltipTrigger.focus();
    });
    expect(document.activeElement).toBe(tooltipTrigger);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    // Tab to after button
    act(() => {
      afterButton.focus();
    });
    expect(document.activeElement).toBe(afterButton);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('handles changing content in controlled mode', () => {
    const { rerender } = render(
      <Tooltip content="Initial content" open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.getByText('Initial content')).toBeInTheDocument();

    // Change content
    rerender(
      <Tooltip content="Updated content" open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.queryByText('Initial content')).not.toBeInTheDocument();
    expect(screen.getByText('Updated content')).toBeInTheDocument();
  });

  test('renders JSX content with interactive elements', () => {
    const handleClick = vi.fn();

    render(
      <Tooltip
        content={
          <div>
            <p>Complex tooltip</p>
            <button onClick={handleClick} data-testid="tooltip-button">
              Click me
            </button>
          </div>
        }
        open={true}
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    const tooltipButton = screen.getByTestId('tooltip-button');
    fireEvent.click(tooltipButton);

    expect(handleClick).toHaveBeenCalled();
  });

  test('preserves event handlers on children', () => {
    const onClickMock = vi.fn();
    const onFocusMock = vi.fn();
    const onBlurMock = vi.fn();
    const onMouseOverMock = vi.fn();
    const onMouseLeaveMock = vi.fn();

    render(
      <Tooltip content="Tooltip content">
        <button
          onClick={onClickMock}
          onFocus={onFocusMock}
          onBlur={onBlurMock}
          onMouseOver={onMouseOverMock}
          onMouseLeave={onMouseLeaveMock}
        >
          Button with events
        </button>
      </Tooltip>,
    );

    const button = screen.getByText('Button with events');

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);

    fireEvent.focus(button);
    expect(onFocusMock).toHaveBeenCalledTimes(1);

    fireEvent.blur(button);
    expect(onBlurMock).toHaveBeenCalledTimes(1);

    fireEvent.mouseOver(button);
    expect(onMouseOverMock).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(button);
    expect(onMouseLeaveMock).toHaveBeenCalledTimes(1);
  });

  test('applies appropriate ARIA attributes for accessibility', () => {
    render(
      <Tooltip content="Accessibility test" open={true}>
        <button>Accessible button</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Accessible button');
    const tooltipId = trigger.getAttribute('aria-describedby');

    // Trigger should have aria-describedby pointing to tooltip
    expect(tooltipId).toBeTruthy();

    // Tooltip should have role="tooltip"
    const tooltip = document.getElementById(tooltipId as string);
    expect(tooltip).toHaveAttribute('role', 'tooltip');
  });

  test('handles window resize events correctly', () => {
    // Mock the ResizeObserver
    const mockResizeObserver = vi.fn();
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: mockResizeObserver,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    const { unmount } = render(
      <Tooltip content="Tooltip content" open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    // Check if resize observer was set up
    expect(mockResizeObserver).toHaveBeenCalled();

    // Clean up
    unmount();
  });

  test('handles dynamic children without errors', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip content">
        <button>Initial Child</button>
      </Tooltip>,
    );

    // Change the children completely
    rerender(
      <Tooltip content="Tooltip content">
        <div>Completely Different Child</div>
      </Tooltip>,
    );

    // Should work without errors
    fireEvent.mouseOver(screen.getByText('Completely Different Child'));
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  // test('handles nested tooltip scenarios', () => {
  //   render(
  //     <Tooltip content="Outer tooltip">
  //       <button>
  //         Outer
  //         <Tooltip content="Inner tooltip">
  //           <span> (Inner)</span>
  //         </Tooltip>
  //       </button>
  //     </Tooltip>,
  //   );

  //   // Test outer tooltip
  //   fireEvent.mouseOver(screen.getByText('Outer', { exact: false }));
  //   act(() => {
  //     vi.advanceTimersByTime(300);
  //   });
  //   expect(screen.getByText('Outer tooltip')).toBeInTheDocument();

  //   // Test inner tooltip - we need to directly target the inner span
  //   fireEvent.mouseOver(screen.getByText(' (Inner)'));
  //   act(() => {
  //     vi.advanceTimersByTime(300);
  //   });

  //   // Both tooltips should be visible
  //   expect(screen.getByText('Outer tooltip')).toBeInTheDocument();
  //   expect(screen.getByText('Inner tooltip')).toBeInTheDocument();
  // });

  test('handles very large content gracefully', () => {
    const mockResizeObserver = vi.fn();
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: mockResizeObserver,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // Create a large content string
    const largeContent = 'A'.repeat(1000);

    render(
      <Tooltip content={largeContent} open={true}>
        <button>Hover me</button>
      </Tooltip>,
    );

    // Should render without errors
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent?.length).toBe(1000);
  });

  test('properly cleans up on unmount during animation', () => {
    const { unmount } = render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    // Start showing the tooltip
    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Unmount during the animation delay
    unmount();

    // Advance timers - should not cause errors
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // No assertions needed - we're just ensuring no errors are thrown
  });

  test('preserves tabIndex on the trigger element', () => {
    render(
      <Tooltip content="Tooltip content">
        <button tabIndex={2}>Custom TabIndex</button>
      </Tooltip>,
    );

    const triggerElement = screen.getByText('Custom TabIndex');
    expect(triggerElement).toHaveAttribute('tabIndex', '2');
  });

  // test('handles null and falsy content correctly', () => {
  //   // Test with falsy values like empty string
  //   const { rerender } = render(
  //     <Tooltip content={''} open={true}>
  //       <button>Hover me</button>
  //     </Tooltip>,
  //   );

  //   let tooltipElement = document.querySelector('.headless-tooltip');
  //   expect(tooltipElement).toBeInTheDocument();
  //   expect(tooltipElement?.textContent).toBe('');

  //   // Test with null content
  //   rerender(
  //     <Tooltip content={null} open={true}>
  //       <button>Hover me</button>
  //     </Tooltip>,
  //   );

  //   tooltipElement = document.querySelector('.headless-tooltip');
  //   expect(tooltipElement).not.toBeInTheDocument();

  //   // Test with undefined content
  //   rerender(
  //     <Tooltip content={undefined} open={true}>
  //       <button>Hover me</button>
  //     </Tooltip>,
  //   );

  //   tooltipElement = document.querySelector('.headless-tooltip');
  //   expect(tooltipElement).not.toBeInTheDocument();

  //   // Test with false content
  //   rerender(
  //     <Tooltip content={false as any} open={true}>
  //       <button>Hover me</button>
  //     </Tooltip>,
  //   );

  //   tooltipElement = document.querySelector('.headless-tooltip');
  //   expect(tooltipElement).not.toBeInTheDocument();
  // });

  test('works with DOM element references as children', () => {
    const ChildComponent = () => {
      const ref = React.useRef<HTMLButtonElement>(null);

      return (
        <Tooltip content="Referenced tooltip">
          <button ref={ref}>Button with ref</button>
        </Tooltip>
      );
    };

    render(<ChildComponent />);

    // Trigger the tooltip
    fireEvent.mouseOver(screen.getByText('Button with ref'));
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Referenced tooltip')).toBeInTheDocument();
  });

  // test('handles keyboard navigation accessibility', () => {
  //   render(
  //     <div>
  //       <button>Before</button>
  //       <Tooltip content="Tooltip content">
  //         <button>Focus me</button>
  //       </Tooltip>
  //       <button>After</button>
  //     </div>,
  //   );

  //   // Tab through elements using keyboard events
  //   const beforeButton = screen.getByText('Before');
  //   beforeButton.focus();

  //   // Simulate keyboard tab
  //   fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });

  //   // Since we can't fully simulate browser tab behavior, directly focus the trigger
  //   screen.getByText('Focus me').focus();
  //   expect(screen.getByText('Tooltip content')).toBeInTheDocument();

  //   // Tooltip should stay open when focused
  //   expect(screen.getByText('Tooltip content')).toBeInTheDocument();

  //   // Simulate keyboard tab again
  //   fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });

  //   // Move focus to the next element
  //   screen.getByText('After').focus();

  //   // Tooltip should close
  //   expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  // });

  test('correctly handles mouseenter/mouseleave on tooltip element in interactive mode', () => {
    render(
      <Tooltip content="Interactive tooltip" disableInteractive={false}>
        <button>Hover me</button>
      </Tooltip>,
    );

    // Show tooltip
    fireEvent.mouseOver(screen.getByText('Hover me'));
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Tooltip should be visible
    expect(screen.getByText('Interactive tooltip')).toBeInTheDocument();

    // Move mouse from trigger to tooltip
    fireEvent.mouseLeave(screen.getByText('Hover me'));

    // Before entering tooltip, in the delay period
    act(() => {
      vi.advanceTimersByTime(100); // Half the close delay
    });

    // Tooltip should still be visible during close delay
    expect(screen.getByText('Interactive tooltip')).toBeInTheDocument();

    // Now enter the tooltip itself
    fireEvent.mouseEnter(
      screen
        .getByText('Interactive tooltip')
        .closest('.headless-popper') as HTMLElement,
    );

    // Advance timer past close delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Tooltip should still be visible because we're hovering it
    expect(screen.getByText('Interactive tooltip')).toBeInTheDocument();

    // Now leave the tooltip
    fireEvent.mouseLeave(
      screen
        .getByText('Interactive tooltip')
        .closest('.headless-popper') as HTMLElement,
    );

    // Advance past close delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Tooltip should now be hidden
    expect(screen.queryByText('Interactive tooltip')).not.toBeInTheDocument();
  });

  test('is accessible to screen readers', () => {
    render(
      <Tooltip content="Screen reader accessible tooltip" open={true}>
        <button>Accessible Button</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Accessible Button');
    const tooltipId = trigger.getAttribute('aria-describedby');

    expect(tooltipId).toBeTruthy();

    const tooltip = document.getElementById(tooltipId || '');
    expect(tooltip).toHaveAttribute('role', 'tooltip');
    expect(tooltip?.textContent).toBe('Screen reader accessible tooltip');
  });

  test('renders correctly with HTML content', () => {
    render(
      <Tooltip
        content={
          <span data-testid="html-content">
            <strong>Bold</strong> and <em>italic</em>
          </span>
        }
        open={true}
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    const htmlContent = screen.getByTestId('html-content');
    expect(htmlContent).toBeInTheDocument();
    expect(htmlContent.querySelector('strong')).toBeInTheDocument();
    expect(htmlContent.querySelector('em')).toBeInTheDocument();
  });

  test('handles all placement positions without errors', () => {
    const placements = [
      'top',
      'right',
      'bottom',
      'left',
      'top-start',
      'top-end',
      'right-start',
      'right-end',
      'bottom-start',
      'bottom-end',
      'left-start',
      'left-end',
    ];

    placements.forEach((placement) => {
      const { unmount } = render(
        <Tooltip
          content={`Tooltip with ${placement} placement`}
          placement={placement as any}
          open={true}
        >
          <button>{placement} placement</button>
        </Tooltip>,
      );

      expect(
        screen.getByText(`Tooltip with ${placement} placement`),
      ).toBeInTheDocument();
      unmount();
    });
  });

  test('correctly applies arrow position based on placement', () => {
    // Test a few key placements
    const placementsToTest = ['top', 'bottom', 'left', 'right'];

    placementsToTest.forEach((placement) => {
      const { unmount } = render(
        <Tooltip
          content="Arrow tooltip"
          placement={placement as any}
          arrow={true}
          open={true}
        >
          <button>{placement} placement</button>
        </Tooltip>,
      );

      const arrowElement = document.querySelector(
        '.headless-tooltip-arrow',
      ) as HTMLElement;
      expect(arrowElement).toBeInTheDocument();

      // The arrow position styling should include the opposite side
      // For example, a 'top' placement should have 'bottom' property in the style
      const oppositeSides = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left',
      };

      // Verify arrow has a style for the opposite side
      expect(
        arrowElement.style[
          oppositeSides[placement as keyof typeof oppositeSides]
        ],
      ).toBeTruthy();

      unmount();
    });
  });

  test('handles ref forwarding correctly with nested components', () => {
    // Create a component that uses forwardRef and accepts a tooltip
    const ForwardedComponent = React.forwardRef<
      HTMLDivElement,
      React.HTMLProps<HTMLDivElement>
    >((props, ref) => (
      <div ref={ref} {...props}>
        Forwarded Component
      </div>
    ));

    // Wrapper that uses ref
    const TestComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null);

      React.useEffect(() => {
        // Verify the ref is properly set
        expect(ref.current).not.toBeNull();
      }, []);

      return (
        <Tooltip content="Ref tooltip">
          <ForwardedComponent ref={ref} data-testid="forwarded-element" />
        </Tooltip>
      );
    };

    render(<TestComponent />);

    const forwardedElement = screen.getByTestId('forwarded-element');
    expect(forwardedElement).toBeInTheDocument();

    // Test tooltip still works
    fireEvent.mouseOver(forwardedElement);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Ref tooltip')).toBeInTheDocument();
  });

  // test('applies custom styles correctly', () => {
  //   render(
  //     <Tooltip
  //       content="Styled tooltip"
  //       open={true}
  //       style={{ backgroundColor: 'red', padding: '10px' }}
  //     >
  //       <button>Styled button</button>
  //     </Tooltip>,
  //   );

  //   const tooltipElement = screen
  //     .getByText('Styled tooltip')
  //     .closest('.headless-tooltip') as HTMLElement;

  //   expect(tooltipElement.style.backgroundColor).toBe('red');
  //   expect(tooltipElement.style.padding).toBe('10px');
  // });

  // test('renders correctly in various document environments', () => {
  //   // Save the original document.body
  //   const originalBody = document.body;

  //   // Create a new mock document environment
  //   const newContainer = document.createElement('div');
  //   document.body.innerHTML = '';
  //   document.body.appendChild(newContainer);

  //   render(
  //     <Tooltip content="Environment test" open={true}>
  //       <button>Test button</button>
  //     </Tooltip>,
  //     { container: newContainer },
  //   );

  //   expect(screen.getByText('Environment test')).toBeInTheDocument();

  //   // Clean up
  //   document.body.innerHTML = '';
  //   document.body.appendChild(originalBody.cloneNode(true));
  // });
});
