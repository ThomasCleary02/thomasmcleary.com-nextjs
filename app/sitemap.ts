import { MetadataRoute } from 'next';
import { getAllWriting } from '@/lib/content/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thomasmcleary.com';
  const writing = getAllWriting();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...writing.map((piece) => ({
      url: `${baseUrl}/writing/${piece.slug}`,
      lastModified: new Date(piece.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
