# Gear Stat Weights and Targets per Slot

**Sprint:** Sprint 1, Part A
**Date:** 2026-05-13
**Build:** Dread Claws Mastermind Warlock
**Patch:** 3.0 Lord of Hatred, Season 13
**Canonical source:** Icy Veins endgame stat tables (triple-star bolded affixes) + Maxroll endgame gear guide. Per Resolution 7 of `RECONCILIATION.md`, Claude's by-slot breakdown is the reconciled scaffold.
**See also:** `RECONCILIATION.md` Resolution 7 (per-slot top-affix decisions where Grok dissented)

---

## How to Read This File

11 slots, 3 tables per slot:

- **Table A: Affix Priority.** What stats to look for on the gear roll. Weight 1 to 10 (10 = mandatory). Target roll is the absolute number to chase. Must-have flag distinguishes hard requirements from preferred-but-skippable.
- **Table B: Tempering Recommendations.** Which Tempering Manuals to apply in the post-drop affix slots. Tempering adds 2 new affixes per item.
- **Table C: Masterwork Crit Stat Priority.** When Masterwork upgrades reach the 4/8/12 milestones and randomly pick one affix to boost, you want that affix to be the highest-priority stat. List shows which affix you want the crit roll to land on.

**Confidence column at the end of each slot block:** HIGH means 2 of 3 LLMs cite Maxroll or Icy Veins for the specific top-affix. MEDIUM means only one source provides specific weights or the slot has known build variants (2H weapon alternative). LOW means single-source.

**No em or en dashes used. Hyphens only as compound-word joiners.**

---

## Global Endgame Stat Priority Targets

Per Mobalytics Sanctum variant (Perplexity Section 3, updated May 13 2026):

| Priority | Stat | Target |
|---|---|---|
| 1 | Critical Strike Chance | ~90 percent |
| 2 | Critical Strike Damage Multiplier | ~300 percent |
| 3 | Vulnerable Damage Multiplier | ~150 percent |
| 4 | Maximum Resource (Wrath) | ~280 with Summon Vollach active |
| 5 | Attack Speed | ~86 percent with Aspect of Rallying Reversal, Berú of Horazon's Chains, and Varyana up |
| 6 | All Damage / Shadow Damage Multiplier | ~100 percent |
| 7 | Willpower | ~2100 |
| 8 | Weapon Damage | Push past ~2150 Willpower then pivot to Weapon Damage |

These targets are the budget the per-slot tables below are trying to add up to.

---

## Slot 1: Two-Handed Weapon (Alternative)

Most Mastermind variants use 1H Dagger plus Focus (Litany of Sable + Aspect of Peril). The Grandfather 2H sword is the alternative championed by Mobalytics nicktew with Gem Strength Multiplier transfigure. **Maxroll canonical is the dagger plus focus pair; this 2H slot is documented for variant completeness only.**

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Weapon Damage (base plus GA) | 10 | Maximum item power roll | Yes | Base damage scales every multiplier in the build |
| Critical Strike Damage Multiplier | 9 | 60 to 110 percent | Yes | Main scaling stat once Crit Chance is capped |
| Shadow Damage Multiplier | 8 | 30 to 50 percent | Preferred | Synergizes with Royal Amethyst (24 percent Shadow Damage at Royal tier) |
| Vulnerable Damage Multiplier | 7 | 30 to 50 percent | Preferred | Stacks against Profane Sentinel applied Vulnerable |
| Willpower | 7 | 200 plus | Preferred | Class stat multiplier |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Worldly Stability (Attack Speed) | Attack Speed breakpoints define how quickly Dread Claws can fire | HIGH |
| Worldly Finesse (Critical Strike Damage) | Alternative if Attack Speed is already capped from other slots | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Weapon Damage | Crit hits the base damage roll, multiplying all later modifiers | 1 |
| Critical Strike Damage Multiplier | Then push the multiplier | 2 |
| Willpower | Tertiary if both bigger affixes already crit | 3 |

**Most important aspect or unique:** The Grandfather (Mobalytics nicktew variant) for the 150 percent Crit Multiplier and Max Life roll.
**Greater Affixes matter most on:** Weapon Damage and Critical Strike Damage Multiplier.
**Build-defining temper:** Worldly Stability for Attack Speed.
**Confidence:** MEDIUM (Maxroll canonical pair is dagger plus focus, not 2H).

---

