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
      if (this.current === 'walkthrough') Walkthrough.render();
      if (this.current === 'skills') Skills.render();
      if (this.current === 'shards') Shards.render();
      if (this.current === 'aspects') Aspects.render();
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
      if (fab) fab.addEventListener('click', () => this.open());
      if (fabBottom) fabBottom.addEventListener('click', () => this.open());

      document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !this.isInputFocused()) {
          e.preventDefault();
          this.open();
        }
      });

      this.bindForm();
    },

    isInputFocused() {
      const a = document.activeElement;
      if (!a) return false;
      const tag = a.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    },

    open() {
      this.prefill();
      Modal.open('modalQuick');
      setTimeout(() => {
        const first = document.getElementById('qf-level');
        if (first) first.focus();
      }, 60);
    },

    prefill() {
      const c = AppState.data.character;
      const skills = AppState.data.skills || { respec: {} };
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };

      set('qf-level', c.level || 1);
      set('qf-paragon', c.paragon || 0);
      set('qf-torment', c.torment || 0);
      set('qf-pit', c.pitHighest || 0);

      const shardId = (c.soulShard || '').toLowerCase();
      set('qf-shard', shardId);
      this.refreshFragmentOptions(shardId, (c.fragment || '').toLowerCase());

      const respec = skills.respec || {};
      document.querySelectorAll('.qf-respec-btn').forEach((btn) => {
        const n = btn.getAttribute('data-respec');
        if (respec['lv' + n]) btn.classList.add('is-on');
        else btn.classList.remove('is-on');
      });
    },

    refreshFragmentOptions(shardId, selectedFragId) {
      const sel = document.getElementById('qf-fragment');
      if (!sel) return;
      const all = (window.D4_DATA && window.D4_DATA.fragments) || {};
      const frags = all[shardId] || [];
      if (!shardId || !frags.length) {
        sel.innerHTML = '<option value="">Pick a shard first</option>';
        sel.disabled = true;
        return;
      }
      sel.disabled = false;
      let html = '<option value="">None</option>';
      for (const f of frags) {
        const sel2 = f.id === selectedFragId ? ' selected' : '';
        const tag = f.buildRecommended ? ' (Build pick)' : '';
        html += '<option value="' + f.id + '"' + sel2 + '>' + escapeHtml(f.name) + tag + '</option>';
      }
      sel.innerHTML = html;
    },

    bindForm() {
      let holdTimer = null;
      let holdInterval = null;
      const stopHold = () => {
        if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
        if (holdInterval) { clearInterval(holdInterval); holdInterval = null; }
      };

      document.querySelectorAll('.qf-step').forEach((btn) => {
        const fire = () => {
          const step = parseInt(btn.getAttribute('data-step'), 10);
          const targetId = btn.getAttribute('data-target');
          const input = document.getElementById(targetId);
          if (!input) return;
          const min = parseInt(input.min, 10);
          const max = parseInt(input.max, 10);
          const cur = parseInt(input.value, 10) || 0;
          input.value = clamp(cur + step, min, max);
        };
        const start = (e) => {
          e.preventDefault();
          fire();
          stopHold();
          holdTimer = setTimeout(() => {
            holdInterval = setInterval(fire, 80);
          }, 500);
        };
        btn.addEventListener('mousedown', start);
        btn.addEventListener('touchstart', start, { passive: false });
        btn.addEventListener('mouseup', stopHold);
        btn.addEventListener('mouseleave', stopHold);
        btn.addEventListener('touchend', stopHold);
        btn.addEventListener('touchcancel', stopHold);
      });

      const shardSel = document.getElementById('qf-shard');
      if (shardSel) {
        shardSel.addEventListener('change', () => this.refreshFragmentOptions(shardSel.value, ''));
      }

      document.querySelectorAll('.qf-respec-btn').forEach((btn) => {
        btn.addEventListener('click', () => btn.classList.toggle('is-on'));
      });

      const apply = document.getElementById('qfApply');
      const cancel = document.getElementById('qfCancel');
      if (apply) apply.addEventListener('click', () => this.applyForm());
      if (cancel) cancel.addEventListener('click', () => Modal.close('modalQuick'));

      const form = document.getElementById('quickForm');
      if (form) {
        form.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.applyForm();
          }
        });
        form.addEventListener('submit', (e) => e.preventDefault());
      }
    },

    applyForm() {
      const c = AppState.data.character;
      const skills = AppState.data.skills;
      const get = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
      const getNum = (id, min, max, fallback) => {
        const v = parseInt(get(id), 10);
        if (isNaN(v)) return fallback;
        return clamp(v, min, max);
      };

      const newLevel = getNum('qf-level', 1, 70, c.level);
      const newParagon = getNum('qf-paragon', 0, 300, c.paragon);
      const newTorment = getNum('qf-torment', 0, 12, c.torment);
      const newPit = getNum('qf-pit', 0, 200, c.pitHighest);
      const newShardId = get('qf-shard');
      const newShard = newShardId ? (newShardId.charAt(0).toUpperCase() + newShardId.slice(1)) : null;
      const newFragment = get('qf-fragment') || null;

      const changes = [];
      if (newLevel !== c.level) { c.level = newLevel; changes.push('Level ' + newLevel); }
      if (newParagon !== c.paragon) { c.paragon = newParagon; changes.push('Paragon ' + newParagon); }
      if (newTorment !== c.torment) { c.torment = newTorment; changes.push('Torment T' + newTorment); }
      if (newPit > c.pitHighest) { c.pitHighest = newPit; changes.push('Pit T' + newPit); }
      if (newShard !== c.soulShard) { c.soulShard = newShard; changes.push('Shard ' + (newShard || 'none')); }
      if (newFragment !== c.fragment) { c.fragment = newFragment; changes.push('Fragment ' + (newFragment || 'none')); }

      document.querySelectorAll('.qf-respec-btn').forEach((btn) => {
        const n = btn.getAttribute('data-respec');
        const key = 'lv' + n;
        const on = btn.classList.contains('is-on');
        if (!!skills.respec[key] !== on) {
          skills.respec[key] = on;
          changes.push('Respec ' + n + (on ? ' done' : ' undone'));
        }
      });

      if (changes.length === 0) {
        Toast.show('No changes', 'info', 1800);
        Modal.close('modalQuick');
        return;
      }

      AppState.save();
      Dashboard.render();
      Walkthrough.render();
      Skills.render();
      Shards.render();
      Aspects.render();
      Nav.updateBadges();

      Toast.show(changes.length + ' update' + (changes.length === 1 ? '' : 's') + ' applied', 'success');
      Modal.close('modalQuick');
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
      if (level < 15) return { name: 'Phase 2: Rampage Online', desc: 'Drop Rampage into packs. Position him for double trigger overlap with Dread Claws.' };
      if (level < 20) return { name: 'Phase 3: Mastermind Locked In', desc: 'Mastermind Shard active, Laalish summoned, Dread Claws: Enveloping Terror is now a circular AoE around you and your demon.' };
      if (level < 30) return { name: 'Phase 4: Abyssal Titan', desc: 'Take Rampage: Abyssal Titan. Recast to reposition him without spending Dominance.' };
      if (level < 34) return { name: 'Phase 5: Fragment Pivot', desc: 'Pick Blasphemous Fragment. Rampage now applies Hex, amplifying all Abyss damage.' };
      if (level < 40) return { name: 'Phase 6: Resource Engine', desc: 'Respec at 34. Drop Hellion Sting and Sigil of Subversion. Install Command Fallen: Fallen Rush and Dark Prison: Chain Aura.' };
      if (level < 60) return { name: 'Phase 7: Metamorphosis', desc: 'Respec at 40. Drop Dark Prison. Install Metamorphosis: Terror Demon. Endgame scaling begins.' };
      if (level < 70) return { name: 'Phase 8: Endgame Approach', desc: 'Push to 70 through Helltides, Strongholds, and War Plans. Refresh gear at every tier.' };
      return { name: 'Phase 9: Endgame', desc: 'Paragon unlocked. Clear Pit Tier 10 to enter Torment 1. Hunt uniques. Optimize the build.' };
    },

    getNextPivot(level) {
      if (level < 3) return { name: 'Level 3', desc: 'Unlock Dread Claws and start spamming. This is your core skill from now until 70.' };
      if (level < 4) return { name: 'Level 4', desc: 'Unlock Nether Step. Mobility and Shadowform generation. Use on cooldown.' };
      if (level < 8) return { name: 'Level 8', desc: 'Unlock Rampage (Greater Demon). Summon him into packs for double trigger overlap.' };
      if (level < 15) return { name: 'Level 15', desc: 'Complete Warlock class quest. Take Mastermind Shard. Take Dread Claws: Enveloping Terror.' };
      if (level < 20) return { name: 'Level 20', desc: 'Take Rampage: Abyssal Titan. Recast to reposition without spending Dominance.' };
      if (level < 30) return { name: 'Level 30', desc: 'Fragments unlock. Take Blasphemous Fragment for Hex application via Rampage.' };
      if (level < 34) return { name: 'Level 34 Respec', desc: 'Drop Hellion Sting and Sigil of Subversion. Add Command Fallen: Fallen Rush and Dark Prison: Chain Aura. Take Nether Step: Shadow Recall.' };
      if (level < 40) return { name: 'Level 40 Respec', desc: 'Drop Dark Prison. Add Metamorphosis: Terror Demon. Endgame scaling begins here.' };
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
      const phases = (window.D4_DATA && window.D4_DATA.walkthrough) || [];
      const phase = phases.find((p) => level >= p.levelMin && level <= p.levelMax);
      if (phase) {
        const wt = AppState.data.walkthrough;
        const unchecked = phase.steps.filter((s) => !wt[phase.id + ':' + s.id]);
        if (unchecked.length > 0) {
          const ranked = unchecked.slice().sort((a, b) => {
            const w = { high: 0, med: 1, low: 2 };
            return (w[a.priority] || 9) - (w[b.priority] || 9);
          });
          return ranked.slice(0, 3).map((s) => s.text);
        }
        return ['Phase ' + phase.name + ' complete. Push to Level ' + (phase.levelMax + 1) + '.'];
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
  // WALKTHROUGH RENDERER
  // ========================================
  const Walkthrough = {
    bound: false,

    render() {
      const root = document.getElementById('walkthroughRoot');
      if (!root) return;
      const phases = (window.D4_DATA && window.D4_DATA.walkthrough) || [];
      if (!phases.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No walkthrough data loaded</div><div class="placeholder-text">data.js may have failed to load. Check the console.</div></div>';
        return;
      }

      const c = AppState.data.character;
      const wt = AppState.data.walkthrough;
      const respec = AppState.data.skills.respec || {};
      const currentPhaseId = this.getCurrentPhaseId(c.level, phases);

      const totalSteps = phases.reduce((n, p) => n + p.steps.length, 0);
      const doneSteps = phases.reduce((n, p) => {
        return n + p.steps.filter((s) => wt[p.id + ':' + s.id]).length;
      }, 0);
      const globalPct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

      let html = '';
      html += '<div class="wt-summary">';
      html += '  <div class="wt-summary-row">';
      html += '    <div class="wt-summary-label">Overall</div>';
      html += '    <div class="wt-summary-pct">' + globalPct + '%</div>';
      html += '  </div>';
      html += '  <div class="wt-summary-bar"><div class="wt-summary-fill" style="width:' + globalPct + '%"></div></div>';
      html += '  <div class="wt-summary-meta">' + doneSteps + ' of ' + totalSteps + ' steps complete, character Level ' + c.level + '</div>';
      html += '</div>';

      for (const p of phases) {
        const isCurrent = p.id === currentPhaseId;
        const isPast = c.level > p.levelMax;
        const phaseDone = p.steps.filter((s) => wt[p.id + ':' + s.id]).length;
        const phasePct = p.steps.length > 0 ? Math.round((phaseDone / p.steps.length) * 100) : 0;
        const stateClass = isCurrent ? 'is-current' : isPast ? 'is-past' : 'is-future';

        html += '<section class="wt-phase ' + stateClass + '" data-phase="' + p.id + '">';
        html += '  <header class="wt-phase-head">';
        html += '    <div class="wt-phase-meta">';
        html += '      <span class="wt-phase-range">Lv ' + p.levelMin + (p.levelMax >= 999 ? '+' : ' to ' + p.levelMax) + '</span>';
        if (isCurrent) html += '<span class="wt-here-chip">You are here</span>';
        html += '      <span class="wt-conf wt-conf-' + (p.confidence || 'MEDIUM').toLowerCase() + '">' + (p.confidence || 'MEDIUM') + '</span>';
        html += '    </div>';
        html += '    <h2 class="wt-phase-title">' + escapeHtml(p.name) + '</h2>';
        html += '    <p class="wt-phase-summary">' + escapeHtml(p.summary) + '</p>';
        html += '    <div class="wt-phase-bar"><div class="wt-phase-fill" style="width:' + phasePct + '%"></div></div>';
        html += '    <div class="wt-phase-progress">' + phaseDone + ' / ' + p.steps.length + ' steps</div>';
        html += '  </header>';

        if (p.respec && p.respec.trigger) {
          const key = 'lv' + p.respec.level;
          const done = !!respec[key];
          html += '  <div class="wt-respec ' + (done ? 'is-done' : '') + '">';
          html += '    <div class="wt-respec-text"><i class="fa-solid fa-rotate"></i> ' + escapeHtml(p.respec.label) + '</div>';
          if (done) {
            html += '    <span class="wt-respec-done"><i class="fa-solid fa-check"></i> Acknowledged</span>';
          } else {
            html += '    <button class="btn btn-danger wt-respec-btn" data-respec="' + p.respec.level + '">I respecced</button>';
          }
          html += '  </div>';
        }

        html += '  <ul class="wt-steps">';
        for (const s of p.steps) {
          const key = p.id + ':' + s.id;
          const checked = !!wt[key];
          html += '    <li class="wt-step ' + (checked ? 'is-checked' : '') + ' wt-step-' + (s.priority || 'med') + '">';
          html += '      <label class="wt-step-label">';
          html += '        <input type="checkbox" class="wt-step-cb" data-step="' + key + '"' + (checked ? ' checked' : '') + ' />';
          html += '        <span class="wt-step-text">' + escapeHtml(s.text) + '</span>';
          html += '      </label>';
          html += '    </li>';
        }
        html += '  </ul>';

        if (p.sources && p.sources.length) {
          html += '  <div class="wt-sources">Sources: ' + p.sources.map((s) => '<span class="wt-source">' + escapeHtml(s) + '</span>').join('') + '</div>';
        }
        html += '</section>';
      }

      root.innerHTML = html;
      this.bind(root);
    },

    getCurrentPhaseId(level, phases) {
      for (const p of phases) {
        if (level >= p.levelMin && level <= p.levelMax) return p.id;
      }
      return phases.length ? phases[phases.length - 1].id : null;
    },

    bind(root) {
      if (this.bound) return;
      this.bound = true;

      const main = document.getElementById('main');
      if (!main) return;

      main.addEventListener('change', (e) => {
        const t = e.target;
        if (t && t.classList && t.classList.contains('wt-step-cb')) {
          const key = t.getAttribute('data-step');
          if (key) {
            AppState.data.walkthrough[key] = t.checked;
            AppState.save('walkthrough');
            Walkthrough.render();
            Dashboard.render();
            Nav.updateBadges();
          }
        }
      });

      main.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('[data-respec]');
        if (btn) {
          const n = btn.getAttribute('data-respec');
          const key = 'lv' + n;
          AppState.data.skills.respec[key] = true;
          AppState.save('skills');
          Toast.show('Respec ' + n + ' acknowledged', 'success');
          Walkthrough.render();
        }
      });
    },
  };

  // ========================================
  // SKILLS RENDERER
  // ========================================
  const Skills = {
    bound: false,

    render() {
      const root = document.getElementById('skillsRoot');
      if (!root) return;
      const data = window.D4_DATA || {};
      const skills = data.skills || [];
      const clusters = data.clusters || [];
      const bar = data.endgameBar || [];
      if (!skills.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No skill data</div></div>';
        return;
      }

      let html = '';

      html += '<div class="bar-card">';
      html += '  <div class="bar-header"><i class="fa-solid fa-star"></i><h2 class="bar-title">Endgame Skill Bar</h2><span class="card-tag">Maxroll endgame</span></div>';
      html += '  <ol class="bar-slots">';
      for (const b of bar) {
        const s = skills.find((x) => x.id === b.skillId) || { name: b.skillId };
        const up = b.upgrade ? ': ' + b.upgrade : '';
        html += '    <li class="bar-slot"><span class="bar-slot-n">' + b.slot + '</span><div class="bar-slot-text"><div class="bar-slot-skill">' + escapeHtml(s.name + up) + '</div><div class="bar-slot-role">' + escapeHtml(b.role) + '</div></div></li>';
      }
      html += '  </ol>';
      html += '</div>';

      for (const cl of clusters) {
        const inCluster = skills.filter((s) => s.cluster === cl.id);
        if (!inCluster.length) continue;
        html += '<section class="cluster">';
        html += '  <header class="cluster-head"><h2 class="cluster-name">' + escapeHtml(cl.name) + '</h2><span class="cluster-desc">' + escapeHtml(cl.desc) + '</span></header>';
        html += '  <div class="cluster-grid">';
        for (const sk of inCluster) {
          const rel = sk.relevance || 'unused';
          html += '<article class="skill skill-' + rel + '">';
          html += '  <header class="skill-head">';
          html += '    <h3 class="skill-name">' + escapeHtml(sk.name) + '</h3>';
          html += '    <span class="skill-rel skill-rel-' + rel + '">' + this.relLabel(rel) + '</span>';
          html += '  </header>';
          if (sk.role) html += '<p class="skill-role">' + escapeHtml(sk.role) + '</p>';
          html += '  <ul class="skill-upgrades">';
          for (const u of (sk.upgrades || [])) {
            const isRec = (sk.recommended || []).includes(u);
            html += '<li class="skill-up' + (isRec ? ' is-rec' : '') + '">' + escapeHtml(u) + (isRec ? '<i class="fa-solid fa-check"></i>' : '') + '</li>';
          }
          html += '  </ul>';
          html += '</article>';
        }
        html += '  </div>';
        html += '</section>';
      }

      root.innerHTML = html;
    },

    relLabel(rel) {
      return ({ core: 'Core', situational: 'Situational', leveling: 'Leveling Only', 'leveling-bridge': 'Leveling Bridge', unused: 'Unused' })[rel] || rel;
    },
  };

  // ========================================
  // SOUL SHARDS RENDERER
  // ========================================
  const Shards = {
    render() {
      const root = document.getElementById('shardsRoot');
      if (!root) return;
      const data = window.D4_DATA || {};
      const shards = data.soulShards || [];
      const fragments = data.fragments || {};
      if (!shards.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No shard data</div></div>';
        return;
      }

      const c = AppState.data.character;
      const selectedShard = (c.soulShard || '').toLowerCase();
      const selectedFragment = (c.fragment || '').toLowerCase();

      let html = '<div class="shard-grid">';
      for (const sh of shards) {
        const isSelected = selectedShard === sh.id;
        html += '<article class="shard ' + (isSelected ? 'is-selected' : '') + (sh.buildRecommended ? ' is-recommended' : '') + '">';
        html += '  <header class="shard-head">';
        html += '    <h2 class="shard-name">' + escapeHtml(sh.name) + '</h2>';
        if (sh.buildRecommended) html += '<span class="shard-rec"><i class="fa-solid fa-star"></i> Build pick</span>';
        html += '  </header>';
        html += '  <p class="shard-mech">' + escapeHtml(sh.mechanic) + '</p>';
        html += '  <div class="shard-meta">' + escapeHtml(sh.whenUnlocks) + '</div>';

        const frags = fragments[sh.id] || [];
        if (frags.length) {
          html += '  <div class="frag-list">';
          html += '    <div class="frag-title">Fragments</div>';
          for (const f of frags) {
            const fragSelected = selectedFragment === f.id;
            html += '<div class="frag ' + (fragSelected ? 'is-selected' : '') + (f.buildRecommended ? ' is-recommended' : '') + '" data-shard="' + sh.id + '" data-frag="' + f.id + '">';
            html += '  <div class="frag-name">' + escapeHtml(f.name) + (f.buildRecommended ? '<i class="fa-solid fa-star"></i>' : '') + '</div>';
            html += '  <div class="frag-effect">' + escapeHtml(f.effect) + '</div>';
            html += '</div>';
          }
          html += '  </div>';
        }

        html += '  <div class="shard-actions">';
        html += '    <button class="btn btn-ghost shard-pick" data-shard-pick="' + sh.id + '">' + (isSelected ? 'Selected' : 'Select shard') + '</button>';
        html += '  </div>';
        html += '</article>';
      }
      html += '</div>';

      root.innerHTML = html;
      this.bind(root);
    },

    bound: false,
    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('click', (e) => {
        const sBtn = e.target.closest && e.target.closest('[data-shard-pick]');
        if (sBtn) {
          const id = sBtn.getAttribute('data-shard-pick');
          AppState.data.character.soulShard = id.charAt(0).toUpperCase() + id.slice(1);
          AppState.save('character');
          Toast.show('Soul Shard: ' + AppState.data.character.soulShard, 'success');
          Shards.render();
          Dashboard.render();
          return;
        }
        const fNode = e.target.closest && e.target.closest('[data-frag]');
        if (fNode) {
          const fragId = fNode.getAttribute('data-frag');
          AppState.data.character.fragment = fragId;
          AppState.save('character');
          Toast.show('Fragment: ' + fragId, 'success');
          Shards.render();
        }
      });
    },
  };

  // ========================================
  // ASPECTS RENDERER
  // ========================================
  const Aspects = {
    render() {
      const root = document.getElementById('aspectsRoot');
      if (!root) return;
      const aspects = (window.D4_DATA && window.D4_DATA.aspects) || [];
      if (!aspects.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No aspect data</div></div>';
        return;
      }
      const imp = AppState.data.aspects || {};

      const families = ['offensive', 'defensive', 'utility'];
      const familyLabel = { offensive: 'Offensive', defensive: 'Defensive', utility: 'Utility', mobility: 'Mobility' };

      const total = aspects.length;
      const done = aspects.filter((a) => imp[a.id] && imp[a.id].imprinted).length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;

      let html = '';
      html += '<div class="aspects-summary">';
      html += '  <div class="aspects-summary-row"><div class="aspects-summary-label">Imprinted</div><div class="aspects-summary-pct">' + done + ' / ' + total + '</div></div>';
      html += '  <div class="aspects-summary-bar"><div class="aspects-summary-fill" style="width:' + pct + '%"></div></div>';
      html += '</div>';

      for (const fam of families) {
        const inFam = aspects.filter((a) => a.slotFamily === fam);
        if (!inFam.length) continue;
        html += '<section class="aspect-group">';
        html += '  <h2 class="aspect-group-name">' + (familyLabel[fam] || fam) + '</h2>';
        html += '  <div class="aspect-list">';
        for (const a of inFam) {
          const isImp = !!(imp[a.id] && imp[a.id].imprinted);
          const slotsStr = (a.slots || []).join(', ');
          html += '<article class="aspect ' + (isImp ? 'is-imprinted' : '') + ' aspect-priority-' + (a.priority || 'situational') + '">';
          html += '  <header class="aspect-head">';
          html += '    <label class="aspect-check"><input type="checkbox" class="aspect-cb" data-aspect="' + a.id + '"' + (isImp ? ' checked' : '') + ' /><span></span></label>';
          html += '    <div class="aspect-title-block">';
          html += '      <h3 class="aspect-name">' + escapeHtml(a.name) + '</h3>';
          html += '      <div class="aspect-meta">';
          html += '        <span class="aspect-slots">' + escapeHtml(slotsStr) + '</span>';
          html += '        <span class="aspect-priority aspect-priority-tag-' + (a.priority || 'situational') + '">' + (a.priority || 'situational') + '</span>';
          html += '        <span class="wt-conf wt-conf-' + (a.confidence || 'MEDIUM').toLowerCase() + '">' + (a.confidence || 'MEDIUM') + '</span>';
          html += '      </div>';
          html += '    </div>';
          html += '  </header>';
          html += '  <p class="aspect-effect">' + escapeHtml(a.effect) + '</p>';
          html += '  <div class="aspect-source"><span class="aspect-source-label">Source:</span> ' + escapeHtml(a.farm || a.source || '') + '</div>';
          html += '</article>';
        }
        html += '  </div>';
        html += '</section>';
      }

      root.innerHTML = html;
      this.bind();
    },

    bound: false,
    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('change', (e) => {
        const t = e.target;
        if (t && t.classList && t.classList.contains('aspect-cb')) {
          const id = t.getAttribute('data-aspect');
          if (!AppState.data.aspects[id]) AppState.data.aspects[id] = {};
          AppState.data.aspects[id].imprinted = t.checked;
          AppState.save('aspects');
          Aspects.render();
          Nav.updateBadges();
        }
      });
    },
  };

  // ========================================
  // NAV BADGE UPDATER
  // ========================================
  const Nav = {
    updateBadges() {
      const walkthroughBadge = document.getElementById('navBadgeWalkthrough');
      if (walkthroughBadge) {
        const phases = (window.D4_DATA && window.D4_DATA.walkthrough) || [];
        const total = phases.reduce((n, p) => n + p.steps.length, 0);
        const wt = AppState.data.walkthrough;
        let done = 0;
        for (const p of phases) {
          for (const s of p.steps) {
            if (wt[p.id + ':' + s.id]) done++;
          }
        }
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
            Walkthrough.render();
            Skills.render();
            Shards.render();
            Aspects.render();
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
            Walkthrough.render();
            Skills.render();
            Shards.render();
            Aspects.render();
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
    Walkthrough.render();
    Skills.render();
    Shards.render();
    Aspects.render();
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
  window.D4 = { AppState, Router, QuickUpdate, Dashboard, Walkthrough, Skills, Shards, Aspects, Toast, Modal, Nav };

})();
