---
sidebar_position: 6
title: Frequently Asked Questions
description: Common questions about Headless React Tooltip
keywords: [tooltip faq, common questions, help]
---

# Frequently Asked Questions

## General Questions

### What is "headless"?

Headless means the component provides functionality without styling. You have complete control over the appearance while we handle the complex logic like positioning, accessibility, and interactions.

### Why use Headless Tooltip?

- ✅ **Full control**: Style however you want
- ✅ **Lightweight**: ~5KB gzipped
- ✅ **Accessible**: WAI-ARIA compliant
- ✅ **TypeScript**: Full type safety
- ✅ **Framework agnostic**: Works with any React app
- ✅ **Zero dependencies**: (except peer deps)

### Which React versions are supported?

React 17, 18, and 19 are fully supported.

```json
{
  "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
  "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
}
```

## Installation

### How do I install?

```bash
npm install headless-tooltip
# or
pnpm add headless-tooltip
# or
yarn add headless-tooltip
```

### Do I need additional dependencies?

No! Headless Tooltip has zero runtime dependencies (except React peer dependencies).

## Usage

### How do I style the tooltip?

Use the `className` prop:

```jsx
<Tooltip
  content="Styled tooltip"
  className="bg-gray-900 text-white px-3 py-2 rounded"
>
  <button>Hover me</button>
</Tooltip>
```

### Can I use JSX content?

Yes! Content can be any React node:

```jsx
<Tooltip
  content={
    <div>
      <h3>Title</h3>
      <p>Description</p>
      <button>Action</button>
    </div>
  }
>
  <button>Hover me</button>
</Tooltip>
```

### How do I add an arrow?

Set `arrow={true}`:

```jsx
<Tooltip
  content="With arrow"
  arrow={true}
  arrowSize={10}
  arrowClassName="my-arrow"
>
  <button>Hover me</button>
</Tooltip>
```

### Can tooltips be interactive?

Yes! Set `disableInteractive={false}`:

```jsx
<Tooltip
  content={<button onClick={handleClick}>Click me</button>}
  disableInteractive={false}
>
  <button>Hover me</button>
</Tooltip>
```

## Positioning

### How do I change tooltip position?

Use the `placement` prop:

```jsx
<Tooltip placement="top">
  {' '}
  {/* or bottom, left, right */}
  <button>Hover me</button>
</Tooltip>
```

Available placements:

- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`

### Does it handle viewport edges?

Yes! Tooltip automatically adjusts position when near screen edges.

### Can I control the offset?

Yes, use the `offset` prop:

```jsx
<Tooltip offset={20}>
  <button>Hover me</button>
</Tooltip>
```

## Animations

### How do I add animations?

Enable transitions:

```jsx
<Tooltip
  transition={{
    enable: true,
    enterDuration: 300,
    exitDuration: 200,
  }}
  className="animated-tooltip"
>
  <button>Hover me</button>
</Tooltip>
```

Then style with CSS:

```css
.animated-tooltip[data-entering] {
  animation: fadeIn 300ms;
}
```

### What CSS frameworks work?

All of them! Tailwind, Bootstrap, Material-UI, Styled Components, Emotion, etc.

## Performance

### Is it performant?

Yes! Headless Tooltip is:

- Lightweight (~5KB)
- GPU-accelerated animations
- Lazy rendering
- No unnecessary re-renders

### How many tooltips can I use?

There's no hard limit, but consider:

- Use delays to prevent overwhelming users
- Memoize expensive content
- Use virtual scrolling for long lists

## Accessibility

### Is it accessible?

Yes! Fully WAI-ARIA compliant:

- Proper ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
- Escape key dismissal

### Does it work with keyboard?

Yes! Tooltips show on focus and hide on blur.

## Mobile

### Does it work on mobile?

Yes! Touch events are fully supported.

### Should I use different behavior on mobile?

Consider using click trigger on mobile:

```jsx
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

<Tooltip trigger={isMobile ? 'click' : 'hover'}>
  <button>Touch me</button>
</Tooltip>;
```

## Framework Integration

### Does it work with Next.js?

Yes! For App Router, mark as client component:

```jsx
'use client';
import Tooltip from 'headless-tooltip';
```

### Does it work with Gatsby?

Yes! Works out of the box.

### Does it work with Remix?

Yes! Use ClientOnly for SSR:

```jsx
<ClientOnly>{() => <Tooltip>...</Tooltip>}</ClientOnly>
```

## TypeScript

### Is TypeScript supported?

Yes! Full TypeScript support included.

```tsx
import { Tooltip, TooltipProps } from 'headless-tooltip';

const MyTooltip: React.FC<TooltipProps> = (props) => {
  return <Tooltip {...props} />;
};
```

## Troubleshooting

### Tooltip not showing?

1. Check `zIndex` prop
2. Verify parent doesn't have `overflow: hidden`
3. Ensure CSS is imported

### Positioning issues?

1. Check parent `position` property
2. Try different `placement`
3. Adjust `offset`

### Performance issues?

1. Add `openDelay` and `closeDelay`
2. Memoize expensive content
3. Use simpler animations

## Comparison

### vs React Tooltip?

Headless Tooltip is:

- ✅ Smaller bundle size
- ✅ More flexible styling
- ✅ Better TypeScript support
- ✅ More positioning options

### vs Radix UI Tooltip?

Headless Tooltip is:

- ✅ Simpler API
- ✅ Lighter weight
- ✅ Easier customization
- ✅ Better animation support

### vs Floating UI?

Headless Tooltip uses similar positioning logic but provides:

- ✅ Ready-to-use component
- ✅ Built-in accessibility
- ✅ Simpler integration

## Contributing

### Can I contribute?

Yes! Contributions welcome:

- [GitHub Repository](https://github.com/rezasohrabi/headlessui-tooltip)
- [Report Issues](https://github.com/rezasohrabi/headlessui-tooltip/issues)
- [Submit PRs](https://github.com/rezasohrabi/headlessui-tooltip/pulls)

### How do I report bugs?

[Open an issue](https://github.com/rezasohrabi/headlessui-tooltip/issues/new) on GitHub with:

- React version
- Browser and OS
- Minimal reproduction
- Expected vs actual behavior

## License

### What's the license?

MIT License - free for commercial and personal use!

## Getting Help

Still have questions?

- 📖 [Documentation](/docs/intro)
- 💬 [GitHub Issues](https://github.com/rezasohrabi/headlessui-tooltip/issues)
- 🎨 [Styling Examples](/docs/examples/styling)
- 📚 [API Reference](/docs/api/tooltip)
