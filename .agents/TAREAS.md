# vibrix-web — qué hacer ahora

> Plan completo:
> `/Users/frankman254/Desktop/Personal-Projects/LiveWallpaperAnimeGlitch/docs/plans/PLAN_WEB_VENTA.md`.
> Actualizado tras la revisión de la landing del 2026-09-13.

| Fase | Estado | Resumen |
| ---- | ------ | ------- |
| **W0** | **Base implementada** | Next.js, tokens, fuentes, i18n, layout, navegación, footer, Motion y favicon. Vercel elegido. Falta registrar preview online y medición Lighthouse para el cierre formal. |
| **W1** | **Implementada; alta real pendiente** | Hero y capturas, showcase, proceso, editor, suite, features, comparativa, FAQ y CTA. Formulario Resend implementado; requiere credenciales, segmento, propiedades y prueba de un alta real. |
| W2 | Pendiente de producto | Sustituir capturas por vídeos exportados y completar `/templates` y `/lyrixa` cuando se publique el export y las plantillas. |
| W3 | Bloqueada | Precios y checkout, pendientes del sistema de licencias y cifras aprobadas. |
| W4 | En curso | Sitemap, JSON-LD y OG por locale implementados. Faltan legal, changelog, analítica y mediciones de rendimiento. |
| W5 | Bloqueada | Dominio definitivo y checklist de lanzamiento. |

## Próximos pasos

0. **Hecho (2026-09-13):** aplicados los
   [AJUSTES_ALINEACION_VIBRIX.md](AJUSTES_ALINEACION_VIBRIX.md). Copy ES/EN
   actualizado (description del showcase, scope, orbital, «Bloques lineales»,
   features.spectrum, editor.scenes); los items `radial` y `linear` muestran
   ahora «Classic · Barras/Bloques» en la etiqueta de familia; cero menciones
   a «cápsulas» en el HTML servido. `content/legal/assets.md` registra las 10
   capturas con su familia/estilo y «receta no registrada» donde no consta.
   Pasos 5 (slots «Showcase · …» en Vibrix) y regeneración de capturas (W2)
   siguen pendientes del repo del producto.

0b. **Hecho (2026-10-18):** rama `fix/landing-review-seo-waitlist`.
   - Seguridad: `next` y `eslint-config-next` 16.3.5 → 16.4.2 (advisory de
     Next.js del 2026-10-14; corregido desde 16.4.1), `react`/`react-dom`
     19.2.8 → 19.2.9 y `source-map-js` transitivo a 1.2.2.
     `pnpm audit --prod`: de 9 avisos (1 crítico) a 0.
   - SEO en Netlify: `src/config/site.ts` resuelve `NEXT_PUBLIC_SITE_URL` →
     `URL` (si `CONTEXT=production`) → `DEPLOY_PRIME_URL` → `VERCEL_URL` →
     localhost. Indexable solo con `NEXT_PUBLIC_SITE_URL` y build de
     producción; las previews siguen en `noindex`. La plataforma real es
     Netlify, no Vercel (sustituye lo dicho en W0 y en el paso 3).
   - Copy del export (Hero, FAQ, Comparativa) alineado con Vibrix
     `0.5.0-alpha`: experimental, solo Chromium de escritorio. Nueva FAQ
     `browsers` (navegadores, OBS + modo presentación, móvil). Sustituye el
     paso 4.
   - Página `/[locale]/legal/privacy` (ES/EN, metadata y hreflang) enlazada
     desde el pie y el aviso de la waitlist, y añadida al sitemap y al smoke.
     **Falta** rellenar responsable y correo de contacto (`[PENDIENTE]` en
     `Privacy.sections.contact`) antes de abrir la lista (paso 2).
   - Pendiente de producción: definir `NEXT_PUBLIC_SITE_URL` en Netlify
     cuando haya dominio para permitir la indexación.

1. Configurar `RESEND_API_KEY` y `RESEND_WAITLIST_SEGMENT_ID` en el servidor.
   Crear las propiedades de texto `song_language`, `signup_locale` y
   `waitlist_interest` en Resend. Reconstruir y probar con un correo propio.
   Sin configuración el formulario comunica que la lista no está abierta;
   nunca muestra un éxito simulado. Ver `README.md`.
2. Completar el aviso de privacidad antes de abrir públicamente la lista.
3. Configurar `NEXT_PUBLIC_SITE_URL` y, cuando exista una app publicada,
   `NEXT_PUBLIC_APP_URL`. Verificar preview Vercel, móvil 375 px / desktop
   1440 px, reduced motion y Lighthouse móvil. No dar W0 por cerrada solo
   porque la base esté implementada.
4. Cuando Vibrix publique el export experimental, actualizar sus claims en
   ambos catálogos. Actualmente sigue bajo `Unreleased` en el CHANGELOG del
   producto; el FAQ distingue alpha de desarrollo de versión publicada.
5. Completar W4 y añadir las nuevas rutas al sitemap y sus OG cuando existan.

## Verificación de la revisión

- Titular y bloques Reveal visibles en el HTML servido, sin depender de JS.
- Favicon ICO 16/32/48, SVG adaptable y PNG para Apple.
- `pnpm test`: validación y persistencia Resend con respuestas simuladas;
  no envía correos ni crea contactos reales.
- `pnpm test:smoke`: requiere servidor de producción; verifica HTML, sitemap,
  JSON-LD, favicon, OG ES/EN y paridad de traducciones.
- Turbopack falla en este sandbox al abrir su puerto interno de compilación.
  Usar `pnpm build --webpack` para contrastar la build sin cambiar el bundler
  predeterminado del proyecto. Registrar el resultado final en la entrega.
- No se han creado commits ni desplegado estos cambios.

## Verificación de los ajustes de alineación (2026-09-13)

- `pnpm format`, `pnpm lint`, `pnpm test` (7/7), `pnpm build --webpack` y
  `pnpm test:smoke` contra servidor de producción en el 3111: todos verdes.
- «Bloques lineales» / «Linear blocks», «Classic · Barras/Bloques» y el copy
  de memoria de fotogramas presentes en el HTML servido ES/EN; cero «cápsulas».
