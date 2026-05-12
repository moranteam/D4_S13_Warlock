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

  /* Batch 3 */
  skills: [],
  soulShards: [],
  fragments: {},
  aspects: [],

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
