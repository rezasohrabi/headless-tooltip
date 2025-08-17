# headless-tooltip

[![npm version](https://img.shields.io/npm/v/headless-tooltip.svg)](https://www.npmjs.com/package/headless-tooltip) [![npm downloads](https://img.shields.io/npm/dm/headless-tooltip.svg)](https://www.npmjs.com/package/headless-tooltip) [![bundle size](https://img.shields.io/bundlephobia/minzip/headless-tooltip) ![minified](https://badgen.net/bundlephobia/min/headless-tooltip)](https://bundlephobia.com/package/headless-tooltip) [![license](https://img.shields.io/github/license/rezasohrabi/headless-tooltip)](LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-4.0%2B-blue)](https://www.typescriptlang.org/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/headless-tooltip/pulls)

A lightweight, customizable tooltip component for React with zero styling opinions. Built with accessibility in mind.

If you find **Headless-Tooltip** useful, please consider giving it a ⭐

## Features

- 🎨 **Truly headless**: No predefined styles, full control over tooltip appearance
- ♿ **Accessible**: Follows [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- 🧩 **Flexible**: Supports custom content, including HTML and React components
- 📱 **Responsive**: Automatically adapts to different screen sizes
- 🔄 **Interactive mode**: Optional interactive tooltips that remain visible when hovering
- 🏹 **Customizable arrow**: Optional arrow that can be styled and positioned
- 🌐 **Placement options**: 12 different placement positions for tooltip
- ⌨️ **Keyboard friendly**: Fully keyboard accessible with proper focus management

## Installation

### npm

```bash
npm install headless-tooltip
```

### yarn

```bash
yarn add headless-tooltip
```

### pnpm

```bash
pnpm add headless-tooltip
```

## Basic Usage

```jsx
import Tooltip from 'headless-tooltip';

function Example() {
  return (
    <Tooltip content="This is a tooltip message">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Styled Example

```jsx
import Tooltip from 'headless-tooltip';

function StyledExample() {
  return (
    <Tooltip
      content={<span>This is a tooltip message</span>}
      placement="bottom"
      arrow={true}
      className="max-w-80 rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal text-white"
      arrowClassName="bg-gray-900"
    >
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Hover me
      </button>
    </Tooltip>
  );
}
```

## API Reference

### Props

| Prop                 | Type                      | Default         | Description                                                  |
| -------------------- | ------------------------- | --------------- | ------------------------------------------------------------ |
| `children`           | `React.ReactNode`         | (required)      | The element that triggers the tooltip                        |
| `content`            | `React.ReactNode`         | (required)      | The content to be displayed in the tooltip                   |
| `placement`          | `Placement`               | `'top'`         | Tooltip placement relative to the trigger element            |
| `className`          | `string`                  | `''`            | Additional CSS classes to apply to the tooltip               |
| `offset`             | `number`                  | `4`             | Distance between tooltip and trigger element in pixels       |
| `zIndex`             | `number`                  | `undefined`     | Z-index value for the tooltip                                |
| `open`               | `boolean`                 | `undefined`     | Control tooltip visibility (makes it a controlled component) |
| `openDelay`          | `number`                  | `300`           | Delay in ms before showing the tooltip                       |
| `closeDelay`         | `number`                  | `200`           | Delay in ms before hiding the tooltip                        |
| `disableInteractive` | `boolean`                 | `false`         | If true, tooltip will close when mouse leaves trigger        |
| `onOpenChange`       | `(open: boolean) => void` | `undefined`     | Callback when tooltip visibility changes                     |
| `portalContainer`    | `HTMLElement`             | `document.body` | DOM element where tooltip portal will be rendered            |
| `arrow`              | `boolean`                 | `false`         | Whether to show an arrow pointing to the trigger             |
| `arrowSize`          | `number`                  | `12`            | Size of the arrow in pixels                                  |
| `arrowClassName`     | `string`                  | `undefined`     | Additional CSS classes to apply to the arrow                 |

### Placement Types

The `placement` prop accepts the following values:

- `'top'`
- `'right'`
- `'bottom'`
- `'left'`
- `'top-start'`
- `'top-end'`
- `'right-start'`
- `'right-end'`
- `'bottom-start'`
- `'bottom-end'`
- `'left-start'`
- `'left-end'`

## Accessibility

This tooltip implementation follows the [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) to ensure accessibility compliance:

- Uses appropriate ARIA attributes (`role="tooltip"`, `aria-describedby`)
- Supports keyboard navigation with proper focus management
- Dismissible with Escape key
- Works with screen readers
- Triggered by both hover and focus events

## Browser Support

The component is compatible with all modern browsers:

- Chrome (and Chromium-based browsers)
- Firefox
- Safari
- Edge

## Advanced Usage

### Controlled Mode

```jsx
import { useState } from 'react';
import Tooltip from 'headless-tooltip';

function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Tooltip</button>

      <Tooltip
        content="This is a controlled tooltip"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <button>Hover me too</button>
      </Tooltip>
    </div>
  );
}
```

### Interactive Tooltip

```jsx
import Tooltip from 'headless-tooltip';

function InteractiveExample() {
  return (
    <Tooltip
      content={
        <div>
          <p>Interactive tooltip with a button:</p>
          <button onClick={() => alert('Clicked!')}>Click me</button>
        </div>
      }
      disableInteractive={false}
    >
      <button>Hover for interactive tooltip</button>
    </Tooltip>
  );
}
```

## Contributing

Contributions are always welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
