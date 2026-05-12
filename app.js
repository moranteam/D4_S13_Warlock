/* ============================================
   D4 WARLOCK GOD RUN
   Core Engine v0.1
   Season 13 Lord of Hatred
   ============================================ */

(function () {
  'use strict';

  // ========================================
  // LOCAL STORAGE KEYS
  // ========================================
  const LS_KEYS = {
    character: 'd4_warlock_character_v1',
    walkthrough: 'd4_warlock_walkthrough_v1',
    skills: 'd4_warlock_skills_v1',
    aspects: 'd4_warlock_aspects_v1',
    uniques: 'd4_warlock_uniques_v1',
    paragon: 'd4_warlock_paragon_v1',
    bosses: 'd4_warlock_bosses_v1',
    warplans: 'd4_warlock_warplans_v1',
    settings: 'd4_warlock_settings_v1',
    notes: 'd4_warlock_notes_v1',
  };

  // ========================================
  // DEFAULT STATE
  // ========================================
  const DEFAULTS = {
    character: {
      level: 1,
      paragon: 0,
      className: 'Warlock',
      build: 'Dread Claws Mastermind',
      soulShard: null,
      fragment: null,
      torment: 0,
      pitHighest: 0,
      hardcore: false,
    },
    walkthrough: {},
    skills: {
      respec: {
        lv15: false,
        lv30: false,
        lv34: false,
        lv40: false,
      },
      ranks: {},
    },
    aspects: {},
    uniques: {},
    paragon: {
      boards: [],
      glyphs: {},
    },
    bosses: {},
    warplans: {},
    settings: {
      theme: 'dark',
    },
    notes: '',
  };

  // ========================================
  // STATE MANAGER
  // ========================================
  const AppState = {
    data: {},

    load() {
      this.data = {};
      for (const [key, lsKey] of Object.entries(LS_KEYS)) {
        try {
          const raw = localStorage.getItem(lsKey);
          if (raw === null) {
            this.data[key] = deepClone(DEFAULTS[key]);
          } else {
            const parsed = JSON.parse(raw);
            this.data[key] = mergeDefaults(parsed, DEFAULTS[key]);
          }
        } catch (err) {
          console.warn('Failed to load ' + lsKey + ':', err);
          this.data[key] = deepClone(DEFAULTS[key]);
        }
      }
    },

    save(key) {
      const keys = key ? [key] : Object.keys(LS_KEYS);
      for (const k of keys) {
        try {
          localStorage.setItem(LS_KEYS[k], JSON.stringify(this.data[k]));
        } catch (err) {
          console.warn('Failed to save ' + LS_KEYS[k] + ':', err);
          Toast.show('Save failed. Storage may be full.', 'error');
        }
      }
    },

    reset() {
      for (const lsKey of Object.values(LS_KEYS)) {
        localStorage.removeItem(lsKey);
      }
      this.load();
    },

    exportSave() {
      const payload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        patch: '3.0 Lord of Hatred',
        data: this.data,
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'd4-warlock-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      Toast.show('Save exported', 'success');
    },

    importSave(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (!parsed.data || typeof parsed.data !== 'object') {
          throw new Error('Invalid save file');
        }
        for (const key of Object.keys(LS_KEYS)) {
          if (parsed.data[key]) {
            this.data[key] = mergeDefaults(parsed.data[key], DEFAULTS[key]);
          }
        }
        this.save();
        return true;
      } catch (err) {
        console.warn('Import failed:', err);
        return false;
      }
    },
  };

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function mergeDefaults(saved, defaults) {
    if (saved === null || saved === undefined) return deepClone(defaults);
    if (typeof defaults !== 'object' || Array.isArray(defaults)) return saved;
    const merged = deepClone(defaults);
    for (const key of Object.keys(saved)) {
      if (saved[key] !== null && typeof saved[key] === 'object' && !Array.isArray(saved[key]) && defaults[key]) {
        merged[key] = mergeDefaults(saved[key], defaults[key]);
      } else {
        merged[key] = saved[key];
      }
    }
    return merged;
  }

  // ========================================
  // ROUTER (section navigation)
  // ========================================
  const Router = {
    current: 'dashboard',
    sections: [
      'dashboard', 'walkthrough', 'skills', 'shards',
      'aspects', 'uniques', 'talismans', 'paragon',
      'bosses', 'warplans', 'endbuild', 'mercenary', 'patch',
    ],
    titles: {
      dashboard: 'Dashboard',
      walkthrough: 'Leveling Walkthrough',
      skills: 'Skill Tree Planner',
      shards: 'Soul Shards & Fragments',
      aspects: 'Aspect Tracker',
      uniques: 'Unique Chase List',
      talismans: 'Talisman & Charms',
      paragon: 'Paragon Boards',
      bosses: 'Boss Farming',
      warplans: 'War Plans',
      endbuild: 'Endgame Build',
      mercenary: 'Mercenary',
      patch: 'Patch Notes',
    },

    init() {
      const hash = window.location.hash.slice(1);
      if (this.sections.includes(hash)) {
        this.current = hash;
      }
      this.render();

      window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.slice(1);
        if (this.sections.includes(newHash)) {
          this.go(newHash, false);
        }
      });

      document.querySelectorAll('[data-section]').forEach((el) => {
        el.addEventListener('click', (e) => {
          const sec = el.getAttribute('data-section');
          if (sec) {
            e.preventDefault();
            this.go(sec);
          }
        });
      });
    },

    go(section, updateHash = true) {
      if (!this.sections.includes(section)) return;
      this.current = section;
      if (updateHash) {
        window.location.hash = section;
      }
      this.render();
      Sidebar.close();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    render() {
      document.querySelectorAll('.view').forEach((v) => {
        v.hidden = v.getAttribute('data-view') !== this.current;
      });
      document.querySelectorAll('.nav-item, .bottom-tab').forEach((el) => {
        const sec = el.getAttribute('data-section');
        if (sec === this.current) {
          el.classList.add('is-active');
        } else {
          el.classList.remove('is-active');
        }
      });
      const titleEl = document.getElementById('topbarCurrent');
      if (titleEl) titleEl.textContent = this.titles[this.current] || this.current;
    },
  };

  // ========================================
  // SIDEBAR (mobile toggle)
  // ========================================
  const Sidebar = {
    init() {
      const toggle = document.getElementById('sidebarToggle');
      const backdrop = document.getElementById('sidebarBackdrop');
      if (toggle) {
        toggle.addEventListener('click', () => this.toggle());
      }
      if (backdrop) {
        backdrop.addEventListener('click', () => this.close());
      }
    },

    toggle() {
      const el = document.getElementById('sidebar');
      const bd = document.getElementById('sidebarBackdrop');
      if (!el || !bd) return;
      const isOpen = el.classList.contains('is-open');
      if (isOpen) {
        this.close();
      } else {
        el.classList.add('is-open');
        bd.classList.add('is-visible');
      }
    },

    close() {
      const el = document.getElementById('sidebar');
      const bd = document.getElementById('sidebarBackdrop');
      if (el) el.classList.remove('is-open');
      if (bd) bd.classList.remove('is-visible');
    },
  };

  // ========================================
  // THEME
  // ========================================
  const Theme = {
    init() {
      this.apply(AppState.data.settings.theme || 'dark');
      const btn = document.getElementById('themeToggle');
      if (btn) btn.addEventListener('click', () => this.toggle());
    },

    apply(theme) {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add('theme-' + theme);
      AppState.data.settings.theme = theme;
      AppState.save('settings');
      const btn = document.getElementById('themeToggle');
      if (btn) {
        btn.innerHTML = theme === 'dark'
          ? '<i class="fa-solid fa-moon"></i>'
          : '<i class="fa-solid fa-sun"></i>';
      }
    },

    toggle() {
      const next = AppState.data.settings.theme === 'dark' ? 'light' : 'dark';
      this.apply(next);
    },
  };

  // ========================================
  // TOAST
  // ========================================
  const Toast = {
    container: null,

    init() {
      this.container = document.getElementById('toastContainer');
    },

    show(message, type = 'info', duration = 3000) {
      if (!this.container) return;
      const el = document.createElement('div');
      el.className = 'toast toast-' + type;
      const icon = ({
        success: 'fa-circle-check',
        warn: 'fa-triangle-exclamation',
        error: 'fa-circle-xmark',
        info: 'fa-circle-info',
      })[type] || 'fa-circle-info';
      el.innerHTML = '<i class="fa-solid ' + icon + '"></i><div>' + escapeHtml(message) + '</div>';
      this.container.appendChild(el);
      setTimeout(() => {
        el.classList.add('is-leaving');
        setTimeout(() => el.remove(), 250);
      }, duration);
    },
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ========================================
  // MODAL
  // ========================================
  const Modal = {
    init() {
      document.querySelectorAll('[data-close-modal]').forEach((el) => {
        el.addEventListener('click', () => {
          const id = el.getAttribute('data-close-modal');
          this.close(id);
        });
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.modal.is-open').forEach((m) => m.classList.remove('is-open'));
        }
      });
    },

    open(id) {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('is-open');
        const input = el.querySelector('input[type="text"]');
        if (input) setTimeout(() => input.focus(), 50);
      }
    },

    close(id) {
      const el = document.getElementById(id);
      if (el) el.classList.remove('is-open');
    },

    confirm(message, onConfirm, title = 'Confirm') {
      const modal = document.getElementById('modalConfirm');
      const titleEl = document.getElementById('confirmTitle');
      const textEl = document.getElementById('confirmText');
      const okBtn = document.getElementById('confirmOk');
      const cancelBtn = document.getElementById('confirmCancel');
      if (!modal) return;

      titleEl.textContent = title;
      textEl.textContent = message;

      const handleOk = () => {
        cleanup();
        onConfirm();
      };
      const handleCancel = () => cleanup();
      const cleanup = () => {
        okBtn.removeEventListener('click', handleOk);
        cancelBtn.removeEventListener('click', handleCancel);
        this.close('modalConfirm');
      };

      okBtn.addEventListener('click', handleOk);
      cancelBtn.addEventListener('click', handleCancel);
      this.open('modalConfirm');
    },
  };

  // ========================================
  // QUICK UPDATE COMMAND PARSER
  // ========================================
  const QuickUpdate = {
    init() {
      const fab = document.getElementById('fab');
      const fabBottom = document.getElementById('fabBottom');
      const input = document.getElementById('quickInput');

      if (fab) fab.addEventListener('click', () => this.open());
      if (fabBottom) fabBottom.addEventListener('click', () => this.open());

      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.submit(input.value);
            input.value = '';
          }
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !this.isInputFocused()) {
          e.preventDefault();
          this.open();
        }
      });
    },

    isInputFocused() {
      const a = document.activeElement;
      return a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA');
    },

    open() {
      Modal.open('modalQuick');
    },

    submit(raw) {
      if (!raw || !raw.trim()) {
        Modal.close('modalQuick');
        return;
      }
      const commands = raw.split(';').map((c) => c.trim()).filter(Boolean);
      let successCount = 0;
      let failCount = 0;
      const messages = [];

      for (const cmd of commands) {
        const result = this.parse(cmd);
        if (result.ok) {
          successCount++;
          if (result.message) messages.push(result.message);
        } else {
          failCount++;
          messages.push('Unknown: ' + cmd);
        }
      }

      AppState.save();
      Dashboard.render();
      Nav.updateBadges();

      if (successCount > 0 && failCount === 0) {
        Toast.show(messages.join(' | ') || (successCount + ' updates'), 'success');
        Modal.close('modalQuick');
      } else if (successCount > 0 && failCount > 0) {
        Toast.show(successCount + ' applied, ' + failCount + ' unknown', 'warn');
      } else {
        Toast.show(messages.join(' | ') || 'No commands recognized', 'error');
      }
    },

    parse(cmd) {
      const lower = cmd.toLowerCase().trim();

      // level [n]
      let m = lower.match(/^level\s+(\d+)$/);
      if (m) {
        const n = clamp(parseInt(m[1], 10), 1, 70);
        AppState.data.character.level = n;
        return { ok: true, message: 'Level set to ' + n };
      }

      // paragon [n]
      m = lower.match(/^paragon\s+(\d+)$/);
      if (m) {
        const n = clamp(parseInt(m[1], 10), 0, 300);
        AppState.data.character.paragon = n;
        return { ok: true, message: 'Paragon ' + n };
      }

      // torment [n]
      m = lower.match(/^torment\s+(\d+)$/) || lower.match(/^t(\d+)\s+cleared$/);
      if (m) {
        const n = clamp(parseInt(m[1], 10), 0, 12);
        AppState.data.character.torment = n;
        return { ok: true, message: 'Torment T' + n };
      }

      // pit [n]
      m = lower.match(/^pit\s+(\d+)$/);
      if (m) {
        const n = clamp(parseInt(m[1], 10), 0, 200);
        if (n > AppState.data.character.pitHighest) {
          AppState.data.character.pitHighest = n;
        }
        return { ok: true, message: 'Pit T' + n + ' cleared' };
      }

      // respec [15|30|34|40]
      m = lower.match(/^respec\s+(15|30|34|40)$/);
      if (m) {
        const key = 'lv' + m[1];
        AppState.data.skills.respec[key] = true;
        return { ok: true, message: 'Respec ' + m[1] + ' marked done' };
      }

      // shard [name]
      m = lower.match(/^shard\s+(mastermind|legion|vanguard|ritualist)$/);
      if (m) {
        const name = m[1].charAt(0).toUpperCase() + m[1].slice(1);
        AppState.data.character.soulShard = name;
        return { ok: true, message: 'Soul Shard: ' + name };
      }

      // fragment [name]
      m = lower.match(/^fragment\s+(.+)$/);
      if (m) {
        AppState.data.character.fragment = m[1].trim();
        return { ok: true, message: 'Fragment: ' + m[1].trim() };
      }

      // imprint [aspect-slug]
      m = lower.match(/^imprint\s+([a-z0-9-]+)$/);
      if (m) {
        const slug = m[1];
        if (!AppState.data.aspects[slug]) AppState.data.aspects[slug] = {};
        AppState.data.aspects[slug].imprinted = true;
        return { ok: true, message: 'Imprinted ' + slug };
      }

      // got [unique-slug]
      m = lower.match(/^got\s+([a-z0-9-]+)$/);
      if (m) {
        const slug = m[1];
        AppState.data.uniques[slug] = { acquired: true, ts: Date.now() };
        return { ok: true, message: 'Acquired ' + slug };
      }

      // boss [name]
      m = lower.match(/^boss\s+([a-z0-9-]+)$/);
      if (m) {
        const slug = m[1];
        if (!AppState.data.bosses[slug]) AppState.data.bosses[slug] = { kills: 0 };
        AppState.data.bosses[slug].kills = (AppState.data.bosses[slug].kills || 0) + 1;
        return { ok: true, message: 'Boss ' + slug + ' kill #' + AppState.data.bosses[slug].kills };
      }

      // step [phase] [step]
      m = lower.match(/^step\s+([a-z0-9-]+)\s+([a-z0-9-]+)$/);
      if (m) {
        const key = m[1] + ':' + m[2];
        AppState.data.walkthrough[key] = !AppState.data.walkthrough[key];
        return { ok: true, message: 'Step ' + key + ' toggled' };
      }

      // wp [name]
      m = lower.match(/^wp\s+([a-z0-9-]+)$/);
      if (m) {
        const slug = m[1];
        AppState.data.warplans[slug] = { done: true, ts: Date.now() };
        return { ok: true, message: 'War Plan ' + slug + ' done' };
      }

      return { ok: false };
    },
  };

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  // ========================================
  // DASHBOARD RENDERER
  // ========================================
  const Dashboard = {
    render() {
      const c = AppState.data.character;

      const levelEl = document.getElementById('heroLevel');
      if (levelEl) levelEl.textContent = c.level;

      const buildEl = document.getElementById('heroBuild');
      if (buildEl) buildEl.textContent = c.build || 'Dread Claws Mastermind';

      const fillEl = document.getElementById('heroLevelFill');
      const labelEl = document.getElementById('heroLevelLabel');
      const pct = Math.min(100, (c.level / 70) * 100);
      if (fillEl) fillEl.style.width = pct.toFixed(1) + '%';
      if (labelEl) labelEl.textContent = c.level + ' / 70';

      const paragonEl = document.getElementById('paragonBig');
      if (paragonEl) paragonEl.textContent = c.paragon;

      const tormentEl = document.getElementById('tormentBig');
      const tormentSubEl = document.getElementById('tormentSub');
      if (tormentEl) tormentEl.textContent = 'T' + c.torment;
      if (tormentSubEl) {
        tormentSubEl.textContent = c.torment === 0 ? 'Pre-endgame'
          : c.torment >= 8 ? 'Pushing high tiers'
          : 'Endgame progression';
      }

      const pitEl = document.getElementById('pitBig');
      if (pitEl) pitEl.textContent = c.pitHighest;

      this.renderPhase();
    },

    renderPhase() {
      const c = AppState.data.character;
      const phase = this.getPhase(c.level);
      const pivot = this.getNextPivot(c.level);

      const nameEl = document.getElementById('phaseName');
      const descEl = document.getElementById('phaseDesc');
      if (nameEl) nameEl.textContent = phase.name;
      if (descEl) descEl.textContent = phase.desc;

      const pivotNameEl = document.getElementById('pivotName');
      const pivotDescEl = document.getElementById('pivotDesc');
      if (pivotNameEl) pivotNameEl.textContent = pivot.name;
      if (pivotDescEl) pivotDescEl.textContent = pivot.desc;

      this.renderPriority(c.level);
    },

    getPhase(level) {
      if (level < 3) return { name: 'Pre-tutorial', desc: 'Pick a starter zone and reach level 3 to unlock Dread Claws.' };
      if (level < 8) return { name: 'Phase 1: Foundation', desc: 'Dread Claws is your spam. Nether Step for mobility. Spec into base skills.' };
      if (level < 15) return { name: 'Phase 2: Rampage Online', desc: 'Drop your Greater Demon (Rampage) into packs. Position him for double Encircling Terror hits when it unlocks.' };
      if (level < 20) return { name: 'Phase 3: Mastermind Locked In', desc: 'Mastermind Shard active, Laalish summoned, Dread Claws is now a circular AoE around you and your demon.' };
      if (level < 30) return { name: 'Phase 4: Abyssal Titan', desc: 'Rampage gets the Abyssal Titan variant. Recast to reposition him without spending Dominance.' };
      if (level < 34) return { name: 'Phase 5: Fragment Pivot', desc: 'Pick Blasphemous Fragment. Rampage now applies Hex, amplifying all Abyss damage.' };
      if (level < 40) return { name: 'Phase 6: Resource Engine', desc: 'Respec at 34. Drop Hellion Sting and Sigil. Pick up Command Fallen Fallen Rush and Dark Prison Chain Aura.' };
      if (level < 60) return { name: 'Phase 7: Metamorphosis', desc: 'Respec at 40. Drop Dark Prison. Pick up Metamorphosis Terror Demon. Endgame scaling begins.' };
      if (level < 70) return { name: 'Phase 8: Endgame Approach', desc: 'Push to 70 through Helltides, Strongholds, and War Plans activities. Refresh gear at every tier.' };
      return { name: 'Phase 9: Endgame', desc: 'Paragon unlocked. Clear Pit Tier 10 to enter Torment 1. Hunt uniques. Optimize the build.' };
    },

    getNextPivot(level) {
      if (level < 3) return { name: 'Level 3', desc: 'Unlock Dread Claws and start spamming. This is your core skill from now until 70.' };
      if (level < 4) return { name: 'Level 4', desc: 'Unlock Nether Step. Mobility and Shadowform generation. Use on cooldown.' };
      if (level < 8) return { name: 'Level 8', desc: 'Unlock Rampage (Greater Demon). Summon him into packs for double-trigger Encircling Terror.' };
      if (level < 15) return { name: 'Level 15', desc: 'Complete Warlock class quest. Take Mastermind Shard. Take Enveloping Terror on Dread Claws.' };
      if (level < 20) return { name: 'Level 20', desc: 'Take Abyssal Titan variant on Rampage. Recast to reposition without spending Dominance.' };
      if (level < 30) return { name: 'Level 30', desc: 'Fragments unlock. Take Blasphemous Fragment for Hex application via Rampage.' };
      if (level < 34) return { name: 'Level 34 Respec', desc: 'Drop Hellion Sting and Sigil. Add Command Fallen Fallen Rush and Dark Prison Chain Aura.' };
      if (level < 40) return { name: 'Level 40 Respec', desc: 'Drop Dark Prison. Add Metamorphosis Terror Demon. Endgame scaling begins here.' };
      if (level < 70) return { name: 'Level 70', desc: 'Paragon unlocks. Refresh tempers and imprints. Push Pit Tier 10 for Torment 1.' };
      if (AppState.data.character.torment < 1) return { name: 'Pit Tier 10', desc: 'Clear Pit T10 to enter Torment 1. Endgame difficulty unlocks.' };
      if (AppState.data.character.paragon < 200) return { name: 'Paragon 200', desc: 'Board rush all legendary nodes first. Respec to optimal rotation after 200.' };
      return { name: 'Torment Push', desc: 'Optimize gear, level Glyphs to 46, hunt mythics. Push higher Torment tiers.' };
    },

    renderPriority(level) {
      const listEl = document.getElementById('priorityList');
      if (!listEl) return;
      const items = this.getPriorities(level);
      listEl.innerHTML = items.map((t) => '<li class="priority-item">' + escapeHtml(t) + '</li>').join('');
    },

    getPriorities(level) {
      if (level < 15) {
        return [
          'Reach level 15 to unlock Soul Shards',
          'Complete the Warlock class quest the moment it appears in your log',
          'Start salvaging gear to research Aspect of Deeper Shadows',
          'Spam Dread Claws, weave a basic attack when Wrath is low',
        ];
      }
      if (level < 30) {
        return [
          'Take Mastermind Shard if you have not already',
          'Push to level 30 for Fragment unlock',
          'Imprint Aspect of Deeper Shadows on your amulet ASAP',
          'Save salvaged gear for Demonic Aspect',
        ];
      }
      if (level < 34) {
        return [
          'Take Blasphemous Fragment to enable Hex via Rampage',
          'Prep for level 34 respec (drop Hellion Sting and Sigil)',
          'Keep Subo hired, Aldkin as reinforcement',
        ];
      }
      if (level < 40) {
        return [
          'Execute the level 34 respec when you ding',
          'Push to level 40 for Metamorphosis Terror Demon pivot',
          'Continue farming Deeper Shadows aspect upgrades',
        ];
      }
      if (level < 70) {
        return [
          'Run Helltides for Forgotten Souls and gear',
          'Clear Strongholds (huge XP, do them around level 60)',
          'Stay on Normal difficulty for fastest leveling',
          'Refresh weapon every time base damage increases',
        ];
      }
      if (AppState.data.character.torment < 1) {
        return [
          'Push Pit Tier 10 to unlock Torment 1',
          'Level all Glyphs to 15 first for radius bonus',
          'Begin hunting Night Terror amulet',
        ];
      }
      return [
        'Level all Glyphs to 46 for secondary damage multipliers',
        'Hunt Mythic Uniques via Undercity tributes and Lair Bosses',
        'Optimize Paragon board rotation for current tier',
        'Push Pit T' + (AppState.data.character.pitHighest + 1) + ' next',
      ];
    },
  };

  // ========================================
  // NAV BADGE UPDATER
  // ========================================
  const Nav = {
    updateBadges() {
      const walkthroughBadge = document.getElementById('navBadgeWalkthrough');
      if (walkthroughBadge) {
        const total = Object.keys(AppState.data.walkthrough).length || 1;
        const done = Object.values(AppState.data.walkthrough).filter(Boolean).length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        walkthroughBadge.textContent = pct + '%';
      }

      const aspectsBadge = document.getElementById('navBadgeAspects');
      if (aspectsBadge) {
        const aspects = AppState.data.aspects;
        const done = Object.values(aspects).filter((a) => a && a.imprinted).length;
        const totalAspects = (window.D4_DATA && window.D4_DATA.aspects && window.D4_DATA.aspects.length) || done;
        aspectsBadge.textContent = done + '/' + totalAspects;
      }

      const uniquesBadge = document.getElementById('navBadgeUniques');
      if (uniquesBadge) {
        const uniques = AppState.data.uniques;
        const done = Object.values(uniques).filter((u) => u && u.acquired).length;
        const totalUniques = (window.D4_ITEMS && window.D4_ITEMS.uniques && window.D4_ITEMS.uniques.length) || done;
        uniquesBadge.textContent = done + '/' + totalUniques;
      }
    },
  };

  // ========================================
  // EXPORT / IMPORT BUTTONS
  // ========================================
  function initIO() {
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const resetBtn = document.getElementById('resetBtn');
    const importFile = document.getElementById('importFile');

    if (exportBtn) {
      exportBtn.addEventListener('click', () => AppState.exportSave());
    }

    if (importBtn && importFile) {
      importBtn.addEventListener('click', () => importFile.click());
      importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const ok = AppState.importSave(ev.target.result);
          if (ok) {
            Theme.apply(AppState.data.settings.theme || 'dark');
            Dashboard.render();
            Nav.updateBadges();
            Toast.show('Save imported', 'success');
          } else {
            Toast.show('Invalid save file', 'error');
          }
          importFile.value = '';
        };
        reader.readAsText(file);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        Modal.confirm(
          'This wipes all progress. Levels, aspects, uniques, walkthrough, paragon, everything. Cannot be undone unless you have exported a save.',
          () => {
            AppState.reset();
            Theme.apply('dark');
            Dashboard.render();
            Nav.updateBadges();
            Toast.show('Reset complete', 'success');
          },
          'Reset Everything?'
        );
      });
    }
  }

  // ========================================
  // INIT
  // ========================================
  function init() {
    AppState.load();
    Toast.init();
    Modal.init();
    Theme.init();
    Sidebar.init();
    QuickUpdate.init();
    Router.init();
    initIO();
    Dashboard.render();
    Nav.updateBadges();

    // Welcome toast on first visit
    if (!AppState.data.settings.welcomed) {
      setTimeout(() => {
        Toast.show('Press / anywhere to quick update', 'info', 4500);
        AppState.data.settings.welcomed = true;
        AppState.save('settings');
      }, 600);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging
  window.D4 = { AppState, Router, QuickUpdate, Dashboard, Toast, Modal, Nav };

})();
