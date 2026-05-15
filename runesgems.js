// ============================================================
// D4 Warlock God Run, Runes and Gems Reference
// Sourced from data-sources/runes-gems.md (Resolution 8 and 9 of RECONCILIATION.md)
// Build: Dread Claws Mastermind Warlock, Season 13 Lord of Hatred
// Canonical: Maxroll Endgame + Icy Veins endgame + Mobalytics nicktew
// ============================================================

(function () {
  'use strict';

  window.D4_RUNES_GEMS = {
    compiledAt: '2026-05-13',
    sourceFile: 'data-sources/runes-gems.md',

    runewordSystem: {
      summary: 'A runeword is 1 Rune of Ritual plus 1 Rune of Invocation socketed in a 2-socket item.',
      rules: [
        'Rune of Ritual generates Offering when its condition is met.',
        'Rune of Invocation consumes Offering to trigger a class skill or buff effect.',
        'Only 2-socket gear holds runewords: Helms, Chests, Pants, 2H Weapons.',
        '1H weapons, focus offhands, amulets, and rings have 1 socket (gem only, no runeword).',
        'Gloves and Boots have 0 sockets in D4.',
        'A character can equip a maximum of 2 runewords simultaneously.',
        'No duplicate runes across both equipped runewords.',
      ],
      buildAllocation: 'For Dread Claws Mastermind, the 2 runeword slots go to Neo plus Prid (Chest) and Nagu plus Que (Pants). The Helm carries gems because the 2-runeword budget is fully consumed.',
    },

    gemsPerSlot: [
      {
        group: 'Weapon Sockets',
        scope: '1H Dagger (Litany of Sable), Focus offhand, 2H Weapon variant',
        rows: [
          {
            slot: '1H Dagger (Litany of Sable)',
            recommended: 'Royal Amethyst',
            alternative: 'Grand Amethyst (pre-Royal)',
            effect: 'Shadow Damage Multiplier (24% at Royal per Mobalytics nicktew)',
            reasoning: 'Dread Claws is a Shadow skill. Royal Amethyst is a multiplicative damage layer over base weapon damage.',
            confidence: 'HIGH',
          },
          {
            slot: 'Focus (offhand)',
            recommended: 'Royal Amethyst',
            alternative: 'Grand Amethyst',
            effect: 'Shadow Damage Multiplier',
            reasoning: 'Focus contributes Weapon Damage. The Shadow multiplier stacks with the main hand gem.',
            confidence: 'HIGH',
          },
          {
            slot: '2H Weapon (The Grandfather variant)',
            recommended: '2x Royal Amethyst',
            alternative: '1 Royal Amethyst plus 1 Gem Strength Multiplier transfigure',
            effect: 'Shadow Damage Multiplier stacked',
            reasoning: 'Variant slot. Maxroll canonical pair remains dagger plus focus.',
            confidence: 'MEDIUM',
          },
        ],
      },
      {
        group: 'Armor Sockets',
        scope: 'Helm only. Chest and Pants are reserved for runewords.',
        rows: [
          {
            slot: 'Helm',
            recommended: 'Royal Sapphire',
            alternative: 'Royal Ruby',
            effect: 'Willpower (Sapphire) or Maximum Life (Ruby)',
            reasoning: 'Willpower scales every Warlock skill broadly. If Heir of Perdition rolls 2-socket, take 2x Royal Sapphire.',
            confidence: 'HIGH',
          },
          {
            slot: 'Chest',
            recommended: 'RESERVED FOR RUNEWORD (Neo plus Prid)',
            alternative: 'Royal Sapphire if no rune budget',
            effect: 'Dark Prison Chain Aura automation',
            reasoning: 'Both chest sockets consumed by the canonical Neo plus Prid runeword per Icy Veins endgame.',
            confidence: 'HIGH',
          },
          {
            slot: 'Pants',
            recommended: 'RESERVED FOR RUNEWORD (Nagu plus Que)',
            alternative: 'Royal Sapphire if no rune budget',
            effect: 'Earthen Bulwark Barrier generation',
            reasoning: 'Both pants sockets consumed by the canonical Nagu plus Que runeword per Icy Veins endgame.',
            confidence: 'HIGH',
          },
        ],
      },
      {
        group: 'Jewelry Sockets',
        scope: 'Amulet, Ring 1, Ring 2',
        rows: [
          {
            slot: 'Amulet',
            recommended: 'Royal Diamond',
            alternative: 'Royal Skull',
            effect: 'All Resistance (Diamond) or Armor (Skull)',
            reasoning: 'Round out the worst defensive cap. Diamond if a resist is low, Skull if Armor is the gap.',
            confidence: 'HIGH',
          },
          {
            slot: 'Ring 1 (Lurid Pact slot)',
            recommended: 'Royal Diamond',
            alternative: 'Royal Skull',
            effect: 'All Resistance or Armor',
            reasoning: 'Match to the current defensive deficiency.',
            confidence: 'HIGH',
          },
          {
            slot: 'Ring 2 (Demonic Aspect or Starless Skies slot)',
            recommended: 'Royal Diamond',
            alternative: 'Royal Skull',
            effect: 'All Resistance or Armor',
            reasoning: 'Often paired to fill the opposite gap from Ring 1.',
            confidence: 'HIGH',
          },
        ],
      },
      {
        group: 'No-Socket Slots',
        scope: 'Gloves and Boots have 0 sockets in D4.',
        rows: [
          { slot: 'Gloves', recommended: 'n/a', alternative: 'n/a', effect: 'n/a', reasoning: '0 sockets in D4.', confidence: 'HIGH' },
          { slot: 'Boots', recommended: 'n/a', alternative: 'n/a', effect: 'n/a', reasoning: '0 sockets in D4.', confidence: 'HIGH' },
        ],
      },
    ],

    runeCombos: {
      high: [
        {
          ritual: 'Cir',
          invocation: 'Ceh',
          tier: 'S',
          effect: 'Cir generates Offering on Crit. Ceh invokes Vulnerable application plus a damage ramp. Permanent Vulnerable uptime in the Dread Claws rotation.',
          source: 'aoeah Litany guide, Mobalytics nicktew',
        },
        {
          ritual: 'Cir',
          invocation: 'Que',
          tier: 'A',
          effect: 'Cir generates Offering on Crit. Que invokes a 45 percent Barrier every 3 seconds. Stack Barrier Generation on gear to amplify.',
          source: 'Mobalytics endgame',
        },
        {
          ritual: 'Igni',
          invocation: 'Prid',
          tier: 'S',
          effect: 'Igni stores Offering every 0.3 seconds (up to 500). Prid invokes Dark Prison Chain Aura. Tethers enemies for massive DR, Weaken, and Fortify. Lets you drop Dark Prison from the skill bar after the Lv 40 respec.',
          source: 'Mobalytics endgame, Icy Veins endgame canonical chest pair',
        },
        {
          ritual: 'Neo',
          invocation: 'Prid',
          tier: 'A',
          effect: 'Neo generates Offering after 2 seconds without taking damage. Prid invokes Dark Prison. Alt chest runeword for higher-damage-taken play styles.',
          source: 'Icy Veins endgame canonical chest pair (alt)',
        },
        {
          ritual: 'Nagu',
          invocation: 'Que',
          tier: 'A',
          effect: 'Nagu generates Offering by maintaining at least 1 active Summon for 5 seconds (up to 5 summons for 500 max). Que invokes Earthen Bulwark Barrier.',
          source: 'Icy Veins endgame canonical pants pair',
        },
        {
          ritual: 'Gar',
          invocation: 'Cem',
          tier: 'B',
          effect: 'Filler when Cir is not available. Generates Offering on movement (Cem) or damage taken (Gar) and invokes a damage proc.',
          source: 'Mobalytics nicktew (interchangeable filler)',
        },
      ],
      medium: [
        {
          ritual: 'Yul',
          invocation: 'Lac',
          tier: 'B',
          effect: 'Yul generates Offering on Skill cast with cooldown (50 per cast). Lac invokes Challenging Shout for DR. Viable pre-Mythic. Not specifically named for Dread Claws Mastermind in surveyed canonical sources.',
          source: 'Master prompt requested, mechanics documented, build pairing unverified',
        },
      ],
      low: [
        { ritual: 'Cem', invocation: 'Qua', effect: 'Evade cooldown reduction plus Movement Speed.', source: 'Grok Section 4B only' },
        { ritual: 'Gar', invocation: 'Que', effect: 'Crit Chance plus Earthen Bulwark Barrier hybrid.', source: 'Grok Section 4B only' },
        { ritual: 'Tam', invocation: 'Jah', effect: 'Core skill spam reduction plus free Teleport.', source: 'Grok Section 4B only' },
      ],
      excluded: [
        {
          combo: 'Mother\'s Embrace synergies',
          reason: 'Not directly named in any surveyed Maxroll, Mobalytics, or Icy Veins Dread Claws Mastermind source. Closest match is Heir of Perdition\'s "Mother\'s Favor" mechanic, which is an item mechanic, not a runeword.',
          source: 'Claude reconciliation',
        },
      ],
    },

    runeNotes: {
      shadowformProc: 'No surveyed source identifies a rune combo that itself proc-generates Shadowform. Primary Shadowform comes from skills (Nether Step 4 stacks per cast, Metamorphosis Terror Demon 4 stacks per second, Summon Laalish). Confidence HIGH on this absence.',
      vulnerableUptime: 'Cir plus Ceh is the canonical Vulnerable uptime combo per aoeah Litany guide. Profane Sentinel applies Vulnerable as a skill in the Final Endgame bar per Maxroll, making Cir plus Ceh the rune-side of a stacked Vulnerable strategy. Confidence HIGH.',
    },

    socketRecsPerSlot: [
      { slot: '1H Weapon (Litany of Sable)', sockets: '1', contents: 'Royal Amethyst (Shadow Damage Multiplier)', confidence: 'HIGH' },
      { slot: 'Focus (offhand)', sockets: '1', contents: 'Royal Amethyst (Shadow Damage Multiplier)', confidence: 'HIGH' },
      { slot: '2H Weapon (The Grandfather variant only)', sockets: '2', contents: '2x Royal Amethyst, or 1 Royal Amethyst plus 1 Gem Strength Multiplier transfigure', confidence: 'MEDIUM' },
      { slot: 'Helm', sockets: '1 to 2', contents: 'Royal Sapphire(s) for Willpower. No runeword here, the 2-runeword budget is reserved for Chest and Pants.', confidence: 'HIGH' },
      { slot: 'Chest', sockets: '2', contents: 'Runeword: Neo plus Prid (Dark Prison automation). Alt: Igni plus Prid for on-demand Offering store.', confidence: 'HIGH' },
      { slot: 'Gloves', sockets: '0', contents: 'n/a (no sockets in D4)', confidence: 'HIGH' },
      { slot: 'Pants', sockets: '2', contents: 'Runeword: Nagu plus Que (Earthen Bulwark Barrier generation from summon uptime).', confidence: 'HIGH' },
      { slot: 'Boots', sockets: '0', contents: 'n/a (no sockets in D4)', confidence: 'HIGH' },
      { slot: 'Amulet', sockets: '1', contents: 'Royal Diamond (All Resistance) or Royal Skull (Armor) based on current defensive gap', confidence: 'HIGH' },
      { slot: 'Ring 1 (Lurid Pact slot)', sockets: '1', contents: 'Royal Diamond or Royal Skull to fill the opposite gap from Amulet', confidence: 'HIGH' },
      { slot: 'Ring 2 (Demonic Aspect or Starless Skies slot)', sockets: '1', contents: 'Royal Diamond or Royal Skull to fill the remaining defensive gap', confidence: 'HIGH' },
    ],

    loadoutSummary: [
      { slot: 'Litany of Sable (1H Dagger)', sockets: 1, contents: 'Royal Amethyst', effect: 'Shadow Damage Multiplier' },
      { slot: 'Focus (offhand)', sockets: 1, contents: 'Royal Amethyst', effect: 'Shadow Damage Multiplier' },
      { slot: 'Heir of Perdition (Helm)', sockets: '1 to 2', contents: 'Royal Sapphire(s)', effect: 'Willpower' },
      { slot: 'Chest', sockets: 2, contents: 'Neo plus Prid runeword', effect: 'Dark Prison Chain Aura automation' },
      { slot: 'Gloves', sockets: 0, contents: 'n/a', effect: 'n/a' },
      { slot: 'Pants', sockets: 2, contents: 'Nagu plus Que runeword', effect: 'Earthen Bulwark Barrier' },
      { slot: 'Footfalls of the Waning World (Boots)', sockets: 0, contents: 'n/a', effect: 'n/a' },
      { slot: 'Amulet', sockets: 1, contents: 'Royal Diamond or Royal Skull', effect: 'All Resistance or Armor' },
      { slot: 'Ring 1 (Lurid Pact)', sockets: 1, contents: 'Royal Diamond or Royal Skull', effect: 'All Resistance or Armor' },
      { slot: 'Ring 2 (Demonic Aspect or Starless Skies)', sockets: 1, contents: 'Royal Diamond or Royal Skull', effect: 'All Resistance or Armor' },
    ],

    loadoutTotals: {
      runewords: '2 (Chest, Pants)',
      weaponGems: '2 (Dagger, Focus)',
      armorGems: '1 to 2 (Helm Sapphires)',
      jewelryGems: '3 (Amulet plus 2 Rings)',
    },
  };
})();
