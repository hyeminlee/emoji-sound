# Freesound CC0 Shortlist

Reviewed on `2026-04-05`.

## Policy
- Use Freesound assets only when the sound page clearly shows `Creative Commons 0`.
- Prefer short, trim-friendly sounds with a clean transient and little background noise.
- Prefer designed/cartoon/UI-style sounds over realistic ambience or long natural recordings.
- For short-form social video beats, bias toward `whoosh`, `pop`, `click`, `fail stinger`, and `retro UI error` over literal real-world recordings.
- Keep source clips under `3s` when possible, and favor sounds that can sit below TTS after conservative gain trim.
- When importing a chosen file, update `sound-source-manifest.json` in the same change.

## Phase 1 Picks

### `fs-clap.wav`
- Primary: [Single clap](https://freesound.org/people/randbsoundbites/sounds/789991/)
  - Why: already a single clap, mono, CC0, easy to trim into a punchy one-shot.
  - Notes: starts a bit quiet because the author boosted the whole clip. Trim to the loudest clap and keep a short tail.
- Alternate: [Clap.wav](https://freesound.org/people/POKLU/sounds/443249/)
  - Why: tiny file, very short single clap, strong transient.
  - Notes: more clicky and synthetic-feeling than the primary.
- Alternate: [Short applause.wav](https://freesound.org/people/johntrap/sounds/529455/)
  - Why: if we want `👏` to feel like a mini crowd response instead of one handclap.

### `fs-fire.wav`
- Primary: [Short-Fireball-Woosh.flac](https://freesound.org/people/wjl/sounds/267887/)
  - Why: already designed for game SFX, `1.194s`, CC0, and much more “effect” than natural fire ambience.
- Alternate: [Basic Fire whoosh](https://freesound.org/people/LookIMadeAThing/sounds/260554/)
  - Why: CC0, explicitly sound-designed, flamethrower-ish, and fun without sounding like a campfire field recording.
- Alternate: [Whoosh Short](https://freesound.org/people/FartCTO/sounds/789840/)
  - Why: if `🔥` should feel more like a hot take swipe than literal flame.

### `fs-party.wav`
- Primary: [Party horn.wav](https://freesound.org/people/audiosmedia/sounds/170583/)
  - Why: `1.784s`, CC0, instantly funny, and more “celebration SFX” than literal explosion.
- Alternate: [partypopper.flac](https://freesound.org/people/Streety/sounds/26349/)
  - Why: still fun, but a bit more air-burst and less characterful than the horn.
- Alternate: [Fail Jingle Party Horn](https://freesound.org/people/qubodup/sounds/825292/)
  - Why: very cartoony and funny if we ever want a jokier `🎉` or special fail-state variant.

### `fs-heart.wav`
- Primary: [Cartoon Pop (Clean)](https://freesound.org/people/unfa/sounds/245645/)
  - Why: CC0, tiny, cute, and already feels like a designed “love pop” rather than a medical heartbeat.
- Alternate: [Cartoon Pop (Distorted)](https://freesound.org/people/unfa/sounds/245646/)
  - Why: slightly more character and crunch if the clean pop feels too plain.
- Alternate: [Human Heartbeat (60 BPM)](https://freesound.org/people/FenrirFangs/sounds/213181/)
  - Why: only if we decide `❤️` should lean emotional instead of playful.

### `fs-laugh.wav`
- Primary: [Cartoon laugh](https://freesound.org/people/NightDrawr/sounds/792953/)
  - Why: `0.942s`, CC0, concise, and already in the right “funny effect” zone.
- Alternate: [Wholesome Genuine Laugh (male)](https://freesound.org/people/JotrainG/sounds/720133/)
  - Why: warmer and more human if the cartoon laugh feels too fake.
- Alternate: [Dumb Laughing](https://freesound.org/people/bowlingballout/sounds/812833/)
  - Why: funnier and stupider if we want a stronger meme read.
  - Notes: trim aggressively because the source is much longer than we need.

## Phase 2 Picks

### `fs-blast.wav`
- Primary: [Retro Small Bomb Explosion](https://freesound.org/people/modusmogulus/sounds/792520/)
  - Why: compact, already cartoon-leaning, and softer than realistic explosion assets.
- Alternate: [Cartoon Explosion (designed on cassette tape lol)](https://freesound.org/people/modusmogulus/sounds/784205/)
  - Why: warmer and less speaker-tearing than many blast sounds.
- Alternate: [Crispy Nuclear Bomb Sound Cartoon CC0](https://freesound.org/people/modusmogulus/sounds/745138/)
  - Why: extremely cartoony and funny if we want to mine a tiny chunk rather than use the full file.

### `fs-buzz.wav`
- Primary: [Pop.ogg](https://freesound.org/people/egomassive/sounds/536772/)
  - Why: current project pick for `❌`; short, soft, and playful without turning into a harsh buzzer.
- Alternate: [Fail Jingle Party Horn](https://freesound.org/people/qubodup/sounds/825292/)
  - Why: still the funniest fail sting if we later want `❌` to lean more obviously comedic.
- Alternate: [Error Sound [Retro Video Game SFX]](https://freesound.org/people/KorGround/sounds/344687/)
  - Why: classic retro UI fail tone if the pop choice feels too cute.
- Alternate: [Short Censor Beep](https://freesound.org/people/prueslove/sounds/586975/)
  - Why: safest low-impact fallback when the more playful variants feel too characterful.

### `fs-rocket.wav`
- Current project choice: `synth`
  - Why: after direct comparison, the built-in synth still fits `🚀` better than the imported preview candidates.
- Primary Freesound fallback: [Whoosh Short](https://freesound.org/people/FartCTO/sounds/789840/)
  - Why: if we later want a shipped sample, this is still the cleanest short-form transition candidate.
- Alternate: [Swooshes, whoosh, short, deep](https://freesound.org/people/susssounds/sounds/752068/)
  - Why: deeper transition option when the primary feels too light.
- Alternate: [Short Woosh 01.wav](https://freesound.org/people/ironcross32/sounds/582892/)
  - Why: still a good baseline and a touch more neutral than the new picks.

### `fs-zap.wav`
- Primary: [Zap.wav](https://freesound.org/people/TRNGLE/sounds/367960/)
  - Why: current project pick for `⚡`; 존재감이 있으면서도 여전히 effect답게 잘 들립니다.
- Alternate: [Pop Click](https://freesound.org/people/GameAudio/sounds/220175/)
  - Why: UI 포인트감이 좋지만 현재 선택보다 조금 더 가볍습니다.
- Alternate: [Pop.ogg](https://freesound.org/people/egomassive/sounds/536772/)
  - Why: 아주 둥글고 안전한 쪽이라 `⚡`보다는 현재 `❌` 후보로 더 잘 맞았습니다.

### `fs-sob.wav`
- Primary: [Whimper_Gasp_1_Female](https://freesound.org/people/Drkvixn91/sounds/318078/)
  - Why: CC0-confirmed, under 1 second, and expressive without becoming melodramatic.
- Alternate: [baby cry short](https://freesound.org/people/aniovino/sounds/571420/)
  - Why: funny-sad option if we want `😭` to skew memeier instead of realistic.
- Alternate: [Gasp!](https://freesound.org/people/ZerOcarina/sounds/232263/)
  - Why: good fallback if we decide `😭` should be a social reaction more than a literal cry.

## Phase 3 Picks

### `fs-snack.wav`
- Primary: [Crunch.wav](https://freesound.org/people/LilMati/sounds/348112/)
  - Why: very short, already framed as a game/reward crunch, and much more playful than literal chewing Foley.

### `fs-sweet.wav`
- Primary: [Pop 9](https://freesound.org/people/D.S.G./sounds/328119/)
  - Why: tiny candy-pop energy that works well for desserts and sweet treats without sounding sticky or realistic.

### `fs-drink.wav`
- Primary: [sipping.wav](https://freesound.org/people/Reitanna/sounds/252275/)
  - Why: short sip gesture that reads instantly in the demo and stays softer than speech.

### `fs-paw.wav`
- Primary: [12_DogPaw_Scratch_Rocks](https://freesound.org/people/16G_Panska_Dolezal_Stepan/sounds/498693/)
  - Why: gives `🐶` and related animals a small tactile cue without becoming a full bark or long ambience.

### `fs-marine.wav`
- Primary: [Bubble sequence](https://freesound.org/people/PhonosUPF/sounds/487642/)
  - Why: already processed and musical enough to feel like an effect, not just raw underwater ambience.

### `fs-bug.wav`
- Primary: [Bees buzzing](https://freesound.org/people/smand/sounds/521116/)
  - Why: has enough insect identity to read immediately, but still trims down into a light buzzing bed.

### `fs-chirp.wav`
- Primary: [Birds Chirping](https://freesound.org/people/EdEddnEddie/sounds/844621/)
  - Why: a simple outdoor chirp cue that works for `🐣`-type emoji once shortened.

### `fs-moon.wav`
- Primary: [wind chimes - single 04.wav](https://freesound.org/people/Anthousai/sounds/398496/)
  - Why: reads like a quiet night bell rather than a bright ritual chime, which suits the moon group better.

### `fs-vehicle.wav`
- Primary: [car43.wav](https://freesound.org/people/car_sound/sounds/660051/)
  - Why: gives transport emoji a clear pass-by reference point while the synth remains the safer default.

### `fs-tool.wav`
- Primary: [click 5.mp3](https://freesound.org/people/SomeoneCool15/sounds/423774/)
  - Why: concise click with enough object feel to stand in for tools, switches, and mechanical interactions.

### `fs-money.wav`
- Primary: [CoinDrop8.wav](https://freesound.org/people/NickMorris/sounds/184744/)
  - Why: a very readable coin cue that is short enough to stay in the emoji-SFX zone.

### `fs-tech.wav`
- Primary: [as_ab_al_computer_noise_9_16bit.wav](https://freesound.org/people/Clusman/sounds/543054/)
  - Why: tiny digital beep that fits screens, batteries, phones, and gadget emoji without overpowering TTS.

### `fs-warning.wav`
- Primary: [Beep warning](https://freesound.org/people/SamsterBirdies/sounds/467882/)
  - Why: one of the clearest direct matches in the whole batch, and already framed as a warning sound by the uploader.

### `fs-lock.wav`
- Primary: [door wood old open close creak rattle lock click.flac](https://freesound.org/people/kyles/sounds/455753/)
  - Why: the source is long, but the opening click trims into a useful mechanical lock cue.

### `fs-gift.wav`
- Primary: [Paper, crumple, rip, unwrap gift.mp3](https://freesound.org/people/JohnsonBrandEditing/sounds/173939/)
  - Why: direct semantic match for presents and packaging, and still playful enough when shortened.

## Phase 4 Picks

### `fs-cheer.wav`
- Primary: [Crowd Cheer 5](https://freesound.org/people/Krizin/sounds/651646/)
  - Why: `🙌 🥳 🎊` 계열에 잘 맞는 짧은 crowd lift이고, trim 후에도 TTS보다 과하게 튀지 않습니다.

### `fs-gloom.wav`
- Primary: [Sad Chime Effect](https://freesound.org/people/zembacraftworks/sounds/455289/)
  - Why: 실제 울음소리보다 추상적인 downbeat chime이라 `😔 ☹️` 쪽에 더 안전하고, effect스럽게 들립니다.

### `fs-anger.wav`
- Primary: [Retro, Angry Neighbor Knocking Your Door Lol.wav](https://freesound.org/people/LilMati/sounds/658269/)
  - Why: 과한 distortion 없이도 화난 리듬감이 있고, `😤 😡` 쪽에 cartoony impact로 잘 읽힙니다.

### `fs-shock.wav`
- Primary: [Metal Gear Solid Inspired Alert Surprise SFX](https://freesound.org/people/djlprojects/sounds/413641/)
  - Why: 너무 시끄러운 scream 계열 대신, 짧고 즉시 읽히는 surprise alert라 `😮 😱` 비교용으로 적합합니다.

### `fs-bloom.wav`
- Primary: [Bell ding 1.wav](https://freesound.org/people/5ro4/sounds/611113/)
  - Why: 꽃 그룹은 자연음을 억지로 넣는 것보다 밝은 bell bloom이 더 완성도가 높아서 sparkle 소스를 재사용했습니다.

### `fs-leaf.wav`
- Primary: [rustling leaves 08.mp3](https://freesound.org/people/TRP/sounds/575223/)
  - Why: 원본은 길지만 앞부분을 짧게 자르면 `🍃 🌿`에 맞는 가벼운 rustle cue로 잘 작동합니다.

### `fs-sun.wav`
- Primary: [morning bell.wav](https://freesound.org/people/barkenov/sounds/251232/)
  - Why: 자연 새소리보다 더 추상적이고, `☀️ 🌞`에 필요한 밝은 시작감이 분명합니다.

### `fs-storm.wav`
- Primary: [thunder.rumble.ogg](https://freesound.org/people/xUMR/sounds/486557/)
  - Why: thunder의 질감은 남기면서도 길이를 줄여서 `⛈️ 🌩️`에 붙는 low rumble gesture로 만들기 좋았습니다.

## Import Tips
- Convert everything to `wav` before shipping, even if the Freesound source is `mp3`, `flac`, or `ogg`.
- Trim to roughly `1.0s` to `1.2s`.
- Leave a tiny fade-in and fade-out to avoid clicks.
- Normalize conservatively; avoid maximizing transient-heavy files like party poppers and zaps.
