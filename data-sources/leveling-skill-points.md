# Leveling Skill Point Allocation (Lv 1 to 70)

**Sprint:** Sprint 1, Part A
**Date:** 2026-05-13
**Build:** Dread Claws Mastermind Warlock
**Patch:** 3.0 Lord of Hatred, Season 13
**Canonical source:** Maxroll Leveling Guide (via Claude reconciliation in `RECONCILIATION.md`)
**See also:** `RECONCILIATION.md` for source disagreement audit trail

---

## Legend

| Code | Meaning |
|---|---|
| AS | Active Skill rank |
| P | Passive node |
| U | Upgrade node (first or second branch upgrade on an active) |
| R | Soul Shard or Fragment selection (class mechanic, not a skill point) |

**Confidence column:**
- HIGH: 3 of 3 LLM sources agree and at least one cites Maxroll for the specific level
- MEDIUM: Claude provides specific rank, Grok partially agrees, Perplexity flags Medium-extrapolation
- LOW: only one source provides this row

**Point math:** 1 skill point per level from Lv 2 through Lv 70, plus 1 free point at Lv 1, totals 70 spendable points by Lv 70. Additional points from Renown and Season Rank rewards bring the practical endgame total to roughly 83 per Icy Veins. Respec events at Lv 15, 30, 34, and 40 redistribute existing points without granting new ones.

---

## Per-Level Allocation Table

