import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import React from 'react';
import './globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import StructuredData from './components/StructuredData';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const description =
  'Thomas Cleary is a software engineer at Orases in Frederick, Maryland.';

export const metadata: Metadata = {
  title: {
    default: 'Thomas Cleary',
    template: '%s · Thomas Cleary',
  },
  description,
  keywords: [
    'Thomas Cleary',
    'software engineer',
    'Orases',
    'Frederick Maryland',
  ],
  authors: [{ name: 'Thomas Cleary', url: 'https://thomasmcleary.com' }],
  creator: 'Thomas Cleary',
  publisher: 'Thomas Cleary',
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://thomasmcleary.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Thomas Cleary',
    description,
    url: 'https://thomasmcleary.com',
    siteName: 'Thomas Cleary',
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'Thomas Cleary',
    description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f6f8' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <div className="site-shell flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
