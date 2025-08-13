import RouteButton from './RouteButton';

export default function CTASec() {
  return (
    <section className="bg-backgroundLight flex items-center justify-center px-10">
      <div className="container mx-auto max-w-6xl flex flex-col items-center justify-center text-center py-24">
        <h1 className="text-4xl lg:text-5xl font-bold text-primaryBlue mb-6 text-center">
          Check out my project showcase!
        </h1>
        <div className="mt-6">
          <RouteButton 
            text="Let's Go!" 
            route="/projects"
          />
        </div>
      </div>
    </section>
  );
} 