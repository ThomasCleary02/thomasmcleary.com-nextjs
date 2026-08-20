import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { WritingPiece } from '@/lib/types/writing';
import { formatDate } from '@/lib/utils/format-date';

interface WritingArticleProps {
  piece: WritingPiece;
}

export default function WritingArticle({ piece }: WritingArticleProps): React.JSX.Element {
  return (
    <article>
      <p className="mb-8 font-mono text-xs tracking-wide text-muted">
        <Link href="/writing" className="transition-colors hover:text-ink">
          ← writing
        </Link>
      </p>
      <header className="mb-10 border-b border-rule pb-8">
        <time className="font-mono text-xs tracking-wide text-muted" dateTime={piece.date}>
          {formatDate(piece.date)}
        </time>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {piece.title}
        </h1>
        {piece.subtitle && (
          <p className="mt-3 text-lg leading-relaxed text-muted">
            {piece.subtitle}
          </p>
        )}
      </header>
      <div className="space-y-5 text-[1.05rem] leading-[1.75]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h2 className="pt-3 text-2xl font-semibold tracking-tight">{children}</h2>
            ),
            h2: ({ children }) => (
              <h2 className="pt-3 text-xl font-semibold tracking-tight">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="pt-2 text-lg font-semibold tracking-tight">{children}</h3>
            ),
            p: ({ children }) => <p>{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc space-y-2 pl-5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal space-y-2 pl-5">{children}</ol>
            ),
            li: ({ children }) => <li>{children}</li>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-accent/40 pl-5 text-muted">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a href={href} className="site-link">
                {children}
              </a>
            ),
            code: ({ children, className }) => {
              const isBlock = Boolean(className);
              if (isBlock) {
                return (
                  <code className="block overflow-x-auto rounded-md bg-surface px-4 py-3 font-mono text-sm border border-rule">
                    {children}
                  </code>
                );
              }
              return (
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] border border-rule">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => <pre className="overflow-x-auto">{children}</pre>,
            img: ({ src, alt }) =>
              typeof src === 'string' ? (
                <img src={src} alt={alt || ''} className="my-6 w-full rounded-md" />
              ) : null,
          }}
        >
          {piece.body}
        </ReactMarkdown>
      </div>
    </article>
  );
}
