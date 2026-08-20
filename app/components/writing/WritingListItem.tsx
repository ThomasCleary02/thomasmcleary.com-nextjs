import Link from 'next/link';
import React from 'react';
import { WritingSummary } from '@/lib/types/writing';
import { formatDate } from '@/lib/utils/format-date';

interface WritingListItemProps {
  piece: WritingSummary;
}

export default function WritingListItem({ piece }: WritingListItemProps): React.JSX.Element {
  return (
    <article className="border-t border-rule py-6 first:border-t-0 first:pt-0 last:pb-0">
      <time className="font-mono text-xs tracking-wide text-muted" dateTime={piece.date}>
        {formatDate(piece.date)}
      </time>
      <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight">
        <Link href={`/writing/${piece.slug}`} className="transition-colors hover:text-accent">
          {piece.title}
        </Link>
      </h2>
      {piece.excerpt && (
        <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">
          {piece.excerpt}
        </p>
      )}
    </article>
  );
}