| Level | Point Spent | Cumulative State | Respec Trigger | Confidence | Notes |
|---|---|---|---|---|---|
| 1 | AS: Hellion Sting r1 | Hellion Sting 1 | No | HIGH | Basic skill only at Lv 1 |
| 2 | AS: Hellion Sting r2 | Hellion Sting 2 | No | MEDIUM | Build Basic ranks while Core is locked |
| 3 | AS: Dread Claws r1 | HS 2, DC 1 | No | HIGH | Dread Claws unlocks; immediately becomes the spam skill |
| 4 | AS: Nether Step r1 | HS 2, DC 1, NS 1 | No | HIGH | Mobility + Shadowform generation unlocked |
| 5 | AS: Dread Claws r2 | HS 2, DC 2, NS 1 | No | MEDIUM | Stack Core ranks for Wrath efficiency |
| 6 | U: Dread Claws Enhanced (1st upgrade) | HS 2, DC 2 + Enhanced, NS 1 | No | MEDIUM | Damage ramp upgrade |
| 7 | U: Dread Claws Damage (2nd upgrade) | HS 2, DC 2 + both upgrades, NS 1 | No | MEDIUM | Locks the damage ramp |
| 8 | AS: Rampage r1 | HS 2, DC 2 upg, NS 1, R 1 | No | HIGH | Greater Demon unlocks (Archfiend class) |
| 9 | U: Hellion Sting Eviscerate | HS 2 + Eviscerate, DC 2 upg, NS 1, R 1 | No | HIGH | Single-target spike via Eviscerate |
| 10 | U: Nether Step Enhanced | HS 2 + Evis, DC 2 upg, NS 1 + Enhanced, R 1 | No | MEDIUM | Adds charge and Shadowform on use |
| 11 | U: Nether Step Disciplined | NS 1 + Enhanced + Disciplined | No | MEDIUM | Disciplined is the Mastermind pick for damage reduction. Methodical is the alternative for pure movement-speed leveling, not recommended for this build. |
| 12 | AS: Rampage r2 | R 2 | No | MEDIUM | Bring Rampage online for boss damage |
| 13 | U: Rampage Enhanced | R 2 + Enhanced | No | MEDIUM | Prepares the Abyssal Titan branch |
| 14 | U: Hellion Sting Tail Spikes | HS 2 + Eviscerate + Tail Spikes | No | HIGH | Elite and boss melt combo with Eviscerate active |
| 15 | R: Mastermind Shard; full respec redistribution | See "Lv 15 Post-Respec State" below | YES (full respec) | HIGH | Soul Shard unlocked via Warlock class quest. Summon Laalish granted free. Dread Claws gains Encircling Terror upgrade. |
| 16 | AS: Dread Claws r6 | DC 6 | No | MEDIUM | Continue maxing Core |
| 17 | AS: Dread Claws r7 | DC 7 | No | MEDIUM | Damage scales linearly per rank |
| 18 | P: Shadow damage passive r1 | +1 Abyss passive | No | MEDIUM | Feeds Mastermind Shard multiplier |
| 19 | AS: Rampage r3 | R 3 | No | MEDIUM | Prep for Abyssal Titan unlock |
| 20 | U: Rampage Abyssal Titan | R 3 + Abyssal Titan upgrade | No | HIGH | Greater Demon variant doubles Encircling Terror damage |
| 21 | AS: Nether Step r2 | NS 2 | No | MEDIUM | More Shadowform stacks per cast |
| 22 | AS: Dread Claws r8 | DC 8 | No | MEDIUM | Push Core |
| 23 | P: Demonology passive r1 | +1 Demonology cluster | No | MEDIUM | Buffs Rampage and Summon Laalish damage |
| 24 | AS: Dread Claws r9 | DC 9 | No | MEDIUM | Continue |
| 25 | AS: Hellion Sting r3 | HS 3 | No | MEDIUM | Keeps Wrath generation healthy pre-respec |
| 26 | P: Wrath generation passive r1 | Wrath gen node | No | MEDIUM | Smooths spending DC at high rank |
| 27 | AS: Rampage r4 | R 4 | No | MEDIUM | Build Greater Demon damage |
| 28 | AS: Dread Claws r10 | DC 10 | No | MEDIUM | Continue |
| 29 | P: Shadow damage passive r2 | +2 in cluster | No | MEDIUM | Pre-30 passive build out |
| 30 | R: Blasphemous Fragment; minor skill cleanup | See "Lv 30 Post-Respec State" below | YES (full respec) | HIGH | Fragment slot unlocks. Blasphemous makes Rampage Abyssal Titan apply Hex on hit. |
| 31 | AS: Dread Claws r11 | DC 11 | No | MEDIUM | Continue scaling |
| 32 | AS: Rampage r5 | R 5 | No | MEDIUM | Bring Greater Demon to mid rank |
| 33 | AS: Dread Claws r12 | DC 12 | No | MEDIUM | Continue |
| 34 | RESPEC: drop HS + Sigil of Subversion; pick up Command Fallen (Fallen Rush) and Dark Prison (Chain Aura); take Nether Step Recall Shadows upgrade | See "Lv 34 Post-Respec State" below | YES (full respec) | HIGH | Maxroll: drop Hellion Sting and Sigil of Subversion; pick up Command Fallen (Fallen Rush) and Dark Prison (Chain Aura). Recall Shadows on Nether Step makes Abyssal Titan teleport with you. |
| 35 | AS: Dread Claws r13 | DC 13 | No | MEDIUM | Continue Core scaling |
| 36 | AS: Rampage r6 | R 6 | No | MEDIUM | Abyssal Titan damage |
| 37 | P: Critical Strike passive cluster r1 | +1 Crit passive | No | MEDIUM | Sets up Crit scaling for Litany of Sable endgame |
| 38 | AS: Dread Claws r14 | DC 14 | No | MEDIUM | Continue |
| 39 | AS: Command Fallen r2 | CF 2 | No | MEDIUM | Improves Wrath generation per Fallen Rush tap |
| 40 | RESPEC: drop Dark Prison (automated by Prid rune later); take Metamorphosis with Terror Demon upgrade; rebuild passive layer | See "Lv 40 Post-Respec State" below | YES (full respec) | HIGH | Maxroll: at Lv 40 drop Dark Prison, pick up Metamorphosis Terror Demon. Dark Prison instead automated with Prid rune. Metamorphosis takes effect on bar at Lv 41. |
| 41 | AS: Dread Claws r15 (MAX) | DC 15 | No | HIGH | Dread Claws hits max rank. Cascading Dread bonus claws now at 4 additional waves. First full level operating with Metamorphosis on bar. |
| 42 | AS: Metamorphosis r2 | Meta 2 | No | MEDIUM | Improves Shadowform generation |
| 43 | AS: Metamorphosis r3 | Meta 3 | No | MEDIUM | Continue ultimate scaling |
| 44 | AS: Rampage r7 | R 7 | No | MEDIUM | Abyssal Titan damage |
| 45 | AS: Metamorphosis r4 | Meta 4 | No | MEDIUM | Continue |
| 46 | AS: Rampage r8 | R 8 | No | MEDIUM | Continue |
| 47 | AS: Metamorphosis r5 | Meta 5 | No | MEDIUM | Continue |
| 48 | AS: Rampage r9 | R 9 | No | MEDIUM | Continue |
| 49 | AS: Command Fallen r3 | CF 3 | No | MEDIUM | Resource generation rank |
| 50 | AS: Metamorphosis r6 | Meta 6 | No | MEDIUM | Mid game ultimate ramp |
| 51 | AS: Rampage r10 | R 10 | No | MEDIUM | Continue |
| 52 | AS: Metamorphosis r7 | Meta 7 | No | MEDIUM | Continue |
| 53 | AS: Command Fallen r4 | CF 4 | No | MEDIUM | Continue |
| 54 | AS: Rampage r11 | R 11 | No | MEDIUM | Continue |
| 55 | AS: Metamorphosis r8 | Meta 8 | No | MEDIUM | Continue |
| 56 | AS: Rampage r12 | R 12 | No | MEDIUM | Continue |
| 57 | AS: Metamorphosis r9 | Meta 9 | No | MEDIUM | Continue |
| 58 | AS: Rampage r13 | R 13 | No | MEDIUM | Continue |
| 59 | AS: Metamorphosis r10 | Meta 10 | No | MEDIUM | Continue |
| 60 | AS: Rampage r14 | R 14 | No | MEDIUM | First Paragon point unlocks (Mobalytics planner) |
| 61 | AS: Metamorphosis r11 | Meta 11 | No | MEDIUM | Continue |
| 62 | AS: Rampage r15 (MAX) | R 15 | No | MEDIUM | Rampage hits max rank |
| 63 | AS: Metamorphosis r12 | Meta 12 | No | MEDIUM | Continue |
| 64 | AS: Command Fallen r5 | CF 5 | No | MEDIUM | Continue |
| 65 | AS: Metamorphosis r13 | Meta 13 | No | MEDIUM | Continue |
| 66 | AS: Command Fallen r6 | CF 6 | No | MEDIUM | Continue |
| 67 | AS: Metamorphosis r14 | Meta 14 | No | MEDIUM | Continue |
| 68 | P: Critical Strike Damage passive max | +1 max Crit cluster | No | MEDIUM | Endgame passive shaping |
| 69 | AS: Metamorphosis r15 (MAX) | Meta 15 | No | MEDIUM | All three primary actives at rank 15 |
| 70 | P: Final Abyss damage passive max | Final spec lock | No | HIGH | 69 base points spent. Remaining points come from Season Rank rewards (Icy Veins notes 83 total at full season completion). |

