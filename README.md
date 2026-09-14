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

Configurar `NEXT_PUBLIC_SITE_URL` con el dominio público. Las previews de
Vercel usan `VERCEL_URL` y permanecen `noindex`. Solo una build de producción
con dominio configurado permite indexación. No usar localhost en un deploy
ajeno a Vercel: establecer siempre `NEXT_PUBLIC_SITE_URL` en ese caso.

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
visible del hero, sitemap, JSON-LD, tarjetas OG y favicon contra la build.
`SMOKE_BASE_URL` permite apuntar a otra URL local.

El export MP4/WebM figura en `Unreleased` del producto (alpha de desarrollo).
Cambiar su disponibilidad pública solo cuando se publique la versión y se
comprueben sus limitaciones. Estado de fases: `.agents/TAREAS.md`.
