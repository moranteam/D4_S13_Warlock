// ============================================================
// D4 SPRITE MAP
// Real Diablo IV item, skill, gem, rune icons sourced from the
// Maxroll Dread Claws Warlock build guide sprite sheets.
//
// Sprite WebPs downloaded to ./icons/maxroll/ on 2026-05-21 from:
//   https://assets-ng.maxroll.gg/d4-tools/static/media/items.1609a2b9.webp
//   https://assets-ng.maxroll.gg/d4-tools/static/media/skills.947830fe.webp
//   https://assets-ng.maxroll.gg/d4-tools/static/media/gems.70f16a4e.webp
//
// Per-item background-position values harvested directly from the
// rendered Maxroll page via Playwright on 2026-05-21. Credit:
// Maxroll.gg (https://maxroll.gg/d4) for the artwork.
//
// Native tile sizes:
//   items sprite  320 px wide, 20 px tiles
//   skills sprite 320 px wide, 20 px tiles
//   gems sprite   448 px wide, 28 px tiles (used for the larger
//                                           Stat Priority gear tiles)
// ============================================================

(function () {
  'use strict';

  window.D4_SPRITES = {
    sprites: {
      items:  { url: './icons/maxroll/items.webp',  size: 320, tile: 20 },
      skills: { url: './icons/maxroll/skills.webp', size: 320, tile: 20 },
      gems:   { url: './icons/maxroll/gems.webp',   size: 448, tile: 28 },
    },

    // Small item icons (used in slot cards, rune chips, shard chips)
    // bgPos is stored as positive x, y. Renderer applies the minus sign.
    itemSmall: {
      'Litany of Sable':                  { sprite: 'items', x: 280, y: 8360 },
      'Footfalls of the Waning World':    { sprite: 'items', x: 0,   y: 8200 },
      'Seed of Horazon':                  { sprite: 'items', x: 260, y: 8400 },
      'Temerity':                         { sprite: 'items', x: 260, y: 8460 },
      'Endurant Faith':                   { sprite: 'items', x: 260, y: 8460 },
      'Flickerstep':                      { sprite: 'items', x: 260, y: 8460 },
      'Godslayer Crown':                  { sprite: 'items', x: 260, y: 8460 },
      'Night Terror':                     { sprite: 'items', x: 260, y: 8460 },
      'Seal of the Diamond Mind':         { sprite: 'items', x: 280, y: 8500 },
      // Soul shards / glyphs
      'Mastermind':                       { sprite: 'items', x: 260, y: 8520 },
      'Unbound':                          { sprite: 'items', x: 180, y: 8520 },
      'Abyssal':                          { sprite: 'items', x: 20,  y: 8540 },
      'Demonologist':                     { sprite: 'items', x: 20,  y: 8540 },
      'Destruction':                      { sprite: 'items', x: 20,  y: 8540 },
      // Runes
      'Igni':                             { sprite: 'items', x: 100, y: 6280 },
      'Prid':                             { sprite: 'items', x: 20,  y: 8340 },
    },

    // Larger gear tiles (used in the Stat Priority style loadout cards)
    // From the gems.webp sprite which is actually a high-res gear sprite.
    itemLarge: {
      'Litany of Sable':                  { sprite: 'gems', x: 252, y: 0   },
      'Heir of Perdition':                { sprite: 'gems', x: 168, y: 140 },
      'Seed of Horazon':                  { sprite: 'gems', x: 140, y: 28  },
      'Ring of Starless Skies':           { sprite: 'gems', x: 168, y: 252 },
      'Tyrael\'s Might':                  { sprite: 'gems', x: 364, y: 224 },
      // Aspects shown as the slot tile in Stat Priority view
      'Aspect of Calamity':               { sprite: 'gems', x: 168, y: 56  },
      'Calamity':                         { sprite: 'gems', x: 168, y: 56  },
      'Crushing':                         { sprite: 'gems', x: 168, y: 252 },
      'Fortress':                         { sprite: 'gems', x: 56,  y: 196 },
      'Edgemaster\'s':                    { sprite: 'gems', x: 168, y: 56  },
      'Heavenly Strength':                { sprite: 'gems', x: 252, y: 28  },
      'Juggernaut\'s':                    { sprite: 'gems', x: 308, y: 28  },
      'Protecting':                       { sprite: 'gems', x: 168, y: 140 },
      'Aggressive':                       { sprite: 'gems', x: 252, y: 0   },
      'Rallying Reversal':                { sprite: 'gems', x: 140, y: 28  },
    },

    // Skill icons (skill bar, mercenary skills, etc.)
    skills: {
      'Dread Claws':                      { sprite: 'skills', x: 280, y: 540 },
      'Enveloping Terror':                { sprite: 'skills', x: 280, y: 540 },
      'Encircling Terror':                { sprite: 'skills', x: 280, y: 540 },
      'Abyssal Titan':                    { sprite: 'skills', x: 180, y: 560 },
      'Rampage':                          { sprite: 'skills', x: 140, y: 560 },
      'Profane Sentinel':                 { sprite: 'skills', x: 280, y: 560 },
      'Command Laalish':                  { sprite: 'skills', x: 80,  y: 600 },
      'Summon Laalish':                   { sprite: 'skills', x: 80,  y: 600 },
      'Nether Step':                      { sprite: 'skills', x: 120, y: 560 },
      'Shadow Recall':                    { sprite: 'skills', x: 120, y: 560 },
      'Metamorphosis':                    { sprite: 'skills', x: 280, y: 580 },
      'Terror Demon':                     { sprite: 'skills', x: 300, y: 580 },
      'Command Fallen':                   { sprite: 'skills', x: 220, y: 520 },
      'Dark Prison':                      { sprite: 'skills', x: 80,  y: 560 },
      'Sigil of Summons':                 { sprite: 'skills', x: 0,   y: 580 },
      'Sigil of Subversion':              { sprite: 'skills', x: 100, y: 580 },
      'Evade':                            { sprite: 'skills', x: 60,  y: 1080 },
      // Mercenary skills
      'Inspiration':                      { sprite: 'skills', x: 140, y: 620 },
      'Field of Languish':                { sprite: 'skills', x: 20,  y: 660 },
      'Taste of Flesh':                   { sprite: 'skills', x: 200, y: 640 },
    },

    attribution: 'Item, skill, and gear sprite art credit: Maxroll.gg D4 build guides.',
  };
})();
