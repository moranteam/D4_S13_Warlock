/* ============================================
   D4_ITEMS
   Patch 3.0 Lord of Hatred, Season 13.

   Sources: FextraLife Warlock Unique Equipment page,
   Maxroll Dread Claws endgame guide, Mobalytics endgame
   loadout, GameRant + Aoeah for drop locations.
   ============================================ */

window.D4_ITEMS = {
  patch: '3.0 Lord of Hatred',
  compiledAt: '2026-05-11',

  /* ==========================================
     UNIQUES (Warlock-relevant + Mythics for build)
     priority: core (chase first), strong (slot upgrade),
     situational (variant builds)
     ========================================== */
  uniques: [
    /* === CORE CHASE === */
    {
      id: 'litany-of-sable', name: 'Litany of Sable',
      slot: 'weapon', subtype: 'Daggers',
      effect: 'Dread Claws gains a large damage multiplier. Additional claws fire when you gain Shadowform stacks. Core for the entire build.',
      priority: 'core',
      dropSource: 'Astaroth',
      farmNotes: 'Astaroth lives in Escalating Nightmare Dungeons via Escalation Sigils. Build-defining drop, run him weekly until it lands.',
      sources: ['fextralife', 'maxroll', 'gamerant'],
      confidence: 'HIGH',
    },
    {
      id: 'footfalls-of-the-waning-world', name: 'Footfalls of the Waning World',
      slot: 'boots',
      effect: 'Your Evade becomes Nether Step. Nether Step cooldown reduces as you consume Shadowform stacks. Lets you spam mobility and constantly extend summon durations.',
      priority: 'core',
      dropSource: 'Astaroth',
      farmNotes: 'Same dedicated source as Litany of Sable. Bartuc is reported by some Season 13 players as an alt path, but Astaroth is the canonical drop.',
      sources: ['fextralife', 'maxroll', 'playerauctions', 'aoeah'],
      confidence: 'HIGH',
    },
    {
      id: 'heir-of-perdition', name: 'Heir of Perdition',
      slot: 'helm', mythic: true,
      effect: "Succumb to hatred and earn Mother's Favor, increasing damage dealt by 80%. Slaughter enemies to briefly steal Mother's Favor from surrounding allies.",
      priority: 'core',
      dropSource: 'Mythic pool (any boss)',
      farmNotes: 'Mythic Unique. Drops from any boss encounter via Resplendent Spark conversion or rare boss drops. Reworked in LoH to a damage-amplification effect rather than the original split mechanic.',
      sources: ['game8', 'aoeah', 'diablo4-life'],
      confidence: 'HIGH',
    },
    {
      id: 'ring-of-starless-skies', name: 'Ring of Starless Skies',
      slot: 'ring', mythic: true,
      effect: 'Spending your Primary Resource reduces Resource cost of your skills and increases damage by 10% for 3 seconds, stacking up to 50%. Plus baseline stat block of Crit, Attack Speed, and skill ranks.',
      priority: 'core',
      dropSource: 'Mythic pool (any boss)',
      farmNotes: 'Mythic Unique. Universal damage layer for any caster build. Pair with a high-roll legendary ring on the other finger.',
      sources: ['game8', 'fextralife'],
      confidence: 'HIGH',
    },
    {
      id: 'seed-of-horazon', name: 'Seed of Horazon',
      slot: 'amulet',
      effect: 'Optional amulet upgrade. Outpaces a generic amulet at high rolls and unlocks the Chains of Horazon set bonus chain referenced in the build.',
      priority: 'core',
      dropSource: 'Grigoire',
      farmNotes: 'Grigoire is the dedicated drop. Run him with Living Steel materials from Helltides.',
      sources: ['maxroll', 'mobalytics'],
      confidence: 'MEDIUM',
    },

    /* === STRONG SLOT UPGRADES === */
    {
      id: 'eye-of-baal', name: 'Eye of Baal',
      slot: 'offhand', subtype: 'Focus',
      effect: 'Soul Shard skills and your demons deal more damage. Casting Soul Shard skills boosts all your damage output.',
      priority: 'strong',
      dropSource: 'Lair Boss',
      farmNotes: 'Strong offhand for any Soul Shard build. Specific boss drop pending in-game confirmation.',
      sources: ['fextralife'],
      confidence: 'MEDIUM',
    },
    {
      id: 'infernal-homunculus', name: 'Infernal Homunculus',
      slot: 'offhand', subtype: 'Focus',
      effect: 'Archfiend skills gain damage and Lesser Demon side-upgrades are unlocked free with extended durations.',
      priority: 'strong',
      dropSource: 'Lair Boss',
      farmNotes: 'Alternative to Eye of Baal if you lean heavier on Rampage and Archfiend output.',
      sources: ['fextralife'],
      confidence: 'MEDIUM',
    },
    {
      id: 'hand-of-apotheosis', name: 'Hand of Apotheosis',
      slot: 'gloves',
      effect: 'Metamorphosis gains all side-upgrades for free with enhanced potency.',
      priority: 'strong',
      dropSource: 'Lair Boss',
      farmNotes: 'Lets you run Metamorphosis at maximum upgrade load without paying skill points.',
      sources: ['fextralife'],
      confidence: 'MEDIUM',
    },
    {
      id: 'hecaton-chasm', name: 'Hecaton Chasm',
      slot: 'ring',
      effect: "Tyrant's Grasp deals increased damage and summons additional demonic hands.",
      priority: 'situational',
      dropSource: 'Astaroth',
      farmNotes: 'Not used by Dread Claws Mastermind. Salvage to extract aspect if dropped while chasing Litany.',
      sources: ['fextralife', 'aoeah'],
      confidence: 'HIGH',
    },

    /* === MYTHIC / CLASS-GENERIC === */
    {
      id: 'temerity', name: 'Temerity',
      slot: 'legs', mythic: true,
      effect: 'Healing past full health grants a damage barrier. Strong defensive Mythic for any class.',
      priority: 'core',
      dropSource: 'Mythic pool (any boss)',
      farmNotes: 'Mythic Unique. Class-generic. The barrier scales with Maximum Life so stack Willpower.',
      sources: ['mobalytics'],
      confidence: 'MEDIUM',
    },

    /* === VARIANT / OTHER WARLOCK UNIQUES === */
    {
      id: 'anathema-of-the-primes', name: 'Anathema of the Primes',
      slot: 'weapon', subtype: 'Two-Handed Sword',
      effect: 'Hitting enemies with a Core Skill stacks increasing damage taken from you on them.',
      priority: 'situational',
      dropSource: 'Lair Boss',
      farmNotes: 'Variant builds only. Two-handed weapon, replaces Litany dagger slot.',
      sources: ['fextralife'],
      confidence: 'MEDIUM',
    },
    {
      id: 'aegrom-schism', name: "Ae'grom's Schism",
      slot: 'chest',
      effect: "Ae'grom and your summons deal increased damage. Grants a second Command charge.",
      priority: 'situational',
      dropSource: 'Lair Boss',
      farmNotes: 'Legion Shard variant only. Skip for Mastermind build.',
      sources: ['fextralife'],
      confidence: 'MEDIUM',
    },
  ],
};
