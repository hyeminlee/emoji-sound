# Contributing

Thanks for contributing to Emoji Sound.

## Project Shape
- `emoji-sound-map.js` is the source of truth for emoji-to-effect mapping and synth behavior.
- `freesound-catalog.js` is the source of truth for paired Freesound previews and current selection state.
- `demo.html` and `demo.js` are the default verification surface for every change.
- `sound-source-manifest.json` tracks imported audio provenance.

## Contribution Rules
- Keep demo updates in the same change as sound-map updates.
- Do not introduce a second demo surface unless there is a strong reason.
- If you add or swap Freesound assets, use `CC0` only.
- Record every imported asset in `sound-source-manifest.json` with URL, username, and license.
- Prefer one clean gesture per effect instead of repeated short hits glued together.
- Aim for short, playful sounds that do not overpower TTS playback.

## Local Testing
- Open `demo.html` directly in a browser for quick listening tests.
- If a browser blocks some local asset behavior, serve the repo with a simple static server and open `index.html`.
- Check both synth playback and Freesound preview playback before sending a change.

## Pull Request Checklist
- Update `demo.html` or `demo.js` when behavior changes.
- Update `README.md` and `README.ko.md` if the public workflow changes.
- Update `sound-source-manifest.json` when audio sources change.
- Keep source files ASCII by default unless there is a clear reason not to.

## Style Notes
- Keep names descriptive but short.
- Favor maintainable mapping data over clever abstractions.
- When unsure, optimize for demo clarity and easy listening comparisons.
