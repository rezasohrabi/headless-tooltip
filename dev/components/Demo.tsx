import React, { useEffect, useState } from 'react';
import { Tooltip } from '../../src/index';

function JungleAvocadoDemo({
  isPlaying,
  setIsPlaying,
}: {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}) {
  const [activeAvocado, setActiveAvocado] = useState(0);
  const [closingAvocado, setClosingAvocado] = useState<number | null>(null);

  const avocados = [
    {
      id: 1,
      x: 15,
      y: 20,
      tooltip: '🥑 Fresh & Organic Avocado!',
      message: 'Perfect for guacamole!',
      animation: 'bounce-in',
    },
    {
      id: 2,
      x: 75,
      y: 15,
      tooltip: '🌿 Jungle Fresh Tooltip',
      message: 'Straight from the rainforest!',
      animation: 'slide-from-left',
    },
    {
      id: 3,
      x: 20,
      y: 70,
      tooltip: '✨ Amazing Zoom Animation',
      message: 'Watch me grow and shrink!',
      animation: 'mega-zoom',
    },
    {
      id: 4,
      x: 85,
      y: 65,
      tooltip: '🎯 Perfect Positioning',
      message: 'Always in the right place!',
      animation: 'flip-3d',
    },
    {
      id: 5,
      x: 50,
      y: 45,
      tooltip: '🚀 Zoom In & Out Magic!',
      message: 'The ultimate tooltip experience!',
      animation: 'elastic-bounce',
    },
    {
      id: 6,
      x: 30,
      y: 85,
      tooltip: '🌴 Welcome to Jungle UI!',
      message: 'Where tooltips come alive!',
      animation: 'rotate-swing',
    },
    {
      id: 7,
      x: 80,
      y: 30,
      tooltip: '🦋 Butterfly Smooth',
      message: 'Smooth as a jungle breeze!',
      animation: 'fade-fly-in',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setClosingAvocado(activeAvocado); // Start closing animation for current

      setTimeout(() => {
        setActiveAvocado((prev) => (prev + 1) % avocados.length);
        setClosingAvocado(null); // Clear closing state
      }, 200); // Small delay for closing animation
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying, avocados.length, activeAvocado]);

  return (
    <div className="avocado-demo">
      {avocados.map((avocado, index) => (
        <Tooltip
          key={avocado.id}
          className={`jungle-tooltip tooltip-${avocado.animation} ${closingAvocado === index ? 'tooltip-closing' : ''}`}
          transition={{
            enable: true,
            enterDuration: 500,
            exitDuration: 300,
          }}
          content={
            <div className="tooltip-content">
              <div className="tooltip-header">
                <span className="tooltip-icon">🥑</span>
                <span className="tooltip-title">
                  Jungle Tooltip #{avocado.id}
                </span>
              </div>
              <div className="tooltip-body">
                <strong>{avocado.tooltip}</strong>
                <br />
                {avocado.message}
                <br />
                <small style={{ opacity: 0.8 }}>
                  Animation: {avocado.animation}
                </small>
              </div>
            </div>
          }
          placement="top"
          arrow
          arrowClassName="jungle-arrow"
          open={
            (index === activeAvocado && isPlaying) || closingAvocado === index
          }
          zIndex={2000}
          openDelay={0}
          closeDelay={0}
        >
          <button
            className={`avocado ${index === activeAvocado ? 'avocado-active' : ''}`}
            style={{
              left: `${avocado.x}%`,
              top: `${avocado.y}%`,
              animationDelay: `${index * 0.3}s`,
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            onClick={() => {
              if (activeAvocado !== index) {
                setClosingAvocado(activeAvocado);
                setTimeout(() => {
                  setActiveAvocado(index);
                  setClosingAvocado(null);
                  setIsPlaying(false);
                }, 200);
              } else {
                setIsPlaying(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (activeAvocado !== index) {
                  setClosingAvocado(activeAvocado);
                  setTimeout(() => {
                    setActiveAvocado(index);
                    setClosingAvocado(null);
                    setIsPlaying(false);
                  }, 200);
                } else {
                  setIsPlaying(false);
                }
              }
            }}
            tabIndex={0}
            aria-label={`Avocado ${index + 1}: ${avocado.tooltip}`}
          >
            🥑
          </button>
        </Tooltip>
      ))}
    </div>
  );
}

function JungleElements() {
  return (
    <div className="jungle-elements">
      <div
        className="jungle-leaf"
        style={{ top: '8%', left: '5%', animationDelay: '0s' }}
      >
        🍃
      </div>
      <div
        className="jungle-leaf"
        style={{ top: '25%', right: '8%', animationDelay: '1s' }}
      >
        🌿
      </div>
      <div
        className="jungle-leaf"
        style={{ bottom: '20%', left: '3%', animationDelay: '2s' }}
      >
        🍃
      </div>
      <div
        className="jungle-flower"
        style={{ top: '65%', right: '12%', animationDelay: '1.5s' }}
      >
        🌺
      </div>
      <div
        className="jungle-flower"
        style={{ top: '35%', left: '88%', animationDelay: '3s' }}
      >
        🌸
      </div>
      <div
        className="jungle-vine"
        style={{ top: '0%', left: '25%', animationDelay: '0.5s' }}
      >
        🌿
      </div>
      <div
        className="jungle-vine"
        style={{ bottom: '0%', right: '35%', animationDelay: '2.5s' }}
      >
        🌿
      </div>
      <div className="jungle-butterfly" style={{ top: '40%', left: '40%' }}>
        🦋
      </div>
    </div>
  );
}

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      <div className="demo-controls">
        <button
          className="control-button"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <div className="demo-counter">🌴 Jungle Demo</div>
      </div>
      <div className="jungle-hero">
        <div className="jungle-background"></div>
        <JungleElements />

        <h1 className="hero-title">🌴 Headless React Tooltip 🥑</h1>
        <p className="hero-subtitle">
          Headless UI for building powerful React Tooltip!
        </p>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            🎯 <strong>7 Unique Animations:</strong> Bounce In • Slide Left •
            Mega Zoom • Flip 3D • Elastic Bounce • Rotate Swing • Fade Fly
          </p>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            ✨ Each tooltip now has smooth entrance/exit animations with hover
            effects!
          </p>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            🚀 Enhanced with transition phases and micro-interactions!
          </p>
        </div>

        <JungleAvocadoDemo isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
      ;
    </>
  );
}
