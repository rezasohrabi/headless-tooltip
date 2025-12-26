import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Create gtag function
  window.gtag = function (...args: any[]) {
    if (process.env.NODE_ENV === 'production') {
      window.dataLayer.push(arguments);
    }
  };

  // Initialize gtag in production
  if (process.env.NODE_ENV === 'production') {
    window.gtag('js', new Date());
    window.gtag('config', 'G-722BJTW24P');
  }
}
