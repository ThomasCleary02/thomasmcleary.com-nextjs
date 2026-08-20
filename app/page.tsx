import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import WritingListItem from './components/writing/WritingListItem';
import { getWritingSummaries } from '@/lib/content/writing';
import { getSocialLinks } from '@/lib/utils/social';

export const metadata: Metadata = {
  title: 'Thomas Cleary',
  description:
    'Thomas Cleary is a software engineer at Orases in Frederick, Maryland.',
};

export default function HomePage(): React.JSX.Element {
  const writing = getWritingSummaries(3);
  const links = getSocialLinks();

  return (
    <div className="mx-auto max-w-measure px-6 pb-8 pt-16 sm:px-8 sm:pt-24">
      <p className="font-mono text-xs tracking-[0.16em] text-accent">SOFTWARE ENGINEER</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Thomas Cleary
      </h1>
      <p className="mt-4 text-lg text-muted">
        At{' '}
        <a
          href="https://orases.com"
          className="site-link text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Orases
        </a>{' '}
        in Frederick, Maryland.
      </p>

      <div className="mt-10 space-y-5 text-[1.05rem] leading-[1.7] text-ink/90">
        <p>
          I work on web applications and related systems for client projects.
          Before Orases I studied computer and information technology at Shepherd
          University.
        </p>
        <p>
          Some writing on open source history and computing is collected here.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-wide">
        <a className="transition-colors hover:text-accent" href={links.email.url}>
          email
        </a>
        <a
          className="transition-colors hover:text-accent"
          href={links.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>
        <a
          className="transition-colors hover:text-accent"
          href={links.github.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </div>

      {writing.length > 0 && (
        <section className="mt-16 border-t border-rule pt-10">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold tracking-tight">Writing</h2>
            <Link
              href="/writing"
              className="font-mono text-xs tracking-wide text-muted transition-colors hover:text-ink"
            >
              all →
            </Link>
          </div>
          <div>
            {writing.map((piece) => (
              <WritingListItem key={piece.slug} piece={piece} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
