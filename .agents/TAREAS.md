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
