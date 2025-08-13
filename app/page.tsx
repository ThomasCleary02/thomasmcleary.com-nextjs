import Hero from './components/Hero';
import AboutMeSection from './components/AboutMe';
import CTASec from './components/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutMeSection />
      <CTASec />
    </div>
  );
}
