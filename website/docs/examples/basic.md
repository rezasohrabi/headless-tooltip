---
sidebar_position: 1
---

# Basic Examples

Explore different ways to use Headless React Tooltip.

## Simple Tooltip

The most basic tooltip usage:

```jsx
import { Tooltip } from 'headless-tooltip';

function BasicExample() {
  return (
    <div>
      <p>Here are some examples:</p>

      <Tooltip content="Hello World!">
        <button>Hover me</button>
      </Tooltip>
    </div>
  );
}
```

## Multiple Tooltips

Using multiple tooltips on the same page:

```jsx
function MultipleTooltips() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Tooltip content="First tooltip" placement="top">
        <button>Button 1</button>
      </Tooltip>

      <Tooltip content="Second tooltip" placement="bottom">
        <button>Button 2</button>
      </Tooltip>

      <Tooltip content="Third tooltip" placement="right">
        <button>Button 3</button>
      </Tooltip>
    </div>
  );
}
```

## Rich Content

Tooltips can contain more than just text:

```jsx
function RichContentTooltip() {
  const richContent = (
    <div>
      <h4>User Information</h4>
      <p>
        <strong>Name:</strong> John Doe
      </p>
      <p>
        <strong>Email:</strong> john@example.com
      </p>
      <p>
        <strong>Status:</strong> <span style={{ color: 'green' }}>Active</span>
      </p>
    </div>
  );

  return (
    <Tooltip content={richContent} className="rich-tooltip">
      <img
        src="/avatar.jpg"
        alt="User avatar"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      />
    </Tooltip>
  );
}
```

## Conditional Tooltips

Show tooltips based on conditions:

```jsx
function ConditionalTooltip() {
  const [hasError, setHasError] = useState(false);

  return (
    <div>
      <Tooltip
        content="This field has an error!"
        disabled={!hasError}
        placement="right"
      >
        <input
          placeholder="Enter your email"
          style={{
            borderColor: hasError ? 'red' : 'gray',
            padding: '8px',
          }}
        />
      </Tooltip>

      <button onClick={() => setHasError(!hasError)}>Toggle Error State</button>
    </div>
  );
}
```

## Click Tooltips

Tooltips that appear on click rather than hover:

```jsx
function ClickTooltip() {
  return (
    <div>
      <p>Click the buttons below to show tooltips:</p>

      <Tooltip content="Clicked!" trigger="click" placement="top">
        <button>Click me</button>
      </Tooltip>

      <Tooltip
        content="Click anywhere else to close this tooltip"
        trigger="click"
        placement="bottom"
      >
        <button>Click tooltip</button>
      </Tooltip>
    </div>
  );
}
```
