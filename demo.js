(function () {
  const EMOJI_SOUND_MAP = globalThis.EMOJI_SOUND_PROJECT_MAP || globalThis.TWEETZ_EMOJI_SOUND_MAP || {
    aliases: {},
    effects: {},
    emojiEffects: {},
    fallbackEffectId: "",
  };
  const FREESOUND_CATALOG = globalThis.EMOJI_FREESOUND_CATALOG || {
    effects: {},
    policy: {},
  };
  const GRAPHEME_SEGMENTER =
    typeof Intl !== "undefined" && typeof Intl.Segmenter === "function"
      ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
      : null;

  let audioContext = null;
  let noiseBuffer = null;
  let activePlayback = null;
  const sampleBufferCache = new Map();
  const failedSampleUrls = new Set();
  const FEATURED_EFFECT_IDS = new Set([
    "laugh",
    "fire",
    "clap",
    "heart",
    "party",
    "cheer",
    "anger",
    "shock",
    "bloom",
    "warning",
    "snack",
    "paw",
    "moon",
    "vehicle",
    "tech",
  ]);
  const SPOTLIGHT_EFFECT_IDS = new Set(FREESOUND_CATALOG.spotlightEffectIds || []);
  const FAMILY_LABELS = Object.freeze({
    affection: "애정",
    animal: "동물",
    calm: "평온",
    celebration: "축하",
    comedy: "코믹",
    expression: "감정",
    food: "음식",
    impact: "임팩트",
    magic: "반짝",
    meme: "밈",
    motion: "움직임",
    music: "음악",
    nature: "자연",
    object: "오브젝트",
    reaction: "리액션",
    ritual: "의식",
    spooky: "오싹",
    ui: "UI",
  });
  const MODE_LABELS = Object.freeze({
    earcon: "earcon",
    "auditory-icon": "auditory icon",
    "reaction-sfx": "reaction sfx",
  });
  const TUNING_STORAGE_KEY = "emoji_sound_demo_tuning_v3";
  const TUNING_CONTROLS = [
    { key: "speed", label: "속도", min: 0.65, max: 1.7, step: 0.01 },
    { key: "pitch", label: "피치", min: 0.65, max: 1.8, step: 0.01 },
    { key: "intensity", label: "강도", min: 0.45, max: 1.9, step: 0.01 },
  ];
  const SYNTH_CONTROLLER_STORAGE_KEY = "emoji_sound_demo_synth_controller_v1";
  const SYNTH_WAVEFORMS = new Set(["sine", "triangle", "sawtooth", "square"]);
  const SYNTH_KEY_LAYOUT = Object.freeze([
    { label: "C", semitone: 0, hotkey: "A" },
    { label: "D", semitone: 2, hotkey: "S" },
    { label: "E", semitone: 4, hotkey: "D" },
    { label: "F", semitone: 5, hotkey: "F" },
    { label: "G", semitone: 7, hotkey: "G" },
    { label: "A", semitone: 9, hotkey: "H" },
    { label: "B", semitone: 11, hotkey: "J" },
    { label: "C", semitone: 12, hotkey: "K" },
  ]);
  const SYNTH_DEFAULT_STATE = Object.freeze({
    waveform: "sine",
    octave: 4,
    attackMs: 20,
    releaseMs: 260,
    filterFreq: 1800,
    filterQ: 1.4,
    glideMs: 20,
    gain: 0.16,
  });
  const FREESOUND_COMPARISON_COPY = Object.freeze({
    rocket: "비교 결과 `🚀`는 아직 synth가 제일 안정적이라 유지하고, 다른 Freesound 후보는 비교용으로 남겨뒀습니다.",
    zap: "비교 결과 `⚡`는 너무 가벼운 pop보다 지금의 `Zap.wav` 계열이 존재감과 안정감이 더 좋았습니다.",
    buzz: "비교 결과 `❌`는 fail horn보다 짧고 둥근 `Pop.ogg` 계열이 더 재밌고 부담이 적었습니다.",
  });
  const tuningState = loadTuningState();
  const synthControllerState = loadSynthControllerState();
  const activeSynthVoices = new Map();
  const synthHotkeyMap = new Map();
  const activeSynthHotkeys = new Set();
  let synthMasterGainNode = null;
  let synthLastFrequency = 261.63;

  function $(id) {
    return document.getElementById(id);
  }

  function setStatus(text) {
    const el = $("status");
    if (el) el.textContent = text;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#39;";
    });
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getMapDefaultTuning() {
    return sanitizeTuning(EMOJI_SOUND_MAP.defaultTuning || {});
  }

  function getBaseEffectTuning(effectId = "") {
    const effect = getEmojiEffect(effectId);
    return sanitizeTuning({
      ...getMapDefaultTuning(),
      ...(effect?.tuning || {}),
    });
  }

  function createDefaultTuning(effectId = "") {
    return { ...getBaseEffectTuning(effectId) };
  }

  function sanitizeTuning(input = {}) {
    return {
      speed: clamp(Number(input.speed) || 1, 0.65, 1.7),
      pitch: clamp(Number(input.pitch) || 1, 0.65, 1.8),
      intensity: clamp(Number(input.intensity) || 1, 0.45, 1.9),
    };
  }

  function loadTuningState() {
    try {
      const raw = globalThis.localStorage?.getItem(TUNING_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return {};

      return Object.fromEntries(
        Object.entries(parsed).map(([effectId, tuning]) => [
          effectId,
          sanitizeTuning({
            ...getBaseEffectTuning(effectId),
            ...tuning,
          }),
        ])
      );
    } catch (error) {
      console.warn("Failed to load demo tuning state:", error);
      return {};
    }
  }

  function saveTuningState() {
    try {
      globalThis.localStorage?.setItem(TUNING_STORAGE_KEY, JSON.stringify(tuningState));
    } catch (error) {
      console.warn("Failed to save demo tuning state:", error);
    }
  }

  function getEffectTuning(effectId = "") {
    if (!effectId) return createDefaultTuning();
    if (!tuningState[effectId]) {
      tuningState[effectId] = createDefaultTuning(effectId);
    }
    return tuningState[effectId];
  }

  function setEffectTuning(effectId, key, value) {
    const tuning = getEffectTuning(effectId);
    tuning[key] = sanitizeTuning({ ...tuning, [key]: value })[key];
    saveTuningState();
    return tuning;
  }

  function resetEffectTuning(effectId = "") {
    tuningState[effectId] = createDefaultTuning(effectId);
    saveTuningState();
    return tuningState[effectId];
  }

  function formatTuningValue(key, value) {
    if (key === "intensity") return `${value.toFixed(2)}x`;
    if (key === "speed") return `${value.toFixed(2)}x`;
    if (key === "pitch") return `${value.toFixed(2)}x`;
    return value.toFixed(2);
  }

  function sanitizeSynthControllerState(input = {}) {
    return {
      waveform: SYNTH_WAVEFORMS.has(input.waveform) ? input.waveform : SYNTH_DEFAULT_STATE.waveform,
      octave: Math.round(clamp(Number(input.octave) || SYNTH_DEFAULT_STATE.octave, 2, 6)),
      attackMs: Math.round(clamp(Number(input.attackMs) || SYNTH_DEFAULT_STATE.attackMs, 4, 220)),
      releaseMs: Math.round(clamp(Number(input.releaseMs) || SYNTH_DEFAULT_STATE.releaseMs, 60, 1400)),
      filterFreq: Math.round(clamp(Number(input.filterFreq) || SYNTH_DEFAULT_STATE.filterFreq, 200, 8000)),
      filterQ: Number(clamp(Number(input.filterQ) || SYNTH_DEFAULT_STATE.filterQ, 0.2, 12).toFixed(1)),
      glideMs: Math.round(clamp(Number(input.glideMs) || SYNTH_DEFAULT_STATE.glideMs, 0, 220)),
      gain: Number(clamp(Number(input.gain) || SYNTH_DEFAULT_STATE.gain, 0.04, 0.45).toFixed(2)),
    };
  }

  function loadSynthControllerState() {
    try {
      const raw = globalThis.localStorage?.getItem(SYNTH_CONTROLLER_STORAGE_KEY);
      if (!raw) return { ...SYNTH_DEFAULT_STATE };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return { ...SYNTH_DEFAULT_STATE };
      }
      return sanitizeSynthControllerState({
        ...SYNTH_DEFAULT_STATE,
        ...parsed,
      });
    } catch (error) {
      console.warn("Failed to load synth controller state:", error);
      return { ...SYNTH_DEFAULT_STATE };
    }
  }

  function saveSynthControllerState() {
    try {
      globalThis.localStorage?.setItem(SYNTH_CONTROLLER_STORAGE_KEY, JSON.stringify(synthControllerState));
    } catch (error) {
      console.warn("Failed to save synth controller state:", error);
    }
  }

  function resetSynthControllerState() {
    Object.assign(synthControllerState, { ...SYNTH_DEFAULT_STATE });
    saveSynthControllerState();
    return synthControllerState;
  }

  function isEditableElement(target) {
    if (!target || !(target instanceof HTMLElement)) return false;
    const tagName = target.tagName.toLowerCase();
    if (target.isContentEditable) return true;
    return tagName === "input" || tagName === "textarea" || tagName === "select";
  }

  function getSynthMasterGain(ctx) {
    if (!synthMasterGainNode) {
      synthMasterGainNode = ctx.createGain();
      synthMasterGainNode.gain.value = synthControllerState.gain;
      synthMasterGainNode.connect(ctx.destination);
    }

    synthMasterGainNode.gain.setTargetAtTime(synthControllerState.gain, ctx.currentTime, 0.01);
    return synthMasterGainNode;
  }

  function getSynthNoteLabel(layoutItem) {
    const octaveOffset = layoutItem.semitone >= 12 ? 1 : 0;
    return `${layoutItem.label}${synthControllerState.octave + octaveOffset}`;
  }

  function getSynthFrequencyBySemitone(semitone = 0) {
    const midi = (synthControllerState.octave + 1) * 12 + semitone;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function setSynthKeyActive(noteId = "", active = false) {
    const key = document.querySelector(`[data-synth-note-id="${noteId}"]`);
    if (key) {
      key.classList.toggle("active", active);
    }
  }

  function syncSynthUiValues() {
    const synthWaveform = $("synthWaveform");
    if (synthWaveform) synthWaveform.value = synthControllerState.waveform;

    const synthOctave = $("synthOctave");
    const synthAttack = $("synthAttack");
    const synthRelease = $("synthRelease");
    const synthFilterFreq = $("synthFilterFreq");
    const synthFilterQ = $("synthFilterQ");
    const synthGlide = $("synthGlide");
    const synthGain = $("synthGain");

    if (synthOctave) synthOctave.value = String(synthControllerState.octave);
    if ($("synthOctaveValue")) $("synthOctaveValue").textContent = String(synthControllerState.octave);

    if (synthAttack) synthAttack.value = String(synthControllerState.attackMs);
    if ($("synthAttackValue")) $("synthAttackValue").textContent = `${synthControllerState.attackMs}ms`;

    if (synthRelease) synthRelease.value = String(synthControllerState.releaseMs);
    if ($("synthReleaseValue")) $("synthReleaseValue").textContent = `${synthControllerState.releaseMs}ms`;

    if (synthFilterFreq) synthFilterFreq.value = String(synthControllerState.filterFreq);
    if ($("synthFilterFreqValue")) $("synthFilterFreqValue").textContent = `${synthControllerState.filterFreq}Hz`;

    if (synthFilterQ) synthFilterQ.value = String(synthControllerState.filterQ);
    if ($("synthFilterQValue")) $("synthFilterQValue").textContent = synthControllerState.filterQ.toFixed(1);

    if (synthGlide) synthGlide.value = String(synthControllerState.glideMs);
    if ($("synthGlideValue")) $("synthGlideValue").textContent = `${synthControllerState.glideMs}ms`;

    if (synthGain) synthGain.value = String(synthControllerState.gain);
    if ($("synthGainValue")) $("synthGainValue").textContent = synthControllerState.gain.toFixed(2);
  }

  function applySynthStateToActiveVoices() {
    if (audioContext && synthMasterGainNode) {
      synthMasterGainNode.gain.setTargetAtTime(synthControllerState.gain, audioContext.currentTime, 0.01);
    }

    if (!audioContext || !activeSynthVoices.size) return;
    const now = audioContext.currentTime;

    activeSynthVoices.forEach((voice) => {
      try {
        voice.oscillator.type = synthControllerState.waveform;
        voice.filter.frequency.setTargetAtTime(synthControllerState.filterFreq, now, 0.02);
        voice.filter.Q.setTargetAtTime(synthControllerState.filterQ, now, 0.02);
      } catch (error) {
        console.warn("Failed to refresh synth voice:", error);
      }
    });
  }

  function renderSynthKeyboard() {
    const root = $("synthKeyboard");
    if (!root) return;

    root.innerHTML = "";
    synthHotkeyMap.clear();

    SYNTH_KEY_LAYOUT.forEach((layoutItem, index) => {
      const noteId = `synth-key-${index}`;
      const key = document.createElement("button");
      key.type = "button";
      key.className = "synth-key";
      key.dataset.synthNoteId = noteId;
      key.innerHTML = `
        <span class="synth-key-note">${getSynthNoteLabel(layoutItem)}</span>
        <span class="synth-key-hotkey">${layoutItem.hotkey}</span>
      `;

      const releaseNote = () => {
        stopSynthNote(noteId, { silent: true });
      };

      key.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        void startSynthNote(noteId, layoutItem);
      });
      key.addEventListener("pointerup", releaseNote);
      key.addEventListener("pointercancel", releaseNote);
      key.addEventListener("pointerleave", (event) => {
        if ((event.buttons || 0) > 0) {
          releaseNote();
        }
      });

      synthHotkeyMap.set(layoutItem.hotkey, { noteId, layoutItem });
      root.appendChild(key);
    });
  }

  async function startSynthNote(noteId, layoutItem) {
    if (activeSynthVoices.has(noteId)) return;

    stopPlayback();
    const ctx = await getAudioContext();
    if (!ctx) {
      setStatus("오디오 컨텍스트가 없어 Synth를 재생할 수 없어요.");
      return;
    }

    const frequency = getSynthFrequencyBySemitone(layoutItem.semitone);
    const now = ctx.currentTime;
    const glideSeconds = Math.max(0, synthControllerState.glideMs / 1000);
    const attackSeconds = Math.max(0.004, synthControllerState.attackMs / 1000);

    const oscillator = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();
    const destination = getSynthMasterGain(ctx);

    oscillator.type = synthControllerState.waveform;
    oscillator.frequency.setValueAtTime(Math.max(20, synthLastFrequency || frequency), now);
    if (glideSeconds > 0.001) {
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, frequency), now + glideSeconds);
    } else {
      oscillator.frequency.setValueAtTime(Math.max(20, frequency), now);
    }

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(synthControllerState.filterFreq, now);
    filter.Q.setValueAtTime(synthControllerState.filterQ, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackSeconds);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);
    oscillator.start(now);

    activeSynthVoices.set(noteId, {
      oscillator,
      filter,
      gainNode,
      label: getSynthNoteLabel(layoutItem),
    });
    synthLastFrequency = frequency;
    setSynthKeyActive(noteId, true);
    setStatus(`Synth 연주 중 · ${getSynthNoteLabel(layoutItem)}`);
  }

  function stopSynthNote(noteId, options = {}) {
    const voice = activeSynthVoices.get(noteId);
    if (!voice) return false;

    const releaseSeconds = Math.max(0.03, synthControllerState.releaseMs / 1000);
    const now = audioContext?.currentTime || 0;

    try {
      voice.gainNode.gain.cancelScheduledValues(now);
      voice.gainNode.gain.setValueAtTime(Math.max(0.0001, voice.gainNode.gain.value), now);
      voice.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + releaseSeconds);
    } catch (error) {
      console.warn("Failed to apply synth release envelope:", error);
    }

    try {
      voice.oscillator.stop(now + releaseSeconds + 0.03);
    } catch (error) {}

    globalThis.setTimeout(() => {
      try { voice.oscillator.disconnect(); } catch (error) {}
      try { voice.filter.disconnect(); } catch (error) {}
      try { voice.gainNode.disconnect(); } catch (error) {}
    }, Math.ceil(releaseSeconds * 1000) + 90);

    activeSynthVoices.delete(noteId);
    setSynthKeyActive(noteId, false);

    if (!options.silent && activeSynthVoices.size === 0) {
      setStatus(`Synth 노트 종료 · ${voice.label}`);
    }

    return true;
  }

  function stopAllSynthVoices(statusText = "Synth 노트 정지됨") {
    if (!activeSynthVoices.size) return false;

    Array.from(activeSynthVoices.keys()).forEach((noteId) => {
      stopSynthNote(noteId, { silent: true });
    });
    activeSynthHotkeys.clear();
    setStatus(statusText);
    return true;
  }

  function playSynthChord() {
    const chordSemitones = [0, 4, 7];
    const holdMs = 450;

    chordSemitones.forEach((semitone) => {
      const entry = Array.from(synthHotkeyMap.values()).find((item) => item.layoutItem.semitone === semitone);
      if (!entry) return;
      void startSynthNote(entry.noteId, entry.layoutItem);
      globalThis.setTimeout(() => {
        stopSynthNote(entry.noteId, { silent: true });
      }, holdMs);
    });
  }

  function bindSynthController() {
    syncSynthUiValues();
    renderSynthKeyboard();

    const waveformSelect = $("synthWaveform");
    waveformSelect?.addEventListener("change", () => {
      synthControllerState.waveform = SYNTH_WAVEFORMS.has(waveformSelect.value)
        ? waveformSelect.value
        : SYNTH_DEFAULT_STATE.waveform;
      saveSynthControllerState();
      applySynthStateToActiveVoices();
    });

    const bindRange = (id, key, parser) => {
      const input = $(id);
      if (!input) return;
      input.addEventListener("input", () => {
        synthControllerState[key] = parser(input.value);
        Object.assign(synthControllerState, sanitizeSynthControllerState(synthControllerState));
        saveSynthControllerState();
        syncSynthUiValues();
        applySynthStateToActiveVoices();
        if (key === "octave") {
          renderSynthKeyboard();
        }
      });
    };

    bindRange("synthOctave", "octave", (value) => Number(value));
    bindRange("synthAttack", "attackMs", (value) => Number(value));
    bindRange("synthRelease", "releaseMs", (value) => Number(value));
    bindRange("synthFilterFreq", "filterFreq", (value) => Number(value));
    bindRange("synthFilterQ", "filterQ", (value) => Number(value));
    bindRange("synthGlide", "glideMs", (value) => Number(value));
    bindRange("synthGain", "gain", (value) => Number(value));

    $("synthChordBtn")?.addEventListener("click", () => {
      playSynthChord();
      setStatus("Synth 코드 재생 · C major");
    });

    $("synthStopBtn")?.addEventListener("click", () => {
      if (!stopAllSynthVoices("Synth 노트 정지됨")) {
        setStatus("정지할 Synth 노트가 없어요.");
      }
    });

    $("synthResetBtn")?.addEventListener("click", () => {
      resetSynthControllerState();
      syncSynthUiValues();
      renderSynthKeyboard();
      applySynthStateToActiveVoices();
      setStatus("Synth 컨트롤러를 초기값으로 되돌렸어요.");
    });

    document.addEventListener("keydown", (event) => {
      if (event.repeat || isEditableElement(event.target)) return;
      const hotkey = String(event.key || "").toUpperCase();
      const entry = synthHotkeyMap.get(hotkey);
      if (!entry) return;
      event.preventDefault();
      if (activeSynthHotkeys.has(hotkey)) return;
      activeSynthHotkeys.add(hotkey);
      void startSynthNote(entry.noteId, entry.layoutItem);
    });

    document.addEventListener("keyup", (event) => {
      const hotkey = String(event.key || "").toUpperCase();
      const entry = synthHotkeyMap.get(hotkey);
      if (!entry) return;
      event.preventDefault();
      activeSynthHotkeys.delete(hotkey);
      if (!stopSynthNote(entry.noteId, { silent: true })) return;
      if (activeSynthVoices.size === 0) {
        setStatus("Synth 노트 정지됨");
      }
    });

    globalThis.addEventListener("blur", () => {
      activeSynthHotkeys.clear();
      stopAllSynthVoices("Synth 노트 정지됨");
    });
  }

  function segmentGraphemes(text = "") {
    const input = `${text || ""}`;
    if (!input) return [];

    if (GRAPHEME_SEGMENTER) {
      return Array.from(GRAPHEME_SEGMENTER.segment(input), ({ segment }) => segment);
    }

    return Array.from(input);
  }

  function isEmojiGrapheme(value = "") {
    const token = `${value || ""}`;
    if (!token || /^\s+$/u.test(token)) return false;

    return (
      /\p{Extended_Pictographic}/u.test(token) ||
      /\p{Regional_Indicator}/u.test(token) ||
      /^[#*0-9]\uFE0F?\u20E3$/u.test(token)
    );
  }

  function normalizeEmojiToken(token = "") {
    return EMOJI_SOUND_MAP.aliases?.[token] || token;
  }

  function extractEmojiTokens(text = "") {
    return segmentGraphemes(text)
      .filter(isEmojiGrapheme)
      .map(normalizeEmojiToken);
  }

  function getEmojiEffect(effectId = "") {
    return EMOJI_SOUND_MAP.effects?.[effectId] || null;
  }

  function getEffectProfile(effectId = "") {
    return EMOJI_SOUND_MAP.effectProfiles?.[effectId] || null;
  }

  function getFreesoundEffect(effectId = "") {
    return FREESOUND_CATALOG.effects?.[effectId] || null;
  }

  function getPreferredPreview(effectId = "") {
    const source = getFreesoundEffect(effectId);
    if (!source?.previews?.length) return null;

    if (!source.preferredPreviewId) {
      return source.previews[0];
    }

    return source.previews.find((preview) => preview.id === source.preferredPreviewId) || source.previews[0];
  }

  function hasPreviewPair(effectId = "") {
    return Boolean(getPreferredPreview(effectId));
  }

  function countPreviewPairs() {
    return Object.keys(EMOJI_SOUND_MAP.effects || {}).filter((effectId) => hasPreviewPair(effectId)).length;
  }

  function describeLevel(value = 0.5) {
    if (value >= 0.72) return "높음";
    if (value >= 0.44) return "중간";
    return "낮음";
  }

  function buildProfilePills(effectId = "") {
    const profile = getEffectProfile(effectId);
    if (!profile) return [];

    return [
      FAMILY_LABELS[profile.family] || profile.family,
      MODE_LABELS[profile.mode] || profile.mode,
      `긍정 ${describeLevel(profile.valence)}`,
      `각성 ${describeLevel(profile.arousal)}`,
      `밝기 ${describeLevel(profile.brightness)}`,
    ];
  }

  function createPreviewAudio(effectId = "", preview = null) {
    if (!preview) return null;

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "none";
    audio.src = preview.previewPath;
    audio.dataset.previewAudio = "true";
    audio.volume = 0.56;

    const label = `${effectId} / ${preview.title}`;
    audio.addEventListener("play", () => {
      if (activePlayback?.cancel) {
        activePlayback.cancel("stopped");
      }
      document.querySelectorAll('audio[data-preview-audio="true"]').forEach((other) => {
        if (other !== audio) {
          other.pause();
          other.currentTime = 0;
        }
      });
      setStatus(`Freesound 재생 중 · ${label}`);
    });

    audio.addEventListener("ended", () => {
      setStatus(`Freesound 완료 · ${effectId}`);
    });

    return audio;
  }

  function getEffectTargetDurationMs(effect = null) {
    const policy = getPlaybackPolicy();
    return Math.max(760, Number(effect?.targetDurationMs) || Number(policy.defaultEffectDurationMs) || 1080);
  }

  function applyEffectTuning(effectId = "", effect = null) {
    if (!effect) return null;

    const tuning = sanitizeTuning(getEffectTuning(effectId));
    const speed = tuning.speed;
    const pitch = tuning.pitch;
    const intensity = tuning.intensity;
    const filterPitchScale = Math.pow(pitch, 0.55) * Math.pow(intensity, 0.08);
    const targetDurationMs = getEffectTargetDurationMs(effect);
    const sourceDurationMs = Math.max(60, effect.durationMs || targetDurationMs);
    const timeScale = (targetDurationMs / sourceDurationMs) / speed;

    return {
      ...effect,
      durationMs: Math.max(240, targetDurationMs / speed),
      repeatGapMs: 0,
      sample: effect.sample
        ? {
            ...effect.sample,
            gain: (effect.sample.gain || 0.9) * Math.pow(intensity, 0.92),
          }
        : null,
      tuning,
      events: (effect.events || []).map((event) => ({
        ...event,
        startMs: (event.startMs || 0) * timeScale,
        durationMs: Math.max(32, (event.durationMs || 0) * timeScale),
        attackMs: Number.isFinite(event.attackMs) ? Math.max(3, event.attackMs * timeScale) : event.attackMs,
        releaseMs: Number.isFinite(event.releaseMs) ? Math.max(20, event.releaseMs * timeScale) : event.releaseMs,
        gain: (event.gain || 0.05) * intensity,
        freq: Number.isFinite(event.freq) ? Math.max(20, event.freq * pitch) : event.freq,
        freqEnd: Number.isFinite(event.freqEnd) ? Math.max(20, event.freqEnd * pitch) : event.freqEnd,
        filter: event.filter
          ? {
              ...event.filter,
              frequency: Math.max(80, (event.filter.frequency || 1200) * filterPitchScale),
            }
          : event.filter,
        })),
    };
  }

  function getPlaybackPolicy() {
    return EMOJI_SOUND_MAP.playbackPolicy || {};
  }

  function getEffectGapMs() {
    const policy = getPlaybackPolicy();
    return Math.max(0, Number(policy.effectGapMs) || 36);
  }

  function buildEmojiSoundPlan(emojis = []) {
    const plan = [];

    for (const originalEmoji of emojis) {
      const emoji = normalizeEmojiToken(originalEmoji);
      const effectId = EMOJI_SOUND_MAP.emojiEffects?.[emoji] || EMOJI_SOUND_MAP.fallbackEffectId || "";
      const effect = getEmojiEffect(effectId);
      if (!effect) continue;

      const last = plan[plan.length - 1];
      if (last && last.effectId === effectId) {
        last.count += 1;
        continue;
      }

      if (plan.length >= 3) break;
      plan.push({
        emoji,
        effectId,
        effect,
        count: 1,
      });
    }

    if (!plan.length && EMOJI_SOUND_MAP.fallbackEffectId) {
      const fallbackEffect = getEmojiEffect(EMOJI_SOUND_MAP.fallbackEffectId);
      if (fallbackEffect) {
        plan.push({
          emoji: "",
          effectId: EMOJI_SOUND_MAP.fallbackEffectId,
          effect: fallbackEffect,
          count: 1,
        });
      }
    }

    return plan;
  }

  async function getAudioContext() {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return null;

    if (!audioContext || audioContext.state === "closed") {
      audioContext = new AudioContextCtor();
    }

    if (audioContext.state === "suspended") {
      try {
        await audioContext.resume();
      } catch (error) {
        console.warn("AudioContext resume failed:", error);
      }
    }

    return audioContext.state === "running" ? audioContext : null;
  }

  function getNoiseBuffer(ctx) {
    if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) {
      return noiseBuffer;
    }

    const durationSeconds = 0.5;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * durationSeconds), ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * 0.75;
    }

    noiseBuffer = buffer;
    return buffer;
  }

  function resolveSampleUrl(assetPath = "") {
    const normalized = `${assetPath || ""}`.replace(/^\.?\//, "");
    if (!normalized) return "";
    return new URL(normalized, window.location.href).href;
  }

  async function loadSampleBuffer(ctx, assetPath = "") {
    const url = resolveSampleUrl(assetPath);
    if (!url || failedSampleUrls.has(url)) return null;

    if (!sampleBufferCache.has(url)) {
      sampleBufferCache.set(url, (async () => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Sample request failed: ${response.status}`);
        }

        const data = await response.arrayBuffer();
        return await ctx.decodeAudioData(data.slice(0));
      })().catch((error) => {
        failedSampleUrls.add(url);
        sampleBufferCache.delete(url);
        console.warn("Failed to load emoji sample:", assetPath, error);
        return null;
      }));
    }

    return await sampleBufferCache.get(url);
  }

  function scheduleGainEnvelope(gainNode, startTime, endTime, peakGain, attackMs = 14, releaseMs = 80) {
    const attackSeconds = Math.max(0.004, attackMs / 1000);
    const releaseSeconds = Math.max(0.012, releaseMs / 1000);
    const safePeak = Math.max(0.0001, peakGain);
    const sustainEnd = Math.max(startTime + attackSeconds, endTime - releaseSeconds);

    gainNode.gain.cancelScheduledValues(startTime);
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(safePeak, startTime + attackSeconds);
    gainNode.gain.setValueAtTime(safePeak, sustainEnd);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);
  }

  function scheduleToneEvent(ctx, destination, baseTime, event, gainScale, nodes) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    let tailNode = oscillator;

    oscillator.type = event.wave || "sine";
    oscillator.frequency.setValueAtTime(Math.max(20, event.freq || 440), baseTime + (event.startMs || 0) / 1000);

    if (Number.isFinite(event.freqEnd)) {
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(20, event.freqEnd),
        baseTime + ((event.startMs || 0) + (event.durationMs || 0)) / 1000
      );
    }

    if (event.filter?.type) {
      const filter = ctx.createBiquadFilter();
      filter.type = event.filter.type;
      filter.frequency.value = event.filter.frequency || 1200;
      filter.Q.value = event.filter.q || 0.7;
      tailNode.connect(filter);
      tailNode = filter;
      nodes.push(filter);
    }

    tailNode.connect(gainNode);
    gainNode.connect(destination);

    const startTime = baseTime + (event.startMs || 0) / 1000;
    const endTime = startTime + (event.durationMs || 0) / 1000;
    scheduleGainEnvelope(
      gainNode,
      startTime,
      endTime,
      Math.min(0.35, (event.gain || 0.05) * gainScale),
      event.attackMs || 14,
      event.releaseMs || 70
    );

    oscillator.start(startTime);
    oscillator.stop(endTime + 0.03);

    nodes.push(oscillator, gainNode);
  }

  function scheduleNoiseEvent(ctx, destination, baseTime, event, gainScale, nodes) {
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    let tailNode = source;

    source.buffer = getNoiseBuffer(ctx);

    if (event.filter?.type) {
      const filter = ctx.createBiquadFilter();
      filter.type = event.filter.type;
      filter.frequency.value = event.filter.frequency || 1800;
      filter.Q.value = event.filter.q || 0.8;
      tailNode.connect(filter);
      tailNode = filter;
      nodes.push(filter);
    }

    tailNode.connect(gainNode);
    gainNode.connect(destination);

    const startTime = baseTime + (event.startMs || 0) / 1000;
    const endTime = startTime + (event.durationMs || 0) / 1000;
    scheduleGainEnvelope(
      gainNode,
      startTime,
      endTime,
      Math.min(0.35, (event.gain || 0.06) * gainScale),
      event.attackMs || 6,
      event.releaseMs || 45
    );

    source.start(startTime);
    source.stop(endTime + 0.03);

    nodes.push(source, gainNode);
  }

  function scheduleSampleEffect(ctx, destination, baseTime, effect, gainScale, nodes) {
    const sampleBuffer = effect?.sampleBuffer;
    const sample = effect?.sample;
    if (!sampleBuffer || !sample) return 0;

    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();

    source.buffer = sampleBuffer;
    source.playbackRate.value = clamp(Number(sample.playbackRate) || 1, 0.5, 2.5);
    source.connect(gainNode);
    gainNode.connect(destination);

    const offsetSeconds = Math.max(0, Number(sample.trimStartMs || 0) / 1000);
    const availableSeconds = Math.max(0.02, sampleBuffer.duration - offsetSeconds);
    const requestedSeconds = Number.isFinite(sample.trimDurationMs)
      ? Math.min(availableSeconds, Math.max(0.02, sample.trimDurationMs / 1000))
      : availableSeconds;
    const outputDurationMs = Math.max(180, (requestedSeconds / source.playbackRate.value) * 1000);
    const startTime = baseTime;
    const endTime = startTime + outputDurationMs / 1000;

    scheduleGainEnvelope(
      gainNode,
      startTime,
      endTime,
      Math.min(0.6, (sample.gain || 0.9) * gainScale),
      sample.attackMs || 8,
      sample.releaseMs || 140
    );

    source.start(startTime, offsetSeconds, requestedSeconds);
    source.stop(endTime + 0.05);

    nodes.push(source, gainNode);
    return outputDurationMs;
  }

  async function prepareEffectForPlayback(ctx, effectId = "", effect = null) {
    const tunedEffect = applyEffectTuning(effectId, effect);
    if (!tunedEffect) return null;

    if (tunedEffect.sample?.assetPath) {
      const sampleBuffer = await loadSampleBuffer(ctx, tunedEffect.sample.assetPath);
      if (sampleBuffer) {
        return {
          ...tunedEffect,
          sampleBuffer,
        };
      }
    }

    return tunedEffect;
  }

  function schedulePreparedEffect(ctx, destination, baseTime, effect, gainScale, nodes) {
    if (effect?.sampleBuffer && effect?.sample) {
      return scheduleSampleEffect(ctx, destination, baseTime, effect, gainScale, nodes);
    }

    for (const event of effect.events || []) {
      if (event.kind === "noise") {
        scheduleNoiseEvent(ctx, destination, baseTime, event, gainScale, nodes);
      } else {
        scheduleToneEvent(ctx, destination, baseTime, event, gainScale, nodes);
      }
    }

    return effect.durationMs || 0;
  }

  function cleanupNodes(nodes = []) {
    for (const node of nodes) {
      if (!node) continue;

      if (typeof node.stop === "function") {
        try { node.stop(0); } catch (e) {}
      }

      if (typeof node.disconnect === "function") {
        try { node.disconnect(); } catch (e) {}
      }
    }
  }

  function stopPreviewAudios() {
    let stopped = false;
    document.querySelectorAll('audio[data-preview-audio="true"]').forEach((audio) => {
      if (!audio.paused || audio.currentTime > 0.001) {
        stopped = true;
      }
      audio.pause();
      audio.currentTime = 0;
    });
    return stopped;
  }

  function stopPlayback() {
    let stopped = false;

    if (activePlayback?.cancel) {
      activePlayback.cancel("stopped");
      stopped = true;
    }

    if (stopPreviewAudios()) {
      stopped = true;
    }

    return stopped;
  }

  async function playPlan(plan, label = "") {
    stopPlayback();

    const ctx = await getAudioContext();
    if (!ctx || !plan.length) {
      setStatus("재생할 이모지나 오디오 컨텍스트가 없어요.");
      return;
    }

    const preparedPlan = [];
    for (const entry of plan) {
      const effect = await prepareEffectForPlayback(ctx, entry.effectId, entry.effect);
      if (!effect) continue;
      preparedPlan.push({
        ...entry,
        effect,
      });
    }

    if (!preparedPlan.length) {
      setStatus("재생할 효과를 준비하지 못했어요.");
      return;
    }

    return new Promise((resolve) => {
      const masterGain = ctx.createGain();
      const nodes = [masterGain];
      const playbackHandle = {};
      let finished = false;
      let timer = null;

      masterGain.gain.value = 0.9;
      masterGain.connect(ctx.destination);

      const startAt = ctx.currentTime + 0.03;
      let cursor = startAt;
      const gapSeconds = getEffectGapMs() / 1000;

      preparedPlan.forEach((entry, index) => {
        const gainScale = Math.min(1.35, 1 + Math.min(entry.count - 1, 3) * 0.12);
        const effectDurationMs = schedulePreparedEffect(ctx, masterGain, cursor, entry.effect, gainScale, nodes);
        cursor += effectDurationMs / 1000;
        if (index < preparedPlan.length - 1) {
          cursor += gapSeconds;
        }
      });

      if (preparedPlan.length === 1 && preparedPlan[0].effect?.sampleBuffer) {
        cursor += 0.02;
      }

      const totalMs = Math.max(180, Math.ceil((cursor - startAt) * 1000) + 120);

      function finish(result) {
        if (finished) return;
        finished = true;
        if (timer) clearTimeout(timer);
        cleanupNodes(nodes);
        if (activePlayback === playbackHandle) {
          activePlayback = null;
        }
        setStatus(result === "end" ? `재생 완료 · ${label}` : `정지됨 · ${label}`);
        resolve(result);
      }

      playbackHandle.cancel = (result = "stopped") => finish(result);
      activePlayback = playbackHandle;

      setStatus(`재생 중 · ${label}`);
      timer = setTimeout(() => finish("end"), totalMs);
    });
  }

  function getSequenceLabel(plan) {
    if (!plan.length) return "빈 시퀀스";
    return plan.map((entry) => entry.emoji || entry.effect.label).join(" ");
  }

  function renderTokens(emojis) {
    const root = $("tokens");
    if (!root) return;

    root.innerHTML = "";
    if (!emojis.length) {
      const empty = document.createElement("div");
      empty.className = "token";
      empty.textContent = "이모지가 아직 없어요.";
      root.appendChild(empty);
      return;
    }

    emojis.forEach((emoji) => {
      const effectId = EMOJI_SOUND_MAP.emojiEffects?.[emoji] || EMOJI_SOUND_MAP.fallbackEffectId || "-";
      const token = document.createElement("div");
      token.className = "token";
      token.innerHTML = `<span class="emoji">${emoji}</span><span>${effectId}</span>`;
      root.appendChild(token);
    });
  }

  function updateComposerPreview() {
    const raw = $("composer")?.value || "";
    const emojis = extractEmojiTokens(raw);
    renderTokens(emojis);
    return emojis;
  }

  function groupByEffect() {
    const grouped = new Map();

    Object.entries(EMOJI_SOUND_MAP.emojiEffects || {}).forEach(([emoji, effectId]) => {
      if (!grouped.has(effectId)) grouped.set(effectId, []);
      grouped.get(effectId).push(emoji);
    });

    return Array.from(grouped.entries())
      .map(([effectId, emojis]) => ({
        effectId,
        effect: getEmojiEffect(effectId),
        emojis: emojis.sort((a, b) => a.localeCompare(b)),
      }))
      .sort((a, b) => {
        const aFeatured = FEATURED_EFFECT_IDS.has(a.effectId) ? 0 : 1;
        const bFeatured = FEATURED_EFFECT_IDS.has(b.effectId) ? 0 : 1;
        return aFeatured - bFeatured || a.effectId.localeCompare(b.effectId);
      });
  }

  function createTuningControl(effectId, config) {
    const tuning = getEffectTuning(effectId);
    const currentValue = tuning[config.key];
    const wrap = document.createElement("div");
    wrap.className = "tune-control";

    const head = document.createElement("div");
    head.className = "tune-head";

    const label = document.createElement("label");
    label.textContent = config.label;

    const value = document.createElement("span");
    value.className = "tune-value";
    value.textContent = formatTuningValue(config.key, currentValue);

    const input = document.createElement("input");
    input.type = "range";
    input.min = String(config.min);
    input.max = String(config.max);
    input.step = String(config.step);
    input.value = String(currentValue);
    input.addEventListener("input", () => {
      const next = setEffectTuning(effectId, config.key, Number(input.value));
      value.textContent = formatTuningValue(config.key, next[config.key]);
    });

    head.appendChild(label);
    head.appendChild(value);
    wrap.appendChild(head);
    wrap.appendChild(input);

    return { wrap, input, value };
  }

  function renderEffectGrid() {
    const root = $("effectGrid");
    if (!root) return;

    root.innerHTML = "";
    groupByEffect().forEach((entry) => {
      const card = document.createElement("article");
      card.className = "effect-card";
      if (FEATURED_EFFECT_IDS.has(entry.effectId)) {
        card.classList.add("featured");
      }

      const badgeRow = document.createElement("div");
      badgeRow.className = "badge-row";

      const title = document.createElement("h3");
      title.textContent = entry.effect?.label || entry.effectId;
      badgeRow.appendChild(title);

      if (FEATURED_EFFECT_IDS.has(entry.effectId)) {
        const badge = document.createElement("div");
        badge.className = "featured-badge";
        badge.textContent = "Featured";
        badgeRow.appendChild(badge);
      }

      const meta = document.createElement("div");
      meta.className = "effect-meta";
      meta.textContent = `${entry.effectId} · ${entry.emojis.length} emojis`;

      const profile = getEffectProfile(entry.effectId);
      const profilePills = buildProfilePills(entry.effectId);

      const sourceConfig = getFreesoundEffect(entry.effectId);
      const preferredPreview = getPreferredPreview(entry.effectId);
      const extraPreviews = (sourceConfig?.previews || []).filter((preview) => preview.id !== preferredPreview?.id);
      const comparisonNote = SPOTLIGHT_EFFECT_IDS.has(entry.effectId)
        ? FREESOUND_COMPARISON_COPY[entry.effectId] || ""
        : "";

      const sourceStack = document.createElement("div");
      sourceStack.className = "source-stack";

      const synthPill = document.createElement("div");
      synthPill.className = `source-pill ${sourceConfig?.selectedSource === "synth" || !sourceConfig ? "current" : ""}`.trim();
      synthPill.textContent = sourceConfig?.selectedSource === "synth" || !sourceConfig ? "현재: synth" : "synth";
      sourceStack.appendChild(synthPill);

      const previewPill = document.createElement("div");
      previewPill.className = `source-pill preview ${sourceConfig?.selectedSource === "preview" ? "current" : ""}`.trim();
      previewPill.textContent = preferredPreview
        ? (sourceConfig?.selectedSource === "preview" ? `현재: ${preferredPreview.title}` : `Freesound: ${preferredPreview.title}`)
        : "Freesound: 준비 중";
      sourceStack.appendChild(previewPill);

      const emojiRow = document.createElement("div");
      emojiRow.className = "emoji-row";

      let profileRow = null;
      if (profilePills.length) {
        profileRow = document.createElement("div");
        profileRow.className = "profile-row";
        profilePills.forEach((pill) => {
          const chip = document.createElement("div");
          chip.className = "profile-pill";
          chip.textContent = pill;
          profileRow.appendChild(chip);
        });
      }

      let profileNote = null;
      if (profile?.note) {
        profileNote = document.createElement("div");
        profileNote.className = "profile-note";
        profileNote.textContent = profile.note;
      }

      entry.emojis.forEach((emoji) => {
        const button = document.createElement("button");
        button.className = "emoji-pill";
        button.type = "button";
        button.textContent = emoji;
        button.title = `${emoji} 듣기`;
        button.addEventListener("click", () => {
          const plan = buildEmojiSoundPlan([emoji]);
          void playPlan(plan, `${emoji} · ${entry.effectId}`);
        });
        emojiRow.appendChild(button);
      });

      const tuningGrid = document.createElement("div");
      tuningGrid.className = "tuning-grid";

      const tuningTitle = document.createElement("div");
      tuningTitle.className = "tuning-title";
      tuningTitle.textContent = "Demo Tuning";
      tuningGrid.appendChild(tuningTitle);

      const controls = TUNING_CONTROLS.map((config) => createTuningControl(entry.effectId, config));
      controls.forEach((control) => tuningGrid.appendChild(control.wrap));

      const actions = document.createElement("div");
      actions.className = "actions";

      const playEffectBtn = document.createElement("button");
      playEffectBtn.className = "primary";
      playEffectBtn.type = "button";
      playEffectBtn.textContent = "synth 듣기";
      playEffectBtn.addEventListener("click", () => {
        const sampleEmoji = entry.emojis[0];
        const plan = buildEmojiSoundPlan([sampleEmoji]);
        void playPlan(plan, `${sampleEmoji} · ${entry.effectId}`);
      });

      const playPreviewBtn = document.createElement("button");
      playPreviewBtn.className = "secondary";
      playPreviewBtn.type = "button";
      playPreviewBtn.textContent = preferredPreview ? "Freesound 듣기" : "preview 준비 중";
      playPreviewBtn.disabled = !preferredPreview;

      const previewAudio = createPreviewAudio(entry.effectId, preferredPreview);

      playPreviewBtn.addEventListener("click", () => {
        if (!previewAudio || !preferredPreview) return;
        stopPlayback();
        previewAudio.currentTime = 0;
        previewAudio.play().catch((error) => {
          console.warn("Preview playback failed:", error);
          setStatus(`Freesound 재생 실패 · ${entry.effectId}`);
        });
      });

      const playSequenceBtn = document.createElement("button");
      playSequenceBtn.className = "secondary";
      playSequenceBtn.type = "button";
      playSequenceBtn.textContent = "묶음 재생";
      playSequenceBtn.addEventListener("click", () => {
        const sample = entry.emojis.slice(0, 3);
        const plan = buildEmojiSoundPlan(sample);
        void playPlan(plan, `${sample.join(" ")} · 묶음`);
      });

      const miniActions = document.createElement("div");
      miniActions.className = "mini-actions";

      const resetBtn = document.createElement("button");
      resetBtn.className = "ghost tiny";
      resetBtn.type = "button";
      resetBtn.textContent = "슬라이더 초기화";
      resetBtn.addEventListener("click", () => {
        const next = resetEffectTuning(entry.effectId);
        controls.forEach((control, index) => {
          const config = TUNING_CONTROLS[index];
          control.input.value = String(next[config.key]);
          control.value.textContent = formatTuningValue(config.key, next[config.key]);
        });
      });

      miniActions.appendChild(resetBtn);

      actions.appendChild(playEffectBtn);
      actions.appendChild(playPreviewBtn);
      actions.appendChild(playSequenceBtn);

      card.appendChild(badgeRow);
      card.appendChild(meta);
      if (profileRow) card.appendChild(profileRow);
      if (profileNote) card.appendChild(profileNote);
      card.appendChild(sourceStack);
      card.appendChild(emojiRow);
      card.appendChild(tuningGrid);
      card.appendChild(miniActions);
      card.appendChild(actions);

      if (preferredPreview && previewAudio) {
        const previewWrap = document.createElement("div");
        previewWrap.className = "preview-wrap";
        previewWrap.innerHTML = `
          <div class="preview-meta">${escapeHtml(preferredPreview.title)} · ${escapeHtml(preferredPreview.subtitle)}</div>
          <div class="preview-note">${escapeHtml(preferredPreview.note || "Paired Freesound preview")}</div>
          <a class="preview-link" href="${escapeHtml(preferredPreview.sourceUrl)}" target="_blank" rel="noreferrer">Freesound 원본 보기</a>
        `;
        previewWrap.appendChild(previewAudio);
        card.appendChild(previewWrap);
      }

      if (comparisonNote || extraPreviews.length) {
        const comparisonWrap = document.createElement("div");
        comparisonWrap.className = "preview-wrap";

        if (comparisonNote) {
          const note = document.createElement("div");
          note.className = "comparison-note";
          note.textContent = comparisonNote;
          comparisonWrap.appendChild(note);
        }

        if (extraPreviews.length) {
          const list = document.createElement("div");
          list.className = "preview-candidate-list";

          extraPreviews.forEach((preview) => {
            const candidate = document.createElement("div");
            candidate.className = "preview-candidate";

            const head = document.createElement("div");
            head.className = "preview-candidate-head";

            const metaWrap = document.createElement("div");
            const title = document.createElement("div");
            title.className = "preview-candidate-title";
            title.textContent = preview.title;

            if (preview.id === sourceConfig?.preferredPreviewId) {
              const badge = document.createElement("span");
              badge.className = "preview-badge";
              badge.textContent = sourceConfig?.selectedSource === "preview" ? "현재 채택" : "대표 preview";
              title.appendChild(document.createTextNode(" "));
              title.appendChild(badge);
            }

            const subtitle = document.createElement("div");
            subtitle.className = "preview-candidate-subtitle";
            subtitle.textContent = preview.subtitle;
            metaWrap.appendChild(title);
            metaWrap.appendChild(subtitle);

            const playBtn = document.createElement("button");
            playBtn.className = "ghost tiny";
            playBtn.type = "button";
            playBtn.textContent = "후보 듣기";

            const audio = createPreviewAudio(entry.effectId, preview);
            playBtn.addEventListener("click", () => {
              if (!audio) return;
              stopPlayback();
              audio.currentTime = 0;
              audio.play().catch((error) => {
                console.warn("Preview playback failed:", error);
                setStatus(`Freesound 재생 실패 · ${entry.effectId}`);
              });
            });

            head.appendChild(metaWrap);
            head.appendChild(playBtn);

            const note = document.createElement("div");
            note.className = "preview-candidate-note";
            note.textContent = preview.note || "추가 Freesound 후보";

            candidate.appendChild(head);
            candidate.appendChild(note);
            if (audio) {
              candidate.appendChild(audio);
            }

            const link = document.createElement("a");
            link.className = "preview-link";
            link.href = preview.sourceUrl;
            link.target = "_blank";
            link.rel = "noreferrer";
            link.textContent = "Freesound 원본 보기";
            candidate.appendChild(link);

            list.appendChild(candidate);
          });

          comparisonWrap.appendChild(list);
        }

        card.appendChild(comparisonWrap);
      }

      root.appendChild(card);
    });
  }

  function renderEmojiGrid() {
    const root = $("emojiGrid");
    if (!root) return;

    root.innerHTML = "";
    const entries = Object.entries(EMOJI_SOUND_MAP.emojiEffects || {})
      .sort((a, b) => {
        const aFeatured = FEATURED_EFFECT_IDS.has(a[1]) ? 0 : 1;
        const bFeatured = FEATURED_EFFECT_IDS.has(b[1]) ? 0 : 1;
        return aFeatured - bFeatured || a[0].localeCompare(b[0]);
      });

    entries.forEach(([emoji, effectId]) => {
      const button = document.createElement("button");
      button.className = "emoji-card";
      button.type = "button";
      button.innerHTML = `
        <span class="glyph">${emoji}</span>
        <span class="label">PLAY</span>
        <span class="effect">${effectId}</span>
      `;
      button.addEventListener("click", () => {
        const plan = buildEmojiSoundPlan([emoji]);
        void playPlan(plan, `${emoji} · ${effectId}`);
      });
      root.appendChild(button);
    });
  }

  function randomSequence() {
    const emojis = Object.keys(EMOJI_SOUND_MAP.emojiEffects || {});
    const count = 4 + Math.floor(Math.random() * 4);
    const result = [];

    for (let index = 0; index < count; index += 1) {
      result.push(emojis[Math.floor(Math.random() * emojis.length)]);
    }

    return result.join("");
  }

  function bindControls() {
    $("composer")?.addEventListener("input", updateComposerPreview);

    $("playInputBtn")?.addEventListener("click", async () => {
      const emojis = updateComposerPreview();
      const plan = buildEmojiSoundPlan(emojis);
      await playPlan(plan, getSequenceLabel(plan));
    });

    $("randomBtn")?.addEventListener("click", () => {
      const composer = $("composer");
      if (!composer) return;
      composer.value = randomSequence();
      const emojis = updateComposerPreview();
      const plan = buildEmojiSoundPlan(emojis);
      void playPlan(plan, `랜덤 · ${getSequenceLabel(plan)}`);
    });

    $("stopBtn")?.addEventListener("click", () => {
      stopPlayback();
      stopAllSynthVoices("정지됨");
      setStatus("정지됨");
    });
  }

  function hydrateStats() {
    const emojiCount = Object.keys(EMOJI_SOUND_MAP.emojiEffects || {}).length;
    const effectCount = Object.keys(EMOJI_SOUND_MAP.effects || {}).length;
    const previewPairCount = countPreviewPairs();

    if ($("emojiCount")) $("emojiCount").textContent = String(emojiCount);
    if ($("effectCount")) $("effectCount").textContent = String(effectCount);
    if ($("fallbackId")) $("fallbackId").textContent = EMOJI_SOUND_MAP.fallbackEffectId || "-";
    if ($("previewPairCount")) $("previewPairCount").textContent = String(previewPairCount);
  }

  document.addEventListener("DOMContentLoaded", () => {
    hydrateStats();
    renderEffectGrid();
    renderEmojiGrid();
    bindSynthController();
    bindControls();
    updateComposerPreview();
    setStatus("대기 중");
  });
})();
