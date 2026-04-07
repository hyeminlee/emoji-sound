# AGENTS.md

## Cursor Cloud specific instructions

This is a **static HTML + vanilla JavaScript** project with zero build steps, no package manager, no dependencies, and no backend. See `README.md` for full project overview.

### Running the demo locally

Serve the repo root with any static HTTP server, then open `http://localhost:8000`:

```
python3 -m http.server 8000
```

`index.html` redirects to `demo.html`, which is the main demo surface.

A static server is needed (instead of opening `demo.html` via `file://`) because browsers may block local audio asset loading under the `file://` protocol.

### Lint / Tests / Build

- **Lint**: No linter is configured. The project uses plain vanilla JS with no tooling.
- **Tests**: No automated test suite exists. Testing is manual — open `demo.html` in a browser and verify synth + Freesound preview playback. See `CONTRIBUTING.md` § "Local Testing".
- **Build**: No build step. All files are served as-is (static GitHub Pages deployment).

### Key files

| File | Role |
|---|---|
| `emoji-sound-map.js` | Emoji-to-effect mapping and synth definitions |
| `freesound-catalog.js` | Freesound preview pairings and selection state |
| `demo.html` / `demo.js` | Main demo UI and runtime |
| `sound-source-manifest.json` | Audio provenance tracking |
| `assets/freesound-previews/` | Committed CC0 `.mp3` preview clips (~1.1 MB) |

### Caveats

- The Web Audio API requires a user gesture before `AudioContext` can start; the demo handles this automatically on button clicks.
- `Intl.Segmenter` is used for grapheme-accurate emoji extraction — this is supported in modern Chromium and Firefox but may not work in older browsers.
- All Freesound preview clips are committed to the repo under `assets/freesound-previews/`; no network calls to Freesound are made at runtime.
