# vibrix-web

Web de la suite Vibrix + Lyrixa y presentación del futuro Transcriptor.
Next.js 16 (App Router), Tailwind CSS v4, Motion y next-intl. Usar Node 22.18+
y pnpm; el contenido se mantiene en `messages/es.json` y `messages/en.json`.

## Desarrollo

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

La raíz detecta `Accept-Language`; las páginas viven en `/es` y `/en`.
`NEXT_PUBLIC_APP_URL` apunta a la app publicada y por defecto ya es el deploy
real (`https://vibrix-app.netlify.app`); todos los CTA abren la app en una
pestaña nueva. La variable solo se usa para previews o staging.

## Lista de espera (Resend)

1. Crear un segmento dedicado a la lista de espera de esta suite.
2. Crear tres propiedades de contacto de tipo texto en Resend: `song_language`,
   `signup_locale` y `waitlist_interest`.
3. Configurar **solo en el servidor** `RESEND_API_KEY` (con acceso a contactos)
   y `RESEND_WAITLIST_SEGMENT_ID`. No usar el prefijo `NEXT_PUBLIC_`.
4. Reconstruir y desplegar: el estado disponible del formulario se determina
   al generar las páginas. Comprobar con un correo propio que el contacto,
   las propiedades y el segmento quedan guardados.

Se usa la API actual de [Contacts y Segments](https://resend.com/docs/api-reference/contacts/create-contact);
Audiences está obsoleto. El formulario guarda email, idioma e interés mediante
Server Action con validación Zod, consentimiento explícito y honeypot. Una
petición no revoca bajas anteriores. No se envían correos desde esta web.
Los futuros avisos deben incluir el enlace de baja que indica el formulario.

Sin configuración, la página indica que la lista aún no está abierta y no
acepta registros. Los fallos del proveedor nunca se presentan como éxito ni
se registran correos o credenciales en logs. Antes de abrir la lista pública,
completar el aviso legal de privacidad de W4 y verificar el alta real; las
pruebas locales usan un proveedor simulado y no contactan a Resend.

## Metadatos y favicon

- `/sitemap.xml`: únicamente las páginas existentes en los dos idiomas, con
  sus alternativas. Añadir rutas cuando realmente existan.
- `/es/opengraph-image` y `/en/opengraph-image`: tarjetas PNG de 1200 × 630,
  generadas con `next/og` y el logo local, sin descargas externas.
- JSON-LD `SoftwareApplication`: sin precios, reseñas o estadísticas inventados.
- `/favicon.ico`: tamaños 16/32/48 derivados del logo oficial; `/icon.svg`
  conserva la variante adaptable. Apple usa el PNG existente de 192 px.

## Deploy (Netlify) y URL pública

El deploy es Netlify (`netlify.toml` + `@netlify/plugin-nextjs`). La URL base
de canonical, `og:image`, JSON-LD, sitemap y robots se resuelve en
`src/config/site.ts`, en este orden:

1. `NEXT_PUBLIC_SITE_URL` (dominio público; configurarlo en Netlify).
2. `URL` de Netlify, solo si `CONTEXT=production`.
3. `DEPLOY_PRIME_URL` de Netlify (deploy previews y branch deploys).
4. `https://${VERCEL_URL}` (respaldo por si se usa Vercel).
5. `http://localhost:3000`.

Solo se indexa con `NEXT_PUBLIC_SITE_URL` definido **y** una build de
producción (`CONTEXT=production` en Netlify o `VERCEL_ENV=production`). Las
previews y ramas siempre salen con `noindex` y `Disallow: /`. Netlify expone
`URL`, `DEPLOY_PRIME_URL` y `CONTEXT` durante la build; como las páginas son
estáticas, cuenta el valor de build. Para simularlo en local:

```sh
NEXT_PUBLIC_SITE_URL=https://example.com CONTEXT=production URL=https://example.com pnpm build
```

## Privacidad

`/es/legal/privacy` y `/en/legal/privacy` explican qué guarda la lista de
espera en Resend, cómo darse de baja, que no hay cookies propias ni analítica
y que el audio no sale del equipo. El texto vive en `Privacy` de
`messages/*.json`; el responsable y el correo de contacto siguen marcados como
`[PENDIENTE]` y deben completarse antes de abrir la lista. Se enlaza desde el
pie y desde el aviso del formulario.

## Comprobaciones

```sh
pnpm format
pnpm lint
pnpm test
pnpm build
```

`pnpm test` comprueba la validación y persistencia de la lista, altas repetidas,
bajas, errores parciales y límites del proveedor, sin enviar información real.
Con `pnpm start --port 3000`, ejecutar `pnpm test:smoke` para verificar el HTML
visible del hero, sitemap, JSON-LD, tarjetas OG, favicon y la página de
privacidad contra la build.
`SMOKE_BASE_URL` permite apuntar a otra URL local.

El export offline MP4/WebM se publicó en Vibrix `0.5.0-alpha` y la web lo
presenta como experimental: solo navegadores Chromium de escritorio
(WebCodecs), sin QA de canciones largas; en Safari/Firefox la alternativa es
el modo presentación + OBS. Revisar el copy si cambia su estado en
`CHANGELOG.md` o `docs/status/CURRENT_SYSTEM_STATUS.md` de Vibrix. Estado de
fases: `.agents/TAREAS.md`.
