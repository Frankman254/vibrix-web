const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const deploymentHost = process.env.VERCEL_URL;

export const site = {
  url:
    siteUrl ||
    (deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3000'),
  indexable: process.env.VERCEL_ENV === 'production' && Boolean(siteUrl),
} as const;
