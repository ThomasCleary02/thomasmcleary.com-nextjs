import Link from 'next/link';
import React from 'react';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-measure px-6 pb-8 pt-20 sm:px-8">
      <p className="font-mono text-xs tracking-[0.16em] text-muted">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">That address does not exist on this site.</p>
      <p className="mt-8 font-mono text-xs tracking-wide">
        <Link href="/" className="transition-colors hover:text-accent">
          ← home
        </Link>
      </p>
    </div>
  );
}
