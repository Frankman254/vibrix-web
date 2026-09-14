# Ajustes de alineación web ↔ Vibrix (espectros y claims del editor)

> Auditoría del 2026-09-13 hecha desde el repo de Vibrix
> (`/Users/frankman254/Desktop/Personal-Projects/LiveWallpaperAnimeGlitch`),
> cruzando `messages/{es,en}.json` y `public/media/screens/*.jpg` con el código
> real del producto. **Este documento es la tarea para el agente de
> `vibrix-web`.** Solo toca copy, alt text y documentación de assets; no hace
> falta cambiar componentes salvo lo indicado en el paso 4.

## Por qué existe

El dueño del producto intentó reproducir en Vibrix algunos visuales del
showcase y no lo consiguió. Tenía la duda de si era marketing.

**Veredicto: no son falsos, pero no se pueden reproducir tal como están
presentados.**

- Las 8 capturas son renders reales de Vibrix. Se ven la escena demo, el logo
  oficial, la lluvia y el título "demo track" del widget Now Playing.
- Las 6 familias existen y se eligen en el selector de la pestaña Spectrum.
- Pero cada captura usa ajustes no predeterminados: presets de familia, Frame
  Memory, pixelado, número de barras y paleta.
- **No hay receta, preset ni look en Vibrix que cargue ese resultado.**
- Hay dos nombres que no corresponden con el producto: "Cápsulas" y
  "familias … pixeladas".

Un visitante que compre esperando "elige una forma y mira cómo cambia la
escena" verá otra cosa si solo cambia de familia.

## Evidencia en Vibrix (rutas del repo del producto)

| Hecho | Dónde se comprueba |
| ----- | ------------------ |
| Familias: `classic`, `oscilloscope`, `tunnel`, `liquid`, `orbital`, `spiral` (6) | `src/types/wallpaper.ts` → `SpectrumFamily` |
| Las 6 se eligen en la UI | `src/features/spectrum/controls/panels/SpectrumFamilyPanel.tsx` |
| "Lineal" y "radial" son **modos** (`SpectrumMode`), no familias | `src/types/wallpaper.ts` → `SpectrumMode = 'radial' \| 'linear'` |
| "Pixel" es una **forma** de la familia Classic (y un pixelado opcional por instancia), no una familia | `SpectrumShape` incluye `'pixel'`; `spectrumPixelate` |
| Estilos del selector (lineal y radial): `bars`, `blocks`, `pixel`, `wave`, `dots` | `src/features/spectrum/domain/spectrumControlConfig.ts` → `SPECTRUM_LINEAR_STYLES` / `SPECTRUM_RADIAL_STYLES` |
| **`capsules` es legacy**: no aparece en el selector y se normaliza a `blocks` | `normalizeSpectrumShape()` en el mismo archivo |
| Presets de 1 clic: Túnel y Líquido (Safe / Balanced / Heavy), Frame Memory (afterglow, trails, ghost frames) | `src/features/spectrum/presets/` |
| Los perfiles demo que existen son solo "Neon Glitch" y "Echo Sparks" (Classic wave lineal); ninguno reproduce el showcase | `spectrumVisualAccentsDemoProfiles.ts` |
| Modo simple / avanzado | `src/types/wallpaper.ts` → `UIMode`; `src/editor/UIMode` |
| Modo presentación (salida limpia) | `src/runtime/runtimeUiModeStore.ts` → `'presentation'` |
| Una escena enlaza slots de espectro 1 y 2, looks, partículas, lluvia, luces, cámara, logo y título. **No enlaza el fondo**: el fondo apunta a una escena | `SceneSlot` en `src/types/wallpaper.ts` |
| "Looks" en Vibrix = looks de filtro/color (`src/features/filterLooks`) | — |
| Letras: Vibrix importa el bundle de Lyrixa; no las edita | `src/features/lyrics` |

## Tabla claim → estado → acción

Estados: ✅ correcto · ⚠️ matizar · ❌ corregir.

| Clave (`messages/*.json`) | Texto actual (es) | Estado | Motivo | Acción |
| ------------------------- | ----------------- | ------ | ------ | ------ |
| `Showcase.title` | Seis familias de espectro. Infinitas combinaciones. | ✅ | Hay exactamente 6 familias | Mantener |
| `Showcase.description` | Todas las imágenes… son capturas… Elige una forma y mira cómo cambia la escena. | ⚠️ | Las capturas son reales, pero con ajustes personalizados. Solo cambiar de forma no da ese resultado | Reescribir (ver copy abajo) |
| `Showcase.items.radial` | Barras radiales · Classic | ✅ | Classic + modo radial + `bars` | Mantener |
| `Showcase.items.scope.description` | …capa sobre capa | ⚠️ | "Capa sobre capa" es Frame Memory (ghost frames / afterglow), no el Osciloscopio por defecto | Copy abajo |
| `Showcase.items.tunnel` | Túnel | ✅ | Familia + presets de túnel | Mantener |
| `Showcase.items.liquid` | Líquido · contornos que se deforman con los graves | ✅ | 3 capas líquidas + presets | Mantener |
| `Showcase.items.orbital.description` | Puntos en órbita que se abren con la energía | ⚠️ | Las estelas de la captura salen de Frame Memory (motion trails) | Copy abajo |
| `Showcase.items.spiral` | Espiral de puntos desde el logo | ✅ | Controles de brazos, vueltas y forma de punto | Mantener |
| `Showcase.items.linear.name` | **Cápsulas lineales** / Linear capsules | ❌ | `capsules` es legacy y oculto. La captura muestra el estilo **Bloques** (`blocks`) | Renombrar a "Bloques lineales" / "Linear blocks" |
| `Showcase.items.linear.family` | Classic | ✅ | — | Mantener |
| `Showcase.items.pixel` | Ecualizador LED · Classic · Pixel | ✅ | Forma `pixel` con forma de LED configurable | Mantener |
| `Marquee.items.*` | Barras radiales … Letras de Lyrixa | ✅ | Todo existe | Mantener |
| `Features.items.spectrum.description` | …familias lineales, radiales y pixeladas… | ❌ | Mezcla modos y formas con "familias" | Copy abajo |
| `Editor.description` | Cambia entre modo simple y avanzado… | ✅ | Existe `UIMode` | Mantener |
| `Editor.points.scenes.description` | Agrupa fondo, espectro y movimiento… | ⚠️ | La escena no contiene el fondo; se asigna a él | Copy abajo |
| `Features.items.scenes.description` | Combina imágenes, visualizadores y looks… | ✅ | — | Mantener |
| `Editor.points.obs` / `Features.items.obs` | Modo presentación oculta la interfaz… | ✅ | — | Mantener |
| `Editor.points.local` / `Features.items.privacy` | Análisis en el navegador, nada se sube | ✅ | Solo es cierto si no se usa AI Director (tiene backend). Hoy AI Director no se vende en la web | Mantener. Revisar si algún día se anuncia AI Director |
| `Hero.exportNote` y FAQ de export | Export en pruebas / alpha de desarrollo | ✅ | Sigue en `Unreleased`. La Fase 1C añade capas al export, pero aún no se publica | Mantener |