## Slot 2: Daggers (Litany of Sable, Main Hand)

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Weapon Damage | 10 | Maximum | Yes | Litany of Sable's unique effect (100 to 120 percent Dread Claws increased damage and extra claws per Shadowform stack) multiplies off this base |
| Critical Strike Damage Multiplier | 9 | 60 to 110 percent | Yes | Main damage scaling once Crit Chance is high |
| Shadow Damage Multiplier | 8 | 30 to 50 percent | Preferred | Direct scaler for Dread Claws |
| Willpower | 7 | 200 plus | Preferred | Class stat |
| Max Life | 4 | 1000 plus | Nice to have | Defensive backup |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Worldly Stability (Attack Speed) | Mandatory for hitting Dread Claws cast breakpoints | HIGH |
| Worldly Finesse (Critical Strike Damage) | Backup if Attack Speed temper rolls poorly | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Weapon Damage | Multiplies every downstream modifier | 1 |
| Critical Strike Damage Multiplier | After base damage, this is the next biggest swing | 2 |
| Shadow Damage Multiplier | Tertiary | 3 |

**Most important unique:** Litany of Sable (Ancestral Best in Slot). Craftable at the Horadric Cube by upgrading a 900 item power common dagger to unique.
**Greater Affixes matter most on:** Weapon Damage above all, then Critical Strike Damage Multiplier.
**Build-defining temper:** Worldly Stability for Attack Speed.
**Confidence:** HIGH.

---

## Slot 3: Focus (Offhand)

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Weapon Damage | 10 | Maximum | Yes | Focus contributes Weapon Damage as the offhand half |
| Maximum Resource (Wrath) | 9 | 30 to 50 | Yes | Scales Seed of Horazon if equipped; smooths Wrath economy |
| Critical Strike Damage Multiplier | 8 | 60 to 110 percent | Preferred | Standard scaler |
| Shadow Damage Multiplier | 7 | 30 to 50 percent | Preferred | Direct Dread Claws scaling |
| Cooldown Reduction | 5 | 8 to 12 percent | Nice to have | Helps Metamorphosis uptime |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Worldly Stability (Attack Speed) | Same logic as main hand: Dread Claws breakpoints | HIGH |
| Worldly Finesse (Critical Strike Damage) | Alternative | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Weapon Damage | Same logic as main hand | 1 |
| Maximum Resource | High value because it scales Seed of Horazon and the Banished Lord's Talisman 96 percent damage condition | 2 |
| Critical Strike Damage Multiplier | Tertiary | 3 |

**Most important aspect:** Aspect of Peril ("Making an enemy Vulnerable increases damage by x percent up to x percent" per Icy Veins endgame).
**Greater Affixes matter most on:** Weapon Damage and Maximum Resource.
**Build-defining temper:** Worldly Stability for Attack Speed.
**Confidence:** HIGH.

---

## Slot 4: Helm

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Critical Strike Chance | 10 | 8 to 14 percent | Yes (GA strongly preferred) | Triple star priority on Icy Veins endgame |
| Max Life | 7 | 1000 plus | Preferred | Survival floor |
| Willpower | 6 | 200 plus | Preferred | Class stat |
| Cooldown Reduction | 5 | 6 to 10 percent | Nice to have | Helps Metamorphosis |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Natural Resistance (Physical Resistance) | Highest target for elemental balance per Icy Veins endgame | HIGH |
| Natural Resistance (other resist) | If Physical is already capped from gear, fill the worst resist | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Critical Strike Chance | Biggest single damage swing on the slot per Icy Veins endgame (bolded) | 1 |
| Max Life | Survival multiplier | 2 |
| Willpower | Tertiary | 3 |

**Most important unique:** Heir of Perdition (Mythic). Mother's Favor grants 80 percent multiplicative damage. Craft via Resplendent Spark x1, Jah x10, Que x10, Gar x10.
**Greater Affixes matter most on:** Critical Strike Chance (the triple star priority).
**Build-defining temper:** Natural Resistance Physical for the universal damage reduction.
**Confidence:** HIGH. Resolution 7 of `RECONCILIATION.md` records the Grok dissent (Max Life as top affix) and its rejection.

---

