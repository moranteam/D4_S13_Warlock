# Endgame Reconciliation V2 Delta Log

**Build:** Dread Claws Mastermind Warlock
**Patch:** 3.0.2 Lord of Hatred, Season 13
**Compiled:** 2026-05-14
**Reconciliation method:** Maxroll endgame canonical, Icy Veins secondary, Mobalytics tertiary, eGamersWorld and BoostMatch tiebreakers only

## Sources Fetched

| Source | Status | Tier | Author | Date |
|--------|--------|------|--------|------|
| Maxroll endgame | SUCCESS | Canonical | wudijo | 2026-05-08 |
| Maxroll leveling | SUCCESS | Canonical (leveling) | wudijo | 2026-05-08 |
| Icy Veins | SUCCESS | Secondary | GhazzyTV, Cashlarond | 2026-05-02 |
| Mobalytics | SUCCESS | Tertiary | Sanctum | 2026-05-14 |
| eGamersWorld | FAILED, HTTP 403 | Tiebreaker | - | - |
| BoostMatch | FAILED, HTTP 403 | Tiebreaker | - | - |

## Resolutions

### Resolution 1: Talisman Set Name
- **Maxroll:** Chains of Horazon (4 piece bonus)
- **Mobalytics:** Berú of Horazon's Chains (5 piece, full canonical name)
- **Icy Veins:** Shadow of Harash (5 piece, likely outdated or alternate name)
- **Resolution:** Maxroll canonical. Use "Chains of Horazon" as the short name and "Berú of Horazon's Chains" as the full canonical name. Treat Icy Veins "Shadow of Harash" as overruled. Confidence HIGH.

