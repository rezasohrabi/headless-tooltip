import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import './InstallationSection.css';

function InstallationSection() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const installCommands = [
    { id: 'npm', label: 'npm', command: 'npm install headless-tooltip' },
    { id: 'pnpm', label: 'pnpm', command: 'pnpm add headless-tooltip' },
    { id: 'yarn', label: 'yarn', command: 'yarn add headless-tooltip' },
  ];

  const handleCopy = (command: string, id: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(command);
      setCopiedCommand(id);
      setTimeout(() => setCopiedCommand(null), 2000);
    }
  };

  return (
    <section className="installation-section">
      <div className="installation-container">
        <h2 className="installation-title">Get Started in Seconds</h2>
        <p className="installation-subtitle">
          Install headless-tooltip and start building beautiful tooltips
        </p>

        <div className="install-commands-grid">
          {installCommands.map((cmd) => (
            <div key={cmd.id} className="install-command-card">
              <div className="command-header">
                <span className="command-label">{cmd.label}</span>
              </div>
              <div className="command-wrapper">
                <code className="command-text">{cmd.command}</code>
                <button
                  className={`copy-button ${copiedCommand === cmd.id ? 'copied' : ''}`}
                  onClick={() => handleCopy(cmd.command, cmd.id)}
                  aria-label={`Copy ${cmd.label} install command`}
                >
                  {copiedCommand === cmd.id ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="links-section">
          <a
            href="https://github.com/rezasohrabi/headless-tooltip"
            target="_blank"
            rel="noopener noreferrer"
            className="link-button github-link"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="link-icon"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/headless-tooltip"
            target="_blank"
            rel="noopener noreferrer"
            className="link-button npm-link"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="link-icon"
            >
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
            </svg>
            View on NPM
          </a>
          <Link
            to="/docs/getting-started/installation"
            className="link-button docs-link"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="link-icon"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Get Started
          </Link>
        </div>

        <div className="quick-example">
          <h3 className="example-title">Quick Example</h3>
          <pre className="example-code">
            <code>{`import Tooltip from 'headless-tooltip';

function App() {
  return (
    <Tooltip content="Hello World!" placement="top">
      <button>Hover me</button>
    </Tooltip>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default InstallationSection;
