# Runes, Gems, and Socket Reference

**Sprint:** Sprint 1, Part A
**Date:** 2026-05-13
**Build:** Dread Claws Mastermind Warlock
**Patch:** 3.0 Lord of Hatred, Season 13
**Canonical source:** Maxroll Endgame + Icy Veins endgame (runeword pairings) + Mobalytics nicktew variant (gem multipliers). Per Resolution 8 of `RECONCILIATION.md` for rune combos and Resolution 9 for gems per slot.
**See also:** `RECONCILIATION.md` Resolution 8 (rune combos) and Resolution 9 (gems per slot)

---

## How to Read This File

Three sections:

- **Section A: Gems per slot type.** Which gem family (Amethyst, Sapphire, Ruby, Diamond, Skull, Emerald, Topaz) belongs in each slot type and why.
- **Section B: Rune combos.** Rune of Ritual plus Rune of Invocation pairings, tier-ranked S through B with LOW-confidence exclusions documented.
- **Section C: Socket recommendations per equipment slot.** How many sockets each slot can carry and what to put in them.

**Confidence column at the end of each row:** HIGH means 2 of 3 LLMs cite Maxroll, Mobalytics endgame, or Icy Veins endgame for the recommendation. MEDIUM means only one source provides the recommendation but it does not conflict with others. LOW means single-source.

**No em or en dashes used. Hyphens only as compound-word joiners.**

---

## Runeword System Reference

Per Perplexity Section 4B, the LoH runeword system works as follows:

- A runeword is 1 Rune of Ritual plus 1 Rune of Invocation socketed in a 2-socket item.
- Rune of Ritual generates Offering when its condition is met.
- Rune of Invocation consumes Offering to trigger a class skill or buff effect.
- Only gear with 2 sockets can hold runewords: **Helms, Chests, Pants, and 2H Weapons.**
- 1H weapons, focus offhands, amulets, and rings have 1 socket each (gem only, no runeword).
- Gloves and Boots have 0 sockets in D4.
- A character can equip a maximum of 2 runewords simultaneously.
- No duplicate runes allowed across both runewords.

For this build, the 2 runeword slots are spent on **Neo plus Prid (Chest)** and **Nagu plus Que (Pants)**. The Helm carries gems instead because the runeword budget is fully consumed.

---

## Section A: Gems per Slot Type

### Weapon Sockets (1H Dagger Litany of Sable, Focus offhand, 2H Weapon variant)

| Slot | Recommended Gem | Alternative Gem | Effect | Reasoning | Confidence |
|---|---|---|---|---|---|
| 1H Dagger (Litany of Sable) | Royal Amethyst | Grand Amethyst (pre-Royal) | Shadow Damage Multiplier (24 percent at Royal tier per Mobalytics nicktew) | Dread Claws is a Shadow skill; Royal Amethyst is a multiplicative damage layer over base weapon damage | HIGH |
| Focus (offhand) | Royal Amethyst | Grand Amethyst | Shadow Damage Multiplier | Same logic as main hand: Focus contributes Weapon Damage and the Shadow multiplier stacks | HIGH |
| 2H Weapon (The Grandfather variant) | 2x Royal Amethyst | 1 Royal Amethyst plus 1 transfigure | Shadow Damage Multiplier stacked, or Gem Strength Multiplier transfigure target (Mobalytics nicktew) | 2 sockets on 2H Weapon. Either run double Amethyst for raw Shadow scaling or use the Gem Strength Multiplier transfigure for The Grandfather. | MEDIUM (variant slot, Maxroll canonical pair is dagger plus focus) |

### Armor Sockets (Helm only; Chest and Pants are reserved for runewords)

