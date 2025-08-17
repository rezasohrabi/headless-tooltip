import React from 'react';
import { Tooltip } from './index';

export default function Basic() {
  return (
    <div className="test-section">
      <h2 className="section-title">🚨 Basic Functionality Test</h2>

      <Tooltip
        className="jungle-tooltip"
        transition={{
          enable: true,
          enterDuration: 500,
          exitDuration: 300,
        }}
        content={
          <div className="tooltip-content">
            <div className="tooltip-header">
              <span className="tooltip-icon">🌟</span>
              <span className="tooltip-title">Basic Test</span>
            </div>
            <div className="tooltip-body">
              🎉 Hello! I&apos;m a jungle-themed tooltip with amazing
              animations!
            </div>
          </div>
        }
        open
        zIndex={2000}
        placement="top"
        arrow
        arrowClassName="jungle-arrow"
      >
        <button className="demo-button">🥑 HOVER ME - Basic Jungle Test</button>
      </Tooltip>
      <p style={{ color: '#f0fdf4', textAlign: 'center', marginTop: '1rem' }}>
        If this tooltip shows on hover with jungle styling, basic functionality
        is working! 🌴
      </p>
    </div>
  );
}
