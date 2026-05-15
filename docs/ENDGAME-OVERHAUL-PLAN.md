# Endgame Overhaul Plan

**Status**: APPROVED on 2026-05-14. 17 original systems plus 9 additional flagged
systems are all in scope. Sprint 3 Part C ships first per recommended path, then
Sprint 4 opens the new track.

## Summary

This plan proposes 5 net new sprints (Sprints 4 through 8) to overhaul the Endgame Build
section with Maxroll-quality visuals, data parity, and 17 covered systems. Total
estimated effort is 8 to 11 working sessions. The plan is built around three pillars
of efficiency: (1) parallel data fetch and reconciliation via sub-agents, (2) a 5
template renderer pattern so per-system code drops to ~30 lines each, and (3) a
single section visual mockup sprint before the full UI rebuild to catch design drift
early. Sprint 3 Part C (Save this drop history) ships first regardless, then Sprint 4
opens the new track. Critical path to a usable endgame guide by Lv 70 covers Sprints 3
Part C, 4, 5, and 6. Sprints 7 and 8 are post Lv 70 polish. Codex of Power stays
deferred to its own dedicated sprint per the existing roadmap, with explicit hooks
wired into the new endgame views.

Key risks: data freshness if Blizzard patches mid build, item icon hotlinking ethics,
endgame data file size, mobile UX of a desktop first gear grid. Each risk has a
mitigation listed below.

## Current state at planning time

Already shipped (do not redo):
- Sprint 1: Data reconciliation, 8 section nav, gearweights.js
- Sprint 2: Leveling Path module
- Sprint 3 Part A: Walkthrough Catch Up button
- Sprint 3 Part B prerequisite: Runes and Gems renderer (pulled forward, was originally
  Sprint 5)
- Sprint 3 Part B: Gear Comparison tool

Queued and ships next regardless of this plan:
- Sprint 3 Part C: Save this drop history (bolts into Gear Compare)

Live app: https://moranteam.github.io/D4_S13_Warlock/
Public repo: https://github.com/moranteam/D4_S13_Warlock

## Sprint sequencing

### Sprint 4: Endgame Data Layer

**Goal**: Fetch, reconcile, and persist all data needed for the new endgame UI. No UI
changes in this sprint. Pure data work, parallel sub-agents.

**Systems covered (from the 17)**: Data for all 17 systems lands in this sprint. UI
for them lands in Sprints 5 through 8.

**Files touched**:
- `endgamedata.js` (new, top level)
- `data-sources/endgame/raw/{maxroll,icyveins,mobalytics,egamersworld,boostmatch,maxroll-leveling}.md`
  (new, raw fetched content)
- `data-sources/endgame/reconciled/{gear,runes,talismans,glyphs,paragon,soulshards,mercs,progression,activities}.md`
  (new, per system reconciled source of truth)
- `data-sources/endgame/RECONCILIATION-V2.md` (new, delta log)
- `index.html` (new script tag for `endgamedata.js`)

**Data deliverables**:
- `window.D4_ENDGAME` namespace with sub-keys: `gear`, `runes`, `talismans`, `glyphs`,
  `paragon`, `soulshards`, `mercs`, `progression`, `activities`, `lookups`,
  `cardTemplates`
- Per gear slot: name, icon URL or icon class, slot family, primary item plus backup,
  affix priorities (1 through 4), aspect to imprint, source dungeon, tempering manual,
  masterwork primary, sockets, confidence tag
- Per rune: name, type (Ritual or Invocation), generator condition or invoked effect,
  recommended pair, source location, confidence
- Per merc: skill tree summary, hired pick verdict with sources, reinforcement pick,
  reasoning
- Per paragon step: board, glyph, legendary node, prereq board, action verb
- Reconciliation deltas documented per Resolution N pattern from Sprint 1

**Rendering deliverables**: None. UI sprint follows.