## Copy propuesto (aplicar en `es.json` y `en.json` a la vez)

```jsonc
// Showcase.description
"es": "Capturas reales de Vibrix reaccionando a una pista. Cada una parte de una familia de espectro con sus ajustes de color, forma y memoria de fotogramas: el punto de partida está a un clic y el resto lo afinas tú.",
"en": "Real Vibrix captures reacting to a track. Each one starts from a spectrum family and adds its own color, shape, and frame-memory settings: the starting point is one click away, and you tune the rest."

// Showcase.items.scope.description
"es": "La forma de onda en tiempo real; con memoria de fotogramas deja ecos capa sobre capa.",
"en": "The waveform in real time; with frame memory it leaves echoes layer over layer."

// Showcase.items.orbital.description
"es": "Puntos en órbita que se abren con la energía de la pista y dejan estela.",
"en": "Orbiting dots that open up with the track’s energy and leave a trail."

// Showcase.items.linear.name
"es": "Bloques lineales",
"en": "Linear blocks"

// Features.items.spectrum.description
"es": "Seis familias de espectro en modo lineal o radial, con barras, bloques, ondas, puntos o celdas LED.",
"en": "Six spectrum families in linear or radial mode, with bars, blocks, waves, dots, or LED cells."

// Editor.points.scenes.description
"es": "Agrupa espectro, looks y movimiento en una escena y asígnala a cada fondo para cambiar de ambiente al instante.",
"en": "Group spectrum, looks, and motion into a scene and assign it to each background to switch the mood instantly."
```

La paridad ES/EN la valida `pnpm test:smoke`. Si cambias el nombre del item
`linear`, revisa también `Showcase.alt`: interpola `{name}`, así que no hace
falta tocarlo.

## Pasos para el agente de vibrix-web

1. Aplicar el copy anterior en `messages/es.json` y `messages/en.json`.
2. Buscar "cápsula" / "capsule" en `src/` y `content/` y sustituirlo por
   "bloques" / "blocks". Revisar también el OG si lo menciona.
3. En `content/legal/assets.md`, registrar la procedencia de **cada** captura
   de `public/media/screens/` con esta plantilla:
   ```md
   - `tunnel.jpg`: captura de Vibrix <versión o commit>, escena demo,
     familia Tunnel radial, preset Túnel "Heavy", Frame Memory "Balanced",
     paleta manual cian/magenta. Pista: demo propia (licencia …).
   ```
   Si no se conoce la receta exacta de una captura, **escribirlo así**
   ("receta no registrada"). Añadir la tarea de regenerarla cuando existan los
   looks del paso 5. No inventar ajustes.
4. (Opcional, sin inventar UI nueva.) Bajo la descripción de cada tarjeta del
   showcase, añadir una línea pequeña tipo "Familia · preset": por ejemplo
   `Tunnel · preset Heavy`, `Classic · Bloques`. Sirve para que el visitante
   pueda buscarlo en el editor. Usar solo presets que existen hoy: Túnel y
   Líquido (Safe/Balanced/Heavy), Frame Memory (Safe/Balanced/Heavy) y los
   estilos del selector.
5. **Dependencia con Vibrix (no es trabajo de la web):** la solución de fondo
   es que Vibrix incluya 8 slots de espectro de fábrica, "Showcase · …", que
   reproduzcan cada captura. Así la web puede decir "a un clic" sin matices y
   las capturas se regeneran desde esos slots. Está anotada como propuesta en
   `LiveWallpaperAnimeGlitch/.agents/TAREAS.md`. Cuando exista, actualizar el
   paso 4 con el nombre del slot y regenerar las capturas (W2 las sustituirá
   por vídeos exportados).
6. Verificar: `pnpm lint`, `pnpm test`, `pnpm build --webpack` (Turbopack falla
   en el sandbox) y `pnpm test:smoke` con el servidor de producción.
7. Actualizar `.agents/TAREAS.md` con el resultado. No hacer commit ni deploy
   salvo que el usuario lo pida.

## Qué NO cambiar

- El número "seis familias": es correcto.
- Los nombres Túnel, Líquido, Orbital, Espiral, Osciloscopio y Ecualizador
  LED: existen tal cual.
- Los claims de export: ya distinguen alpha de desarrollo y versión publicada.
