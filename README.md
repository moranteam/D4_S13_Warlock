# D4 Warlock God Run

Diablo IV Season 13 Lord of Hatred companion. Dread Claws Mastermind leveling and endgame guide.

## Quick Start (Local)

1. Drop this entire folder into `~/Projects/personal/D4_S13_Warlock/`
2. Open `index.html` in Chrome. That is the entire setup.
3. Press `/` anywhere to open the Quick Update FAB.

## Quick Start (GitHub Pages)

```bash
cd ~/Projects/personal/D4_S13_Warlock
git init
git add .
git commit -m "Batch 1: foundation shell"
gh repo create moranteam/d4-warlock-s13 --public --source=. --remote=origin --push
```

Then enable GitHub Pages: Settings > Pages > Source: main branch, root folder.

Live URL: `https://moranteam.github.io/d4-warlock-s13/`

## File Structure

```
D4_S13_Warlock/
  index.html       Main shell, 13 section divs, modals, FAB, bottom tab bar
  styles.css       Dark theme primary, light theme toggle, mobile-first responsive
  app.js           Core engine: state, routing, save/load, Quick Update parser
  data.js          STUB (Batch 3: skills, shards, fragments, aspects, walkthrough)
  itemdata.js      STUB (Batch 4: uniques, mythics, drop tables)
  paragon.js       STUB (Batch 4: boards, glyphs, rotations)
  manifest.json    PWA manifest for iOS home screen install
```

## Sections (13 total)

| Section | Batch | Status |
|---|---|---|
| Dashboard | 1 | Wired with phase advisor |
| Patch Notes | 5 | Placeholder |
| Walkthrough | 2 | Placeholder |
| Skill Tree | 3 | Placeholder |
| Soul Shards | 3 | Placeholder |
| Aspect Tracker | 3 | Placeholder |
| Unique Chase | 4 | Placeholder |
| Talisman & Charms | 5 | Placeholder |
| Paragon Boards | 4 | Placeholder |
| Boss Farming | 4 | Placeholder |
| War Plans | 5 | Placeholder |
| Endgame Build | 4 | Placeholder |
| Mercenary | 5 | Placeholder |

## Quick Update Commands

Press `/` anywhere (or tap the lightning bolt FAB on mobile) and type:

```
level 42                 Set character level
paragon 150              Set Paragon level
torment 3                Set Torment tier
pit 8                    Mark Pit T8 cleared (highest)
respec 34                Mark level 34 respec done
shard mastermind         Set Soul Shard
fragment blasphemous     Set Fragment
imprint deeper-shadows   Mark aspect imprinted
got night-terror         Mark unique acquired
boss andariel            Increment boss kill counter
step phase-3 dread       Toggle walkthrough step
wp helltide              Mark War Plan done
```

Separate multiple commands with `;`. Example:

```
level 16; respec 15; shard mastermind
```

## Save / Load

- `Download` icon in topbar: exports JSON save file
- `Upload` icon: imports a previously exported save
- `Reset` icon (rotate-left): wipes everything with confirmation

Saves are stored in localStorage under `d4_warlock_*_v1` keys.

## Patch / Data Sources

- Patch: 3.0 Lord of Hatred (April 28, 2026)
- Season 13: Season of Reckoning
- Build sources: Maxroll, Icy Veins, Mobalytics, Game8

Data freshness is cited per section. Verify before pushing high Torment.

## Next: Batch 2

Wires up the Leveling Walkthrough section with phase-based checklist, respec triggers at 15/30/34/40, and rank-up priority. Dashboard phase advisor will start reading from the walkthrough state.