**Smoke test checklist**:
- `node --check endgamedata.js` passes
- `window.D4_ENDGAME` defined, all 11 sub-keys present
- Console open on live app, no missing data warnings
- Dash check clean across all touched files (no em, no en, no hyphen as dash)
- File size under 300 KB. If over, split into endgamedata-gear.js plus
  endgamedata-progression.js and update load order.
- All 6 raw fetches saved with timestamp

**Estimated effort**: 2 sessions. Session 1 is parallel fetch and reconcile (one fetch
agent then four reconciliation sub-agents in parallel). Session 2 is the JS port, dash
check, and smoke test.

### Sprint 5: Visual Mockup, Gear Targets Only

**Goal**: Build the 5 render templates, render only the Gear Targets section in the
new Maxroll inspired visual style, ship for Charlie review. Locks the design before
the full UI rebuild.

**Systems covered**: System 1 (Gear targets per slot) only. All other systems remain
on their current renderers until Sprint 6.

**Files touched**:
- `app.js` (new EndgameGear module, 5 shared render helpers)
- `styles.css` (gear card grid, comparison pair layout, expand or collapse animations)
- `index.html` (new mount point inside the Endgame Build view)

**Data deliverables**: None (data from Sprint 4 is read as is).

**Rendering deliverables**:
- 5 shared render helpers: `renderItemCard`, `renderComparisonPair`, `renderStepList`,
  `renderTierList`, `renderLookupGrid`. Each helper takes data plus options, returns
  an HTML string.
- Gear Targets section rendered with: 10 slot grid, primary item card plus backup card
  side by side, item icon left, numbered affix list right, tempering and masterwork
  badges, aspect imprint chip, source dungeon chip
- Mobile responsive: 10 slot grid collapses to single column under 768 px, each pair
  becomes accordion (primary expanded, backup collapsed)
- Emoji section headers per Charlie spec, used as visual anchors only
- Click to expand item card for deep dives (stat ranges, drop tables, alternative
  rolls)

**Smoke test checklist**:
- Live app loads, Endgame Build view shows the new Gear Targets section above existing
  content
- All 10 slots render
- Item icons load (or graceful fallback to Font Awesome glyph)
- Mobile view at 375 px wide is readable, no horizontal scroll
- Charlie reviews and either approves or sends revisions

**Estimated effort**: 1 session for the build plus a review cycle.

**Gate**: Sprint 6 does not start until Charlie approves Sprint 5 visuals.

### Sprint 6: Full UI Rebuild, Layers 1 and 2

**Goal**: Re-render every Layer 1 and Layer 2 system using the templates locked in
Sprint 5. Replace the existing text heavy Endgame Build content.

**Systems covered**: Systems 2 through 9 (Runes, Talismans, Glyphs, Tempering,
Masterworking, Soul Shard plus Fragment combo, Paragon step by step, Mercenaries).
System 1 already rendered in Sprint 5.

**Files touched**:
- `app.js` (EndgameRunes, EndgameTalismans, EndgameGlyphs, EndgameTempering,
  EndgameMasterwork, EndgameSoulShards, EndgameParagon, EndgameMercs modules)
- `styles.css` (per system color accent rules, no new layout patterns since templates
  are locked)
- `index.html` (new mount points inside Endgame Build view)

**Data deliverables**: None (Sprint 4 data is read).

**Rendering deliverables**:
- 8 new sub-views inside the Endgame Build section, each using 1 or 2 of the 5
  templates
- Per system emoji header per Charlie spec
- Cross reference jumps: Talismans card links to Slot Reference Runes and Gems view,
  Paragon step links to existing Paragon view, Mercs cards link to existing Mercenary
  view (or replace it)
- Existing Endbuild aggregator card replaced by the new hero card pulling live values
- Runes section dedupes with existing Slot Reference Runes and Gems view (decide:
  delete Slot Reference rune content and link from Endgame, or keep both with a
  canonical pointer)

**Smoke test checklist**:
- Every Layer 1 and Layer 2 system renders without console errors
- Live values from AppState (level, paragon, glyph levels, shard, fragment) reflect
  correctly across cards
