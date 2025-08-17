import React from 'react';
import Tooltip from './index';

export default function ShowCases() {
  return (
    <div className="test-section">
      <h2 className="section-title">🎨 Multiple Jungle Placements</h2>
      <p
        style={{
          color: '#f0fdf4',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Experience all tooltip placements with jungle styling! 🌿
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          margin: '30px 0',
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
            className="jungle-tooltip"
            transition={{
              enable: true,
              enterDuration: 350,
              exitDuration: 200,
            }}
            content={
              <div className="tooltip-content">
                <div className="tooltip-header">
                  <span className="tooltip-icon">🎯</span>
                  <span className="tooltip-title">Placement</span>
                </div>
                <div className="tooltip-body">
                  🌴 Position: <strong>{placement}</strong>
                </div>
              </div>
            }
            placement={placement}
            arrow
            arrowClassName="jungle-arrow"
            zIndex={2000}
          >
            <button className="demo-button">🥑 {placement}</button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
