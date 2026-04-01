import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Integration Guide',
      collapsed: false,
      items: [
        'integration/start-here',
        'integration/environments',
        'integration/authentication',
        'integration/kyc',
        'integration/beneficiaries',
        'integration/operations',
        'integration/webhooks',
        'integration/errors-rate-limits',
        'integration/idempotency',
        'integration/pagination',
      ],
    },
    {
      type: 'doc',
      id: 'api/overview',
      label: 'API Reference',
    },
    {
      type: 'category',
      label: 'Platform',
      items: [
        'platform/coverage',
        'platform/stablecoins',
        'platform/fees-and-limits',
        'platform/ghsfiat',
        'platform/mobilenumber-nft',
      ],
    },
    {
      type: 'category',
      label: 'Products',
      items: [
        'products/fiatsend-one',
        'products/use-cases',
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      items: [
        'contracts/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Account Management',
      items: [
        'account/access',
        'account/subaccounts-and-roles',
        'account/managing-funds',
      ],
    },
    {
      type: 'category',
      label: 'Security & Compliance',
      items: [
        'security/overview',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/sandbox-and-testing',
        'resources/rewards-and-community',
        'resources/glossary',
        'resources/changelog',
        'resources/support',
      ],
    },
  ],
};

export default sidebars;
