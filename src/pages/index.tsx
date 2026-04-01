import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';

const cards = [
  {
    title: 'Getting Started',
    description: 'Set up your environment, get API keys, and make your first payout in minutes.',
    to: '/docs/integration/start-here',
  },
  {
    title: 'API Reference',
    description: 'Explore all REST endpoints for auth, conversions, payouts, and mobile money.',
    to: '/docs/api/overview',
  },
  {
    title: 'Smart Contracts',
    description: 'Understand the FiatsendGateway architecture, upgrades, and on-chain flows.',
    to: '/docs/contracts/architecture',
  },
  {
    title: 'Coverage & Providers',
    description: 'See supported countries, mobile money providers, and operation availability.',
    to: '/docs/platform/coverage',
  },
  {
    title: 'Use Cases',
    description: 'Learn how merchants, agents, and consumers use Fiatsend for everyday payments.',
    to: '/docs/products/use-cases',
  },
  {
    title: 'Support',
    description: 'Get help, report issues, and reach the team.',
    to: '/docs/resources/support',
  },
];

const curlExample = `# Convert USDT to GHS
curl -X POST https://api.fiatsend.com/api/convert/usdt-to-ghs \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": "50.00",
    "beneficiaryPhone": "+233241234567"
  }'`;

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Documentation"
      description="Fiatsend developer documentation — build payments on mobile money rails powered by stablecoins on Lisk."
    >
      <main>
        <div className="hero-section">
          <h1>Fiatsend Documentation</h1>
          <p>
            Build reliable payments on mobile money rails, powered by stablecoins on Lisk.
            Integrate fast with our REST API, smart contracts, and webhook system.
          </p>
          <Link className="button button--primary button--lg" to="/docs/integration/start-here">
            Get Started
          </Link>
        </div>

        <div className="cards-grid">
          {cards.map((card) => (
            <Link key={card.to} className="card-link" to={card.to}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="quickstart-section">
          <h2>Quick Example</h2>
          <CodeBlock language="bash" title="Payout to mobile money">
            {curlExample}
          </CodeBlock>
        </div>
      </main>
    </Layout>
  );
}
