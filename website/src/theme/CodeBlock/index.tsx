import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import LiveCodeEditor from '@site/src/components/LiveCodeEditor';
import BrowserOnly from '@docusaurus/BrowserOnly';
import type { Props } from '@theme/CodeBlock';

export default function CodeBlockWrapper(props: Props): JSX.Element {
  const { children, className, metastring, live } = props as any;

  // Check if it's a JSX/TSX code block
  const isJSX =
    className?.includes('language-jsx') || className?.includes('language-tsx');

  // Check if it should be live
  const shouldBeLive =
    live === true ||
    metastring?.includes('live') ||
    (isJSX && typeof children === 'string' && children.includes('Tooltip'));

  // Only make it live if it meets criteria
  if (shouldBeLive && typeof children === 'string') {
    let code = children.trim();

    // Remove import statements (they're not needed in live preview)
    code = code.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
    code = code.replace(/^import\s+['"].*?['"];?\s*$/gm, '');

    // Remove require statements
    code = code.replace(/const\s+\w+\s*=\s*require\(['"].*?['"]\);?\s*$/gm, '');

    // Extract CSS from <style> tags and convert to Style component
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let styleMatch;
    let extractedStyles = '';

    while ((styleMatch = styleRegex.exec(code)) !== null) {
      extractedStyles += styleMatch[1] + '\n';
    }

    // Remove <style> tags from code
    code = code.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    // Add Style component if CSS was found
    if (extractedStyles.trim()) {
      const styleCode = `<Style>{\`${extractedStyles.trim().replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`}</Style>`;

      // Check if code has a function
      const hasFunction =
        code.match(/^function\s+\w+/m) || code.match(/^const\s+\w+\s*=/m);

      if (hasFunction) {
        // Add Style before return statement
        code = code.replace(/(return\s*\()/g, `${styleCode}\n  $1`);
      } else {
        // Add Style at the beginning
        code = `${styleCode}\n${code}`;
      }
    }

    // Clean up extra newlines
    code = code.replace(/^\n+/, '').trim();

    // Check if code needs wrapping
    const hasFunction =
      code.match(/^function\s+\w+/m) || code.match(/^const\s+\w+\s*=/m);
    const hasRender = code.includes('render(');

    if (!hasFunction && !hasRender) {
      // Simple JSX - wrap it
      const lines = code.split('\n');
      const indentedCode = lines.map((line) => '    ' + line).join('\n');
      code = `function Example() {\n  return (\n${indentedCode}\n  );\n}\n\nrender(<Example />);`;
    } else if (hasFunction && !hasRender) {
      // Has function but no render
      const functionName =
        code.match(/(?:function|const)\s+(\w+)/)?.[1] || 'Example';
      code = `${code}\n\nrender(<${functionName} />);`;
    }

    return (
      <BrowserOnly fallback={<CodeBlock {...props} />}>
        {() => <LiveCodeEditor code={code} noInline />}
      </BrowserOnly>
    );
  }

  // Otherwise, use default CodeBlock
  return <CodeBlock {...props} />;
}
