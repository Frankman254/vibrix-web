# Trabajar en vibrix-web

Web de venta de la suite (Vibrix + Lyrixa, y lista de espera del Transcriptor).
**Next.js (App Router) + Tailwind CSS v4 + Motion + pnpm.**

Esta carpeta todavía no tiene código: solo esta guía. Lee en este orden:

1. **[.agents/SUITE.md](.agents/SUITE.md)** — los cuatro proyectos y sus rutas.
2. **El plan de la web (fuente de verdad):**
   `/Users/frankman254/Desktop/Personal-Projects/LiveWallpaperAnimeGlitch/docs/plans/PLAN_WEB_VENTA.md`
3. **[.agents/TAREAS.md](.agents/TAREAS.md)** — por qué fase ir ahora.

## Rutas de los proyectos vecinos (esta máquina)

| Proyecto                              | Ruta                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------ |
| Vibrix (el producto que se vende)     | `/Users/frankman254/Desktop/Personal-Projects/LiveWallpaperAnimeGlitch`  |
| Lyrixa (editor de letras incluido)    | `/Users/frankman254/Desktop/Personal-Projects/Lyrixa`                    |
| Transcriptor (lista de espera)        | `/Users/frankman254/Desktop/Personal-Projects/transcriptor`              |
| Landing personal (referencia de Next) | `/Users/frankman254/Desktop/Personal-Projects/Landing-page-frankmandev`  |

De Vibrix interesan como referencia: los tokens de color
(`src/ui/tokens/`), el `CHANGELOG.md` y el plan maestro (precios en Fase 4).

## Reglas duras

- **pnpm**. Tailwind **v4** (no copiar el `tailwind.config.ts` v3 de la landing personal).
- Server Components por defecto; `'use client'` solo en hojas animadas.
- Animaciones solo con `transform`/`opacity`; respetar `prefers-reduced-motion`.
- Todo texto visible en `messages/es.json` y `messages/en.json`.
- **No anunciar features que la app aún no publica** (p. ej. export MP4 hasta
  que la Fase 1 de Vibrix esté cerrada).
- Vídeos y arte de la web salen de Vibrix con assets con licencia; nada de
  anime con copyright ni música de YouTube.
- Sin cookies de terceros. Commits solo si el usuario lo pide.

## Antes de terminar

```bash
pnpm format
pnpm lint
pnpm build
```
