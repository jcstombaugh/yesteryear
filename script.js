const revealSections = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const primaryList = document.querySelector('[data-primary-list]');
const primaryChoices = Array.from(document.querySelectorAll('.primary-choice'));
const followupPanel = document.querySelector('[data-followup-panel]');
const followupQuestion = document.querySelector('[data-followup-question]');
const followupList = document.querySelector('[data-followup-list]');
const lingerList = document.querySelector('[data-linger-list]');
const lingerChoices = Array.from(document.querySelectorAll('.linger-choice'));
const promiseFrame = document.querySelector('[data-promise-frame]');
const promiseKicker = document.querySelector('[data-promise-kicker]');
const promiseTitle = document.querySelector('[data-promise-title]');
const promiseDetail = document.querySelector('[data-promise-detail]');
const editTrigger = document.querySelector('[data-edit-trigger]');
const sizeFrame = document.querySelector('[data-size-frame]');
const sizeIntro = document.querySelector('[data-size-intro]');
const sizeChoices = Array.from(document.querySelectorAll('.size-choice'));
const editFrame = document.querySelector('[data-edit-frame]');
const editBridge = document.querySelector('[data-edit-bridge]');
const editSizeSummary = document.querySelector('[data-edit-size-summary]');
const editLede = document.querySelector('[data-edit-lede]');
const editPlaceholder = document.querySelector('[data-edit-placeholder]');
const editPlaceholderCopy = document.querySelector('[data-edit-placeholder-copy]');
const editSequence = document.querySelector('[data-edit-sequence]');
const pieceNotes = {
  denim: document.querySelector('[data-piece-note="denim"]'),
  coat: document.querySelector('[data-piece-note="coat"]'),
  loafer: document.querySelector('[data-piece-note="loafer"]'),
};
const pieceBoutiques = {
  denim: document.querySelector('[data-piece-boutique="denim"]'),
  coat: document.querySelector('[data-piece-boutique="coat"]'),
  loafer: document.querySelector('[data-piece-boutique="loafer"]'),
};
const pieceYears = {
  denim: document.querySelector('[data-piece-year="denim"]'),
  coat: document.querySelector('[data-piece-year="coat"]'),
  loafer: document.querySelector('[data-piece-year="loafer"]'),
};
const sizeMeta = {
  bottoms: document.querySelector('[data-size-meta="bottoms"]'),
  outerwear: document.querySelector('[data-size-meta="outerwear"]'),
  shoe: document.querySelector('[data-size-meta="shoe"]'),
};
const editPieces = Array.from(document.querySelectorAll('.edit-piece'));