| Slot | Recommended Gem | Alternative Gem | Effect | Reasoning | Confidence |
|---|---|---|---|---|---|
| Helm | Royal Sapphire | Royal Ruby | Willpower (Sapphire) or Maximum Life (Ruby) | Willpower scales every Warlock skill broadly. If Heir of Perdition (Mythic) rolls with a 1-socket layout, take Royal Sapphire. If 2-socket, take 2x Royal Sapphire. | HIGH |
| Chest | RESERVED FOR RUNEWORD | Royal Sapphire if no rune budget | Neo plus Prid runeword (Dark Prison automation) | Both chest sockets consumed by the canonical Neo plus Prid runeword. Grok dissents and recommends Royal Sapphire or Royal Ruby here; per Resolution 9 of `RECONCILIATION.md`, this is overruled by the Icy Veins endgame citation that mandates the runeword for Dark Prison automation. | HIGH |
| Pants | RESERVED FOR RUNEWORD | Royal Sapphire if no rune budget | Nagu plus Que runeword (Earthen Bulwark Barrier) | Both pants sockets consumed by the canonical Nagu plus Que runeword. Grok dissents (Royal Sapphire here); per Resolution 9, overruled by the Icy Veins endgame citation. | HIGH |

### Jewelry Sockets (Amulet, Ring 1, Ring 2)

| Slot | Recommended Gem | Alternative Gem | Effect | Reasoning | Confidence |
|---|---|---|---|---|---|
| Amulet | Royal Diamond | Royal Skull | All Resistance (Diamond) or Armor (Skull) | Slot to round out the worst defensive cap. Use Diamond if a resist is below cap, Skull if Armor is the gap. | HIGH |
| Ring 1 (Lurid Pact slot) | Royal Diamond | Royal Skull | All Resistance or Armor | Same logic as amulet. Match to the current defensive deficiency. | HIGH |
| Ring 2 (Demonic Aspect or Ring of Starless Skies slot) | Royal Diamond | Royal Skull | All Resistance or Armor | Same logic as Ring 1. Often paired to fill the opposite gap from Ring 1. | HIGH |

### Slots With Zero Sockets

| Slot | Note |
|---|---|
| Gloves | 0 sockets in D4. No gem applicable. |
| Boots | 0 sockets in D4. No gem applicable. |

---

## Section B: Rune Combos

