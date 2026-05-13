# D4 Warlock God Run

Diablo IV Season 13 Lord of Hatred companion. Dread Claws Mastermind leveling and endgame guide. Vanilla HTML/CSS/JS, no build step, runs as a single page app from any static host.

## Quick Start (Local)

1. Drop this folder into `~/Projects/personal/D4_S13_Warlock/`
2. Open `index.html` in Chrome. That is the entire setup.
3. Click the lightning-bolt FAB (bottom right) or press `/` on desktop to open Quick Update.

## Quick Start (GitHub Pages)

```bash
cd ~/Projects/personal/D4_S13_Warlock
git add .
git commit -m "Sprint 1: architecture refactor 13 to 8, data reconciliation, 6 simplifications"
gh repo create moranteam/d4-warlock-s13 --public --source=. --remote=origin --push
```

Then enable GitHub Pages: Settings > Pages > Source: main branch, root folder.

Live URL: `https://moranteam.github.io/d4-warlock-s13/`

## File Structure

```
D4_S13_Warlock/
  index.html                       8-section shell, modals, FAB, bottom tab bar, More drawer, Settings menu
  styles.css                       Dark theme only, mobile-first responsive
  app.js                           Core engine: state, routing, save/load, Quick Update modal
  data.js                          Skills, walkthrough, soul shards, fragments, aspects, talismans,
                                    war plans, mercenaries, bosses, leveling path (per-level Lv 1-70),
                                    controller bindings (PS5 milestones), patch metadata
  itemdata.js                      Uniques + per-unique slot affix priorities
  paragon.js                       Boards, glyphs, stat targets
  gearweights.js                   11-slot affix weights, tempering, masterwork crit priorities,
                                    global endgame stat targets (powers Sprint 3 Gear Comparison)
  manifest.json                    PWA manifest for iOS home screen install
  README.md                        This file
  D4-WARLOCK-SPRINT1-MASTER-PROMPT.md   Sprint 1 spec (kept for reference)
  data-sources/                    Reconciled reference data, source of truth for the JS files
    RECONCILIATION.md              Audit trail of 3-LLM reconciliation decisions
    leveling-skill-points.md       70-level skill point table + 4 post-respec rebuild states
    controller-bindings.md         13 PS5 controller milestone rows Lv 1 to Final Endgame
    gear-weights.md                11 slots, 3 tables each (affix, tempering, masterwork)
    runes-gems.md                  Gems per slot, 6 HIGH-confidence rune combos, socket recs
    ai_llm_output_combined.md      Raw LLM source dump (Grok + Perplexity + Claude + Gemini)
```

## Sections (8 total, refactored from 13 in Sprint 1)

| Section | Hash | Sprint Status | Notes |
|---|---|---|---|
| Dashboard | `#dashboard` | Wired (Sprint 1) | Phase advisor, hero stats, priority list |
| Leveling Path | `#leveling-path` | Walkthrough wired (Sprint 1). Skill Timeline + Controller modules ship in Sprint 2. | Mount points: walkthroughRoot, skillTimelineRoot, controllerRoot |
| Skills Reference | `#skills-reference` | Wired (Sprint 1) | All 25 Warlock skills grouped by cluster |
| Endgame Build | `#endgame-build` | Wired (Sprint 1) | Bar, shards, paragon, war plans, mercenary in one view |
| Gear Targets | `#gear-targets` | Wired (Sprint 1) | Aspects, uniques, bosses |
| Gear Comparison | `#gear-comparison` | Placeholder (Sprint 3) | Compare My Build feature. Data already in `window.D4_GEAR_WEIGHTS`. |
| Slot Reference | `#slot-reference` | Talismans wired (Sprint 1). Runes/Gems module ships in Sprint 5. | Mount points: talismansRoot, runesGemsRoot |
| About | `#about` | Wired (Sprint 1) | Patch notes, data freshness layers, sources |

