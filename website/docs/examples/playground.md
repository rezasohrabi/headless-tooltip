---
sidebar_position: 1
title: Interactive Playground
description: Try Headless React Tooltip live with interactive examples
keywords: [react tooltip examples, live playground, interactive examples]
---

# Interactive Playground

Try Headless React Tooltip live with interactive code examples.

## Basic Tooltip

<iframe src="https://codesandbox.io/embed/headless-tooltip-basic-example-forked-xyz123?fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style={{width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
  title="headless-tooltip-basic-example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

```jsx live
function BasicExample() {
  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <Tooltip
        content="This is a basic tooltip!"
        placement="top"
        className="my-tooltip"
      >
        <button
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Hover me!
        </button>
      </Tooltip>

      <style>{`
        .my-tooltip {
          background: #333;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}
```

## Positioning Examples

```jsx live
function PositioningExample() {
  const placements = ['top', 'right', 'bottom', 'left'];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        padding: '100px 50px',
      }}
    >
      {placements.map((placement) => (
        <Tooltip
          key={placement}
          content={`Tooltip on ${placement}`}
          placement={placement}
          arrow={true}
          className="positioned-tooltip"
        >
          <button
            style={{
              padding: '10px 20px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {placement}
          </button>
        </Tooltip>
      ))}

      <style>{`
        .positioned-tooltip {
          background: #1f2937;
          color: #f3f4f6;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
```

## Interactive Tooltip with Form

```jsx live
function InteractiveExample() {
  const [name, setName] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <Tooltip
        content={
          <div style={{ minWidth: '250px' }}>
            {submitted ? (
              <div>
                <h4 style={{ margin: '0 0 8px 0' }}>✅ Thank you!</h4>
                <p style={{ margin: 0 }}>Your name: {name}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h4 style={{ margin: '0 0 12px 0' }}>Quick Form</h4>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        }
        placement="bottom"
        disableInteractive={false}
        className="interactive-tooltip"
      >
        <button
          style={{
            padding: '12px 24px',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Click for Interactive Form
        </button>
      </Tooltip>

      <style>{`
        .interactive-tooltip {
          background: white;
          color: #333;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
```

## Animated Tooltip

```jsx live
function AnimatedExample() {
  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <Tooltip
        content="I zoom in and out! 🎉"
        placement="top"
        transition={{
          enable: true,
          enterDuration: 300,
          exitDuration: 300,
        }}
        className="animated-tooltip"
      >
        <button
          style={{
            padding: '12px 24px',
            background: '#ec4899',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Hover for Animation
        </button>
      </Tooltip>

      <style>{`
        .animated-tooltip {
          background: linear-gradient(45deg, #ec4899, #f43f5e);
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .animated-tooltip[data-enter] {
          opacity: 0;
          transform: scale(0.3);
        }

        .animated-tooltip[data-entering] {
          opacity: 1;
          animation: zoomIn 300ms ease-out;
        }

        .animated-tooltip[data-exiting] {
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
            opacity: 1;
            transform: scale(0.3);
          }
          100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }
      `}</style>
    </div>
  );
}
```

## Rich Content Tooltip

```jsx live
function RichContentExample() {
  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <Tooltip
        content={
          <div style={{ minWidth: '300px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: '#6366f1',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                👨‍💻
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>
                  John Doe
                </h4>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>
                  Senior Developer
                </p>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                padding: '12px 0',
                borderTop: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '18px', display: 'block' }}>
                  127
                </strong>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>Projects</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '18px', display: 'block' }}>
                  2.4K
                </strong>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>
                  Followers
                </span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '18px', display: 'block' }}>
                  98%
                </strong>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>Rating</span>
              </div>
            </div>
            <button
              style={{
                width: '100%',
                padding: '8px',
                background: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '8px',
              }}
            >
              View Profile
            </button>
          </div>
        }
        placement="right"
        disableInteractive={false}
        className="rich-tooltip"
      >
        <button
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          View User Card
        </button>
      </Tooltip>

      <style>{`
        .rich-tooltip {
          background: white;
          color: #333;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}
```

## CodeSandbox Templates

Ready to try in your own environment? Use these templates:

### Basic Setup

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/headless-tooltip-basic-new)

### With Tailwind CSS

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/headless-tooltip-tailwind-new)

### With Styled Components

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/headless-tooltip-styled-components-new)

### With Material-UI

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/headless-tooltip-mui-new)

## Next Steps

- [Basic Usage](../getting-started/basic-usage.md) - Learn the fundamentals
- [API Reference](../api/tooltip.md) - Complete API documentation
- [Styling Guide](./styling.md) - Advanced styling techniques
- [Animations](./animations.md) - Create beautiful animations
