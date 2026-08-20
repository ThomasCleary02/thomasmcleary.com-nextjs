export interface WritingPiece {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  body: string;
}

export interface WritingSummary {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  excerpt: string;
}
