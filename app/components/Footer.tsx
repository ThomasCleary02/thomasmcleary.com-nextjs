import React from 'react';
import { getSocialLinks } from '@/lib/utils/social';

export default function Footer(): React.JSX.Element {
  const links = getSocialLinks();

  return (
    <footer className="px-6 pb-10 pt-20 sm:px-8">
      <div className="mx-auto flex max-w-measure flex-col gap-4 border-t border-rule pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-wide">
          © {new Date().getFullYear()} Thomas Cleary
        </p>
        <div className="flex gap-5 font-mono text-xs tracking-wide">
          <a className="transition-colors hover:text-ink" href={links.email.url}>
            email
          </a>
          <a
            className="transition-colors hover:text-ink"
            href={links.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <a
            className="transition-colors hover:text-ink"
            href={links.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </div>
      </div>
    </footer>
  );
}
