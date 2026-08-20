import React from 'react';

export default function StructuredData(): React.JSX.Element {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thomas Cleary',
    jobTitle: 'Software Engineer',
    description: 'Software engineer at Orases in Frederick, Maryland.',
    url: 'https://thomasmcleary.com',
    sameAs: [
      'https://github.com/ThomasCleary02',
      'https://www.linkedin.com/in/t-cleary/',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Orases',
      url: 'https://orases.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Frederick',
        addressRegion: 'MD',
        addressCountry: 'US',
      },
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Shepherd University',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
