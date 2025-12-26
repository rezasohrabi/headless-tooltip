---
sidebar_position: 3
title: Animations
description: Create beautiful tooltip animations with CSS using Animate.css
keywords: [tooltip animations, css animations, animated tooltips, animate.css]
---

import LiveCodeEditor from '@site/src/components/LiveCodeEditor';

# Animations

Add beautiful animations to your tooltips using CSS and Animate.css. All animations use the `data-enter`, `data-entering`, and `data-exiting` attributes for smooth transitions.

## Bounce Animation

A playful bounce effect:

```css
.bounce-in-out[data-enter] {
  opacity: 0;
}

.bounce-in-out[data-entering] {
  opacity: 1;
  animation: bounceIn;
  animation-duration: 400ms !important;
}

.bounce-in-out[data-exiting] {
  animation: bounceOut;
  animation-duration: 400ms !important;
}
```

<LiveCodeEditor
code={`function BounceTooltip() {
return (
<Tooltip
content="Bouncing tooltip!"
transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
className="bounce-in-out bg-pink-500 text-white px-3 py-2 rounded-lg text-sm" >
<button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
Hover me
</button>
</Tooltip>
);
}

render(<BounceTooltip />);`}
noInline
/>

## Fade In Out Down

A classic fade from bottom:

```css
.fade-in-out-down[data-enter] {
  opacity: 0;
}

.fade-in-out-down[data-entering] {
  opacity: 1;
  animation: fadeInDown;
  animation-duration: 400ms !important;
}

.fade-in-out-down[data-exiting] {
  animation: fadeOutDown;
  animation-duration: 400ms !important;
}
```

<LiveCodeEditor
code={`function FadeDownTooltip() {
return (
<Tooltip
content="Fading from bottom!"
transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
className="fade-in-out-down bg-blue-500 text-white px-3 py-2 rounded-lg text-sm" >
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
Hover me
</button>
</Tooltip>
);
}

render(<FadeDownTooltip />);`}
noInline
/>

## Zoom Animation

A zoom in/out effect:

```css
.zoom-in-out[data-enter] {
  opacity: 0;
}

.zoom-in-out[data-entering] {
  opacity: 1;
  animation: zoomIn;
  animation-duration: 400ms !important;
}

.zoom-in-out[data-exiting] {
  animation: zoomOut;
  animation-duration: 400ms !important;
}
```

<LiveCodeEditor
code={`function ZoomTooltip() {
return (
<Tooltip
content="Zooming tooltip!"
transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
className="zoom-in-out bg-violet-500 text-white px-3 py-2 rounded-lg text-sm" >
<button className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600">
Hover me
</button>
</Tooltip>
);
}

render(<ZoomTooltip />);`}
noInline
/>

## Zoom In Out Down

Zoom from bottom:

```css
.zoom-in-out-down[data-enter] {
  opacity: 0;
}

.zoom-in-out-down[data-entering] {
  opacity: 1;
  animation: zoomInDown;
  animation-duration: 400ms !important;
}

.zoom-in-out-down[data-exiting] {
  animation: zoomOutDown;
  animation-duration: 400ms !important;
}
```

<LiveCodeEditor
code={`function ZoomDownTooltip() {
return (
<Tooltip
content="Zooming from bottom!"
transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
className="zoom-in-out-down bg-rose-500 text-white px-3 py-2 rounded-lg text-sm" >
<button className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600">
Hover me
</button>
</Tooltip>
);
}

render(<ZoomDownTooltip />);`}
noInline
/>