const translationData = {
  feeling: {
    followupQuestion: 'And which way does it lean?',
    followups: {
      quiet: {
        label: 'Quiet',
        bridge: 'For the feeling, kept quiet',
        lede: 'A first edit built around washed denim, dark wool, and a finish that stays low-volume.',
        pieces: {
          denim: 'Start with the straight leg: soft in wash, exact in line.',
          coat: 'Then the coat, long enough to hold the mood without hardening it.',
          loafer: 'Finish with the dark shoe that keeps everything nearly silent.',
        },
      },
      pointed: {
        label: 'Pointed',
        bridge: 'For the feeling, with an edge',
        lede: 'A first edit that stays restrained but lets the finish bite a little harder.',
        pieces: {
          denim: 'The straight leg stays clean so the sharper finish can register.',
          coat: 'The coat keeps the look severe enough to hold that edge.',
          loafer: 'Let the dark shoe do the pointed work at the end of the line.',
        },
      },
      harder: {
        label: 'Harder to name',
        bridge: 'For the feeling that stays unresolved',
        lede: 'A first edit built around atmosphere first: long outerwear, washed denim, and a dark close.',
        pieces: {
          denim: 'Keep the denim quiet and let it hold the space beneath the coat.',
          coat: 'Start here: the longest, moodiest move in the edit.',
          loafer: 'Close it with a dark finish that stays just short of explicit.',
        },
      },
    },
  },
  fit: {
    followupQuestion: 'And how does it want to sit?',
    followups: {
      layered: {
        label: 'Layered',
        bridge: 'For proportion, with a layer',
        lede: 'A first edit that begins with the coat and lets the rest stay disciplined beneath it.',
        pieces: {
          denim: 'The trouser keeps the base line calm once the coat is in place.',
          coat: 'Start with the outer layer that gives the silhouette its architecture.',
          loafer: 'The shoe stays quiet and keeps the hem disciplined.',
        },
      },
      main: {
        label: 'Main event',
        bridge: 'For proportion, led by the trouser',
        lede: 'A first edit centered on length, break, and the calm authority of a straight leg.',
        pieces: {
          denim: 'Start with the piece doing the real work: a straight leg with the right break.',
          coat: 'Then add the coat as structure, not as the headline.',
          loafer: 'Finish with a dark shoe that respects the hem.',
        },
      },
      long: {
        label: 'Long and clean',
        bridge: 'For proportion, kept long and clean',
        lede: 'A first edit with no unnecessary interruption: a long line, a dark finish, and a quieter coat.',
        pieces: {
          denim: 'The straight leg comes first because it sets the uninterrupted line.',
          coat: 'The coat stays long and subordinate to the silhouette it is joining.',
          loafer: 'The shoe stays close to the floor and keeps the look exact.',
        },
      },
    },
  },
  texture: {
    followupQuestion: 'Where is the pull?',
    followups: {
      denim: {
        label: 'Washed denim',
        bridge: 'For the texture of washed denim',
        lede: 'A first edit built from faded blue, dense black, and a dark polished finish.',
        pieces: {
          denim: 'Start with the washed denim. It gives the world its softness without losing line.',
          coat: 'The coat adds weight against the worn surface underneath.',
          loafer: 'The leather finish closes the palette without brightening it.',
        },
      },
      wool: {
        label: 'Dense wool',
        bridge: 'For the weight of wool',
        lede: 'A first edit with the coat doing the heaviest work, then denim and leather falling into place beneath it.',
        pieces: {
          denim: 'The denim stays lighter so the coat can hold the main weight.',
          coat: 'Start here: dense, dark, and heavy enough to set the temperature.',
          loafer: 'The shoe keeps the finish polished without thinning the mood.',
        },
      },
      leather: {
        label: 'Dark leather',
        bridge: 'For the finish of dark leather',
        lede: 'A first edit that begins at the finish: dark leather, clean denim, and a coat that stays severe.',
        pieces: {
          denim: 'The denim stays clean so the leather can feel deliberate, not loud.',
          coat: 'The coat gives the leather somewhere disciplined to land.',
          loafer: 'Start with the dark leather finish that makes the whole look click into place.',
        },
      },
    },
  },
  composition: {
    followupQuestion: 'What keeps it together?',
    followups: {
      solid: {
        label: 'Solid',
        bridge: 'For a solid composition',
        lede: 'A first edit that reads as one system: straight denim, long coat, dark finish.',
        pieces: {
          denim: 'The straight leg establishes the single line everything else can follow.',
          coat: 'The coat sits on top of the composition without interrupting it.',
          loafer: 'The dark shoe finishes the line instead of announcing itself.',
        },
      },
      layered: {
        label: 'Layered',
        bridge: 'For a layered composition',
        lede: 'A first edit where the coat does the framing and the other pieces stay in supporting roles.',
        pieces: {
          denim: 'The trouser keeps the base plain enough for layering to read clearly.',
          coat: 'Start with the framing piece: long, dark, and architectural.',
          loafer: 'The shoe stays spare so the layering can hold attention.',
        },
      },
      pointed: {
        label: 'Pointed',
        bridge: 'For a composition with a point',
        lede: 'A first edit that stays minimal but lets one sharper finish make the system legible.',
        pieces: {
          denim: 'The denim stays calm so the sharper note feels chosen, not accidental.',
          coat: 'The coat keeps the composition severe enough to support that point.',
          loafer: 'The pointed finish gives the whole look its last bit of definition.',
        },
      },
    },
  },
  piece: {
    followupQuestion: 'Which piece did you notice?',
    followups: {
      trouser: {
        label: 'The trouser',
        bridge: 'For the piece you noticed first: the trouser',
        lede: 'A first edit led by the straight leg, with the coat and shoe kept in service to it.',
        pieces: {
          denim: 'This is the line you noticed first: straight, washed, and calm enough to carry the whole look.',
          coat: 'The coat sharpens the trouser instead of competing with it.',
          loafer: 'The shoe closes the hem without taking the eye away from the denim.',
        },
      },
      coat: {
        label: 'The coat',
        bridge: 'For the piece you noticed first: the coat',
        lede: 'A first edit led by long outerwear, then held steady by denim and a dark shoe.',
        pieces: {
          denim: 'The denim stays spare so the coat can hold the center of gravity.',
          coat: 'This is the piece you noticed first: long, dark, and decisive without noise.',
          loafer: 'The shoe keeps the finish clean and secondary.',
        },
      },
      shoe: {
        label: 'The shoe',
        bridge: 'For the piece you noticed first: the shoe',
        lede: 'A first edit led by the dark finish, with clean denim and a long coat to support it.',
        pieces: {
          denim: 'The denim stays exact so the shoe can feel deliberate, not decorative.',
          coat: 'The coat gives the finish enough severity to matter.',
          loafer: 'This is the piece you noticed first: dark, controlled, and enough to tilt the whole look.',
        },
      },
    },
  },
  nothing: {
    followupQuestion: 'Where should we begin?',
    followups: {
      trouser: {
        label: 'With the trouser',
        bridge: 'A slower beginning: the trouser first',
        lede: 'A first edit that starts with the straight leg before it widens into coat and shoe.',
        pieces: {
          denim: 'Start here. The straight leg is the easiest way into the world.',
          coat: 'Then add the coat once the line feels familiar.',
          loafer: 'Finish with the shoe once the rest has settled.',
        },
      },
      coat: {
        label: 'With the coat',
        bridge: 'A slower beginning: the coat first',
        lede: 'A first edit that begins with outerwear and lets the rest of the world arrive more slowly.',
        pieces: {
          denim: 'The denim keeps the base simple so the coat can do the leading.',
          coat: 'Start here if you want the world in one decisive move.',
          loafer: 'The shoe comes in last and keeps the finish grounded.',
        },
      },
      shoe: {
        label: 'With the shoe',
        bridge: 'A slower beginning: the shoe first',
        lede: 'A first edit that begins at the finish, then backs into denim and coat.',
        pieces: {
          denim: 'The denim stays clean so the shoe can quietly set the temperature.',
          coat: 'The coat gives that exactness somewhere darker to land.',
          loafer: 'Start here if the smallest detail is the easiest way in.',
        },
      },
    },
  },
};

