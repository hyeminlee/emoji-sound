# Emoji Sound

Standalone emoji-to-sound mapping project with a browser demo.

## Open the Demo
- Local: open `demo.html`
- GitHub Pages: use `index.html` as the default entrypoint

## GitHub Pages
- Recommended setup: `Settings -> Pages -> Deploy from a branch -> main -> /(root)`
- Expected URL: `https://hyeminlee.github.io/emoji-sound/`
- This repo includes `.nojekyll` so the static files can be served directly from the root branch without a Jekyll build.

## What is in this repo
- `emoji-sound-map.js`: emoji-to-effect mapping and synth definitions
- `freesound-catalog.js`: paired Freesound previews and current synth/preview selections
- `demo.html`: main listening demo with synth/Freesound comparison and extra preview candidates
- `demo.js`: demo runtime with effect tuning sliders and playback logic
- `assets/`: optional shipped samples and Freesound preview clips
- `sound-source-manifest.json`: source tracking for imported audio
- `freesound-shortlist.md`: curated Freesound CC0 candidate notes

## Workflow
- Any sound-map update should include a demo update in the same change.
- If `emoji-sound-map.js` changes, review `demo.html` and `demo.js` together.
- If synth/preview pairings change, update `freesound-catalog.js`, `demo.html`, and `demo.js` together.
- If Freesound candidates change, update `demo.html`, `demo.js`, and `sound-source-manifest.json` together.
- If an audio file is added under `assets/`, update `sound-source-manifest.json` in the same change.

## Notes
- `emoji-sound-map.js` exports both `EMOJI_SOUND_PROJECT_MAP` and `TWEETZ_EMOJI_SOUND_MAP` for downstream compatibility.
- If a file like `assets/fs-clap.wav` exists, that effect can use the sample instead of the synth fallback.
- Current sourcing policy: prefer Freesound and only ship assets whose license is `CC0`.
