import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../src/index';
import React from 'react';
import './index.css';
import { Placement } from '../src/types';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    content: 'This is a basic tooltip',
    children: <button>Hover me</button>,
  },
};

export const WithCustomPlacement: Story = {
  args: {
    content: 'Tooltip on the right',
    placement: 'right',
    children: <button>Hover me</button>,
    className: 'styled-tooltip',
  },
};

export const WithArrow: Story = {
  args: {
    content: 'Tooltip with arrow',
    arrow: true,
    children: <button>Hover me</button>,
    className: 'styled-tooltip',
    arrowClassName: 'bg-gray-900',
  },
};

export const WithCustomOffset: Story = {
  args: {
    content: 'Tooltip with custom offset',
    offset: 20,
    children: <button>Hover me</button>,
    className: 'styled-tooltip',
  },
};

export const WithCustomDelay: Story = {
  args: {
    content: 'Tooltip with custom delay',
    openDelay: 800,
    closeDelay: 1000,
    children: <button>Hover me</button>,
    className: 'styled-tooltip',
  },
};

export const WithCustomZIndex: Story = {
  args: {
    content: 'Tooltip with custom z-index',
    zIndex: 1500,
    children: <button>Hover me</button>,
    className: 'styled-tooltip',
  },
};

export const WithCustomStyling: Story = {
  args: {
    content: <div>Custom styled tooltip</div>,
    children: <button>Hover me</button>,
    className: 'bg-indigo-600 text-white shadow-xl text-sm px-4 py-2',
    arrow: true,
    arrowClassName: 'bg-indigo-700',
  },
};

export const WithInteractiveContent: Story = {
  args: {
    content: (
      <div>
        <p>Interactive tooltip content</p>
        <button
          onClick={() => alert('Button clicked!')}
          style={{
            backgroundColor: '#dc3912',
            width: '100%',
          }}
        >
          Click me
        </button>
      </div>
    ),
    disableInteractive: false,
    children: <button>Hover me</button>,
    className: 'styled-tooltip',
  },
};

export const WithControlledState: Story = {
  args: {
    content: 'Controlled tooltip',
    open: true,
    children: <button>Controlled tooltip</button>,
    className: 'styled-tooltip',
  },
};
export const WithDifferentPlacements: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '60px', // more gap between buttons
        padding: '40px', // avoid edge collisions
      }}
    >
      {[
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
      ].map((placement) => (
        <div
          key={placement}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '120px', // minimum space for tooltip + button
            minHeight: '120px', // avoid overlapping vertically
            position: 'relative',
          }}
        >
          <Tooltip
            content={`Tooltip on ${placement}`}
            placement={placement as Placement}
            className="styled-tooltip"
          >
            <button className="placement-button">{placement}</button>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};
