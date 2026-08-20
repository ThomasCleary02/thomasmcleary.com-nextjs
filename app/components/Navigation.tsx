'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation(): React.JSX.Element {
  const pathname = usePathname();
  const writingActive = pathname.startsWith('/writing');

  return (
    <header className="px-6 pt-7 sm:px-8">
      <div className="mx-auto flex max-w-measure items-center justify-between gap-6">
        {pathname === '/' ? (
          <span className="font-mono text-xs tracking-[0.18em] text-muted">TC</span>
        ) : (
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-ink transition-colors hover:text-accent"
          >
            Thomas Cleary
          </Link>
        )}
        <nav className="flex items-center gap-5 font-mono text-xs tracking-wide text-muted">
          <Link
            href="/writing"
            className={`transition-colors hover:text-ink ${writingActive ? 'text-ink' : ''}`}
          >
            writing
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
