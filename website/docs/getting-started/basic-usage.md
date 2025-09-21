---
sidebar_position: 2
---

# Basic Usage

Learn how to use Headless React Tooltip with simple examples.

## Your First Tooltip

The simplest way to create a tooltip:

```jsx
import { Tooltip } from 'headless-tooltip';

function MyComponent() {
  return (
    <Tooltip content="This is a tooltip!">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Custom Styling

Since this is a headless component, you have full control over styling:

```jsx
import { Tooltip } from 'headless-tooltip';
import './my-tooltip.css';

function StyledTooltip() {
  return (
    <Tooltip content="Custom styled tooltip" className="my-custom-tooltip">
      <span className="trigger">Hover for info</span>
    </Tooltip>
  );
}
```

```css
/* my-tooltip.css */
.my-custom-tooltip {
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
```

## Positioning

Control where your tooltip appears:

```jsx
<Tooltip content="I appear on top!" placement="top">
  <button>Top tooltip</button>
</Tooltip>

<Tooltip content="I appear on the right!" placement="right">
  <button>Right tooltip</button>
</Tooltip>
```

Available positions: `top`, `bottom`, `left`, `right`, and their variations like `top-start`, `top-end`, etc.

## Trigger Events

Control how tooltips are triggered:

```jsx
// Hover trigger (default)
<Tooltip content="Hover tooltip" trigger="hover">
  <button>Hover me</button>
</Tooltip>

// Click trigger
<Tooltip content="Click tooltip" trigger="click">
  <button>Click me</button>
</Tooltip>

// Focus trigger
<Tooltip content="Focus tooltip" trigger="focus">
  <input placeholder="Focus me" />
</Tooltip>
```

## What's Next?

- [API Reference](../api/tooltip.md) - Complete API documentation
- [Examples](../examples/basic.md) - More advanced examples
