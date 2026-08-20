import fs from 'fs';
import path from 'path';
import { WritingPiece, WritingSummary } from '@/lib/types/writing';
import { excerptFromBody } from '@/lib/utils/format-date';

const writingDirectory = path.join(process.cwd(), 'content', 'writing');

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw.trim() };
  }

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, body: match[2].trim() };
}

function getMarkdownFilenames(): string[] {
  if (!fs.existsSync(writingDirectory)) {
    return [];
  }

  return fs
    .readdirSync(writingDirectory)
    .filter((filename) => filename.endsWith('.md'));
}

export function getAllWriting(): WritingPiece[] {
  return getMarkdownFilenames()
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      return getWritingBySlug(slug);
    })
    .filter((piece): piece is WritingPiece => piece !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getWritingSummaries(limit?: number): WritingSummary[] {
  const pieces = getAllWriting().map((piece) => {
    const summary: WritingSummary = {
      slug: piece.slug,
      title: piece.title,
      date: piece.date,
      excerpt: piece.subtitle || excerptFromBody(piece.body),
    };

    if (piece.subtitle) {
      summary.subtitle = piece.subtitle;
    }

    return summary;
  });

  return typeof limit === 'number' ? pieces.slice(0, limit) : pieces;
}

export function getWritingBySlug(slug: string): WritingPiece | null {
  const fullPath = path.join(writingDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, body } = parseFrontmatter(raw);
  const title = data.title?.trim();
  const date = data.date?.trim();

  if (!title || !date) {
    return null;
  }

  const piece: WritingPiece = {
    slug,
    title,
    date,
    body,
  };

  if (data.subtitle?.trim()) {
    piece.subtitle = data.subtitle.trim();
  }

  return piece;
}

export function getWritingSlugs(): string[] {
  return getAllWriting().map((piece) => piece.slug);
}
