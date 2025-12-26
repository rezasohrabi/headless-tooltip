export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://rezasohrabi.github.io/headless-tooltip';

  const staticPages = [
    '',
    '/docs/intro',
    '/docs/getting-started/installation',
    '/docs/getting-started/basic-usage',
    '/docs/api/tooltip',
    '/docs/examples/basic',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${baseUrl}${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>${url === '' ? '1.0' : '0.8'}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
