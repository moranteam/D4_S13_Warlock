/* ============================================
   D4_GEAR_WEIGHTS
   Patch 3.0 Lord of Hatred, Season 13.

   Source: data-sources/gear-weights.md (11 slots, 3 tables per slot)
   Powers the future Gear Comparison module (Sprint 3 build).
   See data-sources/RECONCILIATION.md Resolution 7 for the
   per-slot top-affix decisions where Grok dissented.
   ============================================ */

window.D4_GEAR_WEIGHTS = {
  patch: '3.0 Lord of Hatred',
  compiledAt: '2026-05-13',

  /* ==========================================
     GLOBAL ENDGAME STAT TARGETS
     Mobalytics Sanctum variant (Perplexity Section 3, May 13 2026)
     ========================================== */
  globalStatTargets: [
    { priority: 1, stat: 'Critical Strike Chance', target: '~90 percent' },
    { priority: 2, stat: 'Critical Strike Damage Multiplier', target: '~300 percent' },
    { priority: 3, stat: 'Vulnerable Damage Multiplier', target: '~150 percent' },
    { priority: 4, stat: 'Maximum Resource (Wrath)', target: '~280 with Summon Vollach active' },
    { priority: 5, stat: 'Attack Speed', target: '~86 percent with Aspect of Rallying Reversal, Beru of Horazon Chains, Varyana up' },
    { priority: 6, stat: 'All Damage / Shadow Damage Multiplier', target: '~100 percent' },
    { priority: 7, stat: 'Willpower', target: '~2100' },
    { priority: 8, stat: 'Weapon Damage', target: 'Push past ~2150 Willpower then pivot to Weapon Damage' },
  ],

  /* ==========================================
     SLOTS (11 per master prompt)
     Each slot: affixes (Table A), tempering (Table B),
     masterwork (Table C), plus slot-specific notes.
     ========================================== */
  slots: {

    /* ==== SLOT 1: Two-Handed Weapon (alternative variant) ==== */
    'two-handed-weapon': {
      label: 'Two-Handed Weapon',
      note: 'Variant slot. Maxroll canonical pair is 1H Dagger plus Focus, not 2H.',
      affixes: [
        { name: 'Weapon Damage (base plus GA)', weight: 10, target: 'Maximum item power roll', mustHave: true, notes: 'Base damage scales every multiplier in the build' },
        { name: 'Critical Strike Damage Multiplier', weight: 9, target: '60 to 110 percent', mustHave: true, notes: 'Main scaling stat once Crit Chance is capped' },
        { name: 'Shadow Damage Multiplier', weight: 8, target: '30 to 50 percent', mustHave: false, notes: 'Synergizes with Royal Amethyst (24 percent at Royal tier)' },
        { name: 'Willpower', weight: 7, target: '200 plus', mustHave: false, notes: 'Class stat multiplier' },
        { name: 'Vulnerable Damage Multiplier', weight: 7, target: '30 to 50 percent', mustHave: false, notes: 'Stacks against Profane Sentinel applied Vulnerable' },
      ],
      tempering: [
        { manual: 'Worldly Stability (Attack Speed)', why: 'Attack Speed breakpoints define how quickly Dread Claws can fire', priority: 'HIGH' },
        { manual: 'Worldly Finesse (Critical Strike Damage)', why: 'Alternative if Attack Speed is already capped from other slots', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Weapon Damage', why: 'Crit hits the base damage roll, multiplying all later modifiers', priority: 1 },
        { stat: 'Critical Strike Damage Multiplier', why: 'Then push the multiplier', priority: 2 },
        { stat: 'Willpower', why: 'Tertiary if both bigger affixes already crit', priority: 3 },
      ],
      topUnique: 'The Grandfather (Mobalytics nicktew variant)',
      buildDefiningTemper: 'Worldly Stability for Attack Speed',
      gaTargets: ['Weapon Damage', 'Critical Strike Damage Multiplier'],
      sockets: 2,
      confidence: 'MEDIUM',
    },

    /* ==== SLOT 2: Daggers (Litany of Sable) ==== */
    'daggers': {
      label: 'Daggers (Main Hand)',
      note: 'Canonical main hand. Litany of Sable craftable at Horadric Cube.',
      affixes: [
        { name: 'Weapon Damage', weight: 10, target: 'Maximum', mustHave: true, notes: 'Litany of Sable unique effect (100 to 120 percent Dread Claws increased damage and extra claws per Shadowform stack) multiplies off this base' },
        { name: 'Critical Strike Damage Multiplier', weight: 9, target: '60 to 110 percent', mustHave: true, notes: 'Main damage scaling once Crit Chance is high' },
        { name: 'Shadow Damage Multiplier', weight: 8, target: '30 to 50 percent', mustHave: false, notes: 'Direct scaler for Dread Claws' },
        { name: 'Willpower', weight: 7, target: '200 plus', mustHave: false, notes: 'Class stat' },
        { name: 'Max Life', weight: 4, target: '1000 plus', mustHave: false, notes: 'Defensive backup' },
      ],
      tempering: [
        { manual: 'Worldly Stability (Attack Speed)', why: 'Mandatory for hitting Dread Claws cast breakpoints', priority: 'HIGH' },
        { manual: 'Worldly Finesse (Critical Strike Damage)', why: 'Backup if Attack Speed temper rolls poorly', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Weapon Damage', why: 'Multiplies every downstream modifier', priority: 1 },
        { stat: 'Critical Strike Damage Multiplier', why: 'Next biggest swing after base damage', priority: 2 },
        { stat: 'Shadow Damage Multiplier', why: 'Tertiary', priority: 3 },
      ],
      topUnique: 'Litany of Sable (Ancestral Best in Slot)',
      buildDefiningTemper: 'Worldly Stability for Attack Speed',
      gaTargets: ['Weapon Damage'],
      sockets: 1,
      confidence: 'HIGH',
    },

    /* ==== SLOT 3: Focus (Offhand) ==== */
    'focus': {
      label: 'Focus (Offhand)',
      note: 'Canonical offhand. Aspect of Peril for Vulnerable damage multiplier.',
      affixes: [
        { name: 'Weapon Damage', weight: 10, target: 'Maximum', mustHave: true, notes: 'Focus contributes Weapon Damage as the offhand half' },
        { name: 'Maximum Resource (Wrath)', weight: 9, target: '30 to 50', mustHave: true, notes: 'Scales Seed of Horazon if equipped; smooths Wrath economy' },
        { name: 'Critical Strike Damage Multiplier', weight: 8, target: '60 to 110 percent', mustHave: false, notes: 'Standard scaler' },
        { name: 'Shadow Damage Multiplier', weight: 7, target: '30 to 50 percent', mustHave: false, notes: 'Direct Dread Claws scaling' },
        { name: 'Cooldown Reduction', weight: 5, target: '8 to 12 percent', mustHave: false, notes: 'Helps Metamorphosis uptime' },
      ],
      tempering: [
        { manual: 'Worldly Stability (Attack Speed)', why: 'Same logic as main hand: Dread Claws breakpoints', priority: 'HIGH' },
        { manual: 'Worldly Finesse (Critical Strike Damage)', why: 'Alternative', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Weapon Damage', why: 'Same logic as main hand', priority: 1 },
        { stat: 'Maximum Resource', why: 'High value: scales Seed of Horazon and the Banished Lord Talisman 96 percent damage condition', priority: 2 },
        { stat: 'Critical Strike Damage Multiplier', why: 'Tertiary', priority: 3 },
      ],
      topUnique: 'Aspect of Peril',
      buildDefiningTemper: 'Worldly Stability for Attack Speed',
      gaTargets: ['Weapon Damage', 'Maximum Resource'],
      sockets: 1,
      confidence: 'HIGH',
    },

    /* ==== SLOT 4: Helm ==== */
    'helm': {
      label: 'Helm',
      note: 'Heir of Perdition Mythic is BiS. Grok dissented on top affix; Resolution 7 overruled.',
      affixes: [
        { name: 'Critical Strike Chance', weight: 10, target: '8 to 14 percent', mustHave: true, notes: 'Triple star priority on Icy Veins endgame. GA strongly preferred.' },
        { name: 'Max Life', weight: 7, target: '1000 plus', mustHave: false, notes: 'Survival floor' },
        { name: 'Willpower', weight: 6, target: '200 plus', mustHave: false, notes: 'Class stat' },
        { name: 'Cooldown Reduction', weight: 5, target: '6 to 10 percent', mustHave: false, notes: 'Helps Metamorphosis' },
      ],
      tempering: [
        { manual: 'Natural Resistance (Physical Resistance)', why: 'Highest target for elemental balance per Icy Veins endgame', priority: 'HIGH' },
        { manual: 'Natural Resistance (other resist)', why: 'If Physical is already capped from gear, fill the worst resist', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Critical Strike Chance', why: 'Biggest single damage swing on the slot (bolded in Icy Veins endgame)', priority: 1 },
        { stat: 'Max Life', why: 'Survival multiplier', priority: 2 },
        { stat: 'Willpower', why: 'Tertiary', priority: 3 },
      ],
      topUnique: 'Heir of Perdition (Mythic). Crafted via Resplendent Spark x1, Jah x10, Que x10, Gar x10.',
      buildDefiningTemper: 'Natural Resistance Physical',
      gaTargets: ['Critical Strike Chance'],
      sockets: 1,
      confidence: 'HIGH',
    },

    /* ==== SLOT 5: Chest ==== */
    'chest': {
      label: 'Chest',
      note: 'Aspect of Deeper Shadows somewhat mandatory. Sockets reserved for Neo plus Prid runeword.',
      affixes: [
        { name: 'Maximum Resource (Wrath)', weight: 10, target: '30 to 50', mustHave: true, notes: 'Triple star in Icy Veins endgame priority' },
        { name: 'Wrath Regeneration', weight: 8, target: 'Per affix range', mustHave: false, notes: 'Smooths Dread Claws spam' },
        { name: 'Willpower', weight: 7, target: '200 plus', mustHave: false, notes: 'Class stat' },
        { name: 'Maximum Life', weight: 7, target: '1000 plus', mustHave: false, notes: 'Survival' },
      ],
      tempering: [
        { manual: 'Natural Resistance (Lightning Resistance)', why: 'Specifically named in Icy Veins endgame as the chest temper', priority: 'HIGH' },
        { manual: 'Natural Resistance (other resist)', why: 'If Lightning is capped, fill worst gap', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Maximum Resource', why: 'Bolded must-masterwork in Icy Veins endgame', priority: 1 },
        { stat: 'Wrath Regeneration', why: 'Synergistic with Ring of Starless Skies and Dominion paragon', priority: 2 },
        { stat: 'Maximum Life', why: 'Survival', priority: 3 },
      ],
      topUnique: 'Aspect of Deeper Shadows (increases maximum Shadowform stacks, the entire engine of Mastermind)',
      buildDefiningTemper: 'Natural Resistance Lightning',
      gaTargets: ['Maximum Resource'],
      sockets: 2,
      socketContents: 'Runeword: Neo plus Prid (Dark Prison Chain Aura automation)',
      confidence: 'HIGH',
    },

    /* ==== SLOT 6: Gloves ==== */
    'gloves': {
      label: 'Gloves',
      note: 'Aspect of Calamity. Grok dissented on top affix; Resolution 7 overruled.',
      affixes: [
        { name: 'Attack Speed', weight: 10, target: '6 to 10 percent', mustHave: true, notes: 'Triple star priority in Icy Veins endgame' },
        { name: 'Critical Strike Damage Multiplier', weight: 8, target: '30 to 50 percent', mustHave: false, notes: 'Standard scaler' },
        { name: 'Ranks to Dread Claws', weight: 7, target: 'plus 2 to plus 4', mustHave: false, notes: 'Direct skill scaling' },
        { name: 'Willpower', weight: 6, target: '200 plus', mustHave: false, notes: 'Class stat' },
      ],
      tempering: [
        { manual: 'Worldly Finesse (Critical Strike Damage)', why: 'Specifically named for gloves in Icy Veins endgame', priority: 'HIGH' },
        { manual: 'Worldly Finesse (Attack Speed)', why: 'If the affix did not roll well, double down via temper', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Attack Speed', why: 'Bolded must-masterwork in Icy Veins endgame', priority: 1 },
        { stat: 'Critical Strike Damage Multiplier', why: 'Secondary', priority: 2 },
        { stat: 'Ranks to Dread Claws', why: 'Tertiary, ranks add base damage', priority: 3 },
      ],
      topUnique: 'Aspect of Calamity (Hex increases Critical Strike Chance; Blasphemous Fragment makes this a permanent flat Crit Chance multiplier)',
      buildDefiningTemper: 'Worldly Finesse Critical Strike Damage',
      gaTargets: ['Attack Speed'],
      sockets: 0,
      confidence: 'HIGH',
    },

    /* ==== SLOT 7: Pants ==== */
    'pants': {
      label: 'Pants',
      note: 'Aspect of Might. Sockets reserved for Nagu plus Que runeword.',
      affixes: [
        { name: 'Maximum Life', weight: 10, target: '1000 plus', mustHave: true, notes: 'Triple star in Icy Veins endgame' },
        { name: 'Willpower', weight: 8, target: '200 plus', mustHave: false, notes: 'Class stat' },
        { name: 'Total Armor', weight: 7, target: 'Per affix range', mustHave: false, notes: 'Physical mitigation' },
        { name: 'All Resistance', weight: 7, target: '6 to 10 percent', mustHave: false, notes: 'Elemental mitigation' },
      ],
      tempering: [
        { manual: 'Natural Resistance (Physical Resistance)', why: 'Specifically named for pants in Icy Veins endgame', priority: 'HIGH' },
        { manual: 'Natural Motion (Damage Reduction)', why: 'Alternative defensive temper', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Maximum Life', why: 'Bolded must-masterwork in Icy Veins endgame', priority: 1 },
        { stat: 'Willpower', why: 'Secondary', priority: 2 },
        { stat: 'Total Armor', why: 'Tertiary', priority: 3 },
      ],
      topUnique: 'Aspect of Might (Basic Skill grants damage reduction). Alternative: Temerity unique frees this slot.',
      buildDefiningTemper: 'Natural Resistance Physical',
      gaTargets: ['Maximum Life'],
      sockets: 2,
      socketContents: 'Runeword: Nagu plus Que (Earthen Bulwark Barrier from summon uptime)',
      confidence: 'HIGH',
    },

    /* ==== SLOT 8: Boots ==== */
    'boots': {
      label: 'Boots',
      note: 'Footfalls of the Waning World is build-defining. Grok dissented on top affix; Resolution 7 overruled.',
      affixes: [
        { name: 'Willpower', weight: 10, target: '200 plus', mustHave: true, notes: 'Triple star in Icy Veins endgame' },
        { name: 'Maximum Life', weight: 8, target: '1000 plus', mustHave: false, notes: 'Survival' },
        { name: 'Movement Speed', weight: 8, target: '16 to 20 percent', mustHave: false, notes: 'QoL and positioning' },
        { name: 'All Resistance', weight: 6, target: '6 to 10 percent', mustHave: false, notes: 'Cap filler' },
      ],
      tempering: [
        { manual: 'Worldly Finesse (Attacks Reduce Evade Cooldown)', why: 'Mandatory once Footfalls of the Waning World is equipped. Build-defining temper that locks the slot to this manual.', priority: 'HIGHEST (with Footfalls)' },
        { manual: 'Natural Motion (Movement Speed)', why: 'Default boots temper before Footfalls drops', priority: 'HIGH (pre-Footfalls)' },
        { manual: 'Natural Resistance (Damage Reduction)', why: 'Defensive alternative', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Attacks Reduce Evade Cooldown (with Footfalls)', why: 'Maxroll endgame: masterwork that stat for more frequent teleports', priority: 1 },
        { stat: 'Willpower (without Footfalls)', why: 'Default class stat', priority: 1 },
        { stat: 'Movement Speed', why: 'QoL multiplier for aggressive builds', priority: 2 },
        { stat: 'Maximum Life', why: 'Survival', priority: 3 },
      ],
      topUnique: 'Footfalls of the Waning World (Evade becomes Nether Step with reduced cooldown per Shadowform consumed)',
      buildDefiningTemper: 'Attacks Reduce Evade Cooldown on Footfalls (slot-locks the manual once Footfalls drops)',
      gaTargets: ['Willpower'],
      sockets: 0,
      confidence: 'HIGH',
    },

    /* ==== SLOT 9: Amulet ==== */
    'amulet': {
      label: 'Amulet',
      note: 'Amulet has 50 percent aspect scaling. Hold a strong aspect (Hellbent Commander or Rallying Reversal transfigure).',
      affixes: [
        { name: 'Maximum Resource (Wrath)', weight: 10, target: '30 to 50', mustHave: true, notes: 'Triple star in Icy Veins endgame. Amulet 50 percent scaling makes this hit twice as hard.' },
        { name: 'Attack Speed', weight: 9, target: '6 to 10 percent', mustHave: false, notes: 'Critical for hitting the 86 percent breakpoint' },
        { name: 'Critical Strike Damage Multiplier', weight: 8, target: '30 to 50 percent', mustHave: false, notes: 'Amulet 50 percent scaling makes this slot efficient' },
        { name: 'Willpower', weight: 7, target: '200 plus', mustHave: false, notes: 'Class stat' },
      ],
      tempering: [
        { manual: 'Worldly Stability (Resource Cost Reduction)', why: 'Specifically named for amulet in Icy Veins endgame. Keeps Wrath sustain topped regardless of Attack Speed breakpoint.', priority: 'HIGH' },
        { manual: 'Worldly Finesse (Critical Strike Damage)', why: 'Alternative', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Maximum Resource', why: 'Bolded must-masterwork in Icy Veins endgame', priority: 1 },
        { stat: 'Attack Speed', why: 'Amulet 50 percent scaling makes Attack Speed hit extremely hard here', priority: 2 },
        { stat: 'Critical Strike Damage Multiplier', why: 'Tertiary', priority: 3 },
      ],
      topUnique: 'Hellbent Commander Aspect with Aspect of Rallying Reversal transfigure. Unique alternatives: Night Terror (early endgame) or Seed of Horazon (late endgame).',
      buildDefiningTemper: 'Worldly Stability Resource Cost Reduction',
      gaTargets: ['Maximum Resource'],
      sockets: 1,
      confidence: 'HIGH',
    },

    /* ==== SLOT 10: Ring 1 (Lurid Pact slot) ==== */
    'ring-1': {
      label: 'Ring 1 (Lurid Pact)',
      note: 'Lurid Pact drops from Bloodied Butcher.',
      affixes: [
        { name: 'Attack Speed', weight: 10, target: '6 to 10 percent', mustHave: true, notes: 'Triple star in Icy Veins endgame' },
        { name: 'Critical Strike Damage Multiplier', weight: 9, target: '30 to 50 percent', mustHave: false, notes: 'Standard scaler' },
        { name: 'Lucky Hit Chance to Restore Resources', weight: 9, target: 'Per affix range', mustHave: false, notes: 'Endgame mandatory if running Profane Sentinel: required to enable the Command Fallen to Profane Sentinel swap at Final Endgame' },
        { name: 'Vulnerable Damage Multiplier', weight: 8, target: '30 to 50 percent', mustHave: false, notes: 'Pairs well with Summon Laalish Vulnerable application' },
        { name: 'Willpower', weight: 7, target: '200 plus', mustHave: false, notes: 'Class stat' },
      ],
      tempering: [
        { manual: 'Worldly Stability (Resource Cost Reduction)', why: 'Named for rings in Icy Veins endgame. Wrath sustain for Dread Claws spam.', priority: 'HIGH' },
        { manual: 'Worldly Finesse (Critical Strike Damage)', why: 'Alternative', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Attack Speed', why: 'Bolded must-masterwork in Icy Veins endgame', priority: 1 },
        { stat: 'Critical Strike Damage Multiplier', why: 'Secondary', priority: 2 },
        { stat: 'Vulnerable Damage Multiplier', why: 'Tertiary', priority: 3 },
      ],
      topUnique: 'Lurid Pact (Rampage deals x percent increased damage; each kill by Rampage increases size of the brute and its smashes up to 50 percent)',
      buildDefiningTemper: 'Worldly Stability Resource Cost Reduction',
      gaTargets: ['Attack Speed', 'Vulnerable Damage Multiplier'],
      sockets: 1,
      confidence: 'HIGH',
    },

    /* ==== SLOT 11: Ring 2 (Demonic Aspect or Starless Skies) ==== */
    'ring-2': {
      label: 'Ring 2 (Demonic Aspect or Ring of Starless Skies)',
      note: 'Mobalytics endgame puts Ring of Starless Skies here when chasing the Wrath economy build with Dominion paragon.',
      affixes: [
        { name: 'Attack Speed', weight: 10, target: '6 to 10 percent', mustHave: true, notes: 'Triple star in Icy Veins endgame' },
        { name: 'Critical Strike Damage Multiplier', weight: 9, target: '30 to 50 percent', mustHave: false, notes: 'Universal multiplier' },
        { name: 'Lucky Hit Chance to Restore Resources', weight: 9, target: 'Per affix range', mustHave: false, notes: 'Endgame: pairs with Ring 1. Pair of these enables the Profane Sentinel swap.' },
        { name: 'Vulnerable Damage Multiplier', weight: 8, target: '30 to 50 percent', mustHave: false, notes: 'Strong with reliable Vulnerable uptime' },
        { name: 'Willpower', weight: 6, target: '200 plus', mustHave: false, notes: 'Class stat' },
      ],
      tempering: [
        { manual: 'Worldly Stability (Resource Cost Reduction)', why: 'Named for rings in Icy Veins endgame', priority: 'HIGH' },
        { manual: 'Worldly Finesse (Critical Strike Damage)', why: 'Alternative', priority: 'MEDIUM' },
      ],
      masterwork: [
        { stat: 'Attack Speed', why: 'Bolded must-masterwork', priority: 1 },
        { stat: 'Critical Strike Damage Multiplier', why: 'Secondary', priority: 2 },
        { stat: 'Vulnerable Damage Multiplier', why: 'Tertiary', priority: 3 },
      ],
      topUnique: 'Demonic Aspect (each Demonology skill hit increases Demonology damage up to a cap). Alternative: Ring of Starless Skies for Wrath economy with Dominion paragon.',
      buildDefiningTemper: 'Worldly Stability Resource Cost Reduction',
      gaTargets: ['Attack Speed'],
      sockets: 1,
      confidence: 'HIGH',
    },

  },

  /* ==========================================
     QUICK REFERENCE: Build-Defining Tempers
     ========================================== */
  buildDefiningTempers: [
    { slot: 'two-handed-weapon', temper: 'Worldly Stability (Attack Speed)', slotLocked: false },
    { slot: 'daggers', temper: 'Worldly Stability (Attack Speed)', slotLocked: false },
    { slot: 'focus', temper: 'Worldly Stability (Attack Speed)', slotLocked: false },
    { slot: 'helm', temper: 'Natural Resistance (Physical Resistance)', slotLocked: false },
    { slot: 'chest', temper: 'Natural Resistance (Lightning Resistance)', slotLocked: false },
    { slot: 'gloves', temper: 'Worldly Finesse (Critical Strike Damage)', slotLocked: false },
    { slot: 'pants', temper: 'Natural Resistance (Physical Resistance)', slotLocked: false },
    { slot: 'boots', temper: 'Worldly Finesse (Attacks Reduce Evade Cooldown) with Footfalls', slotLocked: true },
    { slot: 'amulet', temper: 'Worldly Stability (Resource Cost Reduction)', slotLocked: false },
    { slot: 'ring-1', temper: 'Worldly Stability (Resource Cost Reduction)', slotLocked: false },
    { slot: 'ring-2', temper: 'Worldly Stability (Resource Cost Reduction)', slotLocked: false },
  ],
};