- Cross reference links work
- Mobile responsive at 375 px, no overlapping cards
- Existing Endgame Build aggregator removed cleanly, no orphan localStorage keys
- Dash check clean

**Estimated effort**: 2 to 3 sessions. Templates do the heavy lifting.

### Sprint 7: Progression and Activities, Layer 3

**Goal**: Render the 5 progression and activity systems. These are tier lists and step
lists, mostly read only reference.

**Systems covered**: Systems 10 through 14 (Difficulty progression path, Pit progression
tiers, Lair Boss farming map, War Plans rotation, Helltide and Nightmare Dungeons).

**Files touched**:
- `app.js` (EndgameProgression, EndgamePit, EndgameBossFarm, EndgameActivities modules)
- `styles.css` (tier badge colors per activity, lair boss map cards)
- `index.html` (new mount points or new Progression sub view)

**Decision in this sprint**: Does Progression become its own top level nav section
(growing 8 sections to 9), or stay inside Endgame Build as a sub view? Default
recommendation: sub view inside Endgame Build, keep 8 section nav locked per sticky
decision.

**Data deliverables**: None new (Sprint 4 data is read).

**Rendering deliverables**:
- Difficulty ladder card with current Torment marker (live from AppState.torment)
- Pit tier grid with kill time targets, glyph upgrade thresholds, recommended Pit
  push level based on glyph priority
- Lair boss farming cards with summoning material costs, location, drop table
  (existing Bosses view replaced or extended)
- War Plans tier list updated to new visual style (existing data is fine)
- Helltide and Nightmare Dungeons reference card with rotation cadence and target
  uniques

**Smoke test checklist**:
- Every Layer 3 view renders
- Live Torment, Pit highest, and boss kill counters reflected correctly
- Cross reference from Lair Boss cards to Gear Targets works for the drop table
  uniques
- Mobile responsive at 375 px
- Dash check clean

**Estimated effort**: 1 to 2 sessions.

### Sprint 8: Cross Reference, What's Next, Mobile QA

**Goal**: Ship the two cross reference views, hook for Codex, mobile responsive QA
pass across the whole endgame section.

**Systems covered**: Systems 15 and 16 (Acquisition lookup, What I Need Next priority
panel). System 17 (Codex of Power) deferred to its own sprint, hook stubs added.

**Files touched**:
- `app.js` (EndgameLookup, EndgameNext modules, Codex hook stubs)
- `styles.css` (filterable grid styles, priority panel)
- `index.html` (new mount points)
- All endgame views: mobile QA pass adjustments

**Data deliverables**:
- `D4_ENDGAME.lookups.byItem` reverse index: pick item, see all drop sources
- `D4_ENDGAME.lookups.bySource` forward index: pick boss or activity, see drops

**Rendering deliverables**:
- Acquisition lookup view with search input, filter chips (slot, rarity, source type),
  result grid
- What I Need Next panel that reads AppState (which uniques acquired, which aspects
  imprinted, which glyphs at what level) and surfaces the top 3 missing high impact
  pieces with action hints (run boss X, push Pit to T Y)
- Codex of Power placeholder card with a "next sprint" note and an existing hook for
  EndgameLookup to read from when the Codex data layer ships

**Smoke test checklist**:
- Lookup view filters work, search is case insensitive
- What I Need Next correctly surfaces top 3 missing pieces given known AppState
- All Layer 1 through 4 views render correctly on a real phone at 375 px and 414 px
- No console errors anywhere in the endgame section
- Dash check clean
- Export Save then Import Save round trip works without losing the new endgame state
  keys

**Estimated effort**: 1 to 2 sessions.

### Sprint 9 (deferred, not in this plan)

Codex of Power integration. Spec is open. Existing roadmap item. Sprint 8 lands the
hooks, Sprint 9 lights them up.

## Automation strategy

### Parallel data fetch

Use 6 parallel `WebFetch` calls (one per reference URL) at the start of Sprint 4
Session 1. Save raw content to `data-sources/endgame/raw/`. Wall time roughly 30 to 60
seconds for all 6 vs 5 minutes sequential.

