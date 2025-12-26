import React from 'react';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import 'animate.css';
import './animations.css';
import DemoSection from '../components/landing/demo-section/DemoSection';
import InstallationSection from '../components/landing/installation-section/InstallationSection';
import LibrariesSection from '../components/landing/libraries-section/LibrariesSection';
import JSXContentSection from '../components/landing/jsx-content-section/JSXContentSection';
import QuotesSection from '../components/landing/quotes-section/QuotesSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Headless React Tooltip</title>
        <meta
          name="description"
          content="Headless UI Component for building powerful React Tooltips!"
        />
        <meta
          name="keywords"
          content="react, tooltip, react-tooltip, headless-tooltip, headlessui-tooltip, headlessui-react-tooltip, tooltip-component, react-component, component, headless-ui, accessible-tooltip, ui-component, tooltip-library, customizable-tooltip, interactive-tooltip, aria-tooltip, typescript"
        />
        <meta property="og:title" content="Headless React Tooltip" />
        <meta
          property="og:description"
          content="Accessible Headless UI Component for building powerful React Tooltips!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://rezasohrabi.github.io/headless-tooltip/"
        />
        <meta
          property="og:image"
          content="https://rezasohrabi.github.io/headless-tooltip/img/social-card.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Headless React Tooltip" />
        <meta
          name="twitter:description"
          content="Accessible Headless UI Component for building powerful React Tooltips!"
        />
        <meta
          name="twitter:image"
          content="https://rezasohrabi.github.io/headless-tooltip/img/social-card.png"
        />
        <link
          rel="canonical"
          href="https://rezasohrabi.github.io/headless-tooltip/"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Headless React Tooltip',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Cross-platform',
            description:
              'Headless UI Component for building powerful React Tooltips!',
            url: 'https://rezasohrabi.github.io/headless-tooltip/',
            author: {
              '@type': 'Person',
              name: 'Reza Sohrabi',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            programmingLanguage: 'TypeScript',
            softwareVersion: '1.1.12',
            license: 'https://opensource.org/licenses/MIT',
            codeRepository: 'https://github.com/rezasohrabi/headless-tooltip',
          })}
        </script>
      </Head>
      <BrowserOnly>
        {() => (
          <>
            <DemoSection />
            <InstallationSection />
            <LibrariesSection />
            <JSXContentSection />
            <QuotesSection />
          </>
        )}
      </BrowserOnly>
    </>
  );
}
