import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Calm, brand-friendly code colours: One Light / One Dark syntax on Fiatsend grounds
// (light grey on light, purple-shade-80 on dark).
const codeThemeLight = {
  ...prismThemes.oneLight,
  plain: {...prismThemes.oneLight.plain, backgroundColor: '#F3F3F4'},
};
const codeThemeDark = {
  ...prismThemes.oneDark,
  plain: {...prismThemes.oneDark.plain, backgroundColor: '#130430'},
};

const config: Config = {
  title: 'Fiatsend Documentation',
  tagline: 'Product, recipient, and operations guidance for Fiatsend.',
  favicon: 'img/fiatsend-mark.svg',
  url: 'https://docs.fiatsend.com',
  baseUrl: '/',
  organizationName: 'fiatsend',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
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
          editUrl: 'https://github.com/fiatsend/docs/tree/main/',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    // Used for social sharing previews (OpenGraph/Twitter).
    // Keep it in static/img so it’s always available.
    image: 'img/fiatsend-social-card.png',
    metadata: [{name: 'theme-color', content: '#5D15F2'}],
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Fiatsend',
        src: 'img/fiatsend-logo.svg',
        srcDark: 'img/fiatsend-logo-white.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://console.fiatsend.com',
          label: 'Console',
          position: 'right',
        },
        {
          href: 'https://developer.fiatsend.com',
          label: 'API Explorer',
          position: 'right',
        },
        {
          href: 'https://app.fiatsend.com',
          label: 'Wallet',
          position: 'right',
        },
        {
          href: 'https://github.com/fiatsend',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Fiatsend',
        src: 'img/fiatsend-logo-white.svg',
        href: 'https://www.fiatsend.com',
        width: 132,
      },
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Overview', to: '/docs/intro' },
            { label: 'Console', to: '/docs/products/fiatsend-console' },
            { label: 'Developer Docs', href: 'https://developer.fiatsend.com' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'X (Twitter)', href: 'https://x.com/fiatsend' },
            { label: 'LinkedIn', href: 'https://linkedin.com/company/fiatsend' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/fiatsend' },
            { label: 'Fiatsend Wallet', href: 'https://app.fiatsend.com' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fiatsend. All rights reserved.`,
    },
    prism: {
      theme: codeThemeLight,
      darkTheme: codeThemeDark,
      additionalLanguages: ['bash', 'json', 'solidity'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
