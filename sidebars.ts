import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Using Fiatsend',
      collapsed: false,
      items: [
        'products/fiatsend-one',
        'account/access',
        'account/managing-funds',
      ],
    },
    {
      type: 'category',
      label: 'For Businesses',
      items: [
        'products/fiatsend-console',
        'products/use-cases',
        'platform/coverage',
        'platform/fees-and-limits',
        'api/overview',
      ],
    },
    {
      type: 'category',
      label: 'Accepting Payments',
      items: [
        'payments/overview',
        'payments/payment-links',
        'payments/invoices',
        'payments/website-checkout',
        'payments/payment-settings',
      ],
    },
    {
      type: 'category',
      label: 'Security & Compliance',
      items: ['security/overview'],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/glossary',
        'resources/support',
      ],
    },
  ],
};

export default sidebars;
