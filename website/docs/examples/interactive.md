---
sidebar_position: 4
title: Interactive Tooltips
description: Create tooltips with clickable content
keywords: [interactive tooltip, clickable tooltip, tooltip with buttons]
---

import LiveCodeEditor from '@site/src/components/LiveCodeEditor';

# Interactive Tooltips

Create tooltips that users can interact with.

## Enable Interactive Mode

```css
.interactive-tooltip {
  background: #333;
  color: white;
  padding: 12px;
  border-radius: 6px;
  min-width: 200px;
}

.interactive-tooltip button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  width: 100%;
}

.interactive-tooltip button:hover {
  background: #4f46e5;
}
```

<LiveCodeEditor
code={`function InteractiveExample() {
return (
<Tooltip
content={

<div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
<p className="mb-2">Interactive content</p>
<button
onClick={() => alert('Clicked!')}
className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 w-full" >
Click me
</button>
</div>
}
disableInteractive={false}
closeDelay={500} >
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
Hover me
</button>
</Tooltip>
);
}

render(<InteractiveExample />);`}
noInline
/>

## Form Inside Tooltip

```css
.tooltip-form {
  background: #333;
  color: white;
  padding: 15px;
  border-radius: 6px;
  min-width: 250px;
}

.tooltip-form h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
}

.tooltip-form input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #555;
  background: #444;
  color: white;
  margin-bottom: 10px;
}

.tooltip-form button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.tooltip-form button:hover {
  background: #4f46e5;
}
```

<LiveCodeEditor
code={`function FormTooltip() {
const [email, setEmail] = useState('');

return (
<Tooltip
content={

<form
onSubmit={(e) => {
e.preventDefault();
alert('Email: ' + email);
}}
className="bg-gray-900 text-white p-4 rounded-lg flex flex-col gap-2"
style={{ minWidth: '250px' }} >
<h4 className="text-white m-0 mb-2 text-base font-semibold">Subscribe</h4>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="your@email.com"
className="px-2 py-2 rounded border border-gray-600 bg-gray-800 text-white text-sm"
style={{ width: '100%' }}
/>
<button
type="submit"
className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 cursor-pointer"
style={{ width: '100%' }} >
Subscribe
</button>
</form>
}
disableInteractive={false}
placement="bottom" >
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
Subscribe
</button>
</Tooltip>
);
}

render(<FormTooltip />);`}
noInline
/>

## Menu Tooltip

```css
.menu {
  background: #333;
  color: white;
  border-radius: 6px;
  padding: 5px;
  min-width: 150px;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-align: left;
  border-radius: 4px;
}

.menu-item:hover {
  background: #444;
}
```

<LiveCodeEditor
code={`function MenuTooltip() {
const menuItems = [
{ icon: '✏️', label: 'Edit', action: () => alert('Edit') },
{ icon: '📋', label: 'Copy', action: () => alert('Copy') },
{ icon: '🗑️', label: 'Delete', action: () => alert('Delete') },
];

return (
<Tooltip
content={

<div className="bg-gray-900 text-white rounded-lg p-1 flex flex-col" style={{ minWidth: '150px' }}>
{menuItems.map((item) => (
<button
              key={item.label}
              onClick={item.action}
              className="flex items-center w-full px-3 py-2 bg-transparent border-none text-white cursor-pointer text-left rounded hover:bg-gray-700"
            >
<span className="mr-2">{item.icon}</span> {item.label}
</button>
))}
</div>
}
disableInteractive={false}
placement="bottom-start" >
<button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
⋮ Menu
</button>
</Tooltip>
);
}

render(<MenuTooltip />);`}
noInline
/>
