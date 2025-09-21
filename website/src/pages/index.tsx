import React, { useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import 'animate.css';
import './animations.css';
import DemoSection from '../components/landing/demo-section/DemoSection';
import LibrariesSection from '../components/landing/libraries-section/LibrariesSection';
import JSXContentSection from '../components/landing/jsx-content-section/JSXContentSection';
import QuotesSection from '../components/landing/quotes-section/QuotesSection';

export default function Home() {
  return (
    <>
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => (
          <>
            <DemoSection />
            <LibrariesSection />
            <JSXContentSection />
            <QuotesSection />
          </>
        )}
      </BrowserOnly>
    </>
  );
}
