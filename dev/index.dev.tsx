import React from 'react';
import { createRoot } from 'react-dom/client';

import { Tooltip } from '../src/index';
import ShowCases from './components/ShowCases';
import Animations from './components/Animations';
import Basic from './components/Basic';
import Demo from './components/Demo';
import './styles.css';

export function Test() {
  return (
    <div className="tooltip-demo">
      <Demo />

      <Basic />

      <div className="test-section">
        <h2 className="section-title">🎯 Collision Detection Test</h2>
        <p
          style={{
            color: '#f0fdf4',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Try tooltips near viewport edges - they&apos;ll automatically flip to
          stay visible! 🌿
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Tooltip
            className="jungle-tooltip"
            transition={{
              enable: true,
              enterDuration: 400,
              exitDuration: 250,
            }}
            content={
              <div className="tooltip-content">
                <div className="tooltip-header">
                  <span className="tooltip-icon">🔄</span>
                  <span className="tooltip-title">Smart Flip</span>
                </div>
                <div className="tooltip-body">
                  🌿 I flip when near edges to stay in the jungle!
                </div>
              </div>
            }
            placement="top"
            arrow
            zIndex={2000}
            arrowClassName="jungle-arrow"
          >
            <button className="demo-button">🥑 Top Left Corner</button>
          </Tooltip>

          <Tooltip
            className="jungle-tooltip"
            transition={{
              enable: true,
              enterDuration: 400,
              exitDuration: 250,
            }}
            content={
              <div className="tooltip-content">
                <div className="tooltip-header">
                  <span className="tooltip-icon">🎯</span>
                  <span className="tooltip-title">Smart Position</span>
                </div>
                <div className="tooltip-body">
                  ✨ Smart jungle positioning at work!
                </div>
              </div>
            }
            placement="top"
            arrow
            zIndex={2000}
            arrowClassName="jungle-arrow"
          >
            <button className="demo-button">🌴 Top Right Corner</button>
          </Tooltip>
        </div>
      </div>

      <div className="test-section">
        <h2 className="section-title">📜 Scroll Management Test</h2>
        <p
          style={{
            color: '#f0fdf4',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Scroll this container - the jungle tooltip follows the element! 🦋
        </p>

        <div
          className="scroll-container"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
          }}
        >
          <div className="scroll-content">
            <p style={{ color: '#f0fdf4' }}>
              🌿 Scroll this jungle container up and down...
            </p>

            <Tooltip
              className="jungle-tooltip"
              content={
                <div className="tooltip-content">
                  <div className="tooltip-header">
                    <span className="tooltip-icon">📜</span>
                    <span className="tooltip-title">Scroll Tracker</span>
                  </div>
                  <div className="tooltip-body">
                    🦋 I move with scroll! Position updates automatically like a
                    butterfly following flowers.
                  </div>
                </div>
              }
              placement="right"
              arrow
              zIndex={2000}
              arrowClassName="jungle-arrow"
            >
              <button className="demo-button">🌿 Jungle Scroll Test</button>
            </Tooltip>

            <p style={{ marginTop: '50px', color: '#f0fdf4' }}>
              🌺 More jungle content here...
            </p>

            <Tooltip
              className="jungle-tooltip"
              content={
                <div className="tooltip-content">
                  <div className="tooltip-header">
                    <span className="tooltip-icon">🔄</span>
                    <span className="tooltip-title">Auto Flip</span>
                  </div>
                  <div className="tooltip-body">
                    🌴 Bottom jungle tooltip that flips when needed!
                  </div>
                </div>
              }
              placement="bottom"
              arrow
              arrowClassName="jungle-arrow"
              zIndex={2000}
            >
              <button className="demo-button">🥑 Bottom Avocado</button>
            </Tooltip>

            <p style={{ marginTop: '100px', color: '#f0fdf4' }}>
              🦋 Keep exploring the jungle...
            </p>
          </div>
        </div>
      </div>

      <ShowCases />

      <Animations />

      <div className="test-section">
        <h2 className="section-title">🚀 Final Jungle Experience</h2>
        <p
          style={{
            color: '#f0fdf4',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          The ultimate jungle tooltip experience with amazing animations! 🦋
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          <Tooltip
            className="jungle-tooltip"
            content={
              <div className="tooltip-content">
                <div className="tooltip-header">
                  <span className="tooltip-icon">🎬</span>
                  <span className="tooltip-title">Recording Ready</span>
                </div>
                <div className="tooltip-body">
                  🎥 Perfect for recording demos with amazing zoom animations
                  and jungle vibes!
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
              style={{ padding: '15px 25px', fontSize: '16px' }}
            >
              🎬 Ready to Record!
            </button>
          </Tooltip>

          <Tooltip
            className="jungle-tooltip"
            content={
              <div className="tooltip-content">
                <div className="tooltip-header">
                  <span className="tooltip-icon">✨</span>
                  <span className="tooltip-title">Amazing UI</span>
                </div>
                <div className="tooltip-body">
                  🌟 Jungle-themed UI with avocado elements and smooth
                  animations - perfect for social media!
                </div>
              </div>
            }
            placement="bottom"
            arrow
            arrowClassName="jungle-arrow"
            zIndex={2000}
          >
            <button
              className="demo-button"
              style={{ padding: '15px 25px', fontSize: '16px' }}
            >
              ✨ Amazing Animations!
            </button>
          </Tooltip>
        </div>

        <div
          style={{ textAlign: 'center', marginTop: '3rem', color: '#f0fdf4' }}
        >
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            🎯 <strong>Perfect for Recording:</strong>
          </p>
          <p>• Auto-cycling avocado tooltips with mega zoom effects</p>
          <p>• Jungle background with animated elements</p>
          <p>• Professional tooltip styling with shimmer effects</p>
          <p>• Play/pause controls for perfect timing</p>
          <p>• Click individual avocados to focus on specific tooltips</p>
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
