---
sidebar_position: 1
---

# Introduction

Welcome to **Headless React Tooltip** - a next-generation headless UI component library for React that provides flexible, accessible, and highly customizable tooltip functionality.

## What is Headless React Tooltip?

Headless React Tooltip is a lightweight, unstyled tooltip component that gives you complete control over the styling and behavior of your tooltips while handling all the complex positioning, accessibility, and interaction logic for you.

## Key Features

- 🎯 **Headless Design** - Bring your own styles, we handle the logic
- ♿ **Accessibility First** - WCAG compliant with proper ARIA attributes
- 🎨 **Fully Customizable** - Style it however you want
- 📱 **Responsive** - Works great on mobile and desktop
- ⚡ **Lightweight** - Minimal bundle size impact
- 🎪 **Smart Positioning** - Automatically adjusts position to stay in viewport
- 🎭 **Animation Support** - Built-in support for enter/exit animations

## Getting Started

Let's get started by installing the package and creating your first tooltip.

```bash
npm install headless-tooltip
```

```jsx
import { Tooltip } from 'headless-tooltip';

function App() {
  return (
    <Tooltip content="Hello World!">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

That's it! You now have a fully functional, accessible tooltip.

## What's Next?

- [Installation & Setup](./getting-started/installation.md) - Detailed installation instructions
- [Basic Usage](./getting-started/basic-usage.md) - Learn the fundamentals
- [API Reference](./api/tooltip.md) - Complete API documentation
- [Examples](./examples/basic.md) - See it in action
