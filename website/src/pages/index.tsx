import React, { useRef, useState } from 'react';
import 'animate.css';
import './animations.css';
import DemoSection from '../components/landing/demo-section/DemoSection';
import LibrariesSection from '../components/landing/libraries-section/LibrariesSection';

export default function Home() {
  return (
    <>
      <DemoSection />
      <LibrariesSection />
    </>
  );
}
