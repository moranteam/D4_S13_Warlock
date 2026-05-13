# Data Reconciliation Audit Trail

**Sprint:** Sprint 1, Part A
**Date:** 2026-05-13
**Inputs:** `ai_llm_output_combined.md` (Grok, Perplexity, Claude sections)
**Skipped:** Gemini section (hallucinated generic ML research, not a D4 build reference)
**Tiebreaker rule:** Maxroll citation wins. Where no source cites Maxroll explicitly, the source that cites Maxroll most often wins (in practice, Claude).

---

## Methodology

1. For each data point that appears in all 3 usable sources, take the consensus answer.
2. For each disagreement, use the source whose stance is grounded in a Maxroll citation as the resolution.
3. For each data point that only 1 source provides, accept it with `confidence: LOW` and flag it.
4. The Gemini section is skipped entirely.

**Source profile in one line:**

| Source | Posture | Strengths | Weaknesses |
|---|---|---|---|
| Grok | Maxroll-first | Compact, opinionated, fills every level | Compresses Lv 54 to 70 into one row, no confidence flags |
| Perplexity | Icy Veins-first (Maxroll JS wall blocked it) | Honest confidence labels, cited sources | Most rows flagged Medium extrapolation |
| Claude | Maxroll-first with cross-citation | Most detailed, distinguishes Active vs Passive vs Upgrade, calls out Maxroll vs Mobalytics vs Icy Veins disagreements inline | Long, but that is a feature |

Where the three diverge on the same fact, Claude's reading is treated as the canonical reconciliation because Claude cites Maxroll most rigorously per data point.

---

## Resolution Log

### Resolution 1: Dread Claws Upgrade Name (Sprint owner ruled)

| Field | Grok | Perplexity | Claude | Existing `data.js` | Resolution |
|---|---|---|---|---|---|
| Lv 15 Dread Claws upgrade | Encircling Terror | Encircling Terror | Encircling Terror | Enveloping Terror | **Encircling Terror** |

**Decision:** All 3 LLM sources agree on "Encircling Terror." The Sprint owner ruled per Maxroll. The existing `data.js` and one walkthrough phase description carry "Enveloping Terror" and must be corrected in Part B updates.

**Affected sites in current codebase:**
- `data.js:54` skill `dread-claws` upgrades array: contains "Enveloping Terror"
- `data.js:55` skill `dread-claws` recommended array: contains "Enveloping Terror"
- `data.js:223` endgameBar slot 1 upgrade: "Enveloping Terror"
- `data.js:737` walkthrough p3 summary, `s3` step text, and one occurrence in p1 summary
- `app.js:806` Dashboard phase 3 description string
- `app.js:822` Dashboard pivot Lv 15 description
- `itemdata.js:24` Litany of Sable effect references "Dread Claws"
- README references (to be replaced in Part E)

**Confidence:** HIGH (3 of 3 LLMs agree, Sprint owner confirmed Maxroll canonical).

---

### Resolution 2: Nether Step Lv 34 Upgrade Name

| Field | Grok | Perplexity | Claude | Existing `data.js` | Resolution |
|---|---|---|---|---|---|
| Lv 34 Nether Step upgrade | Shadow Recall | Recall Shadows | Recall Shadows | Shadow Recall | **Recall Shadows** |

**Decision:** Perplexity and Claude both cite Maxroll for "Recall Shadows." Grok uses "Shadow Recall" but does not cite Maxroll for the name. Claude's explicit Maxroll quote: "drop Hellion Sting and Sigil of Subversion to pick up Command Fallen Fallen Rush and Dark Prison Chain Aura ... Recall Shadows on Nether Step makes Abyssal Titan teleport with you."

**Affected sites:**
- `data.js:79` skill `nether-step` upgrades array: contains "Shadow Recall"
- `data.js:80` skill `nether-step` recommended array: contains "Shadow Recall"
- `data.js:227` endgameBar slot 5 upgrade: "Shadow Recall"
- `data.js:826` walkthrough p6 `s4` step text
- `app.js:821` Dashboard pivot Lv 34 description

**Confidence:** HIGH (2 of 3 LLMs agree, both cite Maxroll, Grok provides no counter-citation).

