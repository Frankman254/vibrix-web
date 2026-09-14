// Deploy público de Vibrix. NEXT_PUBLIC_APP_URL puede sobreescribirlo
// (previews, staging); sin variable, la web siempre referencia la app real.
const PUBLIC_APP_URL = 'https://vibrix-app.netlify.app/';

function parseAppUrl(value: string | undefined): string {
  const raw = value?.trim() || PUBLIC_APP_URL;

  const url = new URL(raw);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('NEXT_PUBLIC_APP_URL must use HTTP or HTTPS.');
  }

  return url.toString();
}

export const appUrl = parseAppUrl(process.env.NEXT_PUBLIC_APP_URL);
