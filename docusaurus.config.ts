import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Fiatsend Docs',
  tagline: 'Build payments on mobile money rails, powered by stablecoins on Lisk.',
  favicon: 'img/favicon.ico',
  url: 'https://docs.fiatsend.com',
  baseUrl: '/',
  organizationName: 'fiatsend',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
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
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Fiatsend Logo',
        src: 'img/logo-colored.png',
        srcDark: 'img/logo-white.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://app.fiatsend.com',
          label: 'Launch App',
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
        src: 'img/logo-white.png',
      },
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/integration/start-here' },
            { label: 'API Reference', to: '/docs/api/overview' },
            { label: 'Smart Contracts', to: '/docs/contracts/architecture' },
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
            { label: 'FiatsendOne App', href: 'https://app.fiatsend.com' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fiatsend. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
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
