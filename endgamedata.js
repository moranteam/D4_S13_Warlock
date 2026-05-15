// ============================================================
// D4 Warlock God Run, Endgame Data Layer (Sprint 4)
// Build: Dread Claws Mastermind Warlock
// Patch: 3.0.2 Lord of Hatred, Season 13
// Reconciled: 2026-05-14
// Sources: Maxroll endgame, Maxroll leveling, Icy Veins, Mobalytics
// Reconciliation: data-sources/endgame/RECONCILIATION-V2.md
// ============================================================

(function () {
  'use strict';

  window.D4_ENDGAME = {
    patch: '3.0.2 Lord of Hatred',
    season: 13,
    compiledAt: '2026-05-14',
    build: 'Dread Claws Mastermind Warlock',
    reconciliationDoc: 'data-sources/endgame/RECONCILIATION-V2.md',

    /* ============================================================
       SECTION HEADERS (emoji + label, used by the renderer)
       ============================================================ */
    sections: {
      weapons:        { emoji: '\u{1F5E1}️', label: 'Weapons' },          // crossed sword
      armor:          { emoji: '\u{1F6E1}️', label: 'Armor' },            // shield
      jewelry:        { emoji: '\u{1F48D}',         label: 'Jewelry' },
      runes:          { emoji: '\u{1F48E}',         label: 'Runes and Sockets' },
      talismans:      { emoji: '\u{1F52E}',         label: 'Talismans' },
      paragon:        { emoji: '\u{1F333}',         label: 'Paragon' },
      glyphs:         { emoji: '\u{1F4DC}',         label: 'Glyphs' },
      tempering:      { emoji: '\u{1F528}',         label: 'Tempering' },
      masterworking:  { emoji: '\u{2B50}',           label: 'Masterworking' },
      mercenaries:    { emoji: '\u{1F464}',         label: 'Mercenaries' },
      soulshards:     { emoji: '\u{1F480}',         label: 'Soul Shards' },
      difficulty:     { emoji: '\u{1F4C8}',         label: 'Difficulty Progression' },
      pit:            { emoji: '\u{1F3AF}',         label: 'Pit' },
      bosses:         { emoji: '\u{1F409}',         label: 'Lair Bosses' },
      warplans:       { emoji: '\u{2694}️',     label: 'War Plans' },
    },

    /* ============================================================
       GEAR PER SLOT (10 slots)
       Each slot: primary item, backup, affixes, aspect, source, tempering,
       masterwork, sockets, confidence.
       ============================================================ */
    gear: {
      helm: {
        slot: 'Helm',
        section: 'armor',
        iconClass: 'fa-shield-halved',
        primary: {
          name: 'Heir of Perdition',
          type: 'Mythic Unique',
          tier: 'BIS',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Critical Strike Chance', mustHave: true },
            { rank: 2, stat: 'Lucky Hit Chance', mustHave: false },
            { rank: 3, stat: 'Willpower', mustHave: false },
            { rank: 4, stat: 'Maximum Life', mustHave: false },
          ],
          aspect: null,
          source: { type: 'Pinnacle Boss', name: 'Duriel or Andariel (Mythic pool)' },
          tempering: 'Natural Resistance (Physical Resistance)',
          masterworkPrimary: 'Critical Strike Chance',
          sockets: 1,
          socketContents: 'Royal Sapphire (Willpower)',
          notes: 'Mythic helm. Build target. Mother\'s Favor mechanic provides 80 percent damage amplification.',
        },
        backup: {
          name: 'Legendary helm with Aspect of the Embowered',
          type: 'Legendary',
          tier: 'Backup',
          confidence: 'MEDIUM',
          affixes: [
            { rank: 1, stat: 'Critical Strike Chance', mustHave: true },
            { rank: 2, stat: 'Lucky Hit Chance', mustHave: false },
            { rank: 3, stat: 'Willpower', mustHave: false },
            { rank: 4, stat: 'Maximum Life', mustHave: false },
          ],
          aspect: 'Aspect of the Embowered',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Natural Resistance (Physical Resistance)',
          masterworkPrimary: 'Critical Strike Chance',
          sockets: 1,
          socketContents: 'Royal Sapphire',
          notes: 'Interim until Heir of Perdition drops.',
        },
      },

      chest: {
        slot: 'Chest',
        section: 'armor',
        iconClass: 'fa-shirt',
        primary: {
          name: 'Legendary Chest, Aspect of Deeper Shadows',
          type: 'Legendary',
          tier: 'BIS',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Maximum Resource', mustHave: true },
            { rank: 2, stat: 'Wrath Regeneration', mustHave: false },
            { rank: 3, stat: 'Willpower', mustHave: false },
            { rank: 4, stat: 'Maximum Life', mustHave: false },
          ],
          aspect: 'Aspect of Deeper Shadows',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Natural Resistance (Lightning Resistance)',
          masterworkPrimary: 'Maximum Resource',
          sockets: 2,
          socketContents: 'Runeword: Neo plus Prid (Dark Prison automation)',
          notes: 'Deeper Shadows increases max Shadowform stacks. Chest sockets reserved for the build defining runeword.',
        },
        backup: {
          name: 'Legendary Chest, Juggernaut\'s Aspect',
          type: 'Legendary',
          tier: 'Defensive Variant',
          confidence: 'MEDIUM',
          affixes: [
            { rank: 1, stat: 'Maximum Resource', mustHave: true },
            { rank: 2, stat: 'All Resistance', mustHave: false },
            { rank: 3, stat: 'Willpower', mustHave: false },
            { rank: 4, stat: 'Maximum Life', mustHave: false },
          ],
          aspect: 'Juggernaut\'s Aspect',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Natural Resistance (Lightning Resistance)',
          masterworkPrimary: 'Maximum Resource',
          sockets: 2,
          socketContents: 'Runeword: Neo plus Prid',
          notes: 'Defensive swap for tankier playstyle. ~30 to 35 percent DR with endgame setup.',
        },
      },

      gloves: {
        slot: 'Gloves',
        section: 'armor',
        iconClass: 'fa-hand',
        primary: {
          name: 'Legendary Gloves, Aspect of Calamity',
          type: 'Legendary',
          tier: 'BIS',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Attack Speed', mustHave: true },
            { rank: 2, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 3, stat: 'Ranks to Dread Claws', mustHave: false },
            { rank: 4, stat: 'Willpower', mustHave: false },
          ],
          aspect: 'Aspect of Calamity',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Worldly Finesse (Critical Strike Damage)',
          masterworkPrimary: 'Attack Speed',
          sockets: 0,
          socketContents: 'No sockets (gloves do not socket in D4)',
          notes: 'Attack Speed primary stat unlocks build damage. No socket budget needed.',
        },
        backup: {
          name: 'Legendary Gloves, Aggressive Aspect',
          type: 'Legendary',
          tier: 'Alt',
          confidence: 'MEDIUM',
          affixes: [
            { rank: 1, stat: 'Attack Speed', mustHave: true },
            { rank: 2, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 3, stat: 'Ranks to Dread Claws', mustHave: false },
            { rank: 4, stat: 'Willpower', mustHave: false },
          ],
          aspect: 'Aggressive Aspect',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Worldly Finesse (Critical Strike Damage)',
          masterworkPrimary: 'Attack Speed',
          sockets: 0,
          socketContents: 'No sockets',
          notes: 'Mobalytics variant offensive aspect.',
        },
      },

      pants: {
        slot: 'Pants',
        section: 'armor',
        iconClass: 'fa-person-walking',
        primary: {
          name: 'Legendary Pants, Aspect of Might',
          type: 'Legendary',
          tier: 'BIS',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Maximum Life', mustHave: true },
            { rank: 2, stat: 'Willpower', mustHave: false },
            { rank: 3, stat: 'Total Armor', mustHave: false },
            { rank: 4, stat: 'All Resistance', mustHave: false },
          ],
          aspect: 'Aspect of Might',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Natural Resistance (Physical Resistance)',
          masterworkPrimary: 'Maximum Life',
          sockets: 2,
          socketContents: 'Runeword: Nagu plus Que (Earthen Bulwark Barrier)',
          notes: 'Aspect of Might provides flat DR. Pants sockets reserved for the second runeword.',
        },
        backup: {
          name: 'Temerity (unique)',
          type: 'Unique',
          tier: 'Defensive Mythic Variant',
          confidence: 'MEDIUM',
          affixes: [
            { rank: 1, stat: 'Maximum Life', mustHave: true },
            { rank: 2, stat: 'Willpower', mustHave: false },
            { rank: 3, stat: 'Total Armor', mustHave: false },
            { rank: 4, stat: 'All Resistance', mustHave: false },
          ],
          aspect: null,
          source: { type: 'Boss Loot', name: 'World drop unique' },
          tempering: 'Natural Resistance (Physical Resistance)',
          masterworkPrimary: 'Maximum Life',
          sockets: 2,
          socketContents: 'Grand Sapphire',
          notes: 'Mobalytics variant. Converts overhealing to Barrier. Defensive option.',
        },
      },

      boots: {
        slot: 'Boots',
        section: 'armor',
        iconClass: 'fa-shoe-prints',
        primary: {
          name: 'Footfalls of the Waning World',
          type: 'Unique',
          tier: 'BIS, MANDATORY',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Attacks Reduce Evade Cooldown', mustHave: true, buildDefining: true },
            { rank: 2, stat: 'Maximum Evade Charges', mustHave: false },
            { rank: 3, stat: 'Willpower', mustHave: false },
            { rank: 4, stat: 'Movement Speed', mustHave: false },
          ],
          aspect: null,
          source: { type: 'Lair Boss', name: 'Astaroth (also Bartuc alt)' },
          tempering: 'Natural Motion (Movement Speed)',
          masterworkPrimary: 'Attacks Reduce Evade Cooldown',
          sockets: 0,
          socketContents: 'No sockets',
          notes: 'BUILD DEFINING. Masterwork the Evade Cooldown affix for more teleports. Skill bar swap (Nether Step to Sigil of Summons) only happens once you have these.',
        },
        backup: {
          name: 'Legendary Boots, Aspect of Crippling Darkness',
          type: 'Legendary',
          tier: 'Interim',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Willpower', mustHave: true },
            { rank: 2, stat: 'Maximum Life', mustHave: false },
            { rank: 3, stat: 'Movement Speed', mustHave: false },
            { rank: 4, stat: 'All Resistance', mustHave: false },
          ],
          aspect: 'Aspect of Crippling Darkness',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Natural Motion (Movement Speed)',
          masterworkPrimary: 'Willpower',
          sockets: 0,
          socketContents: 'No sockets',
          notes: 'Hold this until Footfalls drops. Aspect of Crippling Darkness slows enemies on Shadow damage.',
        },
      },

      amulet: {
        slot: 'Amulet',
        section: 'jewelry',
        iconClass: 'fa-gem',
        primary: {
          name: 'Seed of Horazon',
          type: 'Unique',
          tier: 'BIS',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 2, stat: 'Vulnerable Damage Multiplier', mustHave: true },
            { rank: 3, stat: 'Shadow Damage Multiplier', mustHave: false },
            { rank: 4, stat: 'All Damage Multipliers', mustHave: false },
          ],
          aspect: null,
          source: { type: 'Lair Boss', name: 'Grigoire' },
          tempering: 'Worldly Stability (Resource Cost Reduction)',
          masterworkPrimary: 'Critical Strike Damage Multiplier',
          sockets: 1,
          socketContents: 'Royal Diamond (All Resist) or Royal Skull (Armor) per defensive gap',
          notes: 'If using a legendary amulet instead, MUST have Transfigure Aspect of Rallying Reversal.',
        },
        backup: {
          name: 'Legendary Amulet, Aspect of Rallying Reversal',
          type: 'Legendary',
          tier: 'Backup',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Maximum Resources', mustHave: true },
            { rank: 2, stat: 'Attack Speed', mustHave: false },
            { rank: 3, stat: 'Critical Strike Damage Multiplier', mustHave: false },
            { rank: 4, stat: 'Willpower', mustHave: false },
          ],
          aspect: 'Aspect of Rallying Reversal',
          aspectAlternatives: ['Nefarious Aspect', 'Undying Aspect', 'Aspect of Elusive Menace', 'Hellbent Commander Aspect'],
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Worldly Stability (Resource Cost Reduction)',
          masterworkPrimary: 'Maximum Resources',
          sockets: 1,
          socketContents: 'Royal Diamond or Royal Skull',
          notes: 'Per Maxroll, the 4 listed aspect alternatives are all viable in priority order.',
        },
      },

      ring1: {
        slot: 'Ring 1 (Lurid Pact slot)',
        section: 'jewelry',
        iconClass: 'fa-ring',
        primary: {
          name: 'Lurid Pact',
          type: 'Ancestral Unique',
          tier: 'BIS',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Attack Speed', mustHave: true },
            { rank: 2, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 3, stat: 'Willpower', mustHave: false },
            { rank: 4, stat: 'Vulnerable Damage Multiplier', mustHave: false },
          ],
          aspect: null,
          source: { type: 'Lair Boss', name: 'Bloodied Butcher' },
          tempering: 'Worldly Stability (Resource Cost Reduction)',
          masterworkPrimary: 'Attack Speed',
          sockets: 1,
          socketContents: 'Royal Diamond or Royal Skull per defensive gap',
          notes: 'Core ring. Unique passive ties into Dread Claws scaling.',
        },
        backup: {
          name: 'Legendary Ring, Crushing Aspect',
          type: 'Legendary',
          tier: 'Alt',
          confidence: 'MEDIUM',
          affixes: [
            { rank: 1, stat: 'Attack Speed', mustHave: true },
            { rank: 2, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 3, stat: 'Vulnerable Damage Multiplier', mustHave: false },
            { rank: 4, stat: 'Willpower', mustHave: false },
          ],
          aspect: 'Crushing Aspect',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Worldly Stability (Resource Cost Reduction)',
          masterworkPrimary: 'Attack Speed',
          sockets: 1,
          socketContents: 'Royal Diamond or Royal Skull',
          notes: 'Mobalytics offensive aspect alternative if Lurid Pact has not dropped.',
        },
      },

      ring2: {
        slot: 'Ring 2 (Mythic or Demonic Aspect slot)',
        section: 'jewelry',
        iconClass: 'fa-ring',
        primary: {
          name: 'Ring of Starless Skies',
          type: 'Mythic Unique',
          tier: 'BIS',
          confidence: 'MEDIUM',
          affixes: [
            { rank: 1, stat: 'Attack Speed', mustHave: true },
            { rank: 2, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 3, stat: 'Vulnerable Damage Multiplier', mustHave: false },
            { rank: 4, stat: 'Resource generation support', mustHave: false },
          ],
          aspect: null,
          source: { type: 'Pinnacle Boss', name: 'Duriel or Andariel (Mythic pool)' },
          tempering: 'Worldly Stability (Resource Cost Reduction)',
          masterworkPrimary: 'Attack Speed',
          sockets: 1,
          socketContents: 'Grand Ruby or Royal Diamond',
          notes: 'Mythic ring. Resource generation passive supports Wrath economy.',
        },
        backup: {
          name: 'Legendary Ring, Demonic Aspect',
          type: 'Legendary',
          tier: 'Canonical Backup',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Attack Speed', mustHave: true },
            { rank: 2, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 3, stat: 'Vulnerable Damage Multiplier', mustHave: false },
            { rank: 4, stat: 'Willpower', mustHave: false },
          ],
          aspect: 'Demonic Aspect',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Worldly Stability (Resource Cost Reduction)',
          masterworkPrimary: 'Attack Speed',
          sockets: 1,
          socketContents: 'Royal Diamond or Royal Skull',
          notes: 'Maxroll canonical fallback when Starless Skies has not dropped.',
        },
      },

      mainHand: {
        slot: 'Main Hand (1H Dagger)',
        section: 'weapons',
        iconClass: 'fa-khanda',
        primary: {
          name: 'Litany of Sable',
          type: 'Ancestral Unique',
          tier: 'BIS, CORE BUILD ITEM',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Weapon Damage (triple priority)', mustHave: true, buildDefining: true },
            { rank: 2, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 3, stat: 'Willpower', mustHave: false },
            { rank: 4, stat: 'Shadow Damage Multiplier', mustHave: false },
          ],
          aspect: null,
          source: { type: 'Lair Boss', name: 'Astaroth (also Harbinger of Hatred)' },
          tempering: 'Worldly Stability (Attack Speed)',
          masterworkPrimary: 'Weapon Damage',
          sockets: 1,
          socketContents: 'Royal Amethyst (Shadow Damage Multiplier)',
          notes: 'BUILD CANNOT FUNCTION WITHOUT THIS. Litany of Sable unique effect grants 100 to 120 percent Dread Claws damage plus extra claws per Shadowform stack.',
        },
        backup: {
          name: 'None viable',
          type: 'n/a',
          tier: 'n/a',
          confidence: 'HIGH',
          affixes: [],
          aspect: null,
          source: { type: 'n/a', name: 'Farm Litany of Sable immediately at Lv 70' },
          tempering: 'n/a',
          masterworkPrimary: 'n/a',
          sockets: 0,
          socketContents: 'n/a',
          notes: 'There is no viable backup. Farm Astaroth until Litany drops.',
        },
      },

      offhand: {
        slot: 'Offhand (Focus)',
        section: 'weapons',
        iconClass: 'fa-book',
        primary: {
          name: 'Legendary Focus, Aspect of Peril',
          type: 'Legendary',
          tier: 'BIS',
          confidence: 'HIGH',
          affixes: [
            { rank: 1, stat: 'Weapon Damage (triple priority)', mustHave: true, buildDefining: true },
            { rank: 2, stat: 'Maximum Resource', mustHave: false },
            { rank: 3, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 4, stat: 'Shadow Damage Multiplier', mustHave: false },
          ],
          aspect: 'Aspect of Peril',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Worldly Stability (Attack Speed)',
          masterworkPrimary: 'Weapon Damage',
          sockets: 1,
          socketContents: 'Royal Amethyst (Shadow Damage Multiplier)',
          notes: 'Aspect of Peril doubles Crit Damage on Vulnerable enemies. Synergizes with Profane Sentinel applied Vulnerable.',
        },
        backup: {
          name: 'Legendary Focus, Demonic Aspect',
          type: 'Legendary',
          tier: 'Alt',
          confidence: 'MEDIUM',
          affixes: [
            { rank: 1, stat: 'Weapon Damage (triple priority)', mustHave: true },
            { rank: 2, stat: 'Maximum Resource', mustHave: false },
            { rank: 3, stat: 'Critical Strike Damage Multiplier', mustHave: true },
            { rank: 4, stat: 'Shadow Damage Multiplier', mustHave: false },
          ],
          aspect: 'Demonic Aspect',
          source: { type: 'Codex of Power', name: 'Imprint from Codex' },
          tempering: 'Worldly Stability (Attack Speed)',
          masterworkPrimary: 'Weapon Damage',
          sockets: 1,
          socketContents: 'Royal Amethyst',
          notes: 'Mobalytics offensive aspect variant.',
        },
      },
    },

    /* ============================================================
       RUNES (canonical pairs plus alternatives)
       Reuses runesgems.js for full reference. This section is a
       summary for the Endgame view.
       ============================================================ */
    runes: {
      canonicalPairs: [
        {
          slot: 'Chest',
          pair: 'Neo plus Prid',
          tier: 'A',
          effect: 'Avoid taking damage 2 sec generates Offering. Prid invokes Dark Prison Chain Aura. Drops Dark Prison from the skill bar after Lv 40.',
          confidence: 'HIGH',
        },
        {
          slot: 'Pants',
          pair: 'Nagu plus Que',
          tier: 'A',
          effect: 'Maintain 1 active Summon for 5 sec generates Offering per summon (max 5). Que invokes Earthen Bulwark Barrier.',
          confidence: 'HIGH',
        },
      ],
      alternatives: [
        { pair: 'Cir plus Ceh', tier: 'S', effect: 'Crit generates Offering, Ceh applies Vulnerable plus damage ramp. Top damage combo.' },
        { pair: 'Cir plus Que', tier: 'A', effect: 'Crit generates Offering, Que invokes 45 percent Barrier every 3 sec.' },
        { pair: 'Igni plus Prid', tier: 'S', effect: 'Stores Offering every 0.3 sec up to 500. On demand Dark Prison.' },
      ],
      farmNote: 'Runes drop from Helltide chests, Whisper caches, and certain Nightmare Dungeon bosses. Specific tables not enumerated.',
    },

    /* ============================================================
       TALISMANS (LoH new system)
       ============================================================ */
    talismans: {
      seal: {
        canonical: 'Chains of Horazon (4 piece bonus)',
        fullName: 'Beru of Horazon\'s Chains',
        mythicVariant: '4 pc Beru of Horazon\'s Chains plus 2 pc Beru of the Nameless (when using the negative 1 Set Mythic Seal)',
      },
      charmSet: {
        primary: '5 pc Beru of Horazon\'s Chains',
        alt: '4 pc Horazon\'s Chains plus 2 pc Beru of the Nameless',
      },
      charmAffixPriority: [
        { rank: 1, stat: 'Demonology Skill Ranks (or Abyss Ranks)' },
        { rank: 2, stat: 'All Stats' },
        { rank: 3, stat: 'Movement Speed' },
        { rank: 4, stat: 'Maximum Life' },
        { rank: 5, stat: 'Lightning Resistance' },
        { rank: 6, stat: 'Fire and Poison Resistance' },
        { rank: 7, stat: 'Physical Resistance' },
        { rank: 8, stat: 'Maximum Resources' },
      ],
      uniqueCharms: [
        { name: 'Anathema of the Primes', role: 'Damage', confidence: 'HIGH' },
        { name: 'Rustbitten Dirk', role: 'Boss Encounters', confidence: 'MEDIUM' },
        { name: 'Endurant Faith', role: 'Survivability', confidence: 'HIGH' },
        { name: 'Flickerstep', role: 'Mobility', confidence: 'MEDIUM' },
        { name: 'Night Terror', role: 'Utility', confidence: 'HIGH' },
        { name: 'Godslayer Crown', role: 'Utility', confidence: 'MEDIUM' },
        { name: 'Seed of Horazon (if not in amulet slot)', role: 'Resource', confidence: 'MEDIUM' },
        { name: 'Temerity', role: 'Defensive backup', confidence: 'MEDIUM' },
      ],
    },

    /* ============================================================
       GLYPHS (priority order, Maxroll canonical)
       ============================================================ */
    glyphs: {
      priority: [
        { rank: 1, name: 'Abyssal', board: 'Abyssal Board', confidence: 'HIGH' },
        { rank: 2, name: 'Demonologist', board: 'Demonologist Board', confidence: 'HIGH' },
        { rank: 3, name: 'Unbound', board: 'Unbound Board', confidence: 'HIGH' },
        { rank: 4, name: 'Destruction', board: 'Destruction Board', confidence: 'HIGH' },
        { rank: 5, name: 'Mastermind', board: 'Mastermind Board', confidence: 'HIGH' },
      ],
      levelingThresholds: [
        { glyphLevel: 15, pitRequired: 35, note: 'First major breakpoint, big stat boost' },
        { glyphLevel: 21, pitRequired: 65, note: 'Radius expansion, second major breakpoint' },
        { glyphLevel: 31, pitRequired: 80, note: 'Push tier' },
        { glyphLevel: 51, pitRequired: 100, note: 'Maximum practical for most builds' },
      ],
      farmNote: 'Glyph XP comes from Pit clears. Each clear levels all equipped glyphs. Per glyph Pit tier upgrade requirements not enumerated in surveyed sources, MEDIUM confidence on thresholds (community standard).',
    },

    /* ============================================================
       PARAGON BOARD ROTATION
       ============================================================ */
    paragon: {
      sub200Path: {
        label: 'Under 200 Paragon: Board Rush',
        description: 'Take legendary nodes immediately on each board. Defer glyph sockets until rotation. Respec to full setup after passing 200 Paragon.',
      },
      over200Path: {
        label: 'Over 200 Paragon: Full Setup',
        description: 'Full board setup with all glyph sockets activated, all rare nodes for stat targets, legendary nodes locked in.',
      },
      boardOrder: [
        { rank: 1, name: 'Starter board (default)', glyph: 'none' },
        { rank: 2, name: 'Abyssal board', glyph: 'Abyssal' },
        { rank: 3, name: 'Demonologist board', glyph: 'Demonologist' },
        { rank: 4, name: 'Unbound board', glyph: 'Unbound' },
        { rank: 5, name: 'Destruction board', glyph: 'Destruction' },
        { rank: 6, name: 'Mastermind board', glyph: 'Mastermind' },
      ],
      nodeStrategy: [
        { rank: 1, action: 'Activate the legendary node on each board first' },
        { rank: 2, action: 'Then activate the glyph socket' },
        { rank: 3, action: 'Then walk to Maximum Life nodes for survival' },
        { rank: 4, action: 'Then highest additive Damage nodes' },
      ],
      confidence: 'HIGH',
    },

    /* ============================================================
       SOUL SHARD plus FRAGMENT (locked combo)
       ============================================================ */
    soulShards: {
      shard: {
        name: 'Mastermind',
        effect: 'Grants Summon Laalish skill. Recast Skills do not break Shadowform Stealth at cost of 2 stacks per cast. x30 percent increased Abyss Skill damage while in Shadowform, 5 percent Movement Speed per stack.',
        confidence: 'HIGH',
      },
      fragment: {
        name: 'Blasphemous',
        effect: 'Recast Skills (Rampage etc.) apply Hex on targets. Increases damage enemies take from Abyss Demonology Skills by x20 percent.',
        confidence: 'HIGH',
      },
      synergy: 'Mastermind generates Shadowform stacks via Recast skills. Blasphemous makes the Recast cycle also apply Hex, which amplifies all subsequent Abyss damage from Dread Claws, Rampage, and Profane Sentinel. Mobalytics (2026-05-15) sharpens the multiplier: 11 Greater Demons (4 from the Shard, 5 Profane Sentinel, 1 Abyssal Titan, 1 Sigil of Summons) yields roughly 330 percent damage through Beru of Horazon\'s Chains. Confidence MEDIUM, single source but self consistent.',
    },

    /* ============================================================
       SKILL BAR VARIANTS
       ============================================================ */
    skillBar: {
      finalEndgame: {
        label: 'Final Endgame Bar (Maxroll canonical)',
        confidence: 'HIGH',
        slots: [
          { n: 1, skill: 'Dread Claws: Encircling Terror', role: 'Primary spam', notes: 'Consumes Shadowform stacks for extra claws' },
          { n: 2, skill: 'Rampage: Abyssal Titan', role: 'Greater Demon', notes: 'Applies Hex via Blasphemous Fragment' },
          { n: 3, skill: 'Profane Sentinel', role: 'Vulnerable applier plus Dominion trigger', notes: 'Replaces Command Fallen once Dominion acquired. Recast every 12 sec.' },
          { n: 4, skill: 'Command Laalish', role: 'Vulnerable plus Shadowform', notes: 'Procs Chains of Horazon every 10 sec' },
          { n: 5, skill: 'Nether Step: Recall Shadows', role: 'Mobility plus Shadowform', notes: 'SWAP to Sigil of Summons for bosses once Footfalls has Attacks Reduce Evade Cooldown affix' },
          { n: 6, skill: 'Metamorphosis: Terror Demon', role: 'Burst plus Shadowform generation', notes: 'Generates 4 stacks per second while active' },
        ],
      },
      speedfarm: {
        label: 'Speedfarm Variant (Mobalytics)',
        confidence: 'MEDIUM',
        slots: [
          { n: 1, skill: 'Dread Claws', role: 'Primary', notes: 'Cast twice then Evade' },
          { n: 2, skill: 'Rampage: Demonic Smash', role: 'Mobility variant', notes: 'Mobility focused recast' },
          { n: 3, skill: 'Summon Laalish', role: 'Vulnerable', notes: 'Every 9 to 10 sec' },
          { n: 4, skill: 'Metamorphosis: Terror Demon', role: 'Shadowform', notes: 'Same as endgame' },
          { n: 5, skill: 'Sigil of Subversion', role: 'Stagger', notes: 'Every 15 sec' },
          { n: 6, skill: 'Profane Sentinel', role: 'Maintain 5 up', notes: 'Recast every 12 sec' },
        ],
      },
      push: {
        label: 'Pit Push Variant (Mobalytics)',
        confidence: 'MEDIUM',
        slots: [
          { n: 1, skill: 'Dread Claws', role: 'Primary spam', notes: 'Standard rotation' },
          { n: 2, skill: 'Rampage: Abyssal Titan', role: 'Greater Demon', notes: 'For boss damage' },
          { n: 3, skill: 'Summon Laalish', role: 'Vulnerable', notes: 'On harder targets' },
          { n: 4, skill: 'Metamorphosis: Terror Demon', role: 'Shadowform', notes: 'Standard' },
          { n: 5, skill: 'Sigil of Summons', role: 'Ritualism proc', notes: 'For boss fights' },
          { n: 6, skill: 'Profane Sentinel', role: 'Maintain 5 up', notes: 'Standard recast' },
        ],
      },
      optimizedPush: {
        label: 'Optimized Push Variant (Mobalytics 2026-05-15)',
        confidence: 'MEDIUM',
        rotation: 'Cast Sigil to activate Beru of the Nameless Ritual for 200 percent damage and 40 percent damage reduction, then swap Sigil for Endless Barrage Bombardment and cast every 10 seconds. Highest single target ceiling, more demanding rotation.',
      },
      lv70SwapMoment: {
        label: 'Lv 70 swap moment',
        description: 'At Lv 70 with Footfalls of the Waning World rolled with Attacks Reduce Evade Cooldown, swap Nether Step for Sigil of Summons on the skill bar. This is THE major endgame bar change.',
      },
    },

    /* ============================================================
       MECHANICS (resource management, boss rotations)
       ============================================================ */
    mechanics: {
      shadowform: {
        sources: [
          'Metamorphosis: Terror Demon generates 4 stacks per second while active',
          'Nether Step grants 4 stacks per cast',
          'Command Laalish generates stacks on cast',
          'Sigil of Subversion generates stacks',
        ],
        consumers: [
          'Dread Claws: Encircling Terror consumes stacks to spawn extra claws',
          'Movement (Evade) consumes stacks',
        ],
        maxNote: 'Maximum stacks increased by Aspect of Deeper Shadows.',
        whileActive: 'x30 percent damage to Abyss Skills, 5 percent Movement Speed per stack.',
      },
      wrath: {
        sources: [
          'Ring of Starless Skies (unique passive)',
          'Dominion class mechanic (Profane Sentinel paragon node)',
          'Wrath Regeneration affix on chest',
          'Wrath Paragon Glyph node',
          'Unbound Paragon Glyph',
        ],
        optimalKit: 'Ring of Starless Skies plus Dominion plus Unbound plus 1x Wrath Regeneration affix keeps Wrath topped up regardless of Attack Speed.',
      },
      offering: {
        generators: 'Neo plus Prid (avoid damage 2 sec) plus Nagu plus Que (active summons, 1 per summon up to 5, max 500)',
        consumers: 'Prid (Dark Prison cast) plus Que (Earthen Bulwark Barrier)',
      },
      bossRotation: [
        { step: 1, action: 'Pre cast Command Fallen 3 times before pull (maintain throughout)' },
        { step: 2, action: 'Cast Metamorphosis on engage to enable Shadowform generation' },
        { step: 3, action: 'Summon Rampage on the boss' },
        { step: 4, action: 'Spam Dread Claws on cooldown' },
        { step: 5, action: 'Use Command Laalish for Vulnerable on rares or bosses' },
        { step: 6, action: 'Use Nether Step or Sigil of Summons for repositioning' },
      ],
    },

    /* ============================================================
       MERCENARIES (3 sources disagree, Maxroll canonical)
       ============================================================ */
    mercs: {
      canonical: {
        hired: { name: 'Raheir', confidence: 'MEDIUM' },
        reinforcement: { name: 'Aldkin', confidence: 'MEDIUM' },
      },
      variants: [
        { label: 'Maxroll Canonical (endgame)', hired: 'Raheir', reinforcement: 'Aldkin', source: 'Maxroll endgame', confidence: 'MEDIUM' },
        { label: 'Icy Veins Variant (endgame)', hired: 'Raheir', reinforcement: 'Varyana', source: 'Icy Veins', confidence: 'MEDIUM' },
        { label: 'Mobalytics Variant (endgame)', hired: 'Varyana', reinforcement: 'Aldkin', source: 'Mobalytics', confidence: 'MEDIUM' },
        { label: 'Mobalytics Leveling', hired: 'Subo', reinforcement: 'Aldkin', source: 'Mobalytics Dread Claws Leveling (Raxxanterax)', confidence: 'MEDIUM', phase: 'leveling' },
      ],
      levelingPick: {
        hired: { name: 'Subo', confidence: 'MEDIUM' },
        reinforcement: { name: 'Aldkin', confidence: 'MEDIUM' },
        note: 'For the leveling phase Mobalytics recommends Subo hired for Map Hack, Movement Speed, and Vulnerability, with Aldkin reinforcement. Switch to the endgame hired pick (Raheir canonical) at 70.',
      },
      controversy: 'The 3 canonical endgame sources disagree on the hired pick. Maxroll itself acknowledges Varyana as a viable alt hire for healing. For leveling, Mobalytics adds Subo as a distinct recommendation. The UI shows all options so you pick by phase and preference.',
      skills: {
        Raheir: ['Ground Slam', 'Raheir\'s Aegis', 'Bastion', 'Inspiration'],
        Aldkin: ['Field of Languish (key skill, applies DR on player skill cast)'],
        Varyana: ['Bloodlust (triggers on any Skill cast in combat)', 'Taste of Flesh (1 percent life heal on hit)'],
        Subo: ['Map Hack utility', 'Movement Speed', 'Vulnerability application (Mobalytics leveling pick)'],
      },
      reasoning: {
        Raheir: 'Defensive front line plus Inspiration damage amp. Endgame canonical.',
        Aldkin: 'Field of Languish triggers on every player skill cast, applying a damage reduction aura. Works leveling and endgame.',
        Varyana: 'Attack Speed buff plus 1 percent Life Heal on hit. Strong sustain option.',
        Subo: 'Leveling pick. Map Hack speeds clears, Movement Speed and Vulnerability help the leveling grind. Mobalytics Dread Claws Leveling, confidence MEDIUM.',
      },
    },

    /* ============================================================
       DIFFICULTY PROGRESSION PATH
       ============================================================ */
    difficulty: {
      path: [
        { level: 'Lv 1 to 70', target: 'Hard difficulty for XP multiplier', confidence: 'HIGH' },
        { level: 'Lv 70', target: 'Complete Pit Tier 10 to unlock Torment 1', confidence: 'HIGH' },
        { level: 'Torment 2', target: 'Pit 20', confidence: 'MEDIUM' },
        { level: 'Torment 3', target: 'Pit 35', confidence: 'MEDIUM' },
        { level: 'Torment 4', target: 'Pit 50', confidence: 'MEDIUM' },
        { level: 'Torment 5', target: 'Pit 65', confidence: 'MEDIUM' },
        { level: 'Torment 6', target: 'Pit 80', confidence: 'MEDIUM' },
        { level: 'Torment 7', target: 'Pit 95', confidence: 'MEDIUM' },
        { level: 'Torment 8', target: 'Pit 110', confidence: 'MEDIUM' },
      ],
      note: 'Maxroll only enumerates Lv 1 to 70 and the Pit 10 to Torment 1 gate explicitly. Torment 2 to 8 Pit gates are community standard, not in surveyed sources for this build.',
    },

    /* ============================================================
       PIT PROGRESSION
       ============================================================ */
    pit: {
      milestones: [
        { tier: 10, note: 'Unlocks Torment 1 immediately at Lv 70 ding', confidence: 'HIGH' },
        { tier: 20, note: 'Unlocks Torment 2, glyph leveling 15', confidence: 'MEDIUM' },
        { tier: 35, note: 'Unlocks Torment 3, glyph leveling 21 (radius expansion)', confidence: 'MEDIUM' },
        { tier: 65, note: 'Glyph leveling 21 to 35, sweet spot for Mastermind glyph push', confidence: 'MEDIUM' },
        { tier: 80, note: 'Mythic farm starts being reliable', confidence: 'MEDIUM' },
        { tier: 100, note: 'Build ceiling per Icy Veins', confidence: 'HIGH' },
        { tier: '100+', note: 'Stretch goal, build is not optimized for Pit 110 plus pushes', confidence: 'HIGH' },
      ],
    },

    /* ============================================================
       LAIR BOSSES (drop tables)
       ============================================================ */
    bosses: [
      { name: 'Astaroth', tier: 'Lair Boss (NEW in LoH)', drops: ['Litany of Sable', 'Footfalls of the Waning World', 'Hecaton Chasm'], materials: 'Per in game materials', confidence: 'HIGH' },
      { name: 'Grigoire', tier: 'Lair Boss', drops: ['Seed of Horazon'], materials: 'Per in game materials', confidence: 'HIGH' },
      { name: 'Bartuc', tier: 'Lair Boss', drops: ['Footfalls of the Waning World (alt source)'], materials: 'Per in game materials', confidence: 'MEDIUM' },
      { name: 'Lord Zir', tier: 'Lair Boss', drops: ['Eye of Baal', 'Infernal Homunculus'], materials: 'Per in game materials', confidence: 'MEDIUM' },
      { name: 'Harbinger of Hatred', tier: 'Lair Boss (NEW in LoH)', drops: ['Heir of Perdition (Mythic)', 'Litany of Sable'], materials: 'Per Icy Veins', confidence: 'MEDIUM' },
      { name: 'Bloodied Butcher', tier: 'Lair Boss', drops: ['Lurid Pact'], materials: 'Per Icy Veins', confidence: 'MEDIUM' },
      { name: 'Duriel', tier: 'Pinnacle Boss', drops: ['Heir of Perdition', 'Ring of Starless Skies', 'Anathema of the Primes'], materials: 'Mucus Slick Egg plus Shard of Agony', confidence: 'HIGH' },
      { name: 'Andariel', tier: 'Pinnacle Boss', drops: ['Heir of Perdition', 'Ring of Starless Skies', 'Anathema of the Primes'], materials: 'Per in game materials', confidence: 'HIGH' },
    ],

    /* ============================================================
       WAR PLANS (reuses Sprint 1 tier list)
       ============================================================ */
    warplans: [
      { tier: 'S+', activity: 'Pit', role: 'Glyph leveling, Pit push, gear scaling', confidence: 'HIGH' },
      { tier: 'S', activity: 'Helltides', role: 'Cinders, target uniques, tempering manuals', confidence: 'HIGH' },
      { tier: 'S', activity: 'Kurast Undercity', role: 'Targeted unique farming', confidence: 'HIGH' },
      { tier: 'A', activity: 'Echoing Hatred', role: 'New LoH activity, multi tier rewards', confidence: 'MEDIUM' },
      { tier: 'A', activity: 'Strongholds', role: 'One time Renown plus paragon, repeatable for materials', confidence: 'HIGH' },
      { tier: 'A', activity: 'Infernal Hordes', role: 'Aether plus rare item rolls, leveling glyphs', confidence: 'HIGH' },
      { tier: 'B', activity: 'Tree of Whispers', role: 'Caches for tempering manuals and aspects', confidence: 'HIGH' },
    ],

    /* ============================================================
       HELLTIDE AND NIGHTMARE DUNGEONS
       ============================================================ */
    activities: {
      helltide: {
        currency: 'Aberrant Cinders (cap raised in LoH)',
        chestPriority: 'Mystery Chests for highest unique chance',
        cadence: '1 hour Helltide windows on a fixed in game timer',
        targetUniques: ['Litany of Sable', 'Footfalls of the Waning World', 'Aspect of Deeper Shadows'],
        confidence: 'MEDIUM',
      },
      nightmareDungeons: {
        primaryUse: 'Glyph XP farm (primary use post 70)',
        targetUniques: 'Specific tier targets not enumerated for Dread Claws Mastermind in surveyed sources',
        confidence: 'MEDIUM',
      },
    },

    /* ============================================================
       STAT CAPS AND BREAKPOINTS
       ============================================================ */
    statCaps: [
      { rank: 1, stat: 'Critical Strike Chance', target: '~90 percent from gear', maxRoll: '100 percent goal', confidence: 'HIGH' },
      { rank: 2, stat: 'Critical Strike Damage Multiplier', target: '~300 percent', confidence: 'MEDIUM' },
      { rank: 3, stat: 'Vulnerable Damage Multiplier', target: '~150 percent', confidence: 'MEDIUM' },
      { rank: 4, stat: 'Maximum Resource (Wrath)', target: '~280 with Summon Vollach active', confidence: 'MEDIUM' },
      { rank: 5, stat: 'Attack Speed', target: '~86 percent with Rallying Reversal, Chains, Varyana up', confidence: 'MEDIUM' },
      { rank: 6, stat: 'All Damage / Shadow Damage Multiplier', target: '~100 percent', confidence: 'MEDIUM' },
      { rank: 7, stat: 'Willpower', target: '~2100. Scales all Warlock damage at 12.5 percent per 100 points (Icy Veins)', confidence: 'MEDIUM' },
      { rank: 8, stat: 'Weapon Damage', target: 'Push past Willpower 2150 then pivot here', confidence: 'MEDIUM' },
      { rank: 9, stat: 'All Resistance', target: '70 percent on Hard, 80 percent target overall', confidence: 'HIGH' },
      { rank: 10, stat: 'Armor', target: '10000 plus community standard', confidence: 'LOW' },
    ],

    /* ============================================================
       LOOKUPS (reverse indexes for the Acquisition Lookup view)
       ============================================================ */
    lookups: {
      byItem: {
        'Litany of Sable': ['Astaroth', 'Harbinger of Hatred'],
        'Footfalls of the Waning World': ['Astaroth', 'Bartuc'],
        'Heir of Perdition': ['Duriel', 'Andariel', 'Harbinger of Hatred'],
        'Seed of Horazon': ['Grigoire'],
        'Lurid Pact': ['Bloodied Butcher'],
        'Ring of Starless Skies': ['Duriel', 'Andariel'],
        'Anathema of the Primes': ['Duriel', 'Andariel'],
        'Eye of Baal': ['Lord Zir'],
        'Infernal Homunculus': ['Lord Zir'],
        'Hecaton Chasm': ['Astaroth'],
        'Aspect of Deeper Shadows': ['Codex of Power', 'Helltide chests'],
      },
      bySource: {
        'Astaroth': ['Litany of Sable', 'Footfalls of the Waning World', 'Hecaton Chasm'],
        'Grigoire': ['Seed of Horazon'],
        'Bartuc': ['Footfalls of the Waning World (alt)'],
        'Lord Zir': ['Eye of Baal', 'Infernal Homunculus'],
        'Harbinger of Hatred': ['Heir of Perdition', 'Litany of Sable'],
        'Bloodied Butcher': ['Lurid Pact'],
        'Duriel': ['Heir of Perdition', 'Ring of Starless Skies', 'Anathema of the Primes'],
        'Andariel': ['Heir of Perdition', 'Ring of Starless Skies', 'Anathema of the Primes'],
        'Helltide': ['Litany of Sable', 'Footfalls of the Waning World', 'Aspects', 'Tempering manuals'],
        'Codex of Power': ['Aspect of Deeper Shadows', 'Aspect of Calamity', 'Aspect of Might', 'Aspect of Crippling Darkness', 'Aspect of Rallying Reversal', 'Aspect of Peril', 'Demonic Aspect'],
      },
    },

    /* ============================================================
       SEASONAL FLAVOR
       ============================================================ */
    seasonal: {
      season: 13,
      name: 'Lord of Hatred',
      newSystems: [
        'Soul Shards plus Fragments (covered in soulShards)',
        'Talismans plus Charms (covered in talismans)',
        'Horadric Cube crafting',
        'War Plans endgame activity tree (covered in warplans)',
        'Echoing Hatred new activity',
        'Reworked skill trees per class',
        'Warlock and Paladin class added',
      ],
      additionalMechanicsBeyondSoulShards: 'None named in canonical sources beyond the above. eGamersWorld and BoostMatch fetches failed and may have had additional coverage.',
    },

    /* ============================================================
       HORADRIC CUBE (Lord of Hatred crafting station)
       Source: Maxroll resources Horadric Cube, fetched 2026-05-15.
       ============================================================ */
    horadricCube: {
      overview: 'The Horadric Cube returns from Diablo II as the Lord of Hatred endgame crafting station. It unlocks after completing the Lord of Hatred campaign and is located in Temis. Recipes consume Primordial Dust variants plus Tuning Prisms to modify items.',
      unlock: 'Complete the Lord of Hatred campaign, then it is available in Temis.',
      confidence: 'HIGH',

      // The single most important correction for this build.
      litanyClarification: {
        headline: 'You cannot target craft Litany of Sable here.',
        detail: 'The Upgrade to Unique recipe converts a Common item into a RANDOM Unique of the same type. There is no targeting. Upgrading a common dagger gives a random dagger Unique from the whole pool, not Litany specifically. For a targeted Litany of Sable, farm the Lair Boss (Astaroth or Harbinger of Hatred). Use the Cube for optimization, not initial acquisition of a specific Unique.',
        confidence: 'HIGH',
      },

      // Recipes flagged for how this build uses them.
      recipes: [
        { name: 'Upgrade to Unique', fn: 'Common to a RANDOM Unique of the same type', materials: '1 Common (Ancestral Common gives Ancestral Unique), 1 Enhanced Primordial Dust, 10 Raw Primordial Dust', buildUse: 'A gamble, not a Litany craft. Only worth it for slots with a tiny Unique pool. Boss farm for specific items instead.', priority: 'LOW', confidence: 'HIGH' },
        { name: 'Focused Reroll', fn: 'Change an affix within the same category', materials: '1 Magic/Rare/Legendary, 1 Refined Primordial Dust, 15 Raw Primordial Dust, Tuning Prism required', buildUse: 'The workhorse. Fix a near perfect legendary by rerolling an off affix into a build target (Crit Damage, Vulnerable, Attack Speed) using the Aggressive Tuning Prism.', priority: 'HIGH', confidence: 'HIGH' },
        { name: 'Chaotic Reroll', fn: 'Change an affix to a different category', materials: '1 Magic/Rare/Legendary, 1 Refined Primordial Dust, 15 Raw Primordial Dust, Tuning Prism optional', buildUse: 'When a slot rolled a useless category entirely. Riskier than Focused Reroll, no category guarantee without a prism.', priority: 'MEDIUM', confidence: 'HIGH' },
        { name: 'Transfigure Item', fn: 'Adds an extra affix, item becomes unmodifiable', materials: '1 Legendary/Unique/Mythic, 1 Volatile Primordial Dust, Tuning Prism optional', buildUse: 'End state polish. Use the Kullean prism for the amulet to imprint a Utility Aspect (this is how Aspect of Rallying Reversal lands on the amulet). Add sockets, masterwork, and the correct aspect BEFORE transfiguring, it locks the item.', priority: 'HIGH', confidence: 'HIGH' },
        { name: 'Unique Power Reroll', fn: 'Randomize an Ancestral Unique power value', materials: '1 Ancestral Unique, 1 Attuned Primordial Dust, 100 Raw Primordial Dust', buildUse: 'Reroll Litany of Sable for a higher unique power value once you have the item. Expensive, save for a near BIS Litany.', priority: 'MEDIUM', confidence: 'HIGH' },
        { name: 'Rune Crafting', fn: 'Craft a specific target Legendary Rune', materials: '1 specific Rare Rune, 5 any Rare Runes, 5 any Legendary Runes', buildUse: 'The targeted path to the runeword runes. Craft Neo, Prid, Nagu, Que directly instead of waiting on drops.', priority: 'HIGH', confidence: 'HIGH' },
        { name: 'Reroll Set Charm', fn: 'Convert a Set Charm into a different one from the same set', materials: '1 Set Charm, 25 Raw Primordial Dust, 50 Infused Horadric Resin', buildUse: 'Reshape the Beru of Horazon Chains set toward the charm affixes you need (Demonology Ranks, All Stats).', priority: 'MEDIUM', confidence: 'HIGH' },
        { name: 'Recycle Uniques', fn: '3 same Uniques to a random Unique of that type', materials: '3 same Unique/Mythic/Unique Charm', buildUse: 'Dump duplicate boss Uniques back into the pool for a reroll.', priority: 'LOW', confidence: 'HIGH' },
        { name: 'Upgrade to Legendary', fn: 'Rare to Legendary with a random Legendary power', materials: '1 Rare, 1 Pure Primordial Dust, 10 Raw Primordial Dust, Tuning Prism optional', buildUse: 'Early gearing filler before Codex aspects are unlocked.', priority: 'LOW', confidence: 'HIGH' },
        { name: 'Add Affix', fn: 'Adds a random affix', materials: '1 item, 1 Coarse Primordial Dust, 5 Raw Primordial Dust, Tuning Prism optional', buildUse: 'Fill an empty affix slot, narrow the category with a Tuning Prism.', priority: 'LOW', confidence: 'HIGH' },
      ],

      tuningPrisms: [
        { name: 'Aggressive', covers: 'Mainstat, Weapon Damage, Attack Speed, Crit Chance, Crit Damage, Vulnerable Damage, All Damage, Elemental Damage', buildNote: 'The main prism for this build. Use on Focused Reroll for weapon, gloves, rings, amulet.', priority: 'HIGH' },
        { name: 'Resourceful', covers: 'Lucky Hit restore Resource, Maximum Resource, Resource Cost Reduction, Resource Regeneration', buildNote: 'For the chest Wrath economy affixes.', priority: 'MEDIUM' },
        { name: 'Adept\'s', covers: 'Mainstat, Skill Ranks', buildNote: 'Ranks to Dread Claws on gloves, Willpower elsewhere.', priority: 'MEDIUM' },
        { name: 'Protector\'s', covers: 'Armor, Damage Reduction, Maximum Life, Resistances', buildNote: 'Defensive slots (pants, boots) and resistance caps.', priority: 'MEDIUM' },
        { name: 'Kullean (Transfigure)', covers: 'Imprints a random Utility Aspect on a non unmodifiable amulet, rerollable', buildNote: 'How Aspect of Rallying Reversal gets onto the amulet.', priority: 'HIGH' },
        { name: 'Chromatic', covers: 'Specific Resistances', buildNote: 'Patch a single failing resistance to hit the cap.', priority: 'LOW' },
      ],

      materials: {
        primordialDust: ['Coarse', 'Raw', 'Refined', 'Volatile', 'Attuned', 'Enhanced', 'Pure'],
        secondary: ['Infused Horadric Resin', 'Tuning Prisms (6 affix types plus Kullean and Entropic)'],
        farmNote: 'Raw Primordial Dust drops from elite enemies starting around level 20. Higher dust tiers and Tuning Prisms come from endgame activities (Pit, Helltides, bosses). Exact per tier drop tables not enumerated in the source. Confidence MEDIUM on farm specifics.',
      },

      buildWorkflow: [
        'Boss farm the targeted Uniques (Litany of Sable, Footfalls, Heir of Perdition). Do not gamble Upgrade to Unique for these.',
        'Craft the runeword runes (Neo, Prid, Nagu, Que) with Rune Crafting instead of waiting on drops.',
        'On a near BIS legendary with one off affix, use Focused Reroll plus the Aggressive Tuning Prism to fix it.',
        'Once a piece is final (sockets in, masterworked, correct aspect), Transfigure it for the bonus affix. This locks the item, so do it last.',
        'Amulet: Transfigure with the Kullean prism to land Aspect of Rallying Reversal.',
        'Reroll Litany unique power with Unique Power Reroll only when the rest of the dagger is near perfect.',
      ],
    },
  };
})();
