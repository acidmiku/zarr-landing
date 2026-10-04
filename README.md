# Zarr landing

Local review URL: http://127.0.0.1:4173/

Run `npm run dev` from this directory. The dependency-free Node server serves `dist/` and supports MP4 byte ranges. `npm run check` checks JavaScript syntax.

Production URL: https://zarr.iridescence.tech/

GitHub repository: https://github.com/acidmiku/zarr-landing

GitHub Pages publishes `dist/` on every push to `main`, using `.github/workflows/pages.yml`. The custom domain is configured in the repository's Pages settings. Cloudflare holds a DNS-only CNAME from `zarr.iridescence.tech` to `acidmiku.github.io`; GitHub Pages supplies HTTPS. No Cloudflare credential is needed by the site or deployment workflow.

Editable source:

- `dist/index.html`: content and sections
- `dist/style.css`: layout, responsive design, and CSS motion
- `dist/app.js`: gallery, screenshot viewer, copy commands, pause control, and scroll reveals

Motion is enabled by default, as requested. The pause control freezes CSS animation and replaces the silent video with a still frame. Videos pause in hidden tabs.

## Product imagery

All product screenshots are real captures of the running service at http://127.0.0.1:9876/:

- `collection.jpg`: `/library`, with four actual titles added for capture
- `discover.jpg`: live movie discovery
- `anime.jpg`: live Ghost in the Shell search
- `assistant-covers.png`: user-supplied live screenshot of the current cult-film recommendation conversation, with covers verified in the running service (session 5)

No fixture screenshots from Zarr's docs are used. The quality settings screenshot was removed from both the gallery and feature section at the user's request. Poster artwork was collected from the live service's image proxy. Fonts and the favicon reuse Zarr's own brand assets.

Capture additions: Blade Runner 2049, Dune: Part Two, Ghost in the Shell, Serial Experiments Lain. Two assistant conversations were created for screenshots. An unsolicited rating created by the assistant during capture was removed. No connection settings or quality profiles were saved.

The abstract silent hero loop and poster are generated motion assets, with no product UI. Their editable HyperFrames source is kept locally in the sibling `motion/index.html` project; the rendered assets are included in this repository. Render: 1600×900, 8 seconds, 30fps, H.264.

Verified: 320px/390px mobile and desktop layout, gallery switching and image expansion, installation-command copying, pause/resume, video loading and byte ranges, and local asset references.
