import { useEffect } from 'react';

export const TailwindLoader = () => {
  useEffect(() => {
    // Check if Tailwind is already loaded
    if (document.getElementById('tailwind-cdn')) {
      return;
    }

    // Load Tailwind CSS from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.id = 'tailwind-cdn';
    script.async = true;

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('tailwind-cdn');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};
