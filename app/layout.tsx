import type { Metadata, Viewport } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { ThemeProvider } from './contexts/ThemeContext'
import StructuredData from './components/StructuredData';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Thomas Cleary - Software Engineer',
    template: '%s | Thomas Cleary'
  },
  description: 'Full-stack software engineer specializing in web development, mobile applications, and innovative solutions. View my portfolio of projects and get in touch.',
  keywords: ['software engineer', 'full-stack developer', 'web development', 'React', 'Python', 'portfolio', 'Thomas Cleary'],
  authors: [{ name: 'Thomas Cleary' }],
  creator: 'Thomas Cleary',
  publisher: 'Thomas Cleary',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://thomasmcleary.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Thomas Cleary - Software Engineer',
    description: 'Full-stack software engineer specializing in web development, mobile applications, and innovative solutions.',
    url: 'https://thomasmcleary.com',
    siteName: 'Thomas Cleary Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thomas Cleary - Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomas Cleary - Software Engineer',
    description: 'Full-stack software engineer specializing in web development, mobile applications, and innovative solutions.',
    images: ['/og-image.png'],
    creator: '@yourtwitterhandle', // Add if you have one
  },
  verification: {
    google: 'your-google-verification-code', // Add Google Search Console verification
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'portfolio',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0348A5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${nunito.variable} font-body`}>
        <ThemeProvider>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