## Slot 5: Chest

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Maximum Resource (Wrath) | 10 | 30 to 50 | Yes (triple star) | Bolded in Icy Veins endgame priority |
| Wrath Regeneration | 8 | Per affix range | Preferred | Smooths Dread Claws spam |
| Willpower | 7 | 200 plus | Preferred | Class stat |
| Maximum Life | 7 | 1000 plus | Preferred | Survival |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Natural Resistance (Lightning Resistance) | Specifically named in Icy Veins endgame as the chest temper | HIGH |
| Natural Resistance (other resist) | If Lightning is capped, fill worst gap | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Maximum Resource | Bolded as the must-masterwork stat (Icy Veins endgame) | 1 |
| Wrath Regeneration | Synergistic with Ring of Starless Skies and Dominion paragon | 2 |
| Maximum Life | Survival | 3 |

**Most important aspect:** Aspect of Deeper Shadows ("somewhat mandatory" per Icy Veins endgame). Increases maximum Shadowform stacks, which is the entire engine of Mastermind.
**Greater Affixes matter most on:** Maximum Resource above all.
**Build-defining temper:** Natural Resistance Lightning.
**Sockets:** Chest carries the Neo plus Prid runeword (both sockets consumed, no gem).
**Confidence:** HIGH. Resolution 7 of `RECONCILIATION.md` records the Grok dissent (Max Life as top affix) and its rejection.

---

## Slot 6: Gloves

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Attack Speed | 10 | 6 to 10 percent | Yes (triple star) | Bolded priority in Icy Veins endgame. Per Resolution 7, Grok dissents (Crit Damage weight 10) and is overruled. |
| Critical Strike Damage Multiplier | 8 | 30 to 50 percent | Preferred | Standard scaler |
| Ranks to Dread Claws | 7 | plus 2 to plus 4 | Preferred | Direct skill scaling |
| Willpower | 6 | 200 plus | Nice to have | Class stat |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Worldly Finesse (Critical Strike Damage) | Specifically named for gloves in Icy Veins endgame | HIGH |
| Worldly Finesse (Attack Speed) | If the affix did not roll well, double down via temper | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Attack Speed | Bolded must-masterwork (Icy Veins endgame) | 1 |
| Critical Strike Damage Multiplier | Secondary | 2 |
| Ranks to Dread Claws | Tertiary, ranks add base damage | 3 |

**Most important aspect:** Aspect of Calamity ("Hex increases your critical strike chance" per Icy Veins endgame). Because Blasphemous Fragment makes Rampage apply Hex, Calamity is effectively a permanent flat Crit Chance multiplier.
**Greater Affixes matter most on:** Attack Speed.
**Build-defining temper:** Worldly Finesse Critical Strike Damage.
**Sockets:** Gloves have 0 sockets in D4.
**Confidence:** HIGH. Resolution 7 records the Grok dissent and its rejection.

---

## Slot 7: Pants

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Maximum Life | 10 | 1000 plus | Yes (triple star) | Bolded in Icy Veins endgame |
| Willpower | 8 | 200 plus | Preferred | Class stat |
| Total Armor | 7 | Per affix range | Preferred | Physical mitigation |
| All Resistance | 7 | 6 to 10 percent | Preferred | Elemental mitigation |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Natural Resistance (Physical Resistance) | Specifically named for pants in Icy Veins endgame | HIGH |
| Natural Motion (Damage Reduction) | Alternative defensive temper | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Maximum Life | Bolded must-masterwork (Icy Veins endgame) | 1 |
| Willpower | Secondary | 2 |
| Total Armor | Tertiary | 3 |

**Most important aspect:** Aspect of Might (Basic Skill grants damage reduction) per Icy Veins endgame. **Temerity** is a strong unique alternative that frees this slot's aspect.
**Greater Affixes matter most on:** Maximum Life.
**Build-defining temper:** Natural Resistance Physical.
**Sockets:** Pants carry the Nagu plus Que runeword (both sockets consumed, no gem).
**Confidence:** HIGH.

---

## Slot 8: Boots

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Willpower | 10 | 200 plus | Yes (triple star) | Bolded in Icy Veins endgame. Per Resolution 7, Grok dissents (Movement Speed weight 10) and is overruled. |
| Maximum Life | 8 | 1000 plus | Preferred | Survival |
| Movement Speed | 8 | 16 to 20 percent | Preferred | QoL and positioning |
| All Resistance | 6 | 6 to 10 percent | Nice to have | Cap filler |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Worldly Finesse (Attacks Reduce Evade Cooldown) | **Mandatory once Footfalls of the Waning World is equipped.** Build-defining temper that locks the slot to a specific manual. | HIGHEST (with Footfalls) |
| Natural Motion (Movement Speed) | Default boots temper before Footfalls drops | HIGH (pre-Footfalls) |
| Natural Resistance (Damage Reduction) | Defensive alternative | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Attacks Reduce Evade Cooldown (with Footfalls) | Maxroll endgame: "masterwork that stat for more frequent teleports" | 1 (with Footfalls equipped) |
| Willpower (without Footfalls) | Default class stat | 1 (without Footfalls) |
| Movement Speed | QoL multiplier for aggressive builds | 2 |
| Maximum Life | Survival | 3 |

