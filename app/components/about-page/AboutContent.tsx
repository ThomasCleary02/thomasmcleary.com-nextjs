export default function AboutContent() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Subtle background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl transform rotate-3 scale-105 opacity-60"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl dark:shadow-gray-900/50">
                <img
                  src="/Vector 1.png"
                  alt="Thomas Cleary"
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Who I Am
            </h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="text-lg">
                I'm Thomas Cleary, a software engineer with a strong foundation in computer science and 
                a passion for building innovative solutions. I hold a Bachelor of Science in Computer & Information Technology 
                from Shepherd University, where I developed expertise in software engineering, networking, database management, 
                and systems security.
              </p>
              <p className="text-lg">
                My technical skills span the full development spectrum - from frontend frameworks and responsive design 
                to backend architecture, database systems, and cloud infrastructure. I'm comfortable working with 
                multiple programming languages, frameworks, and tools, allowing me to adapt quickly to new technologies 
                and project requirements.
              </p>
              <p className="text-lg">
                Beyond technical skills, I bring strong problem-solving abilities, effective communication, 
                and a collaborative mindset to every project. I thrive in agile environments and enjoy working 
                with teams to deliver high-quality software solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}