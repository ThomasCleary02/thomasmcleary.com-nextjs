import { Metadata } from 'next';
import Hero from './components/home-page/Hero';
import GreetingSection from './components/home-page/GreetingSection';
import CTASec from './components/home-page/CallToAction';
import React from 'react';

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

export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <Hero />
      <GreetingSection />
      <CTASec />
    </div>
  );
}
