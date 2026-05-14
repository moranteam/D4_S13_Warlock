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
    talismans: 'd4_warlock_talismans_v1',
    mercs: 'd4_warlock_mercs_v1',
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
    talismans: {
      ownedSets: {},
      ownedUniqueCharms: {},
    },
    mercs: {
      hired: null,
      reinforcement: null,
    },
    settings: {},
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
      'dashboard',
      'leveling-path',
      'skills-reference',
      'endgame-build',
      'gear-targets',
      'gear-comparison',
      'slot-reference',
      'about',
    ],
    titles: {
      'dashboard': 'Dashboard',
      'leveling-path': 'Leveling Path',
      'skills-reference': 'Skills Reference',
      'endgame-build': 'Endgame Build',
      'gear-targets': 'Gear Targets',
      'gear-comparison': 'Gear Comparison',
      'slot-reference': 'Slot Reference',
      'about': 'About',
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

      // Consolidated sections call multiple module renders in sequence.
      // Existing module objects are preserved; the new sections just
      // stack their content vertically.
      if (this.current === 'leveling-path') {
        Walkthrough.render();
        SkillTimeline.render();
        Controller.render();
      }
      if (this.current === 'skills-reference') {
        Skills.render();
      }
      if (this.current === 'endgame-build') {
        Endbuild.render();
        Shards.render();
        Paragon.render();
        WarPlans.render();
        Mercenary.render();
      }
      if (this.current === 'gear-targets') {
        Aspects.render();
        Uniques.render();
        Bosses.render();
      }
      // gear-comparison: Sprint 3 placeholder, no module to render yet.
      if (this.current === 'slot-reference') {
        Talismans.render();
        // runesGemsRoot is a Sprint 5 placeholder.
      }
      if (this.current === 'about') {
        Patch.render();
      }
    },
  };

  // ========================================
  // SIDEBAR (mobile toggle)
  // ========================================
  const Sidebar = {
    LS_KEY: 'd4_warlock_sidebar_open_v1',

    init() {
      const toggle = document.getElementById('sidebarToggle');
      const backdrop = document.getElementById('sidebarBackdrop');
      if (toggle) {
        toggle.addEventListener('click', () => this.toggle());
      }
      if (backdrop) {
        backdrop.addEventListener('click', () => this.close());
      }
      // Mobile (< 1024px): always start collapsed. Hamburger opens the
      // drawer. localStorage does not apply on mobile.
      // Desktop (1024px+): visible by default. If the user previously
      // collapsed via hamburger, restore that state from localStorage.
      if (this.isDesktop()) {
        try {
          if (localStorage.getItem(this.LS_KEY) === '0') {
            this.collapseDesktop();
          }
        } catch (err) { /* localStorage unavailable, default open */ }
      }
    },

    isDesktop() {
      return typeof window.matchMedia === 'function'
        && window.matchMedia('(min-width: 1024px)').matches;
    },

    toggle() {
      if (this.isDesktop()) {
        const el = document.getElementById('sidebar');
        if (el && el.classList.contains('is-collapsed')) {
          this.expandDesktop();
        } else {
          this.collapseDesktop();
        }
        return;
      }
      // Mobile drawer toggle
      const el = document.getElementById('sidebar');
      if (!el) return;
      if (el.classList.contains('is-open')) {
        this.close();
      } else {
        const bd = document.getElementById('sidebarBackdrop');
        el.classList.add('is-open');
        if (bd) bd.classList.add('is-visible');
      }
    },

    collapseDesktop() {
      const el = document.getElementById('sidebar');
      if (el) el.classList.add('is-collapsed');
      document.body.classList.add('sidebar-collapsed');
      this.persist(false);
    },

    expandDesktop() {
      const el = document.getElementById('sidebar');
      if (el) el.classList.remove('is-collapsed');
      document.body.classList.remove('sidebar-collapsed');
      this.persist(true);
    },

    close() {
      // Mobile drawer close (called by Router on navigation and by
      // backdrop click). No-op for desktop: on desktop, the layout
      // sidebar stays visible until the user toggles via hamburger.
      const el = document.getElementById('sidebar');
      const bd = document.getElementById('sidebarBackdrop');
      if (el) el.classList.remove('is-open');
      if (bd) bd.classList.remove('is-visible');
    },

    persist(isOpen) {
      try {
        localStorage.setItem(this.LS_KEY, isOpen ? '1' : '0');
      } catch (err) { /* localStorage unavailable, state is session-only */ }
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
      if (fab) fab.addEventListener('click', () => this.open());

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

    renderAll() {
      Dashboard.render();
      Walkthrough.render();
      SkillTimeline.render();
      Controller.render();
      Skills.render();
      Shards.render();
      Aspects.render();
      Paragon.render();
      Uniques.render();
      Bosses.render();
      Endbuild.render();
      Talismans.render();
      WarPlans.render();
      Mercenary.render();
      Patch.render();
      Nav.updateBadges();
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
      this.renderAll();

      Toast.show(changes.length + ' update' + (changes.length === 1 ? '' : 's') + ' applied', 'success');
      Modal.close('modalQuick');
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
      if (level < 20) return { name: 'Phase 3: Mastermind Locked In', desc: 'Mastermind Shard active, Laalish summoned, Dread Claws: Encircling Terror is now a circular AoE around you and your demon.' };
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
      if (level < 15) return { name: 'Level 15', desc: 'Complete Warlock class quest. Take Mastermind Shard. Take Dread Claws: Encircling Terror.' };
      if (level < 20) return { name: 'Level 20', desc: 'Take Rampage: Abyssal Titan. Recast to reposition without spending Dominance.' };
      if (level < 30) return { name: 'Level 30', desc: 'Fragments unlock. Take Blasphemous Fragment for Hex application via Rampage.' };
      if (level < 34) return { name: 'Level 34 Respec', desc: 'Drop Hellion Sting and Sigil of Subversion. Add Command Fallen: Fallen Rush and Dark Prison: Chain Aura. Take Nether Step: Recall Shadows.' };
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
  // SKILL TIMELINE RENDERER (Sprint 2 Part A)
  // ========================================
  const SkillTimeline = {
    LS_KEY: 'd4_warlock_timeline_expanded_v1',
    bound: false,
    lastCurrentLevel: null,
    expanded: null,

    loadExpanded() {
      try {
        const raw = localStorage.getItem(this.LS_KEY);
        if (!raw) return { levels: {}, respecs: {} };
        const parsed = JSON.parse(raw);
        return {
          levels: parsed.levels && typeof parsed.levels === 'object' ? parsed.levels : {},
          respecs: parsed.respecs && typeof parsed.respecs === 'object' ? parsed.respecs : {},
        };
      } catch (err) {
        return { levels: {}, respecs: {} };
      }
    },

    saveExpanded() {
      try {
        localStorage.setItem(this.LS_KEY, JSON.stringify(this.expanded));
      } catch (err) {
        console.warn('Failed to save timeline expansion state:', err);
      }
    },

    render() {
      const root = document.getElementById('skillTimelineRoot');
      if (!root) return;
      const path = (window.D4_DATA && window.D4_DATA.levelingPath) || null;
      if (!path || !Array.isArray(path.levels) || !path.levels.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No leveling data</div><div class="placeholder-text">window.D4_DATA.levelingPath is empty or missing.</div></div>';
        return;
      }
      if (this.expanded === null) this.expanded = this.loadExpanded();

      const currentLevel = (AppState.data.character && AppState.data.character.level) || 1;
      const respecStates = path.respecStates || {};

      let html = '';
      html += '<div class="skill-timeline-card">';
      html += '  <header class="st-head">';
      html += '    <h2 class="st-title">Skill Timeline</h2>';
      html += '    <p class="st-subtitle">Per-level skill point allocation, Lv 1 to 70. Click any row to expand notes.</p>';
      html += '    <div class="st-legend">';
      html += '      <span class="st-legend-item"><span class="st-dot st-dot-current"></span>Current Lv ' + currentLevel + '</span>';
      html += '      <span class="st-legend-item"><span class="st-dot st-dot-high"></span>High confidence</span>';
      html += '      <span class="st-legend-item"><span class="st-dot st-dot-medium"></span>Medium confidence</span>';
      html += '    </div>';
      html += '  </header>';
      html += '  <ol class="st-list" id="stList">';

      for (const row of path.levels) {
        const lv = row.level;
        const isCurrent = lv === currentLevel;
        const isRespec = !!row.respec;
        const isEndgame = lv === 70;
        const conf = (row.confidence || 'MEDIUM').toLowerCase();
        const lvKey = String(lv);
        const expanded = isRespec ? !!this.expanded.respecs[lvKey] : !!this.expanded.levels[lvKey];

        const classList = [
          'st-row',
          'st-conf-' + conf,
          isCurrent ? 'is-current' : '',
          isRespec ? 'is-respec' : '',
          isEndgame ? 'is-endgame' : '',
          expanded ? 'is-open' : '',
        ].filter(Boolean).join(' ');

        const toggleTok = (isRespec ? 'respec' : 'lv') + lv;
        const confChar = conf === 'high' ? 'H' : conf === 'medium' ? '?' : 'L';
        const confLabel = (row.confidence || 'MEDIUM') + ' confidence';

        html += '<li class="' + classList + '" data-level="' + lv + '"' + (isCurrent ? ' id="stRowCurrent"' : '') + '>';
        if (isRespec) {
          html += '<div class="st-respec-divider" aria-hidden="true"></div>';
        }
        html += '<button class="st-row-toggle" type="button" data-toggle="' + toggleTok + '" aria-expanded="' + (expanded ? 'true' : 'false') + '">';
        html += '  <span class="st-row-num">' + lv + '</span>';
        html += '  <span class="st-row-body">';
        html += '    <span class="st-row-tags">';
        if (isCurrent) html += '<span class="st-tag st-tag-current">CURRENT</span>';
        if (isRespec) html += '<span class="st-tag st-tag-respec">RESPEC</span>';
        if (isEndgame) html += '<span class="st-tag st-tag-endgame">ENDGAME</span>';
        html += '    </span>';
        html += '    <span class="st-row-spent">' + escapeHtml(row.pointSpent) + '</span>';
        html += '    <span class="st-row-cum">' + escapeHtml(row.cumulative) + '</span>';
        html += '  </span>';
        html += '  <span class="st-row-meta">';
        html += '    <span class="st-conf-pill st-conf-pill-' + conf + '" title="' + confLabel + '" aria-label="' + confLabel + '">' + confChar + '</span>';
        html += '    <i class="st-chevron fa-solid fa-chevron-down" aria-hidden="true"></i>';
        html += '  </span>';
        html += '</button>';

        if (expanded) {
          html += '<div class="st-row-detail">';
          html += '  <p class="st-notes">' + escapeHtml(row.notes || '') + '</p>';
          if (isRespec && respecStates[lvKey]) {
            html += this.renderRespecBlock(respecStates[lvKey]);
          }
          if (isEndgame && path.endgameTarget) {
            html += this.renderEndgameBlock(path.endgameTarget);
          }
          html += '</div>';
        }

        html += '</li>';
      }

      html += '  </ol>';
      html += '</div>';

      root.innerHTML = html;
      this.bind();

      if (this.lastCurrentLevel !== currentLevel && Router.current === 'leveling-path') {
        this.lastCurrentLevel = currentLevel;
        const target = root.querySelector('#stRowCurrent');
        if (target) {
          requestAnimationFrame(() => {
            try {
              target.scrollIntoView({ block: 'center', behavior: 'smooth' });
            } catch (err) {
              target.scrollIntoView();
            }
          });
        }
      }
    },

    renderRespecBlock(rd) {
      let html = '<div class="st-respec-block">';
      html += '  <div><span class="st-meta-key">Trigger:</span> ' + escapeHtml(rd.trigger || '') + '</div>';
      html += '  <div><span class="st-meta-key">Total points to allocate:</span> ' + escapeHtml(String(rd.totalPoints || '')) + '</div>';
      if (Array.isArray(rd.skills) && rd.skills.length) {
        html += '  <table class="st-respec-table">';
        html += '    <thead><tr><th>Skill</th><th>Rank</th><th>Upgrades</th></tr></thead>';
        html += '    <tbody>';
        for (const s of rd.skills) {
          html += '<tr><td>' + escapeHtml(s.name) + '</td><td>' + escapeHtml(String(s.rank)) + '</td><td>' + escapeHtml((s.upgrades || []).join(', ')) + '</td></tr>';
        }
        html += '    </tbody>';
        html += '  </table>';
      }
      if (Array.isArray(rd.dropped) && rd.dropped.length) {
        html += '  <div><span class="st-meta-key">Dropped:</span> ' + escapeHtml(rd.dropped.join(', ')) + '</div>';
      }
      if (rd.passives) html += '  <div><span class="st-meta-key">Passives:</span> ' + escapeHtml(rd.passives) + '</div>';
      if (rd.soulShard) html += '  <div><span class="st-meta-key">Soul Shard:</span> ' + escapeHtml(rd.soulShard) + '</div>';
      if (rd.fragment) html += '  <div><span class="st-meta-key">Fragment:</span> ' + escapeHtml(rd.fragment) + '</div>';
      if (rd.barEffect) html += '  <div class="st-respec-effect"><span class="st-meta-key">Bar effect:</span> ' + escapeHtml(rd.barEffect) + '</div>';
      html += '</div>';
      return html;
    },

    renderEndgameBlock(t) {
      if (!t) return '';
      let html = '<div class="st-endgame-block">';
      html += '<div class="st-endgame-heading">Endgame Target Bar (Lv 70 state)</div>';
      html += '<table class="st-respec-table">';
      html += '<thead><tr><th>Slot</th><th>Skill</th><th>Rank</th><th>Upgrades</th></tr></thead>';
      html += '<tbody>';
      const rows = [
        ['Core', t.core],
        ['Mobility', t.mobility],
        ['Defensive', t.defensive],
        ['Demonology 1', t.demonology1],
        ['Demonology 2 (endgame swap)', t.demonology2Endgame],
        ['Ultimate', t.ultimate],
      ];
      for (const pair of rows) {
        const slot = pair[0];
        const v = pair[1];
        if (!v) continue;
        html += '<tr><td>' + escapeHtml(slot) + '</td><td>' + escapeHtml(v.skill || '') + '</td><td>' + escapeHtml(String(v.rank || '')) + '</td><td>' + escapeHtml((v.upgrades || []).join(', ')) + '</td></tr>';
      }
      html += '</tbody></table>';
      if (t.classMechanic) html += '<div><span class="st-meta-key">Class Mechanic:</span> ' + escapeHtml(t.classMechanic) + '</div>';
      if (t.passives) html += '<div><span class="st-meta-key">Passives:</span> ' + escapeHtml(t.passives) + '</div>';
      if (t.pointMath) html += '<div class="st-respec-effect"><span class="st-meta-key">Point math:</span> ' + escapeHtml(t.pointMath) + '</div>';
      html += '</div>';
      return html;
    },

    bind() {
      if (this.bound) return;
      this.bound = true;
      document.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('.st-row-toggle');
        if (!btn) return;
        const tok = btn.getAttribute('data-toggle');
        if (!tok) return;
        if (tok.indexOf('respec') === 0) {
          const n = tok.slice('respec'.length);
          this.expanded.respecs[n] = !this.expanded.respecs[n];
        } else if (tok.indexOf('lv') === 0) {
          const n = tok.slice(2);
          this.expanded.levels[n] = !this.expanded.levels[n];
        }
        this.saveExpanded();
        this.render();
      });
    },
  };

  // ========================================
  // PS5 CONTROLLER RENDERER (Sprint 2 Part B)
  // ========================================
  const Controller = {
    bound: false,
    showAllMilestones: false,

    render() {
      const root = document.getElementById('controllerRoot');
      if (!root) return;
      const cb = (window.D4_DATA && window.D4_DATA.controllerBindings) || null;
      if (!cb || !Array.isArray(cb.milestones) || !cb.milestones.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-gamepad placeholder-icon"></i><div class="placeholder-title">No controller data</div><div class="placeholder-text">window.D4_DATA.controllerBindings is empty or missing.</div></div>';
        return;
      }

      const currentLevel = (AppState.data.character && AppState.data.character.level) || 1;
      const milestones = cb.milestones;

      let currentIdx = 0;
      for (let i = 0; i < milestones.length; i++) {
        const m = milestones[i];
        if (typeof m.level === 'number' && m.level <= currentLevel) {
          currentIdx = i;
        }
      }
      const currentM = milestones[currentIdx];

      let nextM = null;
      for (let i = currentIdx + 1; i < milestones.length; i++) {
        if (typeof milestones[i].level === 'number') { nextM = milestones[i]; break; }
      }

      let callout = null;
      const cleanText = (currentM.replaced || '');
      const isRecentSignificant = cleanText && !/^no bar swap/i.test(cleanText) && cleanText !== 'Initial slot';
      if (typeof currentM.level === 'number' && (currentLevel - currentM.level) <= 2 && isRecentSignificant) {
        callout = { kind: 'recent', level: currentM.level, text: cleanText };
      }
      if (!callout && nextM && typeof nextM.level === 'number' && (nextM.level - currentLevel) <= 2 && nextM.replaced && !/^no bar swap/i.test(nextM.replaced)) {
        callout = { kind: 'upcoming', level: nextM.level, text: nextM.replaced };
      }

      let html = '';
      html += '<div class="controller-card">';
      html += '  <header class="ctl-head">';
      html += '    <div class="ctl-head-left">';
      html += '      <h2 class="ctl-title">Controller Bindings</h2>';
      html += '      <p class="ctl-subtitle">PS5 DualSense layout, Maxroll canonical placement.</p>';
      html += '    </div>';
      html += '    <div class="ctl-head-right">';
      const milestoneLabel = (typeof currentM.level === 'number' ? ('Lv ' + currentM.level) : 'Final Endgame');
      html += '      <div class="ctl-milestone-chip">Milestone: ' + escapeHtml(milestoneLabel) + ' (' + escapeHtml(currentM.label || '') + ')</div>';
      if (nextM) {
        const delta = nextM.level - currentLevel;
        const deltaLabel = delta > 0 ? (delta + ' to go') : 'now';
        html += '      <div class="ctl-next-chip">Next update at Lv ' + nextM.level + ' (' + escapeHtml(deltaLabel) + ')</div>';
      }
      html += '    </div>';
      html += '  </header>';

      if (callout) {
        const kindLabel = callout.kind === 'recent' ? 'Replaced This Update' : ('Upcoming at Lv ' + callout.level);
        const ico = callout.kind === 'recent' ? 'fa-rotate' : 'fa-clock';
        html += '<div class="ctl-callout ctl-callout-' + callout.kind + '">';
        html += '  <i class="fa-solid ' + ico + '" aria-hidden="true"></i>';
        html += '  <div>';
        html += '    <div class="ctl-callout-label">' + escapeHtml(kindLabel) + '</div>';
        html += '    <div class="ctl-callout-text">' + escapeHtml(callout.text) + '</div>';
        html += '  </div>';
        html += '</div>';
      }

      html += this.renderSvg(currentM);

      html += '<div class="ctl-bindings">';
      const slots = [
        { key: 'square', glyph: '■', label: 'Square' },
        { key: 'triangle', glyph: '▲', label: 'Triangle' },
        { key: 'circle', glyph: '●', label: 'Circle' },
        { key: 'x', glyph: '✖', label: 'X' },
        { key: 'r1', glyph: 'R1', label: 'R1' },
        { key: 'r2', glyph: 'R2', label: 'R2' },
        { key: 'l2', glyph: 'L2', label: 'L2' },
      ];
      for (const s of slots) {
        const v = currentM[s.key] || '(empty)';
        const isEmpty = v === '(empty)';
        html += '<div class="ctl-binding ' + (isEmpty ? 'is-empty' : 'is-bound') + '" data-btn="' + s.key + '">';
        html += '  <div class="ctl-bind-glyph">' + escapeHtml(s.glyph) + '</div>';
        html += '  <div class="ctl-bind-body">';
        html += '    <div class="ctl-bind-btn">' + escapeHtml(s.label) + '</div>';
        html += '    <div class="ctl-bind-skill">' + escapeHtml(v) + '</div>';
        html += '  </div>';
        html += '</div>';
      }
      html += '</div>';

      html += '<div class="ctl-caveat"><i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>Button placement is Maxroll canonical. Sprint 3 will let you customize.</span></div>';

      html += '<div class="ctl-all">';
      html += '  <button class="btn btn-ghost ctl-all-toggle" type="button" data-ctl-toggle="all">' + (this.showAllMilestones ? 'Hide All Milestones' : 'View All Milestones') + '</button>';
      if (this.showAllMilestones) {
        html += '<div class="ctl-all-scroll">';
        html += '  <table class="ctl-all-table">';
        html += '    <thead><tr><th>Level</th><th>Label</th><th>Square</th><th>Triangle</th><th>Circle</th><th>X</th><th>R1</th><th>R2</th><th>L2</th></tr></thead>';
        html += '    <tbody>';
        for (let i = 0; i < milestones.length; i++) {
          const m = milestones[i];
          const isCur = i === currentIdx;
          const lvLabel = typeof m.level === 'number' ? ('Lv ' + m.level) : 'Final';
          html += '<tr class="' + (isCur ? 'is-current' : '') + '">';
          html += '<td>' + escapeHtml(lvLabel) + '</td>';
          html += '<td>' + escapeHtml(m.label || '') + '</td>';
          html += '<td>' + escapeHtml(m.square || '') + '</td>';
          html += '<td>' + escapeHtml(m.triangle || '') + '</td>';
          html += '<td>' + escapeHtml(m.circle || '') + '</td>';
          html += '<td>' + escapeHtml(m.x || '') + '</td>';
          html += '<td>' + escapeHtml(m.r1 || '') + '</td>';
          html += '<td>' + escapeHtml(m.r2 || '') + '</td>';
          html += '<td>' + escapeHtml(m.l2 || '') + '</td>';
          html += '</tr>';
        }
        html += '    </tbody>';
        html += '  </table>';
        html += '</div>';
      }
      html += '</div>';

      html += '</div>';

      root.innerHTML = html;
      this.bind();
    },

    renderSvg(m) {
      const isBound = (v) => v && v !== '(empty)';
      const cls = (v) => isBound(v) ? 'ds-btn is-bound' : 'ds-btn';
      const trigCls = (v) => isBound(v) ? 'ds-trigger is-bound' : 'ds-trigger';
      const bumpCls = (v) => isBound(v) ? 'ds-bumper is-bound' : 'ds-bumper';
      let svg = '';
      svg += '<div class="ctl-svg-wrap">';
      svg += '<svg viewBox="0 0 800 440" class="dualsense-svg" role="img" aria-label="DualSense controller binding overview">';
      svg += '<rect x="100" y="10" width="170" height="30" rx="14" class="' + trigCls(m.l2) + '"/>';
      svg += '<rect x="530" y="10" width="170" height="30" rx="14" class="' + trigCls(m.r2) + '"/>';
      svg += '<text x="185" y="30" class="ds-trigger-label" text-anchor="middle">L2</text>';
      svg += '<text x="615" y="30" class="ds-trigger-label" text-anchor="middle">R2</text>';
      svg += '<rect x="120" y="44" width="150" height="26" rx="12" class="ds-bumper"/>';
      svg += '<rect x="530" y="44" width="150" height="26" rx="12" class="' + bumpCls(m.r1) + '"/>';
      svg += '<text x="195" y="62" class="ds-bumper-label" text-anchor="middle">L1</text>';
      svg += '<text x="605" y="62" class="ds-bumper-label" text-anchor="middle">R1</text>';
      svg += '<rect x="100" y="80" width="600" height="220" rx="40" class="ds-body"/>';
      svg += '<rect x="110" y="270" width="170" height="150" rx="60" class="ds-body"/>';
      svg += '<rect x="520" y="270" width="170" height="150" rx="60" class="ds-body"/>';
      svg += '<rect x="320" y="106" width="160" height="2" rx="1" class="ds-lightbar"/>';
      svg += '<rect x="320" y="110" width="160" height="90" rx="10" class="ds-touchpad"/>';
      svg += '<text x="400" y="160" class="ds-touchpad-label" text-anchor="middle">TOUCHPAD</text>';
      svg += '<g class="ds-dpad" transform="translate(220 180)">';
      svg += '  <rect x="-30" y="-10" width="20" height="20" rx="3"/>';
      svg += '  <rect x="10" y="-10" width="20" height="20" rx="3"/>';
      svg += '  <rect x="-10" y="-30" width="20" height="20" rx="3"/>';
      svg += '  <rect x="-10" y="10" width="20" height="20" rx="3"/>';
      svg += '</g>';
      svg += '<circle cx="540" cy="180" r="24" class="' + cls(m.square) + '"/>';
      svg += '<text x="540" y="188" class="ds-glyph" text-anchor="middle">■</text>';
      svg += '<circle cx="580" cy="140" r="24" class="' + cls(m.triangle) + '"/>';
      svg += '<text x="580" y="148" class="ds-glyph" text-anchor="middle">▲</text>';
      svg += '<circle cx="620" cy="180" r="24" class="' + cls(m.circle) + '"/>';
      svg += '<text x="620" y="188" class="ds-glyph" text-anchor="middle">●</text>';
      svg += '<circle cx="580" cy="220" r="24" class="' + cls(m.x) + '"/>';
      svg += '<text x="580" y="228" class="ds-glyph" text-anchor="middle">✖</text>';
      svg += '<circle cx="260" cy="320" r="32" class="ds-stick"/>';
      svg += '<circle cx="260" cy="320" r="14" class="ds-stick-inner"/>';
      svg += '<circle cx="540" cy="320" r="32" class="ds-stick"/>';
      svg += '<circle cx="540" cy="320" r="14" class="ds-stick-inner"/>';
      svg += '<circle cx="400" cy="240" r="9" class="ds-ps"/>';
      svg += '</svg>';
      svg += '</div>';
      return svg;
    },

    bind() {
      if (this.bound) return;
      this.bound = true;
      document.addEventListener('click', (e) => {
        const t = e.target;
        if (!t || !t.closest) return;
        const toggle = t.closest('[data-ctl-toggle]');
        if (toggle && toggle.getAttribute('data-ctl-toggle') === 'all') {
          this.showAllMilestones = !this.showAllMilestones;
          this.render();
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
  // PARAGON RENDERER (boards + glyphs + stats)
  // ========================================
  const Paragon = {
    render() {
      const root = document.getElementById('paragonRoot');
      if (!root) return;
      const data = window.D4_PARAGON || {};
      const boards = data.boards || [];
      const glyphs = data.glyphs || [];
      const stats = data.statTargets || [];
      if (!boards.length && !glyphs.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No paragon data</div></div>';
        return;
      }
      const c = AppState.data.character;
      const pState = AppState.data.paragon || { boards: [], glyphs: {} };

      let html = '';

      html += '<div class="paragon-status">';
      html += '  <div class="paragon-status-row"><div class="paragon-status-label">Paragon</div><div class="paragon-status-pct">' + (c.paragon || 0) + ' / 300</div></div>';
      html += '  <div class="paragon-status-bar"><div class="paragon-status-fill" style="width:' + Math.min(100, (c.paragon || 0) / 3) + '%"></div></div>';
      html += '  <div class="paragon-status-meta">' + (c.paragon < 200 ? 'Sub-200: rush legendary nodes' : 'Post-200: full rotation with glyph radius') + '</div>';
      html += '  <div class="paragon-status-note">Socket positions verify in-game; rotation order is canonical per Maxroll.</div>';
      html += '</div>';

      html += '<section class="paragon-group">';
      html += '  <h2 class="paragon-group-name">Board Rotation</h2>';
      for (const b of boards) {
        const done = !!pState.boards && pState.boards.includes(b.id);
        html += '<article class="board ' + (done ? 'is-done' : '') + '" data-board="' + b.id + '">';
        html += '  <header class="board-head">';
        html += '    <span class="board-order">' + (b.order === 0 ? 'Start' : b.order) + '</span>';
        html += '    <h3 class="board-name">' + escapeHtml(b.name) + '</h3>';
        html += '    <span class="wt-conf wt-conf-' + (b.confidence || 'MEDIUM').toLowerCase() + '">' + (b.confidence || 'MEDIUM') + '</span>';
        html += '  </header>';
        html += '  <div class="board-legendary"><span class="board-legendary-label">Legendary node:</span> ' + escapeHtml(b.legendaryNode || '') + '</div>';
        if (b.glyphSlot) {
          const g = glyphs.find((x) => x.id === b.glyphSlot);
          if (g) html += '<div class="board-glyph"><span class="board-glyph-label">Glyph:</span> ' + escapeHtml(g.name) + '</div>';
        }
        html += '  <p class="board-notes">' + escapeHtml(b.notes || '') + '</p>';
        html += '  <button type="button" class="btn btn-ghost board-toggle" data-board-toggle="' + b.id + '">' + (done ? 'Mark unbuilt' : 'Mark built') + '</button>';
        html += '</article>';
      }
      html += '</section>';

      html += '<section class="paragon-group">';
      html += '  <h2 class="paragon-group-name">Glyph Leveling Priority</h2>';
      html += '  <div class="glyph-list">';
      for (const g of glyphs) {
        const level = (pState.glyphs && pState.glyphs[g.id]) || 0;
        html += '<article class="glyph">';
        html += '  <header class="glyph-head">';
        html += '    <span class="glyph-order">' + g.order + '</span>';
        html += '    <h3 class="glyph-name">' + escapeHtml(g.name) + '</h3>';
        html += '    <span class="glyph-level">Lv ' + level + '</span>';
        html += '  </header>';
        html += '  <p class="glyph-effect">' + escapeHtml(g.effect) + '</p>';
        html += '  <div class="glyph-targets">Target ' + g.target1 + ' first, then ' + g.target2 + '</div>';
        html += '  <div class="glyph-bar"><div class="glyph-fill" style="width:' + Math.min(100, (level / g.target2) * 100) + '%"></div></div>';
        html += '  <div class="glyph-actions">';
        html += '    <button class="btn btn-ghost glyph-step" data-glyph="' + g.id + '" data-glyph-step="-1">&minus;</button>';
        html += '    <button class="btn btn-ghost glyph-step" data-glyph="' + g.id + '" data-glyph-step="1">+</button>';
        html += '    <button class="btn btn-ghost glyph-step" data-glyph="' + g.id + '" data-glyph-step="5">+5</button>';
        html += '  </div>';
        html += '</article>';
      }
      html += '  </div>';
      html += '</section>';

      if (stats.length) {
        html += '<section class="paragon-group">';
        html += '  <h2 class="paragon-group-name">Endgame Stat Targets</h2>';
        html += '  <div class="stat-list">';
        for (const s of stats) {
          html += '<div class="stat-row"><div class="stat-name">' + escapeHtml(s.stat) + '</div><div class="stat-target">' + escapeHtml(s.target) + '</div><div class="stat-note">' + escapeHtml(s.note) + '</div></div>';
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
      main.addEventListener('click', (e) => {
        const boardBtn = e.target.closest && e.target.closest('[data-board-toggle]');
        if (boardBtn) {
          const id = boardBtn.getAttribute('data-board-toggle');
          if (!AppState.data.paragon.boards) AppState.data.paragon.boards = [];
          const list = AppState.data.paragon.boards;
          const idx = list.indexOf(id);
          if (idx >= 0) list.splice(idx, 1);
          else list.push(id);
          AppState.save('paragon');
          Paragon.render();
          return;
        }
        const glyphBtn = e.target.closest && e.target.closest('[data-glyph-step]');
        if (glyphBtn) {
          const id = glyphBtn.getAttribute('data-glyph');
          const step = parseInt(glyphBtn.getAttribute('data-glyph-step'), 10);
          if (!AppState.data.paragon.glyphs) AppState.data.paragon.glyphs = {};
          const cur = AppState.data.paragon.glyphs[id] || 0;
          AppState.data.paragon.glyphs[id] = clamp(cur + step, 0, 100);
          AppState.save('paragon');
          Paragon.render();
        }
      });
    },
  };

  // ========================================
  // UNIQUES RENDERER
  // ========================================
  const Uniques = {
    render() {
      const root = document.getElementById('uniquesRoot');
      if (!root) return;
      const items = (window.D4_ITEMS && window.D4_ITEMS.uniques) || [];
      if (!items.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No unique data</div></div>';
        return;
      }
      const owned = AppState.data.uniques || {};

      const priorityOrder = { core: 0, strong: 1, situational: 2 };
      const sorted = items.slice().sort((a, b) => (priorityOrder[a.priority] || 9) - (priorityOrder[b.priority] || 9));

      const total = items.length;
      const acquired = items.filter((u) => owned[u.id] && owned[u.id].acquired).length;
      const pct = Math.round((acquired / total) * 100);

      let html = '';
      html += '<div class="uniques-summary">';
      html += '  <div class="uniques-summary-row"><div class="uniques-summary-label">Acquired</div><div class="uniques-summary-pct">' + acquired + ' / ' + total + '</div></div>';
      html += '  <div class="uniques-summary-bar"><div class="uniques-summary-fill" style="width:' + pct + '%"></div></div>';
      html += '</div>';

      html += '<div class="unique-list">';
      for (const u of sorted) {
        const got = !!(owned[u.id] && owned[u.id].acquired);
        const isMythic = !!u.mythic;
        html += '<article class="unique ' + (got ? 'is-owned' : '') + ' unique-priority-' + (u.priority || 'situational') + (isMythic ? ' is-mythic' : '') + '" data-unique="' + u.id + '">';
        html += '  <header class="unique-head">';
        html += '    <h3 class="unique-name">' + escapeHtml(u.name) + (isMythic ? '<span class="mythic-tag">MYTHIC</span>' : '') + '</h3>';
        html += '    <div class="unique-meta">';
        html += '      <span class="unique-slot">' + escapeHtml(u.slot) + (u.subtype ? ' &middot; ' + escapeHtml(u.subtype) : '') + '</span>';
        html += '      <span class="aspect-priority aspect-priority-tag-' + (u.priority || 'situational') + '">' + (u.priority || 'situational') + '</span>';
        html += '      <span class="wt-conf wt-conf-' + (u.confidence || 'MEDIUM').toLowerCase() + '">' + (u.confidence || 'MEDIUM') + '</span>';
        html += '    </div>';
        html += '  </header>';
        html += '  <p class="unique-effect">' + escapeHtml(u.effect) + '</p>';
        html += '  <div class="unique-drop"><span class="unique-drop-label">Drops from:</span> ' + escapeHtml(u.dropSource || '') + '</div>';
        if (u.farmNotes) html += '<p class="unique-farm">' + escapeHtml(u.farmNotes) + '</p>';
        html += '  <button type="button" class="btn btn-ghost unique-toggle" data-unique-toggle="' + u.id + '">' + (got ? 'Mark unowned' : 'Mark owned') + '</button>';
        html += '</article>';
      }
      html += '</div>';

      root.innerHTML = html;
      this.bind();
    },

    bound: false,
    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('[data-unique-toggle]');
        if (btn) {
          const id = btn.getAttribute('data-unique-toggle');
          if (!AppState.data.uniques[id]) AppState.data.uniques[id] = {};
          AppState.data.uniques[id].acquired = !AppState.data.uniques[id].acquired;
          AppState.data.uniques[id].ts = Date.now();
          AppState.save('uniques');
          Uniques.render();
          Nav.updateBadges();
        }
      });
    },
  };

  // ========================================
  // BOSSES RENDERER
  // ========================================
  const Bosses = {
    render() {
      const root = document.getElementById('bossesRoot');
      if (!root) return;
      const bosses = (window.D4_DATA && window.D4_DATA.bosses) || [];
      const uniques = (window.D4_ITEMS && window.D4_ITEMS.uniques) || [];
      if (!bosses.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No boss data</div></div>';
        return;
      }
      const kills = AppState.data.bosses || {};
      const findUnique = (id) => uniques.find((u) => u.id === id);

      let html = '<div class="boss-list">';
      for (const b of bosses) {
        const ks = (kills[b.id] && kills[b.id].kills) || 0;
        html += '<article class="boss" data-boss="' + b.id + '">';
        html += '  <header class="boss-head">';
        html += '    <h3 class="boss-name">' + escapeHtml(b.name) + (b.newInPatch ? '<span class="boss-new">NEW</span>' : '') + '</h3>';
        html += '    <span class="boss-type">' + escapeHtml(b.type) + '</span>';
        html += '    <span class="wt-conf wt-conf-' + (b.confidence || 'MEDIUM').toLowerCase() + '">' + (b.confidence || 'MEDIUM') + '</span>';
        html += '  </header>';
        html += '  <div class="boss-meta">';
        html += '    <div class="boss-meta-row"><span class="boss-meta-label">Summoning:</span> ' + escapeHtml(b.summoning || '') + '</div>';
        html += '    <div class="boss-meta-row"><span class="boss-meta-label">Access:</span> ' + escapeHtml(b.access || '') + '</div>';
        html += '    <div class="boss-meta-row"><span class="boss-meta-label">Tier:</span> ' + escapeHtml(b.minTier || '') + '</div>';
        html += '  </div>';
        html += '  <p class="boss-role">' + escapeHtml(b.buildRole) + '</p>';
        if (b.drops && b.drops.length) {
          html += '<div class="boss-drops"><span class="boss-drops-label">Drops:</span>';
          for (const dropId of b.drops) {
            const u = findUnique(dropId);
            const label = u ? u.name : dropId;
            const cls = u && u.mythic ? 'boss-drop is-mythic' : 'boss-drop';
            html += '<span class="' + cls + '">' + escapeHtml(label) + '</span>';
          }
          html += '</div>';
        }
        html += '  <div class="boss-counter">';
        html += '    <span class="boss-counter-label">Kills:</span>';
        html += '    <span class="boss-counter-n">' + ks + '</span>';
        html += '    <button class="btn btn-ghost boss-step" data-boss-step="-1" data-boss="' + b.id + '">&minus;</button>';
        html += '    <button class="btn btn-danger boss-step" data-boss-step="1" data-boss="' + b.id + '">+1 kill</button>';
        html += '  </div>';
        html += '</article>';
      }
      html += '</div>';

      root.innerHTML = html;
      this.bind();
    },

    bound: false,
    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('[data-boss-step]');
        if (btn) {
          const id = btn.getAttribute('data-boss');
          const step = parseInt(btn.getAttribute('data-boss-step'), 10);
          if (!AppState.data.bosses[id]) AppState.data.bosses[id] = { kills: 0 };
          AppState.data.bosses[id].kills = Math.max(0, (AppState.data.bosses[id].kills || 0) + step);
          AppState.save('bosses');
          Bosses.render();
        }
      });
    },
  };

  // ========================================
  // ENDGAME BUILD RENDERER (aggregator)
  // ========================================
  const Endbuild = {
    render() {
      const root = document.getElementById('endbuildRoot');
      if (!root) return;
      const D = window.D4_DATA || {};
      const I = window.D4_ITEMS || {};
      const P = window.D4_PARAGON || {};
      const bar = D.endgameBar || [];
      const skills = D.skills || [];
      const aspects = D.aspects || [];
      const uniques = I.uniques || [];
      const glyphs = P.glyphs || [];

      const c = AppState.data.character;
      const skillById = (id) => skills.find((s) => s.id === id) || { name: id };

      let html = '';

      html += '<section class="eb-section">';
      html += '  <h2 class="eb-section-name"><i class="fa-solid fa-bolt"></i> Skill Bar</h2>';
      html += '  <ol class="eb-bar">';
      for (const b of bar) {
        const sk = skillById(b.skillId);
        const up = b.upgrade ? ': ' + b.upgrade : '';
        html += '<li class="eb-bar-slot"><span class="eb-bar-n">' + b.slot + '</span><div><div class="eb-bar-skill">' + escapeHtml(sk.name + up) + '</div><div class="eb-bar-role">' + escapeHtml(b.role) + '</div></div></li>';
      }
      html += '  </ol>';
      html += '</section>';

      html += '<section class="eb-section">';
      html += '  <h2 class="eb-section-name"><i class="fa-solid fa-gem"></i> Soul Shard</h2>';
      html += '  <div class="eb-line"><span class="eb-line-label">Shard:</span> ' + escapeHtml(c.soulShard || 'Mastermind (recommended)') + '</div>';
      html += '  <div class="eb-line"><span class="eb-line-label">Fragment:</span> ' + escapeHtml(c.fragment || 'blasphemous (recommended)') + '</div>';
      html += '</section>';

      const coreAspects = aspects.filter((a) => a.priority === 'core');
      html += '<section class="eb-section">';
      html += '  <h2 class="eb-section-name"><i class="fa-solid fa-wand-magic-sparkles"></i> Core Aspects</h2>';
      html += '  <ul class="eb-list">';
      for (const a of coreAspects) {
        html += '<li><strong>' + escapeHtml(a.name) + '</strong> &middot; ' + escapeHtml((a.slots || []).join(', ')) + '</li>';
      }
      html += '  </ul>';
      html += '</section>';

      const coreUniques = uniques.filter((u) => u.priority === 'core');
      html += '<section class="eb-section">';
      html += '  <h2 class="eb-section-name"><i class="fa-solid fa-trophy"></i> Core Uniques</h2>';
      html += '  <ul class="eb-list">';
      for (const u of coreUniques) {
        const got = AppState.data.uniques[u.id] && AppState.data.uniques[u.id].acquired;
        html += '<li class="' + (got ? 'is-owned' : '') + '"><strong>' + escapeHtml(u.name) + '</strong> &middot; ' + escapeHtml(u.slot) + (u.mythic ? ' <span class="mythic-tag">MYTHIC</span>' : '') + ' &middot; <em>' + escapeHtml(u.dropSource) + '</em>' + (got ? ' &check;' : '') + '</li>';
      }
      html += '  </ul>';
      html += '</section>';

      html += '<section class="eb-section">';
      html += '  <h2 class="eb-section-name"><i class="fa-solid fa-table-cells-large"></i> Glyph Priority</h2>';
      html += '  <ol class="eb-list">';
      for (const g of glyphs) {
        const lv = (AppState.data.paragon.glyphs && AppState.data.paragon.glyphs[g.id]) || 0;
        html += '<li><strong>' + escapeHtml(g.name) + '</strong> &middot; Lv ' + lv + ' / target ' + g.target2 + '</li>';
      }
      html += '  </ol>';
      html += '</section>';

      html += '<section class="eb-section">';
      html += '  <h2 class="eb-section-name"><i class="fa-solid fa-bullseye"></i> Stat Targets</h2>';
      html += '  <ul class="eb-list">';
      for (const s of (P.statTargets || [])) {
        html += '<li><strong>' + escapeHtml(s.stat) + ':</strong> ' + escapeHtml(s.target) + '</li>';
      }
      html += '  </ul>';
      html += '</section>';

      root.innerHTML = html;
    },
  };

  // ========================================
  // TALISMANS RENDERER
  // ========================================
  const Talismans = {
    render() {
      const root = document.getElementById('talismansRoot');
      if (!root) return;
      const t = (window.D4_DATA && window.D4_DATA.talismans);
      if (!t) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No talisman data</div></div>';
        return;
      }
      const owned = AppState.data.talismans || { ownedSets: {}, ownedUniqueCharms: {} };

      let html = '';

      html += '<div class="tal-card">';
      html += '  <div class="tal-card-title"><i class="fa-solid fa-key"></i> Unlock</div>';
      html += '  <p class="tal-card-text">' + escapeHtml(t.unlock) + '</p>';
      html += '  <div class="tal-card-meta">' + escapeHtml(t.dropRules) + '</div>';
      html += '</div>';

      html += '<section class="tal-section">';
      html += '  <h2 class="tal-section-name">Seal Priority</h2>';
      html += '  <ol class="tal-priority">';
      for (const s of t.sealPriority) {
        html += '<li class="tal-priority-row"><span class="tal-priority-n">' + s.priority + '</span><div><div class="tal-priority-name">' + escapeHtml(s.target) + '</div><div class="tal-priority-note">' + escapeHtml(s.notes) + '</div></div></li>';
      }
      html += '  </ol>';
      html += '</section>';

      html += '<section class="tal-section">';
      html += '  <h2 class="tal-section-name">Charm Affix Targets</h2>';
      html += '  <div class="tal-charm-grid">';
      for (const c of t.charmTargets) {
        html += '<div class="tal-charm tal-charm-' + c.priority + '"><div class="tal-charm-affix">' + escapeHtml(c.affix) + '</div><div class="tal-charm-note">' + escapeHtml(c.notes) + '</div><span class="aspect-priority aspect-priority-tag-' + c.priority + '">' + c.priority + '</span></div>';
      }
      html += '  </div>';
      html += '</section>';

      html += '<section class="tal-section">';
      html += '  <h2 class="tal-section-name">Charm Sets</h2>';
      for (const s of t.sets) {
        const isOwned = !!owned.ownedSets[s.id];
        html += '<article class="tal-set tal-set-' + s.tier + ' ' + (isOwned ? 'is-owned' : '') + '">';
        html += '  <header class="tal-set-head">';
        html += '    <h3 class="tal-set-name">' + escapeHtml(s.name) + '</h3>';
        html += '    <span class="tal-set-tier">' + s.tier + '</span>';
        if (s.classSpecific) html += '<span class="tal-set-class">' + escapeHtml(s.classSpecific) + '</span>';
        html += '    <span class="wt-conf wt-conf-' + (s.confidence || 'MEDIUM').toLowerCase() + '">' + (s.confidence || 'MEDIUM') + '</span>';
        html += '  </header>';
        html += '  <ul class="tal-set-bonuses">';
        for (const pieces of Object.keys(s.bonuses).sort((a, b) => parseInt(a) - parseInt(b))) {
          html += '<li><span class="tal-set-pieces">' + pieces + '-piece:</span> ' + escapeHtml(s.bonuses[pieces]) + '</li>';
        }
        html += '  </ul>';
        html += '  <button type="button" class="btn btn-ghost tal-set-toggle" data-tal-set="' + s.id + '">' + (isOwned ? 'Mark not owned' : 'Mark set owned') + '</button>';
        html += '</article>';
      }
      html += '</section>';

      html += '<section class="tal-section">';
      html += '  <h2 class="tal-section-name">Unique Charms</h2>';
      for (const u of t.uniqueCharms) {
        const isOwned = !!owned.ownedUniqueCharms[u.id];
        html += '<article class="tal-unique ' + (isOwned ? 'is-owned' : '') + '">';
        html += '  <header class="tal-unique-head">';
        html += '    <h3 class="tal-unique-name">' + escapeHtml(u.name) + '</h3>';
        html += '    <span class="aspect-priority aspect-priority-tag-' + u.priority + '">' + u.priority + '</span>';
        html += '    <span class="wt-conf wt-conf-' + (u.confidence || 'MEDIUM').toLowerCase() + '">' + (u.confidence || 'MEDIUM') + '</span>';
        html += '  </header>';
        html += '  <p class="tal-unique-effect">' + escapeHtml(u.effect) + '</p>';
        html += '  <div class="tal-unique-source">Source: ' + escapeHtml(u.source) + '</div>';
        html += '  <button type="button" class="btn btn-ghost tal-unique-toggle" data-tal-uniq="' + u.id + '">' + (isOwned ? 'Mark not owned' : 'Mark owned') + '</button>';
        html += '</article>';
      }
      html += '</section>';

      root.innerHTML = html;
      this.bind();
    },

    bound: false,
    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('click', (e) => {
        const sBtn = e.target.closest && e.target.closest('[data-tal-set]');
        if (sBtn) {
          const id = sBtn.getAttribute('data-tal-set');
          if (!AppState.data.talismans.ownedSets) AppState.data.talismans.ownedSets = {};
          AppState.data.talismans.ownedSets[id] = !AppState.data.talismans.ownedSets[id];
          AppState.save('talismans');
          Talismans.render();
          return;
        }
        const uBtn = e.target.closest && e.target.closest('[data-tal-uniq]');
        if (uBtn) {
          const id = uBtn.getAttribute('data-tal-uniq');
          if (!AppState.data.talismans.ownedUniqueCharms) AppState.data.talismans.ownedUniqueCharms = {};
          AppState.data.talismans.ownedUniqueCharms[id] = !AppState.data.talismans.ownedUniqueCharms[id];
          AppState.save('talismans');
          Talismans.render();
        }
      });
    },
  };

  // ========================================
  // WAR PLANS RENDERER
  // ========================================
  const WarPlans = {
    render() {
      const root = document.getElementById('warplansRoot');
      if (!root) return;
      const wp = (window.D4_DATA && window.D4_DATA.warPlans);
      if (!wp) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No war plan data</div></div>';
        return;
      }
      const plan = AppState.data.warplans || {};
      const planCount = Object.values(plan).filter((x) => x && x.inPlan).length;
      const max = wp.maxPlanSize || 5;

      let html = '';
      html += '<div class="wp-status">';
      html += '  <div class="wp-status-row"><div class="wp-status-label">Plan Slots</div><div class="wp-status-pct">' + planCount + ' / ' + max + '</div></div>';
      html += '  <div class="wp-status-bar"><div class="wp-status-fill" style="width:' + Math.min(100, (planCount / max) * 100) + '%"></div></div>';
      html += '  <p class="wp-overview">' + escapeHtml(wp.overview) + '</p>';
      html += '</div>';

      html += '<div class="wp-list">';
      for (const a of wp.activities) {
        const inPlan = !!(plan[a.id] && plan[a.id].inPlan);
        const tierClass = 'wp-tier-' + a.tier.toLowerCase().replace('+', 'plus');
        html += '<article class="wp ' + (inPlan ? 'is-in-plan' : '') + ' ' + tierClass + '" data-wp="' + a.id + '">';
        html += '  <header class="wp-head">';
        html += '    <h3 class="wp-name">' + escapeHtml(a.name) + '</h3>';
        html += '    <span class="wp-tier-tag">' + escapeHtml(a.tier) + '</span>';
        html += '    <span class="wt-conf wt-conf-' + (a.confidence || 'MEDIUM').toLowerCase() + '">' + (a.confidence || 'MEDIUM') + '</span>';
        html += '  </header>';
        html += '  <p class="wp-summary">' + escapeHtml(a.rewardSummary) + '</p>';
        if (a.rewardItems && a.rewardItems.length) {
          html += '<div class="wp-rewards">';
          for (const r of a.rewardItems) html += '<span class="wp-reward">' + escapeHtml(r) + '</span>';
          html += '</div>';
        }
        html += '  <div class="wp-meta"><span class="wp-meta-label">Cadence:</span> ' + escapeHtml(a.cadence) + '</div>';
        if (a.notes) html += '<p class="wp-notes">' + escapeHtml(a.notes) + '</p>';
        html += '  <button type="button" class="btn ' + (inPlan ? 'btn-ghost' : 'btn-danger') + ' wp-toggle" data-wp-toggle="' + a.id + '">' + (inPlan ? 'Remove from plan' : 'Add to plan') + '</button>';
        html += '</article>';
      }
      html += '</div>';

      root.innerHTML = html;
      this.bind();
    },

    bound: false,
    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('[data-wp-toggle]');
        if (btn) {
          const id = btn.getAttribute('data-wp-toggle');
          if (!AppState.data.warplans[id]) AppState.data.warplans[id] = {};
          const cur = !!AppState.data.warplans[id].inPlan;
          const wpData = (window.D4_DATA && window.D4_DATA.warPlans) || { maxPlanSize: 5 };
          if (!cur) {
            const count = Object.values(AppState.data.warplans).filter((x) => x && x.inPlan).length;
            if (count >= wpData.maxPlanSize) {
              Toast.show('Plan full (' + wpData.maxPlanSize + ' slots). Remove one first.', 'warn');
              return;
            }
          }
          AppState.data.warplans[id].inPlan = !cur;
          AppState.data.warplans[id].ts = Date.now();
          AppState.save('warplans');
          WarPlans.render();
        }
      });
    },
  };

  // ========================================
  // MERCENARY RENDERER
  // ========================================
  const Mercenary = {
    render() {
      const root = document.getElementById('mercenaryRoot');
      if (!root) return;
      const mercs = (window.D4_DATA && window.D4_DATA.mercenaries) || [];
      const pairs = (window.D4_DATA && window.D4_DATA.mercPairs) || [];
      if (!mercs.length) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-hammer placeholder-icon"></i><div class="placeholder-title">No mercenary data</div></div>';
        return;
      }
      const state = AppState.data.mercs || { hired: null, reinforcement: null };
      const findM = (id) => mercs.find((m) => m.id === id);

      let html = '';

      html += '<section class="merc-section">';
      html += '  <h2 class="merc-section-name">Recommended Pairs</h2>';
      html += '  <div class="merc-pair-list">';
      for (const p of pairs) {
        const h = findM(p.hired); const r = findM(p.reinforcement);
        const isActive = state.hired === p.hired && state.reinforcement === p.reinforcement;
        html += '<article class="merc-pair ' + (isActive ? 'is-active' : '') + '" data-pair="' + p.id + '">';
        html += '  <header class="merc-pair-head"><h3 class="merc-pair-name">' + escapeHtml(p.name) + '</h3>' + (isActive ? '<span class="merc-pair-active">Active</span>' : '') + '</header>';
        html += '  <div class="merc-pair-slots">';
        html += '    <div class="merc-pair-slot"><div class="merc-pair-role">Hired</div><div class="merc-pair-merc">' + escapeHtml((h && h.name) || p.hired) + '</div></div>';
        html += '    <div class="merc-pair-slot"><div class="merc-pair-role">Reinforcement</div><div class="merc-pair-merc">' + escapeHtml((r && r.name) || p.reinforcement) + '</div></div>';
        html += '  </div>';
        html += '  <p class="merc-pair-notes">' + escapeHtml(p.notes) + '</p>';
        html += '  <button type="button" class="btn ' + (isActive ? 'btn-ghost' : 'btn-danger') + ' merc-pair-btn" data-merc-pair="' + p.id + '">' + (isActive ? 'Active' : 'Set as active') + '</button>';
        html += '</article>';
      }
      html += '  </div>';
      html += '</section>';

      html += '<section class="merc-section">';
      html += '  <h2 class="merc-section-name">Mercenaries</h2>';
      html += '  <div class="merc-list">';
      for (const m of mercs) {
        html += '<article class="merc">';
        html += '  <header class="merc-head">';
        html += '    <h3 class="merc-name">' + escapeHtml(m.name) + '</h3>';
        html += '    <span class="merc-role merc-role-' + m.role.toLowerCase() + '">' + escapeHtml(m.role) + '</span>';
        html += '    <span class="merc-style">' + escapeHtml(m.style) + '</span>';
        html += '  </header>';
        html += '  <p class="merc-role-text">' + escapeHtml(m.buildRole) + '</p>';
        html += '  <div class="merc-skills"><span class="merc-skills-label">Key:</span>';
        for (const ks of (m.keySkills || [])) html += '<span class="merc-skill">' + escapeHtml(ks) + '</span>';
        html += '  </div>';
        html += '  <div class="merc-upgrade"><span class="merc-upgrade-label">Upgrade order:</span> ' + (m.upgradePriority || []).map(escapeHtml).join(' &rsaquo; ') + '</div>';
        html += '</article>';
      }
      html += '  </div>';
      html += '</section>';

      root.innerHTML = html;
      this.bind();
    },

    bound: false,
    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('[data-merc-pair]');
        if (btn) {
          const id = btn.getAttribute('data-merc-pair');
          const pairs = (window.D4_DATA && window.D4_DATA.mercPairs) || [];
          const p = pairs.find((x) => x.id === id);
          if (!p) return;
          AppState.data.mercs.hired = p.hired;
          AppState.data.mercs.reinforcement = p.reinforcement;
          AppState.save('mercs');
          Toast.show('Active pair: ' + p.name, 'success');
          Mercenary.render();
        }
      });
    },
  };

  // ========================================
  // PATCH NOTES + DATA FRESHNESS
  // ========================================
  const Patch = {
    render() {
      const root = document.getElementById('patchRoot');
      if (!root) return;
      const meta = (window.D4_DATA && window.D4_DATA.patchMeta) || {};

      const layers = [
        { key: 'skills', label: 'Skill names + upgrade variants', confidence: 'HIGH', source: 'FextraLife wiki' },
        { key: 'endgameBar', label: 'Endgame skill bar', confidence: 'HIGH', source: 'Maxroll endgame + Mobalytics' },
        { key: 'shards', label: 'Soul Shards + Fragments', confidence: 'HIGH', source: 'FextraLife wiki' },
        { key: 'aspects-core', label: 'Core aspects (Deeper Shadows, Juggernaut, Calamity)', confidence: 'HIGH', source: 'Maxroll' },
        { key: 'aspects-strong', label: 'Strong aspects (Demonic Pact, Profane, etc.)', confidence: 'MEDIUM', source: 'Maxroll (effects partial)' },
        { key: 'uniques-core', label: 'Core uniques (Litany, Footfalls, Heir, Starless)', confidence: 'HIGH', source: 'Maxroll + FextraLife + Aoeah' },
        { key: 'uniques-seed', label: 'Seed of Horazon -> Grigoire', confidence: 'MEDIUM', source: 'Maxroll' },
        { key: 'glyph-priority', label: 'Glyph priority order', confidence: 'HIGH', source: 'Maxroll' },
        { key: 'board-rotation', label: 'Paragon board rotation names', confidence: 'MEDIUM', source: 'Canonical glyph-keyed boards; Maxroll diagrams visual-only' },
        { key: 'bartuc-footfalls', label: 'Bartuc alt Footfalls drop', confidence: 'LOW', source: 'Aoeah Season 13 notes only' },
        { key: 'talisman-sets', label: 'Charm Set bonuses', confidence: 'MEDIUM', source: 'User-locked + FextraLife (LoH live data still expanding)' },
        { key: 'walkthrough', label: 'Leveling walkthrough phases', confidence: 'HIGH', source: 'Maxroll leveling + Icy Veins' },
      ];

      let html = '';

      html += '<section class="patch-banner">';
      html += '  <div class="patch-banner-title"><i class="fa-solid fa-fire"></i> Patch ' + meta.version + ' ' + meta.name + '</div>';
      html += '  <div class="patch-banner-meta">Season ' + meta.season + ' &middot; ' + meta.seasonName + ' &middot; Launched ' + meta.releaseDate + '</div>';
      html += '  <div class="patch-banner-compiled">Data compiled ' + ((window.D4_DATA && window.D4_DATA.compiledAt) || 'unknown') + '</div>';
      html += '</section>';

      html += '<section class="patch-section">';
      html += '  <h2 class="patch-section-name">Data Freshness</h2>';
      html += '  <p class="patch-section-desc">Source attribution and confidence rating per data layer.</p>';
      html += '  <div class="patch-layers">';
      for (const layer of layers) {
        html += '<div class="patch-layer">';
        html += '  <div class="patch-layer-text">';
        html += '    <div class="patch-layer-label">' + escapeHtml(layer.label) + '</div>';
        html += '    <div class="patch-layer-source">' + escapeHtml(layer.source) + '</div>';
        html += '  </div>';
        html += '  <span class="wt-conf wt-conf-' + layer.confidence.toLowerCase() + '">' + layer.confidence + '</span>';
        html += '</div>';
      }
      html += '  </div>';
      html += '</section>';

      html += '<section class="patch-section">';
      html += '  <h2 class="patch-section-name">Sources</h2>';
      html += '  <ul class="patch-sources">';
      for (const s of (meta.sources || [])) {
        html += '<li><a href="' + s.url + '" target="_blank" rel="noopener"><strong>' + escapeHtml(s.name) + '</strong></a> &middot; <span>' + escapeHtml(s.role) + '</span></li>';
      }
      html += '  </ul>';
      html += '</section>';

      root.innerHTML = html;
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
            QuickUpdate.renderAll();
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
            QuickUpdate.renderAll();
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
    Sidebar.init();
    QuickUpdate.init();
    Router.init();
    initIO();
    QuickUpdate.renderAll();

    const moreBtn = document.getElementById('moreBtn');
    if (moreBtn) moreBtn.addEventListener('click', () => Modal.open('modalMore'));

    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    if (settingsBtn && settingsMenu) {
      const closeSettings = () => {
        settingsMenu.hidden = true;
        settingsBtn.setAttribute('aria-expanded', 'false');
      };
      const openSettings = () => {
        settingsMenu.hidden = false;
        settingsBtn.setAttribute('aria-expanded', 'true');
      };
      settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (settingsMenu.hidden) openSettings(); else closeSettings();
      });
      document.addEventListener('click', (e) => {
        if (settingsMenu.hidden) return;
        if (e.target.closest('#settingsMenu')) {
          closeSettings();
          return;
        }
        if (!e.target.closest('#settingsBtn')) closeSettings();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !settingsMenu.hidden) closeSettings();
      });
    }

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
  window.D4 = { AppState, Router, QuickUpdate, Dashboard, Walkthrough, SkillTimeline, Controller, Skills, Shards, Aspects, Paragon, Uniques, Bosses, Endbuild, Talismans, WarPlans, Mercenary, Patch, Toast, Modal, Nav };

})();
