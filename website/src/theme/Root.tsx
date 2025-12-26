import React from 'react';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function Root({ children }) {
  const location = useLocation();

  // Track page views (only in production)
  React.useEffect(() => {
    if (
      ExecutionEnvironment.canUseDOM &&
      process.env.NODE_ENV === 'production' &&
      typeof window.gtag === 'function'
    ) {
      window.gtag('config', 'G-722BJTW24P', {
        page_path: location.pathname + location.search + location.hash,
      });
    }
  }, [location]);

  return <>{children}</>;
}