Sidebar navigation groups the 8 sections under: Overview, Leveling, Endgame, Gear, Reference.

Mobile bottom tab bar (5 tabs): Home, Level, Gear (= Gear Comparison), Endgame, More. The "More" tab opens a drawer with Skills Reference, Gear Targets, Slot Reference, and About.

## Quick Update Modal

Press `/` on desktop or tap the lightning-bolt FAB on any viewport to open the Quick Update modal. The modal exposes these fields:

| Field | Control | Range |
|---|---|---|
| Level | Stepper (+ / minus) plus number input | 1 to 70 |
| Paragon | Stepper plus number input | 0 to 300 |
| Torment | Dropdown | T0 to T12 |
| Pit cleared | Stepper plus number input | 0 to 200 |
| Soul Shard | Dropdown | Mastermind, Legion, Vanguard, Ritualist |
| Fragment | Dropdown (filtered by selected Shard) | varies |
| Respec acknowledgements | Toggle buttons | Lv 15, 30, 34, 40 |

Apply commits all changes at once. The dashboard, walkthrough, and nav badges refresh automatically.

Note: an earlier README documented a text-command syntax. That was never wired to any UI and was deleted in Sprint 1.

## Settings Menu

The single Settings gear icon in the topbar opens a dropdown with:

- Export Save (download JSON)
- Import Save (upload previously exported JSON)
- About (navigate to the About section)
- Reset All Data (with confirmation; styled in red)

Saves are stored in localStorage under `d4_warlock_*_v1` keys. The sidebar open/closed state is also persisted under `d4_warlock_sidebar_open_v1`.

## Sprint 1 Updates (2026-05-13)

The big shift this sprint:

- **Architecture refactor 13 to 8.** Twelve standalone sections collapsed into seven consolidated parent views plus Dashboard. All existing mount points preserved.
- **Data reconciliation.** Three LLM sources (Grok, Perplexity, Claude) cross-referenced into 5 markdown files under `data-sources/`. Maxroll cited as canonical, Gemini section discarded as hallucinated. See `data-sources/RECONCILIATION.md` for the audit trail of all 10 disagreement resolutions.
- **Canonical skill name fixes.** Renamed "Enveloping Terror" to "Encircling Terror" and "Shadow Recall" to "Recall Shadows" across all JS and HTML files. Both names matched LLM consensus and Maxroll citations.
- **6 simplifications applied:**
  1. Light theme removed (dark only now)
  2. Verified checkboxes in Patch removed
  3. Hotfix log removed
  4. Sidebar collapsed by default on every viewport, state persists in localStorage
  5. Save/Import/Reset consolidated into a single Settings gear menu in the topbar
  6. Dead text-command parser in `app.js` deleted (was never wired)
- **New data files.** `gearweights.js` added with 11-slot affix/tempering/masterwork data; `data.js` gained `levelingPath` (70 levels) and `controllerBindings` (13 PS5 milestones).
- **New placeholder mounts.** `skillTimelineRoot`, `controllerRoot`, `gearCompareRoot`, `runesGemsRoot` are wired in the HTML and waiting for Sprints 2 to 5 to fill them.

## Patch / Data Sources

- Patch: 3.0 Lord of Hatred (April 28, 2026)
- Season 13: Season of Reckoning
- Build sources: Maxroll, Maxroll Leveling, Icy Veins, Mobalytics, FextraLife wiki, Game8, Wowhead D4

Data freshness is cited per layer in the About section. Confidence flags (HIGH / MEDIUM / LOW) are carried through from `data-sources/RECONCILIATION.md` to every data field that needed a tiebreaker.

## Next: Sprint 2

Builds the Leveling Path module body: per-level skill timeline renderer reading `window.D4_DATA.levelingPath`, and PS5 controller binding renderer reading `window.D4_DATA.controllerBindings`. Data is already loaded; only the JS/CSS for the renderers is missing.
