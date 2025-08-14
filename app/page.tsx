import Hero from './components/home-page/Hero';
import GreetingSection from './components/home-page/GreetingSection';
import CTASec from './components/home-page/CallToAction';
import React from 'react';

export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <Hero />
      <GreetingSection />
      <CTASec />
    </div>
  );
}
