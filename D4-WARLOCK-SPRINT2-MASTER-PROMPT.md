# D4 Warlock Sprint 2: Leveling Path Module Build

**Sprint Owner:** Charlie Moran
**Project Path:** `~/Projects/personal/D4_S13_Warlock/`
**Sprint Goal:** Fill the Leveling Path section with cohesive, opinionated content. Build the two new renderers (Skill Timeline, PS5 Controller), enhance the existing Walkthrough module with phase-level checkboxes and auto-current-phase highlighting, and tie all three sub-modules together as one Leveling Path experience.

**Charlie's current state (for testing context):**
- Level 46
- Quest: Scattered to the Winds (Lord of Hatred campaign)
- Difficulty: Hard
- Smoke test on Sprint 1 baseline already passed

---

## Read Before Coding (Mandatory)

In this exact order:

1. `~/Projects/personal/D4_S13_Warlock/D4-WARLOCK-SPRINT2-MASTER-PROMPT.md` (this file)
2. `~/Projects/personal/D4_S13_Warlock/data.js` (specifically the new `levelingPath` and `controllerBindings` objects added in Sprint 1)
3. `~/Projects/personal/D4_S13_Warlock/data-sources/leveling-skill-points.md` (the canonical source for the Timeline renderer)
4. `~/Projects/personal/D4_S13_Warlock/data-sources/controller-bindings.md` (the canonical source for the Controller renderer)
5. `~/Projects/personal/D4_S13_Warlock/app.js` (existing Walkthrough module to enhance, and pattern for new modules)
6. `~/Projects/personal/D4_S13_Warlock/index.html` (mount points: walkthroughRoot, skillTimelineRoot, controllerRoot)
7. `~/Projects/personal/D4_S13_Warlock/styles.css` (existing design tokens)

Confirm all 7 files read before writing any code.

---

## Sprint 2 Scope (5 Parts)

### Part A: Skill Timeline Renderer

Build a new renderer that mounts to `skillTimelineRoot` and reads from `window.D4_DATA.levelingPath`.

**Visual design:**
- Scrollable vertical timeline
- One row per level, 70 rows total
- Each row shows: Level number (large), Point Spent This Level (skill name + rank), Cumulative State (smaller text), Respec marker if applicable
- Sticky level number on the left as user scrolls
- HIGH confidence rows: full opacity. MEDIUM confidence rows: muted opacity with a small "?" icon tooltip
- Respec rows (Lv 15, 30, 34, 40): bold horizontal divider above, "RESPEC" badge, expandable block below showing the full post-respec rebuild state
- Endgame target row (Lv 70): gold-bordered, "ENDGAME" badge

**Current level highlight:**
- Read current level from `AppState.data.level` (Quick Update modal state)
- Highlight the current level row with a left accent border in Hellfire red
- Auto-scroll to current level on mount

**Interactions:**
- Click a level row to expand it and see full notes
- Click a respec block to expand the post-respec rebuild state
- Persist expanded state in localStorage under `d4_warlock_timeline_expanded_v1`

**Mount: skillTimelineRoot**

---

### Part B: PS5 Controller Renderer

Build a new renderer that mounts to `controllerRoot` and reads from `window.D4_DATA.controllerBindings`.

**Visual design:**
- Custom SVG of a PS5 DualSense controller (rough outline, recognizable, not photorealistic)
- 6 skill button positions labeled: Square, Triangle, Circle, X, R1, R2 (plus L2 for the Evade slot)
- Each button shows the currently bound skill name based on the user's current level milestone
- Below the controller: "Replaced This Update" callout if the current level is within 2 levels of a milestone transition
- Toggle button: "View All Milestones" expands a table of all 13 milestones with full skill assignments

**Current level mapping:**
- Read `AppState.data.level`
- Find the highest milestone level <= current level from `D4_DATA.controllerBindings.milestones`
- Render that milestone's button bindings on the controller
- Show "Next Update at Lv X" badge with countdown

**Milestones to support:**
Lv 1, 3, 4, 8, 9, 15, 20, 30, 34, 41, 50, 70 "Endgame Entry", Final Endgame "Mastermind Mature"

**Customization caveat (visible in UI):**
- Small info card: "Button placement is Maxroll canonical. Sprint 3 will let you customize."

**Mount: controllerRoot**

---

### Part C: Walkthrough Enhancement 1 - Phase-Level Checkboxes

Modify the existing Walkthrough module (do NOT replace it, enhance it).

**Add to each of the 9 phase cards:**
- A prominent "Mark Phase Complete" toggle at the top of the phase card (NOT a tiny checkbox; make it a clear button or large checkbox)
- When toggled ON: marks all child task checkboxes complete, applies a "completed" visual style to the phase card (dimmed background, strikethrough on title), persists state
- When toggled OFF: reverts task checkboxes to whatever individual state they had (do not blow away granular progress)

