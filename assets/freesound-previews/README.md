# Freesound Preview Assets

These files are short preview clips used only for local audition demos.

## Purpose
- Compare Freesound candidates quickly before importing a final shipped `wav`.
- Keep preview assets separate from final effect files.

## Naming
- `fs-rocket-preview.mp3`
- `fs-zap-preview.mp3`
- `fs-buzz-preview.mp3`
- `fs-rocket-alt-soft-preview.mp3`
- `fs-zap-alt-popclick-preview.mp3`
- `fs-buzz-alt-failhorn-preview.mp3`

## Variant convention
- Use `fs-<effectId>-preview.mp3` for the current baseline audition.
- Use `fs-<effectId>-alt-<variant>-preview.mp3` when comparing multiple Freesound candidates for the same effect.

## Rule
- If a preview file is added here, update `../sound-source-manifest.json` in the same change.
