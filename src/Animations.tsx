import React from 'react';
import Tooltip from './index';

export default function Animations() {
  return (
    <div className="test-section">
      <h2 className="section-title">🎬 Animation Showcase</h2>
      <p
        style={{
          color: '#f0fdf4',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Test each unique animation with smooth transitions! Each tooltip now
        animates smoothly when opening and closing. 🎯✨
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          margin: '30px 0',
        }}
      >
        {[
          {
            name: 'Bounce In',
            type: 'bounce-in',
            closeType: '',
            icon: '🦘',
            desc: 'Bouncy entrance with scale',
          },
          {
            name: 'Slide Left',
            type: 'slide-from-left',
            icon: '➡️',
            desc: 'Slides in from the left',
          },
          {
            name: 'Mega Zoom',
            type: 'mega-zoom',
            icon: '🔍',
            desc: 'Dramatic zoom with blur',
          },
          {
            name: 'Flip 3D',
            type: 'flip-3d',
            icon: '🔄',
            desc: '3D flip rotation effect',
          },
          {
            name: 'Elastic Bounce',
            type: 'elastic-bounce',
            icon: '🎾',
            desc: 'Multi-stage elastic bounce',
          },
          {
            name: 'Rotate Swing',
            type: 'rotate-swing',
            icon: '🎪',
            desc: 'Swinging rotation motion',
          },
          {
            name: 'Fade Fly',
            type: 'fade-fly-in',
            icon: '🦋',
            desc: 'Flying fade with blur',
          },
        ].map((anim) => (
          <Tooltip
            key={anim.name}
            className={`jungle-tooltip tooltip-${anim.type} ${anim.type}`}
            transition={{
              enable: true,
              enterDuration: 600,
              exitDuration: 300,
            }}
            content={
              <div className="tooltip-content">
                <div className="tooltip-header">
                  <span className="tooltip-icon">{anim.icon}</span>
                  <span className="tooltip-title">{anim.name}</span>
                </div>
                <div className="tooltip-body">
                  <strong>Animation: {anim.name}</strong>
                  <br />
                  {anim.desc}
                  <br />
                  <small style={{ opacity: 0.8 }}>
                    Hover to see the {anim.type} effect!
                  </small>
                </div>
              </div>
            }
            placement="top"
            arrow
            arrowClassName="jungle-arrow"
            zIndex={2000}
          >
            <button
              className="demo-button"
              style={{
                padding: '12px 16px',
                fontSize: '14px',
                minHeight: '50px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{anim.icon}</span>
              <span>{anim.name}</span>
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
