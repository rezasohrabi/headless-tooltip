---
sidebar_position: 2
title: Styling Guide
description: Complete guide to styling tooltips with CSS frameworks and libraries
keywords: [tooltip styling, css tooltip, tailwind tooltip, styled components]
---

import LiveCodeEditor from '@site/src/components/LiveCodeEditor';

# Styling Guide

Headless Tooltip gives you complete control over styling. Here's how to style tooltips with different approaches.

## Basic CSS

The simplest way to style tooltips:

```css
.my-tooltip {
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.my-tooltip-arrow {
  background: #333;
}
```

```jsx
import Tooltip from 'headless-tooltip';
import './styles.css';

function App() {
  return (
    <Tooltip
      content="Styled with CSS"
      className="my-tooltip"
      arrow={true}
      arrowClassName="my-tooltip-arrow"
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Tailwind CSS

Perfect for utility-first styling:

```jsx
import Tooltip from 'headless-tooltip';

function TailwindTooltip() {
  return (
    <Tooltip
      content="Styled with Tailwind"
      className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg"
      arrow={true}
      arrowClassName="bg-gray-900"
      arrowSize={8}
    >
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Hover me
      </button>
    </Tooltip>
  );
}
```

### Tailwind with Custom Colors

```jsx
function ColoredTooltip() {
  return (
    <Tooltip
      content="Success tooltip"
      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-xl"
      arrow={true}
      arrowClassName="bg-green-600"
    >
      <button className="px-4 py-2 bg-green-500 text-white rounded">
        Success
      </button>
    </Tooltip>
  );
}
```

## CSS Modules

For scoped styling:

```css
/* Tooltip.module.css */
.tooltip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.arrow {
  background: #667eea;
}
```

```jsx
import Tooltip from 'headless-tooltip';
import styles from './Tooltip.module.css';

function ModuleTooltip() {
  return (
    <Tooltip
      content="CSS Module styled"
      className={styles.tooltip}
      arrow={true}
      arrowClassName={styles.arrow}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Styled Components

For CSS-in-JS approach:

```jsx
import Tooltip from 'headless-tooltip';
import styled from 'styled-components';

const StyledTooltipContent = styled.div`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  &[data-entering] {
    animation: fadeIn 200ms ease-out;
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
`;

function StyledTooltip() {
  return (
    <Tooltip
      content={<StyledTooltipContent>Styled Components</StyledTooltipContent>}
      arrow={true}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Emotion

```jsx
import Tooltip from 'headless-tooltip';
import { css } from '@emotion/css';

const tooltipStyle = css`
  background: #1a202c;
  color: #f7fafc;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

  &::before {
    content: '💡';
    margin-right: 8px;
  }
`;

function EmotionTooltip() {
  return (
    <Tooltip content="Emotion styled" className={tooltipStyle}>
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Material-UI (MUI)

```jsx
import Tooltip from 'headless-tooltip';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    background: theme.palette.grey[900],
    color: theme.palette.common.white,
    padding: '8px 12px',
    borderRadius: theme.shape.borderRadius,
    fontSize: '14px',
    boxShadow: theme.shadows[3],
  },
  arrow: {
    background: theme.palette.grey[900],
  },
}));

function MuiTooltip() {
  const classes = useStyles();

  return (
    <Tooltip
      content="MUI styled"
      className={classes.tooltip}
      arrow={true}
      arrowClassName={classes.arrow}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Chakra UI

```jsx
import Tooltip from 'headless-tooltip';
import { Box } from '@chakra-ui/react';

function ChakraTooltip() {
  return (
    <Tooltip
      content={
        <Box
          bg="gray.800"
          color="white"
          px={3}
          py={2}
          borderRadius="md"
          fontSize="sm"
          boxShadow="lg"
        >
          Chakra UI styled
        </Box>
      }
      arrow={true}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## State-Based Styling

Use data attributes for different states:

```css
.tooltip {
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 200ms;
}

/* When tooltip is entering */
.tooltip[data-entering] {
  opacity: 0;
  transform: scale(0.9);
}

/* When tooltip is fully visible */
.tooltip[data-entered] {
  opacity: 1;
  transform: scale(1);
}

/* When tooltip is exiting */
.tooltip[data-exiting] {
  opacity: 0;
  transform: scale(0.9);
}
```

## Dark Mode Support

```css
/* Light mode */
.tooltip {
  background: white;
  color: #333;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .tooltip {
    background: #1a1a1a;
    color: #f0f0f0;
    border: 1px solid #333;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
}
```

## Themed Tooltips

```jsx
function ThemedTooltips() {
  const themes = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  return (
    <div className="flex gap-4">
      {Object.entries(themes).map(([theme, className]) => (
        <Tooltip
          key={theme}
          content={`${theme} tooltip`}
          className={`${className} px-3 py-2 rounded-lg text-sm`}
        >
          <button className={`px-4 py-2 ${className} rounded capitalize`}>
            {theme}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
```

## Best Practices

1. **Keep it Simple**: Don't over-style tooltips - they should be unobtrusive
2. **Good Contrast**: Ensure text is readable against the background
3. **Consistent Sizing**: Use consistent padding and font sizes
4. **Smooth Transitions**: Add subtle animations for better UX
5. **Responsive**: Test on different screen sizes
6. **Dark Mode**: Consider dark mode styling
7. **Accessibility**: Maintain good color contrast (WCAG AA or AAA)