### Parallel sub agent reconciliation

After fetch completes, spawn 4 `general-purpose` sub agents in parallel:

1. **Gear and Stats agent**: owns Systems 1, 5, 6 (gear targets, tempering,
   masterworking). Input: 6 raw markdowns plus existing `gearweights.js`. Output:
   `data-sources/endgame/reconciled/gear.md` and a delta log in
   `RECONCILIATION-V2.md`.
2. **Build Layer agent**: owns Systems 2, 3, 4, 7, 8 (runes, talismans, glyphs, soul
   shards, paragon step list). Input: 6 raw markdowns plus existing `runesgems.js`,
   `paragon.js`. Output: `data-sources/endgame/reconciled/build-layer.md`.
3. **Companions agent**: owns System 9 (mercenaries). Input: 6 raw markdowns. Specific
   instruction: Maxroll canonical for source disagreement (Subo vs Raheir vs
   Varyana). Output: `data-sources/endgame/reconciled/mercs.md`.
4. **Progression agent**: owns Systems 10 through 14 (difficulty, Pit tiers, boss
   farming, war plans, helltides and nightmare dungeons). Input: 6 raw markdowns.
   Output: `data-sources/endgame/reconciled/progression.md` and
   `data-sources/endgame/reconciled/activities.md`.

Each agent gets a self contained prompt with the URLs, the reconciliation rules
(Maxroll canonical), the confidence tagging requirement, and the dash style rules.
Wall time roughly 5 to 10 minutes for all 4 vs 30 to 40 minutes sequential.

### Templated rendering

5 render helpers introduced in Sprint 5 and reused everywhere afterward:

1. `renderItemCard(item, opts)`: icon, name, slot label, numbered affix list, tempering
   chip, masterwork chip, aspect imprint chip, source dungeon chip, confidence chip,
   click to expand stats. Used for: gear (10 slots), uniques, talismans Seal, top
   aspects.
2. `renderComparisonPair(primary, backup, opts)`: two `renderItemCard` calls in a side
   by side flex layout that collapses to accordion on mobile. Used for: weapon split
   (1H plus offhand vs 2H), primary vs backup per slot.
3. `renderStepList(steps, opts)`: numbered ordered list with optional checkbox state
   per step, persists to localStorage when `opts.persistKey` is provided. Used for:
   paragon board rotation, glyph leveling order, difficulty progression, Codex priority
   list (when ready).
4. `renderTierList(items, tierField, opts)`: items grouped by tier label, color coded
   tier badges, optional in plan toggle. Used for: runes, mercs, pit tiers, war
   plans, activities, glyph priority.
5. `renderLookupGrid(items, filters, opts)`: filterable searchable grid with chip
   filters and free text input. Used for: acquisition lookup, codex of power (when
   ready).

Per system custom rendering drops to roughly 30 lines: data shape, helper invocation,
section header.

### Reuse existing files

- `gearweights.js`: keep as is, Gear Comparison tool depends on it. New endgame view
  reads from it for affix priorities. No duplication.
- `runesgems.js`: keep as is. Sprint 6 decides whether to delete Slot Reference rune
  content or link from Endgame Build.
- `paragon.js`: keep as is. Sprint 6 reads board and glyph data from here.
- `itemdata.js`: keep as is. New endgame data adds icon URLs and source dungeons that
  did not previously exist.
- `data.js`: keep as is. Skill bar, soul shards, fragments, mercs already populated.
  Sprint 4 reconciliation may add deltas, those go into a `data.js` patch commit at
  end of Sprint 4 only if needed.

### Batch operations

Sprint 4 Session 1 runs the entire fetch plus reconciliation cycle as a single batch.
Single coherent context, no per system back and forth. One commit lands all the raw
markdowns and all the reconciled markdowns at once. The JS port is a second commit in
Session 2.