const lingerData = {
  railing: {
    promise: 'The line is clearer now. The railing mattered.',
    sizePrompt: 'Tell us the sizes that should carry that structure.',
    bridgeAppend: 'The railing line stayed with you.',
    ledeAppend: 'The edit leans a little more architectural now.',
    featured: 'coat',
    years: { denim: 'c. 1990', coat: '1993', loafer: 'c. 1991' },
    boutiques: {
      denim: 'Amarcord Vintage Fashion / New York',
      coat: 'Amarcord Vintage Fashion / New York',
      loafer: 'Amarcord Vintage Fashion / New York',
    },
    pieces: {
      denim: 'Keep the trousers tonal and high-waisted so the structural line can stay visible.',
      coat: 'What made you linger was the railing line. This coat keeps that architecture intact.',
      loafer: 'The heel stays narrow and dark so the structure does not break at the floor.',
    },
  },
  slingback: {
    promise: 'The line is clearer now. The pointed slingback did some of the talking.',
    sizePrompt: 'Tell us the sizes that should carry that sharper finish.',
    bridgeAppend: 'The pointed slingback stayed with you.',
    ledeAppend: 'The edit finishes a little sharper.',
    featured: 'loafer',
    years: { denim: 'c. 1990', coat: '1993', loafer: 'c. 1991' },
    boutiques: {
      denim: 'Amarcord Vintage Fashion / New York',
      coat: 'Amarcord Vintage Fashion / New York',
      loafer: 'Amarcord Vintage Fashion / New York',
    },
    pieces: {
      denim: 'The trouser stays clean so the pointed finish can register without distraction.',
      coat: 'The coat holds enough severity to support the sharper finish underneath.',
      loafer: 'What made you linger was the pointed slingback. This early-90s Chanel heel keeps that exact note.',
    },
  },
  pink: {
    promise: 'The line is clearer now. The pale pink at the hip softened it.',
    sizePrompt: 'Tell us the sizes that should hold that softer interruption.',
    bridgeAppend: 'The pale pink at the hip stayed with you.',
    ledeAppend: 'The edit keeps a darker line but lets one softer note in.',
    featured: 'denim',
    years: { denim: 'c. 1990', coat: '1993', loafer: 'c. 1991' },
    boutiques: {
      denim: 'Amarcord Vintage Fashion / New York',
      coat: 'Amarcord Vintage Fashion / New York',
      loafer: 'Amarcord Vintage Fashion / New York',
    },
    pieces: {
      denim: 'The tonal Fendi trouser matters here. It keeps the line dark while letting that softer interruption breathe.',
      coat: 'The coat stays dark, but the overall edit no longer feels severe all the way through.',
      loafer: 'The heel remains exact while the rest of the story lets in one gentler note.',
    },
  },
  shoulder: {
    promise: 'The line is clearer now. The bare shoulder changed the temperature.',
    sizePrompt: 'Tell us the sizes that should answer to that sharper, barer silhouette.',
    bridgeAppend: 'The bare shoulder against the street stayed with you.',
    ledeAppend: 'The edit feels a little barer and a little more severe.',
    featured: 'coat',
    years: { denim: 'c. 1990', coat: '1993', loafer: 'c. 1991' },
    boutiques: {
      denim: 'Amarcord Vintage Fashion / New York',
      coat: 'Amarcord Vintage Fashion / New York',
      loafer: 'Amarcord Vintage Fashion / New York',
    },
    pieces: {
      denim: 'The trouser is there to keep the black from going too polished.',
      coat: 'What made you linger was the bare shoulder against the street. This coat keeps that severity in a longer line.',
      loafer: 'The heel keeps the silhouette sharp and deliberate.',
    },
  },
  bob: {
    promise: 'The line is clearer now. The short dark bob kept it human.',
    sizePrompt: 'Tell us the sizes that should keep that intimacy without losing the line.',
    bridgeAppend: 'The short dark bob and earring stayed with you.',
    ledeAppend: 'The edit stays precise but a little less remote.',
    featured: 'denim',
    years: { denim: 'c. 1990', coat: '1993', loafer: 'c. 1991' },
    boutiques: {
      denim: 'Amarcord Vintage Fashion / New York',
      coat: 'Amarcord Vintage Fashion / New York',
      loafer: 'Amarcord Vintage Fashion / New York',
    },
    pieces: {
      denim: 'The trouser keeps the look lived-in enough to hold that human note.',
      coat: 'The coat stays strict, but not cold.',
      loafer: 'The heel finishes the line without taking all the attention.',
    },
  },
};

