# Procedencia de assets

Identidad y iconos:

- `public/favicon.ico`: conversión a ICO con imágenes PNG de 16, 32 y 48 px
  de `public/brand/vibrix-logo-192.png`, que ya forma parte del repo. Identidad
  del proyecto Vibrix; no se atribuye una licencia libre no documentada.
- OG de `/es` y `/en`: composición generada con `next/og`, textos de
  `messages/*.json` y el mismo logo oficial. No usa imágenes o audio externos.

## Capturas de `public/media/screens/`

Todas son renders reales de Vibrix con la escena demo (logo oficial, lluvia y
widget Now Playing con la pista de demostración), añadidas en el primer commit
del repo (2026-09-13), en la época de Vibrix `v0.4.1-alpha` (commit
`7efc90cb`). La audit del 2026-09-13
(`.agents/AJUSTES_ALINEACION_VIBRIX.md`) confirmó la familia y el estilo de
cada una; **la receta exacta de ajustes no está registrada** en ninguno de los
casos: ninguna preset de fábrica de Vibrix reproduce el resultado tal cual.

- `radial.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, familia Classic
  en modo radial con estilo Barras. Receta no registrada.
- `scope.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, familia
  Oscilloscope; el efecto capa sobre capa requiere Frame Memory (ghost frames
  / afterglow). Receta no registrada.
- `tunnel.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, familia Tunnel;
  existen presets de Túnel (Safe / Balanced / Heavy) pero no consta cuál se
  usó. Receta no registrada.
- `liquid.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, familia Liquid;
  existen presets de Líquido (Safe / Balanced / Heavy) pero no consta cuál se
  usó. Receta no registrada.
- `orbital.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, familia
  Orbital; las estelas requieren Frame Memory (motion trails). Receta no
  registrada.
- `spiral.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, familia Spiral
  (brazos, vueltas y forma de punto). Receta no registrada.
- `linear.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, familia Classic
  en modo lineal con estilo Bloques. Receta no registrada.
- `pixel.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, familia Classic
  con forma Pixel (celdas tipo LED). Receta no registrada.
- `editor.jpg`: captura del editor de Vibrix (~v0.4.1-alpha) con la pestaña
  Spectrum abierta junto a la escena en vivo.
- `hero.jpg`: captura de Vibrix ~v0.4.1-alpha, escena demo, usada en el hero.
  Receta no registrada.

La pista de demostración es la que Vibrix carga en su escena demo; su licencia
se gestiona en el repo de Vibrix. Cuando Vibrix publique los slots de fábrica
"Showcase · …" propuestos en `.agents/AJUSTES_ALINEACION_VIBRIX.md` (paso 5),
regenerar cada captura desde su slot y actualizar esta tabla con la versión y
el slot exactos (W2 las sustituirá por vídeos exportados).

Otros:

- Features reutiliza `public/media/screens/radial.jpg` y `scope.jpg`, capturas
  ya existentes de Vibrix. No se añaden fotografías, música o ilustraciones.

Pendiente de W4: inventario completo de licencias de fuentes, capturas previas
al cambio y dependencias, junto con las páginas legales públicas.
