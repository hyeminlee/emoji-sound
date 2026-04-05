# Emoji Sound

[![Live Demo](https://img.shields.io/badge/demo-live-d96f3b?style=flat-square)](https://hyeminlee.github.io/emoji-sound/)
![Emoji Count](https://img.shields.io/badge/emoji-280-4c8bf5?style=flat-square)
![Effect Count](https://img.shields.io/badge/effects-41-2f9e72?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-111111?style=flat-square)

[English](./README.md) | [한국어](./README.ko.md)

Standalone emoji-to-sound mapping project with a browser demo.

This version expands the map to 280 emoji entries and 41 effect groups, and adds research-backed effect profiles for future full-emoji coverage.

![Emoji Sound Demo Preview](./assets/demo-preview.svg)

## Open the Demo
- Live demo: [https://hyeminlee.github.io/emoji-sound/](https://hyeminlee.github.io/emoji-sound/)
- Local: open `demo.html`
- GitHub Pages: use `index.html` as the default entrypoint

## Docs
- Contribution guide: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Credits: [CREDITS.md](./CREDITS.md)
- License: [LICENSE](./LICENSE)
- Research notes: [RESEARCH.md](./RESEARCH.md)

## GitHub Pages
- This repo is prepared for root-level static publishing.
- Default entrypoint is `index.html`, which redirects to `demo.html`.
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
