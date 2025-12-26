---
sidebar_position: 2
title: Basic Usage
description: Learn how to use Headless React Tooltip with practical examples. Custom styling, positioning, and trigger events for accessible tooltips.
keywords:
  [
    react tooltip examples,
    tooltip positioning,
    custom tooltip styling,
    react tooltip tutorial,
  ]
---

import LiveCodeEditor from '@site/src/components/LiveCodeEditor';

# Basic Usage

Learn how to use Headless React Tooltip with simple, practical examples. Create beautiful, accessible tooltips in minutes.

## Your First Tooltip

The simplest way to create a tooltip:

<LiveCodeEditor
code={`function MyComponent() {
return (
<Tooltip content="This is a tooltip!">
<button style={{
        padding: '10px 20px',
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
Hover me
</button>
</Tooltip>
);
}

render(<MyComponent />);`}
noInline
/>

## Custom Styling

Since this is a headless component, you have full control over styling:

<LiveCodeEditor
code={`function StyledTooltip() {
return (
<Tooltip
content="Custom styled tooltip"
style={{
        background: '#1f2937',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      }} >
<span style={{
        padding: '8px 16px',
        background: '#10b981',
        color: 'white',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'inline-block'
      }}>
Hover for info
</span>
</Tooltip>
);
}

render(<StyledTooltip />);`}
noInline
/>

## Positioning

Control where your tooltip appears:

<LiveCodeEditor
code={`function PositioningExample() {
const placements = ['top', 'bottom', 'left', 'right'];

return (
<div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
{placements.map(placement => (
<Tooltip
key={placement}
content={\`Tooltip on \${placement}\`}
placement={placement}
style={{
            background: '#6366f1',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '13px'
          }} >
<button style={{
            padding: '8px 16px',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            textTransform: 'capitalize'
          }}>
{placement}
</button>
</Tooltip>
))}
</div>
);
}

render(<PositioningExample />);`}
noInline
/>

Available positions: `top`, `bottom`, `left`, `right`, and their variations like `top-start`, `top-end`, etc.

## Trigger Events

Control how tooltips are triggered:

<LiveCodeEditor
code={`function TriggerExample() {
return (
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
<Tooltip
content="Hover tooltip"
trigger="hover"
style={{
          background: '#3b82f6',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '4px'
        }} >
<button style={{
          padding: '8px 16px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
Hover me
</button>
</Tooltip>

      <Tooltip
        content="Click tooltip"
        trigger="click"
        style={{
          background: '#10b981',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '4px'
        }}
      >
        <button style={{
          padding: '8px 16px',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Click me
        </button>
      </Tooltip>

      <Tooltip
        content="Focus tooltip"
        trigger="focus"
        style={{
          background: '#f59e0b',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '4px'
        }}
      >
        <input
          placeholder="Focus me"
          style={{
            padding: '8px 16px',
            border: '2px solid #f59e0b',
            borderRadius: '6px',
            outline: 'none'
          }}
        />
      </Tooltip>
    </div>

);
}

render(<TriggerExample />);`}
noInline
/>

## What's Next?

- [API Reference](../api/tooltip.md) - Complete API documentation
- [Examples](../examples/basic.md) - More advanced examples
