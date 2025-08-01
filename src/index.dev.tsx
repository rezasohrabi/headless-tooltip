import React from 'react';
import { createRoot } from 'react-dom/client';

import Tooltip from './index';

// Add some basic styles for demo purposes
const demoStyles = `
.tooltip-demo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin: 10px;
  font-size: 14px;
}

.demo-button:hover {
  background: #2563eb;
}

.demo-tooltip {
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  max-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.demo-content {
  height: 150vh;
  padding: 50px 0;
}

.scroll-container {
  height: 200px;
  overflow-y: auto;
  border: 2px solid #e5e7eb;
  padding: 20px;
  margin: 20px 0;
}

.scroll-content {
  height: 400px;
  padding: 20px;
  background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
}

.nested-scroll-demo {
  height: 300px;
  overflow-y: auto;
  border: 2px solid #3b82f6;
  padding: 20px;
  margin: 20px 0;
  background: #f8fafc;
}

.inner-scroll-container {
  height: 200px;
  overflow-y: auto;
  border: 2px solid #ef4444;
  padding: 15px;
  margin: 20px 0;
  background: #fef2f2;
}

.inner-scroll-content {
  height: 400px;
  padding: 10px;
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
}
`;

export default {};
const longContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu tempus velit, nec finibus libero. Vivamus sed ullamcorper nunc, porta placerat mi. Curabitur eu ligula nec diam commodo commodo. Pellentesque euismod libero nisi, ac consectetur lacus suscipit a. Pellentesque condimentum, dolor nec rutrum placerat, neque dolor euismod erat, in vehicula urna elit eu orci. Mauris consequat erat eu lacus luctus vulputate. Duis ac lectus mauris. Mauris sagittis dictum justo, facilisis porttitor nulla scelerisque fringilla.

Donec et semper elit, rhoncus faucibus dui. Suspendisse sit amet rhoncus magna. Aenean tempus libero turpis, vel blandit diam lacinia in. Mauris euismod efficitur tellus et laoreet. Mauris tincidunt lacus a purus maximus luctus eget posuere risus. Curabitur molestie lorem ex, vel luctus tortor porta eget. Sed purus elit, mattis eu nunc a, dictum pretium ipsum. Duis sed finibus nulla, non consectetur magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque efficitur, ipsum nec vulputate mattis, risus augue feugiat quam, nec venenatis lorem est in nulla. Vestibulum sagittis at erat non placerat.

Maecenas in augue quis enim bibendum facilisis. Donec sed libero quis tellus laoreet aliquet. Sed gravida mi ac nibh tincidunt efficitur. Ut volutpat ante nec sem imperdiet, pretium sagittis arcu laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer semper gravida lectus. Sed luctus venenatis ornare.

Nulla ligula diam, rutrum quis ornare sit amet, tincidunt ut dui. Praesent tempor dapibus erat, sit amet commodo mi dapibus eu. Fusce eros nibh, rutrum a sem et, feugiat consequat lectus. Maecenas sollicitudin ex arcu, vestibulum sodales ante eleifend sollicitudin. Donec id nibh mauris. Duis vestibulum ligula eu leo tempus semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget metus orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ante erat, feugiat id sem ac, varius interdum justo. Proin et metus ac risus consectetur ornare. Vivamus quis arcu accumsan, dignissim dolor eget, lobortis risus. Aliquam imperdiet, eros non bibendum suscipit, eros leo feugiat odio, vitae cursus diam risus quis risus.