let revealObserver = null;
let resolutionTimer;
let currentPrimary = null;
let currentSecondary = null;
let currentLinger = null;
const selectedSizes = {
  bottoms: null,
  outerwear: null,
  shoe: null,
};

const allPieces = ['denim', 'coat', 'loafer'];

const hasCoreSignal = () => Boolean(currentPrimary && currentSecondary);
const hasFullTasteSignal = () => Boolean(currentPrimary && currentSecondary && currentLinger);
const hasFullSizeSignal = () => Object.values(selectedSizes).every(Boolean);
const getBaseConfig = () => translationData[currentPrimary]?.followups[currentSecondary];
const getLingerConfig = () => lingerData[currentLinger];
const getSizeProfileText = () =>
  `Bottoms ${selectedSizes.bottoms} / Outerwear ${selectedSizes.outerwear} / Shoe ${selectedSizes.shoe}`;

const reorderPieces = (featuredPiece) => {
  const order = [featuredPiece, ...allPieces.filter((piece) => piece !== featuredPiece)];

  order.forEach((piece) => {
    const element = editPieces.find((item) => item.dataset.piece === piece);
    if (element) {
      editSequence.appendChild(element);
    }
  });
};

const markSelected = (buttons, selectedButton) => {
  buttons.forEach((button) => {
    const isSelected = button === selectedButton;
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });
};

