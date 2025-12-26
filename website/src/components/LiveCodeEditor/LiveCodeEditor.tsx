import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { themes } from 'prism-react-renderer';
import Tooltip from 'headless-tooltip';
import BrowserOnly from '@docusaurus/BrowserOnly';
import 'animate.css';
import './LiveCodeEditor.css';
import './tailwind-scoped.css';

interface LiveCodeEditorProps {
  code: string;
  noInline?: boolean;
  scope?: Record<string, any>;
}

// Style component for CSS support
const Style = ({ children }: { children: string }) => {
  useEffect(() => {
    const styleId = `live-editor-style-${Math.random().toString(36).substr(2, 9)}`;
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = children;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [children]);

  return null;
};

// Simple preview wrapper with scoped Tailwind CSS
const ScopedTailwindPreview: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="live-preview-content">{children}</div>;
};

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
            React,
            useState,
            useRef,
            useEffect,
            useMemo,
            memo,
            Tooltip,
            Style,
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
              <ScopedTailwindPreview>
                <LivePreview />
              </ScopedTailwindPreview>
              <LiveError className="live-error" />
            </div>
          </div>
        </LiveProvider>
      )}
    </BrowserOnly>
  );
};

export default LiveCodeEditor;
