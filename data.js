/* ============================================
   D4_DATA
   Patch 3.0 Lord of Hatred, Season 13.

   Batch 2 populates: walkthrough (9 phases, ~50 steps)
   Batch 3 populates: skills, soulShards, fragments, aspects
   ============================================ */

window.D4_DATA = {
  patch: '3.0 Lord of Hatred',
  season: 13,
  seasonName: 'Season of Reckoning',
  compiledAt: '2026-05-11',

  /* ==========================================
     CLUSTERS (skill tree groupings)
     ========================================== */
  clusters: [
    { id: 'basic', name: 'Basic', desc: 'Free-cost resource generators' },
    { id: 'core', name: 'Core', desc: 'Wrath-spending main damage skills' },
    { id: 'defensive', name: 'Defensive', desc: 'Survival, mobility, and crowd control' },
    { id: 'archfiend', name: 'Archfiend', desc: 'Greater Demon summons (Wrath + Dominance)' },
    { id: 'sigil', name: 'Sigil', desc: 'Ground sigils with Blood Ritual upgrades' },
    { id: 'ultimate', name: 'Ultimate', desc: 'Long-cooldown screen-clear cooldowns' },
  ],

  /* ==========================================
     SKILLS (all 25 Warlock parent skills + upgrades)
     Names: FextraLife wiki authoritative.
     Build relevance: Maxroll Dread Claws Mastermind.
     ========================================== */
  skills: [
    /* === BASIC === */
    {
      id: 'hellion-sting', name: 'Hellion Sting', cluster: 'basic',
      role: 'Leveling Basic. Resource generator with strong DoT at 9 (Eviscerate) and elite-melt at 14 (Tail Spikes). Dropped at the Lv 34 respec.',
      relevance: 'leveling',
      upgrades: ['Multi-Strike', 'Tail Spikes', 'Demonic Swipe', 'Damage', 'Wrath', 'Eviscerate', 'Fortify'],
      recommended: ['Eviscerate', 'Tail Spikes'],
    },
    {
      id: 'infernal-breath', name: 'Infernal Breath', cluster: 'basic',
      role: 'Alternative Basic. Not used by Dread Claws.',
      relevance: 'unused',
      upgrades: ['Demonic Breath', 'Explosive Death', 'Abyssal Torrent', 'Ramping Damage', 'Lesser Demon Volatility', 'Expensive Damage', 'Heavy Impact Damage'],
      recommended: [],
    },

    /* === CORE === */
    {
      id: 'dread-claws', name: 'Dread Claws', cluster: 'core',
      role: 'Build core. Spam from Lv 3 to 70. Enveloping Terror at Lv 15 turns it into an AoE around you AND your Greater Demon.',
      relevance: 'core',
      upgrades: ['Cascading Dread', 'Enveloping Terror', 'Ravenous Jaws', 'Damage', 'Cost Reduction', 'Ambush', 'Vulnerable'],
      recommended: ['Enveloping Terror', 'Ambush', 'Vulnerable'],
      maxRank: 5,
    },
    {
      id: 'blazing-scream', name: 'Blazing Scream', cluster: 'core',
      role: 'Alternative Core. Not used by Dread Claws.',
      relevance: 'unused',
      upgrades: ['Skull Splitter', 'Orbital Scream', 'Abyssal Oppression', 'Damage', 'Cost Reduction', 'Impact Velocity', 'Brimstone Hunger'],
      recommended: [],
    },
    {
      id: 'hell-fracture', name: 'Hell Fracture', cluster: 'core',
      role: 'Alternative Core. Hellfire-focused builds.',
      relevance: 'unused',
      upgrades: ['Lava Fissures', 'Eruption', 'Ruptured Abyss', 'Volatility', 'Cost Reduction', 'Ramp Up', 'Additional Fracture'],
      recommended: [],
    },

    /* === DEFENSIVE === */
    {
      id: 'nether-step', name: 'Nether Step', cluster: 'defensive',
      role: 'Build core. Mobility + Shadowform generation from Lv 4. At Lv 34 take Shadow Recall to pull summons to you and extend their durations.',
      relevance: 'core',
      upgrades: ['Portals', 'Gloomwalker', 'Shadow Recall', 'Damage Reduction', 'Extra Charge', 'Vacuum Swap', 'Movement Speed'],
      recommended: ['Shadow Recall', 'Damage Reduction', 'Extra Charge'],
      maxRank: 5,
    },
    {
      id: 'dark-prison', name: 'Dark Prison', cluster: 'defensive',
      role: 'Mid-leveling. Take at Lv 34 with Chain Aura for sustained area control. Drop at Lv 40 once Prid rune automates it.',
      relevance: 'leveling-bridge',
      upgrades: ['Tripwire', 'Calamity Cage', 'Chain Aura', 'Weaken', 'Cooldown Reduction', 'Missile Slow', 'Fortify'],
      recommended: ['Chain Aura', 'Cooldown Reduction'],
    },
    {
      id: 'umbral-chains', name: 'Umbral Chains', cluster: 'defensive',
      role: 'Alternative Defensive. Not used.',
      relevance: 'unused',
      upgrades: ['Chain Burst', 'Epicenter', 'Chain Whips', 'Long Range Slow', 'Capture Damage', 'Wrath Refund', 'Heavy Harpoon'],
      recommended: [],
    },
    {
      id: 'tortured-wretch', name: 'Tortured Wretch', cluster: 'defensive',
      role: 'Alternative Defensive. Niche utility.',
      relevance: 'unused',
      upgrades: ['Death Saws', 'Punching Bag', 'Domination', 'Unstoppable', 'Cost Reduction', 'Enrage', 'Duration'],
      recommended: [],
    },
    {
      id: 'wall-of-agony', name: 'Wall of Agony', cluster: 'defensive',
      role: 'Alternative Defensive. Wall-building.',
      relevance: 'unused',
      upgrades: ['Fallen Army', 'Encircle', 'Waller', 'Knock Down', 'Cost Reduction', 'Damage', 'Small Walls'],
      recommended: [],
    },

    /* === ARCHFIEND === */
    {
      id: 'rampage', name: 'Rampage', cluster: 'archfiend',
      role: 'Build core. Greater Demon from Lv 8. Take Abyssal Titan at Lv 20. Recasts reposition him without spending Dominance.',
      relevance: 'core',
      upgrades: ['Shockwave', 'Abyssal Titan', 'Demonic Smash', 'Killstreak Damage', 'Lesser Demon Wrath', 'Elite Hit Chance', 'Demon Masher'],
      recommended: ['Abyssal Titan', 'Killstreak Damage', 'Elite Hit Chance'],
      maxRank: 5,
    },
    {
      id: 'command-fallen', name: 'Command Fallen', cluster: 'archfiend',
      role: 'Endgame. Take at Lv 34 with Fallen Rush for the resource engine and Hex amplification.',
      relevance: 'core',
      upgrades: ['Mega Lunatic', 'Meat Shields', 'Fallen Rush', 'Wrath', 'Damage Per Demon', 'Dominance', 'Lifetime Damage'],
      recommended: ['Fallen Rush', 'Wrath', 'Damage Per Demon'],
      maxRank: 5,
    },
    {
      id: 'tyrants-grasp', name: "Tyrant's Grasp", cluster: 'archfiend',
      role: 'Alternative Archfiend. Grapple control.',
      relevance: 'unused',
      upgrades: ['Demonic Grasp', 'Inescapable Grapple', 'Abyssal Pit', 'Unstoppable Damage', 'Lesser Demon Slow', 'Knock Down', 'Grasp Area'],
      recommended: [],
    },
    {
      id: 'fiend-of-abaddon', name: 'Fiend of Abaddon', cluster: 'archfiend',
      role: 'Alternative Archfiend.',
      relevance: 'unused',
      upgrades: ['Spiteful Enrage', 'Abyssal Colossus', 'Vanguard of Flames', 'Crowd Damage', 'Lesser Demon Bonus', 'Elite Damage', 'Dominance'],
      recommended: [],
    },
    {
      id: 'bombardment', name: 'Bombardment', cluster: 'archfiend',
      role: 'Alternative Archfiend.',
      relevance: 'unused',
      upgrades: ['Brutality', 'Demon Mangler', 'Endless Barrage', 'Damage', 'Additional Demon', 'Telekinesis', 'Focused Target'],
      recommended: [],
    },
    {
      id: 'doom', name: 'Doom', cluster: 'archfiend',
      role: 'Alternative Archfiend.',
      relevance: 'unused',
      upgrades: ['Contagion', 'Jailer', 'Doomfire Ritual', 'Damage', 'Wrath', 'Assimilation', 'Echo'],
      recommended: [],
    },
    {
      id: 'molten-bomb', name: 'Molten Bomb', cluster: 'archfiend',
      role: 'Alternative Archfiend. Demon Turret variant for ranged builds.',
      relevance: 'unused',
      upgrades: ['Brimstone Mortar', 'Demon Turret', 'Cluster Bomb', 'Ranged Damage', 'Wrath', 'Knock Down', 'Area Bonus'],
      recommended: [],
    },
    {
      id: 'terror-swarm', name: 'Terror Swarm', cluster: 'archfiend',
      role: 'Alternative Archfiend. Swarm-summon builds.',
      relevance: 'unused',
      upgrades: ['Nightmare', 'Devouring Swarm', 'Searing Infestation', 'Extra Bites', 'Vulnerable', 'Pull', 'Lesser Demons'],
      recommended: [],
    },

    /* === SIGIL === */
    {
      id: 'sigil-of-summons', name: 'Sigil of Summons', cluster: 'sigil',
      role: 'Endgame. Bar swap for prolonged encounters where you need extra summons or stronger demon uptime.',
      relevance: 'situational',
      upgrades: ['Feeding Frenzy', 'Summon Succubus', 'Summon Hellwyrm', 'Damage', 'Blood Ritual', 'Stronger Summons', 'Cooldown'],
      recommended: ['Summon Hellwyrm', 'Stronger Summons'],
    },
    {
      id: 'sigil-of-subversion', name: 'Sigil of Subversion', cluster: 'sigil',
      role: 'Leveling. Wrath economy and Shadowform generation. Dropped at the Lv 34 respec.',
      relevance: 'leveling',
      upgrades: ['Infiltration Trails', 'Seekers', 'Sigil of Lava', 'Movement Speed', 'Blood Ritual', 'Slow', 'Cast Range'],
      recommended: ['Movement Speed', 'Cast Range'],
    },
    {
      id: 'sigil-of-chaos', name: 'Sigil of Chaos', cluster: 'sigil',
      role: 'Alternative Sigil. Volatility-focused.',
      relevance: 'unused',
      upgrades: ['Diabolic Rebuke', 'Hellfire Aura', 'Sigil of Smoke', 'Volatility Duration', 'Blood Ritual', 'Volatility Casts', 'Chain Reaction'],
      recommended: [],
    },
    {
      id: 'profane-sentinel', name: 'Profane Sentinel', cluster: 'sigil',
      role: 'Endgame. Applies Vulnerable. Cast on elites and bosses for the multiplier.',
      relevance: 'core',
      upgrades: ['Focused Glare', 'Sentry', 'Demonic Sight', 'Single Target Damage', 'Lesser Demon Vulnerable', 'Narrow Blast', 'Wide Beam'],
      recommended: ['Single Target Damage', 'Wide Beam'],
    },

    /* === ULTIMATE === */
    {
      id: 'metamorphosis', name: 'Metamorphosis', cluster: 'ultimate',
      role: 'Endgame. Take at Lv 40 with Terror Demon for Shadowform generation and the survival floor.',
      relevance: 'core',
      upgrades: ['Sin Demon', 'Destruction Demon', 'Terror Demon', 'Damage Scaling', 'Maximum Life', 'Dominance', 'Stagger Bar'],
      recommended: ['Terror Demon', 'Damage Scaling', 'Maximum Life'],
      maxRank: 5,
    },
    {
      id: 'apocalypse', name: 'Apocalypse', cluster: 'ultimate',
      role: 'Alternative Ultimate. Apocalypse Warlock builds.',
      relevance: 'unused',
      upgrades: ['Armageddon Ritual', 'Annihilation', 'Minefield', 'Shared Damage', 'Survivor Damage', 'Double Blast', 'Epicenter Damage'],
      recommended: [],
    },
  ],

  /* ==========================================
     ENDGAME SKILL BAR (Maxroll endgame)
     ========================================== */
  endgameBar: [
    { slot: 1, skillId: 'dread-claws', upgrade: 'Enveloping Terror', role: 'Primary damage' },
    { slot: 2, skillId: 'rampage', upgrade: 'Abyssal Titan', role: 'Greater Demon AoE source' },
    { slot: 3, skillId: 'profane-sentinel', upgrade: '', role: 'Vulnerable application' },
    { slot: 4, skillId: 'command-fallen', upgrade: 'Fallen Rush', role: 'Resource + Hex amplification' },
    { slot: 5, skillId: 'nether-step', upgrade: 'Shadow Recall', role: 'Mobility + summon pull (boosted by Footfalls)' },
    { slot: 6, skillId: 'metamorphosis', upgrade: 'Terror Demon', role: 'Shadowform generation + survival' },
  ],

  /* ==========================================
     SOUL SHARDS (FextraLife authoritative)
     ========================================== */
  soulShards: [
    {
      id: 'mastermind', name: 'Mastermind Shard',
      mechanic: 'Control and shadowcraft. Summons Laalish for free. Grants Abyss and Shadowform synergies that boost most of the Dread Claws build damage sources.',
      buildRecommended: true,
      whenUnlocks: 'Level 15 via Warlock class quest',
      sources: ['fextralife', 'maxroll'],
    },
    {
      id: 'legion', name: 'Legion Shard',
      mechanic: 'Biological demon generation. Spawns Vile Child Lesser Demons passively. Strong for swarm/summoner builds.',
      buildRecommended: false,
      whenUnlocks: 'Level 15 via class quest',
      sources: ['fextralife'],
    },
    {
      id: 'vanguard', name: 'Vanguard Shard',
      mechanic: 'Mobility and frontline presence through Archfiend summons in Demonform.',
      buildRecommended: false,
      whenUnlocks: 'Level 15 via class quest',
      sources: ['fextralife'],
    },
    {
      id: 'ritualist', name: 'Ritualist Shard',
      mechanic: 'Doom weaving through Occult skills scaling with Overpower stacks and Hex effects.',
      buildRecommended: false,
      whenUnlocks: 'Level 15 via class quest',
      sources: ['fextralife'],
    },
  ],

  /* ==========================================
     FRAGMENTS (3 per shard, FextraLife)
     ========================================== */
  fragments: {
    mastermind: [
      { id: 'unfathomable', name: 'Unfathomable Fragment', effect: 'Laalish Weakens and Executes enemies, reducing Command cooldown on kills.', buildRecommended: false },
      { id: 'blasphemous', name: 'Blasphemous Fragment', effect: 'Recast skills apply Hex and boost Abyss Demonology damage taken. Core for Dread Claws Mastermind.', buildRecommended: true },
      { id: 'subjugation', name: 'Subjugation Fragment', effect: 'Summoning consumes Dominance for damage scaling; Shadowform loss grants Dominance.', buildRecommended: false },
    ],
    legion: [
      { id: 'spawn', name: 'Spawn Fragment', effect: "Ae'grom passively spawns a Vile Child Lesser Demon every 1 second.", buildRecommended: false },
      { id: 'sacrificial', name: 'Sacrificial Fragment', effect: 'You are Unstoppable as long as you have active Lesser Demons.', buildRecommended: false },
      { id: 'evisceration', name: 'Evisceration Fragment', effect: 'Summoned demons prioritize Eviscerated targets and gain movement speed.', buildRecommended: false },
    ],
    vanguard: [
      { id: 'hellguard', name: 'Hellguard Fragment', effect: 'Abodian gains cast and movement speed and erupts Brimstone during Command.', buildRecommended: false },
      { id: 'warden', name: 'Warden Fragment', effect: 'Lose Dominance per second to extend Greater Demon durations in Demonform.', buildRecommended: false },
      { id: 'inferno', name: 'Inferno Fragment', effect: 'While Volatile in Demonform, Hellfire skill damage causes you to emanate fire.', buildRecommended: false },
    ],
    ritualist: [
      { id: 'abyssal', name: 'Abyssal Fragment', effect: 'Hex stacks up to a maximum of 4 and echoes damage after 4 seconds.', buildRecommended: false },
      { id: 'scorching', name: 'Scorching Fragment', effect: 'Occult Hellfire skills are always empowered and consume 4% of your Maximum Life.', buildRecommended: false },
      { id: 'twisted', name: 'Twisted Fragment', effect: 'Occult Hellfire consumes Hex stacks for damage; Abyss causes Volatile explosions.', buildRecommended: false },
    ],
  },

  /* ==========================================
     ASPECTS (Dread Claws Mastermind priority list)
     Slot families: offensive (gloves/ring/amulet/weapon),
     defensive (helm/chest/legs), mobility (boots),
     utility (offhand). Some aspects fit multiple slots.
     ========================================== */
  aspects: [
    /* === Core / Imprint Day One === */
    {
      id: 'deeper-shadows', name: 'Aspect of Deeper Shadows',
      slots: ['amulet', 'gloves', 'ring'], slotFamily: 'offensive',
      effect: 'Multiplies Abyss skill damage. Amulet slot gets a 50% multiplier on top.',
      priority: 'core',
      source: 'codex',
      farm: 'Codex via salvage early game',
      sources: ['maxroll'],
      confidence: 'HIGH',
    },
    {
      id: 'juggernauts', name: "Juggernaut's Aspect",
      slots: ['chest', 'helm', 'legs'], slotFamily: 'defensive',
      effect: '30 to 35% damage reduction at the cost of attack speed. Primary endgame defensive layer.',
      priority: 'core',
      source: 'codex',
      farm: 'Codex via salvage',
      sources: ['maxroll', 'mobalytics'],
      confidence: 'HIGH',
    },
    {
      id: 'calamity', name: 'Aspect of Calamity',
      slots: ['ring', 'amulet'], slotFamily: 'offensive',
      effect: 'Large flat Critical Strike Chance. Lets you hit 100% Crit from gear alone.',
      priority: 'core',
      source: 'codex',
      farm: 'Codex once dropped, then imprint freely',
      sources: ['maxroll'],
      confidence: 'HIGH',
    },

    /* === Strong / Imprint as found === */
    {
      id: 'demonic-pact', name: 'Aspect of Demonic Pact',
      slots: ['gloves', 'offhand'], slotFamily: 'offensive',
      effect: 'Boosts demon and summon damage. Pairs with Rampage and Laalish output.',
      priority: 'strong',
      source: 'codex',
      farm: 'Salvage legendary drops, imprint when rolled high',
      sources: ['maxroll'],
      confidence: 'MEDIUM',
    },
    {
      id: 'profane-aspect', name: 'Aspect of the Profane',
      slots: ['offhand', 'helm'], slotFamily: 'defensive',
      effect: 'Increases Occult and Hex damage taken by enemies, amplifying the Blasphemous Fragment effect.',
      priority: 'strong',
      source: 'codex',
      farm: 'Codex via salvage',
      sources: ['maxroll'],
      confidence: 'MEDIUM',
    },
    {
      id: 'rallying-reversal', name: 'Aspect of Rallying Reversal',
      slots: ['amulet'], slotFamily: 'offensive',
      effect: 'Amulet transfiguration. Recommended for endgame amulet slot if no unique.',
      priority: 'strong',
      source: 'codex',
      farm: 'Codex',
      sources: ['maxroll'],
      confidence: 'MEDIUM',
    },
    {
      id: 'nefarious', name: 'Nefarious Aspect',
      slots: ['amulet'], slotFamily: 'offensive',
      effect: 'Amulet transfiguration option for the Mastermind build.',
      priority: 'situational',
      source: 'codex',
      farm: 'Codex',
      sources: ['maxroll'],
      confidence: 'MEDIUM',
    },
    {
      id: 'undying', name: 'Undying Aspect',
      slots: ['amulet'], slotFamily: 'offensive',
      effect: 'Amulet transfiguration for survival-leaning Mastermind setups.',
      priority: 'situational',
      source: 'codex',
      farm: 'Codex',
      sources: ['maxroll'],
      confidence: 'MEDIUM',
    },
    {
      id: 'elusive-menace', name: 'Aspect of Elusive Menace',
      slots: ['amulet'], slotFamily: 'offensive',
      effect: 'Amulet transfiguration for evasion-tilted setups.',
      priority: 'situational',
      source: 'codex',
      farm: 'Codex',
      sources: ['maxroll'],
      confidence: 'MEDIUM',
    },

  ],

  /* ==========================================
     TALISMANS, SEALS, CHARMS (LoH new system)
     Unlock: Last of the Horadrim main questline.
     Drop rules: Set Charms from Torment 1+, more in T3.
     Unique Charms more in T8. Mythic Horadric Seals more
     in T10+.
     ========================================== */
  talismans: {
    unlock: 'Complete the Last of the Horadrim main questline in the Lord of Hatred campaign. Talisman tab appears in inventory and Charms begin dropping in the open world.',
    dropRules: 'Set Charms drop from Torment 1 onward, more common in T3. Unique Charms more common from T8. Mythic Horadric Seals more common from T10+.',
    sealPriority: [
      { priority: 1, target: 'Maximum Charm Slots (5-slot Mythic Horadric Seal target)', notes: 'Outer socket count is the biggest swing factor.' },
      { priority: 2, target: 'Unique-rarity Charm slots', notes: 'Lets you slot Endurant Faith without losing set count.' },
      { priority: 3, target: 'Set-specific bonus multiplier', notes: 'Seal bonus stacks on the set effect.' },
    ],
    charmTargets: [
      { affix: 'XP Gain', priority: 'core', notes: 'Leveling phase: stack 2+ XP charms for Stronghold and Helltide rushes.' },
      { affix: 'Movement Speed', priority: 'core', notes: 'Quality of life and uptime on Dread Claws AoE positioning.' },
      { affix: 'Attack Speed', priority: 'core', notes: 'Direct damage multiplier; pairs with Aggressive aspect.' },
      { affix: '+Abyss / Demonology Skill Ranks', priority: 'strong', notes: 'Charm-only stat, hard to source elsewhere.' },
      { affix: 'Maximum Life', priority: 'strong', notes: 'Survival floor, scales Temerity barrier.' },
      { affix: 'Resist (Lightning/Fire/Poison/Physical)', priority: 'strong', notes: 'Cap each before stat optimization on rares.' },
    ],
    sets: [
      {
        id: 'shadow-of-harash',
        name: 'Shadow of Harash',
        tier: 'core',
        classSpecific: 'Warlock (Shadowform focus)',
        bonuses: {
          2: 'Increased Shadowform generation rate.',
          3: 'Shadowform stacks last longer.',
          5: 'x350% Abyss damage while in Shadowform. Consumes 1 Shadowform stack per Abyss skill cast.',
        },
        sources: ['fextralife', 'maxroll', 'user-locked'],
        confidence: 'HIGH',
      },
      {
        id: 'slaughter',
        name: 'Slaughter Set',
        tier: 'strong',
        classSpecific: 'Any class',
        bonuses: {
          2: 'Increased Elite damage dealt.',
          3: 'Damage reduction from Elites.',
          5: 'Combined elite damage and reduction multipliers, scales boss-clear speed.',
        },
        sources: ['user-locked'],
        confidence: 'MEDIUM',
      },
      {
        id: 'practiced-technique',
        name: 'Practiced Technique',
        tier: 'leveling',
        classSpecific: 'Any class',
        bonuses: {
          2: 'Skill cooldown reduction or basic stat boost.',
          3: 'Damage boost on Core skills.',
          5: 'Early game filler bonus; swap out for Shadow of Harash at endgame.',
        },
        sources: ['user-locked'],
        confidence: 'MEDIUM',
      },
    ],
    uniqueCharms: [
      {
        id: 'endurant-faith',
        name: 'Endurant Faith',
        priority: 'core',
        effect: 'Mandatory endgame defensive layer. Provides scaling damage reduction or barrier (verify exact effect in-game on drop).',
        source: 'Unique Charm pool (T8+ drop rate spike)',
        confidence: 'MEDIUM',
        sources: ['user-locked'],
      },
    ],
  },

  /* ==========================================
     WAR PLANS (LoH new endgame system)
     Custom playlist of up to 5 activities with per-activity
     skill trees. Activities below are listed in priority
     order for the Dread Claws Mastermind farm cycle.
     ========================================== */
  warPlans: {
    overview: 'Build a custom playlist of up to 5 endgame activities. You run them in sequence and collect consolidated bonus rewards at the end. Each activity has its own skill tree you level by running it.',
    maxPlanSize: 5,
    activities: [
      {
        id: 'helltides',
        name: 'Helltides',
        tier: 'S',
        rewardSummary: 'Forgotten Souls, Lair Keys, large XP bursts, Tortured Gifts.',
        rewardItems: ['Forgotten Souls', 'Lair Keys', 'Living Steel', 'Tortured Gifts'],
        cadence: 'Hourly window (continuous in LoH)',
        notes: 'Top priority for Season 13 resource economy.',
        sources: ['mobalytics', 'icyveins'],
        confidence: 'HIGH',
      },
      {
        id: 'kurast-undercity',
        name: 'Undercity of Kurast',
        tier: 'S',
        rewardSummary: 'Customizable rewards via Attunement Rank, Tributes, and Bargains. Fast clear times.',
        rewardItems: ['Targeted Aspects', 'Gold', 'Mats per Bargain'],
        cadence: 'On-demand via Tributes',
        notes: 'Fastest run-time among S-tier. Stack with bargains for specific aspect targeting.',
        sources: ['mobalytics', 'icyveins'],
        confidence: 'HIGH',
      },
      {
        id: 'echoing-hatred',
        name: 'Echoing Hatred',
        tier: 'A',
        rewardSummary: 'LoH-specific seasonal activity. Drops Talisman materials and Charm fragments.',
        rewardItems: ['Charm Fragments', 'LoH currency'],
        cadence: 'Daily / seasonal reset',
        notes: 'Run for Talisman system progression specifically.',
        sources: ['mobalytics'],
        confidence: 'MEDIUM',
      },
      {
        id: 'strongholds',
        name: 'Strongholds',
        tier: 'A',
        rewardSummary: 'Massive one-time XP burst on clear. Unlocks Aspect codex entries.',
        rewardItems: ['XP burst', 'Codex aspect unlocks'],
        cadence: 'One-time per character (re-clearable seasonally)',
        notes: 'Top XP source between Levels 60 and 70.',
        sources: ['maxroll'],
        confidence: 'HIGH',
      },
      {
        id: 'whispers',
        name: 'Tree of Whispers',
        tier: 'B',
        rewardSummary: 'Caches with rerolled affixes, Boss Materials (Grim Favors).',
        rewardItems: ['Grim Favor', 'Boss Mats', 'Targeted rare gear'],
        cadence: 'Continuous, cache turn-in every 10 Favors',
        notes: 'Run to summon Lair Bosses. Less efficient as a standalone activity.',
        sources: ['maxroll', 'mobalytics'],
        confidence: 'HIGH',
      },
      {
        id: 'infernal-hordes',
        name: 'Infernal Hordes',
        tier: 'A',
        rewardSummary: 'Wave survival arena. Generates Burning Aether. Talisman Chest after Bartuc/Council.',
        rewardItems: ['Burning Aether', 'Talismans (Set + Unique Charms)', 'Gear chests'],
        cadence: 'On-demand via compass',
        notes: 'Primary Talisman drop activity. Stack the Talisman node on the modifier tree.',
        sources: ['mobalytics'],
        confidence: 'HIGH',
      },
      {
        id: 'the-pit',
        name: 'The Pit',
        tier: 'S+',
        rewardSummary: 'Glyph XP, Masterwork mats, Torment progression gate.',
        rewardItems: ['Glyph XP', 'Masterwork Mats'],
        cadence: 'Stygian Stone per run, refreshes via Whispers',
        notes: 'The only Glyph leveling source. Pit T10 clear unlocks Torment 1.',
        sources: ['maxroll', 'mobalytics'],
        confidence: 'HIGH',
      },
    ],
  },

  /* ==========================================
     MERCENARIES (Vessel of Hatred carry-over)
     4 Mercs: 1 Hired (active), 1 Reinforcement (passive
     proc on trigger). Master prompt locks the build pairs.
     ========================================== */
  mercenaries: [
    {
      id: 'subo',
      name: 'Subo',
      role: 'Hired',
      style: 'Tracker / Marksman',
      buildRole: 'Primary hired for leveling. Reveals chests and applies Vulnerable for free.',
      keySkills: ['Vulnerable application', 'Chest reveal'],
      upgradePriority: ['Vulnerable Damage node', 'Cooldown reduction', 'Crit Chance auras'],
      pair: 'leveling',
      sources: ['user-locked', 'maxroll'],
      confidence: 'HIGH',
    },
    {
      id: 'aldkin',
      name: 'Aldkin',
      role: 'Reinforcement',
      style: 'Caster / Demon-touched',
      buildRole: 'Default reinforcement. Fields of Languish gives 20% damage reduction when you take damage.',
      keySkills: ['Fields of Languish (20% DR)', 'Shadowform synergy'],
      upgradePriority: ['Fields of Languish', 'DR multipliers', 'Shadowform buffs'],
      pair: 'leveling',
      sources: ['user-locked'],
      confidence: 'HIGH',
    },
    {
      id: 'raheir',
      name: 'Raheir',
      role: 'Hired',
      style: 'Tank / Barbarian',
      buildRole: 'Alt hired for survivability. Ground Slam plus Bastion plus Aegis plus Inspiration for boss farming.',
      keySkills: ['Ground Slam', 'Bastion (barrier)', 'Aegis (taunt)', 'Inspiration (Resource regen)'],
      upgradePriority: ['Bastion', 'Aegis', 'Inspiration', 'Ground Slam damage'],
      pair: 'boss-farm',
      sources: ['user-locked', 'maxroll'],
      confidence: 'HIGH',
    },
    {
      id: 'varyana',
      name: 'Varyana',
      role: 'Reinforcement',
      style: 'Berserker / Healer',
      buildRole: 'Alt reinforcement. Taste of Flesh plus Hysteria provides healing and attack speed.',
      keySkills: ['Taste of Flesh (heal proc)', 'Hysteria (attack speed)'],
      upgradePriority: ['Taste of Flesh', 'Hysteria', 'Attack Speed nodes'],
      pair: 'boss-farm',
      sources: ['user-locked'],
      confidence: 'HIGH',
    },
  ],
  mercPairs: [
    { id: 'leveling', name: 'Leveling Pair', hired: 'subo', reinforcement: 'aldkin', notes: 'Subo applies Vulnerable for free DPS, Aldkin caps the DR floor. Run from Level 1 to 70.' },
    { id: 'boss-farm', name: 'Boss Farming Pair', hired: 'raheir', reinforcement: 'varyana', notes: 'Raheir tanks and taunts, Varyana keeps you healed and fast. Use for Lair Boss runs once gear is locked.' },
    { id: 'endgame', name: 'Endgame Pair', hired: 'subo', reinforcement: 'varyana', notes: 'Once you outgear leveling, swap Aldkin for Varyana. Vulnerable plus heal plus attack speed.' },
  ],

  /* ==========================================
     PATCH METADATA
     ========================================== */
  patchMeta: {
    name: 'Lord of Hatred',
    version: '3.0',
    season: 13,
    seasonName: 'Season of Reckoning',
    releaseDate: '2026-04-28',
    sources: [
      { name: 'Maxroll', url: 'https://maxroll.gg/d4', role: 'Build guides, paragon, tier lists' },
      { name: 'Icy Veins', url: 'https://www.icy-veins.com/d4', role: 'Build mechanics, leveling' },
      { name: 'Mobalytics', url: 'https://mobalytics.gg/diablo-4', role: 'Theorycrafting, variants' },
      { name: 'FextraLife wiki', url: 'https://diablo4.wiki.fextralife.com', role: 'Authoritative in-game names' },
      { name: 'Game8', url: 'https://game8.co/games/Diablo-4', role: 'Tier lists, quick reference' },
      { name: 'Wowhead D4', url: 'https://www.wowhead.com/diablo-4', role: 'Item database' },
    ],
    hotfixes: [],
  },

  /* ==========================================
     BOSSES (Lair Bosses + Pinnacle)
     LoH change: each unique now has ONE dedicated drop
     location. Mythic uniques drop from any boss at low rates.
     ========================================== */
  bosses: [
    {
      id: 'astaroth',
      name: 'Astaroth',
      type: 'Lair Boss',
      newInPatch: true,
      summoning: 'Escalation Sigil',
      access: 'Escalating Nightmare Dungeons',
      minTier: 'Scales with Torment',
      drops: ['litany-of-sable', 'footfalls-of-the-waning-world', 'hecaton-chasm'],
      buildRole: 'Primary farm target. Both build-defining uniques drop here. Run weekly until Litany lands.',
      sources: ['fextralife', 'maxroll', 'gamerant', 'aoeah'],
      confidence: 'HIGH',
    },
    {
      id: 'grigoire',
      name: 'Grigoire, The Galvanic Saint',
      type: 'Lair Boss',
      summoning: 'Living Steel x12',
      access: 'Hall of the Penitent (Helltide)',
      minTier: 'T1+',
      drops: ['seed-of-horazon'],
      buildRole: 'Farm for Seed of Horazon amulet. Living Steel from Helltide Tortured Gifts of Mystery.',
      sources: ['maxroll', 'mobalytics'],
      confidence: 'MEDIUM',
    },
    {
      id: 'bartuc',
      name: 'Bartuc',
      type: 'Lair Boss',
      newInPatch: true,
      summoning: 'TBD (LoH-specific material)',
      access: 'Lord of Hatred dungeon',
      minTier: 'No minimum',
      drops: ['footfalls-of-the-waning-world'],
      buildRole: 'Reported alt path for Footfalls in Season 13. Astaroth is canonical, Bartuc as backup.',
      sources: ['aoeah'],
      confidence: 'LOW',
    },
    {
      id: 'duriel',
      name: 'Duriel, King of Maggots',
      type: 'Pinnacle Boss',
      summoning: 'Mucus-Slick Egg x2 plus Shard of Agony x2 (from Echo of Varshan and Lord Zir)',
      access: 'Gaping Crevasse, Kehjistan',
      minTier: 'T2+ recommended',
      drops: ['ring-of-starless-skies', 'heir-of-perdition', 'temerity'],
      buildRole: 'Mythic pool target. Highest Mythic drop rate of any boss in the rotation.',
      sources: ['mobalytics', 'icyveins'],
      confidence: 'HIGH',
    },
    {
      id: 'andariel',
      name: 'Andariel, Maiden of Anguish',
      type: 'Pinnacle Boss',
      summoning: 'Pincushioned Doll x2 plus Sandscorched Shackles x2 (from Beast in Ice and Grigoire)',
      access: "Hanged Man's Hall, Kehjistan",
      minTier: 'T2+ recommended',
      drops: ['ring-of-starless-skies', 'heir-of-perdition', 'temerity'],
      buildRole: 'Mythic pool target, mirrors Duriel for Mythic farming.',
      sources: ['mobalytics', 'icyveins'],
      confidence: 'HIGH',
    },
    {
      id: 'lord-zir',
      name: 'Lord Zir, Avatar of Hatred',
      type: 'Lair Boss',
      summoning: 'Exquisite Blood x12',
      access: 'Darkened Way, Fractured Peaks',
      minTier: 'T1+',
      drops: ['eye-of-baal', 'infernal-homunculus'],
      buildRole: 'Strong offhand drop pool. Run if you do not have Eye of Baal or Infernal Homunculus.',
      sources: ['fextralife', 'mobalytics'],
      confidence: 'MEDIUM',
    },
  ],

  /* ==========================================
     WALKTHROUGH
     Source priority: Maxroll leveling, Icy Veins,
     Mobalytics. FextraLife wiki authoritative for
     in-game skill names. Cross-referenced.
     ========================================== */
  walkthrough: [
    {
      id: 'p1',
      levelMin: 1, levelMax: 7,
      name: 'Foundation',
      summary: 'Build your bar around Dread Claws and Nether Step. Damage scales off your weapon, so prioritize weapon upgrades over every other slot.',
      respec: null,
      steps: [
        { id: 's1', text: 'Pick a starter zone and clear the opening campaign beats', priority: 'med' },
        { id: 's2', text: 'At Level 3, slot Dread Claws as your Core skill (this is your spam from now until 70)', priority: 'high' },
        { id: 's3', text: 'At Level 4, slot Nether Step for mobility and Shadowform generation', priority: 'high' },
        { id: 's4', text: 'Spam Dread Claws, weave a basic attack when Wrath is low', priority: 'med' },
        { id: 's5', text: 'Salvage gear to research Aspect of Deeper Shadows in the Codex', priority: 'med' },
      ],
      sources: ['maxroll', 'icyveins'],
      confidence: 'HIGH',
    },

    {
      id: 'p2',
      levelMin: 8, levelMax: 14,
      name: 'Rampage Online',
      summary: 'Greater Demon unlocks. Position Rampage into packs so its hits overlap with yours. Hellion Sting becomes your single-target deletion tool.',
      respec: null,
      steps: [
        { id: 's1', text: 'At Level 8, unlock Rampage and slot as your Greater Demon (Archfiend)', priority: 'high' },
        { id: 's2', text: 'At Level 9, take Hellion Sting: Eviscerate for the DoT supercharge', priority: 'high' },
        { id: 's3', text: 'At Level 14, take Hellion Sting: Tail Spikes for elite and boss deletion', priority: 'high' },
        { id: 's4', text: 'Position Rampage so its hit zone overlaps yours for double dips', priority: 'med' },
        { id: 's5', text: 'Keep upgrading your weapon at every vendor stop, base damage matters most', priority: 'high' },
      ],
      sources: ['maxroll'],
      confidence: 'HIGH',
    },

    {
      id: 'p3',
      levelMin: 15, levelMax: 19,
      name: 'Mastermind Locked In',
      summary: 'Class quest opens up the Soul Shard system. Dread Claws becomes Enveloping Terror, an AoE that circles both you and your demon.',
      respec: { trigger: true, level: 15, label: 'Respec at 15: Enveloping Terror and Mastermind Shard' },
      steps: [
        { id: 's1', text: 'Complete the Warlock class quest the moment it appears in your log', priority: 'high' },
        { id: 's2', text: 'Pick Mastermind Soul Shard, summon Laalish', priority: 'high' },
        { id: 's3', text: 'Take Dread Claws: Enveloping Terror upgrade', priority: 'high' },
        { id: 's4', text: 'Imprint Aspect of Deeper Shadows on your amulet', priority: 'high' },
        { id: 's5', text: 'Mark the Level 15 respec milestone complete', priority: 'med' },
      ],
      sources: ['maxroll', 'fextralife'],
      confidence: 'HIGH',
    },

    {
      id: 'p4',
      levelMin: 20, levelMax: 29,
      name: 'Abyssal Titan',
      summary: 'Rampage gets its variant. You can now reposition the demon free of cost. Damage ramps hard here once you learn the rhythm.',
      respec: null,
      steps: [
        { id: 's1', text: 'At Level 20, take Rampage: Abyssal Titan variant', priority: 'high' },
        { id: 's2', text: 'Use Rampage recasts to reposition without spending Dominance', priority: 'med' },
        { id: 's3', text: 'Replace amulet aspect with a higher Deeper Shadows roll when one drops', priority: 'med' },
        { id: 's4', text: 'Run priority quests for XP, skip optional side content until Level 30', priority: 'med' },
      ],
      sources: ['maxroll'],
      confidence: 'HIGH',
    },

    {
      id: 'p5',
      levelMin: 30, levelMax: 33,
      name: 'Fragment Pivot',
      summary: 'Soul Shard Fragment slot unlocks. Blasphemous turns Rampage into a Hex applicator, amplifying every Abyss damage source on the build.',
      respec: { trigger: true, level: 30, label: 'Fragment pivot at 30: pick Blasphemous' },
      steps: [
        { id: 's1', text: 'At Level 30, unlock the Fragment slot on your Soul Shard', priority: 'high' },
        { id: 's2', text: 'Pick Blasphemous Fragment for Hex application via Rampage', priority: 'high' },
        { id: 's3', text: 'Confirm Hex is procing on Rampage hits, validate the Abyss damage spike', priority: 'med' },
        { id: 's4', text: 'Prep your Codex: research Aspect of Demonic Pact and Aspect of the Profane', priority: 'med' },
        { id: 's5', text: 'Mark the Level 30 fragment pivot complete', priority: 'med' },
      ],
      sources: ['maxroll'],
      confidence: 'HIGH',
    },

    {
      id: 'p6',
      levelMin: 34, levelMax: 39,
      name: 'Resource Engine',
      summary: 'Major respec. You drop the leveling crutches and pick up the endgame resource engine. Command Fallen and Dark Prison together solve your Wrath economy.',
      respec: { trigger: true, level: 34, label: 'Respec at 34: drop leveling skills, install resource engine' },
      steps: [
        { id: 's1', text: 'Respec: drop Hellion Sting and Sigil of Subversion', priority: 'high' },
        { id: 's2', text: 'Pick Command Fallen: Fallen Rush for the resource generation chain', priority: 'high' },
        { id: 's3', text: 'Pick Dark Prison: Chain Aura for sustained area control', priority: 'high' },
        { id: 's4', text: 'Take Nether Step: Shadow Recall for the summon pull and extra duration', priority: 'high' },
        { id: 's5', text: 'Mark the Level 34 respec milestone complete', priority: 'med' },
      ],
      sources: ['maxroll', 'fextralife'],
      confidence: 'HIGH',
    },

    {
      id: 'p7',
      levelMin: 40, levelMax: 59,
      name: 'Metamorphosis',
      summary: 'Endgame skill bar finalizes. Dark Prison automation hands off, Metamorphosis: Terror Demon takes its slot. Scaling kicks in here.',
      respec: { trigger: true, level: 40, label: 'Respec at 40: install Metamorphosis: Terror Demon' },
      steps: [
        { id: 's1', text: 'Respec: drop Dark Prison from the bar (Prid will automate the field)', priority: 'high' },
        { id: 's2', text: 'Pick Metamorphosis: Terror Demon for Shadowform generation and the survival floor', priority: 'high' },
        { id: 's3', text: 'Endgame bar is locked: Dread Claws, Nether Step, Rampage, Command Laalish, Metamorphosis', priority: 'high' },
        { id: 's4', text: 'Begin pushing higher World Tier for gear quality', priority: 'med' },
        { id: 's5', text: 'Mark the Level 40 respec milestone complete', priority: 'med' },
      ],
      sources: ['maxroll', 'fextralife'],
      confidence: 'HIGH',
    },

    {
      id: 'p8',
      levelMin: 60, levelMax: 69,
      name: 'Endgame Approach',
      summary: 'Final push to 70. Strongholds and Helltides are your XP engine. Refresh tempers and weapon upgrades aggressively.',
      respec: null,
      steps: [
        { id: 's1', text: 'Clear every Stronghold you have not done for the huge XP bursts', priority: 'high' },
        { id: 's2', text: 'Run Helltides for Forgotten Souls and Tortured Gifts', priority: 'high' },
        { id: 's3', text: 'Refresh weapon every time base damage increases', priority: 'high' },
        { id: 's4', text: 'Stay on Normal difficulty if you are levelling solo, swap to Expert only if XP is faster', priority: 'med' },
        { id: 's5', text: 'Reach Level 70 to unlock Paragon and Torment progression', priority: 'high' },
      ],
      sources: ['maxroll', 'icyveins'],
      confidence: 'HIGH',
    },

    {
      id: 'p9',
      levelMin: 70, levelMax: 999,
      name: 'Endgame',
      summary: 'Paragon unlocks. Push Pit 10 for Torment 1, level Glyphs, hunt Night Terror. Build optimization begins now.',
      respec: null,
      steps: [
        { id: 's1', text: 'Begin Paragon board rush, take legendary nodes first', priority: 'high' },
        { id: 's2', text: 'Level every Glyph to 15 first for the radius bonus', priority: 'high' },
        { id: 's3', text: 'Clear Pit Tier 10 to enter Torment 1', priority: 'high' },
        { id: 's4', text: 'Start hunting Night Terror amulet via Lair Boss runs', priority: 'high' },
        { id: 's5', text: 'Once Torment farming is stable, level Glyphs to 46 for the secondary multipliers', priority: 'med' },
        { id: 's6', text: 'Optimize Paragon rotation: switch to endgame board order after Paragon 200', priority: 'med' },
      ],
      sources: ['maxroll', 'mobalytics'],
      confidence: 'MEDIUM',
    },
  ],
};
