import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import WritingArticle from '@/app/components/writing/WritingArticle';
import { getWritingBySlug, getWritingSlugs } from '@/lib/content/writing';

interface WritingPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const piece = getWritingBySlug(slug);

  if (!piece) {
    return {
      title: 'Not found',
    };
  }

  return {
    title: piece.title,
    description: piece.subtitle || piece.body.substring(0, 160),
  };
}

export default async function WritingPiecePage({
  params,
}: WritingPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const piece = getWritingBySlug(slug);

  if (!piece) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-measure px-6 pb-8 pt-16 sm:px-8 sm:pt-20">
      <WritingArticle piece={piece} />
    </div>
  );
}
