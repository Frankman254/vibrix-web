// URL pública e indexación. El deploy real es Netlify, que expone `CONTEXT`
// (production | deploy-preview | branch-deploy | dev), `URL` (dominio
// principal del sitio) y `DEPLOY_PRIME_URL` (URL de la preview o rama).
// Se mantiene el respaldo de Vercel por si se usa en otro entorno.
const env = process.env;
const explicitUrl = env.NEXT_PUBLIC_SITE_URL?.trim();
const isNetlifyProduction = env.CONTEXT === 'production';
const isVercelProduction = env.VERCEL_ENV === 'production';

function resolveSiteUrl(): string {
  if (explicitUrl) return explicitUrl;
  if (isNetlifyProduction && env.URL) return env.URL;
  if (env.DEPLOY_PRIME_URL) return env.DEPLOY_PRIME_URL;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export const site = {
  url: resolveSiteUrl(),
  // Solo una build de producción con dominio público explícito se indexa.
  // Previews y ramas (Netlify o Vercel) quedan siempre en noindex.
  indexable:
    Boolean(explicitUrl) && (isNetlifyProduction || isVercelProduction),
} as const;
