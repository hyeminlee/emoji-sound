# 리서치 노트

이 프로젝트는 “표준 이모지-사운드 DB”를 찾는 대신, 연구 근거가 있는 설계 방향을 택합니다.

## 핵심 근거

### 1. 이모지의 감정값은 이미 수치화되어 있다
- Emoji-Dis (2025): 얼굴 이모지 112개를 13개 세부 감정 차원으로 평가  
  출처: https://www.nature.com/articles/s41597-025-05682-6
- Emoji-SP (2023 issue; paper accepted 2022): 이모지 1031개에 대해 valence, arousal, familiarity, clarity, complexity, usage 평가  
  출처: https://pmc.ncbi.nlm.nih.gov/articles/PMC10250465/

### 2. 비음성 UI 사운드 설계에는 이미 HCI 전통이 있다
- Earcons and Icons: Their Structure and Common Design Principles (1989)  
  출처: https://www.tandfonline.com/doi/abs/10.1207/s15327051hci0401_1
- Auditory Icons: Using Sound in Computer Interfaces (1986)  
  출처: https://www.tandfonline.com/doi/abs/10.1207/s15327051hci0202_3
- The SonicFinder: An Interface That Uses Auditory Icons (1989)  
  출처: https://www.tandfonline.com/doi/abs/10.1207/s15327051hci0401_3

### 3. 이모지 소리화는 접근성 측면에서도 의미가 있다
- Emotion Sonification As Opportunity For Inclusive Texting: Replacing Emoji With Vocal Bursts And Prosodic Voices (NordiCHI 2024)  
  DOI: https://doi.org/10.1145/3679318.3685403  
  서지 링크: https://dblp.org/rec/conf/nordichi/HuberS24

### 4. 오디오는 제어 가능해야 한다
- W3C Understanding SC 1.4.2 Audio Control  
  출처: https://www.w3.org/WAI/WCAG21/Understanding/audio-control

## 설계 번역

현재 저장소는 아래 네 가지 규칙을 기본으로 씁니다.

1. 각성도가 높을수록 더 빠른 어택, 더 많은 움직임, 더 강한 리듬 에너지로 보냅니다.
2. 긍정도가 높을수록 더 밝고 가볍고 약간 높은 피치로 보냅니다.
3. 얼굴/감정 이모지는 earcon 또는 보이스 제스처에 더 가깝게 설계합니다.
4. 사물/행동 이모지는 auditory icon 또는 짧은 stylized SFX 쪽으로 설계합니다.

## 현재 구현 방향

- `emoji-sound-map.js`의 `effectProfiles`가 각 effect의 감정 기반 프로필을 저장합니다.
- 데모 카드에서는 family, design mode, 그리고 valence/arousal/brightness 성격을 칩으로 보여줍니다.
- 장기 목표는 전체 이모지 커버리지이며, 지금은 감정군과 의미 카테고리 단위로 확장하고 있습니다.

## 제품 제약

연구와 접근성 가이드 모두 이모지 사운드가 너무 무겁지 않아야 한다고 봅니다.
- 짧아야 하고
- 중단 가능해야 하고
- 음성보다 우선순위가 낮아야 하고
- 사용자가 제어할 수 있어야 합니다

그래서 현재 데모는 기본적으로 “이모지 가족당 짧은 제스처 하나”를 우선하고, 긴 사실음 Foley는 선택적 경로로 둡니다.
