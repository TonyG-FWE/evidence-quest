# Production toolchain correction — September 12, 2026

The later parent rules review identified incompatible incorporated components under the entry's express copyleft/reciprocal-component exclusion. This required a narrow, documented correction to the initial tool pins; the original packet and earlier checkpoints remain historical evidence.

- Removed sharp 0.35.4 and its Windows binary package, whose actual declared license included LGPL-3.0-or-later.
- Replaced the image exporter with pngjs 7.0.0 (MIT), @jsquash/webp 1.5.0 (Apache-2.0, bundled libwebp BSD-3-Clause), and its locked wasm-feature-detect 1.9.0 dependency (Apache-2.0). Actual package/codec license texts are retained in [notices](licenses/production-image-tools.md).
- The broader scan found that initial Vite 8.0.16 required lightningcss 1.33.0 (MPL-2.0). Vite was corrected to 7.3.6 and @vitejs/plugin-react to 5.2.0. Both use the existing configuration/API; explicit PostCSS transformation and esbuild CSS minification avoid Lightning CSS. No fabricated package stub or license reclassification is used.
- Node 24.21.0, React 19.2.7, TypeScript 5.9.3, contracts and game behavior remain as previously specified. Exact installed versions and the complete lockfile license graph are in [the evidence](../evidence/er13/production-tool-licenses.json).

Every source PNG remains byte-identical. Derivatives use the exact accepted crop, no enlargement, premultiplied Lanczos3 reduction, 4/8-pixel transparent padding, and lossless PNG. Every frame also has lossless WebP with the same-pixel PNG fallback. Hash-verified cached derivatives are reused. Obsolete hashed derivatives are removed only from the verified dedicated public/art/runtime directory.

Checks cover exact solid colors, transparent matte edge isolation, bounds/no-upscale rejection, padding, PNG roundtrip, deterministic WebP and decoded RGBA equality for every exported pair. Runtime measurements are separate from these codec checks. The license declaration scan is also separate from the zero-vulnerability dependency audit.

Primary documentation: [pngjs](https://github.com/pngjs/pngjs), [jSquash WebP](https://github.com/jamsinclair/jSquash/tree/main/packages/webp), [Vite7 CSS and license output](https://v7.vite.dev/guide/features.html). The parent cited [official entry terms §7.6](https://hackathon.nerdy.com/terms); this records the technical remediation, not a submission or legal qualification claim.
