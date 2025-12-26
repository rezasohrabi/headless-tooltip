---
sidebar_position: 6
title: Frequently Asked Questions
description: Common questions about Headless React Tooltip
keywords: [tooltip faq, common questions, help]
---

import LiveCodeEditor from '@site/src/components/LiveCodeEditor';

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

Set `arrow={true}` and style the arrow:

<LiveCodeEditor
code={`function ArrowTooltip() {
return (
<Tooltip
content="Tooltip with arrow"
arrow={true}
arrowSize={10}
style={{
        background: '#1f2937',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      }}
arrowClassName="bg-gray-800" >
<button style={{
        padding: '10px 20px',
        background: '#6366f1',
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

render(<ArrowTooltip />);`}
noInline
/>

### Can tooltips be interactive?

Yes! Set `disableInteractive={false}` to allow users to interact with tooltip content:

<LiveCodeEditor
code={`function InteractiveTooltip() {
const handleClick = () => {
alert('Button clicked inside tooltip!');
};

return (
<Tooltip
content={
<div style={{
          background: '#1f2937',
          color: 'white',
          padding: '12px',
          borderRadius: '6px',
          minWidth: '200px'
        }}>
<p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Interactive content</p>
<button
onClick={handleClick}
style={{
              background: '#6366f1',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px'
            }} >
Click me
</button>
</div>
}
disableInteractive={false}
closeDelay={500} >
<button style={{
        padding: '10px 20px',
        background: '#6366f1',
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

render(<InteractiveTooltip />);`}
noInline
/>

## Positioning

### How do I change tooltip position?

Use the `placement` prop to control where the tooltip appears:

<LiveCodeEditor
code={`function PositioningExample() {
const placements = ['top', 'right', 'bottom', 'left'];

return (
<div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '3rem'
    }}>
{placements.map(placement => (
<Tooltip
key={placement}
content={\`Tooltip on \${placement}\`}
placement={placement}
style={{
            background: '#6366f1',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '13px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }} >
<button style={{
            padding: '8px 16px',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            textTransform: 'capitalize',
            fontSize: '14px'
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

Available placements:

- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`

### Does it handle viewport edges?

Yes! Tooltip automatically adjusts position when near screen edges.

### Can I control the offset?

Yes, use the `offset` prop to control the distance between tooltip and trigger:

<LiveCodeEditor
code={`function OffsetExample() {
return (
<div style={{
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem'
    }}>
<Tooltip
content="Small offset (4px)"
offset={4}
placement="top"
style={{
          background: '#1f2937',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '14px'
        }} >
<button style={{
          padding: '10px 20px',
          background: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
Small offset
</button>
</Tooltip>

      <Tooltip
        content="Large offset (20px)"
        offset={20}
        placement="top"
        style={{
          background: '#1f2937',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '14px'
        }}
      >
        <button style={{
          padding: '10px 20px',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Large offset
        </button>
      </Tooltip>
    </div>

);
}

render(<OffsetExample />);`}
noInline
/>

## Animations

### How do I add animations?

Enable transitions and add CSS animations:

<LiveCodeEditor
code={`function AnimatedTooltip() {
return (
<div style={{ padding: '3rem', textAlign: 'center' }}>
<Style>{'
.fade-tooltip[data-enter] {
opacity: 0;
}
.fade-tooltip[data-entering] {
opacity: 1;
animation: fadeIn 300ms ease-out;
}
.fade-tooltip[data-exiting] {
opacity: 0;
animation: fadeOut 200ms ease-in;
}
@keyframes fadeIn {
from {
opacity: 0;
transform: translateY(-10px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
@keyframes fadeOut {
from {
opacity: 1;
transform: translateY(0);
}
to {
opacity: 0;
transform: translateY(-10px);
}
}
'}</Style>
<Tooltip
content="Animated tooltip with fade effect"
transition={{
          enable: true,
          enterDuration: 300,
          exitDuration: 200,
        }}
className="fade-tooltip"
style={{
          background: '#1f2937',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '14px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }} >
<button style={{
          padding: '10px 20px',
          background: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
Hover me
</button>
</Tooltip>
</div>
);
}

render(<AnimatedTooltip />);`}
noInline
/>

### What CSS frameworks work?

All of them! Tailwind, Bootstrap, Material-UI, Styled Components, Emotion, etc.

## Performance

### Is it performant?

Yes! Headless Tooltip is:

- Lightweight (~5KB)
- GPU-accelerated animations
- Lazy rendering
- No unnecessary re-renders

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

## Framework Integration

### Does it work with Next.js?

Yes! Headless Tooltip fully supports Server-Side Rendering (SSR) and works with both Pages Router and App Router. No special configuration needed.

```jsx
import Tooltip from 'headless-tooltip';

// Works in both server and client components
export default function Page() {
  return (
    <Tooltip content="Hello">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

### Does it work with Gatsby?

Yes! Works out of the box with full SSR support.

### Does it work with Remix?

Yes! Headless Tooltip supports SSR out of the box. No ClientOnly wrapper needed.

```jsx
import Tooltip from 'headless-tooltip';

export default function Route() {
  return (
    <Tooltip content="Hello">
      <button>Hover me</button>
    </Tooltip>
  );
}
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
