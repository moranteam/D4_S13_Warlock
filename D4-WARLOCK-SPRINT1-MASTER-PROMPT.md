# D4 Warlock Sprint 1: Architecture Refactor + Data Reconciliation

**Sprint Owner:** Charlie Moran
**Project Path:** `~/Projects/personal/D4_S13_Warlock/`
**Sprint Goal:** Reconcile 3 LLM data sources into authoritative reference files, refactor section architecture from 13 to 8, apply 5 simplifications, update existing data files. Do NOT build new modules yet. That is Sprint 2 onwards.

---

## Read Before Coding (Mandatory)

In this exact order, view each file fully:

1. `/mnt/skills/user/game-guide-builder/SKILL.md` ,  architecture tribal knowledge
2. `/mnt/skills/user/game-data-compiler/SKILL.md` ,  data compilation patterns
3. `~/Projects/personal/D4_S13_Warlock/index.html` ,  current section structure
4. `~/Projects/personal/D4_S13_Warlock/app.js` ,  current module list (15 modules)
5. `~/Projects/personal/D4_S13_Warlock/data.js` ,  current data schema
6. `~/Projects/personal/D4_S13_Warlock/itemdata.js` ,  current uniques data
7. `~/Projects/personal/D4_S13_Warlock/paragon.js` ,  current paragon data
8. `~/Projects/personal/D4_S13_Warlock/data-sources/ai_llm_output_combined.md` ,  LLM reference data (Grok, Perplexity, Claude sections; Gemini section is hallucinated garbage, ignore it)

**Do not write a single line of code until all 8 files are read. Confirm out loud that you read them.**

---

## Sprint 1 Scope

### Part A: Data Reconciliation (Highest Priority)

Three LLM sources delivered usable data: Grok, Perplexity, Claude. Gemini hallucinated and is unusable. Build a reconciled, authoritative reference file.

**Methodology:**
1. Read the Grok, Perplexity, and Claude sections of `ai_llm_output_combined.md`
2. For each data point that appears in all 3, take the consensus answer
3. For each disagreement, use Maxroll's cited stance as tiebreaker
4. For any data point that only 1 source provides, accept it but flag with `confidence: LOW`
5. Skip the Gemini section entirely

**Output files (in this order):**

**1. `data-sources/RECONCILIATION.md`** ,  Audit trail of how reconciliation was done:
- Table per disagreement: "Source A said X, Source B said Y, Source C said Z, resolution = X because Maxroll"
- Cover at minimum: skill points per level (all 70 levels), controller bindings per milestone, gear weights per slot, rune combos
- Flag any data point with LOW confidence

**2. `data-sources/leveling-skill-points.md`** ,  Reconciled Lv 1 to 70 skill allocation:
- Markdown table with one row per level (1 to 70, all 70 rows)
- Columns: Level, Point Spent, Cumulative State, Respec Trigger, Notes
- After the table, add post-respec rebuild states for Lv 15, 30, 34, 40

**3. `data-sources/controller-bindings.md`** ,  Reconciled PS5 controller evolution:
- Markdown table with one row per milestone (Lv 1, 3, 4, 8, 9, 15, 20, 30, 34, 41, 50, 70, endgame)
- Columns: Level, Square, Triangle, Circle, X, R1, R2, L2, Replaced This Update, Why

**4. `data-sources/gear-weights.md`** ,  Reconciled stat priorities per slot:
- One section per slot (Weapon, Daggers, Focus, Helm, Chest, Gloves, Pants, Boots, Amulet, Ring 1, Ring 2)
- Per slot: Affix Priority table + Tempering table + Masterwork table

**5. `data-sources/runes-gems.md`** ,  Reconciled rune and gem reference:
- Section A: Gems per slot type
- Section B: Rune combos (at least 6) with tier rankings
- Section C: Socket recommendations per equipment slot

### Part B: Data File Updates (Apply Reconciled Data)

Update existing data files to incorporate the reconciled data. Do not break the existing schema.

**Updates to `data.js`:**
1. Expand the `walkthrough` array to include explicit skill point per level (currently it covers level ranges, needs per-level granularity)
2. Add a new top-level `controllerBindings` object keyed by level milestone
3. Add a new top-level `levelingPath` object with full Lv 1 to 70 point allocation
4. Update `compiledAt` to today's date
5. Update `patchMeta.sources` to add Maxroll Leveling URL explicitly (currently only Maxroll root is listed)

**Updates to `itemdata.js`:**
1. Add missing slot-specific affix priority data per unique
2. No major schema changes

**New file: `gearweights.js`:**
1. Create `window.D4_GEAR_WEIGHTS` object
2. Per slot: `{ affixes: [...], tempering: [...], masterwork: [...] }`
3. This file will power the future Gear Comparison module

**Updates to `paragon.js`:**
1. No changes needed in Sprint 1. Sprint 4 handles paragon module rebuild.

### Part C: Architecture Refactor (13 Sections to 8)

Refactor `index.html` and `app.js` to consolidate sections.

**Target 8-section architecture:**

| # | New Section | Combines |
|---|---|---|
| 1 | Dashboard | (unchanged, will add "Compare My Build" button in Sprint 6) |
| 2 | Leveling Path | Walkthrough + Skill Tree (timeline view) + Controller (NEW placeholder mount) |
| 3 | Skills Reference | Skill Tree (reference view, the cluster grouping) |
| 4 | Endgame Build | Endgame Build + Soul Shards + Paragon Boards + War Plans + Mercenary |
| 5 | Gear Targets | Aspect Tracker + Unique Chase + Boss Farming |
| 6 | Gear Comparison | NEW empty placeholder mount, Sprint 3 builds it |
| 7 | Slot Reference | Talisman & Charms + new Runes & Gems |
| 8 | About | Patch Notes (demoted from section to modal-style content) |