Fusce vel egestas dolor. Nullam placerat placerat augue ut eleifend. Aliquam porttitor sem elementum dolor luctus molestie. Vestibulum scelerisque ultricies venenatis. Duis consectetur, ante quis dignissim iaculis, tellus ipsum gravida est, ac tempor sem nunc ut tellus. Vestibulum erat magna, imperdiet non aliquet sed, placerat sit amet risus. Duis eget est ex. In sit amet ultrices turpis, ut luctus justo. Nullam et mauris eu ligula dapibus fermentum. Pellentesque vel nunc viverra, semper velit faucibus, tincidunt sem.`;

export function Test() {
  // Inject styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = demoStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="tooltip-demo">
      <h1>Enhanced Tooltip with Scroll & Collision Management</h1>

      <div
        style={{
          margin: '20px 0',
          padding: '20px',
          border: '3px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
        }}
      >
        <h2 style={{ color: '#c53030', margin: '0 0 10px 0' }}>
          🚨 BASIC FUNCTIONALITY TEST
        </h2>
        <Tooltip
          content="Hello! I'm a basic tooltip."
          placement="top"
          className="demo-tooltip"
        >
          <button
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            HOVER ME - Basic Test
          </button>
        </Tooltip>
        <p
          style={{
            fontSize: '14px',
            color: '#666',
            marginTop: '10px',
            marginBottom: '0',
          }}
        >
          If this tooltip shows on hover, basic functionality is working. If
          not, there&apos;s a fundamental issue.
        </p>
      </div>

      <div className="demo-content">
        <h2>Collision Detection Test</h2>
        <p>
          Try tooltips near viewport edges - they&apos;ll automatically flip to
          stay visible!
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Tooltip
            content="I flip when near edges!"
            placement="top"
            className="demo-tooltip"
          >
            <button className="demo-button">Top Left Corner</button>
          </Tooltip>

          <Tooltip
            content="Smart positioning at work!"
            placement="top"
            className="demo-tooltip"
          >
            <button className="demo-button">Top Right Corner</button>
          </Tooltip>
        </div>

        <h2>Scroll Management Test</h2>
        <p>Scroll this container - the tooltip follows the element:</p>

        <div className="scroll-container">
          <div className="scroll-content">
            <p>Scroll this container up and down...</p>

            <Tooltip
              content="I move with scroll! Position updates automatically on scroll."
              placement="right"
              className="demo-tooltip"
            >
              <button className="demo-button">Scroll Test Button</button>
            </Tooltip>

            <p style={{ marginTop: '50px' }}>More content here...</p>

            <Tooltip
              content="Bottom tooltip that flips when needed"
              placement="bottom"
              className="demo-tooltip"
            >
              <button className="demo-button">Bottom Button</button>
            </Tooltip>

            <p style={{ marginTop: '100px' }}>Keep scrolling...</p>
          </div>
        </div>

        <h2>Nested Scroll Containers Test</h2>
        <p>
          This tests multiple levels of scrollable containers - all ancestor
          scrolls are tracked!
        </p>

        <div className="nested-scroll-demo">
          <h3>Outer Scrollable Container (Blue Border)</h3>
          <p>Scroll this outer container...</p>

          <div className="inner-scroll-container">
            <div className="inner-scroll-content">
              <h4>Inner Scrollable Container (Red Border)</h4>
              <p>This container can also scroll independently!</p>

              <Tooltip
                content="I track ALL ancestor scrolls! Try scrolling both containers and the window."
                placement="right"
                className="demo-tooltip"
                style={{ maxWidth: '250px' }}
              >
                <button className="demo-button">Multi-Scroll Test</button>
              </Tooltip>

              <p style={{ marginTop: '50px' }}>
                Scroll this inner container up and down...
              </p>

              <Tooltip
                content="Perfect positioning even in deeply nested scrollable containers!"
                placement="left"
                className="demo-tooltip"
              >
                <button className="demo-button">Deep Nesting Test</button>
              </Tooltip>

              <p style={{ marginTop: '50px' }}>More nested content...</p>
            </div>
          </div>

          <p style={{ marginTop: '50px' }}>
            Content after the inner container...
          </p>

          <Tooltip
            content="Outer container positioning test"
            placement="top"
            className="demo-tooltip"
          >
            <button className="demo-button">Outer Container</button>
          </Tooltip>
        </div>

        <h2>Multiple Placements</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            margin: '50px 0',
          }}
        >
          {(
            [
              'top',
              'bottom',
              'left',
              'right',
              'top-start',
              'top-end',
              'bottom-start',
              'bottom-end',
            ] as const
          ).map((placement) => (
            <Tooltip
              key={placement}
              content={`Placement: ${placement}`}
              placement={placement}
              className="demo-tooltip"
            >
              <button className="demo-button">{placement}</button>
            </Tooltip>
          ))}
        </div>

        <h2>Edge Cases & Performance Test</h2>
        <p>Testing complex scenarios and performance optimizations:</p>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            margin: '50px 0',
            flexWrap: 'wrap',
          }}
        >
          <Tooltip
            content="I handle complex positioning edge cases!"
            placement="top"
            className="demo-tooltip"
          >
            <button className="demo-button">Edge Case Test</button>
          </Tooltip>

          <Tooltip
            content="Performance optimized with capture phase scroll handling"
            placement="bottom"
            className="demo-tooltip"
          >
            <button className="demo-button">Performance Test</button>
          </Tooltip>

          <Tooltip
            content="Cross-browser scroll detection with fallbacks"
            placement="left"
            className="demo-tooltip"
          >
            <button className="demo-button">Cross-Browser</button>
          </Tooltip>

          <Tooltip
            content="Accurate scrollable content detection"
            placement="right"
            className="demo-tooltip"
          >
            <button className="demo-button">Scroll Detection</button>
          </Tooltip>
        </div>

        <h2>Window Scroll Test</h2>
        <p>
          Scroll the entire page - tooltips maintain position relative to their
          triggers:
        </p>

        <div style={{ display: 'flex', gap: '20px', margin: '50px 0' }}>
          <Tooltip
            content="Window scroll tracking!"
            placement="top"
            className="demo-tooltip"
          >
            <button className="demo-button">Fixed to Element</button>
          </Tooltip>

          <Tooltip
            content={longContent}
            placement="bottom"
            className="demo-tooltip"
            style={{ maxWidth: '300px' }}
          >
            <button className="demo-button">Long Content</button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>,
);