---

## Post-Respec Rebuild States

The four respec events drop the existing skill point layout and rebuild from zero with the same total point budget. Each block below captures the complete skill state immediately after the respec, before that level's new point is spent.

### Lv 15 Post-Respec State (Mastermind Locked In)

**Trigger:** Warlock class quest grants Mastermind Shard choice. Summon Laalish becomes available free. Encircling Terror upgrade unlocks on Dread Claws.

**Total points to allocate:** 14 (one per level from Lv 2 through Lv 15) plus the Soul Shard + Fragment slots.

| Skill / Node | Rank or Upgrade | Source |
|---|---|---|
| Hellion Sting | Rank 1 | Basic |
| Hellion Sting upgrades | Eviscerate + Tail Spikes | Maxroll |
| Dread Claws | Rank 5 | Core |
| Dread Claws upgrades | Encircling Terror + Ambush | Maxroll |
| Nether Step | Rank 1 | Mobility |
| Nether Step upgrades | Enhanced + Disciplined | Mobalytics leveling |
| Rampage | Rank 1 | Archfiend (Greater Demon) |
| Rampage upgrades | Enhanced | Maxroll |
| Sigil of Subversion | Rank 1 | Utility leveling pick (dropped at Lv 34) |
| Passive nodes | All relevant Abyss and Demonology cluster rank 1 nodes filled | Maxroll |
| Soul Shard | Mastermind Shard (grants Summon Laalish) | Class quest |
| Fragment | None yet (unlocks at Lv 30) | Locked |

