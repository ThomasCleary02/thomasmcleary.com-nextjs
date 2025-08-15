export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Thomas Cleary",
    "jobTitle": "Software Engineer",
    "description": "Full-stack software engineer specializing in web development, mobile applications, and innovative solutions.",
    "url": "https://thomasmcleary.com",
    "sameAs": [
      "https://github.com/ThomasCleary02",
      "https://www.linkedin.com/in/t-cleary/",
    ],
    "knowsAbout": [
      "Web Development",
      "Mobile Applications",
      "Full-Stack Development",
      "React",
      "Python",
      "Software Engineering"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Self-Employed"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
