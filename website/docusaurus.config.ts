import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '⚡ Headless React Tooltip 🚀',
  tagline:
    'Accessible Headless UI Component for building powerful React Tooltips!',
  favicon: 'img/social-card.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://rezasohrabi.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/headless-tooltip/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rezasohrabi', // Usually your GitHub org/user name.
  projectName: 'headless-tooltip', // Usually your repo name.

  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/rezasohrabi/headless-tooltip/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [],

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://www.googletagmanager.com',
      },
    },
  ],

  scripts:
    process.env.NODE_ENV === 'production'
      ? [
          {
            src: 'https://www.googletagmanager.com/gtag/js?id=G-722BJTW24P',
            async: true,
          },
        ]
      : [],

  clientModules: ['./src/clientModules/gtag.ts'],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: 'description',
        content: 'Headless UI Component for building powerful React Tooltips!',
      },
      {
        name: 'keywords',
        content:
          'react, tooltip, react-tooltip, headless-tooltip, headlessui-tooltip, headlessui-react-tooltip, tooltip-component, react-component, component, headless-ui, accessible-tooltip, ui-component, tooltip-library, customizable-tooltip, interactive-tooltip, aria-tooltip, typescript',
      },
    ],
    navbar: {
      title: 'Headless React Tooltip',
      items: [
        {
          href: 'https://www.npmjs.com/package/headless-tooltip',
          label: 'NPM',
          position: 'right',
        },
        {
          href: 'https://github.com/rezasohrabi/headless-tooltip',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Demo',
              to: '/docs/examples/styling',
            },
            {
              label: 'FAQ',
              to: '/docs/faq',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'NPM Package',
              href: 'https://www.npmjs.com/package/headless-tooltip',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/rezasohrabi/headless-tooltip',
            },
            {
              label: 'Examples',
              href: 'https://github.com/rezasohrabi/headless-tooltip/tree/main/examples',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Headless React Tooltip. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
