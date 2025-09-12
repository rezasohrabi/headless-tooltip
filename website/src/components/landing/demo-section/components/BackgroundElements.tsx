import React from 'react';
import './BackgroundElements.css';
function BackgroundElements() {
  return (
    <div className="background-elements">
      <div
        className="background-dot"
        style={{ top: '8%', left: '5%', animationDelay: '0s' }}
      >
        <div className="background-dot-inner"></div>
      </div>
      <div
        className="background-dot"
        style={{ top: '25%', right: '8%', animationDelay: '1s' }}
      >
        <div className="background-dot-inner"></div>
      </div>
      <div
        className="background-dot"
        style={{ bottom: '20%', left: '3%', animationDelay: '2s' }}
      >
        <div className="background-dot-inner"></div>
      </div>
      <div
        className="background-ring"
        style={{ top: '65%', right: '12%', animationDelay: '1.5s' }}
      ></div>
      <div
        className="background-ring"
        style={{ top: '35%', left: '88%', animationDelay: '3s' }}
      ></div>
      <div
        className="background-line"
        style={{ top: '10%', left: '25%', animationDelay: '0.5s' }}
      ></div>
      <div
        className="background-line"
        style={{ bottom: '15%', right: '35%', animationDelay: '2.5s' }}
      ></div>
      <div className="background-particle" style={{ top: '50%', left: '30%' }}>
        <div className="background-particle-core"></div>
      </div>
    </div>
  );
}

export default BackgroundElements;
