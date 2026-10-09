import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

type IconName = 'wallet' | 'business' | 'payments' | 'code';

// Simple outline icons (24px grid, 1.75 stroke, currentColor) so they follow the theme colour.
function Icon({name}: {name: IconName}): React.JSX.Element {
  const paths: Record<IconName, React.ReactNode> = {
    wallet: (
      <>
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a1 1 0 0 1 1 1v2" />
        <path d="M4 7.5V17a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1v-3" />
        <path d="M4 7.5A2.5 2.5 0 0 0 6.5 10H19a1 1 0 0 1 1 1v2" />
        <path d="M20 13h-3.5a1 1 0 0 0 0 2H20z" />
      </>
    ),
    business: (
      <>
        <rect x="3.5" y="7" width="17" height="12.5" rx="2.5" />
        <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
        <path d="M3.5 12.5h17" />
        <path d="M11 12.5v1.5h2v-1.5" />
      </>
    ),
    payments: (
      <>
        <path d="M6 3.5h12a1 1 0 0 1 1 1v16l-2.5-1.5-2.25 1.5L12 19l-2.25 1.5L7.5 19 5 20.5v-16a1 1 0 0 1 1-1z" />
        <path d="M8.5 8.5h7" />
        <path d="M8.5 12h7" />
        <path d="M8.5 15.5h4" />
      </>
    ),
    code: (
      <>
        <path d="M8.5 8 4.5 12l4 4" />
        <path d="m15.5 8 4 4-4 4" />
        <path d="m13.25 5.5-2.5 13" />
      </>
    ),
  };
  return (
    <svg
      className="fs-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const pathways: {
  icon: IconName;
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  action: string;
  external?: boolean;
}[] = [
  {
    icon: 'wallet',
    eyebrow: 'For recipients',
    title: 'Receive and Manage Funds',
    description: 'See how money reaches your Fiatsend wallet, then hold it or settle locally.',
    to: '/docs/products/fiatsend-one',
    action: 'Explore the wallet',
  },
  {
    icon: 'business',
    eyebrow: 'For businesses',
    title: 'Run Payouts From Console',
    description: 'Set up your organization, add recipients and send single or batch payouts.',
    to: '/docs/products/fiatsend-console',
    action: 'Explore Console',
  },
  {
    icon: 'payments',
    eyebrow: 'Get paid',
    title: 'Accept Payments',
    description: 'Collect from customers with payment links, invoices or checkout on your website.',
    to: '/docs/payments/overview',
    action: 'Start accepting payments',
  },
  {
    icon: 'code',
    eyebrow: 'For developers',
    title: 'Build on Fiatsend',
    description: 'Find the API reference, SDKs, sandbox and webhook guides in the developer portal.',
    to: 'https://developer.fiatsend.com',
    action: 'Open developer docs',
    external: true,
  },
];

const principles: [string, string, string][] = [
  ['01', 'Recipient-First', 'Funds land in a Fiatsend wallet, so recipients always know their next step.'],
  ['02', 'Clear for Business Teams', 'Console gives your team one place to manage payouts and payments.'],
  ['03', 'One Home for the API', 'The full API reference lives at developer.fiatsend.com. These docs cover the product and Website Checkout.'],
];

export default function Home(): React.JSX.Element {
  const logoWhite = useBaseUrl('/img/fiatsend-logo-white.svg');
  const markWhite = useBaseUrl('/img/fiatsend-mark-white.svg');

  return (
    <Layout title="Documentation" description="Guides for receiving, managing and accepting payments with Fiatsend.">
      <main className="fs-home">
        <section className="fs-hero">
          <img className="fs-hero__mark" src={markWhite} alt="" aria-hidden="true" />
          <div className="fs-container fs-hero__grid">
            <div className="fs-hero__copy">
              <div className="fs-hero__brand">
                <img src={logoWhite} alt="Fiatsend" width={132} height={35} />
                <span className="fs-hero__badge">Docs</span>
              </div>
              <h1>Payments Across Africa, Made Clear</h1>
              <p>
                Plain guides for recipients, business teams and builders. Learn how you
                receive, manage and accept payments with Fiatsend.
              </p>
              <div className="fs-hero__actions">
                <Link className="fs-button fs-button--light" to="/docs/intro">
                  Get Started <span aria-hidden="true">→</span>
                </Link>
                <Link className="fs-button fs-button--ghost" to="/docs/payments/overview">
                  Accept Payments
                </Link>
              </div>
            </div>
            <div className="fs-flow-card" aria-label="How a Fiatsend payout works">
              <div className="fs-flow-card__label">How a Payout Works</div>
              <div className="fs-flow">
                <div className="fs-flow__step"><span>01</span><strong>Business sends</strong><small>A payout starts in Console or the API.</small></div>
                <div className="fs-flow__line" />
                <div className="fs-flow__step"><span>02</span><strong>Wallet receives</strong><small>Funds land in the recipient's Fiatsend wallet.</small></div>
                <div className="fs-flow__line" />
                <div className="fs-flow__step"><span>03</span><strong>Recipient decides</strong><small>Hold the balance or settle locally.</small></div>
              </div>
              <div className="fs-flow-card__note"><i /> New to Fiatsend? Recipients get a link to claim their funds.</div>
            </div>
          </div>
        </section>

        <section className="fs-pathways fs-container">
          <div className="fs-section-heading">
            <span className="fs-kicker fs-kicker--dark">Start with your role</span>
            <h2>Find the Right Guide Fast</h2>
          </div>
          <div className="fs-pathways__grid">
            {pathways.map((pathway) => (
              <Link
                key={pathway.title}
                className="fs-pathway"
                to={pathway.to}
                {...(pathway.external ? {target: '_blank', rel: 'noreferrer'} : {})}
              >
                <span className="fs-pathway__icon"><Icon name={pathway.icon} /></span>
                <span className="fs-pathway__eyebrow">{pathway.eyebrow}</span>
                <h3>{pathway.title}</h3>
                <p>{pathway.description}</p>
                <span className="fs-pathway__action">
                  {pathway.action} <b aria-hidden="true">{pathway.external ? '↗' : '→'}</b>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="fs-principles">
          <div className="fs-container fs-principles__grid">
            <div>
              <span className="fs-kicker">Designed for clarity</span>
              <h2>Useful When Every Payment Matters</h2>
            </div>
            <div className="fs-principles__list">
              {principles.map(([number, title, description]) => (
                <article key={number} className="fs-principle">
                  <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fs-support fs-container">
          <div>
            <span className="fs-kicker fs-kicker--dark">Need a hand?</span>
            <h2>Get Help When You Need It</h2>
          </div>
          <p>We'll point you to the right place for a wallet question, a business account or a payment in progress.</p>
          <Link className="fs-button fs-button--primary" to="/docs/resources/support">
            Get Support <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    </Layout>
  );
}
