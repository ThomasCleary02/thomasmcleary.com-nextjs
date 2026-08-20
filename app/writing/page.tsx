import { Metadata } from 'next';
import React from 'react';
import WritingListItem from '@/app/components/writing/WritingListItem';
import { getWritingSummaries } from '@/lib/content/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes by Thomas Cleary on open source history, computing, and related subjects.',
};

export default function WritingPage(): React.JSX.Element {
  const writing = getWritingSummaries();

  return (
    <div className="mx-auto max-w-measure px-6 pb-8 pt-14 sm:px-8 sm:pt-16">
      <header className="mb-10">
        <p className="font-mono text-xs tracking-[0.16em] text-muted">NOTES</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Writing</h1>
        <p className="mt-3 max-w-prose text-muted leading-relaxed">
          Open source history, computing topics, and notes from things I wanted to understand more carefully.
        </p>
      </header>

      {writing.length === 0 ? (
        <p className="text-muted">Nothing published here yet.</p>
      ) : (
        <div>
          {writing.map((piece) => (
            <WritingListItem key={piece.slug} piece={piece} />
          ))}
        </div>
      )}
    </div>
  );
}
