/* ============================================
   D4_PARAGON
   Patch 3.0 Lord of Hatred, Season 13.

   Sources: Maxroll endgame guide (glyph priority HIGH),
   board rotation MEDIUM as Maxroll uses visual diagrams
   that did not extract as text. Board names below are
   the canonical Warlock board pool plus the legendary
   nodes the build wants.
   ============================================ */

window.D4_PARAGON = {
  patch: '3.0 Lord of Hatred',
  compiledAt: '2026-05-11',

  /* ==========================================
     GLYPH PRIORITY (Maxroll explicit order)
     Level all to 15 first for the radius bonus,
     then return to 46 for the secondary multipliers.
     ========================================== */
  glyphs: [
    { id: 'abyssal', name: 'Abyssal', order: 1, effect: 'Multiplies Abyss damage. Primary multiplier for Dread Claws and Rampage hits.', target1: 15, target2: 46, confidence: 'HIGH' },
    { id: 'demonologist', name: 'Demonologist', order: 2, effect: 'Boosts demon and summon damage. Stacks with Rampage and Laalish output.', target1: 15, target2: 46, confidence: 'HIGH' },
    { id: 'unbound', name: 'Unbound', order: 3, effect: 'Maximum Resource and Resource regeneration. Smooths the Wrath economy.', target1: 15, target2: 46, confidence: 'HIGH' },
    { id: 'destruction', name: 'Destruction', order: 4, effect: 'Critical Strike Damage multiplier. Pairs with Aspect of Calamity for crit ceiling.', target1: 15, target2: 46, confidence: 'HIGH' },
    { id: 'mastermind', name: 'Mastermind', order: 5, effect: 'Mastermind Shard synergy node. Boosts Shadowform and Hex damage.', target1: 15, target2: 46, confidence: 'HIGH' },
  ],

  /* ==========================================
     BOARD ROTATION
     MEDIUM confidence: Maxroll guide presents boards as
     visual diagrams that do not extract as text. The
     sequence below is built from the glyph priority plus
     standard Warlock board names. Verify in-game against
     Maxroll's diagram for final board socket positions.

     Strategy:
       sub-200 Paragon: rush legendary nodes via shortest
       path. Skip rare nodes that do not connect.
       post-200: respec to the full rotation with glyph
       radius coverage.
     ========================================== */
  boards: [
    {
      id: 'starter',
      order: 0,
      name: 'Starter Board',
      legendaryNode: 'Class starter (Intelligence cluster)',
      glyphSlot: null,
      notes: 'Default starting board. Take Intelligence and Dexterity clusters en route to the socket. The socket on the right edge connects to your second board.',
      confidence: 'HIGH',
    },
    {
      id: 'board-abyssal',
      order: 1,
      name: 'Abyssal Board',
      legendaryNode: 'Abyss damage multiplier',
      glyphSlot: 'abyssal',
      notes: 'First board after Starter. Rush the legendary node, then socket Abyssal glyph for the multiplier on Dread Claws hits.',
      confidence: 'MEDIUM',
    },
    {
      id: 'board-demonologist',
      order: 2,
      name: 'Demonologist Board',
      legendaryNode: 'Demon and summon damage',
      glyphSlot: 'demonologist',
      notes: 'Stacks demon output. Critical for Rampage and Laalish damage.',
      confidence: 'MEDIUM',
    },
    {
      id: 'board-unbound',
      order: 3,
      name: 'Unbound (Resource) Board',
      legendaryNode: 'Maximum Resource and regen',
      glyphSlot: 'unbound',
      notes: 'Smooths Wrath economy once the build is fully online. Take after the two damage boards.',
      confidence: 'MEDIUM',
    },
    {
      id: 'board-destruction',
      order: 4,
      name: 'Destruction Board',
      legendaryNode: 'Critical Strike Damage',
      glyphSlot: 'destruction',
      notes: 'Crit damage multiplier. Pair with Aspect of Calamity and Crit affixes for the crit ceiling.',
      confidence: 'MEDIUM',
    },
    {
      id: 'board-mastermind',
      order: 5,
      name: 'Mastermind Board',
      legendaryNode: 'Mastermind Shard synergy',
      glyphSlot: 'mastermind',
      notes: 'Final board. Shadowform and Hex multipliers. Take only post-200 Paragon when the rest of the build is set.',
      confidence: 'MEDIUM',
    },
  ],

  /* ==========================================
     STAT TARGET WINDOWS (Mobalytics endgame)
     ========================================== */
  statTargets: [
    { stat: 'Critical Strike Chance', target: '90%', note: 'From gear plus Calamity aspect' },
    { stat: 'Critical Strike Damage', target: '300%', note: 'Tempers plus Destruction glyph' },
    { stat: 'Vulnerable Damage', target: '150%', note: 'Procced via Profane Sentinel' },
    { stat: 'Maximum Resource', target: '~280 (with Summon Vollach)', note: 'Smooths Wrath spend' },
    { stat: 'Attack Speed', target: '86%', note: 'Glove plus ring rolls plus Aggressive aspect' },
    { stat: 'All Damage / Shadow Damage', target: '100%', note: 'Roll on weapon and chest' },
    { stat: 'Willpower', target: '2100+', note: 'Main attribute; pivot to weapon damage past 2150' },
  ],
};
