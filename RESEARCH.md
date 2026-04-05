# Research Notes

This project uses a research-backed design direction rather than trying to imitate a nonexistent emoji-to-sound standard database.

## Key Sources

### 1. Emoji affect can be modeled numerically
- Emoji-Dis (2025): 112 face emojis rated across 13 discrete emotions  
  Source: https://www.nature.com/articles/s41597-025-05682-6
- Emoji-SP (2023 issue; paper accepted 2022): 1031 emojis rated for valence, arousal, familiarity, clarity, complexity, and usage  
  Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC10250465/

### 2. Non-speech UI sound design already has strong HCI foundations
- Earcons and Icons: Their Structure and Common Design Principles (1989)  
  Source: https://www.tandfonline.com/doi/abs/10.1207/s15327051hci0401_1
- Auditory Icons: Using Sound in Computer Interfaces (1986)  
  Source: https://www.tandfonline.com/doi/abs/10.1207/s15327051hci0202_3
- The SonicFinder: An Interface That Uses Auditory Icons (1989)  
  Source: https://www.tandfonline.com/doi/abs/10.1207/s15327051hci0401_3

### 3. Emoji sonification also has accessibility relevance
- Emotion Sonification As Opportunity For Inclusive Texting: Replacing Emoji With Vocal Bursts And Prosodic Voices (NordiCHI 2024)  
  DOI: https://doi.org/10.1145/3679318.3685403  
  Bibliographic index: https://dblp.org/rec/conf/nordichi/HuberS24

### 4. Audio control matters
- W3C Understanding SC 1.4.2 Audio Control  
  Source: https://www.w3.org/WAI/WCAG21/Understanding/audio-control

## Design Translation

This repository currently uses four broad rules:

1. Higher arousal tends to become faster attack, more motion, and more rhythmic energy.
2. Higher valence tends to become brighter, lighter, and slightly higher in pitch.
3. Face and emotion emojis lean toward earcons or vocal-like abstract gestures.
4. Object and event emojis lean toward auditory icons or short stylized sound effects.

## Current Implementation Direction

- `effectProfiles` in `emoji-sound-map.js` store a lightweight emotional design profile for each effect.
- Demo cards surface family, design mode, and coarse valence/arousal/brightness labels.
- Coverage is expanding by emotional family and semantic category, with the long-term target of all emoji.
- The current expansion phase specifically grows food, animals, weather/night, transport, and object-tech domains so the system can move beyond reaction-heavy emoji.

## Important Product Constraint

Research and accessibility guidance both suggest that emoji sound should stay lightweight:
- short
- interruptible
- lower priority than speech
- user-controllable

That is why the current demo favors one short gesture per emoji family instead of long literal Foley clips by default.