**Refactor steps:**
1. Update sidebar nav in `index.html` to show only 8 items (group them by Overview / Leveling / Gear / Endgame / About)
2. Consolidate the existing 13 view sections into 8. Where multiple existing sections merge into one new section, keep all the existing mount points (`walkthroughRoot`, `skillsRoot`, etc.) but render them sequentially inside the new section.
3. Add new mount points: `controllerRoot` (inside Leveling Path section) and `gearCompareRoot` (in new Gear Comparison section)
4. Update the bottom mobile tab bar to show: Home, Level, Gear (= Gear Comparison), Endgame, More (opens drawer with remaining sections)
5. In `app.js`, do NOT delete the existing module objects. Keep them. Just have the new consolidated sections call multiple module renders in sequence.

### Part D: Apply 5 Simplifications

1. **Remove light theme toggle.** Delete the theme toggle button from topbar in `index.html`. Delete the theme switch handler in `app.js`. Delete `body.theme-light` CSS in `styles.css`. Keep only dark theme.
2. **Remove verified checkboxes in patch notes.** Delete the `verified` state slice in `AppState.data` in `app.js`. Delete the `<input type="checkbox" data-verify>` logic in the Patch module.
3. **Remove hotfix log.** Delete the hotfix display block in Patch module. Delete `hotfixes` array in `data.js` `patchMeta`.
4. **Collapse sidebar by default on desktop.** Update CSS so sidebar starts in collapsed state on viewport width > 1024px. Hamburger button expands it.
5. **Consolidate save/load/reset into Settings menu.** Replace the three separate topbar buttons with a single "Settings" button that opens a dropdown menu with Export, Import, Reset Data, About options.

### Part E: README Rewrite

The current `README.md` is stale. It claims Batches 2 through 5 are placeholders. They are shipped. Rewrite to reflect reality:

1. Update Section status table to mark all 8 new sections (note which are new vs existing)
2. Remove the fake Quick Update command syntax (the README claims a text command parser exists, it does not)
3. Document the actual Quick Update modal (Level/Paragon/Torment/Pit/Shard/Fragment fields with steppers and dropdowns)
4. Add a "Recent Updates" section noting Sprint 1 changes
5. Update the file structure tree to include new files (`gearweights.js`, `data-sources/` directory)

---

## Acceptance Criteria

Sprint 1 is complete when ALL of these are true:

1. ✅ `data-sources/RECONCILIATION.md` exists with reconciliation audit trail
2. ✅ `data-sources/leveling-skill-points.md` exists with all 70 levels
3. ✅ `data-sources/controller-bindings.md` exists with all milestones
4. ✅ `data-sources/gear-weights.md` exists with all 11 slots
5. ✅ `data-sources/runes-gems.md` exists with 6+ combos
6. ✅ `data.js` updated with `controllerBindings` and `levelingPath` objects
7. ✅ `gearweights.js` file created and loaded in `index.html`
8. ✅ `index.html` shows exactly 8 sidebar nav items
9. ✅ All 5 simplifications applied
10. ✅ `README.md` rewritten to match reality
11. ✅ App loads in browser with zero console errors
12. ✅ Clicking each of the 8 nav items shows the correct consolidated content
13. ✅ `grep -nE ", |, " *.html *.js *.css *.md` returns ZERO matches (no em dashes, no en dashes)
14. ✅ Git commit with message: "Sprint 1: architecture refactor 13 to 8, data reconciliation, 5 simplifications"

---

## Anti-Patterns (Do Not Do)

- ❌ Do not build any of the new modules (Gear Comparison, Controller, Skill Timeline). Sprint 2 onwards handles those.
- ❌ Do not delete the existing module renderers in `app.js`. Keep them. Sections just call multiple renders.
- ❌ Do not modify `paragon.js`. Sprint 4 handles paragon refactor.
- ❌ Do not write any em dashes, en dashes, or hyphens as dashes anywhere. Grep before committing.
- ❌ Do not "improve" things that are not in the Sprint 1 scope. Stay focused.
- ❌ Do not skip the read-before-coding step. Read all 8 files first.

---

## Claude Code Protocol

1. Run `/compact` before starting if your context is heavy
2. Read all 8 mandatory files first
3. Tackle Part A (reconciliation) FIRST. Output the 5 MD files. Show me the first one before continuing.
4. Then Part B (data updates). Show me the `data.js` diff before continuing.
5. Then Part C (architecture refactor). Show me the new `index.html` sidebar before continuing.
6. Then Part D (simplifications). Show me each removal before committing.
7. Then Part E (README). Show me the rewrite.
8. Run the grep check. Output the result.
9. Commit with the exact message above.
10. End every interim response with "Show me the code you added" reminder so I can verify nothing was silently truncated.

---

## First Prompt to Claude Code

Paste this verbatim to kick off:

> Read `~/Projects/personal/D4_S13_Warlock/D4-WARLOCK-SPRINT1-MASTER-PROMPT.md` end to end. Then read all 8 mandatory files listed inside it. Do not write any code yet. Confirm you read each file, summarize the current state of the codebase, and confirm understanding of the 8-section target architecture. Then ask me to greenlight Part A.

When Code confirms understanding, paste:

> Greenlit. Start Part A: Data Reconciliation. Produce all 5 markdown files in `data-sources/`. Show me `RECONCILIATION.md` first so I can spot check the methodology before you write the other four. Then show me the code you added.

---

## After Sprint 1

Sprint 2 will be the Leveling Path module build (the new consolidated section with walkthrough + skill timeline + controller bindings rendering). That sprint depends on the data files produced here.
