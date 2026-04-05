# Emoji Sound Assets

Drop shipped audio files for the emoji sound project in this folder.

## Current convention
- Use `fs-<effectId>.wav` for Freesound imports.
- Example: `fs-clap.wav`, `fs-fire.wav`, `fs-party.wav`
- If a matching file exists, that effect can use it instead of the synth fallback.
- Use `freesound-previews/fs-<effectId>-preview.mp3` for short audition files pulled from Freesound preview URLs.
- Use `freesound-previews/fs-<effectId>-alt-<variant>-preview.mp3` for A/B comparison candidates.

## Source policy
- Freesound only, and only when the listed license is `CC0`.
- After importing any file here, update `../sound-source-manifest.json` in the same change.

## Export tips
- Aim for one clean gesture per file, not repeated hits glued together.
- Target roughly `1.0s` to `1.2s`.
- Prefer `wav` for editing and iteration.
- Leave a tiny fade-out at the end so the sample does not click when it stops.
