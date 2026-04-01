import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  iconSrc: string;
  iconAlt: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Fast integration',
    iconSrc: 'img/icon-white.png',
    iconAlt: 'Fiatsend icon',
    description: (
      <>
        Go from API keys to first payout quickly with clear guides, examples, and
        production-ready patterns.
      </>
    ),
  },
  {
    title: 'Mobile money coverage',
    iconSrc: 'img/icon-white.png',
    iconAlt: 'Fiatsend icon',
    description: (
      <>
        Build reliable payments on mobile money rails with a simple, consistent
        developer experience.
      </>
    ),
  },
  {
    title: 'Secure by design',
    iconSrc: 'img/icon-white.png',
    iconAlt: 'Fiatsend icon',
    description: (
      <>
        Understand auth, environments, idempotency, and webhooks so you can ship
        confidently.
      </>
    ),
  },
];

function Feature({title, iconSrc, iconAlt, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img
          className={styles.featureSvg}
          src={useBaseUrl(iconSrc)}
          alt={iconAlt}
          loading="lazy"
        />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