Sprint 6 commits the 8 sub views in one batch (or 2 batches max) since they share
templates. No per system review cycles unless the smoke test fails.

## Risk flags

### Data quality

**Risk**: 3 of the 6 sources (eGamersWorld, BoostMatch, sometimes Mobalytics) are
lower tier and may carry stale or guessed data.

**Mitigation**: Maxroll canonical rule unchanged from Sprint 1. Where Maxroll is
silent, Icy Veins is secondary. Mobalytics third. eGamersWorld and BoostMatch are
tiebreakers or quote material only, never canonical. Document every delta in
`RECONCILIATION-V2.md`.

**Risk**: Mercenary hired pick: Subo vs Raheir vs Varyana disagreement is real and
calls out the build version drift problem.

**Mitigation**: Follow the Maxroll canonical rule. Document the disagreement
explicitly in the Mercs card UI so Charlie sees the controversy rather than a single
opinion. Confidence MEDIUM on the hired pick.

### Item icon hotlinking

**Risk**: Maxroll, Wowhead, and the official Diablo 4 site all host item icons. Direct
hotlinking is technically allowed by most but breaks if the CDN restructures URLs and
is ethically gray.

**Mitigation**: Sprint 5 uses Font Awesome glyphs as placeholders by default. A
separate "icon assets" mini sprint can later swap in real icons by either downloading
to `/icons/` in the repo (legal review needed) or pointing at the Diablo 4 wiki
Fandom CDN which is publicly served and stable. Do not block on icons in Sprint 5.

### Endgame data file size

**Risk**: `endgamedata.js` could balloon past 300 KB and slow first load on mobile.

**Mitigation**: Profile after Sprint 4 Session 2. If over 300 KB, split into:
- `endgamedata-gear.js` (gear, tempering, masterworking, talismans)
- `endgamedata-paragon.js` (paragon, glyphs, soul shards)
- `endgamedata-progression.js` (difficulty, pit, bosses, activities)
- `endgamedata-mercs.js` (companions)

Load all four in `index.html` at the same point currently planned for one file. App.js
reads from `D4_ENDGAME.gear`, `D4_ENDGAME.paragon`, etc. transparently.

### Mobile UX of a desktop first design

**Risk**: Maxroll's gear grid is desktop first. A naive port reads cramped or scrolls
horizontally on a phone.

**Mitigation**: Sprint 5 mockup smoke test explicitly includes 375 px and 414 px
viewports. `renderComparisonPair` collapses to accordion under 768 px. `renderItemCard`
keeps icon and numbered affixes always visible, hides verbose body text behind tap to
expand. Test on a real phone in Sprint 5 review.

### Build version drift mid sprint

**Risk**: Blizzard ships a balance patch mid overhaul, reconciliation goes stale.

**Mitigation**: Each reconciled markdown stamps `compiledAt` and `patchVersion`.
`endgamedata.js` exposes the same. A future "patch refresh" mini sprint can re run
just the parallel fetch plus reconciliation pipeline.

### Scope creep

**Risk**: 17 systems plus 4 sprints is a lot. Mockup approval gating mitigates design
drift, but feature creep within a sprint (Charlie sees a render and asks for one more
chip per card) can balloon Sprint 6.

**Mitigation**: Each sprint smoke test is a hard gate. New asks land in a
post sprint queue for the next sprint, not the current one. Sprint 9 (Codex of
Power) is the catchall for "we forgot X" items.

### Confidence tagging discipline

**Risk**: Without confidence tags, Charlie cannot tell which recommendations are rock
solid vs guesswork.

**Mitigation**: HIGH, MEDIUM, LOW tags on every endgame data row, same pattern as
Sprint 1. Render the tag as a small chip on every card. Filter UI option in Sprint 8
to "hide LOW confidence" if it gets noisy.

## Pre-sprint GO checklist template

Run this before kicking off any sprint in this plan:

1. `git status` is clean. No untracked or unstaged work that would muddy the sprint
   commit.