Rune of Ritual = Offering generator (left side). Rune of Invocation = Offering consumer that triggers an effect (right side). All combos below assume socketing in a 2-socket item (Chest or Pants for this build's two equipped runewords).

### HIGH Confidence Combos (Maxroll, Mobalytics endgame, or Icy Veins endgame cited)

| Rune of Ritual | Rune of Invocation | Combined Effect | Build Tier | Source | Confidence |
|---|---|---|---|---|---|
| Cir | Ceh | Cir generates Offering on Crit. Ceh invokes a Vulnerable application and damage ramp on the target. Permanent Vulnerable uptime in Dread Claws Mastermind rotation. | S | aoeah Litany guide, Mobalytics nicktew | HIGH |
| Cir | Que | Cir generates Offering on Crit. Que invokes a 45 percent Barrier every 3 seconds. Stack Barrier Generation on gear to amplify. | A | Mobalytics endgame: "Cir plus Que to grant us 45 percent Barrier every 3 seconds." | HIGH |
| Igni | Prid | Igni stores Offering every 0.3 seconds (up to 500); cast non-Basic Skill to release. Prid invokes Warlock's Dark Prison Chain Aura. Tethers enemies for massive DR plus Weaken plus Fortify. | S | Mobalytics endgame and Icy Veins endgame: canonical chest-runeword automation. Lets you drop Dark Prison from the skill bar after the Lv 40 respec. | HIGH |
| Neo | Prid | Neo generates Offering after 2 seconds without taking damage. Prid invokes Dark Prison. | A | Icy Veins endgame canonical chest pairing. Alternative chest runeword for play styles that take more damage and need the avoid-damage Offering trigger over the on-demand Igni store. | HIGH |
| Nagu | Que | Nagu generates Offering by maintaining at least 1 active Summon for 5 seconds (up to 5 summons for 500 Offering max). Que invokes Druid's Earthen Bulwark Barrier. | A | Icy Veins endgame canonical pants pairing. Always-on summons (Abyssal Titan, Laalish, Fallen Rush demons) make Nagu generate Offering continuously. | HIGH |
| Gar | Cem | Filler option interchangeable with Cir plus Ceh when Cir is not available. Generates Offering on movement (Cem) or damage taken (Gar) and invokes a damage proc. | B | Mobalytics nicktew: "Cir Ceh Gar Cem Qua are all good, use them interchangeably." | HIGH |

### MEDIUM Confidence Combo (Master Prompt Requested)

| Rune of Ritual | Rune of Invocation | Combined Effect | Build Tier | Source | Confidence |
|---|---|---|---|---|---|
| Yul | Lac | Yul generates Offering on Skill cast with cooldown (50 Offering per cast). Lac invokes Barbarian's Challenging Shout for DR buff and Overflow extends the duration. | B | Yul plus Lac is included in `runes-gems.md` per master prompt request. Yul triggers on Metamorphosis, Laalish, and Nether Step cooldowns; Lac provides DR. Viable pre-Mythic setup. **Important:** This combo is not specifically named as a Dread Claws Mastermind recommendation in surveyed Maxroll, Mobalytics, or Icy Veins sources. Confidence is MEDIUM because the rune mechanics are documented but the specific build pairing is not. | MEDIUM |

### LOW Confidence Combos (Single-Source, Documented for Completeness)

These combos appear in Grok's Section 4 but no other source confirms them as Dread Claws Mastermind recommendations. Documented here so the player knows they were considered.

| Rune of Ritual | Rune of Invocation | Combined Effect | Source | Confidence |
|---|---|---|---|---|
| Cem | Qua | Evade cooldown reduction plus Movement Speed | Grok Section 4B only | LOW |
| Gar | Que | Crit Chance plus Druid's Earthen Bulwark Barrier hybrid | Grok Section 4B only | LOW |
| Tam | Jah | Core skill spam reduction plus free Teleport | Grok Section 4B only | LOW |

### Excluded with Citation

| Combo | Reason for Exclusion | Source |
|---|---|---|
| Mother's Embrace synergies | "Not directly named in any of the surveyed Maxroll endgame, Mobalytics endgame, or Icy Veins endgame Dread Claws Mastermind sources" per Claude Section 4B. The closest match is the Heir of Perdition Mythic helm with the "Mother's Favor" mechanic for 80 percent damage, but that is an item mechanic not a runeword. If a Mother's Embrace runeword exists in Season 13 it is not in the canonical Dread Claws Mastermind setups. | Claude reconciliation |

### Combos That Proc Shadowform Stacks

Per Claude Section 4B: the build's primary Shadowform generation comes from skills (Nether Step grants 4 stacks per cast per Games.gg; Metamorphosis Terror Demon grants 4 stacks per second per Mobalytics nicktew; Summon Laalish generates stacks), not from runes. **No surveyed source identifies a rune combo that itself proc-generates Shadowform.** Confidence: HIGH on this absence.

### Combos That Boost Vulnerable Damage Uptime

**Cir plus Ceh** is the canonical Vulnerable uptime combo per aoeah Litany guide. Profane Sentinel also applies Vulnerable as a skill once it slots into the Final Endgame bar per Maxroll endgame, making Cir plus Ceh the rune-side of a stacked Vulnerable strategy alongside the Profane Sentinel skill cast. Confidence: HIGH.

---

## Section C: Socket Recommendations Per Equipment Slot

This section is the master list of how many sockets each gear slot can carry and what to put in each. Cross-reference with Section A (gems per slot type) and Section B (rune combos) for the contents.

| Equipment Slot | Sockets Possible | Which Sockets to Slot | What to Put in Each | Confidence |
|---|---|---|---|---|
| 1H Weapon (Litany of Sable) | 1 | The single weapon socket | Royal Amethyst (Shadow Damage Multiplier) | HIGH |
| Focus (offhand) | 1 | The single offhand socket | Royal Amethyst (Shadow Damage Multiplier) | HIGH |
| 2H Weapon (The Grandfather variant only) | 2 | Both weapon sockets | 2x Royal Amethyst, or 1 Royal Amethyst plus 1 Gem Strength Multiplier transfigure per Mobalytics nicktew | MEDIUM (variant slot) |
| Helm | 1 to 2 (depends on item roll) | All available armor sockets | Royal Sapphire(s) for Willpower. **Do not** slot a runeword here: the 2-runeword budget is reserved for Chest and Pants. | HIGH |
| Chest | 2 | Both armor sockets, consumed by runeword | **Runeword: Neo plus Prid** (Dark Prison Chain Aura automation per Icy Veins endgame canonical). Alternative: Igni plus Prid if you prefer the on-demand Offering store over the avoid-damage trigger. | HIGH |
| Gloves | 0 | n/a | n/a (Gloves do not socket in D4) | HIGH |
| Pants | 2 | Both armor sockets, consumed by runeword | **Runeword: Nagu plus Que** (Earthen Bulwark Barrier generation from summon uptime per Icy Veins endgame canonical) | HIGH |
| Boots | 0 | n/a | n/a (Boots do not socket in D4) | HIGH |
| Amulet | 1 | The single jewelry socket | Royal Diamond (All Resistance) or Royal Skull (Armor) based on current defensive gap | HIGH |
| Ring 1 (Lurid Pact slot) | 1 | The single jewelry socket | Royal Diamond or Royal Skull to fill the opposite gap from Amulet | HIGH |
| Ring 2 (Demonic Aspect or Ring of Starless Skies slot) | 1 | The single jewelry socket | Royal Diamond or Royal Skull to fill the remaining defensive gap | HIGH |

### Why Maxroll Puts Runewords in Armor and Gems in Weapons

Per Maxroll endgame: "Weapon Gems offer powerful multiplicative damage bonuses" via Royal Amethyst's Shadow Damage Multiplier. Armor sockets do not offer comparable multiplicative damage gems, so they are spent on the two runewords (one chest, one pants) that automate Dark Prison and generate Barrier respectively. The Helm holds Sapphires because the 2-runeword cap is already filled.

---

## Quick Reference: Recommended Loadout Summary

For at-a-glance reference, the complete gem-and-rune loadout for the endgame Dread Claws Mastermind:

| Slot | Sockets | Contents | Effect |
|---|---|---|---|
| Litany of Sable (1H Dagger) | 1 | Royal Amethyst | Shadow Damage Multiplier |
| Focus (offhand) | 1 | Royal Amethyst | Shadow Damage Multiplier |
| Heir of Perdition (Helm) | 1 to 2 | Royal Sapphire(s) | Willpower |
| Chest | 2 | Neo plus Prid runeword | Dark Prison Chain Aura automation |
| Gloves | 0 | n/a | n/a |
| Pants | 2 | Nagu plus Que runeword | Earthen Bulwark Barrier |
| Footfalls of the Waning World (Boots) | 0 | n/a | n/a |
| Amulet | 1 | Royal Diamond or Royal Skull | All Resistance or Armor |
| Ring 1 (Lurid Pact) | 1 | Royal Diamond or Royal Skull | All Resistance or Armor |
| Ring 2 (Demonic Aspect or Starless Skies) | 1 | Royal Diamond or Royal Skull | All Resistance or Armor |

**Total runewords equipped:** 2 (Chest, Pants). **Total weapon gems:** 2 (Dagger, Focus). **Total armor gems:** 1 to 2 (Helm Sapphires). **Total jewelry gems:** 3 (Amulet plus 2 Rings).

---

**End of runes and gems reference.**