**Most important unique:** Footfalls of the Waning World. Changes Evade into Nether Step with reduced cooldown per Shadowform consumed, enabling the endgame "non-stop Nether Step" Mastermind loop.
**Canonical aspect without Footfalls:** Aspect of Crippling Darkness (Icy Veins endgame) or Aspect of Impetus (Mobalytics leveling).
**Greater Affixes matter most on:** Willpower.
**Build-defining temper:** Attacks Reduce Evade Cooldown on Footfalls. This is the only temper in the build that locks a specific slot to a specific manual once the unique drops.
**Sockets:** Boots have 0 sockets in D4.
**Confidence:** HIGH.

---

## Slot 9: Amulet

Amulet has the 50 percent aspect scaling, so it should hold a strong aspect. Icy Veins endgame recommends Hellbent Commander Aspect (summon damage). Mobalytics endgame recommends Aspect of Rallying Reversal as the transfigure target. Maxroll endgame lists Aspect of Rallying Reversal, Nefarious Aspect, Undying Aspect, or Aspect of Elusive Menace as candidates. Banished Lord's Talisman is the BiS Talisman pair (Mobalytics nicktew).

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Maximum Resource (Wrath) | 10 | 30 to 50 | Yes (triple star) | Bolded in Icy Veins endgame. Amulet scales affixes at 50 percent so this hits twice as hard as it would on chest. |
| Attack Speed | 9 | 6 to 10 percent | Preferred | Critical for hitting the 86 percent breakpoint |
| Critical Strike Damage Multiplier | 8 | 30 to 50 percent | Preferred | Amulet 50 percent scaling makes this slot efficient |
| Willpower | 7 | 200 plus | Preferred | Class stat |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Worldly Stability (Resource Cost Reduction) | Specifically named for amulet in Icy Veins endgame. Keeps Wrath sustain topped regardless of Attack Speed breakpoint. | HIGH |
| Worldly Finesse (Critical Strike Damage) | Alternative | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Maximum Resource | Bolded must-masterwork (Icy Veins endgame) | 1 |
| Attack Speed | Amulet 50 percent scaling makes Attack Speed hit extremely hard here | 2 |
| Critical Strike Damage Multiplier | Tertiary | 3 |

**Most important unique alternatives:** Night Terror (early endgame, stronger when gear is still scaling) or Seed of Horazon (late endgame, stronger once gear has high Max Resource).
**Greater Affixes matter most on:** Maximum Resource.
**Build-defining temper:** Worldly Stability Resource Cost Reduction.
**Sockets:** 1 jewelry socket. Royal Diamond (resistance) or Royal Skull (armor) based on current defensive gap.
**Confidence:** HIGH.

---

## Slot 10: Ring 1 (Lurid Pact Slot)

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Attack Speed | 10 | 6 to 10 percent | Yes (triple star) | Bolded in Icy Veins endgame |
| Critical Strike Damage Multiplier | 9 | 30 to 50 percent | Preferred | Standard scaler |
| Lucky Hit Chance to Restore Resources | 9 | Per affix range | Preferred (endgame mandatory if running Profane Sentinel) | Required to enable the Command Fallen to Profane Sentinel swap at Final Endgame |
| Vulnerable Damage Multiplier | 8 | 30 to 50 percent | Preferred | Pairs well with Summon Laalish Vulnerable application |
| Willpower | 7 | 200 plus | Preferred | Class stat |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Worldly Stability (Resource Cost Reduction) | Named for rings in Icy Veins endgame. Wrath sustain for Dread Claws spam. | HIGH |
| Worldly Finesse (Critical Strike Damage) | Alternative | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Attack Speed | Bolded must-masterwork (Icy Veins endgame) | 1 |
| Critical Strike Damage Multiplier | Secondary | 2 |
| Vulnerable Damage Multiplier | Tertiary | 3 |