const setPromiseState = (kicker, title, detail, enabled = false) => {
  promiseKicker.textContent = kicker;
  promiseTitle.textContent = title;
  promiseDetail.textContent = detail;
  editTrigger.disabled = !enabled;
};

const lockEdit = (placeholderText) => {
  editFrame.classList.add('is-locked');
  editFrame.classList.remove('is-ready');
  editSequence.hidden = true;
  editPlaceholder.hidden = false;
  editPlaceholderCopy.textContent = placeholderText;
};

const unlockEdit = () => {
  editFrame.classList.remove('is-locked');
  editFrame.classList.add('is-ready');
  editPlaceholder.hidden = true;
  editSequence.hidden = false;

  const hiddenReveals = editSequence.querySelectorAll('.reveal');

  if (reduceMotion) {
    hiddenReveals.forEach((section) => section.classList.add('is-visible'));
    return;
  }

  hiddenReveals.forEach((section) => {
    revealObserver?.observe(section);
    if (section.getBoundingClientRect().top < window.innerHeight * 0.92) {
      section.classList.add('is-visible');
    }
  });
};

const syncSizeSummary = () => {
  if (!hasFullSizeSignal()) {
    editSizeSummary.hidden = true;
    sizeMeta.bottoms.textContent = 'size pending';
    sizeMeta.outerwear.textContent = 'size pending';
    sizeMeta.shoe.textContent = 'size pending';
    return;
  }

  editSizeSummary.hidden = false;
  editSizeSummary.textContent = getSizeProfileText();
  sizeMeta.bottoms.textContent = `size ${selectedSizes.bottoms}`;
  sizeMeta.outerwear.textContent = `size ${selectedSizes.outerwear}`;
  sizeMeta.shoe.textContent = `US ${selectedSizes.shoe}`;
};

const applyEditCopy = () => {
  if (!hasFullTasteSignal()) {
    return;
  }

  const baseConfig = getBaseConfig();
  const lingerConfig = getLingerConfig();

  editBridge.textContent = `${baseConfig.bridge} ${lingerConfig.bridgeAppend}`;
  editLede.textContent = `${baseConfig.lede} ${lingerConfig.ledeAppend}`;

  pieceNotes.denim.textContent = lingerConfig.pieces.denim || baseConfig.pieces.denim;
  pieceNotes.coat.textContent = lingerConfig.pieces.coat || baseConfig.pieces.coat;
  pieceNotes.loafer.textContent = lingerConfig.pieces.loafer || baseConfig.pieces.loafer;

  pieceYears.denim.textContent = lingerConfig.years.denim;
  pieceYears.coat.textContent = lingerConfig.years.coat;
  pieceYears.loafer.textContent = lingerConfig.years.loafer;

  pieceBoutiques.denim.textContent = lingerConfig.boutiques.denim;
  pieceBoutiques.coat.textContent = lingerConfig.boutiques.coat;
  pieceBoutiques.loafer.textContent = lingerConfig.boutiques.loafer;

  reorderPieces(lingerConfig.featured);
};

const maybeResolveEdit = () => {
  if (!hasFullTasteSignal()) {
    lockEdit('Stay with the world a little longer and the edit will answer back.');
    return;
  }

  if (!hasFullSizeSignal()) {
    lockEdit('Tell us the sizes it has to answer to, and the first edit can land.');
    return;
  }

  clearTimeout(resolutionTimer);
  applyEditCopy();
  syncSizeSummary();
  lockEdit('Pulling the first edit from the line, the linger, and the fit.');
  setPromiseState('Reading', 'Your edit is taking shape.', `Built around ${getSizeProfileText().toLowerCase()}.`, true);

  resolutionTimer = window.setTimeout(() => {
    unlockEdit();
    setPromiseState('Good', 'Your edit is ready.', `Built around ${getSizeProfileText().toLowerCase()}.`, true);
  }, reduceMotion ? 0 : 850);
};

