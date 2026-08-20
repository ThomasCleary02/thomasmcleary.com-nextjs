export function formatDate(dateString: string): string {
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(dateString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function excerptFromBody(body: string, maxLength = 180): string {
  const plain = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength).trim()}…`;
}