**Most important unique:** Lurid Pact ("Rampage deals x percent increased damage; each kill by Rampage increases size of the brute and its smashes up to 50 percent"). Drops from the Bloodied Butcher.
**Greater Affixes matter most on:** Attack Speed and Vulnerable Damage Multiplier.
**Build-defining temper:** Worldly Stability Resource Cost Reduction.
**Sockets:** 1 jewelry socket. Royal Diamond or Royal Skull.
**Confidence:** HIGH.

---

## Slot 11: Ring 2 (Demonic Aspect or Ring of Starless Skies)

### Table A: Affix Priority

| Affix | Weight (1 to 10) | Target Roll | Must Have? | Notes |
|---|---|---|---|---|
| Attack Speed | 10 | 6 to 10 percent | Yes (triple star) | Bolded in Icy Veins endgame |
| Critical Strike Damage Multiplier | 9 | 30 to 50 percent | Preferred | Universal multiplier |
| Lucky Hit Chance to Restore Resources | 9 | Per affix range | Preferred (endgame; pairs with Ring 1) | Pair of these enables the Profane Sentinel swap |
| Vulnerable Damage Multiplier | 8 | 30 to 50 percent | Preferred | Strong with reliable Vulnerable uptime |
| Willpower | 6 | 200 plus | Preferred | Class stat |

### Table B: Tempering Recommendations

| Tempering Manual | Why | Priority |
|---|---|---|
| Worldly Stability (Resource Cost Reduction) | Named for rings in Icy Veins endgame | HIGH |
| Worldly Finesse (Critical Strike Damage) | Alternative | MEDIUM |

### Table C: Masterwork Crit Stat Priority

| Stat to Crit | Why | Priority |
|---|---|---|
| Attack Speed | Bolded must-masterwork | 1 |
| Critical Strike Damage Multiplier | Secondary | 2 |
| Vulnerable Damage Multiplier | Tertiary | 3 |

**Most important aspect or unique:** Demonic Aspect is the canonical aspect (each Demonology skill hit increases Demonology damage up to a cap per Icy Veins endgame). Mobalytics endgame puts **Ring of Starless Skies** in this slot when chasing the Wrath economy build with Dominion paragon.
**Greater Affixes matter most on:** Attack Speed.
**Build-defining temper:** Worldly Stability Resource Cost Reduction.
**Sockets:** 1 jewelry socket. Royal Diamond or Royal Skull.
**Confidence:** HIGH.

---

## Quick Reference: Build-Defining Tempers Per Slot

| Slot | Build-Defining Temper | Slot-Locked? |
|---|---|---|
| Two-Handed Weapon (variant) | Worldly Stability (Attack Speed) | No |
| Daggers | Worldly Stability (Attack Speed) | No |
| Focus | Worldly Stability (Attack Speed) | No |
| Helm | Natural Resistance (Physical Resistance) | No |
| Chest | Natural Resistance (Lightning Resistance) | No |
| Gloves | Worldly Finesse (Critical Strike Damage) | No |
| Pants | Natural Resistance (Physical Resistance) | No |
| Boots (with Footfalls) | Worldly Finesse (Attacks Reduce Evade Cooldown) | **YES** |
| Amulet | Worldly Stability (Resource Cost Reduction) | No |
| Ring 1 | Worldly Stability (Resource Cost Reduction) | No |
| Ring 2 | Worldly Stability (Resource Cost Reduction) | No |

Only the Boots slot has a temper that locks the manual to a specific roll once the build-defining unique (Footfalls of the Waning World) is equipped. Every other slot allows flexibility based on what affixes already rolled.

---

## Quick Reference: Greater Affix Targets

Greater Affixes are the highest tier of stat rolls and only appear on Ancestral gear at Lv 70 plus. Per-slot GA priority:

| Slot | GA Priority Stat(s) |
|---|---|
| Two-Handed Weapon | Weapon Damage, Critical Strike Damage Multiplier |
| Daggers | Weapon Damage |
| Focus | Weapon Damage, Maximum Resource |
| Helm | Critical Strike Chance |
| Chest | Maximum Resource |
| Gloves | Attack Speed |
| Pants | Maximum Life |
| Boots | Willpower |
| Amulet | Maximum Resource |
| Ring 1 | Attack Speed, Vulnerable Damage Multiplier |
| Ring 2 | Attack Speed |

---

**End of gear weights reference.**
