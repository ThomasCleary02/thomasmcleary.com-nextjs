import Hero from './components/home-page/Hero';
import GreetingSection from './components/home-page/GreetingSection';
import CTASec from './components/home-page/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <GreetingSection />
      <CTASec />
    </div>
  );
}
