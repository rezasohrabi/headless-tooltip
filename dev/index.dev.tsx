import React from 'react';
import { createRoot } from 'react-dom/client';

import { Tooltip } from '../src/index';
import './styles.css';

export function Test() {
  return (
    <div className="dev-container">
      <h1>Headless Tooltip - Development & Testing</h1>

      {/* Basic Functionality Test */}
      <section className="test-section">
        <h2>Basic Functionality</h2>
        <p>Basic tooltip with hover trigger</p>
        <Tooltip content="Hello! Basic tooltip test">
          <button>Hover me (basic)</button>
        </Tooltip>
      </section>

      {/* Placement Tests */}
      <section className="test-section">
        <h2>Placement Tests</h2>
        <p>Testing different tooltip placements</p>
        <div className="placement-grid">
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
              content={placement}
              placement={placement}
              arrow
            >
              <button>{placement}</button>
            </Tooltip>
          ))}
        </div>
      </section>

      {/* Edge Detection Test */}
      <section className="test-section">
        <h2>Edge Detection Test</h2>
        <p>Tooltips near viewport edges should auto-flip</p>
        <div className="edge-test">
          <Tooltip content="Should flip when near edge" placement="top" arrow>
            <button style={{ position: 'absolute', top: '10px', left: '10px' }}>
              Top-left corner
            </button>
          </Tooltip>
          <Tooltip content="Should flip when near edge" placement="top" arrow>
            <button
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              Top-right corner
            </button>
          </Tooltip>
        </div>
      </section>

      {/* Scroll Test */}
      <section className="test-section">
        <h2>Scroll Behavior Test</h2>
        <p>Tooltip should follow element during scroll</p>
        <div className="scroll-container">
          <div className="scroll-content">
            <p>Scroll this container...</p>
            <Tooltip
              content="I follow the element during scroll"
              placement="right"
              arrow
            >
              <button>Scroll test button</button>
            </Tooltip>
            <div style={{ height: '200px', marginTop: '50px' }}>
              <p>More content...</p>
              <Tooltip
                content="Bottom tooltip in scroll area"
                placement="bottom"
                arrow
              >
                <button>Bottom button</button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Tests */}
      <section className="test-section">
        <h2>Transition Tests</h2>
        <p>
          Testing different transition configurations with tailwind-style
          animations
        </p>
        <div className="transition-tests">
          <Tooltip content="No transitions" transition={{ enable: false }}>
            <button>No transition</button>
          </Tooltip>
          <Tooltip
            content="Bounce in/out animation"
            className="bounce-in-out"
            transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
          >
            <button>Bounce</button>
          </Tooltip>
          <Tooltip
            content="Fade in/out down animation"
            className="fade-in-out-down"
            transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
          >
            <button>Fade Down</button>
          </Tooltip>
          <Tooltip
            content="Flip X animation"
            className="flip-in-out-x"
            transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
          >
            <button>Flip X</button>
          </Tooltip>
          <Tooltip
            content="Light speed animation"
            className="light-speed-in-out"
            transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
          >
            <button>Light Speed</button>
          </Tooltip>
          <Tooltip
            content="Rotate in/out animation"
            className="rotate-in-out"
            transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
          >
            <button>Rotate</button>
          </Tooltip>
          <Tooltip
            content="Zoom in/out animation"
            className="zoom-in-out"
            transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
          >
            <button>Zoom</button>
          </Tooltip>
          <Tooltip
            content="Roll in/out animation"
            className="roll-in-out"
            transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
          >
            <button>Roll</button>
          </Tooltip>
          <Tooltip
            content="Slide in/out animation"
            className="slide-in-out"
            transition={{ enable: true, enterDuration: 400, exitDuration: 400 }}
          >
            <button>Slide</button>
          </Tooltip>
        </div>
      </section>

      {/* Timeout/Delay Tests */}
      <section className="test-section">
        <h2>Timeout & Delay Tests</h2>
        <p>Testing open and close delays for tooltips</p>
        <div className="timeout-tests">
          <Tooltip content="Opens immediately" openDelay={0} closeDelay={0}>
            <button>No delays</button>
          </Tooltip>
          <Tooltip
            content="Opens after 500ms delay"
            openDelay={500}
            closeDelay={0}
          >
            <button>Open delay 500ms</button>
          </Tooltip>
          <Tooltip
            content="Closes after 1s delay"
            openDelay={0}
            closeDelay={1000}
          >
            <button>Close delay 1s</button>
          </Tooltip>
          <Tooltip
            content="Opens after 300ms, closes after 800ms"
            openDelay={300}
            closeDelay={800}
          >
            <button>Both delays</button>
          </Tooltip>
          <Tooltip
            content="Long delays: open 1s, close 1.5s"
            openDelay={1000}
            closeDelay={1500}
          >
            <button>Long delays</button>
          </Tooltip>
        </div>
      </section>

      {/* Nested Tooltip Test */}
      <section className="test-section">
        <h2>Nested Tooltip Test</h2>
        <p>
          Testing tooltip containing a card with a button that has its own
          tooltip
        </p>
        <div className="nested-tooltip-test">
          <Tooltip
            content={
              <div className="tooltip-card">
                <div className="card-header">
                  <h3>User Profile Card</h3>
                  <span className="card-subtitle">
                    Interactive tooltip content
                  </span>
                </div>
                <div className="card-body">
                  <div className="user-info">
                    <div className="avatar">👤</div>
                    <div className="user-details">
                      <p>
                        <strong>John Doe</strong>
                      </p>
                      <p>Software Developer</p>
                      <p>john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="card-actions">
                    <Tooltip
                      content="Send a message to John"
                      placement="top"
                      className="nested-tooltip"
                    >
                      <button className="action-button primary">
                        💬 Message
                      </button>
                    </Tooltip>
                    <Tooltip
                      content="View John's full profile"
                      placement="top"
                      className="nested-tooltip"
                    >
                      <button className="action-button secondary">
                        👁️ View Profile
                      </button>
                    </Tooltip>
                    <Tooltip
                      content="Add John to your connections"
                      placement="top"
                      className="nested-tooltip"
                    >
                      <button className="action-button secondary">
                        ➕ Connect
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            }
            placement="bottom"
            arrow
            arrowSize={16}
            disableInteractive={false}
            openDelay={200}
            closeDelay={500}
            className="parent-tooltip"
          >
            <button className="trigger-button">
              🃏 Show Profile Card (with nested tooltips)
            </button>
          </Tooltip>
        </div>
      </section>

      {/* Advanced Nested Tooltip Test */}
      <section className="test-section">
        <h2>Advanced Nested Tooltip Test</h2>
        <p>Multiple variations of nested tooltip scenarios</p>
        <div className="advanced-nested-test">
          {/* Scenario 1: Menu with sub-tooltips */}
          <div className="scenario">
            <h4>Scenario 1: Action Menu</h4>
            <Tooltip
              content={<div>this is parent tooltip</div>}
              placement="right"
              arrow
              disableInteractive={false}
              openDelay={150}
              closeDelay={300}
              className="menu-tooltip"
            >
              <div className="menu-card">
                <div className="menu-header">
                  <span>⚙️</span>
                  <h4>Quick Actions</h4>
                </div>
                <div className="menu-items">
                  <Tooltip
                    content="Save your current work"
                    placement="right"
                    className="nested-tooltip"
                    openDelay={100}
                  >
                    <button className="menu-item">💾 Save</button>
                  </Tooltip>
                  <Tooltip
                    content="Export data to CSV file"
                    placement="right"
                    className="nested-tooltip"
                    openDelay={100}
                  >
                    <button className="menu-item">📊 Export</button>
                  </Tooltip>
                  <Tooltip
                    content="Print current document"
                    placement="right"
                    className="nested-tooltip"
                    openDelay={100}
                  >
                    <button className="menu-item">🖨️ Print</button>
                  </Tooltip>
                  <Tooltip
                    content="Share with team members"
                    placement="right"
                    className="nested-tooltip"
                    openDelay={100}
                  >
                    <button className="menu-item">🔗 Share</button>
                  </Tooltip>
                </div>
              </div>
            </Tooltip>
          </div>

          {/* Scenario 2: Notification with interactive elements */}
          <div className="scenario">
            <h4>Scenario 2: Interactive Notification</h4>
            <Tooltip
              content={<div>this is parent tooltip</div>}
              placement="bottom"
              arrow
              arrowSize={14}
              disableInteractive={false}
              openDelay={100}
              closeDelay={400}
              className="notification-tooltip"
            >
              <div className="notification-card">
                <div className="notification-header">
                  <span className="notification-icon">🔔</span>
                  <div>
                    <h4>New Message</h4>
                    <span className="notification-time">2 minutes ago</span>
                  </div>
                </div>
                <div className="notification-body">
                  <p>Sarah Johnson sent you a project update</p>
                  <div className="notification-actions">
                    <Tooltip
                      content="Mark as read"
                      placement="top"
                      className="nested-tooltip small"
                    >
                      <button className="notification-btn primary">✓</button>
                    </Tooltip>
                    <Tooltip
                      content="Reply to message"
                      placement="top"
                      className="nested-tooltip small"
                    >
                      <button className="notification-btn secondary">↩️</button>
                    </Tooltip>
                    <Tooltip
                      content="Archive notification"
                      placement="top"
                      className="nested-tooltip small"
                    >
                      <button className="notification-btn secondary">📁</button>
                    </Tooltip>
                    <Tooltip
                      content="Delete notification"
                      placement="top"
                      className="nested-tooltip small"
                    >
                      <button className="notification-btn danger">🗑️</button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* Controlled State Test */}
      <section className="test-section">
        <h2>Controlled State Test</h2>
        <p>Testing controlled open/close behavior</p>
        <ControlledTooltipTest />
      </section>
    </div>
  );
}

function ControlledTooltipTest() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="controlled-test">
      <div className="controlled-target">
        <Tooltip
          content="This tooltip is controlled programmatically"
          open={isOpen}
          arrow
          className="bounce-in-out"
        >
          <button>Controlled tooltip trigger</button>
        </Tooltip>
      </div>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="toggle-icon">{isOpen ? '👁️' : '👁️‍🗨️'}</span>
        Toggle tooltip ({isOpen ? 'open' : 'closed'})
      </button>
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
