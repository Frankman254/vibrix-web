function parseAppUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;

  const url = new URL(value);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('NEXT_PUBLIC_APP_URL must use HTTP or HTTPS.');
  }

  return url.toString();
}

export const appUrl = parseAppUrl(process.env.NEXT_PUBLIC_APP_URL);
