# First connected build provenance

The imported Evidence Quest design package is user-supplied authority. Its original 307 files are preserved in the initial main commit and enumerated by SHA-256 in `evidence/design-import.json`. The original external files were not edited. The four tile-label CT bindings and dated execution records are the disclosed changes to the repository copy.

Game code, native controls, icons and temporary graphics were produced with Codex assistance for this private project. Temporary art is original programmatic paper/line artwork produced by `scripts/generate-temp-assets.py` with Pillow 12.3.0, following the asset manifest's Q01 methods. It was not extracted from a rendered room screenshot. All 58 raster assets have individual variants, density exports and SHA-256 records in `content/temp-assets.json`. The 32 native definitions and 13 icons are recorded in `evidence/native-assets.json`. Their use does not assert final illustration quality.

The current Item 08 cast and five rich illustrations remain the final visual authority, including the current white Jo. The older cast is not reinstated. Existing imported visual provenance remains under `docs/design/evidence-quest-design-v3/08-visual-designs/PROVENANCE.md`.

Runtime packages are React/react-dom 19.2.7 and Ajv 8.18.0; development/build packages and exact transitive versions are in `package-lock.json`. Their package license files remain in the clean installation, and Vite emits its bundled dependency license record at `dist/client/.vite/license.md`. No third-party font, stock art, music or sound recording is downloaded into the game. The interface uses device fonts; optional audio remains unproduced.

Node 24.21.0 came from the official Windows x64 distribution and was SHA-256 checked; see `SETUP-DECISIONS.md`. Its installation and caches remain local and ignored. The source repository grants no new public license to the game or supplied design.

Browser fixtures use authored mode with zero model calls. The explicit development transport returns scripted selections solely to test lifecycle failures; it has a visible development label and is excluded from the production bundle. Synthetic READY saves and injected storage/artwork failures are labeled in test source and evidence. No synthetic trial is participant evidence or a live interpretation result.
