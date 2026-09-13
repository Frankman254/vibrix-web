# vibrix-web — qué hacer ahora

> Plan completo:
> `/Users/frankman254/Desktop/Personal-Projects/LiveWallpaperAnimeGlitch/docs/plans/PLAN_WEB_VENTA.md`
> (secciones citadas abajo). Actualiza este archivo al cerrar cada fase.

| Fase   | Estado        | Resumen                                                                          |
| ------ | ------------- | -------------------------------------------------------------------------------- |
| **W0** | **Siguiente** | Scaffold, tokens, fuentes, i18n, layout, Navbar/Footer, presets de Motion, deploy preview |
| W1     | Pendiente     | Landing completa con placeholders honestos + lista de espera                     |
| W2     | Bloqueada     | Vídeos reales (espera export de Vibrix Fase 1) + `/templates` + `/lyrixa`         |
| W3     | Bloqueada     | Precios + checkout Lemon Squeezy (espera plan maestro 4.2)                       |
| W4     | Pendiente     | Legal, changelog, SEO, OG, analítica                                             |
| W5     | Bloqueada     | Lanzamiento con dominio definitivo                                               |

## Para empezar W0

1. Andamiaje exactamente como en §3 "Andamiaje" del plan (create-next-app en
   una carpeta temporal y `rsync`, porque esta carpeta ya tiene archivos).
2. Instalar: `motion`, `next-intl`, `lucide-react`, `zod`, `clsx`,
   `tailwind-merge`; dev: `prettier`, `prettier-plugin-tailwindcss`.
3. Tokens de §4 en `src/app/globals.css` con `@theme`.
4. `src/lib/motion.ts` con los presets de §7 y `MotionConfig reducedMotion="user"`.
5. Rutas `[locale]` con `es` y `en`, Navbar y Footer de §6.1 y §6.12.
6. Preguntar al usuario las decisiones de §11 que bloquean W0 (Vercel o
   Cloudflare) antes de conectar el deploy.

Criterio de salida de W0: `pnpm build` verde, la página vacía con Navbar y
Footer desplegada en preview, Lighthouse móvil ≥ 95.