**State management:**
- New AppState slice: `data.phaseComplete = { phase1: false, phase2: false, ... }`
- Persist to localStorage under existing `d4_warlock_*` save key
- When phase toggled ON, set all `data.taskComplete[taskId]` for that phase to true
- When phase toggled OFF, revert any tasks that were JUST set true by the phase toggle back to false (track this in a separate `phaseToggleSnapshot` so we do not destroy user's manual progress)

**Acceptance:**
- Toggling phase complete updates all child tasks visually and in localStorage
- Untoggling reverts only the tasks the phase-toggle modified, leaving user-marked tasks intact

---

### Part D: Walkthrough Enhancement 2 - Auto-Suggest Current Phase

Highlight the active phase based on current level.

**Logic:**
- Read `AppState.data.level`
- Find the phase where `levelMin <= currentLevel <= levelMax`
- That phase is "active": gets a prominent visual treatment (Hellfire red left border, glow effect, "CURRENT" badge in the top right of the card)
- Phases AHEAD of current level: normal styling
- Phases BEHIND current level AND marked complete: dimmed
- Phases BEHIND current level AND NOT marked complete: normal styling with a small "INCOMPLETE" warning badge

**Test case for Charlie at Lv 46:**
- Phase covering Lv 41 to 50 (or similar) should be marked CURRENT
- Phases 1 through whichever covers Lv 40 should be normally styled (unless he has manually marked them complete)

**Re-render trigger:**
- When Quick Update modal saves new level, re-render the Walkthrough section to update the CURRENT badge

---

### Part E: Leveling Path Section Header + Cross-References

**Header card at the top of the Leveling Path section:**
- Title: "Leveling Path"
- Brief intro line: "Your path from 1 to 70. Walkthrough by phase, exact skill points per level, PS5 controller bindings as you level up."
- Quick stats row showing: Current Level, Current Phase Name, Current Controller Milestone, % through leveling (current level / 70 * 100)

**Cross-reference links:**
- Each Walkthrough phase card has a "Jump to Skill Timeline" link that scrolls to the start of that level range in the Skill Timeline below
- Each Skill Timeline level row has a "Jump to Controller" link (small icon) that scrolls to the Controller module showing what the bar looks like at that level milestone
- Smooth scroll behavior, no page reload

---

## Acceptance Criteria

Sprint 2 is complete when:

1. ✅ Skill Timeline renderer renders all 70 levels with current-level highlight
2. ✅ Respec post-respec rebuild states render as expandable blocks
3. ✅ Controller renderer shows the correct 6-button binding for Charlie's current level (Lv 46 maps to the Lv 41 milestone state since 50 has not been hit)
4. ✅ Phase-level checkboxes work and persist
5. ✅ Phase auto-highlight follows level changes
6. ✅ Header card shows correct quick stats for current level
7. ✅ Cross-reference jumps work (Walkthrough -> Timeline, Timeline -> Controller)
8. ✅ App loads with zero console errors
9. ✅ Mobile responsive at 375px (Skill Timeline stacks cleanly, Controller scales down)
10. ✅ Grep check returns zero em dashes, en dashes, or hyphens as dashes
11. ✅ Git commits per logical step (Part A, B, C, D, E as separate commits at minimum)

---

## Sub-Step Commit Plan

```
Sprint 2 Part A: Skill Timeline renderer
Sprint 2 Part B: PS5 Controller renderer
Sprint 2 Part C: Walkthrough phase-level checkboxes
Sprint 2 Part D: Walkthrough auto-current-phase highlight
Sprint 2 Part E: Leveling Path header + cross-references
Sprint 2: final polish + dash check + smoke notes
```

---

## Anti-Patterns (Do Not Do)

- ❌ Do not replace the existing Walkthrough module. Enhance it.
- ❌ Do not add a "customize my controller" UI yet. That is Sprint 3 scope. Just render the canonical layout.
- ❌ Do not modify `levelingPath` or `controllerBindings` data in `data.js`. They are sacred reference. Use them as-is.
- ❌ Do not write em dashes, en dashes, or hyphens as dashes anywhere. Grep before every commit.
- ❌ Do not break existing modules (Endgame Build, Gear Targets, etc.) while modifying the Leveling Path section.
- ❌ Do not over-engineer the controller SVG. Recognizable as a DualSense, not photorealistic. ~200 lines of SVG max.
- ❌ Do not use `prompt()` for any user input. Use existing modal patterns.

---

## Claude Code Protocol

1. `/compact` before starting if context is heavy
2. Read all 7 mandatory files
3. Build Part A. Show me the Skill Timeline rendering for Charlie's current Lv 46 state. Commit.
4. Build Part B. Show me the Controller SVG and verify the Lv 46 mapping points to the Lv 41 milestone. Commit.
5. Build Part C. Show me a phase card with the new toggle. Commit.
6. Build Part D. Show me how Phase 6 (or whichever phase covers Lv 46) is highlighted. Commit.
7. Build Part E. Show me the Leveling Path header rendering and verify a cross-ref jump works. Commit.
8. Run final dash check, syntax check, mobile responsive check.
9. Final commit: "Sprint 2 complete: Leveling Path module shipped"

---

## First Prompt to Claude Code

Paste this verbatim:

> Read `~/Projects/personal/D4_S13_Warlock/D4-WARLOCK-SPRINT2-MASTER-PROMPT.md` end to end. Then read all 7 mandatory files listed inside it. Do not write any code yet. Confirm you read each file, summarize the current state of the Leveling Path section, and ask me to greenlight Part A (Skill Timeline renderer).

When Code confirms, paste:

> Greenlit. Start Part A: Skill Timeline renderer. Build it, show me the rendering for Charlie's current Lv 46 state (which should highlight row 46 with the Hellfire red accent and auto-scroll there on mount). Commit, then move on. Do not stop for greenlight between Part A and Part B; commit each part and continue. Only stop at the end of Part E. Show me the code you added at each commit.

---

## After Sprint 2

Sprint 3 will be the Gear Comparison tool (your top priority feature). That sprint depends on `gearweights.js` and the existing `itemdata.js`, both compiled in Sprint 1.
