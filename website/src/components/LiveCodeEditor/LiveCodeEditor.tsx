import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { themes } from 'prism-react-renderer';
import Tooltip from 'headless-tooltip';
import BrowserOnly from '@docusaurus/BrowserOnly';
import './LiveCodeEditor.css';

interface LiveCodeEditorProps {
  code: string;
  noInline?: boolean;
  scope?: Record<string, any>;
}

const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({
  code,
  noInline = false,
  scope = {},
}) => {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <LiveProvider
          code={code.trim()}
          theme={themes.nightOwl}
          noInline={noInline}
          scope={{
            Tooltip,
            ...scope,
          }}
        >
          <div className="live-code-editor">
            <div className="live-editor-container">
              <div className="live-editor-header">
                <span className="live-editor-title">✏️ Live Editor</span>
              </div>
              <LiveEditor className="live-editor" />
            </div>
            <div className="live-preview-container">
              <div className="live-preview-header">
                <span className="live-preview-title">👁️ Preview</span>
              </div>
              <div className="live-preview-content">
                <LivePreview />
              </div>
              <LiveError className="live-error" />
            </div>
          </div>
        </LiveProvider>
      )}
    </BrowserOnly>
  );
};

export default LiveCodeEditor;
