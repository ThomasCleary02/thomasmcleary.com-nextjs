import Link from 'next/link';

export default function AboutMeSection() {
  return (
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
          <p className="text-lg lg:text-xl text-white leading-relaxed text-shadow mb-6">
            I'm Thomas Cleary, a software engineer with a strong foundation in computer science and 
            a passion for building innovative solutions. I hold a Bachelor of Science in Computer & Information Technology 
            from Shepherd University, where I developed expertise in software engineering, networking, database management, 
            and systems security.
          </p>
          <p className="text-lg lg:text-xl text-white leading-relaxed text-shadow mb-6">
            My technical skills span the full development spectrum - from frontend frameworks and responsive design 
            to backend architecture, database systems, and cloud infrastructure. I'm comfortable working with 
            multiple programming languages, frameworks, and tools, allowing me to adapt quickly to new technologies 
            and project requirements.
          </p>
          <p className="text-lg lg:text-xl text-white leading-relaxed text-shadow">
            Beyond technical skills, I bring strong problem-solving abilities, effective communication, 
            and a collaborative mindset to every project. I thrive in agile environments and enjoy working 
            with teams to deliver high-quality software solutions.
          </p>
        </div>
      </div>
    </section>
  );
} 