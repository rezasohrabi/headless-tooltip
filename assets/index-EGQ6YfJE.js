import{j as e,M as s,C as r}from"./index-FIo8MTyE.js";import{useMDXComponents as i}from"./index-Bo7cNXl6.js";import{T as l}from"./index.stories-Ckb-f2bV.js";import"./iframe-Cx5S4VKh.js";import"./index-BwK5LeP0.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BwyXWai5.js";import"./index-B9ng7-bL.js";import"./index-COkI8TRB.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function t(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(n.h1,{id:"definition",children:"Definition"}),`
`,e.jsx(n.p,{children:"Tooltip is a floating interactive element that appears when hovering over or focusing on content."}),`
`,e.jsx(n.p,{children:"You can place text, HTML elements, and interactive components inside of a tooltip."}),`
`,e.jsx(n.p,{children:"Tooltips are often used for providing additional context, help text, or detailed information about UI elements."}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["The component comes in different configurations such as ",e.jsx(n.code,{children:"placement"}),", ",e.jsx(n.code,{children:"arrow"}),", ",e.jsx(n.code,{children:"offset"}),", and ",e.jsx(n.code,{children:"interactive"})," which you can use to alter the look, position and behavior of the tooltip."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," The tooltip is headless by default, meaning it has no built-in styles. The styles shown in the later stories are just for demonstration purposes. You can customize the appearance using your own CSS classes or utility classes like Tailwind CSS."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import Tooltip from 'headless-tooltip';\r
\r
function Example() {\r
  return (\r
    <Tooltip\r
      content={<span>This is a tooltip message</span>}\r
      placement="bottom"\r
      arrow\r
      className="max-w-80 rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal text-white"\r
    >\r
      <button>Hover me</button>\r
    </Tooltip>\r
  );\r
}
`})}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.p,{children:["This tooltip implementation follows the ",e.jsx(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/",rel:"nofollow",children:"WAI-ARIA Tooltip Pattern"})," to ensure accessibility compliance. Key features include:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Proper keyboard interaction (Escape to dismiss)"}),`
`,e.jsx(n.li,{children:"Appropriate ARIA roles and properties"}),`
`,e.jsx(n.li,{children:"Focus management"}),`
`,e.jsx(n.li,{children:"Support for both hover and focus triggers"}),`
`]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(n.p,{children:"Tooltip has the following properties:"}),`
`,e.jsx(r,{})]})}function w(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{w as default};
