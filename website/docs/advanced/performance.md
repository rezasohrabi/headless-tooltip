---
sidebar_position: 3
title: Performance Optimization
description: Tips for optimizing tooltip performance
keywords: [tooltip performance, optimization, best practices]
---

# Performance Optimization

Optimize your tooltips for best performance.

## Lazy Loading Content

Load heavy content only when needed:

```jsx
function LazyTooltip() {
  const [content, setContent] = useState(null);

  const handleOpen = async () => {
    if (!content) {
      const data = await fetchData();
      setContent(data);
    }
  };

  return (
    <Tooltip
      content={content || 'Loading...'}
      onOpenChange={(open) => open && handleOpen()}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Memoization

Prevent unnecessary re-renders:

```jsx
import { memo, useMemo } from 'react';

const ExpensiveTooltipContent = memo(({ data }) => {
  // Complex rendering logic
  return <div>{/* Complex content */}</div>;
});

function OptimizedTooltip() {
  const tooltipContent = useMemo(
    () => <ExpensiveTooltipContent data={data} />,
    [data],
  );

  return (
    <Tooltip content={tooltipContent}>
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Debouncing

Reduce tooltip flickering:

```jsx
<Tooltip
  content="Debounced tooltip"
  openDelay={300} // Wait 300ms before showing
  closeDelay={200} // Wait 200ms before hiding
>
  <button>Hover me</button>
</Tooltip>
```

## Virtual Scrolling

For tooltips in long lists:

```jsx
import { FixedSizeList } from 'react-window';

function VirtualListWithTooltips() {
  const Row = ({ index, style }) => (
    <div style={style}>
      <Tooltip content={`Item ${index}`}>
        <button>Item {index}</button>
      </Tooltip>
    </div>
  );

  return (
    <FixedSizeList height={400} itemCount={1000} itemSize={50}>
      {Row}
    </FixedSizeList>
  );
}
```

## CSS Optimization

Use GPU-accelerated properties:

```css
.fast-tooltip {
  /* Good - GPU accelerated */
  transform: translateY(0);
  opacity: 1;
  will-change: transform, opacity;
}

.fast-tooltip[data-entering] {
  animation: fastFadeIn 200ms ease-out;
}

@keyframes fastFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Bundle Size

Optimize imports:

```jsx
// ❌ Bad - imports entire library
import Tooltip from 'headless-tooltip';

// ✅ Good - tree-shaking friendly
import { Tooltip } from 'headless-tooltip';
```

## Best Practices

1. **Use `openDelay`**: Prevent tooltips from showing too quickly
2. **Memoize content**: Cache expensive computations
3. **Lazy load**: Load heavy content on demand
4. **CSS transforms**: Use `transform` instead of `top/left`
5. **Limit tooltips**: Don't show too many at once
6. **Virtual scrolling**: For long lists
7. **Debounce**: Reduce unnecessary updates

## Monitoring

Measure performance:

```jsx
function MonitoredTooltip() {
  const handleOpenChange = (open) => {
    if (open) {
      performance.mark('tooltip-open-start');
    } else {
      performance.mark('tooltip-open-end');
      performance.measure(
        'tooltip-open',
        'tooltip-open-start',
        'tooltip-open-end',
      );
    }
  };

  return (
    <Tooltip content="Monitored" onOpenChange={handleOpenChange}>
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Next Steps

- [Troubleshooting](./troubleshooting.md)
- [API Reference](../api/tooltip.md)
