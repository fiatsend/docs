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
    title: 'Fast Integration',
    iconSrc: 'img/fiatsend-mark.svg',
    iconAlt: '',
    description: (
      <>
        Go from API keys to first payout quickly with clear guides, examples, and
        production-ready patterns.
      </>
    ),
  },
  {
    title: 'Mobile Money Coverage',
    iconSrc: 'img/fiatsend-mark.svg',
    iconAlt: '',
    description: (
      <>
        Build reliable payments on mobile money rails with a simple, consistent
        developer experience.
      </>
    ),
  },
  {
    title: 'Secure by Design',
    iconSrc: 'img/fiatsend-mark.svg',
    iconAlt: '',
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
      <div className={styles.featureCard}>
      <div>
        <img
          className={styles.featureSvg}
          src={useBaseUrl(iconSrc)}
          alt={iconAlt}
          loading="lazy"
        />
      </div>
      <div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
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
