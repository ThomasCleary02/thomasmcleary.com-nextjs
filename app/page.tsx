import { Metadata } from 'next';
import React from 'react';
import Hero from './components/home-page/Hero';
import IntroSection from './components/home-page/IntroSection';
import CTASec from './components/home-page/CallToAction';

export const metadata: Metadata = {
  title: 'Thomas Cleary - Software Engineer',
  description: 'Full-stack software engineer specializing in web development, mobile applications, and innovative solutions. View my portfolio of projects and get in touch.',
  openGraph: {
    title: 'Thomas Cleary - Software Engineer',
    description: 'Full-stack software engineer specializing in web development, mobile applications, and innovative solutions.',
    url: 'https://thomasmcleary.com',
  },
  twitter: {
    title: 'Thomas Cleary - Software Engineer',
    description: 'Full-stack software engineer specializing in web development, mobile applications, and innovative solutions.',
  },
};

export default async function HomePage(): Promise<React.JSX.Element> {
  return (
    <div className="min-h-screen">
      <Hero />
      <IntroSection />
      <CTASec />
    </div>
  );
}