### Resolution 2: Hired Mercenary
- **Maxroll:** Raheir hired plus Aldkin reinforcement
- **Icy Veins:** Raheir hired plus Varyana reinforcement
- **Mobalytics:** Varyana hired plus Aldkin reinforcement
- **eGamersWorld:** Subo hired (per Charlie's prompt, source fetch failed)
- **Resolution:** Maxroll canonical, Raheir hired plus Aldkin reinforcement. UI should document the controversy and offer the 3 reconciled pair presets so Charlie can choose. Confidence MEDIUM.

### Resolution 3: Helm Choice
- **Maxroll:** Not explicit (silent on helm specifics)
- **Icy Veins:** Heir of Perdition (Mythic Unique)
- **Mobalytics:** Heir of Perdition
- **Resolution:** Heir of Perdition is canonical. Both secondary and tertiary sources agree, Maxroll is silent rather than disagreeing. Confidence HIGH.

### Resolution 4: Ring 2 Choice
- **Maxroll:** Legendary with Demonic Aspect
- **Icy Veins:** Legendary with Demonic Aspect
- **Mobalytics:** Ring of Starless Skies (Mythic Unique)
- **Resolution:** Both options viable. Ring of Starless Skies is the BIS Mythic when farmed, Demonic Aspect on legendary is the canonical fallback. Confidence MEDIUM on which is primary, HIGH on both being viable.

### Resolution 5: Aspect Per Slot Mappings
- **Maxroll:** Names 4 aspects in priority order for amulet (Rallying Reversal, Nefarious, Undying, Elusive Menace), silent on per slot detail elsewhere
- **Icy Veins:** Per slot specific aspects: Deeper Shadows (chest), Calamity (gloves), Might (pants), Crippling Darkness (boots), Hellbent Commander (amulet), Demonic (ring 2), Peril (offhand)
- **Mobalytics:** Categories like Aggressive (gloves), Crushing (ring 1), Demonic (offhand)
- **Resolution:** Icy Veins per slot specifics adopted as canonical (most detailed source). Maxroll amulet aspect list inserted as primary for amulet specifically. Mobalytics categories noted as alternatives where they overlap. Confidence HIGH on slot mappings.

### Resolution 6: Skill Bar Variants
- **Maxroll:** Single endgame rotation with 9 abilities described, 6 active slots after swaps
- **Icy Veins:** Single endgame bar, 6 slots, condensed list
- **Mobalytics:** 3 variants (Push, Speedfarm, Starter), each with 6 slot bars
- **Resolution:** Maxroll canonical for the final endgame bar. Mobalytics Push and Speedfarm variants documented as situational alternatives. Confidence HIGH on final bar, MEDIUM on variant split.

### Resolution 7: Stat Caps
- **Maxroll:** 100 percent Crit Chance from gear alone goal
- **Mobalytics:** Detailed numeric targets (Crit Chance 90, Crit Damage 300, Vulnerable 150, Attack Speed 86, Willpower 2100)
- **Icy Veins:** Silent
- **Resolution:** Mobalytics enumerated targets adopted as canonical since Maxroll is silent on specific numbers. Confidence MEDIUM (only one source provides numbers, but they are detailed and self consistent).

### Resolution 8: Glyph Priority
- **Maxroll:** Abyssal, Demonologist, Unbound, Destruction, Mastermind
- **Icy Veins:** Silent on glyph names
- **Mobalytics:** Silent on glyph names
- **Resolution:** Maxroll canonical glyph priority adopted. Confidence HIGH (single explicit source, no contradicting sources).

### Resolution 9: Soul Shard plus Fragment
- All sources agree on Mastermind plus Blasphemous
- **Resolution:** Locked combo, confidence HIGH.

### Resolution 10: Runes
- **Maxroll:** Silent on rune pairs
- **Icy Veins:** Neo plus Prid (chest), Nagu plus Que (pants) canonical
- **Mobalytics:** Cir plus Que (primary), Nagu or Igni plus Prid (secondary)
- **Existing `runesgems.js`:** Already canonicalizes Neo plus Prid plus Nagu plus Que from Resolution 8 of Sprint 1 RECONCILIATION.md
- **Resolution:** Hold Neo plus Prid plus Nagu plus Que as canonical pairs. Document Cir plus Que and Cir plus Ceh as A tier alternatives. Confidence HIGH.

## Excluded Topics

### PvP and Hardcore
Out of scope per the project's build target lock (Dread Claws Mastermind, Standard mode). Not covered in endgamedata.js.

### Codex of Power
Deferred to dedicated Sprint 9 per existing roadmap. Sprint 8 lands hooks for the Codex view to read from when its data layer ships.

### eGamersWorld and BoostMatch Content
Both sources returned HTTP 403. Their potential cross references are not available. Affected rows where these would have served as tiebreakers carry MEDIUM confidence rather than HIGH.

## Confidence Distribution

| Confidence Tier | Areas Covered |
|----------------|---------------|
| HIGH | Helm, gloves, pants, boots, weapon, offhand, talismans, soul shard, fragment, runes (existing canonicalization), glyph priority order, paragon under 200 vs over 200 split, skill bar final endgame, resource management mechanics, boss kill rotation |
| MEDIUM | Amulet (multiple aspect alternatives), Ring 2 (Mythic vs legendary), mercenary picks (3 way source disagreement), stat cap numbers (single source), skill bar variants (Push vs Speedfarm), Torment 2 plus to Torment 8 Pit gate thresholds, glyph Pit tier upgrade thresholds |
| LOW | Individual rune drop spots, individual tempering manual farm spots, eGamersWorld and BoostMatch tiebreaker rows |

## Open Reconciliation Questions

1. **Subo as hired mercenary:** eGamersWorld reportedly recommended this. No confirmation in canonical sources. Status: LOW confidence, skip unless future fetch confirms.
2. **Mythic socketing patterns:** Sources are inconsistent on whether 2 socket Heir of Perdition gets 2x Royal Sapphire or 1x Sapphire plus 1x Diamond. Maxroll silent, Icy Veins says Sapphire. Use Royal Sapphire per Icy Veins.
3. **Echoing Hatred tier:** Mobalytics and other sources differ on whether this new LoH activity is S tier or A tier. Existing `data.js` Sprint 1 reconciliation says A. Holding A.

## Patch Refresh Trigger

If Blizzard ships a balance patch mid overhaul, re run this full pipeline:
1. WebFetch the 6 URLs again in parallel
2. Diff against the current raw markdowns
3. Re reconcile the affected sections
4. Regenerate `endgamedata.js`
5. Commit as a single "patch refresh" mini sprint

This is fully automatable.

## V2.1 Refresh, 2026-05-15

Three additional sources supplied by Charlie and reconciled:
- Mobalytics Dread Claws Leveling (Raxxanterax, 2026-05-10), NEW
- Mobalytics Endgame refresh (Sanctum, 2026-05-15), update of the 2026-05-14 snapshot
- Icy Veins Warlock Leveling (GhazzyTV, Cashlarond, 2026-04-24), NEW but generic

### Resolution 11: Subo mercenary, leveling phase
Previously Subo was LOW confidence, skipped, not in any canonical source. Mobalytics
Dread Claws Leveling now explicitly recommends Subo hired (Map Hack, Movement Speed,
Vulnerability) plus Aldkin reinforcement for the LEVELING phase. Resolution: add Subo
as a leveling phase hired option at MEDIUM confidence. Endgame canonical stays Raheir
hired plus Aldkin reinforcement (Maxroll). The two phases are distinct.

### Resolution 12: Optimized Push skill bar variant
Mobalytics refresh adds an Optimized Push variant with a specific boss rotation: cast
Sigil to activate Beru of the Nameless Ritual (200 percent damage, 40 percent DR),
swap Sigil for Endless Barrage Bombardment, cast every 10 seconds. Added as a MEDIUM
confidence Mobalytics variant. Maxroll canonical final bar unchanged.

### Resolution 13: Greater Demon damage math
Mobalytics refresh gives precise figures: 11 Greater Demons (4 Shard, 5 Profane
Sentinel, 1 Abyssal Titan, 1 Sigil of Summons) yields roughly 330 percent damage via
Beru of Horazon's Chains. This sharpens the earlier "~15x" estimate. Soul shard
synergy note updated, confidence MEDIUM (single source, self consistent).

### Resolution 14: Willpower scaling number
Icy Veins generic Warlock leveling guide states Willpower scales all Warlock damage at
12.5 percent per 100 points. Adopted as a stat caps note, MEDIUM confidence (single
source, build agnostic, consistent with the Willpower target).

### Resolution 15: Leveling aspect per slot list
Mobalytics leveling provides a 10 slot leveling aspect priority. More granular than
Maxroll leveling's shorter list. Documented in the raw source for reference. Not
promoted into canonical data because it is leveling phase only and Maxroll remains
canonical for leveling. Available if a leveling aspect view is built later.

### Non resolution: Terror Swarm naming
Mobalytics leveling skill point order names "Terror Swarm" which does not match the
canonical skill names in data.js. Treated as a source naming discrepancy. Canonical
leveling skill data NOT changed.
