# sonny-gen

A fully **client-side** avatar customizer and generator for collectible figurines. Load or
generate a 3D figure, rotate it, recolour it, add accessories, pick a background, and export
the result as an image, a 3D model, or a shareable preset — all in the browser, no backend.

**Live demo:** <https://ctrl-research.github.io/sonny-gen/> (deployed from `main` via GitHub Actions)

## Features

- **Procedural base figure** — an original Sonny Angel–style figure generated from geometry,
  so the app works with zero assets. (Not modelled on any copyrighted likeness.)
- **Bring your own model** — drag-and-drop a `.glb` / `.gltf` to customize your own figures.
- **Colour customization** — editable colour groups (body, blush, eyes, accents).
- **3D accessories** — swappable headgear (party hat, animal hood, fruit cap, halo) and wings.
- **Rotation & orbit** — orbit the camera (with optional auto-rotate) plus explicit X/Y/Z
  figure rotation sliders.
- **Backgrounds** — solid and gradient presets, lit by an offline (no-CDN) reflection rig.
- **Exports**
  - Flattened **PNG** (with the background)
  - **Transparent PNG** (figure only)
  - **3D model** as binary **GLB**
  - **JSON preset** — save/load a full look (also a portable, shareable file)

## Tech stack

React + [react-three-fiber](https://github.com/pmndrs/react-three-fiber) +
[drei](https://github.com/pmndrs/drei) on Vite/TypeScript, with
[zustand](https://github.com/pmndrs/zustand) as the single source of truth. The store's state
is exactly the serializable preset, so UI, 3D scene, and export/import all stay in sync.

## Development

```bash
npm install
npm run dev        # start the dev server
npm run build      # typecheck + production build to dist/
npm run preview    # preview the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # vitest
```

The production build in `dist/` is fully static and can be hosted anywhere (e.g. GitHub Pages);
`vite.config.ts` uses a relative `base` so it works from a subpath.

## Project structure

```
src/
  state/        # zustand store + presets (colour groups, accessories, backgrounds)
  scene/        # R3F scene: Stage, procedural Figure, accessories, Background, GLB loader
  components/   # sidebar UI panels (model, colours, accessories, background, rotation, export)
  loaders/      # GLB/GLTF file loader hook
  export/       # PNG, GLB, and JSON preset export/import
  types.ts      # shared domain types (incl. the serializable CustomizerConfig)
```

## Roadmap / not yet included

- Real, rigged/posed source models and pose controls
- Turntable GIF/WebM and printable card/sticker-sheet exports
- URL-hash preset sharing
- Per-mesh texture / decal painting