const buildFollowupChoices = (primaryKey) => {
  const followups = translationData[primaryKey].followups;

  followupList.innerHTML = '';
  followupList.classList.remove('has-selection');

  Object.entries(followups).forEach(([id, config]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice followup-choice';
    button.dataset.followup = id;
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = `<span class="choice-text">${config.label}</span>`;
    button.addEventListener('click', () => handleFollowupSelect(button, primaryKey, id));
    followupList.appendChild(button);
  });
};

const handlePrimarySelect = (button) => {
  const primaryKey = button.dataset.signal;

  currentPrimary = primaryKey;
  currentSecondary = null;
  currentLinger = null;
  clearTimeout(resolutionTimer);

  primaryList.classList.add('has-selection');
  markSelected(primaryChoices, button);

  followupPanel.hidden = false;
  followupQuestion.textContent = translationData[primaryKey].followupQuestion;
  buildFollowupChoices(primaryKey);

  lingerList.classList.remove('has-selection');
  lingerChoices.forEach((choice) => {
    choice.classList.remove('is-selected');
    choice.setAttribute('aria-pressed', 'false');
  });

  setPromiseState('Closer', 'Your edit is almost there.', 'One more note from the world, then the line can answer back.', false);
  sizeIntro.textContent = 'Tell us the shape it has to meet, and the first edit can stop being abstract.';
  lockEdit('Stay with the world a little longer and the edit will answer back.');
};

const handleFollowupSelect = (button, primaryKey, secondaryKey) => {
  const followupButtons = Array.from(followupList.querySelectorAll('.followup-choice'));

  currentSecondary = secondaryKey;
  markSelected(followupButtons, button);

  setPromiseState('Closer', 'Your edit is almost there.', 'Two clearer notes and the line can answer back.', false);
  lockEdit('There is still one more thing the world needs to know.');
};

const handleLingerSelect = (button) => {
  const lingerKey = button.dataset.linger;
  const lingerConfig = lingerData[lingerKey];

  if (!hasCoreSignal()) {
    return;
  }

  currentLinger = lingerKey;
  lingerList.classList.add('has-selection');
  markSelected(lingerChoices, button);

  applyEditCopy();
  setPromiseState('Closer', 'Your edit is almost there.', lingerConfig.promise, true);
  sizeIntro.textContent = lingerConfig.sizePrompt;
  lockEdit('Now give the edit its sizes and it can answer back.');
};

const handleSizeSelect = (button) => {
  const group = button.dataset.sizeGroup;
  const value = button.dataset.sizeValue;
  const groupButtons = sizeChoices.filter((choice) => choice.dataset.sizeGroup === group);

  selectedSizes[group] = value;
  markSelected(groupButtons, button);
  syncSizeSummary();

  if (!hasFullTasteSignal()) {
    lockEdit('The fit can wait. First let the world finish speaking.');
    return;
  }

  maybeResolveEdit();
};

const showAllReveals = () => {
  revealSections.forEach((section) => section.classList.add('is-visible'));
};

if (reduceMotion) {
  showAllReveals();
} else {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealSections.forEach((section) => revealObserver.observe(section));
}

primaryChoices.forEach((button) => {
  button.addEventListener('click', () => handlePrimarySelect(button));
});

lingerChoices.forEach((button) => {
  button.addEventListener('click', () => handleLingerSelect(button));
});

sizeChoices.forEach((button) => {
  button.addEventListener('click', () => handleSizeSelect(button));
});

editTrigger.addEventListener('click', () => {
  if (editTrigger.disabled) {
    return;
  }

  sizeFrame.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
});

setPromiseState('Closer', 'Your edit is almost there.', 'One more note from the world, then the line can answer back.', false);
lockEdit('Stay with the world a little longer and the edit will answer back.');
syncSizeSummary();
