import RouteButton from './RouteButton';

export default function CTASec() {
  return (
    <section className="bg-backgroundLight flex items-center justify-center px-10">
      <div className="container mx-auto max-w-6xl flex flex-col items-center justify-center text-center py-24">
        <h1 className="text-4xl lg:text-5xl font-bold text-primaryBlue mb-6 text-center">
          Let&apos;s build something amazing together
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Whether you need a full-stack web application, a mobile app, or help architecting a complex system, 
          I&apos;m ready to bring your vision to life with clean, scalable, and maintainable code.
        </p>
        <div className="mt-6">
          <RouteButton 
            text="Explore My Work" 
            route="/projects"
          />
        </div>
      </div>
    </section>
  );
} 