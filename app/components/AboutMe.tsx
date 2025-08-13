import Link from 'next/link';

export default function AboutMeSection() {
  // Temporary static data until database is set up
  const featuredProjects: any[] = []; // Empty for now
  const allProjects: any[] = [];

  return (
    // Add relative positioning and increased z-index to lift above hero
    <section className="relative bg-lightBlue/75 min-h-screen flex items-center justify-center px-10 z-10">
      {/* Add top shadow to create depth effect */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-t from-transparent to-black/15"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/10 to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl flex py-24 flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-12">
        {/* Right Image */}
        <div className="lg:w-1/3 flex">
          <img
            src="/Vector 1.png"
            alt="Thomas"
            className="rounded-xl shadow-xl max-w-full m-auto"
          />
        </div>

        {/* Left Content */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl lg:text-5xl font-bold text-backgroundLight mb-6 text-shadow">
            About Me
          </h1>
          <p className="text-lg lg:text-xl text-white leading-relaxed text-shadow">
            I&apos;m Thomas Cleary, a student at Shepherd University studying
            Computer and Information Technology. I&apos;m passionate about web
            development and proficient in HTML, CSS, JavaScript, and Python. I
            have experience with both relational and nonrelational databases,
            including MongoDB and MySQL. I&apos;m familiar with tools like Figma, VS
            Code, and Postman, and have some exposure to Amazon Web Services.
            Let&apos;s collaborate and bring ideas to life with React and Django!
          </p>
        </div>
      </div>
    </section>
  );
} 