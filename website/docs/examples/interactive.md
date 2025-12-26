---
sidebar_position: 2
title: Interactive Tooltips
description: Create tooltips with clickable content
keywords: [interactive tooltip, clickable tooltip, tooltip with buttons]
---

import LiveCodeEditor from '@site/src/components/LiveCodeEditor';

# Interactive Tooltips

Create tooltips that users can interact with.

## Enable Interactive Mode

```jsx
<Tooltip
  content={
    <div>
      <p>Interactive content</p>
      <button onClick={() => alert('Clicked!')}>Click me</button>
    </div>
  }
  disableInteractive={false} // Allow hovering tooltip
  closeDelay={500} // Delay before closing
>
  <button>Hover me</button>
</Tooltip>
```

## Form Inside Tooltip

```jsx
function FormTooltip() {
  const [email, setEmail] = useState('');

  return (
    <Tooltip
      content={
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Email:', email);
          }}
        >
          <h4>Subscribe</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <button type="submit">Subscribe</button>
        </form>
      }
      disableInteractive={false}
      placement="bottom"
    >
      <button>Subscribe</button>
    </Tooltip>
  );
}
```

## Menu Tooltip

```jsx
function MenuTooltip() {
  const menuItems = [
    { icon: '✏️', label: 'Edit', action: () => console.log('Edit') },
    { icon: '📋', label: 'Copy', action: () => console.log('Copy') },
    { icon: '🗑️', label: 'Delete', action: () => console.log('Delete') },
  ];

  return (
    <Tooltip
      content={
        <div className="menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="menu-item"
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      }
      disableInteractive={false}
      placement="bottom-start"
    >
      <button>⋮ Menu</button>
    </Tooltip>
  );
}
```

## Rich Content Card

```jsx
function UserCardTooltip() {
  return (
    <Tooltip
      content={
        <div className="user-card">
          <img src="/avatar.jpg" alt="User" />
          <h3>John Doe</h3>
          <p>Senior Developer</p>
          <div className="stats">
            <div>
              <strong>127</strong>
              <span>Projects</span>
            </div>
            <div>
              <strong>2.4K</strong>
              <span>Followers</span>
            </div>
          </div>
          <button onClick={() => window.open('/profile')}>View Profile</button>
        </div>
      }
      disableInteractive={false}
      placement="right"
    >
      <div className="avatar-trigger">
        <img src="/avatar.jpg" alt="User" />
      </div>
    </Tooltip>
  );
}
```