2. `git pull` is current with `origin/main`.
3. `SESSION-HANDOFF.md` reflects the actual state (last sprint marked shipped, current
   sprint identified).
4. Live app smoke tested at https://moranteam.github.io/D4_S13_Warlock/. No console
   errors on any of the 8 views.
5. Export Save backup created tonight, stashed in Drive or iCloud. Restore point in
   case a sprint breaks state shape.
6. Previous sprint's smoke test list is fully checked off.
7. `node --check app.js` and all data JS files passes.
8. Dash check on the working tree: `grep -RnE "[em or en dash characters]" .` returns
   nothing.
9. Confidence: HIGH or MEDIUM on the data being touched. If LOW, flag and defer the
   sprint.
10. Time budget: 1 to 3 hour blocks available. Do not start a 2 session sprint with
    only 30 minutes free.

## Approved additions (was: Missing systems flagged)

The 9 systems below were flagged in the original draft and approved on 2026-05-14 for
inclusion. Each one's home sprint is locked.

1. **Stat caps and breakpoints** (resistance, armor, attack speed). HOME: Sprint 6 as
   a sub card inside the gear targets section. Source: Maxroll endgame stat caps
   table.
2. **Endgame skill bar swap moment**. HOME: Sprint 6 as a step list anchored to Lv 70.
   Surfaces the difference between the leveling bar and the final endgame bar.
3. **Boss kill rotations** (Astaroth, Duriel, Andariel button sequences). HOME: Sprint
   7 as a per pinnacle boss card inside the Lair Boss farming view.
4. **Resource management mechanics** (Wrath, Offering uptime, Shadowform stack
   maintenance). HOME: Sprint 6 as a Mechanics card inside the Soul Shards section.
   3 to 5 bullet point rotation loops.
5. **Aspect stash management**. HOME: Open Items queue, not a new sprint. Pair with
   the existing aspect tracker enhancement candidate.
6. **Seasonal mechanic flavor beyond Soul Shards**. HOME: Sprint 4 reconciliation
   flag. If the parallel fetch surfaces a Season 13 power loop not already covered by
   Soul Shards or the walkthrough, the data lands in `endgamedata.js` and a UI home
   is assigned in Sprint 6 or 7.
7. **PvP and Hardcore considerations**. HOME: skipped, out of scope per build target
   lock. Document the skip in `RECONCILIATION-V2.md` so future you knows why.
8. **Tempering manual catalog with farm locations**. HOME: Sprint 7 inside the
   activities section. Tempering manuals drop from Helltides and Nightmare Dungeons,
   so this lives alongside those activity cards.
9. **Renown and altar of Lilith reminders**. HOME: small reminder card on the existing
   Dashboard, not a new sprint. Folded into the Sprint 8 mobile QA pass as a tiny
   addition.

Total systems now in scope: 17 original plus 9 approved additions equals **26
systems** across Sprints 4 through 8. Two of the 9 (items 5 and 9) stay outside the
sprint flow as enhancement queue items. One (item 7) is explicitly skipped. The
remaining 6 are folded into existing sprint scopes without adding new sprints.

## Recommended first action

Reply with one of:

- `approve plan, ship Sprint 3 Part C first` (recommended path): I close out Sprint 3
  Part C (Save this drop history in Gear Compare) in the next session, then open
  Sprint 4 Session 1 with the parallel fetch and reconciliation pipeline.
- `approve plan, skip Sprint 3 Part C for now`: I open Sprint 4 Session 1 immediately
  next session. Sprint 3 Part C moves to the post overhaul queue.
- `revise plan with [specific changes]`: I update this doc and re commit.

Either way, the immediate first action on Sprint 4 Session 1 is a 6 way parallel
`WebFetch` against the 6 reference URLs into `data-sources/endgame/raw/`. Wall time
under 1 minute. After the fetch lands, I spawn the 4 reconciliation sub agents in
parallel. Total Sprint 4 Session 1 wall time target: under 30 minutes for fetch plus
reconciliation. Session 2 ports to `endgamedata.js` and runs the smoke test.
