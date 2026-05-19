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
    phaseComplete: 'd4_warlock_phase_complete_v1',
    phaseToggleSnapshot: 'd4_warlock_phase_toggle_snapshot_v1',
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
    gearCompare: 'd4_warlock_gearcompare_v1',
    acquisition: 'd4_warlock_acquisition_v1',
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
    phaseComplete: {},
    phaseToggleSnapshot: {},
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
    gearCompare: {
      activeSlot: 'daggers',
      slots: {},
    },
    acquisition: {},
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
        LevelingPathHeader.render();
        Walkthrough.render();
        SkillTimeline.render();
        Controller.render();
      }
      if (this.current === 'skills-reference') {
        Skills.render();
      }
      if (this.current === 'endgame-build') {
        EndgameGear.render();
        EndgameSystems.render();
        EndgameProgression.render();
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
      if (this.current === 'gear-comparison') {
        Acquisition.render();
        GearCompare.render();
      }
      if (this.current === 'slot-reference') {
        Talismans.render();
        RunesGems.render();
        HoradricCube.render();
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

  // Markup sink for the endgame views. Content is built only from static
  // template literals plus escapeHtml() sanitized data, no user supplied
  // HTML reaches this. Centralized so the trust boundary is one function.
  function paint(el, markup) {
    if (el) el.innerHTML = markup;
  }

  // ========================================
  // SHARED RENDER TEMPLATES (Sprint 5)
  // 5 helpers used by the endgame overhaul views.
  // ========================================
  // Diablo 4 rarity color system. Drives item frame colors.
  const RARITY = {
    mythic:    { key: 'mythic',    color: '#d2691e', label: 'Mythic' },
    unique:    { key: 'unique',    color: '#c8893f', label: 'Unique' },
    legendary: { key: 'legendary', color: '#b8651f', label: 'Legendary' },
    rare:      { key: 'rare',      color: '#d4c44a', label: 'Rare' },
    magic:     { key: 'magic',     color: '#5a8fd4', label: 'Magic' },
    common:    { key: 'common',    color: '#9aa0a6', label: 'Common' },
  };

  function rarityOf(item) {
    const t = ((item && item.type) || '').toLowerCase();
    if (t.indexOf('mythic') !== -1) return RARITY.mythic;
    if (t.indexOf('unique') !== -1) return RARITY.unique;
    if (t.indexOf('legend') !== -1) return RARITY.legendary;
    if (t.indexOf('rare') !== -1) return RARITY.rare;
    if (t.indexOf('magic') !== -1) return RARITY.magic;
    return RARITY.common;
  }

  // Inline SVG slot silhouettes. currentColor fill so CSS controls tint.
  const SLOT_SVG = {
    helm:    '<path d="M12 3C7.6 3 5 6.6 5 11v6h3v-4h8v4h3v-6c0-4.4-2.6-8-7-8z"/>',
    chest:   '<path d="M5 5l3-2 4 2 4-2 3 2-1.5 15h-11z"/>',
    gloves:  '<path d="M8 3v7l-2 1v6a4 4 0 004 4h2a4 4 0 004-4v-7h-2v3h-1V4h-2v6h-1V3z"/>',
    pants:   '<path d="M6 3h12l-1 9-2 9h-3l-1-7-1 7H8L7 12z"/>',
    boots:   '<path d="M9 3h3v9l6 3v4H6v-8l3-1z"/>',
    amulet:  '<path d="M5 4l7 6 7-6-1.5 3-4 3.5 2 3a3.5 3.5 0 11-7 0l2-3-4-3.5z"/>',
    ring:    '<path d="M12 5a7 7 0 100 14 7 7 0 000-14zm0 4.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z"/>',
    dagger:  '<path d="M14 2l5 5-7 7 1 1-2 2-2-2-3 3-1-1 3-3-2-2 2-2 1 1 7-7z"/>',
    focus:   '<path d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"/>',
    rune:    '<path d="M5 4h14v8.5c0 4.5-3.2 6.5-7 7.5-3.8-1-7-3-7-7.5z"/>',
    gem:     '<path d="M12 2l7 6-7 14-7-14z"/>',
    seal:    '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
  };

  function slotSvg(name, cls) {
    const body = SLOT_SVG[name] || SLOT_SVG.gem;
    return '<svg class="' + (cls || 'ec-slot-svg') + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + body + '</svg>';
  }

  const Templates = {
    rarityOf,
    slotSvg,

    /* Visual stat-priority item card. Big rarity frame icon, prominent name,
       large numbered priorities, text collapsed. Matches the Maxroll style. */
    renderItemCard(item, opts) {
      opts = opts || {};
      if (!item || !item.name) return '';
      const conf = (item.confidence || 'MEDIUM').toLowerCase();
      const svgName = opts.svgName || 'gem';
      const slotLabel = opts.slotLabel || '';
      const isAlt = !!opts.isAlt;
      const r = rarityOf(item);

      let html = '';
      html += '<article class="ec-item ec-rar-' + r.key + (isAlt ? ' ec-item-alt' : '') + '" style="--rar:' + r.color + '">';
      html += '  <div class="ec-item-frame">';
      html += '    <div class="ec-item-icon">' + slotSvg(svgName, 'ec-slot-svg') + '</div>';
      html += '    <span class="ec-item-rarity">' + r.label + '</span>';
      html += '  </div>';
      html += '  <div class="ec-item-body">';
      html += '    <header class="ec-item-head">';
      if (slotLabel) html += '<div class="ec-item-slot">' + escapeHtml(slotLabel) + '</div>';
      html += '      <h3 class="ec-item-name">' + escapeHtml(item.name) + '</h3>';
      html += '      <div class="ec-item-tags">';
      if (item.tier) html += '<span class="ec-tag ec-tag-tier">' + escapeHtml(item.tier) + '</span>';
      html += '<span class="aspect-priority rg-conf-' + conf + '">' + (item.confidence || 'MEDIUM') + '</span>';
      html += '      </div>';
      html += '    </header>';

      // Source chip stays at the top, it answers "where do I get this"
      if (item.source && item.source.name) {
        html += '    <div class="ec-chips">';
        html += '<div class="ec-chip ec-chip-source"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ' + escapeHtml(item.source.name) + (item.source.type ? ' (' + escapeHtml(item.source.type) + ')' : '') + '</div>';
        html += '    </div>';
      }

      // Consolidated, always visible sub-sections per slot
      if (item.affixes && item.affixes.length) {
        html += '    <div class="ec-block">';
        html += '      <div class="ec-block-label">Stat Priority</div>';
        html += '      <ol class="ec-affix-list">';
        for (const a of item.affixes) {
          if (!a || !a.stat) continue;
          const mustClass = a.mustHave ? ' is-must' : '';
          const defClass = a.buildDefining ? ' is-build-defining' : '';
          html += '<li class="ec-affix' + mustClass + defClass + '">';
          html += '  <span class="ec-affix-n">' + (a.rank || '') + '</span>';
          html += '  <span class="ec-affix-stat">' + escapeHtml(a.stat) + '</span>';
          if (a.buildDefining) html += '<span class="ec-affix-flag ec-flag-defining">KEY</span>';
          else if (a.mustHave) html += '<span class="ec-affix-flag ec-flag-must">MUST</span>';
          html += '</li>';
        }
        html += '      </ol>';
        html += '    </div>';
      }

      // Aspect (primary plus backups)
      html += '    <div class="ec-block ec-block-aspect">';
      html += '      <div class="ec-block-label">Aspect</div>';
      if (item.aspect) {
        html += '      <div class="ec-bk-best"><span class="ec-bk-tag">Best</span> ' + escapeHtml(item.aspect) + '</div>';
        if (item.aspectAlternatives && item.aspectAlternatives.length) {
          html += '      <div class="ec-bk-alt"><span class="ec-bk-tag ec-bk-tag-alt">Backups</span> ' + item.aspectAlternatives.map((a) => escapeHtml(a)).join(', ') + '</div>';
        }
      } else {
        html += '      <div class="ec-bk-na">Unique power, no aspect to imprint</div>';
      }
      html += '    </div>';

      // Tempering plus Masterwork side by side
      html += '    <div class="ec-block-row">';
      if (item.tempering) {
        html += '<div class="ec-block ec-block-temper"><div class="ec-block-label">Tempering</div><div class="ec-block-val">' + escapeHtml(item.tempering) + '</div></div>';
      }
      if (item.masterworkPrimary) {
        html += '<div class="ec-block ec-block-mw"><div class="ec-block-label">Masterwork crit</div><div class="ec-block-val">' + escapeHtml(item.masterworkPrimary) + '</div></div>';
      }
      html += '    </div>';

      // Sockets (best plus backup gem or runeword)
      html += '    <div class="ec-block ec-block-socket">';
      html += '      <div class="ec-block-label">Sockets ' + (typeof item.sockets === 'number' ? '(' + item.sockets + ')' : '') + '</div>';
      if (typeof item.sockets === 'number' && item.sockets > 0) {
        const best = item.socketContents || (opts.socketBest || 'See runes and gems reference');
        html += '      <div class="ec-bk-best"><span class="ec-bk-tag">Best</span> ' + escapeHtml(best) + '</div>';
        if (opts.socketBackup) {
          html += '      <div class="ec-bk-alt"><span class="ec-bk-tag ec-bk-tag-alt">Backup</span> ' + escapeHtml(opts.socketBackup) + '</div>';
        }
      } else {
        html += '      <div class="ec-bk-na">No sockets on this slot in D4</div>';
      }
      html += '    </div>';

      if (item.notes) {
        html += '    <details class="ec-deep"><summary>Why this</summary><p class="ec-notes">' + escapeHtml(item.notes) + '</p></details>';
      }

      html += '  </div>';
      html += '</article>';
      return html;
    },

    /* Visual gear loadout, paper-doll style like the in game character screen.
       10 slot tiles laid out around a center build crest. Tap a tile to
       expand its detail card below. */
    renderGearLoadout(gear, opts) {
      opts = opts || {};
      const tile = (key, slot) => {
        if (!slot || !slot.primary) return '';
        const r = rarityOf(slot.primary);
        let h = '';
        h += '<button type="button" class="ec-ld-tile ec-rar-' + r.key + '" data-ld-slot="' + escapeHtml(key) + '" style="--rar:' + r.color + '">';
        h += '  <span class="ec-ld-icon">' + slotSvg(slot.svgName || 'gem', 'ec-slot-svg') + '</span>';
        h += '  <span class="ec-ld-text">';
        h += '    <span class="ec-ld-slotname">' + escapeHtml(slot.slot) + '</span>';
        h += '    <span class="ec-ld-itemname">' + escapeHtml(slot.primary.name) + '</span>';
        h += '  </span>';
        h += '</button>';
        return h;
      };
      const leftKeys = ['helm', 'chest', 'gloves', 'pants', 'boots'];
      const rightKeys = ['amulet', 'ring1', 'ring2', 'mainHand', 'offhand'];
      let html = '';
      html += '<div class="ec-loadout">';
      html += '  <div class="ec-ld-col ec-ld-left">';
      for (const k of leftKeys) html += tile(k, gear[k]);
      html += '  </div>';
      html += '  <div class="ec-ld-center">';
      html += '    <div class="ec-ld-crest">' + slotSvg('rune', 'ec-crest-svg') + '</div>';
      html += '    <div class="ec-ld-crest-name">' + escapeHtml(opts.buildName || 'Dread Claws Mastermind') + '</div>';
      html += '    <div class="ec-ld-hint">Tap any slot to see its stat priority</div>';
      html += '  </div>';
      html += '  <div class="ec-ld-col ec-ld-right">';
      for (const k of rightKeys) html += tile(k, gear[k]);
      html += '  </div>';
      html += '</div>';
      return html;
    },

    /* Radial talisman wheel. Seal in the center, charm slots around it.
       Matches the in game talisman UI. */
    renderTalismanWheel(tal, opts) {
      opts = opts || {};
      const charmCount = opts.charmCount || 6;
      let html = '';
      html += '<div class="ec-wheel">';
      html += '  <div class="ec-wheel-ring">';
      html += '    <div class="ec-wheel-center" title="Seal">';
      html += '      ' + slotSvg('seal', 'ec-wheel-svg') + '';
      html += '      <span class="ec-wheel-center-label">Seal</span>';
      html += '    </div>';
      for (let i = 0; i < charmCount; i++) {
        const ang = (i / charmCount) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + 38 * Math.cos(ang);
        const y = 50 + 38 * Math.sin(ang);
        html += '<div class="ec-wheel-node" style="left:' + x.toFixed(1) + '%;top:' + y.toFixed(1) + '%">' + slotSvg('gem', 'ec-wheel-node-svg') + '<span>' + (i + 1) + '</span></div>';
      }
      html += '  </div>';
      html += '</div>';
      return html;
    },

    /* Rune socket strip. The connected D4 rune sockets like Cem-Ceh-Cir-Prid. */
    renderRuneSockets(pairs) {
      let html = '<div class="ec-runes">';
      for (const p of (pairs || [])) {
        const names = String(p.pair || '').split(' plus ');
        html += '<div class="ec-rune-pair">';
        html += '  <div class="ec-rune-pair-slot">' + escapeHtml(p.slot || '') + '</div>';
        html += '  <div class="ec-rune-sockets">';
        for (let i = 0; i < names.length; i++) {
          html += '<div class="ec-rune-socket">' + slotSvg('rune', 'ec-rune-svg') + '<span class="ec-rune-name">' + escapeHtml(names[i].trim()) + '</span></div>';
          if (i < names.length - 1) html += '<span class="ec-rune-link"></span>';
        }
        html += '  </div>';
        if (p.tier) html += '<span class="ec-tier-badge ec-rune-tier">' + escapeHtml(p.tier) + '</span>';
        html += '  <div class="ec-rune-effect">' + escapeHtml(p.effect || '') + '</div>';
        html += '</div>';
      }
      html += '</div>';
      return html;
    },

    /* Primary vs backup comparison. Side by side desktop, accordion mobile. */
    renderComparisonPair(primary, backup, opts) {
      opts = opts || {};
      const slotLabel = opts.slotLabel || '';
      const svgName = opts.svgName || 'gem';
      const socketBackup = opts.socketBackup || '';
      let html = '';
      html += '<section class="ec-pair" data-section="' + escapeHtml(opts.section || '') + '">';
      if (slotLabel) html += '  <header class="ec-pair-head">' + slotSvg(svgName, 'ec-pair-svg') + ' ' + escapeHtml(slotLabel) + '</header>';
      html += '  <div class="ec-pair-body">';
      html += '    <div class="ec-pair-col ec-pair-primary">';
      html += '      <div class="ec-pair-flag ec-pair-flag-primary"><i class="fa-solid fa-star" aria-hidden="true"></i> Primary</div>';
      html += Templates.renderItemCard(primary, { svgName, slotLabel: '', socketBackup });
      html += '    </div>';
      html += '    <details class="ec-pair-col ec-pair-backup">';
      html += '      <summary class="ec-pair-flag ec-pair-flag-backup"><i class="fa-solid fa-shuffle" aria-hidden="true"></i> Backup option</summary>';
      html += Templates.renderItemCard(backup, { svgName, slotLabel: '', isAlt: true, socketBackup });
      html += '    </details>';
      html += '  </div>';
      html += '</section>';
      return html;
    },

    /* Ordered step list. Used for paragon, glyph leveling, difficulty path. */
    renderStepList(steps, opts) {
      opts = opts || {};
      const persistKey = opts.persistKey || null;
      let html = '';
      html += '<ol class="ec-step-list">';
      for (const s of (steps || [])) {
        const rank = s.rank || s.step || s.n || '';
        const text = s.action || s.target || s.note || s.label || s.text || '';
        const sub = s.note && (s.target || s.action) ? s.note : '';
        const conf = s.confidence ? s.confidence.toLowerCase() : '';
        html += '<li class="ec-step">';
        html += '  <span class="ec-step-n">' + escapeHtml(String(rank)) + '</span>';
        html += '  <div class="ec-step-body">';
        if (s.level) html += '<div class="ec-step-label">' + escapeHtml(s.level) + '</div>';
        html += '    <div class="ec-step-text">' + escapeHtml(text) + '</div>';
        if (sub) html += '<div class="ec-step-sub">' + escapeHtml(sub) + '</div>';
        if (conf) html += '<span class="aspect-priority rg-conf-' + conf + ' ec-step-conf">' + s.confidence + '</span>';
        html += '  </div>';
        html += '</li>';
      }
      html += '</ol>';
      return html;
    },

    /* Tier grouped list. Used for runes, mercs, pit, war plans, activities. */
    renderTierList(items, tierField, opts) {
      opts = opts || {};
      tierField = tierField || 'tier';
      const tiers = {};
      const tierOrder = [];
      for (const it of (items || [])) {
        const t = it[tierField] || 'n/a';
        if (!tiers[t]) {
          tiers[t] = [];
          tierOrder.push(t);
        }
        tiers[t].push(it);
      }
      const labelField = opts.labelField || 'name';
      const subField = opts.subField || 'role';
      let html = '<div class="ec-tier-list">';
      for (const t of tierOrder) {
        html += '<div class="ec-tier-group ec-tier-' + escapeHtml(String(t).toLowerCase().replace(/[^a-z0-9]/g, '')) + '">';
        html += '  <div class="ec-tier-head"><span class="ec-tier-badge">' + escapeHtml(String(t)) + '</span></div>';
        html += '  <ul class="ec-tier-rows">';
        for (const it of tiers[t]) {
          const label = it[labelField] || it.activity || it.pair || it.name || '';
          const sub = it[subField] || it.effect || it.note || '';
          const conf = it.confidence ? it.confidence.toLowerCase() : '';
          html += '<li class="ec-tier-row">';
          html += '  <span class="ec-tier-row-name">' + escapeHtml(label) + '</span>';
          if (sub) html += '<span class="ec-tier-row-sub">' + escapeHtml(sub) + '</span>';
          if (conf) html += '<span class="aspect-priority rg-conf-' + conf + '">' + it.confidence + '</span>';
          html += '</li>';
        }
        html += '  </ul>';
        html += '</div>';
      }
      html += '</div>';
      return html;
    },

    /* Filterable searchable grid. Used for acquisition lookup, codex. */
    renderLookupGrid(items, filters, opts) {
      opts = opts || {};
      const id = opts.id || 'ec-lookup';
      const labelKey = opts.labelKey || 'name';
      const subKey = opts.subKey || 'sources';
      let html = '<div class="ec-lookup" id="' + escapeHtml(id) + '">';
      html += '  <div class="ec-lookup-controls">';
      html += '    <input type="search" class="ec-lookup-search" placeholder="Search ' + escapeHtml(opts.searchPlaceholder || 'items') + '..." data-' + escapeHtml(id) + '-search />';
      if (filters && filters.length) {
        for (const f of filters) {
          html += '<select class="ec-lookup-filter" data-' + escapeHtml(id) + '-filter="' + escapeHtml(f.key) + '">';
          html += '<option value="">' + escapeHtml(f.label || 'All') + '</option>';
          for (const opt of (f.options || [])) {
            html += '<option value="' + escapeHtml(opt) + '">' + escapeHtml(opt) + '</option>';
          }
          html += '</select>';
        }
      }
      html += '  </div>';
      html += '  <div class="ec-lookup-grid">';
      for (const it of (items || [])) {
        const label = it[labelKey] || '';
        const sub = it[subKey];
        const subText = Array.isArray(sub) ? sub.join(', ') : (sub || '');
        html += '<div class="ec-lookup-cell" data-label="' + escapeHtml(String(label).toLowerCase()) + '">';
        html += '  <div class="ec-lookup-name">' + escapeHtml(label) + '</div>';
        if (subText) html += '<div class="ec-lookup-sub">' + escapeHtml(subText) + '</div>';
        html += '</div>';
      }
      html += '  </div>';
      html += '</div>';
      return html;
    },
  };

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
      LevelingPathHeader.render();
      Walkthrough.render();
      SkillTimeline.render();
      Controller.render();
      Skills.render();
      Shards.render();
      Aspects.render();
      Paragon.render();
      Uniques.render();
      Bosses.render();
      EndgameGear.render();
      EndgameSystems.render();
      EndgameProgression.render();
      Endbuild.render();
      Talismans.render();
      RunesGems.render();
      HoradricCube.render();
      Acquisition.render();
      GearCompare.render();
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
      const phaseComplete = AppState.data.phaseComplete || {};
      const respec = AppState.data.skills.respec || {};
      const currentPhaseId = this.getCurrentPhaseId(c.level, phases);

      const totalSteps = phases.reduce((n, p) => n + p.steps.length, 0);
      const doneSteps = phases.reduce((n, p) => {
        return n + p.steps.filter((s) => wt[p.id + ':' + s.id]).length;
      }, 0);
      const globalPct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

      const pastPhases = phases.filter((p) => p.levelMax < c.level);
      const pastStepCount = pastPhases.reduce((n, p) => n + p.steps.length, 0);
      const pastStepsAlreadyDone = pastPhases.reduce((n, p) => {
        return n + p.steps.filter((s) => wt[p.id + ':' + s.id]).length;
      }, 0);
      const catchUpRemaining = pastStepCount - pastStepsAlreadyDone;
      const pastRespecsToAck = phases.filter((p) => {
        return p.respec && p.respec.trigger && p.respec.level <= c.level && !respec['lv' + p.respec.level];
      });
      const catchUpDisabled = catchUpRemaining === 0 && pastRespecsToAck.length === 0;

      let html = '';
      html += '<div class="wt-summary">';
      html += '  <div class="wt-summary-row">';
      html += '    <div class="wt-summary-label">Overall</div>';
      html += '    <div class="wt-summary-pct">' + globalPct + '%</div>';
      html += '  </div>';
      html += '  <div class="wt-summary-bar"><div class="wt-summary-fill" style="width:' + globalPct + '%"></div></div>';
      html += '  <div class="wt-summary-meta">' + doneSteps + ' of ' + totalSteps + ' steps complete, character Level ' + c.level + '</div>';
      html += '</div>';

      html += '<div class="wt-catchup">';
      html += '  <button class="btn btn-primary wt-catchup-btn" type="button" data-catchup="1"' + (catchUpDisabled ? ' disabled' : '') + '>';
      html += '    <i class="fa-solid fa-forward" aria-hidden="true"></i> ';
      if (catchUpDisabled) {
        html += 'Past phases already caught up';
      } else if (pastPhases.length === 0) {
        html += 'Nothing to catch up yet';
      } else {
        html += 'Catch Up: mark ' + catchUpRemaining + ' past step' + (catchUpRemaining === 1 ? '' : 's') + ' complete';
      }
      html += '  </button>';
      html += '  <div class="wt-catchup-meta">';
      if (pastPhases.length === 0) {
        html += 'You are in the first phase. No prior phases to mark complete.';
      } else {
        html += 'Bulk checks every step in ' + pastPhases.length + ' phase' + (pastPhases.length === 1 ? '' : 's') + ' below Lv ' + c.level + '. Auto-acknowledges any respec at or below your current level. The current phase stays manual.';
      }
      html += '  </div>';
      html += '</div>';

      for (const p of phases) {
        const isCurrent = p.id === currentPhaseId;
        const isPast = c.level > p.levelMax;
        const isPhaseDone = !!phaseComplete[p.id];
        const isIncompletePast = isPast && !isPhaseDone;
        const phaseDone = p.steps.filter((s) => wt[p.id + ':' + s.id]).length;
        const phasePct = p.steps.length > 0 ? Math.round((phaseDone / p.steps.length) * 100) : 0;
        const stateClass = isCurrent ? 'is-current' : isPast ? 'is-past' : 'is-future';
        const completeClass = isPhaseDone ? ' is-phase-complete' : '';
        const incompleteClass = isIncompletePast ? ' is-incomplete-past' : '';

        html += '<section class="wt-phase ' + stateClass + completeClass + incompleteClass + '" data-phase="' + p.id + '">';
        if (isCurrent || isIncompletePast) {
          html += '<div class="wt-phase-status-banner">';
          if (isCurrent) {
            html += '<span class="wt-status-badge wt-status-current"><i class="fa-solid fa-location-crosshairs" aria-hidden="true"></i> CURRENT</span>';
          } else if (isIncompletePast) {
            html += '<span class="wt-status-badge wt-status-incomplete"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> INCOMPLETE</span>';
          }
          html += '</div>';
        }
        html += '  <button class="wt-phase-complete-toggle' + (isPhaseDone ? ' is-on' : '') + '" type="button" data-phase-complete="' + p.id + '" aria-pressed="' + (isPhaseDone ? 'true' : 'false') + '">';
        html += '    <span class="wt-pcb-check"><i class="fa-solid ' + (isPhaseDone ? 'fa-check' : 'fa-square') + '" aria-hidden="true"></i></span>';
        html += '    <span class="wt-pcb-label">' + (isPhaseDone ? 'Phase Complete (tap to undo)' : 'Mark Phase Complete') + '</span>';
        html += '  </button>';
        html += '  <header class="wt-phase-head">';
        html += '    <div class="wt-phase-meta">';
        html += '      <span class="wt-phase-range">Lv ' + p.levelMin + (p.levelMax >= 999 ? '+' : ' to ' + p.levelMax) + '</span>';
        html += '      <span class="wt-conf wt-conf-' + (p.confidence || 'MEDIUM').toLowerCase() + '">' + (p.confidence || 'MEDIUM') + '</span>';
        html += '    </div>';
        html += '    <h2 class="wt-phase-title">' + escapeHtml(p.name) + '</h2>';
        html += '    <p class="wt-phase-summary">' + escapeHtml(p.summary) + '</p>';
        html += '    <div class="wt-phase-bar"><div class="wt-phase-fill" style="width:' + phasePct + '%"></div></div>';
        html += '    <div class="wt-phase-progress">' + phaseDone + ' / ' + p.steps.length + ' steps</div>';
        html += '    <a class="wt-jump-link" href="#stRow' + p.levelMin + '" data-jump="timeline:' + p.levelMin + '"><i class="fa-solid fa-arrow-down-long" aria-hidden="true"></i> Jump to Skill Timeline (Lv ' + p.levelMin + ')</a>';
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
        const respecBtn = e.target.closest && e.target.closest('[data-respec]');
        if (respecBtn) {
          const n = respecBtn.getAttribute('data-respec');
          const key = 'lv' + n;
          AppState.data.skills.respec[key] = true;
          AppState.save('skills');
          Toast.show('Respec ' + n + ' acknowledged', 'success');
          Walkthrough.render();
          return;
        }
        const phaseBtn = e.target.closest && e.target.closest('[data-phase-complete]');
        if (phaseBtn) {
          const phaseId = phaseBtn.getAttribute('data-phase-complete');
          Walkthrough.togglePhaseComplete(phaseId);
          return;
        }
        const catchUpBtn = e.target.closest && e.target.closest('[data-catchup]');
        if (catchUpBtn && !catchUpBtn.disabled) {
          Walkthrough.catchUp();
          return;
        }
      });
    },

    catchUp() {
      const phases = (window.D4_DATA && window.D4_DATA.walkthrough) || [];
      if (!phases.length) return;
      const currentLevel = AppState.data.character.level;
      const wt = AppState.data.walkthrough;
      const pc = AppState.data.phaseComplete;
      const snap = AppState.data.phaseToggleSnapshot;
      const respec = AppState.data.skills.respec;

      let stepsChecked = 0;
      let phasesClosed = 0;
      let respecsAcked = 0;

      for (const p of phases) {
        if (p.levelMax >= currentLevel) continue;
        const snapshot = snap[p.id] || {};
        for (const s of p.steps) {
          const key = p.id + ':' + s.id;
          if (!wt[key]) {
            wt[key] = true;
            stepsChecked++;
          }
          if (!(s.id in snapshot)) snapshot[s.id] = false;
        }
        if (!pc[p.id]) {
          pc[p.id] = true;
          phasesClosed++;
        }
        snap[p.id] = snapshot;
      }

      for (const p of phases) {
        if (!p.respec || !p.respec.trigger) continue;
        if (p.respec.level > currentLevel) continue;
        const k = 'lv' + p.respec.level;
        if (!respec[k]) {
          respec[k] = true;
          respecsAcked++;
        }
      }

      AppState.save('walkthrough');
      AppState.save('phaseComplete');
      AppState.save('phaseToggleSnapshot');
      AppState.save('skills');

      const parts = [];
      if (stepsChecked) parts.push(stepsChecked + ' step' + (stepsChecked === 1 ? '' : 's'));
      if (phasesClosed) parts.push(phasesClosed + ' phase' + (phasesClosed === 1 ? '' : 's'));
      if (respecsAcked) parts.push(respecsAcked + ' respec' + (respecsAcked === 1 ? '' : 's'));
      const msg = parts.length ? 'Caught up: ' + parts.join(', ') : 'Already caught up';

      Toast.show(msg, 'success');
      Walkthrough.render();
      Dashboard.render();
      Nav.updateBadges();
    },

    togglePhaseComplete(phaseId) {
      const phases = (window.D4_DATA && window.D4_DATA.walkthrough) || [];
      const phase = phases.find((p) => p.id === phaseId);
      if (!phase) return;
      const wt = AppState.data.walkthrough;
      const pc = AppState.data.phaseComplete;
      const snap = AppState.data.phaseToggleSnapshot;
      const wasOn = !!pc[phaseId];

      if (!wasOn) {
        const snapshot = {};
        for (const s of phase.steps) {
          const key = phaseId + ':' + s.id;
          snapshot[s.id] = !!wt[key];
          wt[key] = true;
        }
        snap[phaseId] = snapshot;
        pc[phaseId] = true;
        Toast.show('Phase complete: ' + phase.name, 'success');
      } else {
        const snapshot = snap[phaseId] || {};
        for (const s of phase.steps) {
          const key = phaseId + ':' + s.id;
          if (snapshot[s.id] === false) {
            wt[key] = false;
          }
        }
        delete snap[phaseId];
        pc[phaseId] = false;
        Toast.show('Phase reopened: ' + phase.name, 'info');
      }

      AppState.save('walkthrough');
      AppState.save('phaseComplete');
      AppState.save('phaseToggleSnapshot');
      Walkthrough.render();
      Dashboard.render();
      Nav.updateBadges();
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

        const rowIdAttr = ' id="stRow' + lv + '"' + (isCurrent ? ' data-current="1"' : '');
        html += '<li class="' + classList + '" data-level="' + lv + '"' + rowIdAttr + '>';
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
        html += '    <span class="st-row-jump" data-jump="controller" role="button" tabindex="0" title="Jump to Controller bindings"><i class="fa-solid fa-gamepad" aria-hidden="true"></i></span>';
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
        const target = root.querySelector('[data-current="1"]');
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
        if (e.target.closest && e.target.closest('[data-jump]')) return;
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

      html += '<div class="ctl-caveat"><i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>Button placement is Maxroll canonical. Customization is a candidate for a future pass.</span></div>';

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
  // LEVELING PATH HEADER (Sprint 2 Part E)
  // ========================================
  const LevelingPathHeader = {
    bound: false,

    render() {
      const root = document.getElementById('levelingPathHeaderRoot');
      if (!root) return;
      const c = AppState.data.character || { level: 1 };
      const phases = (window.D4_DATA && window.D4_DATA.walkthrough) || [];
      const cb = (window.D4_DATA && window.D4_DATA.controllerBindings) || null;
      const lv = c.level || 1;

      let phaseName = '(none)';
      for (const p of phases) {
        if (lv >= p.levelMin && lv <= p.levelMax) { phaseName = p.name; break; }
      }

      let milestoneLabel = '(none)';
      if (cb && Array.isArray(cb.milestones)) {
        let cur = null;
        for (const m of cb.milestones) {
          if (typeof m.level === 'number' && m.level <= lv) cur = m;
        }
        if (cur) milestoneLabel = 'Lv ' + cur.level + ' (' + cur.label + ')';
      }

      const pct = Math.min(100, Math.round((lv / 70) * 100));

      let html = '';
      html += '<div class="lph-card">';
      html += '  <p class="lph-intro">Your path from 1 to 70. Walkthrough by phase, exact skill points per level, PS5 controller bindings as you level up.</p>';
      html += '  <div class="lph-stats">';
      html += '    <div class="lph-stat"><div class="lph-stat-key">Current Level</div><div class="lph-stat-val">' + lv + '</div></div>';
      html += '    <div class="lph-stat"><div class="lph-stat-key">Current Phase</div><div class="lph-stat-val">' + escapeHtml(phaseName) + '</div></div>';
      html += '    <div class="lph-stat"><div class="lph-stat-key">Controller Milestone</div><div class="lph-stat-val">' + escapeHtml(milestoneLabel) + '</div></div>';
      html += '    <div class="lph-stat"><div class="lph-stat-key">Through Leveling</div><div class="lph-stat-val">' + pct + '%</div></div>';
      html += '  </div>';
      html += '  <div class="lph-progress" aria-hidden="true"><div class="lph-progress-fill" style="width:' + pct + '%"></div></div>';
      html += '</div>';

      root.innerHTML = html;
      this.bind();
    },

    bind() {
      if (this.bound) return;
      this.bound = true;
      document.addEventListener('click', (e) => {
        const jumpEl = e.target.closest && e.target.closest('[data-jump]');
        if (!jumpEl) return;
        const tok = jumpEl.getAttribute('data-jump');
        if (!tok) return;
        e.preventDefault();
        LevelingPathHeader.scrollToToken(tok);
      });
    },

    scrollToToken(tok) {
      let targetId = null;
      if (tok === 'controller') {
        targetId = 'controllerRoot';
      } else if (tok.indexOf('timeline:') === 0) {
        const lv = tok.slice('timeline:'.length);
        targetId = 'stRow' + lv;
      } else if (tok === 'timeline') {
        targetId = 'skillTimelineRoot';
      } else if (tok === 'walkthrough') {
        targetId = 'walkthroughRoot';
      }
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (!el) return;
      try {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      } catch (err) {
        el.scrollIntoView();
      }
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

      // Visual hero: radial talisman wheel matching the in game UI
      html += '<section class="tal-hero">';
      html += '  <h2 class="tal-hero-title">Talisman</h2>';
      html += Templates.renderTalismanWheel(t, { charmCount: 6 });
      const eg = window.D4_ENDGAME;
      if (eg && eg.talismans) {
        html += '  <div class="tal-hero-summary">';
        html += '    <div class="tal-hero-kv"><span>Seal</span><strong>' + escapeHtml(eg.talismans.seal.canonical) + '</strong></div>';
        html += '    <div class="tal-hero-kv"><span>Charm Set</span><strong>' + escapeHtml(eg.talismans.charmSet.primary) + '</strong></div>';
        html += '  </div>';
      }
      html += '</section>';

      html += '<details class="tal-textref">';
      html += '  <summary><i class="fa-solid fa-table-list" aria-hidden="true"></i> Seal priority, charm targets, sets, full detail</summary>';

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

      html += '</details>';

      paint(root, html);
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
  // RUNES AND GEMS RENDERER
  // ========================================
  const RunesGems = {
    render() {
      const root = document.getElementById('runesGemsRoot');
      if (!root) return;
      const rg = window.D4_RUNES_GEMS;
      if (!rg || !rg.gemsPerSlot) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-gem placeholder-icon"></i><div class="placeholder-title">No runes and gems data</div><div class="placeholder-text">runesgems.js may have failed to load. Check the console.</div></div>';
        return;
      }

      let html = '';

      // Visual hero: rune sockets plus gem loadout, the scannable summary
      html += '<section class="rg-hero">';
      html += '  <h2 class="rg-hero-title">Runes, Gems and Sockets</h2>';
      const eg = window.D4_ENDGAME;
      if (eg && eg.runes && eg.runes.canonicalPairs) {
        html += '  <div class="rg-hero-block">';
        html += '    <div class="rg-hero-label">Equipped Runewords</div>';
        html += Templates.renderRuneSockets(eg.runes.canonicalPairs);
        html += '  </div>';
      }
      if (rg.loadoutSummary && rg.loadoutSummary.length) {
        html += '  <div class="rg-hero-block">';
        html += '    <div class="rg-hero-label">Gem and Socket Loadout</div>';
        html += '    <div class="rg-gem-grid">';
        for (const l of rg.loadoutSummary) {
          const empty = String(l.contents).toLowerCase().indexOf('n/a') !== -1;
          html += '<div class="rg-gem-tile' + (empty ? ' is-empty' : '') + '">';
          html += '  <div class="rg-gem-icon">' + Templates.slotSvg(empty ? 'gem' : (String(l.contents).toLowerCase().indexOf('runeword') !== -1 ? 'rune' : 'gem'), 'rg-gem-svg') + '</div>';
          html += '  <div class="rg-gem-slot">' + escapeHtml(l.slot) + '</div>';
          html += '  <div class="rg-gem-contents">' + escapeHtml(l.contents) + '</div>';
          html += '</div>';
        }
        html += '    </div>';
        html += '  </div>';
      }
      html += '</section>';

      html += '<details class="rg-textref">';
      html += '  <summary><i class="fa-solid fa-table-list" aria-hidden="true"></i> Full reference tables (rune combos, gems per slot, socket recs)</summary>';

      html += '<section class="rg-section">';
      html += '  <h2 class="rg-section-name">Runeword System</h2>';
      html += '  <div class="rg-card">';
      html += '    <p class="rg-card-lead">' + escapeHtml(rg.runewordSystem.summary) + '</p>';
      html += '    <ul class="rg-rules">';
      for (const r of rg.runewordSystem.rules) {
        html += '<li>' + escapeHtml(r) + '</li>';
      }
      html += '    </ul>';
      html += '    <div class="rg-card-meta"><i class="fa-solid fa-bullseye" aria-hidden="true"></i> ' + escapeHtml(rg.runewordSystem.buildAllocation) + '</div>';
      html += '  </div>';
      html += '</section>';

      html += '<section class="rg-section">';
      html += '  <h2 class="rg-section-name">Gems per Slot</h2>';
      for (const g of rg.gemsPerSlot) {
        html += '<div class="rg-group">';
        html += '  <div class="rg-group-head"><span class="rg-group-name">' + escapeHtml(g.group) + '</span><span class="rg-group-scope">' + escapeHtml(g.scope) + '</span></div>';
        html += '  <div class="rg-rows">';
        for (const row of g.rows) {
          html += '<div class="rg-row">';
          html += '  <div class="rg-row-head"><span class="rg-row-slot">' + escapeHtml(row.slot) + '</span><span class="aspect-priority rg-conf-' + row.confidence.toLowerCase() + '">' + row.confidence + '</span></div>';
          html += '  <div class="rg-row-body">';
          html += '    <div class="rg-kv"><span class="rg-k">Recommended</span><span class="rg-v rg-v-strong">' + escapeHtml(row.recommended) + '</span></div>';
          html += '    <div class="rg-kv"><span class="rg-k">Alternative</span><span class="rg-v">' + escapeHtml(row.alternative) + '</span></div>';
          html += '    <div class="rg-kv"><span class="rg-k">Effect</span><span class="rg-v">' + escapeHtml(row.effect) + '</span></div>';
          html += '    <div class="rg-kv"><span class="rg-k">Why</span><span class="rg-v rg-v-dim">' + escapeHtml(row.reasoning) + '</span></div>';
          html += '  </div>';
          html += '</div>';
        }
        html += '  </div>';
        html += '</div>';
      }
      html += '</section>';

      html += '<section class="rg-section">';
      html += '  <h2 class="rg-section-name">Rune Combos</h2>';

      html += '  <div class="rg-combo-group">';
      html += '    <div class="rg-combo-head"><span class="rg-combo-title">HIGH Confidence</span><span class="rg-combo-note">Maxroll, Mobalytics endgame, or Icy Veins endgame cited</span></div>';
      html += '    <div class="rg-combo-grid">';
      for (const c of rg.runeCombos.high) {
        html += '<div class="rg-combo rg-combo-tier-' + c.tier.toLowerCase() + '">';
        html += '  <div class="rg-combo-pair"><span class="rg-rune-ritual">' + escapeHtml(c.ritual) + '</span><span class="rg-combo-plus">+</span><span class="rg-rune-invoke">' + escapeHtml(c.invocation) + '</span><span class="rg-combo-tier">' + c.tier + '</span></div>';
        html += '  <div class="rg-combo-effect">' + escapeHtml(c.effect) + '</div>';
        html += '  <div class="rg-combo-source"><i class="fa-solid fa-link" aria-hidden="true"></i> ' + escapeHtml(c.source) + '</div>';
        html += '</div>';
      }
      html += '    </div>';
      html += '  </div>';

      html += '  <div class="rg-combo-group">';
      html += '    <div class="rg-combo-head"><span class="rg-combo-title">MEDIUM Confidence</span><span class="rg-combo-note">Mechanics documented, build pairing unverified</span></div>';
      html += '    <div class="rg-combo-grid">';
      for (const c of rg.runeCombos.medium) {
        html += '<div class="rg-combo rg-combo-tier-' + c.tier.toLowerCase() + ' rg-combo-medium">';
        html += '  <div class="rg-combo-pair"><span class="rg-rune-ritual">' + escapeHtml(c.ritual) + '</span><span class="rg-combo-plus">+</span><span class="rg-rune-invoke">' + escapeHtml(c.invocation) + '</span><span class="rg-combo-tier">' + c.tier + '</span></div>';
        html += '  <div class="rg-combo-effect">' + escapeHtml(c.effect) + '</div>';
        html += '  <div class="rg-combo-source"><i class="fa-solid fa-link" aria-hidden="true"></i> ' + escapeHtml(c.source) + '</div>';
        html += '</div>';
      }
      html += '    </div>';
      html += '  </div>';

      html += '  <details class="rg-combo-collapse">';
      html += '    <summary>LOW Confidence Combos (single source, documented for completeness)</summary>';
      html += '    <div class="rg-combo-grid">';
      for (const c of rg.runeCombos.low) {
        html += '<div class="rg-combo rg-combo-low">';
        html += '  <div class="rg-combo-pair"><span class="rg-rune-ritual">' + escapeHtml(c.ritual) + '</span><span class="rg-combo-plus">+</span><span class="rg-rune-invoke">' + escapeHtml(c.invocation) + '</span></div>';
        html += '  <div class="rg-combo-effect">' + escapeHtml(c.effect) + '</div>';
        html += '  <div class="rg-combo-source"><i class="fa-solid fa-link" aria-hidden="true"></i> ' + escapeHtml(c.source) + '</div>';
        html += '</div>';
      }
      html += '    </div>';
      html += '  </details>';

      html += '  <details class="rg-combo-collapse">';
      html += '    <summary>Excluded combos with citation</summary>';
      for (const ex of rg.runeCombos.excluded) {
        html += '<div class="rg-excluded">';
        html += '  <div class="rg-excluded-name">' + escapeHtml(ex.combo) + '</div>';
        html += '  <div class="rg-excluded-reason">' + escapeHtml(ex.reason) + '</div>';
        html += '  <div class="rg-combo-source"><i class="fa-solid fa-link" aria-hidden="true"></i> ' + escapeHtml(ex.source) + '</div>';
        html += '</div>';
      }
      html += '  </details>';

      html += '  <div class="rg-notes">';
      html += '    <div class="rg-note"><span class="rg-note-tag">Shadowform</span><span class="rg-note-body">' + escapeHtml(rg.runeNotes.shadowformProc) + '</span></div>';
      html += '    <div class="rg-note"><span class="rg-note-tag">Vulnerable</span><span class="rg-note-body">' + escapeHtml(rg.runeNotes.vulnerableUptime) + '</span></div>';
      html += '  </div>';
      html += '</section>';

      html += '<section class="rg-section">';
      html += '  <h2 class="rg-section-name">Socket Recommendations Per Slot</h2>';
      html += '  <div class="rg-rec-grid">';
      for (const s of rg.socketRecsPerSlot) {
        html += '<div class="rg-rec-row">';
        html += '  <div class="rg-rec-head"><span class="rg-rec-slot">' + escapeHtml(s.slot) + '</span><span class="rg-rec-sockets">' + escapeHtml(String(s.sockets)) + ' socket' + (String(s.sockets) === '1' ? '' : 's') + '</span><span class="aspect-priority rg-conf-' + s.confidence.toLowerCase() + '">' + s.confidence + '</span></div>';
        html += '  <div class="rg-rec-body">' + escapeHtml(s.contents) + '</div>';
        html += '</div>';
      }
      html += '  </div>';
      html += '</section>';

      html += '<section class="rg-section">';
      html += '  <h2 class="rg-section-name">Endgame Loadout Summary</h2>';
      html += '  <div class="rg-loadout-grid">';
      for (const l of rg.loadoutSummary) {
        html += '<div class="rg-loadout-row">';
        html += '  <div class="rg-loadout-slot">' + escapeHtml(l.slot) + '</div>';
        html += '  <div class="rg-loadout-meta"><span class="rg-loadout-sockets">' + escapeHtml(String(l.sockets)) + ' socket' + (String(l.sockets) === '1' ? '' : 's') + '</span></div>';
        html += '  <div class="rg-loadout-contents"><span class="rg-loadout-contents-label">Contents</span> ' + escapeHtml(l.contents) + '</div>';
        html += '  <div class="rg-loadout-effect"><span class="rg-loadout-effect-label">Effect</span> ' + escapeHtml(l.effect) + '</div>';
        html += '</div>';
      }
      html += '  </div>';
      html += '  <div class="rg-totals">';
      html += '    <div class="rg-total"><span class="rg-total-label">Runewords</span><span class="rg-total-value">' + escapeHtml(rg.loadoutTotals.runewords) + '</span></div>';
      html += '    <div class="rg-total"><span class="rg-total-label">Weapon Gems</span><span class="rg-total-value">' + escapeHtml(rg.loadoutTotals.weaponGems) + '</span></div>';
      html += '    <div class="rg-total"><span class="rg-total-label">Armor Gems</span><span class="rg-total-value">' + escapeHtml(rg.loadoutTotals.armorGems) + '</span></div>';
      html += '    <div class="rg-total"><span class="rg-total-label">Jewelry Gems</span><span class="rg-total-value">' + escapeHtml(rg.loadoutTotals.jewelryGems) + '</span></div>';
      html += '  </div>';
      html += '</section>';

      html += '</details>';

      paint(root, html);
    },
  };

  // ========================================
  // HORADRIC CUBE RENDERER (Lord of Hatred crafting)
  // ========================================
  const HoradricCube = {
    render() {
      const root = document.getElementById('horadricCubeRoot');
      if (!root) return;
      const hc = window.D4_ENDGAME && window.D4_ENDGAME.horadricCube;
      if (!hc) {
        paint(root, '<div class="placeholder-card"><i class="fa-solid fa-cube placeholder-icon"></i><div class="placeholder-title">No Horadric Cube data</div><div class="placeholder-text">endgamedata.js may have failed to load.</div></div>');
        return;
      }
      const priClass = (p) => 'rg-conf-' + String(p || 'MEDIUM').toLowerCase();
      let html = '';

      html += '<section class="hc-hero">';
      html += '  <h2 class="hc-hero-title"><i class="fa-solid fa-cube" aria-hidden="true"></i> Horadric Cube</h2>';
      html += '  <p class="hc-hero-sub">' + escapeHtml(hc.overview) + '</p>';
      html += '  <div class="hc-hero-meta"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ' + escapeHtml(hc.unlock) + '</div>';
      html += '</section>';

      // The critical correction, surfaced loud
      if (hc.litanyClarification) {
        html += '<section class="hc-warn">';
        html += '  <div class="hc-warn-head"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ' + escapeHtml(hc.litanyClarification.headline) + '</div>';
        html += '  <p class="hc-warn-body">' + escapeHtml(hc.litanyClarification.detail) + '</p>';
        html += '</section>';
      }

      // Build workflow, the actionable order
      if (hc.buildWorkflow && hc.buildWorkflow.length) {
        html += '<section class="hc-section">';
        html += '  <h3 class="hc-section-title">How this build uses the Cube</h3>';
        html += '  <ol class="ec-step-list">';
        let n = 1;
        for (const step of hc.buildWorkflow) {
          html += '<li class="ec-step"><span class="ec-step-n">' + (n++) + '</span><div class="ec-step-body"><div class="ec-step-text">' + escapeHtml(step) + '</div></div></li>';
        }
        html += '  </ol>';
        html += '</section>';
      }

      // Recipes, sorted build priority HIGH first
      if (hc.recipes && hc.recipes.length) {
        const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        const recipes = hc.recipes.slice().sort((a, b) => (order[a.priority] || 9) - (order[b.priority] || 9));
        html += '<section class="hc-section">';
        html += '  <h3 class="hc-section-title">Recipes that matter for this build</h3>';
        html += '  <div class="hc-recipes">';
        for (const r of recipes) {
          html += '<div class="hc-recipe hc-pri-' + String(r.priority || 'medium').toLowerCase() + '">';
          html += '  <div class="hc-recipe-head"><span class="hc-recipe-name">' + escapeHtml(r.name) + '</span><span class="aspect-priority ' + priClass(r.priority) + '">' + escapeHtml(r.priority || 'MEDIUM') + '</span></div>';
          html += '  <div class="hc-recipe-fn">' + escapeHtml(r.fn) + '</div>';
          html += '  <div class="hc-recipe-use"><span class="hc-kv-label">Build use</span> ' + escapeHtml(r.buildUse) + '</div>';
          html += '  <details class="hc-recipe-mat"><summary>Materials</summary><div>' + escapeHtml(r.materials) + '</div></details>';
          html += '</div>';
        }
        html += '  </div>';
        html += '</section>';
      }

      // Tuning prisms
      if (hc.tuningPrisms && hc.tuningPrisms.length) {
        html += '<details class="hc-fold">';
        html += '  <summary><i class="fa-solid fa-prism" aria-hidden="true"></i> Tuning Prisms (affix category control)</summary>';
        html += '  <div class="hc-prisms">';
        for (const p of hc.tuningPrisms) {
          html += '<div class="hc-prism hc-pri-' + String(p.priority || 'medium').toLowerCase() + '">';
          html += '  <div class="hc-prism-name">' + escapeHtml(p.name) + '</div>';
          html += '  <div class="hc-prism-covers">' + escapeHtml(p.covers) + '</div>';
          html += '  <div class="hc-prism-note">' + escapeHtml(p.buildNote) + '</div>';
          html += '</div>';
        }
        html += '  </div>';
        html += '</details>';
      }

      // Materials
      if (hc.materials) {
        html += '<details class="hc-fold">';
        html += '  <summary><i class="fa-solid fa-flask" aria-hidden="true"></i> Materials reference</summary>';
        html += '  <div class="hc-mat-body">';
        html += '    <div class="hc-mat-kv"><span>Primordial Dust tiers</span><strong>' + escapeHtml((hc.materials.primordialDust || []).join(', ')) + '</strong></div>';
        html += '    <div class="hc-mat-kv"><span>Secondary</span><strong>' + escapeHtml((hc.materials.secondary || []).join(', ')) + '</strong></div>';
        html += '    <p class="hc-mat-note">' + escapeHtml(hc.materials.farmNote || '') + '</p>';
        html += '  </div>';
        html += '</details>';
      }

      paint(root, html);
    },
  };

  // ========================================
  // ACQUISITION ROADMAP (Sprint 8 pulled forward)
  // Data driven "Do These In Order" checklist generated from
  // endgamedata.js. Replaces the hand maintained QV Progress tab.
  // ========================================
  const Acquisition = {
    bound: false,
    // endgamedata gear key -> gearweights.js slot key for the Go to slot jump
    slotKeyMap: {
      mainHand: 'daggers', offhand: 'focus', helm: 'helm', chest: 'chest',
      gloves: 'gloves', pants: 'pants', boots: 'boots', amulet: 'amulet',
      ring1: 'ring-1', ring2: 'ring-2',
    },

    slug(s) {
      return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    },

    buildRoadmap() {
      const eg = window.D4_ENDGAME;
      if (!eg || !eg.gear) return [];
      const steps = [];
      const gearKeys = ['mainHand', 'offhand', 'helm', 'chest', 'gloves', 'pants', 'boots', 'amulet', 'ring1', 'ring2'];
      const lookups = (eg.lookups && eg.lookups.byItem) || {};
      const sourceText = (p) => {
        if (!p) return 'Source not specified';
        const extra = lookups[p.name];
        if (extra && extra.length) return 'Drops from ' + extra.join(' or ');
        if (p.source && p.source.name) return (p.source.type ? p.source.type + ': ' : '') + p.source.name;
        return 'Source not specified';
      };
      const isBuildDefining = (p) => {
        if (!p) return false;
        if (/MANDATORY|CORE BUILD/i.test(p.tier || '')) return true;
        return (p.affixes || []).some((a) => a.buildDefining);
      };
      const isUniqueish = (p) => /unique|mythic/i.test((p && p.type) || '');

      // 1. Build defining items
      for (const k of gearKeys) {
        const slot = eg.gear[k];
        if (!slot || !slot.primary) continue;
        if (isBuildDefining(slot.primary)) {
          steps.push({
            group: 'Build Defining', groupRank: 1,
            pri: 'Critical', task: 'Get ' + slot.primary.name + ' (' + slot.slot + ')',
            how: sourceText(slot.primary) + '. ' + (slot.primary.notes || '') + ' Boss farm this, do not gamble the Horadric Cube Upgrade to Unique, it gives a random Unique of the type, not this one.',
            key: 'bd-' + this.slug(slot.primary.name), slotKey: this.slotKeyMap[k] || null,
          });
        }
      }

      // 2. Core uniques and mythics (not already listed as build defining)
      const listed = new Set(steps.map((s) => s.key.replace(/^bd-/, '')));
      for (const k of gearKeys) {
        const slot = eg.gear[k];
        if (!slot || !slot.primary) continue;
        if (isBuildDefining(slot.primary)) continue;
        if (isUniqueish(slot.primary) && !listed.has(this.slug(slot.primary.name))) {
          steps.push({
            group: 'Core Uniques and Mythics', groupRank: 2,
            pri: /mythic/i.test(slot.primary.type) ? 'Mythic' : 'Unique',
            task: 'Get ' + slot.primary.name + ' (' + slot.slot + ')',
            how: sourceText(slot.primary),
            key: 'uniq-' + this.slug(slot.primary.name), slotKey: this.slotKeyMap[k] || null,
          });
        }
      }

      // 3. Soul Shard plus Fragment
      if (eg.soulShards) {
        if (eg.soulShards.shard) steps.push({ group: 'Soul Shard and Fragment', groupRank: 3, pri: 'Shard', task: 'Equip the ' + eg.soulShards.shard.name + ' Soul Shard', how: eg.soulShards.shard.effect, key: 'shard-' + this.slug(eg.soulShards.shard.name) });
        if (eg.soulShards.fragment) steps.push({ group: 'Soul Shard and Fragment', groupRank: 3, pri: 'Fragment', task: 'Slot the ' + eg.soulShards.fragment.name + ' Fragment', how: eg.soulShards.fragment.effect, key: 'frag-' + this.slug(eg.soulShards.fragment.name) });
      }

      // 4. Runewords
      if (eg.runes && eg.runes.canonicalPairs) {
        for (const p of eg.runes.canonicalPairs) {
          steps.push({ group: 'Runewords', groupRank: 4, pri: p.tier || 'Runeword', task: 'Build the ' + p.pair + ' runeword (' + p.slot + ')', how: p.effect + ' ' + (eg.runes.farmNote || '') + ' Targeted path: craft the runes with the Horadric Cube Rune Crafting recipe instead of waiting on drops.', key: 'rune-' + this.slug(p.slot) });
        }
      }

      // 5. Aspects to imprint on legendary slots
      for (const k of gearKeys) {
        const slot = eg.gear[k];
        if (!slot || !slot.primary || !slot.primary.aspect) continue;
        steps.push({
          group: 'Aspects to Imprint', groupRank: 5, pri: 'Aspect',
          task: 'Get ' + slot.primary.aspect + ' for ' + slot.slot,
          how: (slot.primary.source && slot.primary.source.type === 'Codex of Power') ? 'Check your Codex of Power first, you may already have it unlocked' : sourceText(slot.primary),
          key: 'asp-' + this.slug(slot.primary.aspect), slotKey: this.slotKeyMap[k] || null,
        });
      }

      // 6. Talismans
      if (eg.talismans) {
        if (eg.talismans.charmSet) steps.push({ group: 'Talismans', groupRank: 6, pri: 'Set', task: 'Assemble the ' + eg.talismans.charmSet.primary, how: 'Charm set drops from Lord of Hatred activities. Prioritize ' + ((eg.talismans.charmAffixPriority && eg.talismans.charmAffixPriority[0] && eg.talismans.charmAffixPriority[0].stat) || 'the top charm affixes') + '.', key: 'tal-charmset' });
        if (eg.talismans.seal) steps.push({ group: 'Talismans', groupRank: 6, pri: 'Seal', task: 'Get the ' + eg.talismans.seal.canonical, how: 'Seal slot. ' + (eg.talismans.seal.mythicVariant || ''), key: 'tal-seal' });
      }

      // 7. Glyphs
      if (eg.glyphs && eg.glyphs.priority && eg.glyphs.priority.length) {
        const order = eg.glyphs.priority.map((g) => g.name).join(', ');
        steps.push({ group: 'Glyphs', groupRank: 7, pri: 'Glyphs', task: 'Level glyphs in priority order: ' + order, how: (eg.glyphs.farmNote || 'Glyph XP comes from Pit clears.'), key: 'glyph-priority' });
      }

      // 8. Endgame polish
      steps.push({ group: 'Endgame Polish', groupRank: 8, pri: 'Temper', task: 'Temper every slot to its build defining recipe', how: 'Visit the Blacksmith. Each slot detail card lists the exact tempering manual.', key: 'polish-temper' });
      steps.push({ group: 'Endgame Polish', groupRank: 8, pri: 'Masterwork', task: 'Masterwork priority pieces, Weapon first', how: 'Requires Pit materials. Weapon, then Gloves, then Rings. Crit the masterwork primary stat on each slot.', key: 'polish-mw' });
      steps.push({ group: 'Endgame Polish', groupRank: 8, pri: 'Cube', task: 'Horadric Cube optimization pass', how: 'Focused Reroll plus the Aggressive Tuning Prism to fix off affixes on near BIS legendaries, then Transfigure each finished piece last (it locks the item). See the Horadric Cube section in Slot Reference.', key: 'polish-cube' });

      let n = 1;
      for (const s of steps) s.n = n++;
      return steps;
    },

    render() {
      const root = document.getElementById('acquisitionRoot');
      if (!root) return;
      const steps = this.buildRoadmap();
      if (!steps.length) {
        paint(root, '<div class="placeholder-card"><i class="fa-solid fa-list-check placeholder-icon"></i><div class="placeholder-title">No roadmap data</div><div class="placeholder-text">endgamedata.js may have failed to load.</div></div>');
        return;
      }
      const done = AppState.data.acquisition || {};
      const total = steps.length;
      const doneCount = steps.filter((s) => done[s.key]).length;
      const pct = Math.round((doneCount / total) * 100);
      const next3 = steps.filter((s) => !done[s.key]).slice(0, 3);

      let html = '';
      html += '<section class="acq-hero">';
      html += '  <div class="acq-hero-top">';
      html += '    <h2 class="acq-hero-title"><i class="fa-solid fa-list-check" aria-hidden="true"></i> Acquisition Roadmap</h2>';
      html += '    <span class="acq-hero-count">' + doneCount + ' / ' + total + '</span>';
      html += '  </div>';
      html += '  <div class="acq-bar"><div class="acq-bar-fill" style="width:' + pct + '%"></div></div>';
      html += '  <div class="acq-hero-sub">Do these in order. Generated from the reconciled build data, sourced per item.</div>';
      if (next3.length) {
        html += '  <div class="acq-next">';
        html += '    <div class="acq-next-label">Your next ' + next3.length + '</div>';
        for (const s of next3) {
          html += '<div class="acq-next-item"><span class="acq-next-n">' + s.n + '</span><span class="acq-next-task">' + escapeHtml(s.task) + '</span></div>';
        }
        html += '  </div>';
      }
      html += '</section>';

      let curGroup = null;
      for (const s of steps) {
        if (s.group !== curGroup) {
          if (curGroup !== null) html += '</div>';
          curGroup = s.group;
          html += '<div class="acq-group">';
          html += '  <div class="acq-group-label">' + escapeHtml(curGroup) + '</div>';
        }
        const isDone = !!done[s.key];
        html += '<div class="acq-item' + (isDone ? ' is-done' : '') + '" data-acq-key="' + escapeHtml(s.key) + '">';
        html += '  <div class="acq-check">' + (isDone ? '<i class="fa-solid fa-check" aria-hidden="true"></i>' : '') + '</div>';
        html += '  <div class="acq-content">';
        html += '    <div class="acq-pri">' + escapeHtml(s.pri) + ' &middot; Step ' + s.n + '</div>';
        html += '    <div class="acq-task">' + escapeHtml(s.task) + '</div>';
        html += '    <div class="acq-how">' + escapeHtml(s.how) + '</div>';
        if (s.slotKey) {
          html += '    <button type="button" class="acq-goto" data-acq-goto="' + escapeHtml(s.slotKey) + '"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i> Compare drops for this slot</button>';
        }
        html += '  </div>';
        html += '</div>';
      }
      if (curGroup !== null) html += '</div>';

      paint(root, html);
      this.bind();
    },

    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('click', (e) => {
        const goto = e.target.closest && e.target.closest('[data-acq-goto]');
        if (goto) {
          e.stopPropagation();
          const sk = goto.getAttribute('data-acq-goto');
          if (window.D4_GEAR_WEIGHTS && window.D4_GEAR_WEIGHTS.slots && window.D4_GEAR_WEIGHTS.slots[sk]) {
            AppState.data.gearCompare.activeSlot = sk;
            AppState.save('gearCompare');
            GearCompare.render();
            const gcRoot = document.getElementById('gearCompareRoot');
            if (gcRoot) gcRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        }
        const item = e.target.closest && e.target.closest('[data-acq-key]');
        if (item) {
          const key = item.getAttribute('data-acq-key');
          if (!AppState.data.acquisition) AppState.data.acquisition = {};
          AppState.data.acquisition[key] = !AppState.data.acquisition[key];
          AppState.save('acquisition');
          Acquisition.render();
          return;
        }
      });
    },
  };

  // ========================================
  // GEAR COMPARE RENDERER (Sprint 3 Part B)
  // ========================================
  const GearCompare = {
    bound: false,

    render() {
      const root = document.getElementById('gearCompareRoot');
      if (!root) return;
      const gw = window.D4_GEAR_WEIGHTS;
      if (!gw || !gw.slots) {
        root.innerHTML = '<div class="placeholder-card"><i class="fa-solid fa-scale-balanced placeholder-icon"></i><div class="placeholder-title">No gear weights data</div><div class="placeholder-text">gearweights.js may have failed to load. Check the console.</div></div>';
        return;
      }
      const state = AppState.data.gearCompare;
      const slotKeys = Object.keys(gw.slots);
      if (!slotKeys.includes(state.activeSlot)) state.activeSlot = slotKeys[0];
      const activeKey = state.activeSlot;
      const slot = gw.slots[activeKey];
      const saved = state.slots[activeKey] || { selectedAffixes: {}, sockets: null, hasGA: {}, hasTemper: false, hasMasterworkPrimary: false };

      let html = '';

      html += '<div class="gc-intro">';
      html += '  <p class="gc-intro-text">Pick a slot. Tick every affix the drop rolled. The verdict updates live based on the weights and must-haves in <code>gearweights.js</code>.</p>';
      html += '</div>';

      html += '<div class="gc-slot-picker">';
      for (const k of slotKeys) {
        const s = gw.slots[k];
        const isActive = k === activeKey;
        html += '<button class="gc-slot-btn' + (isActive ? ' is-active' : '') + '" type="button" data-gc-slot="' + k + '">';
        html += '  <span class="gc-slot-btn-name">' + escapeHtml(s.label) + '</span>';
        const savedSlot = state.slots[k];
        if (savedSlot && Object.keys(savedSlot.selectedAffixes || {}).filter((id) => savedSlot.selectedAffixes[id]).length > 0) {
          html += '  <span class="gc-slot-btn-dot" aria-label="has saved entries"></span>';
        }
        html += '</button>';
      }
      html += '</div>';

      html += '<section class="gc-slot-card">';
      html += '  <div class="gc-slot-head">';
      html += '    <h2 class="gc-slot-title">' + escapeHtml(slot.label) + '</h2>';
      html += '    <div class="gc-slot-meta">';
      html += '      <span class="aspect-priority rg-conf-' + slot.confidence.toLowerCase() + '">' + slot.confidence + '</span>';
      html += '      <span class="gc-chip">' + slot.sockets + ' socket' + (slot.sockets === 1 ? '' : 's') + '</span>';
      if (slot.topUnique) html += '      <span class="gc-chip gc-chip-unique">Top: ' + escapeHtml(slot.topUnique) + '</span>';
      html += '    </div>';
      html += '  </div>';
      if (slot.note) html += '  <p class="gc-slot-note">' + escapeHtml(slot.note) + '</p>';
      if (slot.buildDefiningTemper) html += '  <div class="gc-slot-define"><i class="fa-solid fa-anchor"></i> Build-defining temper: ' + escapeHtml(slot.buildDefiningTemper) + '</div>';
      html += '</section>';

      html += '<section class="gc-form">';
      html += '  <h3 class="gc-form-title">Affixes on this drop</h3>';
      html += '  <ul class="gc-affix-list">';
      for (let i = 0; i < slot.affixes.length; i++) {
        const a = slot.affixes[i];
        const aId = 'a' + i;
        const checked = !!(saved.selectedAffixes && saved.selectedAffixes[aId]);
        const hasGA = !!(saved.hasGA && saved.hasGA[aId]);
        html += '<li class="gc-affix' + (checked ? ' is-on' : '') + (a.mustHave ? ' is-must' : '') + '">';
        html += '  <label class="gc-affix-label">';
        html += '    <input type="checkbox" class="gc-affix-cb" data-gc-affix="' + aId + '"' + (checked ? ' checked' : '') + ' />';
        html += '    <span class="gc-affix-body">';
        html += '      <span class="gc-affix-head"><span class="gc-affix-name">' + escapeHtml(a.name) + '</span>';
        if (a.mustHave) html += '<span class="gc-must">MUST</span>';
        html += '<span class="gc-weight">w' + a.weight + '</span></span>';
        html += '      <span class="gc-affix-target">Target: ' + escapeHtml(a.target) + '</span>';
        if (a.notes) html += '      <span class="gc-affix-notes">' + escapeHtml(a.notes) + '</span>';
        html += '    </span>';
        html += '  </label>';
        if (checked) {
          html += '  <label class="gc-ga-toggle"><input type="checkbox" class="gc-ga-cb" data-gc-ga="' + aId + '"' + (hasGA ? ' checked' : '') + ' /> Greater Affix</label>';
        }
        html += '</li>';
      }
      html += '  </ul>';

      html += '  <div class="gc-extras">';
      html += '    <label class="gc-extra"><input type="checkbox" class="gc-temper-cb" data-gc-extra="temper"' + (saved.hasTemper ? ' checked' : '') + ' /> Build-defining temper rolled (' + escapeHtml(slot.buildDefiningTemper || 'n/a') + ')</label>';
      const mwPrimary = slot.masterwork && slot.masterwork[0] ? slot.masterwork[0].stat : 'primary stat';
      html += '    <label class="gc-extra"><input type="checkbox" class="gc-mw-cb" data-gc-extra="masterwork"' + (saved.hasMasterworkPrimary ? ' checked' : '') + ' /> Masterwork primary stat is ' + escapeHtml(mwPrimary) + '</label>';
      html += '  </div>';

      html += '  <div class="gc-actions">';
      html += '    <button type="button" class="btn btn-ghost gc-clear" data-gc-clear="1">Clear slot</button>';
      html += '    <button type="button" class="btn btn-ghost gc-set-equipped" data-gc-set-equipped="1"><i class="fa-solid fa-user-shield" aria-hidden="true"></i> Set as equipped</button>';
      html += '    <input type="text" class="gc-save-nickname" data-gc-nickname placeholder="Optional nickname (e.g. Tuesday drop)" maxlength="40" />';
      html += '    <button type="button" class="btn btn-primary gc-save" data-gc-save="1"><i class="fa-solid fa-floppy-disk" aria-hidden="true"></i> Save this drop</button>';
      html += '  </div>';
      html += '  <div class="gc-actions-hint">Enter your currently equipped item and tap <strong>Set as equipped</strong> to lock it as the baseline. Then enter any looted item to see a live upgrade comparison.</div>';
      html += '</section>';

      // ---------- Verdict ----------
      const verdict = this.computeVerdict(slot, saved);
      html += '<section class="gc-verdict gc-verdict-' + verdict.tier + '">';
      html += '  <div class="gc-verdict-head">';
      html += '    <span class="gc-verdict-tag">' + verdict.label + '</span>';
      html += '    <span class="gc-verdict-score">' + verdict.scorePct + '% match</span>';
      html += '  </div>';
      html += '  <p class="gc-verdict-reason">' + escapeHtml(verdict.reason) + '</p>';
      if (verdict.missingMust.length) {
        html += '  <div class="gc-verdict-missing">';
        html += '    <span class="gc-vm-label">Missing must-have' + (verdict.missingMust.length === 1 ? '' : 's') + ':</span>';
        html += '    <ul class="gc-vm-list">';
        for (const m of verdict.missingMust) {
          html += '<li>' + escapeHtml(m) + '</li>';
        }
        html += '    </ul>';
        html += '  </div>';
      }
      if (verdict.gaBonus > 0) {
        html += '  <div class="gc-verdict-bonus"><i class="fa-solid fa-star"></i> Greater Affix bonus applied (+' + verdict.gaBonus + ' points)</div>';
      }
      html += '  <details class="gc-verdict-breakdown">';
      html += '    <summary>Score breakdown</summary>';
      html += '    <ul class="gc-bd-list">';
      html += '<li><span>Rolled weight</span><span>' + verdict.rolledWeight + ' / ' + verdict.maxWeight + '</span></li>';
      html += '<li><span>Must-have coverage</span><span>' + verdict.mustHits + ' / ' + verdict.mustTotal + '</span></li>';
      html += '<li><span>Greater Affix bonus</span><span>+' + verdict.gaBonus + '</span></li>';
      html += '<li><span>Temper bonus</span><span>' + (saved.hasTemper ? '+5' : '0') + '</span></li>';
      html += '<li><span>Masterwork bonus</span><span>' + (saved.hasMasterworkPrimary ? '+3' : '0') + '</span></li>';
      html += '    </ul>';
      html += '  </details>';
      html += '</section>';

      // ---------- Equipped vs This Drop comparison ----------
      if (saved.equipped) {
        const eqV = this.computeVerdict(slot, saved.equipped);
        const dropV = verdict;
        const delta = dropV.scorePct - eqV.scorePct;
        let cmpTier, cmpLabel, cmpReason;
        if (delta >= 8) {
          cmpTier = 'keep';
          cmpLabel = 'UPGRADE';
          cmpReason = 'This drop scores ' + delta + ' points higher than your equipped item. Equip it.';
        } else if (delta <= -8) {
          cmpTier = 'salvage';
          cmpLabel = 'WORSE';
          cmpReason = 'This drop scores ' + Math.abs(delta) + ' points lower than your equipped item. Keep what you have, salvage the drop.';
        } else {
          cmpTier = 'imprint';
          cmpLabel = 'SIDEGRADE';
          cmpReason = 'Within ' + Math.abs(delta) + ' points of your equipped item. Roughly even. Decide on tempering or masterwork headroom.';
        }
        const eqAff = saved.equipped.selectedAffixes || {};
        const drAff = saved.selectedAffixes || {};
        const gained = [];
        const lost = [];
        for (let i = 0; i < slot.affixes.length; i++) {
          const a = slot.affixes[i];
          const id = 'a' + i;
          if (drAff[id] && !eqAff[id]) gained.push(a.name);
          if (!drAff[id] && eqAff[id]) lost.push(a.name);
        }

        html += '<section class="gc-cmp gc-verdict-' + cmpTier + '">';
        html += '  <div class="gc-cmp-verdict">';
        html += '    <span class="gc-cmp-tag">' + cmpLabel + '</span>';
        html += '    <span class="gc-cmp-delta">' + (delta > 0 ? '+' : '') + delta + '%</span>';
        html += '  </div>';
        html += '  <p class="gc-cmp-reason">' + escapeHtml(cmpReason) + '</p>';
        html += '  <div class="gc-cmp-cols">';
        html += '    <div class="gc-cmp-col gc-cmp-equipped">';
        html += '      <div class="gc-cmp-col-label"><i class="fa-solid fa-user-shield" aria-hidden="true"></i> Equipped</div>';
        html += '      <div class="gc-cmp-score gc-verdict-' + eqV.tier + '">' + eqV.scorePct + '%</div>';
        html += '      <div class="gc-cmp-vtag">' + eqV.label + '</div>';
        html += '    </div>';
        html += '    <div class="gc-cmp-vs">vs</div>';
        html += '    <div class="gc-cmp-col gc-cmp-drop">';
        html += '      <div class="gc-cmp-col-label"><i class="fa-solid fa-gift" aria-hidden="true"></i> This Drop</div>';
        html += '      <div class="gc-cmp-score gc-verdict-' + dropV.tier + '">' + dropV.scorePct + '%</div>';
        html += '      <div class="gc-cmp-vtag">' + dropV.label + '</div>';
        html += '    </div>';
        html += '  </div>';
        if (gained.length || lost.length) {
          html += '  <div class="gc-cmp-diff">';
          if (gained.length) {
            html += '<div class="gc-cmp-diff-row gc-cmp-gain"><span class="gc-cmp-diff-label"><i class="fa-solid fa-plus" aria-hidden="true"></i> Drop adds</span> ' + gained.map((g) => escapeHtml(g)).join(', ') + '</div>';
          }
          if (lost.length) {
            html += '<div class="gc-cmp-diff-row gc-cmp-loss"><span class="gc-cmp-diff-label"><i class="fa-solid fa-minus" aria-hidden="true"></i> Drop loses</span> ' + lost.map((l) => escapeHtml(l)).join(', ') + '</div>';
          }
          html += '  </div>';
        }
        html += '  <button type="button" class="btn btn-ghost gc-clear-equipped" data-gc-clear-equipped="1">Clear equipped baseline</button>';
        html += '</section>';
      }

      html += '<section class="gc-ref">';
      html += '  <h3 class="gc-ref-title">Tempering reference</h3>';
      html += '  <ul class="gc-ref-list">';
      for (const t of slot.tempering) {
        html += '<li class="gc-ref-row"><span class="aspect-priority rg-conf-' + t.priority.toLowerCase() + '">' + t.priority + '</span><span class="gc-ref-text"><strong>' + escapeHtml(t.manual) + '</strong>. ' + escapeHtml(t.why) + '</span></li>';
      }
      html += '  </ul>';
      html += '  <h3 class="gc-ref-title">Masterwork priorities</h3>';
      html += '  <ul class="gc-ref-list">';
      for (const m of slot.masterwork) {
        html += '<li class="gc-ref-row"><span class="gc-ref-n">' + m.priority + '</span><span class="gc-ref-text"><strong>' + escapeHtml(m.stat) + '</strong>. ' + escapeHtml(m.why) + '</span></li>';
      }
      html += '  </ul>';
      html += '</section>';

      // ---------- History ----------
      const history = saved.history || [];
      if (history.length > 0) {
        html += '<section class="gc-history">';
        html += '  <div class="gc-history-head">';
        html += '    <h3 class="gc-history-title"><i class="fa-solid fa-clock-rotate-left" aria-hidden="true"></i> Saved drops for this slot (' + history.length + ')</h3>';
        html += '    <button type="button" class="btn btn-ghost gc-history-clear" data-gc-history-clear="1">Clear history</button>';
        html += '  </div>';
        html += '  <ul class="gc-history-list">';
        const sorted = history.slice().sort((a, b) => (b.ts || 0) - (a.ts || 0));
        for (const h of sorted) {
          const dt = new Date(h.ts || 0);
          const dateStr = dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          html += '<li class="gc-history-row gc-verdict-' + (h.tier || 'salvage') + '">';
          html += '  <button type="button" class="gc-history-load" data-gc-history-load="' + h.id + '">';
          html += '    <span class="gc-history-tag">' + escapeHtml(h.label || 'SAVED') + '</span>';
          html += '    <span class="gc-history-score">' + (h.scorePct || 0) + '%</span>';
          if (h.nickname) html += '<span class="gc-history-nick">' + escapeHtml(h.nickname) + '</span>';
          html += '    <span class="gc-history-ts">' + escapeHtml(dateStr) + '</span>';
          html += '  </button>';
          html += '  <button type="button" class="gc-history-del" data-gc-history-del="' + h.id + '" aria-label="Delete this entry"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>';
          html += '</li>';
        }
        html += '  </ul>';
        html += '</section>';
      }

      root.innerHTML = html;
      this.bind(root);
    },

    setEquipped() {
      const activeKey = AppState.data.gearCompare.activeSlot;
      if (!AppState.data.gearCompare.slots[activeKey]) {
        AppState.data.gearCompare.slots[activeKey] = { selectedAffixes: {}, hasGA: {}, hasTemper: false, hasMasterworkPrimary: false, history: [], equipped: null };
      }
      const s = AppState.data.gearCompare.slots[activeKey];
      s.equipped = {
        selectedAffixes: Object.assign({}, s.selectedAffixes || {}),
        hasGA: Object.assign({}, s.hasGA || {}),
        hasTemper: !!s.hasTemper,
        hasMasterworkPrimary: !!s.hasMasterworkPrimary,
      };
      AppState.save('gearCompare');
      Toast.show('Equipped baseline set for this slot', 'success');
      GearCompare.render();
    },

    clearEquipped() {
      const activeKey = AppState.data.gearCompare.activeSlot;
      const s = AppState.data.gearCompare.slots[activeKey];
      if (!s) return;
      s.equipped = null;
      AppState.save('gearCompare');
      Toast.show('Equipped baseline cleared', 'info');
      GearCompare.render();
    },

    saveCurrent() {
      const activeKey = AppState.data.gearCompare.activeSlot;
      const slotState = AppState.data.gearCompare.slots[activeKey] || {};
      const gw = window.D4_GEAR_WEIGHTS;
      if (!gw || !gw.slots[activeKey]) return;
      const slot = gw.slots[activeKey];
      const verdict = this.computeVerdict(slot, slotState);
      const nicknameInput = document.querySelector('[data-gc-nickname]');
      const nickname = nicknameInput ? (nicknameInput.value || '').trim() : '';
      if (!slotState.history) slotState.history = [];
      const entry = {
        id: 'h' + Date.now() + Math.floor(Math.random() * 1000),
        ts: Date.now(),
        nickname,
        tier: verdict.tier,
        label: verdict.label,
        scorePct: verdict.scorePct,
        snapshot: {
          selectedAffixes: Object.assign({}, slotState.selectedAffixes || {}),
          hasGA: Object.assign({}, slotState.hasGA || {}),
          hasTemper: !!slotState.hasTemper,
          hasMasterworkPrimary: !!slotState.hasMasterworkPrimary,
        },
      };
      slotState.history.unshift(entry);
      if (slotState.history.length > 50) slotState.history = slotState.history.slice(0, 50);
      AppState.data.gearCompare.slots[activeKey] = slotState;
      AppState.save('gearCompare');
      Toast.show('Drop saved' + (nickname ? ': ' + nickname : ''), 'success');
      GearCompare.render();
    },

    loadHistoryEntry(id) {
      const activeKey = AppState.data.gearCompare.activeSlot;
      const slotState = AppState.data.gearCompare.slots[activeKey];
      if (!slotState || !slotState.history) return;
      const entry = slotState.history.find((h) => h.id === id);
      if (!entry || !entry.snapshot) return;
      slotState.selectedAffixes = Object.assign({}, entry.snapshot.selectedAffixes || {});
      slotState.hasGA = Object.assign({}, entry.snapshot.hasGA || {});
      slotState.hasTemper = !!entry.snapshot.hasTemper;
      slotState.hasMasterworkPrimary = !!entry.snapshot.hasMasterworkPrimary;
      AppState.save('gearCompare');
      Toast.show('Drop reloaded' + (entry.nickname ? ': ' + entry.nickname : ''), 'info');
      GearCompare.render();
    },

    deleteHistoryEntry(id) {
      const activeKey = AppState.data.gearCompare.activeSlot;
      const slotState = AppState.data.gearCompare.slots[activeKey];
      if (!slotState || !slotState.history) return;
      slotState.history = slotState.history.filter((h) => h.id !== id);
      AppState.save('gearCompare');
      GearCompare.render();
    },

    clearHistory() {
      const activeKey = AppState.data.gearCompare.activeSlot;
      const slotState = AppState.data.gearCompare.slots[activeKey];
      if (!slotState) return;
      slotState.history = [];
      AppState.save('gearCompare');
      Toast.show('History cleared', 'info');
      GearCompare.render();
    },

    computeVerdict(slot, saved) {
      const affixes = slot.affixes;
      const selected = saved.selectedAffixes || {};
      const ga = saved.hasGA || {};
      let rolledWeight = 0;
      let mustHits = 0;
      let mustTotal = 0;
      const missingMust = [];
      let gaBonus = 0;
      for (let i = 0; i < affixes.length; i++) {
        const a = affixes[i];
        const aId = 'a' + i;
        if (a.mustHave) mustTotal++;
        if (selected[aId]) {
          rolledWeight += a.weight;
          if (a.mustHave) mustHits++;
          if (ga[aId]) gaBonus += 2;
        } else if (a.mustHave) {
          missingMust.push(a.name);
        }
      }
      const maxWeight = affixes.reduce((n, a) => n + a.weight, 0);
      const temperBonus = saved.hasTemper ? 5 : 0;
      const mwBonus = saved.hasMasterworkPrimary ? 3 : 0;
      const rawScore = rolledWeight + gaBonus + temperBonus + mwBonus;
      const maxScore = maxWeight + (affixes.filter((a) => a.mustHave).length * 2) + 5 + 3;
      const scorePct = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0;

      let tier;
      let label;
      let reason;
      const allMustHit = mustTotal === 0 || mustHits === mustTotal;

      if (rolledWeight === 0 && !saved.hasTemper && !saved.hasMasterworkPrimary) {
        tier = 'salvage';
        label = 'SALVAGE';
        reason = 'No affixes selected yet. Tick what the drop rolled to evaluate.';
      } else if (scorePct >= 75 && allMustHit) {
        tier = 'keep';
        label = 'KEEP';
        reason = 'High roll. Every must-have is present and the weighted score clears 75%. Slot it now or bank it for masterwork.';
      } else if (scorePct >= 55 && mustHits >= Math.max(1, mustTotal - 1)) {
        tier = 'imprint';
        label = 'IMPRINT';
        reason = 'Solid base. Hits enough of the priority affixes that an imprint or tempering pass is worth the materials.';
      } else if (scorePct >= 40) {
        tier = 'imprint';
        label = 'BENCH';
        reason = 'Below the imprint threshold but not garbage. Hold in stash if you have space, salvage if you need materials.';
      } else {
        tier = 'salvage';
        label = 'SALVAGE';
        reason = 'Low weighted score' + (missingMust.length ? ' and missing must-have affixes' : '') + '. Send to the salvage bench.';
      }

      return { tier, label, scorePct, reason, missingMust, gaBonus, rolledWeight, maxWeight, mustHits, mustTotal };
    },

    bind(root) {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;

      main.addEventListener('click', (e) => {
        const slotBtn = e.target.closest && e.target.closest('[data-gc-slot]');
        if (slotBtn) {
          const k = slotBtn.getAttribute('data-gc-slot');
          AppState.data.gearCompare.activeSlot = k;
          AppState.save('gearCompare');
          GearCompare.render();
          return;
        }
        const clearBtn = e.target.closest && e.target.closest('[data-gc-clear]');
        if (clearBtn) {
          const activeKey = AppState.data.gearCompare.activeSlot;
          const existing = AppState.data.gearCompare.slots[activeKey] || {};
          AppState.data.gearCompare.slots[activeKey] = { selectedAffixes: {}, hasGA: {}, hasTemper: false, hasMasterworkPrimary: false, history: existing.history || [], equipped: existing.equipped || null };
          AppState.save('gearCompare');
          GearCompare.render();
          Toast.show('Slot cleared', 'info');
          return;
        }
        const setEqBtn = e.target.closest && e.target.closest('[data-gc-set-equipped]');
        if (setEqBtn) {
          GearCompare.setEquipped();
          return;
        }
        const clearEqBtn = e.target.closest && e.target.closest('[data-gc-clear-equipped]');
        if (clearEqBtn) {
          GearCompare.clearEquipped();
          return;
        }
        const saveBtn = e.target.closest && e.target.closest('[data-gc-save]');
        if (saveBtn) {
          GearCompare.saveCurrent();
          return;
        }
        const loadBtn = e.target.closest && e.target.closest('[data-gc-history-load]');
        if (loadBtn) {
          GearCompare.loadHistoryEntry(loadBtn.getAttribute('data-gc-history-load'));
          return;
        }
        const delBtn = e.target.closest && e.target.closest('[data-gc-history-del]');
        if (delBtn) {
          GearCompare.deleteHistoryEntry(delBtn.getAttribute('data-gc-history-del'));
          return;
        }
        const histClearBtn = e.target.closest && e.target.closest('[data-gc-history-clear]');
        if (histClearBtn) {
          GearCompare.clearHistory();
          return;
        }
      });

      main.addEventListener('change', (e) => {
        const t = e.target;
        if (!t || !t.classList) return;
        const activeKey = AppState.data.gearCompare.activeSlot;
        if (!AppState.data.gearCompare.slots[activeKey]) {
          AppState.data.gearCompare.slots[activeKey] = { selectedAffixes: {}, hasGA: {}, hasTemper: false, hasMasterworkPrimary: false, history: [], equipped: null };
        }
        const slotState = AppState.data.gearCompare.slots[activeKey];
        let changed = false;

        if (t.classList.contains('gc-affix-cb')) {
          const aId = t.getAttribute('data-gc-affix');
          if (!slotState.selectedAffixes) slotState.selectedAffixes = {};
          slotState.selectedAffixes[aId] = t.checked;
          if (!t.checked && slotState.hasGA) slotState.hasGA[aId] = false;
          changed = true;
        } else if (t.classList.contains('gc-ga-cb')) {
          const aId = t.getAttribute('data-gc-ga');
          if (!slotState.hasGA) slotState.hasGA = {};
          slotState.hasGA[aId] = t.checked;
          changed = true;
        } else if (t.classList.contains('gc-temper-cb')) {
          slotState.hasTemper = t.checked;
          changed = true;
        } else if (t.classList.contains('gc-mw-cb')) {
          slotState.hasMasterworkPrimary = t.checked;
          changed = true;
        }

        if (changed) {
          AppState.save('gearCompare');
          GearCompare.render();
        }
      });
    },
  };

  // ========================================
  // ENDGAME GEAR RENDERER (Sprint 5)
  // Renders the 10 slot gear targets in the new Maxroll inspired
  // visual style. Uses Templates.renderComparisonPair.
  // ========================================
  const EndgameGear = {
    bound: false,
    svgMap: {
      helm: 'helm', chest: 'chest', gloves: 'gloves', pants: 'pants', boots: 'boots',
      amulet: 'amulet', ring1: 'ring', ring2: 'ring', mainHand: 'dagger', offhand: 'focus',
    },
    // endgame gear key -> runesgems.js gemsPerSlot row label, for the backup gem
    gemSlotMap: {
      mainHand: '1H Dagger (Litany of Sable)', offhand: 'Focus (offhand)',
      helm: 'Helm', chest: 'Chest', gloves: 'Gloves', pants: 'Pants', boots: 'Boots',
      amulet: 'Amulet', ring1: 'Ring 1 (Lurid Pact slot)', ring2: 'Ring 2 (Demonic Aspect or Starless Skies slot)',
    },

    socketBackupFor(gearKey) {
      const rg = window.D4_RUNES_GEMS;
      const label = this.gemSlotMap[gearKey];
      if (!rg || !rg.gemsPerSlot || !label) return '';
      for (const grp of rg.gemsPerSlot) {
        for (const row of (grp.rows || [])) {
          if (row.slot === label) {
            if (!row.alternative || /^n\/a$/i.test(row.alternative)) return '';
            return row.alternative;
          }
        }
      }
      return '';
    },

    render() {
      const root = document.getElementById('endgameGearRoot');
      if (!root) return;
      const eg = window.D4_ENDGAME;
      if (!eg || !eg.gear) {
        paint(root, '<div class="placeholder-card"><i class="fa-solid fa-scale-balanced placeholder-icon"></i><div class="placeholder-title">No endgame data</div><div class="placeholder-text">endgamedata.js may have failed to load. Check the console.</div></div>');
        return;
      }

      const gear = {};
      const slotKeys = ['helm', 'chest', 'gloves', 'pants', 'boots', 'amulet', 'ring1', 'ring2', 'mainHand', 'offhand'];
      for (const k of slotKeys) {
        if (eg.gear[k]) {
          gear[k] = Object.assign({}, eg.gear[k], { svgName: this.svgMap[k] || 'gem' });
        }
      }

      let html = '';

      html += '<section class="ec-hero">';
      html += '  <h2 class="ec-hero-title">Endgame Gear</h2>';
      html += '  <p class="ec-hero-sub">Tap a slot in the loadout to jump to its stat priority. Rarity colored frames match the in game item colors.</p>';
      html += '  <div class="ec-hero-meta">Patch ' + escapeHtml(eg.patch || '') + ' &middot; Reconciled ' + escapeHtml(eg.compiledAt || '') + '</div>';
      html += '</section>';

      html += Templates.renderGearLoadout(gear, { buildName: eg.build || 'Dread Claws Mastermind' });

      if (eg.runes && eg.runes.canonicalPairs) {
        html += '<section class="ec-section">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">' + ((eg.sections.runes || {}).emoji || '') + '</span><h2 class="ec-section-title">Runewords</h2></header>';
        html += Templates.renderRuneSockets(eg.runes.canonicalPairs);
        html += '</section>';
      }

      html += '<div class="ec-details" id="ecGearDetails">';
      const sectionMap = {
        weapons: ['mainHand', 'offhand'],
        armor: ['helm', 'chest', 'gloves', 'pants', 'boots'],
        jewelry: ['amulet', 'ring1', 'ring2'],
      };
      for (const sec of ['weapons', 'armor', 'jewelry']) {
        const meta = (eg.sections || {})[sec] || {};
        html += '<section class="ec-section ec-section-' + sec + '">';
        html += '  <header class="ec-section-head">';
        html += '    <span class="ec-section-emoji" aria-hidden="true">' + (meta.emoji || '') + '</span>';
        html += '    <h2 class="ec-section-title">' + escapeHtml(meta.label || sec) + '</h2>';
        html += '  </header>';
        html += '  <div class="ec-grid">';
        for (const k of sectionMap[sec]) {
          const slot = gear[k];
          if (!slot) continue;
          html += '<div class="ec-detail-anchor" id="ecSlot-' + k + '">';
          html += Templates.renderComparisonPair(slot.primary, slot.backup, {
            slotLabel: slot.slot,
            svgName: slot.svgName,
            section: sec,
            socketBackup: this.socketBackupFor(k),
          });
          html += '</div>';
        }
        html += '  </div>';
        html += '</section>';
      }
      html += '</div>';

      if (eg.statCaps && eg.statCaps.length) {
        html += '<section class="ec-section ec-section-stats">';
        html += '  <header class="ec-section-head">';
        html += '    <span class="ec-section-emoji" aria-hidden="true">\u{1F4CA}</span>';
        html += '    <h2 class="ec-section-title">Stat Caps and Breakpoints</h2>';
        html += '  </header>';
        html += '  <ul class="ec-stat-cap-list">';
        for (const s of eg.statCaps) {
          const conf = (s.confidence || 'MEDIUM').toLowerCase();
          html += '<li class="ec-stat-cap-row">';
          html += '  <span class="ec-stat-cap-rank">' + escapeHtml(String(s.rank)) + '</span>';
          html += '  <div class="ec-stat-cap-body">';
          html += '    <div class="ec-stat-cap-name">' + escapeHtml(s.stat) + '</div>';
          html += '    <div class="ec-stat-cap-target">Target ' + escapeHtml(s.target) + '</div>';
          html += '  </div>';
          html += '  <span class="aspect-priority rg-conf-' + conf + '">' + (s.confidence || 'MEDIUM') + '</span>';
          html += '</li>';
        }
        html += '  </ul>';
        html += '</section>';
      }

      paint(root, html);
      this.bind();
    },

    bind() {
      if (this.bound) return;
      this.bound = true;
      const main = document.getElementById('main');
      if (!main) return;
      main.addEventListener('click', (e) => {
        const tile = e.target.closest && e.target.closest('[data-ld-slot]');
        if (!tile) return;
        const key = tile.getAttribute('data-ld-slot');
        const anchor = document.getElementById('ecSlot-' + key);
        if (!anchor) return;
        document.querySelectorAll('.ec-detail-anchor.is-flash').forEach((el) => el.classList.remove('is-flash'));
        anchor.classList.add('is-flash');
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => anchor.classList.remove('is-flash'), 1600);
      });
    },
  };

  // ========================================
  // ENDGAME SYSTEMS (Sprint 6 leftovers)
  // How to play it: skill bar, soul shard plus fragment, glyphs,
  // paragon path, resource mechanics, boss rotation. Read only
  // visual surface from endgamedata.js. The old interactive
  // Endbuild, Shards, Paragon renderers stay below, untouched.
  // ========================================
  const EndgameSystems = {
    render() {
      const root = document.getElementById('endgameSystemsRoot');
      if (!root) return;
      const eg = window.D4_ENDGAME;
      if (!eg || !eg.skillBar) {
        paint(root, '<div class="placeholder-card"><i class="fa-solid fa-wand-sparkles placeholder-icon"></i><div class="placeholder-title">No systems data</div></div>');
        return;
      }
      const c = (AppState.data && AppState.data.character) || {};
      const paragon = Number(c.paragon) || 0;
      const conf = (x) => 'rg-conf-' + String(x || 'MEDIUM').toLowerCase();
      let html = '';

      html += '<section class="ec-hero">';
      html += '  <h2 class="ec-hero-title">How To Play It</h2>';
      html += '  <p class="ec-hero-sub">Skill bar, soul shard, glyphs, paragon path, and the resource loops. The interactive trackers (paragon mark-built, glyph steppers) are still below.</p>';
      html += '</section>';

      // Skill Bar
      const fb = eg.skillBar.finalEndgame;
      html += '<section class="ec-section ec-section-weapons">';
      html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{2694}</span><h2 class="ec-section-title">Skill Bar</h2></header>';
      html += '  <div class="ec-pair"><div class="ec-pair-head">' + escapeHtml(fb.label) + ' <span class="aspect-priority ' + conf(fb.confidence) + '">' + fb.confidence + '</span></div>';
      html += '  <ol class="ec-affix-list">';
      for (const s of fb.slots) {
        html += '<li class="ec-affix"><span class="ec-affix-n">' + s.n + '</span><span class="ec-affix-stat"><strong>' + escapeHtml(s.skill) + '</strong> &middot; ' + escapeHtml(s.role) + '<br><span class="ec-step-sub">' + escapeHtml(s.notes) + '</span></span></li>';
      }
      html += '  </ol></div>';
      if (eg.skillBar.lv70SwapMoment) {
        html += '  <div class="hc-warn"><div class="hc-warn-head"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ' + escapeHtml(eg.skillBar.lv70SwapMoment.label) + '</div><p class="hc-warn-body">' + escapeHtml(eg.skillBar.lv70SwapMoment.description) + '</p></div>';
      }
      if (eg.skillBar.optimizedPush) {
        html += '  <div class="ec-block ec-block-mw"><div class="ec-block-label">' + escapeHtml(eg.skillBar.optimizedPush.label) + '</div><div class="ec-block-val">' + escapeHtml(eg.skillBar.optimizedPush.rotation) + '</div></div>';
      }
      const variant = (v) => {
        if (!v || !v.slots) return '';
        let h = '<details class="ec-deep"><summary>' + escapeHtml(v.label) + '</summary><ol class="ec-affix-list">';
        for (const s of v.slots) h += '<li class="ec-affix"><span class="ec-affix-n">' + s.n + '</span><span class="ec-affix-stat"><strong>' + escapeHtml(s.skill) + '</strong> &middot; ' + escapeHtml(s.notes) + '</span></li>';
        return h + '</ol></details>';
      };
      html += variant(eg.skillBar.speedfarm) + variant(eg.skillBar.push);
      html += '</section>';

      // Soul Shard plus Fragment
      const ss = eg.soulShards;
      if (ss) {
        html += '<section class="ec-section ec-section-stats">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{1F480}</span><h2 class="ec-section-title">Soul Shard and Fragment</h2></header>';
        html += '  <div class="ec-grid">';
        html += '<div class="ec-pair"><div class="ec-pair-head">Shard: ' + escapeHtml(ss.shard.name) + ' <span class="aspect-priority ' + conf(ss.shard.confidence) + '">' + ss.shard.confidence + '</span></div><div class="ec-block-val">' + escapeHtml(ss.shard.effect) + '</div></div>';
        html += '<div class="ec-pair"><div class="ec-pair-head">Fragment: ' + escapeHtml(ss.fragment.name) + ' <span class="aspect-priority ' + conf(ss.fragment.confidence) + '">' + ss.fragment.confidence + '</span></div><div class="ec-block-val">' + escapeHtml(ss.fragment.effect) + '</div></div>';
        html += '  </div>';
        html += '  <div class="ec-block ec-block-aspect"><div class="ec-block-label">Synergy</div><div class="ec-block-val">' + escapeHtml(ss.synergy) + '</div></div>';
        html += '</section>';
      }

      // Glyphs
      if (eg.glyphs) {
        html += '<section class="ec-section ec-section-jewelry">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{1F4DC}</span><h2 class="ec-section-title">Glyph Priority</h2></header>';
        html += '  <ol class="ec-affix-list">';
        for (const g of eg.glyphs.priority) {
          html += '<li class="ec-affix"><span class="ec-affix-n">' + g.rank + '</span><span class="ec-affix-stat"><strong>' + escapeHtml(g.name) + '</strong> &middot; ' + escapeHtml(g.board) + '</span></li>';
        }
        html += '  </ol>';
        html += '  <div class="ec-block"><div class="ec-block-label">Leveling thresholds</div><ul class="ec-affix-list">';
        for (const t of eg.glyphs.levelingThresholds) {
          html += '<li class="ec-affix"><span class="ec-affix-stat">Glyph ' + t.glyphLevel + ' needs Pit ' + t.pitRequired + ' &middot; ' + escapeHtml(t.note) + '</span></li>';
        }
        html += '  </ul></div>';
        if (eg.glyphs.farmNote) html += '  <p class="ec-notes">' + escapeHtml(eg.glyphs.farmNote) + '</p>';
        html += '</section>';
      }

      // Paragon path, highlight the one that applies to current paragon
      if (eg.paragon) {
        const sub = paragon < 200;
        html += '<section class="ec-section ec-section-armor">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{1F333}</span><h2 class="ec-section-title">Paragon Path</h2></header>';
        html += '  <div class="ec-grid">';
        html += '<div class="ec-pair' + (sub ? '' : ' acq-done-soft') + '"><div class="ec-pair-head">' + escapeHtml(eg.paragon.sub200Path.label) + (sub ? ' <span class="ec-affix-flag ec-flag-defining">YOU ARE HERE</span>' : '') + '</div><div class="ec-block-val">' + escapeHtml(eg.paragon.sub200Path.description) + '</div></div>';
        html += '<div class="ec-pair' + (sub ? ' acq-done-soft' : '') + '"><div class="ec-pair-head">' + escapeHtml(eg.paragon.over200Path.label) + (!sub ? ' <span class="ec-affix-flag ec-flag-defining">YOU ARE HERE</span>' : '') + '</div><div class="ec-block-val">' + escapeHtml(eg.paragon.over200Path.description) + '</div></div>';
        html += '  </div>';
        html += '  <div class="ec-block"><div class="ec-block-label">Board order</div><ol class="ec-affix-list">';
        for (const b of eg.paragon.boardOrder) {
          html += '<li class="ec-affix"><span class="ec-affix-n">' + b.rank + '</span><span class="ec-affix-stat">' + escapeHtml(b.name) + (b.glyph && b.glyph !== 'none' ? ' &middot; glyph: ' + escapeHtml(b.glyph) : '') + '</span></li>';
        }
        html += '  </ol></div>';
        html += '  <div class="ec-block ec-block-socket"><div class="ec-block-label">Node strategy</div><ol class="ec-affix-list">';
        for (const ns of eg.paragon.nodeStrategy) {
          html += '<li class="ec-affix"><span class="ec-affix-n">' + ns.rank + '</span><span class="ec-affix-stat">' + escapeHtml(ns.action) + '</span></li>';
        }
        html += '  </ol></div>';
        html += '</section>';
      }

      // Mechanics
      const m = eg.mechanics;
      if (m) {
        html += '<section class="ec-section">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{1F501}</span><h2 class="ec-section-title">Resource Mechanics</h2></header>';
        html += '  <div class="ec-grid">';
        if (m.shadowform) {
          html += '<div class="ec-pair"><div class="ec-pair-head">Shadowform</div>';
          html += '<div class="ec-block"><div class="ec-block-label">Generators</div><ul class="ec-affix-list">' + m.shadowform.sources.map((x) => '<li class="ec-affix"><span class="ec-affix-stat">' + escapeHtml(x) + '</span></li>').join('') + '</ul></div>';
          html += '<div class="ec-block"><div class="ec-block-label">Consumers</div><ul class="ec-affix-list">' + m.shadowform.consumers.map((x) => '<li class="ec-affix"><span class="ec-affix-stat">' + escapeHtml(x) + '</span></li>').join('') + '</ul></div>';
          html += '<div class="ec-block ec-block-aspect"><div class="ec-block-label">While active</div><div class="ec-block-val">' + escapeHtml(m.shadowform.whileActive) + '. ' + escapeHtml(m.shadowform.maxNote || '') + '</div></div>';
          html += '</div>';
        }
        if (m.wrath) {
          html += '<div class="ec-pair"><div class="ec-pair-head">Wrath</div>';
          html += '<div class="ec-block"><div class="ec-block-label">Sources</div><ul class="ec-affix-list">' + m.wrath.sources.map((x) => '<li class="ec-affix"><span class="ec-affix-stat">' + escapeHtml(x) + '</span></li>').join('') + '</ul></div>';
          html += '<div class="ec-block ec-block-socket"><div class="ec-block-label">Optimal kit</div><div class="ec-block-val">' + escapeHtml(m.wrath.optimalKit) + '</div></div>';
          html += '</div>';
        }
        html += '  </div>';
        if (m.offering) {
          html += '  <div class="ec-block"><div class="ec-block-label">Offering</div><div class="ec-block-val">Generators: ' + escapeHtml(m.offering.generators) + '<br>Consumers: ' + escapeHtml(m.offering.consumers) + '</div></div>';
        }
        if (m.bossRotation && m.bossRotation.length) {
          html += '  <div class="ec-block ec-block-temper"><div class="ec-block-label">Boss rotation</div><ol class="ec-affix-list">';
          for (const step of m.bossRotation) {
            html += '<li class="ec-affix"><span class="ec-affix-n">' + (step.step || '') + '</span><span class="ec-affix-stat">' + escapeHtml(step.action) + '</span></li>';
          }
          html += '  </ol></div>';
        }
        html += '</section>';
      }

      paint(root, html);
    },
  };

  // ========================================
  // ENDGAME PROGRESSION (Sprint 7)
  // Difficulty ladder, Pit tiers, Lair Boss farming map,
  // War Plans tier list, Helltide and Nightmare Dungeons.
  // Reads endgamedata.js, marks current Torment and Pit from
  // AppState so a Paragon 25 player sees where they are.
  // ========================================
  const EndgameProgression = {
    render() {
      const root = document.getElementById('endgameProgressionRoot');
      if (!root) return;
      const eg = window.D4_ENDGAME;
      if (!eg || !eg.difficulty) {
        paint(root, '<div class="placeholder-card"><i class="fa-solid fa-mountain placeholder-icon"></i><div class="placeholder-title">No progression data</div></div>');
        return;
      }
      const c = (AppState.data && AppState.data.character) || {};
      const curTorment = Number(c.torment) || 0;
      const curPit = Number(c.pitHighest) || 0;
      const conf = (x) => 'rg-conf-' + String(x || 'MEDIUM').toLowerCase();

      let html = '';

      html += '<section class="ec-hero">';
      html += '  <h2 class="ec-hero-title">Endgame Progression</h2>';
      html += '  <p class="ec-hero-sub">Your difficulty path, Pit milestones, and where to farm every target. Current markers come from your tracked Torment and Pit.</p>';
      html += '  <div class="ec-hero-meta">Torment ' + curTorment + ' &middot; Pit ' + curPit + ' tracked</div>';
      html += '</section>';

      // Difficulty ladder
      html += '<section class="ec-section ec-section-stats">';
      html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{1F4C8}</span><h2 class="ec-section-title">Difficulty Ladder</h2></header>';
      html += '  <ol class="ec-step-list">';
      for (const d of eg.difficulty.path) {
        const tMatch = d.level.match(/Torment (\d)/);
        const tNum = tMatch ? Number(tMatch[1]) : null;
        const reached = tNum != null && curTorment >= tNum;
        const isCurrent = tNum != null && curTorment === tNum;
        html += '<li class="ec-step' + (reached ? ' acq-done-soft' : '') + (isCurrent ? ' ec-step-current' : '') + '">';
        html += '  <span class="ec-step-n">' + (isCurrent ? '▶' : (reached ? '✓' : '•')) + '</span>';
        html += '  <div class="ec-step-body"><div class="ec-step-label">' + escapeHtml(d.level) + '</div><div class="ec-step-text">' + escapeHtml(d.target) + '</div>';
        html += '<span class="aspect-priority ' + conf(d.confidence) + ' ec-step-conf">' + (d.confidence || 'MEDIUM') + '</span></div>';
        html += '</li>';
      }
      html += '  </ol>';
      if (eg.difficulty.note) html += '  <p class="ec-notes">' + escapeHtml(eg.difficulty.note) + '</p>';
      html += '</section>';

      // Pit milestones
      if (eg.pit && eg.pit.milestones) {
        html += '<section class="ec-section">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{1F3AF}</span><h2 class="ec-section-title">Pit Milestones</h2></header>';
        html += '  <div class="ec-grid">';
        for (const m of eg.pit.milestones) {
          const tierNum = parseInt(String(m.tier), 10);
          const reached = !isNaN(tierNum) && curPit >= tierNum;
          html += '<div class="ec-pair' + (reached ? ' acq-done-soft' : '') + '">';
          html += '  <div class="ec-pair-head"><span class="ec-tier-badge">Pit ' + escapeHtml(String(m.tier)) + '</span>' + (reached ? '<span class="ec-affix-flag ec-flag-defining">REACHED</span>' : '') + '</div>';
          html += '  <div class="ec-block-val">' + escapeHtml(m.note) + '</div>';
          html += '  <span class="aspect-priority ' + conf(m.confidence) + '">' + (m.confidence || 'MEDIUM') + '</span>';
          html += '</div>';
        }
        html += '  </div>';
        html += '</section>';
      }

      // Lair Boss farming map
      if (eg.bosses && eg.bosses.length) {
        html += '<section class="ec-section ec-section-weapons">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{1F409}</span><h2 class="ec-section-title">Lair Boss Farming Map</h2></header>';
        html += '  <div class="ec-grid">';
        for (const b of eg.bosses) {
          html += '<div class="ec-pair">';
          html += '  <div class="ec-pair-head">' + slotSvg('rune', 'ec-pair-svg') + ' ' + escapeHtml(b.name) + ' <span class="ec-tag ec-tag-tier">' + escapeHtml(b.tier) + '</span></div>';
          html += '  <div class="ec-block"><div class="ec-block-label">Drops</div><ul class="ec-affix-list">';
          for (const drop of b.drops) {
            html += '<li class="ec-affix"><span class="ec-affix-stat">' + escapeHtml(drop) + '</span></li>';
          }
          html += '  </ul></div>';
          html += '  <div class="ec-block ec-block-socket"><div class="ec-block-label">Summon materials</div><div class="ec-block-val">' + escapeHtml(b.materials) + '</div></div>';
          html += '  <span class="aspect-priority ' + conf(b.confidence) + '">' + (b.confidence || 'MEDIUM') + '</span>';
          html += '</div>';
        }
        html += '  </div>';
        html += '</section>';
      }

      // War Plans tier list
      if (eg.warplans && eg.warplans.length) {
        html += '<section class="ec-section ec-section-jewelry">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{2694}</span><h2 class="ec-section-title">War Plans Priority</h2></header>';
        html += Templates.renderTierList(eg.warplans, 'tier', { labelField: 'activity', subField: 'role' });
        html += '</section>';
      }

      // Helltide and Nightmare Dungeons
      if (eg.activities) {
        html += '<section class="ec-section">';
        html += '  <header class="ec-section-head"><span class="ec-section-emoji" aria-hidden="true">\u{1F525}</span><h2 class="ec-section-title">Helltide and Nightmare Dungeons</h2></header>';
        html += '  <div class="ec-grid">';
        const ht = eg.activities.helltide;
        if (ht) {
          html += '<div class="ec-pair">';
          html += '  <div class="ec-pair-head">Helltide</div>';
          html += '  <div class="ec-block"><div class="ec-block-label">Currency</div><div class="ec-block-val">' + escapeHtml(ht.currency) + '</div></div>';
          html += '  <div class="ec-block"><div class="ec-block-label">Chest priority</div><div class="ec-block-val">' + escapeHtml(ht.chestPriority) + '</div></div>';
          html += '  <div class="ec-block"><div class="ec-block-label">Cadence</div><div class="ec-block-val">' + escapeHtml(ht.cadence) + '</div></div>';
          if (ht.targetUniques) html += '  <div class="ec-block ec-block-aspect"><div class="ec-block-label">Target uniques</div><div class="ec-bk-best">' + ht.targetUniques.map((u) => escapeHtml(u)).join(', ') + '</div></div>';
          html += '</div>';
        }
        const nd = eg.activities.nightmareDungeons;
        if (nd) {
          html += '<div class="ec-pair">';
          html += '  <div class="ec-pair-head">Nightmare Dungeons</div>';
          html += '  <div class="ec-block"><div class="ec-block-label">Primary use</div><div class="ec-block-val">' + escapeHtml(nd.primaryUse) + '</div></div>';
          html += '  <div class="ec-block"><div class="ec-block-label">Targets</div><div class="ec-block-val">' + escapeHtml(nd.targetUniques) + '</div></div>';
          html += '</div>';
        }
        html += '  </div>';
        html += '</section>';
      }

      paint(root, html);
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
  window.D4 = { AppState, Router, QuickUpdate, Dashboard, LevelingPathHeader, Walkthrough, SkillTimeline, Controller, Skills, Shards, Aspects, Paragon, Uniques, Bosses, Endbuild, Talismans, WarPlans, Mercenary, Patch, Toast, Modal, Nav };

})();
