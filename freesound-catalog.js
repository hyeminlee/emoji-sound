(() => {
  function freezePreviews(previews) {
    return Object.freeze(previews.map((preview) => Object.freeze({ ...preview })));
  }

  const effectCatalog = Object.freeze({
    sparkle: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "sparkle-core",
      previews: freezePreviews([
        {
          id: "sparkle-core",
          title: "Bell ding 1.wav",
          subtitle: "5ro4 · CC0 · bright ping",
          previewPath: "assets/freesound-previews/fs-sparkle-preview.mp3",
          sourceUrl: "https://freesound.org/people/5ro4/sounds/611113/",
          note: "짧고 반짝이는 벨 톤이라 `✨` 계열 preview로 바로 쓰기 좋습니다.",
        },
      ]),
    }),
    laugh: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "laugh-core",
      previews: freezePreviews([
        {
          id: "laugh-core",
          title: "Cartoon laugh",
          subtitle: "NightDrawr · CC0",
          previewPath: "assets/freesound-previews/fs-laugh-preview.mp3",
          sourceUrl: "https://freesound.org/people/NightDrawr/sounds/792953/",
          note: "짧고 바로 웃긴 톤이라 `😂` 대표 preview로 쓰기 좋습니다.",
        },
      ]),
    }),
    clap: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "clap-core",
      previews: freezePreviews([
        {
          id: "clap-core",
          title: "Single clap",
          subtitle: "randbsoundbites · CC0",
          previewPath: "assets/freesound-previews/fs-clap-preview.mp3",
          sourceUrl: "https://freesound.org/people/randbsoundbites/sounds/789991/",
          note: "합성 clap보다 실제 손맛이 있어 `👏` 확인용으로 좋습니다.",
        },
      ]),
    }),
    fire: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "fire-core",
      previews: freezePreviews([
        {
          id: "fire-core",
          title: "Short-Fireball-Woosh.flac",
          subtitle: "wjl · CC0",
          previewPath: "assets/freesound-previews/fs-fire-preview.mp3",
          sourceUrl: "https://freesound.org/people/wjl/sounds/267887/",
          note: "자연 화염보다 designed whoosh에 가까워 `🔥` 밈 톤에 더 맞습니다.",
        },
      ]),
    }),
    heart: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "heart-core",
      previews: freezePreviews([
        {
          id: "heart-core",
          title: "Cartoon Pop (Clean)",
          subtitle: "unfa · CC0",
          previewPath: "assets/freesound-previews/fs-heart-preview.mp3",
          sourceUrl: "https://freesound.org/people/unfa/sounds/245645/",
          note: "의학적 heartbeat보다 훨씬 가볍고 귀여운 `❤️` 방향입니다.",
        },
      ]),
    }),
    party: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "party-core",
      previews: freezePreviews([
        {
          id: "party-core",
          title: "Party horn.wav",
          subtitle: "audiosmedia · CC0",
          previewPath: "assets/freesound-previews/fs-party-preview.mp3",
          sourceUrl: "https://freesound.org/people/audiosmedia/sounds/170583/",
          note: "짧은 celebratory hit로 `🎉`의 캐릭터가 바로 살아납니다.",
        },
      ]),
    }),
    smile: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "smile-core",
      previews: freezePreviews([
        {
          id: "smile-core",
          title: "Notification",
          subtitle: "Fupicat · CC0 · tiny mood lift",
          previewPath: "assets/freesound-previews/fs-smile-preview.mp3",
          sourceUrl: "https://freesound.org/people/Fupicat/sounds/538149/",
          note: "`😊` 계열에 어울리는 짧은 기분 좋은 UI 톤입니다.",
        },
      ]),
    }),
    pleading: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "pleading-core",
      previews: freezePreviews([
        {
          id: "pleading-core",
          title: "Soft-Notifications - Bell - Ding-Dong.mp3",
          subtitle: "LegitCheese · CC0 · cute plea",
          previewPath: "assets/freesound-previews/fs-pleading-preview.mp3",
          sourceUrl: "https://freesound.org/people/LegitCheese/sounds/571513/",
          note: "`🥺`에 과하지 않은 부탁 톤을 주는 작은 벨 계열입니다.",
        },
      ]),
    }),
    kiss: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "kiss-core",
      previews: freezePreviews([
        {
          id: "kiss-core",
          title: "Short kiss",
          subtitle: "Vospi · CC0 · tiny smooch",
          previewPath: "assets/freesound-previews/fs-kiss-preview.mp3",
          sourceUrl: "https://freesound.org/people/Vospi/sounds/344209/",
          note: "짧고 장난스러운 `😘` 계열 포인트로 좋습니다.",
        },
      ]),
    }),
    thumbs: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "thumbs-core",
      previews: freezePreviews([
        {
          id: "thumbs-core",
          title: "Short Beep 03.wav",
          subtitle: "ironcross32 · CC0 · quick approval",
          previewPath: "assets/freesound-previews/fs-thumbs-preview.mp3",
          sourceUrl: "https://freesound.org/people/ironcross32/sounds/582696/",
          note: "`👍` 계열에 가볍게 찍히는 승인 비프 톤입니다.",
        },
      ]),
    }),
    heartbreak: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "heartbreak-core",
      previews: freezePreviews([
        {
          id: "heartbreak-core",
          title: "Ice Crack 3.wav",
          subtitle: "ecfike · CC0 · cold snap",
          previewPath: "assets/freesound-previews/fs-heartbreak-preview.mp3",
          sourceUrl: "https://freesound.org/people/ecfike/sounds/177211/",
          note: "`💔`에 맞는 차갑고 짧은 갈라짐 포인트입니다.",
        },
      ]),
    }),
    sideeye: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "sideeye-core",
      previews: freezePreviews([
        {
          id: "sideeye-core",
          title: "Sad Synth",
          subtitle: "Fupicat · CC0 · dry side glance",
          previewPath: "assets/freesound-previews/fs-sideeye-preview.mp3",
          sourceUrl: "https://freesound.org/people/Fupicat/sounds/538150/",
          note: "`🙄` 계열의 시큰둥한 반응에 잘 맞는 짧은 하강 톤입니다.",
        },
      ]),
    }),
    meltdown: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "meltdown-core",
      previews: freezePreviews([
        {
          id: "meltdown-core",
          title: "Electric Failure - High Voltage Power Down #2 ATP2",
          subtitle: "ATP2-kh · CC0 · dramatic drop",
          previewPath: "assets/freesound-previews/fs-meltdown-preview.mp3",
          sourceUrl: "https://freesound.org/people/ATP2-kh/sounds/844244/",
          note: "`😩` 계열에 어울리는 망했다 느낌의 짧은 파워다운입니다.",
        },
      ]),
    }),
    rocket: Object.freeze({
      selectedSource: "synth",
      preferredPreviewId: "rocket-soft",
      previews: freezePreviews([
        {
          id: "rocket-soft",
          title: "Whoosh Short",
          subtitle: "FartCTO · CC0 · soft transition",
          previewPath: "assets/freesound-previews/fs-rocket-alt-soft-preview.mp3",
          sourceUrl: "https://freesound.org/people/FartCTO/sounds/789840/",
          note: "현재는 synth가 최종 선택이지만, paired Freesound 비교 후보로 유지합니다.",
        },
        {
          id: "rocket-deep",
          title: "Swooshes, whoosh, short, deep",
          subtitle: "susssounds · CC0 · deeper motion",
          previewPath: "assets/freesound-previews/fs-rocket-alt-deep-preview.mp3",
          sourceUrl: "https://freesound.org/people/susssounds/sounds/752068/",
          note: "더 깊은 transition 대체안입니다.",
        },
        {
          id: "rocket-current",
          title: "Short Woosh 01.wav",
          subtitle: "ironcross32 · CC0 · current baseline",
          previewPath: "assets/freesound-previews/fs-rocket-preview.mp3",
          sourceUrl: "https://freesound.org/people/ironcross32/sounds/582892/",
          note: "기존 baseline preview입니다.",
        },
      ]),
    }),
    zap: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "zap-current",
      previews: freezePreviews([
        {
          id: "zap-current",
          title: "Zap.wav",
          subtitle: "TRNGLE · CC0 · current pick",
          previewPath: "assets/freesound-previews/fs-zap-preview.mp3",
          sourceUrl: "https://freesound.org/people/TRNGLE/sounds/367960/",
          note: "현재 `⚡` 최종 선택입니다.",
        },
        {
          id: "zap-popclick",
          title: "Pop Click",
          subtitle: "GameAudio · CC0 · UI pop",
          previewPath: "assets/freesound-previews/fs-zap-alt-popclick-preview.mp3",
          sourceUrl: "https://freesound.org/people/GameAudio/sounds/220175/",
          note: "더 가벼운 UI 포인트 대체안입니다.",
        },
        {
          id: "zap-pop",
          title: "Pop.ogg",
          subtitle: "egomassive · CC0 · soft alt",
          previewPath: "assets/freesound-previews/fs-zap-alt-pop-preview.mp3",
          sourceUrl: "https://freesound.org/people/egomassive/sounds/536772/",
          note: "아주 둥글고 안전한 팝 계열 대체안입니다.",
        },
      ]),
    }),
    sob: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "sob-core",
      previews: freezePreviews([
        {
          id: "sob-core",
          title: "Gasp!",
          subtitle: "ZerOcarina · CC0 · mini cry",
          previewPath: "assets/freesound-previews/fs-sob-preview.mp3",
          sourceUrl: "https://freesound.org/people/ZerOcarina/sounds/232263/",
          note: "`😭` 계열에 과장되지 않은 짧은 울먹 포인트입니다.",
        },
      ]),
    }),
    sleep: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "sleep-core",
      previews: freezePreviews([
        {
          id: "sleep-core",
          title: "Yawning",
          subtitle: "rowlification · CC0 · sleepy cue",
          previewPath: "assets/freesound-previews/fs-sleep-preview.mp3",
          sourceUrl: "https://freesound.org/people/rowlification/sounds/701090/",
          note: "`😴` 쪽에 짧게 쓰기 좋은 졸린 제스처입니다.",
        },
      ]),
    }),
    ghost: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "ghost-core",
      previews: freezePreviews([
        {
          id: "ghost-core",
          title: "Creepy Whoosh Subtle",
          subtitle: "SoundEffectsForAll · CC0 · spooky drift",
          previewPath: "assets/freesound-previews/fs-ghost-preview.mp3",
          sourceUrl: "https://freesound.org/people/SoundEffectsForAll/sounds/840812/",
          note: "`👻`에 맞는 가볍고 만화적인 유령 스윽 톤입니다.",
        },
      ]),
    }),
    skull: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "skull-core",
      previews: freezePreviews([
        {
          id: "skull-core",
          title: "Bonk Sound effect",
          subtitle: "thecoolcookie17 · CC0 · meme bonk",
          previewPath: "assets/freesound-previews/fs-skull-preview.mp3",
          sourceUrl: "https://freesound.org/people/thecoolcookie17/sounds/573047/",
          note: "`💀` 밈 감성에 맞춰 작은 bonk 쪽으로 잡았습니다.",
        },
      ]),
    }),
    tuba: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "tuba-core",
      previews: freezePreviews([
        {
          id: "tuba-core",
          title: "Short Fart_03.wav",
          subtitle: "DSISStudios · CC0 · low comedy",
          previewPath: "assets/freesound-previews/fs-tuba-preview.mp3",
          sourceUrl: "https://freesound.org/people/DSISStudios/sounds/521091/",
          note: "`💩` 쪽에 과하게 더럽지 않고 짧게 웃긴 방향입니다.",
        },
      ]),
    }),
    wiggle: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "wiggle-core",
      previews: freezePreviews([
        {
          id: "wiggle-core",
          title: "Cartoon Wobble",
          subtitle: "Breviceps · CC0 · squishy wobble",
          previewPath: "assets/freesound-previews/fs-wiggle-preview.mp3",
          sourceUrl: "https://freesound.org/people/Breviceps/sounds/542195/",
          note: "`👀` 계열에 붙는 흔들리는 만화 톤입니다.",
        },
      ]),
    }),
    wave: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "wave-core",
      previews: freezePreviews([
        {
          id: "wave-core",
          title: "Woosh_Medium_Short_01.wav",
          subtitle: "moogy73 · CC0 · splashy sweep",
          previewPath: "assets/freesound-previews/fs-wave-preview.mp3",
          sourceUrl: "https://freesound.org/people/moogy73/sounds/425706/",
          note: "`🌊`이나 `💦` 쪽에 쓰기 좋은 짧은 휩 톤입니다.",
        },
      ]),
    }),
    music: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "music-core",
      previews: freezePreviews([
        {
          id: "music-core",
          title: "Basic Synth Jingle",
          subtitle: "SpooksJH · CC0 · tiny sting",
          previewPath: "assets/freesound-previews/fs-music-preview.mp3",
          sourceUrl: "https://freesound.org/people/SpooksJH/sounds/724490/",
          note: "`🎵` 계열에 붙는 짧은 신스 지글입니다.",
        },
      ]),
    }),
    blast: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "blast-core",
      previews: freezePreviews([
        {
          id: "blast-core",
          title: "Retro Small Bomb Explosion",
          subtitle: "modusmogulus · CC0 · retro burst",
          previewPath: "assets/freesound-previews/fs-blast-preview.mp3",
          sourceUrl: "https://freesound.org/people/modusmogulus/sounds/792520/",
          note: "스피커를 찢지 않는 작은 레트로 폭발 톤입니다.",
        },
      ]),
    }),
    frost: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "frost-core",
      previews: freezePreviews([
        {
          id: "frost-core",
          title: "Ice Crack 3.wav",
          subtitle: "ecfike · CC0 · icy snap",
          previewPath: "assets/freesound-previews/fs-frost-preview.mp3",
          sourceUrl: "https://freesound.org/people/ecfike/sounds/177211/",
          note: "`❄️` 계열엔 서늘한 갈라짐 소리가 잘 맞습니다.",
        },
      ]),
    }),
    success: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "success-core",
      previews: freezePreviews([
        {
          id: "success-core",
          title: "Short Success Sound Glockenspiel Treasure Video Game.mp3",
          subtitle: "FunWithSound · CC0 · bright win",
          previewPath: "assets/freesound-previews/fs-success-preview.mp3",
          sourceUrl: "https://freesound.org/people/FunWithSound/sounds/456965/",
          note: "`✅`와 `💯` 쪽에 붙는 가벼운 성공 스팅입니다.",
        },
      ]),
    }),
    buzz: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "buzz-pop",
      previews: freezePreviews([
        {
          id: "buzz-pop",
          title: "Pop.ogg",
          subtitle: "egomassive · CC0 · current pick",
          previewPath: "assets/freesound-previews/fs-zap-alt-pop-preview.mp3",
          sourceUrl: "https://freesound.org/people/egomassive/sounds/536772/",
          note: "현재 `❌` 최종 선택입니다.",
        },
        {
          id: "buzz-failhorn",
          title: "Fail Jingle Party Horn",
          subtitle: "qubodup · CC0 · comedic fail",
          previewPath: "assets/freesound-previews/fs-buzz-alt-failhorn-preview.mp3",
          sourceUrl: "https://freesound.org/people/qubodup/sounds/825292/",
          note: "더 캐릭터 강한 fail stinger 대체안입니다.",
        },
        {
          id: "buzz-error",
          title: "Error Sound [Retro Video Game SFX]",
          subtitle: "KorGround · CC0 · retro UI",
          previewPath: "assets/freesound-previews/fs-buzz-alt-error-preview.mp3",
          sourceUrl: "https://freesound.org/people/KorGround/sounds/344687/",
          note: "게임 UI형 `nope` 대체안입니다.",
        },
        {
          id: "buzz-current",
          title: "Short Censor Beep",
          subtitle: "prueslove · CC0 · previous baseline",
          previewPath: "assets/freesound-previews/fs-buzz-preview.mp3",
          sourceUrl: "https://freesound.org/people/prueslove/sounds/586975/",
          note: "이전 baseline preview입니다.",
        },
      ]),
    }),
    question: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "question-core",
      previews: freezePreviews([
        {
          id: "question-core",
          title: "Short Beep 04.wav",
          subtitle: "ironcross32 · CC0 · curious ping",
          previewPath: "assets/freesound-previews/fs-question-preview.mp3",
          sourceUrl: "https://freesound.org/people/ironcross32/sounds/582695/",
          note: "`🤔`와 `❓` 쪽에 맞는 짧은 물음표 비프입니다.",
        },
      ]),
    }),
    chime: Object.freeze({
      selectedSource: "preview",
      preferredPreviewId: "chime-core",
      previews: freezePreviews([
        {
          id: "chime-core",
          title: "Soft-Notifications - Bell - LowDing.mp3",
          subtitle: "LegitCheese · CC0 · soft bell",
          previewPath: "assets/freesound-previews/fs-chime-preview.mp3",
          sourceUrl: "https://freesound.org/people/LegitCheese/sounds/571511/",
          note: "`🙏`와 `🔔` 계열에 붙는 조용한 벨 톤입니다.",
        },
      ]),
    }),
    cheer: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    gloom: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    anger: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    shock: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    bloom: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    leaf: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    sun: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    storm: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    gift: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    lock: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    chirp: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    warning: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    snack: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    sweet: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    drink: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    paw: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    marine: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    bug: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    moon: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    vehicle: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    tool: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    money: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
    tech: Object.freeze({
      selectedSource: "synth",
      previews: freezePreviews([]),
    }),
  });

  const catalog = Object.freeze({
    version: "0.3.0",
    policy: Object.freeze({
      defaultPairingMode: "synth-plus-freesound",
      note: "Each effect should keep a synth identity and a paired Freesound audition when available.",
    }),
    spotlightEffectIds: Object.freeze(["rocket", "zap", "buzz"]),
    effects: effectCatalog,
  });

  globalThis.EMOJI_FREESOUND_CATALOG = catalog;
})();
