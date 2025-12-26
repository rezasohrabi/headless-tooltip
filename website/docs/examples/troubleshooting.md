---
sidebar_position: 4
title: Troubleshooting
description: Common issues and solutions
keywords: [tooltip issues, troubleshooting, debugging]
---

# Troubleshooting

Common issues and their solutions.

## Tooltip Not Showing

### Issue: Tooltip doesn't appear

**Possible causes:**

1. **z-index issues**: Tooltip might be behind other elements

```jsx
<Tooltip content="Now visible" zIndex={9999}>
  <button>Hover me</button>
</Tooltip>
```

2. **Parent container overflow**: Parent has `overflow: hidden`

```css
/* Fix in parent */
.parent {
  overflow: visible; /* Instead of hidden */
}
```

3. **Portal container**: Try custom portal

```jsx
<Tooltip content="Custom portal" portalContainer={document.body}>
  <button>Hover me</button>
</Tooltip>
```

## Positioning Issues

### Issue: Tooltip positioned incorrectly

**Solutions:**

1. **Check parent position**: Ensure parent isn't `position: fixed`
2. **Use offset**: Adjust spacing

```jsx
<Tooltip offset={10}>
  <button>Hover me</button>
</Tooltip>
```

3. **Try different placement**:

```jsx
<Tooltip placement="top-start">
  <button>Hover me</button>
</Tooltip>
```

## Animation Issues

### Issue: Animation not working

**Check:**

1. **Enable transitions**:

```jsx
<Tooltip transition={{ enable: true }}>
  <button>Hover me</button>
</Tooltip>
```

2. **CSS is loaded**:

```jsx
import './tooltip.css'; // Make sure CSS is imported
```

3. **Data attributes**:

```css
/* Check selectors match */
.tooltip[data-entering] {
  /* ... */
}
```

## Performance Issues

### Issue: Tooltip causing lag

**Solutions:**

1. **Add delays**:

```jsx
<Tooltip openDelay={300} closeDelay={200}>
  <button>Hover me</button>
</Tooltip>
```

2. **Memoize content**:

```jsx
const content = useMemo(() => <ExpensiveComponent />, []);
```

3. **Simplify animations**:

```css
/* Use simple transitions */
.tooltip {
  transition: opacity 200ms;
}
```

## TypeScript Issues

### Issue: Type errors

**Solutions:**

1. **Install type definitions**:

```bash
npm install --save-dev @types/react @types/react-dom
```

2. **Import types**:

```tsx
import { Tooltip, TooltipProps } from 'headless-tooltip';

const MyTooltip: React.FC<TooltipProps> = (props) => {
  return <Tooltip {...props} />;
};
```

## SSR Issues

### Issue: Errors during server-side rendering

**Solutions:**

1. **Dynamic import**:

```jsx
import dynamic from 'next/dynamic';

const Tooltip = dynamic(() => import('headless-tooltip'), { ssr: false });
```

2. **Check for window**:

```jsx
if (typeof window !== 'undefined') {
  // Use tooltip
}
```

## Mobile Issues

### Issue: Tooltip not working on mobile

**Solutions:**

1. **Add touch events**: Already handled by library
2. **Increase tap area**:

```css
.trigger {
  min-width: 44px;
  min-height: 44px;
}
```

3. **Use click trigger** for mobile:

```jsx
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

<Tooltip trigger={isMobile ? 'click' : 'hover'}>
  <button>Touch me</button>
</Tooltip>;
```

## Arrow Issues

### Issue: Arrow not visible or misaligned

**Solutions:**

1. **Check arrow is enabled**:

```jsx
<Tooltip arrow={true}>
  <button>Hover me</button>
</Tooltip>
```

2. **Style the arrow**:

```css
.tooltip-arrow {
  background: #333;
}
```

3. **Adjust arrow size**:

```jsx
<Tooltip arrowSize={12}>
  <button>Hover me</button>
</Tooltip>
```

## Content Issues

### Issue: Content overflowing

**Solutions:**

1. **Set max-width**:

```css
.tooltip {
  max-width: 300px;
  word-wrap: break-word;
}
```

2. **Handle long text**:

```css
.tooltip {
  overflow-wrap: break-word;
  hyphens: auto;
}
```

## React Strict Mode

### Issue: Double rendering warnings

This is normal in development. Strict Mode intentionally double-renders to catch bugs. It won't happen in production.

## Getting Help

If you're still having issues:

1. **Check GitHub Issues**: [github.com/rezasohrabi/headlessui-tooltip/issues](https://github.com/rezasohrabi/headlessui-tooltip/issues)
2. **Ask on Stack Overflow**: Tag with `headless-tooltip`
3. **Read documentation**: [Full docs](/docs/intro)

## Debugging Tips

```jsx
function DebugTooltip() {
  return (
    <Tooltip
      content="Debug mode"
      onOpenChange={(open) =>
        console.log('Tooltip:', open ? 'opened' : 'closed')
      }
    >
      <button onClick={() => console.log('Button clicked')}>Debug me</button>
    </Tooltip>
  );
}
```

## Next Steps

- [API Reference](../api/tooltip.md)
- [Styling Examples](./styling.md)
- [GitHub Issues](https://github.com/rezasohrabi/headlessui-tooltip/issues)