---

### Resolution 3: Skill Point Allocation, Lv 1 to 70

**Decision:** Use Claude's per-level table as canonical scaffold. Claude is the only source that:
- Provides 70 distinct rows (Grok compresses 54-70 into one row; Perplexity flags rows 5-7 and 21-69 as Medium extrapolation).
- Distinguishes Active Skill rank (AS) vs Passive node (P) vs Upgrade node (U) vs Soul Shard/Fragment selection (R).
- Cites Maxroll inline per major decision point.

**Where Grok and Claude conflict on rank order at non-respec levels:** prefer Claude. Grok's table assigns "Command Laalish (rank 2)" at Lv 22 etc, treating Laalish as a regular skill. Claude correctly treats Summon Laalish as a Soul Shard active granted by Mastermind Shard, not a standalone skill point.

**Where Perplexity disagrees with both Grok and Claude on the post-Lv 40 path:** Perplexity puts heavy weight on Profane Sentinel ranks 1-5 between Lv 29 and 47. Grok puts Profane Sentinel ranks 1-5 between Lv 42 and 52. Claude defers Profane Sentinel into endgame entirely and uses Command Fallen as the leveling resource skill, swapping to Profane Sentinel only once Dominion paragon plus Lucky Hit Restore Resources rings are online. **Resolution: Claude.** Maxroll canonical bar at Lv 70 is Dread Claws, Rampage, Command Fallen, Nether Step, Summon Laalish, Metamorphosis. Profane Sentinel is an endgame post-70 swap.

**Confidence per row:**
- Lv 1, 3, 4, 8, 9, 14, 15, 20, 30, 34, 40, 41: **HIGH** (3 of 3 cite Maxroll)
- Lv 2, 5 to 7, 10 to 13, 16 to 19, 21 to 29, 31 to 33, 35 to 39, 42 to 70: **MEDIUM** (Claude provides specific rank assignments, Grok partially agrees, Perplexity flags Medium)

The per-level table is written in `leveling-skill-points.md`. Confidence labels are written per row in that file.

---

### Resolution 4: Metamorphosis Unlock Level (40 vs 41)

| Field | Grok | Perplexity | Claude | Resolution |
|---|---|---|---|---|
| Metamorphosis unlock level | "Metamorphosis (rank 1)" at Lv 37, "Terror Demon (full)" at Lv 41 | Lv 41 | Lv 40 unlock per Maxroll, Lv 41 is the first full level on bar | **Lv 40 unlock, Lv 41 on bar** |

**Decision:** Claude explicitly calls out the ambiguity. Maxroll's leveling guide states Metamorphosis is picked up at Lv 40 as the fourth respec. Because the skill is taken during the respec at Lv 40, Lv 41 is the first full level the player operates with it on the bar. Both points are captured in `controller-bindings.md` (Lv 41 milestone row) and `leveling-skill-points.md` (Lv 40 respec row).

Grok's Lv 37 placement of Metamorphosis rank 1 is dropped because Metamorphosis is locked behind the Lv 40 respec; you cannot place rank 1 at Lv 37 without contradicting the respec gate.

**Confidence:** HIGH.

---

### Resolution 5: PS5 Controller Button Layout

**Decision:** Bar contents are canonical from Maxroll and Mobalytics. Exact button placement is player preference, so flag the milestone table as **MEDIUM** confidence on button assignments, **HIGH** confidence on bar contents.

**Source comparison at Lv 70 (endgame leveling target):**

| Slot | Grok | Perplexity | Claude | Resolution |
|---|---|---|---|---|
| Square | Dread Claws | Hellion Sting | Command Fallen | Command Fallen (post Lv 34 respec, no Hellion Sting on bar) |
| Triangle | Nether Step | Dread Claws | Metamorphosis (Terror Demon) | Metamorphosis (Ultimate on a face button per Claude ergonomic logic) |
| Circle | Command Laalish | Nether Step | Nether Step (Recall Shadows) | Nether Step |
| X | Rampage (Abyssal Titan) | Abyssal Titan Rampage | Summon Laalish | Summon Laalish |
| R1 | Command Fallen | Summon Laalish | Rampage (Abyssal Titan) | Rampage |
| R2 | Profane Sentinel | Terror Demon Metamorphosis | Dread Claws (Encircling Terror) | Dread Claws |
| L2 | Metamorphosis (Terror Demon) | Evade | empty (or Sigil of Summons post Footfalls) | Evade by default; Sigil of Summons once Footfalls is equipped (Nether Step becomes Evade) |

