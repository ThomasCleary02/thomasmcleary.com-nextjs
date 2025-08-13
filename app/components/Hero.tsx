// app/components/Hero.tsx
import RouteButton from './RouteButton';

export default function Hero() {
  return (
    <section className="bg-backgroundLight h-screen flex items-center justify-center px-10">
      <div className="container mx-auto max-w-6xl px-2 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="lg:w-2/3 text-center lg:text-left w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-primaryBlue mb-4">
            Hey, I&apos;m Thomas!
          </h1>
          <p className="text-lg lg:text-xl text-darkGray mb-6">
            A <span className="text-primaryBlue font-semibold">software engineer</span> passionate about 
            building innovative solutions across the full technology stack. I specialize in creating 
            <span className="text-primaryBlue font-semibold"> user-focused</span>{' '}
            applications that solve real-world problems.
          </p>
          <p className="text-base text-gray-600 mb-6">
            From web development to mobile apps, from frontend interfaces to backend systems, 
            I bring a comprehensive understanding of modern software architecture and development practices.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <RouteButton 
              text="Check Out My Projects!" 
              route="/projects"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/3 flex justify-center lg:justify-end w-full">
          <img
            src="/avatar.png"
            alt="Thomas"
            className="rounded-lg max-w-full"
          />
        </div>
      </div>
    </section>
  );
}