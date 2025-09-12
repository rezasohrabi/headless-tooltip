---
sidebar_position: 1
---

# Tooltip API

Complete API reference for the Tooltip component.

## Props

### Required Props

| Prop       | Type              | Description                           |
| ---------- | ----------------- | ------------------------------------- |
| `children` | `React.ReactNode` | The element that triggers the tooltip |
| `content`  | `React.ReactNode` | The content to display in the tooltip |

### Optional Props

| Prop           | Type                                         | Default     | Description                                           |
| -------------- | -------------------------------------------- | ----------- | ----------------------------------------------------- |
| `placement`    | `Placement`                                  | `'top'`     | Where to position the tooltip relative to the trigger |
| `trigger`      | `'hover' \| 'click' \| 'focus'`              | `'hover'`   | How the tooltip is triggered                          |
| `disabled`     | `boolean`                                    | `false`     | Whether the tooltip is disabled                       |
| `open`         | `boolean`                                    | `undefined` | Controlled open state                                 |
| `defaultOpen`  | `boolean`                                    | `false`     | Default open state (uncontrolled)                     |
| `onOpenChange` | `(open: boolean) => void`                    | `undefined` | Callback when open state changes                      |
| `className`    | `string`                                     | `undefined` | CSS class for the tooltip container                   |
| `style`        | `React.CSSProperties`                        | `undefined` | Inline styles for the tooltip container               |
| `delay`        | `number \| { show?: number, hide?: number }` | `0`         | Delay before showing/hiding tooltip (ms)              |
| `arrow`        | `boolean`                                    | `false`     | Whether to show an arrow pointing to the trigger      |

## Placement Options

The `placement` prop accepts the following values:

- `'top'`, `'top-start'`, `'top-end'`
- `'bottom'`, `'bottom-start'`, `'bottom-end'`
- `'left'`, `'left-start'`, `'left-end'`
- `'right'`, `'right-start'`, `'right-end'`

## Examples

### Controlled Tooltip

```jsx
import { useState } from 'react';
import { Tooltip } from 'headless-tooltip';

function ControlledTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip content="Controlled tooltip" open={open} onOpenChange={setOpen}>
      <button>Controlled tooltip trigger</button>
    </Tooltip>
  );
}
```

### Custom Delays

```jsx
<Tooltip content="Delayed tooltip" delay={{ show: 500, hide: 100 }}>
  <button>Hover me (with delay)</button>
</Tooltip>
```

### With Arrow

```jsx
<Tooltip content="Tooltip with arrow" arrow placement="top">
  <button>Arrow tooltip</button>
</Tooltip>
```