**Decision rationale:** Claude's ergonomic logic is grounded in build mechanics:
- Dread Claws on R2 because it is the spam button
- Rampage on R1 because it is recast frequently to refresh Hex via Blasphemous Fragment
- Metamorphosis on Triangle because it is the Ultimate nuke and needs a hard-to-misfire button
- Nether Step on Circle because the player chains it instinctively for evades and Shadowform generation
- Summon Laalish on X because it is the Soul Shard active and the player wants thumb access

Grok and Perplexity have internally inconsistent layouts (Grok has Dread Claws on Square at Lv 70 but the user has been using R2 for the spam button since Lv 3 in Grok's own table). Claude's layout is the only one that holds the spam-button-on-R2 ergonomic from Lv 3 to Lv 70.

**Confidence:** HIGH on bar contents per milestone. MEDIUM on exact button placement.

---

### Resolution 6: Endgame Bar Final Slot (Command Fallen vs Profane Sentinel)

| Field | Grok | Perplexity | Claude | Resolution |
|---|---|---|---|---|
| Final endgame Lv 70 R1/R2 slot | Command Fallen kept | Command Fallen kept | Command Fallen pre-Dominion, Profane Sentinel post-Dominion | **Two states: pre-Dominion and post-Dominion** |

**Decision:** Claude's explicit Maxroll endgame quote: "Profane Sentinel comes in once Dominion paragon and two rings with Lucky Hit Chance to Restore Resources are online." Pre-Dominion, the bar keeps Command Fallen. Post-Dominion, Command Fallen is replaced by Profane Sentinel because Dominion plus Lucky Hit rings cover the resource gap.

Both states are written into `controller-bindings.md` as separate rows (Lv 70 = Command Fallen, Final Endgame = Profane Sentinel).

**Confidence:** HIGH.

---

### Resolution 7: Gear Weights, Per Slot

**Decision:** Use Claude's by-slot breakdown as canonical. Claude is the only source that:
- Treats Daggers and Focus as separate slots (1H + offhand)
- Includes a 2H Weapon alternative (Mobalytics nicktew variant) flagged MEDIUM confidence
- Lists 11 distinct slots with three tables each (Affix Priority, Tempering, Masterwork Crit)
- Cites Icy Veins endgame and Maxroll endgame inline

**Where Perplexity disagrees on top affix for the Helm slot:** Perplexity flags Critical Strike Chance as weight 10 with extra-large CSC from Heir of Perdition. Claude agrees: Critical Strike Chance is the top affix on Helm, weight 10, triple star priority from Icy Veins. Grok puts Max Life weight 10 on Helm, which is inconsistent with the Heir of Perdition baseline. **Resolution:** Critical Strike Chance, weight 10, Helm.

**Where Grok has Max Life weight 10 on Chest:** Claude and Perplexity both put Maximum Resource (Wrath) weight 10, triple star, citing Icy Veins endgame. **Resolution:** Maximum Resource weight 10.

**Where Grok has Crit Damage weight 10 on Gloves:** Claude and Perplexity both put Attack Speed weight 10, triple star, citing Icy Veins endgame. **Resolution:** Attack Speed weight 10.

**Where Grok has Movement Speed weight 10 on Boots:** Claude and Perplexity both put Willpower weight 10, triple star, citing Icy Veins endgame, with Movement Speed as weight 8. **Resolution:** Willpower weight 10. Boots gets a build-defining temper override (Attacks Reduce Evade Cooldown) once Footfalls of the Waning World is equipped.

All 11 slot tables are written into `gear-weights.md`.

**Confidence:** HIGH for Daggers, Focus, Helm, Chest, Gloves, Pants, Boots, Amulet, Ring 1, Ring 2. MEDIUM for the 2H Weapon alternative slot.

---

### Resolution 8: Rune Combos

| Combo | Grok | Perplexity | Claude | Resolution Tier |
|---|---|---|---|---|
| Cir + Ceh | S, AoE plus freeze on ritual trigger | S, Spirit Wolves on 5 skills cast | S, Crit-triggered Vulnerable ramp (per aoeah Litany guide) | **S, canonical Vulnerable uptime combo for Dread Claws Mastermind** |
| Cir + Que | not listed | S, Earthen Bulwark Barrier on 5 skills cast | A, 45 percent Barrier every 3 sec (Mobalytics endgame) | **A, defensive Pit-pushing combo** |
| Igni + Prid | S, automates Dark Prison | S, on-demand Dark Prison | S as Nagu/Igni + Prid, automates Chain Aura Dark Prison (Mobalytics + Icy Veins canonical) | **S, the canonical chest-runeword automation that lets you drop Dark Prison from bar after Lv 40** |
| Neo + Prid | not listed | S, Offering on avoid-damage 2 sec, Dark Prison | A, Icy Veins canonical chest pairing | **A, alternative chest runeword for play styles that take more damage** |
| Nagu + Que | not listed | S, Barrier from summon uptime | A, Icy Veins canonical pants pairing | **A, canonical pants runeword (always-on summons make Nagu reliable)** |
| Yul + Lac | not listed | A, Offering generation + Challenging Shout barrier | B, "not specifically named in surveyed Maxroll/Mobalytics/Icy Veins sources for this build" | **B, accept with confidence: LOW** |
| Cem + Qua | A, evade CDR plus movement speed | not listed | not listed | **LOW confidence (Grok only)** |
| Gar + Que | B, Crit chance plus Earthen Bulwark hybrid | not listed | not listed | **LOW confidence (Grok only)** |
| Tam + Jah | B, Core skill spam reduction plus Teleport | not listed | not listed | **LOW confidence (Grok only)** |
| Gar + Cem | not listed | not listed | B, Mobalytics nicktew "interchangeable with Cir Ceh" | **B, filler** |
| Mother's Embrace | not listed | not listed | "not directly named in any surveyed source" | **Excluded, confidence: LOW. Not present in canonical Dread Claws Mastermind setups.** |

**Decision:** 6 confirmed combos with Maxroll/Mobalytics/Icy Veins citations (Cir+Ceh, Cir+Que, Igni+Prid, Neo+Prid, Nagu+Que, Gar+Cem). Yul+Lac included per Sprint master prompt request but flagged LOW.

**Confidence:** HIGH for the 6 confirmed combos. LOW for Yul+Lac, Cem+Qua, Gar+Que, Tam+Jah, Mother's Embrace.

---

### Resolution 9: Gems Per Slot

| Slot Type | Grok | Perplexity | Claude | Resolution |
|---|---|---|---|---|
| Weapon (1H Dagger + Focus) | Royal Amethyst | Royal Amethyst | Royal Amethyst, 24 percent Shadow Damage at Royal | **Royal Amethyst** |
| Helm | Royal Sapphire | Royal Sapphire OR Runeword | Royal Sapphire, Willpower | **Royal Sapphire** (single socket on Helm) |
| Chest | Royal Sapphire OR Royal Ruby | Runeword (Neo + Prid) | Runeword (Neo + Prid) | **Runeword (Neo + Prid)** |
| Pants | Royal Sapphire | Runeword (Nagu + Que) | Runeword (Nagu + Que) | **Runeword (Nagu + Que)** |
| Amulet | Royal Diamond OR Royal Skull | Royal Skull OR Royal Diamond | Royal Diamond, fall back to Royal Skull for armor | **Royal Diamond, Royal Skull as alternative** |
| Ring 1, Ring 2 | Royal Diamond OR Royal Skull | Royal Skull OR Royal Diamond | Royal Diamond or Royal Skull | **Royal Diamond, Royal Skull as alternative** |

**Decision:** Grok dissents on Chest and Pants, suggesting gems instead of runewords. Claude and Perplexity both cite Icy Veins endgame for the runeword pairings (Neo+Prid on Chest, Nagu+Que on Pants), and these pairings are mechanically required to automate Dark Prison and generate Barrier respectively. **Resolution:** Runewords on Chest and Pants.

**Confidence:** HIGH for Weapon (Amethyst), Helm (Sapphire), Chest (Runeword), Pants (Runeword), Jewelry (Diamond or Skull). Gloves and Boots have no sockets in D4.

---

### Resolution 10: Bosses and Drop Tables

The 3 LLM sources do not contradict each other on boss drops. They cite the same sources (FextraLife, Maxroll, AOEAH) that `itemdata.js` and `data.js` already track. No changes required in Sprint 1 reconciliation.

**One LOW-confidence exception:** Bartuc as an alt drop source for Footfalls of the Waning World. AOEAH-only. Already flagged LOW in `data.js:684`. Keep as-is.

---

## LOW Confidence Flags Summary

Single-source data points that we are accepting with `confidence: LOW`:

1. **Yul + Lac rune combo.** Claude explicitly states it is "not specifically named in surveyed Maxroll/Mobalytics/Icy Veins sources for this build." Master prompt asks for at least 6 combos so we include it.
2. **Cem + Qua rune combo** (Grok only). Evade CDR plus Movement Speed.
3. **Gar + Que rune combo** (Grok only). Crit Chance plus Earthen Bulwark.
4. **Tam + Jah rune combo** (Grok only). Core skill spam reduction.
5. **Mother's Embrace synergies.** All 3 sources explicitly do not name this for Dread Claws Mastermind. Excluded from the canonical combo list, noted for completeness.
6. **Bartuc as alt Footfalls drop** (AOEAH only). Already in `data.js`, keep as LOW.
7. **2H Weapon (The Grandfather) alternative slot.** Mobalytics nicktew variant only. Maxroll canonical is 1H Dagger + Focus.
8. **Per-level skill point assignments at non-milestone levels** (Lv 2, 5 to 7, 10 to 13, 16 to 19, 21 to 29, 31 to 33, 35 to 39, 42 to 70). Claude provides specific ranks but no source cites Maxroll for individual rank order at these levels. Flagged MEDIUM in the per-level table, not LOW.

---

## Source Map

The 4 deliverable MD files in this sprint draw on the following slices of `ai_llm_output_combined.md`:

| Output file | Primary source | Secondary source | Tertiary source |
|---|---|---|---|
| `leveling-skill-points.md` | Claude Section 1 (70-row table) | Grok Section 1 (consensus check Lv 1 to 53) | Perplexity Section 1 (Medium-flag spot check) |
| `controller-bindings.md` | Claude Section 2 (ergonomic logic + bar contents) | Grok Section 2 (consensus on bar contents per milestone) | Perplexity Section 2 (default PS5 layout reference) |
| `gear-weights.md` | Claude Section 3 (11 slots, 3 tables each) | Perplexity Section 3 (consensus on triple-star Icy Veins affixes) | Grok Section 3 (consensus on Royal Amethyst weapon gem) |
| `runes-gems.md` | Claude Section 4 (6 confirmed combos + LOW flags) | Perplexity Section 4 (Cir+Que, Nagu+Que confirmation) | Grok Section 4 (Cem+Qua, Gar+Que, Tam+Jah LOW combos) |

---

## Open Items Forwarded to Part B

These edits to existing data files fall out of Part A reconciliation and will be applied in Part B:

1. **Rename "Enveloping Terror" to "Encircling Terror"** across `data.js`, `app.js`, `itemdata.js` (if present), and README.
2. **Rename "Shadow Recall" to "Recall Shadows"** across `data.js` and `app.js`.
3. **Add per-level walkthrough expansion** to `data.js` (new `levelingPath` object, walkthrough phases preserved for backward compatibility with existing renderer).
4. **Add `controllerBindings` object** to `data.js`.
5. **Create `gearweights.js`** as the data source for the future Gear Comparison module (Sprint 3).
6. **Add slot-specific affix priority** per unique in `itemdata.js` (matches the slot weight tables in `gear-weights.md`).
7. **Update `compiledAt` to 2026-05-13**.
8. **Add Maxroll Leveling URL** explicitly to `patchMeta.sources`.

These edits are not made in Part A. They are Part B work, applied after you greenlight the remaining 4 MD files.

---

**End of audit trail.** Ready for spot check.
