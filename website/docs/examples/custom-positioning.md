---
sidebar_position: 1
title: Custom Positioning
description: Advanced positioning techniques for complex layouts
keywords: [tooltip positioning, custom placement, advanced positioning]
---

import LiveCodeEditor from '@site/src/components/LiveCodeEditor';

# Custom Positioning

Learn advanced positioning techniques for complex use cases.

## Offset Customization

Control the distance between tooltip and trigger:

```jsx
<Tooltip
  content="Custom offset"
  placement="top"
  offset={20} // 20px away from trigger
>
  <button>Hover me</button>
</Tooltip>
```

## Dynamic Positioning

Change position based on state:

```jsx
function DynamicPositionTooltip() {
  const [placement, setPlacement] = useState('top');

  return (
    <div>
      <select onChange={(e) => setPlacement(e.target.value)}>
        <option value="top">Top</option>
        <option value="right">Right</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
      </select>

      <Tooltip content="Dynamic position" placement={placement}>
        <button>Hover me</button>
      </Tooltip>
    </div>
  );
}
```

## Viewport-Aware Positioning

Tooltip automatically adjusts when near screen edges:

```jsx
<Tooltip
  content="I adjust automatically near edges"
  placement="top"
  // Automatically flips to bottom if no space at top
>
  <button>Hover me</button>
</Tooltip>
```

## Custom Z-Index

Control stacking order:

```jsx
<Tooltip content="High priority tooltip" zIndex={9999}>
  <button>Hover me</button>
</Tooltip>
```

## Portal Container

Render tooltip in a custom container:

```jsx
function CustomPortal() {
  const portalRef = useRef(null);

  return (
    <div>
      <div ref={portalRef} id="tooltip-portal" />

      <Tooltip
        content="Rendered in custom portal"
        portalContainer={portalRef.current}
      >
        <button>Hover me</button>
      </Tooltip>
    </div>
  );
}
```

## Fixed Position Layouts

For scrollable containers:

```jsx
<div className="scrollable-container">
  <Tooltip content="Works in scroll containers" placement="top">
    <button>Scroll and hover</button>
  </Tooltip>
</div>
```
