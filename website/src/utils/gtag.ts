/**
 * Safe Google Analytics wrapper
 * Prevents errors when gtag is not loaded (development mode)
 */

export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

export const gtagEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const gtagPageView = (url: string) => {
  gtag('config', 'G-722BJTW24P', {
    page_path: url,
  });
};
