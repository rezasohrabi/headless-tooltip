import React from 'react';
import './DemoSection.css';

import BackgroundElements from './components/BackgroundElements';
import Hero from './components/Hero';
import DemoControls from './components/DemoControls';
import AutoPlayTooltips from './components/AutoPlayTooltips';

export default function DemoSection() {
  return (
    <div className="demo-section">
      <BackgroundElements />
      <DemoControls />
      <Hero />
      <AutoPlayTooltips />
    </div>
  );
}