**Bar effect:** Encircling Terror converts Dread Claws into a circular AoE around the player and the Greater Demon. Mastermind Shard grants 30 percent Abyss damage while in Shadowform plus 5 percent move speed per stack.

---

### Lv 30 Post-Respec State (Fragment Pivot)

**Trigger:** Fragment slot unlocks. Blasphemous Fragment makes Rampage Abyssal Titan apply Hex on hit, amplifying Mastermind Shard's Abyss multiplier.

**Total points to allocate:** 29 (one per level from Lv 2 through Lv 30) plus Soul Shard and Fragment slots.

| Skill / Node | Rank or Upgrade | Source |
|---|---|---|
| Hellion Sting | Rank 3 | Basic |
| Hellion Sting upgrades | Eviscerate + Tail Spikes | Maxroll |
| Dread Claws | Rank 10 | Core |
| Dread Claws upgrades | Encircling Terror + Ambush + Cascading Dread | Maxroll |
| Nether Step | Rank 2 | Mobility |
| Nether Step upgrades | Enhanced + Disciplined | Maxroll |
| Rampage | Rank 4 | Archfiend |
| Rampage upgrades | Enhanced + Abyssal Titan | Maxroll |
| Sigil of Subversion | Rank 1 + Enhanced | Leveling utility (dropped at Lv 34) |
| Passive nodes | Abyss and Demonology cluster expansion: Shadow damage r2, Demonology r1, Wrath generation r1 | Maxroll |
| Soul Shard | Mastermind Shard | Persistent |
| Fragment | Blasphemous Fragment | NEW this respec |

**Bar effect:** Rampage Abyssal Titan now applies Hex via Blasphemous Fragment. Each Hexed enemy takes 20 percent more damage from Abyss and Demonology skills, multiplying every Dread Claws hit.

---

### Lv 34 Post-Respec State (Resource Engine)

**Trigger:** Recall Shadows upgrade on Nether Step unlocks. Major bar pivot: drop Hellion Sting and Sigil of Subversion. Add Command Fallen and Dark Prison.

**Total points to allocate:** 33 (one per level from Lv 2 through Lv 34) plus Soul Shard and Fragment.

| Skill / Node | Rank or Upgrade | Source |
|---|---|---|
| Hellion Sting | DROPPED | Maxroll |
| Sigil of Subversion | DROPPED | Maxroll |
| Dread Claws | Rank 12 | Core |
| Dread Claws upgrades | Encircling Terror + Ambush + Cascading Dread | Maxroll |
| Nether Step | Rank 2 | Mobility |
| Nether Step upgrades | Enhanced + Disciplined + Recall Shadows | Maxroll |
| Rampage | Rank 5 | Archfiend |
| Rampage upgrades | Enhanced + Abyssal Titan | Maxroll |
| Command Fallen | Rank 1 + Fallen Rush | NEW this respec |
| Dark Prison | Rank 1 + Chain Aura | NEW this respec (bar slot, automated by Prid rune later) |
| Passive nodes | Abyss, Demonology, Shadow, Wrath generation clusters at full leveling investment | Maxroll |
| Soul Shard | Mastermind Shard | Persistent |
| Fragment | Blasphemous Fragment | Persistent |

