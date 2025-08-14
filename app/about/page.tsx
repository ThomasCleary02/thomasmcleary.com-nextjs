import { Metadata } from 'next';
import AboutHero from '../components/about-page/AboutHero';
import AboutContent from '../components/about-page/AboutContent';
import AboutSkills from '../components/about-page/AboutSkills';
import AboutContact from '../components/about-page/AboutContact';
import React from 'react';

export const metadata: Metadata = {
  title: 'About - Thomas Cleary',
  description: 'Learn more about Thomas Cleary, a software engineer with expertise in computer science and innovative solutions.',
};

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <AboutHero />
      <AboutContent />
      <AboutSkills />
      <AboutContact />
    </div>
  );
}
