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
  compiledAt: '2026-05-13',

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
      role: 'Build core. Spam from Lv 3 to 70. Encircling Terror at Lv 15 turns it into an AoE around you AND your Greater Demon.',
      relevance: 'core',
      upgrades: ['Cascading Dread', 'Encircling Terror', 'Ravenous Jaws', 'Damage', 'Cost Reduction', 'Ambush', 'Vulnerable'],
      recommended: ['Encircling Terror', 'Ambush', 'Vulnerable'],
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
      role: 'Build core. Mobility + Shadowform generation from Lv 4. At Lv 34 take Recall Shadows to pull summons to you and extend their durations.',
      relevance: 'core',
      upgrades: ['Portals', 'Gloomwalker', 'Recall Shadows', 'Damage Reduction', 'Extra Charge', 'Vacuum Swap', 'Movement Speed'],
      recommended: ['Recall Shadows', 'Damage Reduction', 'Extra Charge'],
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
    { slot: 1, skillId: 'dread-claws', upgrade: 'Encircling Terror', role: 'Primary damage' },
    { slot: 2, skillId: 'rampage', upgrade: 'Abyssal Titan', role: 'Greater Demon AoE source' },
    { slot: 3, skillId: 'profane-sentinel', upgrade: '', role: 'Vulnerable application' },
    { slot: 4, skillId: 'command-fallen', upgrade: 'Fallen Rush', role: 'Resource + Hex amplification' },
    { slot: 5, skillId: 'nether-step', upgrade: 'Recall Shadows', role: 'Mobility + summon pull (boosted by Footfalls)' },
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
    { id: 'endgame', name: 'Endgame Pair', hired: 'raheir', reinforcement: 'aldkin', notes: 'Maxroll canonical endgame. Raheir front lines plus Inspiration damage amp, Aldkin Field of Languish applies DR on every skill cast. Varyana is a viable alt hire for more sustain.' },
  ],

  /* ==========================================
     LEVELING PATH (Reconciled per-level skill point allocation)
     Source: data-sources/leveling-skill-points.md
     Maxroll canonical via Claude reconciliation. See
     data-sources/RECONCILIATION.md Resolution 3.
     ========================================== */
  levelingPath: {
    legend: {
      AS: 'Active Skill rank',
      P: 'Passive node',
      U: 'Upgrade node (first or second branch upgrade on an active)',
      R: 'Soul Shard or Fragment selection (class mechanic, not a skill point)',
    },
    levels: [
      { level: 1, pointSpent: 'AS: Hellion Sting r1', cumulative: 'Hellion Sting 1', respec: false, confidence: 'HIGH', notes: 'Basic skill only at Lv 1' },
      { level: 2, pointSpent: 'AS: Hellion Sting r2', cumulative: 'Hellion Sting 2', respec: false, confidence: 'MEDIUM', notes: 'Build Basic ranks while Core is locked' },
      { level: 3, pointSpent: 'AS: Dread Claws r1', cumulative: 'HS 2, DC 1', respec: false, confidence: 'HIGH', notes: 'Dread Claws unlocks; immediately becomes the spam skill' },
      { level: 4, pointSpent: 'AS: Nether Step r1', cumulative: 'HS 2, DC 1, NS 1', respec: false, confidence: 'HIGH', notes: 'Mobility + Shadowform generation unlocked' },
      { level: 5, pointSpent: 'AS: Dread Claws r2', cumulative: 'HS 2, DC 2, NS 1', respec: false, confidence: 'MEDIUM', notes: 'Stack Core ranks for Wrath efficiency' },
      { level: 6, pointSpent: 'U: Dread Claws Enhanced', cumulative: 'HS 2, DC 2 + Enhanced, NS 1', respec: false, confidence: 'MEDIUM', notes: 'Damage ramp upgrade' },
      { level: 7, pointSpent: 'U: Dread Claws Damage', cumulative: 'HS 2, DC 2 + both upgrades, NS 1', respec: false, confidence: 'MEDIUM', notes: 'Locks the damage ramp' },
      { level: 8, pointSpent: 'AS: Rampage r1', cumulative: 'HS 2, DC 2 upg, NS 1, R 1', respec: false, confidence: 'HIGH', notes: 'Greater Demon unlocks (Archfiend class)' },
      { level: 9, pointSpent: 'U: Hellion Sting Eviscerate', cumulative: 'HS 2 + Eviscerate, DC 2 upg, NS 1, R 1', respec: false, confidence: 'HIGH', notes: 'Single-target spike via Eviscerate' },
      { level: 10, pointSpent: 'U: Nether Step Enhanced', cumulative: 'HS 2 + Evis, DC 2 upg, NS 1 + Enhanced, R 1', respec: false, confidence: 'MEDIUM', notes: 'Adds charge and Shadowform on use' },
      { level: 11, pointSpent: 'U: Nether Step Disciplined', cumulative: 'NS 1 + Enhanced + Disciplined', respec: false, confidence: 'MEDIUM', notes: 'Disciplined is the Mastermind pick for damage reduction. Methodical is the alternative for pure movement-speed leveling, not recommended for this build.' },
      { level: 12, pointSpent: 'AS: Rampage r2', cumulative: 'R 2', respec: false, confidence: 'MEDIUM', notes: 'Bring Rampage online for boss damage' },
      { level: 13, pointSpent: 'U: Rampage Enhanced', cumulative: 'R 2 + Enhanced', respec: false, confidence: 'MEDIUM', notes: 'Prepares the Abyssal Titan branch' },
      { level: 14, pointSpent: 'U: Hellion Sting Tail Spikes', cumulative: 'HS 2 + Eviscerate + Tail Spikes', respec: false, confidence: 'HIGH', notes: 'Elite and boss melt combo with Eviscerate active' },
      { level: 15, pointSpent: 'R: Mastermind Shard; full respec redistribution', cumulative: 'See respecStates.lv15', respec: true, confidence: 'HIGH', notes: 'Soul Shard unlocked via Warlock class quest. Summon Laalish granted free. Dread Claws gains Encircling Terror upgrade.' },
      { level: 16, pointSpent: 'AS: Dread Claws r6', cumulative: 'DC 6', respec: false, confidence: 'MEDIUM', notes: 'Continue maxing Core' },
      { level: 17, pointSpent: 'AS: Dread Claws r7', cumulative: 'DC 7', respec: false, confidence: 'MEDIUM', notes: 'Damage scales linearly per rank' },
      { level: 18, pointSpent: 'P: Shadow damage passive r1', cumulative: '+1 Abyss passive', respec: false, confidence: 'MEDIUM', notes: 'Feeds Mastermind Shard multiplier' },
      { level: 19, pointSpent: 'AS: Rampage r3', cumulative: 'R 3', respec: false, confidence: 'MEDIUM', notes: 'Prep for Abyssal Titan unlock' },
      { level: 20, pointSpent: 'U: Rampage Abyssal Titan', cumulative: 'R 3 + Abyssal Titan upgrade', respec: false, confidence: 'HIGH', notes: 'Greater Demon variant doubles Encircling Terror damage' },
      { level: 21, pointSpent: 'AS: Nether Step r2', cumulative: 'NS 2', respec: false, confidence: 'MEDIUM', notes: 'More Shadowform stacks per cast' },
      { level: 22, pointSpent: 'AS: Dread Claws r8', cumulative: 'DC 8', respec: false, confidence: 'MEDIUM', notes: 'Push Core' },
      { level: 23, pointSpent: 'P: Demonology passive r1', cumulative: '+1 Demonology cluster', respec: false, confidence: 'MEDIUM', notes: 'Buffs Rampage and Summon Laalish damage' },
      { level: 24, pointSpent: 'AS: Dread Claws r9', cumulative: 'DC 9', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 25, pointSpent: 'AS: Hellion Sting r3', cumulative: 'HS 3', respec: false, confidence: 'MEDIUM', notes: 'Keeps Wrath generation healthy pre-respec' },
      { level: 26, pointSpent: 'P: Wrath generation passive r1', cumulative: 'Wrath gen node', respec: false, confidence: 'MEDIUM', notes: 'Smooths spending DC at high rank' },
      { level: 27, pointSpent: 'AS: Rampage r4', cumulative: 'R 4', respec: false, confidence: 'MEDIUM', notes: 'Build Greater Demon damage' },
      { level: 28, pointSpent: 'AS: Dread Claws r10', cumulative: 'DC 10', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 29, pointSpent: 'P: Shadow damage passive r2', cumulative: '+2 in cluster', respec: false, confidence: 'MEDIUM', notes: 'Pre-30 passive build out' },
      { level: 30, pointSpent: 'R: Blasphemous Fragment; minor skill cleanup', cumulative: 'See respecStates.lv30', respec: true, confidence: 'HIGH', notes: 'Fragment slot unlocks. Blasphemous makes Rampage Abyssal Titan apply Hex on hit.' },
      { level: 31, pointSpent: 'AS: Dread Claws r11', cumulative: 'DC 11', respec: false, confidence: 'MEDIUM', notes: 'Continue scaling' },
      { level: 32, pointSpent: 'AS: Rampage r5', cumulative: 'R 5', respec: false, confidence: 'MEDIUM', notes: 'Bring Greater Demon to mid rank' },
      { level: 33, pointSpent: 'AS: Dread Claws r12', cumulative: 'DC 12', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 34, pointSpent: 'RESPEC: drop HS + SoS; pick up Command Fallen (Fallen Rush), Dark Prison (Chain Aura), Nether Step Recall Shadows', cumulative: 'See respecStates.lv34', respec: true, confidence: 'HIGH', notes: 'Maxroll: drop Hellion Sting and Sigil of Subversion; pick up Command Fallen (Fallen Rush) and Dark Prison (Chain Aura). Recall Shadows on Nether Step teleports Abyssal Titan with you.' },
      { level: 35, pointSpent: 'AS: Dread Claws r13', cumulative: 'DC 13', respec: false, confidence: 'MEDIUM', notes: 'Continue Core scaling' },
      { level: 36, pointSpent: 'AS: Rampage r6', cumulative: 'R 6', respec: false, confidence: 'MEDIUM', notes: 'Abyssal Titan damage' },
      { level: 37, pointSpent: 'P: Critical Strike passive cluster r1', cumulative: '+1 Crit passive', respec: false, confidence: 'MEDIUM', notes: 'Sets up Crit scaling for Litany of Sable endgame' },
      { level: 38, pointSpent: 'AS: Dread Claws r14', cumulative: 'DC 14', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 39, pointSpent: 'AS: Command Fallen r2', cumulative: 'CF 2', respec: false, confidence: 'MEDIUM', notes: 'Improves Wrath generation per Fallen Rush tap' },
      { level: 40, pointSpent: 'RESPEC: drop Dark Prison; take Metamorphosis with Terror Demon upgrade', cumulative: 'See respecStates.lv40', respec: true, confidence: 'HIGH', notes: 'Maxroll: at Lv 40 drop Dark Prison, pick up Metamorphosis Terror Demon. Dark Prison instead automated with Prid rune. Metamorphosis takes effect on bar at Lv 41.' },
      { level: 41, pointSpent: 'AS: Dread Claws r15 (MAX)', cumulative: 'DC 15', respec: false, confidence: 'HIGH', notes: 'Dread Claws hits max rank. First full level operating with Metamorphosis on bar.' },
      { level: 42, pointSpent: 'AS: Metamorphosis r2', cumulative: 'Meta 2', respec: false, confidence: 'MEDIUM', notes: 'Improves Shadowform generation' },
      { level: 43, pointSpent: 'AS: Metamorphosis r3', cumulative: 'Meta 3', respec: false, confidence: 'MEDIUM', notes: 'Continue ultimate scaling' },
      { level: 44, pointSpent: 'AS: Rampage r7', cumulative: 'R 7', respec: false, confidence: 'MEDIUM', notes: 'Abyssal Titan damage' },
      { level: 45, pointSpent: 'AS: Metamorphosis r4', cumulative: 'Meta 4', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 46, pointSpent: 'AS: Rampage r8', cumulative: 'R 8', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 47, pointSpent: 'AS: Metamorphosis r5', cumulative: 'Meta 5', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 48, pointSpent: 'AS: Rampage r9', cumulative: 'R 9', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 49, pointSpent: 'AS: Command Fallen r3', cumulative: 'CF 3', respec: false, confidence: 'MEDIUM', notes: 'Resource generation rank' },
      { level: 50, pointSpent: 'AS: Metamorphosis r6', cumulative: 'Meta 6', respec: false, confidence: 'MEDIUM', notes: 'Mid game ultimate ramp' },
      { level: 51, pointSpent: 'AS: Rampage r10', cumulative: 'R 10', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 52, pointSpent: 'AS: Metamorphosis r7', cumulative: 'Meta 7', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 53, pointSpent: 'AS: Command Fallen r4', cumulative: 'CF 4', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 54, pointSpent: 'AS: Rampage r11', cumulative: 'R 11', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 55, pointSpent: 'AS: Metamorphosis r8', cumulative: 'Meta 8', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 56, pointSpent: 'AS: Rampage r12', cumulative: 'R 12', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 57, pointSpent: 'AS: Metamorphosis r9', cumulative: 'Meta 9', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 58, pointSpent: 'AS: Rampage r13', cumulative: 'R 13', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 59, pointSpent: 'AS: Metamorphosis r10', cumulative: 'Meta 10', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 60, pointSpent: 'AS: Rampage r14', cumulative: 'R 14', respec: false, confidence: 'MEDIUM', notes: 'First Paragon point unlocks (Mobalytics planner)' },
      { level: 61, pointSpent: 'AS: Metamorphosis r11', cumulative: 'Meta 11', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 62, pointSpent: 'AS: Rampage r15 (MAX)', cumulative: 'R 15', respec: false, confidence: 'MEDIUM', notes: 'Rampage hits max rank' },
      { level: 63, pointSpent: 'AS: Metamorphosis r12', cumulative: 'Meta 12', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 64, pointSpent: 'AS: Command Fallen r5', cumulative: 'CF 5', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 65, pointSpent: 'AS: Metamorphosis r13', cumulative: 'Meta 13', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 66, pointSpent: 'AS: Command Fallen r6', cumulative: 'CF 6', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 67, pointSpent: 'AS: Metamorphosis r14', cumulative: 'Meta 14', respec: false, confidence: 'MEDIUM', notes: 'Continue' },
      { level: 68, pointSpent: 'P: Critical Strike Damage passive max', cumulative: '+1 max Crit cluster', respec: false, confidence: 'MEDIUM', notes: 'Endgame passive shaping' },
      { level: 69, pointSpent: 'AS: Metamorphosis r15 (MAX)', cumulative: 'Meta 15', respec: false, confidence: 'MEDIUM', notes: 'All three primary actives at rank 15' },
      { level: 70, pointSpent: 'P: Final Abyss damage passive max', cumulative: 'Final spec lock', respec: false, confidence: 'HIGH', notes: '69 base points spent. Remaining points from Season Rank rewards (Icy Veins notes 83 total at full season completion).' },
    ],
    respecStates: {
      lv15: {
        trigger: 'Warlock class quest grants Mastermind Shard choice. Summon Laalish becomes available free. Encircling Terror upgrade unlocks on Dread Claws.',
        totalPoints: 14,
        skills: [
          { name: 'Hellion Sting', rank: 1, upgrades: ['Eviscerate', 'Tail Spikes'] },
          { name: 'Dread Claws', rank: 5, upgrades: ['Encircling Terror', 'Ambush'] },
          { name: 'Nether Step', rank: 1, upgrades: ['Enhanced', 'Disciplined'] },
          { name: 'Rampage', rank: 1, upgrades: ['Enhanced'] },
          { name: 'Sigil of Subversion', rank: 1, upgrades: [] },
        ],
        passives: 'All relevant Abyss and Demonology cluster rank 1 nodes filled',
        soulShard: 'Mastermind Shard (grants Summon Laalish)',
        fragment: 'None yet (unlocks at Lv 30)',
        barEffect: 'Encircling Terror converts Dread Claws into a circular AoE around the player and the Greater Demon. Mastermind Shard grants 30 percent Abyss damage while in Shadowform plus 5 percent move speed per stack.',
      },
      lv30: {
        trigger: 'Fragment slot unlocks. Blasphemous Fragment makes Rampage Abyssal Titan apply Hex on hit.',
        totalPoints: 29,
        skills: [
          { name: 'Hellion Sting', rank: 3, upgrades: ['Eviscerate', 'Tail Spikes'] },
          { name: 'Dread Claws', rank: 10, upgrades: ['Encircling Terror', 'Ambush', 'Cascading Dread'] },
          { name: 'Nether Step', rank: 2, upgrades: ['Enhanced', 'Disciplined'] },
          { name: 'Rampage', rank: 4, upgrades: ['Enhanced', 'Abyssal Titan'] },
          { name: 'Sigil of Subversion', rank: 1, upgrades: ['Enhanced'] },
        ],
        passives: 'Abyss and Demonology cluster expansion: Shadow damage r2, Demonology r1, Wrath generation r1',
        soulShard: 'Mastermind Shard',
        fragment: 'Blasphemous Fragment (NEW this respec)',
        barEffect: 'Rampage Abyssal Titan now applies Hex via Blasphemous Fragment. Each Hexed enemy takes 20 percent more damage from Abyss and Demonology skills.',
      },
      lv34: {
        trigger: 'Recall Shadows upgrade on Nether Step unlocks. Drop Hellion Sting and Sigil of Subversion. Add Command Fallen and Dark Prison.',
        totalPoints: 33,
        skills: [
          { name: 'Dread Claws', rank: 12, upgrades: ['Encircling Terror', 'Ambush', 'Cascading Dread'] },
          { name: 'Nether Step', rank: 2, upgrades: ['Enhanced', 'Disciplined', 'Recall Shadows'] },
          { name: 'Rampage', rank: 5, upgrades: ['Enhanced', 'Abyssal Titan'] },
          { name: 'Command Fallen', rank: 1, upgrades: ['Fallen Rush'] },
          { name: 'Dark Prison', rank: 1, upgrades: ['Chain Aura'] },
        ],
        dropped: ['Hellion Sting', 'Sigil of Subversion'],
        passives: 'Abyss, Demonology, Shadow, Wrath generation clusters at full leveling investment',
        soulShard: 'Mastermind Shard',
        fragment: 'Blasphemous Fragment',
        barEffect: 'Fallen Rush taps generate Wrath in bulk, replacing the need for a Basic skill on bar. Chain Aura Dark Prison provides Weaken plus Fortify defensive layer. Recall Shadows teleports Abyssal Titan with you.',
      },
      lv40: {
        trigger: 'Ultimate slot opens. Drop Dark Prison (automated by Neo + Prid rune later). Take Metamorphosis with Terror Demon upgrade.',
        totalPoints: 39,
        skills: [
          { name: 'Dread Claws', rank: 14, upgrades: ['Encircling Terror', 'Ambush', 'Cascading Dread'] },
          { name: 'Nether Step', rank: 2, upgrades: ['Enhanced', 'Disciplined', 'Recall Shadows'] },
          { name: 'Rampage', rank: 6, upgrades: ['Enhanced', 'Abyssal Titan'] },
          { name: 'Command Fallen', rank: 2, upgrades: ['Fallen Rush'] },
          { name: 'Metamorphosis', rank: 1, upgrades: ['Terror Demon'] },
        ],
        dropped: ['Dark Prison (from bar; runeword-automated by Neo + Prid)'],
        passives: 'Abyss, Demonology, Shadow, Wrath gen, plus Critical Strike cluster r1',
        soulShard: 'Mastermind Shard',
        fragment: 'Blasphemous Fragment',
        barEffect: 'Endgame leveling skeleton. From Lv 41 through Lv 70 the player only spends ranks on existing actives. No further respecs needed.',
      },
    },
    endgameTarget: {
      basic: '(none; dropped at Lv 34 respec)',
      core: { skill: 'Dread Claws', rank: 15, upgrades: ['Enhanced', 'Damage', 'Encircling Terror', 'Ambush', 'Cascading Dread'] },
      mobility: { skill: 'Nether Step', rank: '2 to 3', upgrades: ['Enhanced', 'Disciplined', 'Recall Shadows'] },
      defensive: { skill: 'Rampage', rank: 15, upgrades: ['Enhanced', 'Abyssal Titan'] },
      demonology1: { skill: 'Command Fallen', rank: '5 to 6', upgrades: ['Fallen Rush'] },
      demonology2Endgame: { skill: 'Profane Sentinel (replaces Command Fallen post-Dominion paragon plus 2x Lucky Hit Restore Resources rings)', rank: 1, upgrades: ['Vulnerable application', 'Dominion synergy'] },
      ultimate: { skill: 'Metamorphosis', rank: 15, upgrades: ['Terror Demon'] },
      classMechanic: 'Mastermind Shard plus Blasphemous Fragment',
      passives: 'Shadow, Abyss, Demonology, Critical Strike clusters fully invested per Maxroll endgame node map',
      pointMath: '69 base points spent by Lv 70. Season Rank rewards bring total to ~83 at full season completion (Icy Veins).',
    },
  },

  /* ==========================================
     CONTROLLER BINDINGS (PS5 milestone evolution)
     Source: data-sources/controller-bindings.md
     Maxroll canonical for bar contents. Player preference for
     button placement (Sprint 3 will add customization).
     See data-sources/RECONCILIATION.md Resolution 5 + 6.
     ========================================== */
  controllerBindings: {
    layoutNotes: 'Pure Maxroll ergonomic. R2 locked to Dread Claws from Lv 3 onward (the spam Core stays on the trigger). R1 locked to Rampage from Lv 8 onward. Square holds the resource swap (Hellion Sting then Command Fallen then Profane Sentinel). Triangle settles on Metamorphosis as the Ultimate from Lv 41.',
    confidence: 'HIGH on bar contents per milestone, MEDIUM on exact button placement (player preference, customizable in Sprint 3)',
    lockedSlots: [
      { button: 'R2', skill: 'Dread Claws', from: 'Lv 3', why: 'Spam Core, never moves' },
      { button: 'R1', skill: 'Rampage', from: 'Lv 8', why: 'Greater Demon recast button' },
      { button: 'Circle', skill: 'Nether Step', from: 'Lv 4', why: 'Mobility on the right thumb' },
      { button: 'X', skill: 'Summon Laalish', from: 'Lv 15', why: 'Soul Shard active' },
      { button: 'L2', skill: 'Evade (or Sigil of Summons post-Footfalls)', from: 'Lv 1', why: 'D4 PS5 default' },
    ],
    milestones: [
      { level: 1, label: 'Starter', square: '(empty)', triangle: '(empty)', circle: '(empty)', x: '(empty)', r1: 'Hellion Sting', r2: '(empty)', l2: 'Evade', replaced: 'Initial slot', why: 'Only the Basic skill is available at Lv 1. R1 holds the only attack for index-finger fluency.' },
      { level: 3, label: 'Dread Claws', square: '(empty)', triangle: '(empty)', circle: '(empty)', x: '(empty)', r1: 'Hellion Sting', r2: 'Dread Claws', l2: 'Evade', replaced: 'R2 filled with Dread Claws (permanent slot from this level onward)', why: 'Dread Claws is the spam Core from Lv 3 to Lv 70. R2 is the spam trigger and Dread Claws never leaves it.' },
      { level: 4, label: 'Nether Step', square: '(empty)', triangle: '(empty)', circle: 'Nether Step', x: '(empty)', r1: 'Hellion Sting', r2: 'Dread Claws', l2: 'Evade', replaced: 'Circle filled with mobility', why: 'Nether Step on Circle keeps it at the thumb for instinctive evade chaining and Shadowform generation.' },
      { level: 8, label: 'Rampage', square: 'Hellion Sting', triangle: '(empty)', circle: 'Nether Step', x: '(empty)', r1: 'Rampage', r2: 'Dread Claws', l2: 'Evade', replaced: 'Hellion Sting moved from R1 to Square; R1 filled with Rampage (permanent slot from this level onward)', why: 'Rampage is recast frequently to apply Hex via Blasphemous Fragment at Lv 30. R1 is the natural index-finger button for repeated triggers.' },
      { level: 9, label: 'Eviscerate', square: 'Hellion Sting (Eviscerate)', triangle: '(empty)', circle: 'Nether Step', x: '(empty)', r1: 'Rampage', r2: 'Dread Claws', l2: 'Evade', replaced: 'Square ability upgraded, no slot change', why: 'Eviscerate is a Hellion Sting upgrade node, not a new skill.' },
      { level: 15, label: 'Mastermind respec', square: 'Hellion Sting (Eviscerate + Tail Spikes)', triangle: 'Sigil of Subversion', circle: 'Nether Step (Enhanced + Disciplined)', x: 'Summon Laalish', r1: 'Rampage (Enhanced)', r2: 'Dread Claws (Encircling Terror)', l2: 'Evade', replaced: 'Triangle filled with Sigil of Subversion. X filled with Summon Laalish (granted free by Mastermind Shard). R2 ability upgraded with Encircling Terror.', why: 'Mastermind Shard class quest grants Summon Laalish as a Soul Shard active. Sigil of Subversion adds Hex application until the Lv 34 swap.' },
      { level: 20, label: 'Abyssal Titan', square: 'Hellion Sting', triangle: 'Sigil of Subversion', circle: 'Nether Step', x: 'Summon Laalish', r1: 'Rampage (Abyssal Titan)', r2: 'Dread Claws (Encircling Terror)', l2: 'Evade', replaced: 'R1 ability upgraded, no slot change', why: 'Rampage Abyssal Titan is a straight upgrade to base Rampage.' },
      { level: 30, label: 'Blasphemous Fragment', square: 'Hellion Sting', triangle: 'Sigil of Subversion', circle: 'Nether Step', x: 'Summon Laalish', r1: 'Rampage (Abyssal Titan, applies Hex via Blasphemous Fragment)', r2: 'Dread Claws (Encircling Terror)', l2: 'Evade', replaced: 'No bar swap; Fragment slotted', why: 'Blasphemous Fragment is a class mechanic change, not a bar change.' },
      { level: 34, label: 'Resource Engine respec', square: 'Command Fallen (Fallen Rush)', triangle: 'Dark Prison (Chain Aura)', circle: 'Nether Step (Recall Shadows)', x: 'Summon Laalish', r1: 'Rampage (Abyssal Titan)', r2: 'Dread Claws (Encircling Terror)', l2: 'Evade', replaced: 'Square swaps Hellion Sting for Command Fallen. Triangle swaps Sigil of Subversion for Dark Prison. Nether Step upgraded with Recall Shadows.', why: 'Maxroll Lv 34 respec: drop Hellion Sting and Sigil of Subversion. Pick up Command Fallen (Fallen Rush) for bulk Wrath generation on Square and Dark Prison (Chain Aura) for the defensive layer.' },
      { level: 41, label: 'Metamorphosis online', square: 'Command Fallen', triangle: 'Metamorphosis (Terror Demon)', circle: 'Nether Step (Recall Shadows)', x: 'Summon Laalish', r1: 'Rampage (Abyssal Titan)', r2: 'Dread Claws (Encircling Terror)', l2: 'Evade', replaced: 'Dark Prison dropped from Triangle, replaced by Metamorphosis Terror Demon', why: 'Maxroll Lv 40 respec: drop Dark Prison and pick up Metamorphosis Terror Demon. Dark Prison instead automated with Neo plus Prid rune combo.' },
      { level: 50, label: 'Mid endgame', square: 'Command Fallen', triangle: 'Metamorphosis (Terror Demon)', circle: 'Nether Step (Recall Shadows)', x: 'Summon Laalish', r1: 'Rampage (Abyssal Titan)', r2: 'Dread Claws (Encircling Terror)', l2: 'Evade', replaced: 'No bar swap', why: 'Bar is locked. Player is still ranking up actives.' },
      { level: 70, label: 'Endgame Entry', square: 'Command Fallen (Fallen Rush)', triangle: 'Metamorphosis (Terror Demon)', circle: 'Nether Step (Recall Shadows)', x: 'Summon Laalish', r1: 'Rampage (Abyssal Titan)', r2: 'Dread Claws (Encircling Terror)', l2: 'Evade', replaced: 'No bar swap from Lv 41 through Lv 70', why: 'Endgame Entry milestone. All primary actives ranked high. Paragon unlocks at Lv 70.' },
      { level: 'final', label: 'Mastermind Mature (Final Endgame)', square: 'Profane Sentinel', triangle: 'Metamorphosis (Terror Demon)', circle: 'Nether Step (Recall Shadows; becomes Evade itself when Footfalls of the Waning World is equipped)', x: 'Summon Laalish', r1: 'Rampage (Abyssal Titan)', r2: 'Dread Claws (Encircling Terror)', l2: 'Evade (or Sigil of Summons in prolonged boss fights when Footfalls frees the L2 slot via Nether Step becoming Evade)', replaced: 'Square swaps Command Fallen for Profane Sentinel. Optional: Sigil of Summons takes L2 in long fights once Footfalls is equipped.', why: 'Maxroll endgame swap: once Dominion paragon and 2x Lucky Hit Chance to Restore Resources rings are online, Profane Sentinel replaces Command Fallen because the Dominion plus Lucky Hit chain covers the Wrath economy.' },
    ],
  },

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
      { name: 'Maxroll Leveling', url: 'https://maxroll.gg/d4/build-guides/warlock-dread-claws-mastermind-leveling-guide', role: 'Per-level skill point allocation, respec waypoints at Lv 15/30/34/40' },
      { name: 'Icy Veins', url: 'https://www.icy-veins.com/d4', role: 'Build mechanics, leveling' },
      { name: 'Mobalytics', url: 'https://mobalytics.gg/diablo-4', role: 'Theorycrafting, variants' },
      { name: 'FextraLife wiki', url: 'https://diablo4.wiki.fextralife.com', role: 'Authoritative in-game names' },
      { name: 'Game8', url: 'https://game8.co/games/Diablo-4', role: 'Tier lists, quick reference' },
      { name: 'Wowhead D4', url: 'https://www.wowhead.com/diablo-4', role: 'Item database' },
    ],
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
      summary: 'Class quest opens up the Soul Shard system. Dread Claws becomes Encircling Terror, an AoE that circles both you and your demon.',
      respec: { trigger: true, level: 15, label: 'Respec at 15: Encircling Terror and Mastermind Shard' },
      steps: [
        { id: 's1', text: 'Complete the Warlock class quest the moment it appears in your log', priority: 'high' },
        { id: 's2', text: 'Pick Mastermind Soul Shard, summon Laalish', priority: 'high' },
        { id: 's3', text: 'Take Dread Claws: Encircling Terror upgrade', priority: 'high' },
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
        { id: 's4', text: 'Take Nether Step: Recall Shadows for the summon pull and extra duration', priority: 'high' },
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