**Bar effect:** Fallen Rush taps generate Wrath in bulk, replacing the need for a Basic skill on bar. Chain Aura Dark Prison provides Weaken plus Fortify defensive layer. Recall Shadows teleports Abyssal Titan with you, maintaining the double Encircling Terror AoE.

---

### Lv 40 Post-Respec State (Metamorphosis Ultimate)

**Trigger:** Ultimate slot opens. Drop Dark Prison from bar (it will be automated by Neo + Prid rune in endgame). Take Metamorphosis with Terror Demon upgrade.

**Total points to allocate:** 39 (one per level from Lv 2 through Lv 40) plus Soul Shard and Fragment.

| Skill / Node | Rank or Upgrade | Source |
|---|---|---|
| Dark Prison | DROPPED from bar (will be runeword-automated) | Maxroll |
| Dread Claws | Rank 14 | Core |
| Dread Claws upgrades | Encircling Terror + Ambush + Cascading Dread | Maxroll |
| Nether Step | Rank 2 | Mobility |
| Nether Step upgrades | Enhanced + Disciplined + Recall Shadows | Maxroll |
| Rampage | Rank 6 | Archfiend |
| Rampage upgrades | Enhanced + Abyssal Titan | Maxroll |
| Command Fallen | Rank 2 + Fallen Rush | Persistent |
| Metamorphosis | Rank 1 + Terror Demon | NEW this respec |
| Passive nodes | Abyss, Demonology, Shadow, Wrath gen, plus Critical Strike cluster r1 | Maxroll |
| Soul Shard | Mastermind Shard | Persistent |
| Fragment | Blasphemous Fragment | Persistent |

**Bar effect:** This is the endgame leveling skeleton. From Lv 41 through Lv 70 the player only spends ranks on existing actives (Dread Claws maxed at Lv 41, Rampage maxed at Lv 62, Metamorphosis maxed at Lv 69). No further respecs needed.

---

## Final Endgame Skill Tree (Lv 70 Target State)

After Lv 40's respec, every remaining point goes to ranking up the four primary actives plus final passive cleanup. The Lv 70 target state below converges on both Maxroll Mastermind endgame and Icy Veins Mastermind endgame.

| Slot | Skill | Rank | Upgrades |
|---|---|---|---|
| Basic | (none; dropped at Lv 34 respec) | n/a | n/a |
| Core | Dread Claws | 15 | Enhanced, Damage, Encircling Terror, Ambush, Cascading Dread |
| Mobility | Nether Step | 2 to 3 | Enhanced, Disciplined, Recall Shadows |
| Defensive | Rampage | 15 | Enhanced, Abyssal Titan |
| Demonology 1 | Command Fallen | 5 to 6 | Fallen Rush |
| Demonology 2 (endgame swap) | Profane Sentinel (replaces Command Fallen once Dominion paragon and 2x Lucky Hit Restore Resources rings are online) | 1 | Vulnerable application + Dominion synergy |
| Ultimate | Metamorphosis | 15 | Terror Demon |
| Class Mechanic | Mastermind Shard plus Blasphemous Fragment | n/a | n/a |
| Passives | Shadow, Abyss, Demonology, Critical Strike clusters fully invested | Various | Per Maxroll endgame node map |

**Total point math:** 69 base points spent by Lv 70. Season Rank rewards bring total to ~83 at full season completion (Icy Veins). The extra 14 points fund additional passive nodes and any rank push needed for the Profane Sentinel endgame swap.

---

**End of leveling skill points reference.**
