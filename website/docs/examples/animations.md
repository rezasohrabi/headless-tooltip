---
sidebar_position: 3
title: Animations
description: Create beautiful tooltip animations with CSS
keywords: [tooltip animations, css animations, animated tooltips]
---

# Animations

Add beautiful animations to your tooltips with CSS transitions and keyframes.

## Built-in Transition Support

Headless Tooltip has built-in support for enter/exit animations:

```jsx
import Tooltip from 'headless-tooltip';

function AnimatedTooltip() {
  return (
    <Tooltip
      content="I fade in and out!"
      transition={{
        enable: true,
        enterDuration: 300,
        exitDuration: 200,
      }}
      className="animated-tooltip"
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Fade Animation

```css
.fade-tooltip {
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
}

.fade-tooltip[data-enter] {
  opacity: 0;
}

.fade-tooltip[data-entering] {
  opacity: 1;
  transition: opacity 300ms ease-out;
}

.fade-tooltip[data-exiting] {
  opacity: 0;
  transition: opacity 200ms ease-in;
}
```

## Scale Animation

```css
.scale-tooltip {
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
}

.scale-tooltip[data-entering] {
  animation: scaleIn 300ms ease-out;
}

.scale-tooltip[data-exiting] {
  animation: scaleOut 200ms ease-in;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}
```

## Slide Animation

```css
.slide-tooltip {
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
}

/* Slide from top */
.slide-tooltip[data-entering] {
  animation: slideDown 300ms ease-out;
}

.slide-tooltip[data-exiting] {
  animation: slideUp 200ms ease-in;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
```

## Zoom Animation

```css
.zoom-tooltip {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
}

.zoom-tooltip[data-entering] {
  animation: zoomIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.zoom-tooltip[data-exiting] {
  animation: zoomOut 300ms ease-in;
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zoomOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    transform: scale(0.3);
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}
```

## Bounce Animation

```css
.bounce-tooltip {
  background: #ec4899;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
}

.bounce-tooltip[data-entering] {
  animation: bounceIn 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Rotate Animation

```css
.rotate-tooltip {
  background: #f59e0b;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
}

.rotate-tooltip[data-entering] {
  animation: rotateIn 400ms ease-out;
}

.rotate-tooltip[data-exiting] {
  animation: rotateOut 300ms ease-in;
}

@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotate(-180deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes rotateOut {
  from {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  to {
    opacity: 0;
    transform: rotate(180deg) scale(0.5);
  }
}
```

## Flip Animation

```css
.flip-tooltip {
  background: #10b981;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
}

.flip-tooltip[data-entering] {
  animation: flipIn 500ms ease-out;
}

@keyframes flipIn {
  from {
    opacity: 0;
    transform: perspective(400px) rotateX(-90deg);
  }
  to {
    opacity: 1;
    transform: perspective(400px) rotateX(0deg);
  }
}
```

## Shake Animation

```css
.shake-tooltip {
  background: #ef4444;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
}

.shake-tooltip[data-entered] {
  animation: shake 500ms ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}
```

## Pulse Animation

```css
.pulse-tooltip {
  background: #8b5cf6;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
}

.pulse-tooltip[data-entered] {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
  }
}
```

## Using Animate.css

You can use Animate.css for ready-made animations:

```bash
npm install animate.css
```

```jsx
import 'animate.css';

function AnimateCssTooltip() {
  return (
    <Tooltip
      content="Animated with Animate.css"
      className="my-tooltip animate__animated animate__fadeIn"
      transition={{
        enable: true,
        enterDuration: 300,
      }}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Position-Aware Animations

Animate based on tooltip position:

```css
/* Top placement */
.tooltip[data-placement^='top'][data-entering] {
  animation: slideFromBottom 300ms ease-out;
}

/* Bottom placement */
.tooltip[data-placement^='bottom'][data-entering] {
  animation: slideFromTop 300ms ease-out;
}

/* Right placement */
.tooltip[data-placement^='right'][data-entering] {
  animation: slideFromLeft 300ms ease-out;
}

/* Left placement */
.tooltip[data-placement^='left'][data-entering] {
  animation: slideFromRight 300ms ease-out;
}

@keyframes slideFromBottom {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

## Performance Tips

1. **Use `transform` and `opacity`**: These properties are GPU-accelerated
2. **Avoid `width` and `height` animations**: They cause reflow
3. **Use `will-change` sparingly**: Only for complex animations
4. **Keep durations short**: 200-400ms is usually enough
5. **Test on mobile**: Ensure smooth performance on slower devices

```css
.optimized-tooltip {
  /* Good - GPU accelerated */
  will-change: transform, opacity;

  /* Use transform instead of position properties */
  transform: translateX(0);
}

.optimized-tooltip[data-entering] {
  animation: optimizedSlide 300ms ease-out;
}

@keyframes optimizedSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Next Steps

- [Interactive Playground](./playground.md) - Try animations live
- [Styling Guide](./styling.md) - Learn more styling techniques
- [API Reference](../api/tooltip.md) - Full transition API
