import { Metadata } from 'next';
import React from 'react';
import Hero from './components/home-page/Hero';
import GreetingSection from './components/home-page/GreetingSection';
import CTASec from './components/home-page/CallToAction';
import { GreetingService } from '@/lib/services/greeting';

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
  // Fetch greeting data on the server
  const greetingService = new GreetingService();
  const greetingData = await greetingService.getGreetingData();
  
  return (
    <div className="min-h-screen">
      <Hero />
      <GreetingSection greetingData={greetingData} />
      <CTASec />
    </div>
  );
}
