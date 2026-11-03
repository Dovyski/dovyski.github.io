// Devpilot landing: icons, reveal on scroll, and the animated app fragments.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- icons (lucide-style strokes) ----------
  function circle(cx, cy, r) { return 'M' + (cx - r) + ' ' + cy + 'a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0a' + r + ' ' + r + ' 0 1 0 ' + -2 * r + ' 0'; }
  var ICONS = {
    chev: 'm9 18 6-6-6-6', down: 'm6 9 6 6 6-6', back: 'm15 18-6-6 6-6', fwd: 'm9 18 6-6-6-6',
    term: 'm4 17 6-6-6-6M12 19h8', plus: 'M5 12h14M12 5v14', min: 'M5 12h14', max: 'M5 5h14v14H5z', x: 'M18 6 6 18M6 6l12 12',
    globe: circle(12, 12, 10) + 'M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
    search: circle(11, 11, 8) + 'm21 21-4.3-4.3',
    msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    folder: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
    panel: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM15 3v18',
    list: 'M3 6h18M3 12h18M3 18h18', issue: circle(12, 12, 10) + circle(12, 12, 1),
    pr: circle(18, 18, 3) + circle(6, 6, 3) + 'M13 6h3a2 2 0 0 1 2 2v7M6 9v12',
    q: circle(12, 12, 10) + 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01',
    link: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
    vol: 'M11 5 6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07',
    tag: 'M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l6.59-6.59a1 1 0 0 0 0-1.41z' + circle(7, 7, 1),
    eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' + circle(12, 12, 3),
    baby: circle(12, 12, 10) + 'M12 6v6l4 2',
    bot: 'M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zM12 7v4M12 3v1M8 16h.01M16 16h.01',
    copy: 'M8 8h12v12H8zM4 16V4h12',
    reload: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
    monitor: 'M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 21h8M12 17v4',
    server: 'M4 2h16v8H4zM4 14h16v8H4zM6 6h.01M6 18h.01'
  };
  document.querySelectorAll('i[data-i]').forEach(function (el) {
    var name = el.getAttribute('data-i');
    var svg = name === 'play'
      ? '<svg class="ic" viewBox="0 0 24 24" style="fill:currentColor;stroke:none;width:14px;height:14px"><path d="M8 5.5v13l11-6.5z"/></svg>'
      : '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + ICONS[name] + '"/></svg>';
    var tmp = document.createElement('span'); tmp.innerHTML = svg;
    var node = tmp.firstChild;
    if (el.className) node.setAttribute('class', 'ic ' + el.className);
    for (var k in el.dataset) if (k !== 'i') node.dataset[k] = el.dataset[k];
    el.replaceWith(node);
  });

  // ---------- reveal ----------
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });

  // ---------- braille spinners ----------
  var FR = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏', fi = 0;
  if (!reduced) setInterval(function () { fi = (fi + 1) % FR.length; document.querySelectorAll('.spin').forEach(function (s) { s.textContent = FR[fi]; }); }, 90);

  // ---------- demo runtime ----------
  var STOP = {};
  function waiter(tok) {
    return function (ms) {
      return new Promise(function (res, rej) {
        if (reduced) { return tok.c ? rej(STOP) : res(); }
        setTimeout(function () { tok.c ? rej(STOP) : res(); }, ms);
      });
    };
  }
  function $(r, s) { return r.querySelector(s); }
  function on(el, v) { if (el) el.classList.toggle('on', v !== false); }

  function demo(root, script) {
    var tpl = root.innerHTML, tok = null;
    function start() {
      if (tok) return;
      var t = tok = { c: false };
      (async function () {
        while (!t.c) {
          root.innerHTML = tpl;
          var w = waiter(t);
          var api = makeApi(root, w);
          try { await script(api, w); await w(2200); }
          catch (e) { if (e !== STOP) { console.error(e); return; } }
          if (reduced) return;
        }
      })();
    }
    function stop() { if (tok) { tok.c = true; tok = null; } }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.isIntersecting ? start() : stop(); });
    }, { threshold: 0.3 }).observe(root);
  }

  function makeApi(root, w) {
    var cur = $(root, '[data-cursor]');
    var api = {
      root: root,
      $: function (s) { return $(root, s); },
      // Position (px) of an element inside root: fx/fy are fractions of its box.
      pos: function (el, fx, fy) {
        var r = el.getBoundingClientRect(), R = root.getBoundingClientRect();
        return { x: r.left - R.left + r.width * (fx == null ? .5 : fx), y: r.top - R.top + r.height * (fy == null ? .5 : fy) };
      },
      cursorTo: async function (el, fx, fy) {
        if (!cur) return;
        var p = api.pos(el, fx == null ? .35 : fx, fy == null ? .55 : fy);
        if (!cur.classList.contains('on')) {
          var R = root.getBoundingClientRect();
          cur.style.transition = 'none';
          cur.style.transform = 'translate(' + (R.width * .55) + 'px,' + (R.height + 20) + 'px)';
          cur.offsetWidth; cur.style.transition = '';
          on(cur);
        }
        cur.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
        await w(800);
      },
      click: async function () { if (!cur) return; cur.classList.remove('click'); cur.offsetWidth; cur.classList.add('click'); await w(220); },
      hideCursor: function () { on(cur, false); },
      type: async function (el, text, speed) {
        for (var i = 0; i < text.length; i++) { el.textContent += text[i]; await w(speed || 38); }
      },
      line: function (term, html, cls) {
        var d = document.createElement('div'); d.className = 'tl new' + (cls ? ' ' + cls : ''); d.innerHTML = html;
        var prompt = $(term, '.prompt');
        prompt && prompt.parentNode === term && !prompt.dataset.keep ? term.insertBefore(d, prompt) : term.appendChild(d);
        return d;
      },
      row: function (name, status, detail, glyph) {
        root.querySelectorAll('[data-row="' + name + '"]').forEach(function (row) {
          row.querySelector('.dot').className = 'dot ' + status;
          var div = row.querySelector('div'), sm = div.querySelector('small');
          if (detail == null) { if (sm) sm.remove(); }
          else { if (!sm) { sm = document.createElement('small'); div.appendChild(sm); } sm.textContent = detail; }
          var g = row.querySelector('.glyph');
          if (g) { g.className = 'glyph' + (glyph === 'spin' ? ' spin' : ''); g.textContent = glyph === 'spin' ? '⠋' : ''; row.classList.toggle('attn', glyph === 'attn'); }
        });
        root.querySelectorAll('[data-row-dot="' + name + '"]').forEach(function (d) { d.className = 'dot ' + status; });
      },
      count: function (sel, n) { var e = $(root, sel); if (!e) return; e.textContent = n; e.classList.add('bump'); setTimeout(function () { e.classList.remove('bump'); }, 900); },
      press: async function (el) { el.classList.add('press'); await w(160); el.classList.remove('press'); }
    };
    return api;
  }

  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  // ---------- hero ----------
  async function hero(a, w) {
    var term = a.$('[data-term]'), orb = a.$('[data-orb]'), badge = a.$('[data-badge]'), fq = a.$('[data-floatq]');
    await w(900);
    await a.type(a.$('[data-type]'), 'Cut the v0.3.20 release', 42);
    await w(300);
    a.$('.tcaret').remove();
    a.$('.prompt').dataset.keep = '1';
    a.row('release', 'working', 'Thinking…', 'spin');
    orb.classList.add('pulse');
    await w(900);
    a.line(term, '<span class="c-gr">●</span> Bumping versions, then build, sign and publish.');
    await w(700);
    a.line(term, '<span class="c-gr">●</span> <b>Bash</b>(./scripts/release.ps1 -Version 0.3.20)');
    a.row('release', 'running', 'Bash ./scripts/release.ps1 -Version 0.3.20', 'spin');
    await w(500);
    a.line(term, '⎿ Bumped tauri.conf.json, Cargo.toml, package.json → 0.3.20', 'ind mut');
    await w(500);
    a.line(term, '  Compiling devpilot v0.3.20 (src-tauri)', 'ind mut');
    await w(900);
    // another terminal asks
    a.row('mesh', 'asking', 'Which branch should the mesh fix go to?', 'attn');
    orb.classList.remove('pulse'); orb.classList.add('amber');
    badge.textContent = '1'; badge.className = 'orb-badge amber on';
    a.count('[data-pend]', 1);
    await w(600);
    on(fq);
    await w(900);
    await a.cursorTo(a.$('[data-opt="2"]'));
    await a.click(); on(a.$('[data-opt="2"]'));
    await w(350);
    await a.cursorTo(a.$('[data-send]'));
    await a.click(); await a.press(a.$('[data-send]'));
    on(fq, false); a.hideCursor();
    orb.classList.remove('amber'); badge.className = 'orb-badge';
    a.count('[data-pend]', 0);
    a.row('mesh', 'working', 'Cherry-pick onto release/0.3', 'spin');
    await w(800);
    a.line(term, '⎿ Signed and uploaded Devpilot_0.3.20_x64-setup.exe', 'ind mut');
    await w(700);
    a.line(term, '<span class="c-gr">●</span> <b>Bash</b>(gh release create v0.3.20 --notes-file CHANGELOG.md)');
    await w(600);
    var list = a.$('[data-ctx]');
    var sec = document.createElement('div'); sec.className = 'ctx-sec'; sec.textContent = 'New';
    var card = document.createElement('div'); card.className = 'card enter hot';
    card.innerHTML = a.$('[data-ctx] .card').innerHTML
      .replace('acme/web#5921', 'acme/devpilot#5940').replace('Per-account usage in the status bar', 'chore: release v0.3.20')
      .replace('>2h<', '>now<');
    list.insertBefore(card, list.firstChild); list.insertBefore(sec, card);
    a.count('[data-prs]', 3);
    await w(900);
    a.line(term, '<span class="c-gr">●</span> Published Devpilot 0.3.20. Release notes and installer are live.');
    a.row('release', 'done', 'Released Devpilot 0.3.20', null);
    card.classList.remove('hot');
    await w(500);
    // it speaks
    orb.classList.add('speaking'); on(a.$('[data-caption]'));
    a.root.querySelector('.app-side [data-row="release"]').classList.add('flash');
    await w(3200);
    orb.classList.remove('speaking'); on(a.$('[data-caption]'), false);
    await w(800);
  }

  // ---------- status ----------
  async function status(a, w) {
    var sd = a.$('.status-demo');
    function focus(s) { sd.classList.add('focus'); a.root.querySelectorAll('.lg').forEach(function (l) { l.classList.toggle('on', l.dataset.lg === s); }); }
    var seq = [
      ['release', 'working', 'Thinking…', 'spin'],
      ['release', 'running', 'Bash pnpm tauri build', 'spin'],
      ['android-qa', 'running', 'Running 3 subagents', 'spin'],
      ['release', 'asking', 'Approve the release plan?', 'attn'],
      ['ios-build', 'exited', 'Process exited (65)', null],
      ['release', 'done', 'Released Devpilot 0.3.20', null],
      ['android-qa', 'done', 'QA pass on build 84: green', null],
      ['orb', 'idle', null, null]
    ];
    await w(700);
    for (var i = 0; i < seq.length; i++) {
      var s = seq[i];
      a.row(s[0], s[1], s[2], s[3]);
      focus(s[1]);
      await w(1500);
    }
    sd.classList.remove('focus');
  }

  // ---------- ask ----------
  async function ask(a, w) {
    var term = a.$('[data-term]');
    await w(1200);
    await a.cursorTo(a.$('[data-opt="1"]'));
    await w(250);
    await a.cursorTo(a.$('[data-opt="2"]'));
    await a.click(); on(a.$('[data-opt="2"]'));
    await w(350);
    await a.cursorTo(a.$('[data-send]'));
    await a.click(); await a.press(a.$('[data-send]'));
    a.$('[data-qcard]').classList.add('done');
    a.count('[data-pend]', 0);
    a.hideCursor();
    a.$('[data-wait]').remove();
    a.$('[data-askdot]').className = 'dot working';
    a.line(term, esc('<devpilot-answer id="mesh-branch">release/0.3</devpilot-answer>'), 'c-vi');
    await w(900);
    a.line(term, '<span class="c-gr">●</span> Landing the fix on release/0.3.');
    await w(600);
    a.line(term, '<span class="c-gr">●</span> <b>Bash</b>(git cherry-pick 4f2a91c)');
    await w(500);
    a.line(term, '⎿ [release/0.3 9c1e07d] fix(mesh): keep the gate up across reconnects', 'ind mut');
  }

  // ---------- progress ----------
  async function progress(a, w) {
    var steps = ['Bumping versions', 'Building the installer', 'Signing', 'Uploading the release', 'Tagging v0.3.20'];
    var bar = a.$('[data-pbar]'), bar2 = a.$('[data-pbar2]');
    await w(500);
    for (var i = 0; i < steps.length; i++) {
      a.$('[data-pstep]').textContent = (i + 1) + '/5';
      a.$('[data-pdetail]').textContent = steps[i];
      bar.style.width = ((i + 1) * 20) + '%';
      var p2 = Math.min(100, (i + 1) * 24);
      bar2.style.width = p2 + '%'; a.$('[data-pstep2]').textContent = p2 + '%';
      if (p2 === 100) a.$('[data-pdetail2]').textContent = 'All pods healthy';
      await w(1100);
    }
    bar2.style.width = '100%'; a.$('[data-pstep2]').textContent = '100%'; a.$('[data-pdetail2]').textContent = 'All pods healthy';
    await w(500);
    [['[data-p1]', '[data-pspin]', 'Released'], ['[data-p2]', '[data-pspin2]', 'All pods healthy']].forEach(function (x) {
      var r = a.$(x[0]); r.classList.add('done');
      var s = a.$(x[1]); s.className = 'c-gr'; s.textContent = '✓';
      r.querySelector('.pbar').style.display = 'none';
    });
    a.$('[data-pstep]').textContent = 'done'; a.$('[data-pdetail]').textContent = 'Released';
    a.$('[data-pstep2]').textContent = 'done';
    await w(1200);
  }

  // ---------- overwatch ----------
  async function overwatch(a, w) {
    var orb = a.$('[data-orb]'), list = a.$('[data-owlist]');
    await w(700);
    orb.classList.add('pulse');
    await w(700);
    await a.cursorTo(orb, .5, .5);
    await a.click();
    on(list);
    await w(500);
    var rows = a.root.querySelectorAll('.ow-row');
    for (var i = 0; i < 3; i++) {
      rows.forEach(function (r) { r.classList.remove('hl'); });
      await a.cursorTo(rows[i], .3, .5); rows[i].classList.add('hl');
      await w(400);
    }
    await w(600);
    await a.cursorTo(orb, .5, .5); await a.click();
    on(list, false); a.hideCursor();
    rows.forEach(function (r) { r.classList.remove('hl'); });
    await w(900);
    var rel = a.$('[data-ow="release"]');
    rel.querySelector('.dot').className = 'dot done';
    rel.querySelector('small').textContent = 'Released Devpilot 0.3.20';
    orb.classList.remove('pulse'); orb.classList.add('speaking'); on(a.$('[data-caption]'));
    await w(3200);
    orb.classList.remove('speaking'); on(a.$('[data-caption]'), false);
  }

  // ---------- context + PR actions ----------
  async function context(a, w) {
    var card = a.$('[data-newcard]'), term = a.$('[data-term]');
    var sec = card.previousElementSibling;
    card.style.display = 'none'; sec.style.display = 'none';
    a.$('[data-prs]').textContent = '0';
    await w(900);
    sec.style.display = ''; card.style.display = ''; card.classList.add('enter', 'hot');
    a.count('[data-prs]', 1);
    await w(1300);
    var ch = a.$('[data-checks]'); ch.textContent = '✓ 14/14'; ch.className = 'c-gr';
    card.classList.remove('hot');
    await w(700);
    await a.cursorTo(card, .45, .45);
    await w(350);
    var hc = a.$('[data-hover]'), ctx = a.$('.frag-ctx');
    var pc = a.pos(ctx, 0, 0), pcard = a.pos(card, 0, 0);
    hc.style.left = (pc.x - 310) + 'px'; hc.style.top = pcard.y + 'px';
    on(hc);
    await w(2400);
    on(hc, false);
    await a.click();
    var menu = a.$('[data-menu]'), p = a.pos(card, .45, .45);
    var R = a.root.getBoundingClientRect();
    menu.style.left = Math.min(p.x + 4, R.width - 222) + 'px'; menu.style.top = Math.max(8, Math.min(p.y + 4, R.height - 330)) + 'px';
    on(menu);
    await w(500);
    var item = a.$('[data-mi="review"]');
    await a.cursorTo(item, .3, .5); item.classList.add('hl');
    await w(250);
    await a.click();
    on(menu, false); a.hideCursor();
    await a.type(a.$('[data-type]'), '/review-locally https://github.com/acme/web/pull/5932', 12);
    await w(250);
    a.$('.tcaret').remove(); a.$('.prompt').dataset.keep = '1';
    a.line(term, '<span class="c-gr">●</span> Checking out #5932 in a fresh worktree…');
    await w(700);
    a.line(term, '<span class="c-gr">●</span> Reviewing 14 changed files across 3 commits.');
  }

  // ---------- browser + mockup feedback ----------
  async function browser(a, w) {
    await w(1000);
    await a.cursorTo(a.$('[data-opt="2"]'));
    await a.click(); on(a.$('[data-opt="2"]'));
    on(a.$('[data-note]'));
    await w(400);
    await a.cursorTo(a.$('[data-note]'), .1, .5);
    await a.type(a.$('[data-type]'), 'Make the button full width and drop the footer link.', 26);
    await w(300);
    a.$('[data-note] .tcaret').remove();
    await a.cursorTo(a.$('[data-send]'));
    await a.click(); await a.press(a.$('[data-send]'));
    a.$('[data-dock]').classList.add('sent'); a.hideCursor();
    a.$('[data-bdot]').className = 'dot working';
    await w(1800);
    var rl = a.$('[data-reload]'); rl.classList.add('spinning');
    a.$('[data-page]').classList.add('fade');
    await w(350);
    a.$('[data-mkbtn]').classList.add('wide'); a.$('[data-mklink]').classList.add('gone');
    a.$('[data-page]').classList.remove('fade');
    a.$('[data-bdot]').className = 'dot done';
    await w(1200);
  }

  // ---------- custom commands ----------
  async function prompts(a, w) {
    var term = a.$('[data-term]'), tool = a.$('[data-ptool]'), menu = a.$('[data-pmenu]');
    await w(900);
    await a.cursorTo(tool, .5, .6);
    await a.click(); on(tool); on(menu);
    await w(400);
    var item = a.$('[data-pm="gate"]');
    await a.cursorTo(item, .25, .5); item.classList.add('hl');
    await w(250);
    await a.click();
    on(menu, false); on(tool, false); a.hideCursor();
    await a.type(a.$('[data-type]'), 'Run the test gate and report failures', 8);
    await w(200);
    a.$('.tcaret').remove(); a.$('.prompt').dataset.keep = '1';
    a.$('[data-pdot]').className = 'dot working';
    await w(500);
    a.line(term, '<span class="c-gr">●</span> <b>Bash</b>(pnpm test --run)');
    await w(600);
    a.line(term, '⎿ 412 passed · 0 failed (38.2s)', 'ind mut');
    a.$('[data-pdot]').className = 'dot done';
    await w(900);
    var fk = a.$('[data-fk="F9"]');
    on(fk); on(a.$('[data-toast]'));
    await w(260); on(fk, false);
    await w(2200);
    on(a.$('[data-toast]'), false);
  }

  // ---------- mesh ----------
  async function mesh(a, w) {
    var pk = a.$('[data-packet]'), from = a.$('[data-h="chief"]'), to = a.$('[data-h="qa"]'), inbox = a.$('[data-inbox]');
    await w(800);
    from.classList.add('hl');
    var p0 = a.pos(from, .6, .5), p1 = a.pos(to, .2, .5);
    pk.style.transition = 'none';
    pk.style.transform = 'translate(' + p0.x + 'px,' + (p0.y - 12) + 'px)';
    pk.offsetWidth; pk.style.transition = '';
    on(pk);
    await w(500);
    pk.style.transform = 'translate(' + p1.x + 'px,' + (p1.y - 12) + 'px)';
    await w(1450);
    on(pk, false); from.classList.remove('hl'); to.classList.add('hl');
    to.querySelector('.dot').className = 'dot working';
    var host = to.closest('.host'), pi = a.pos(host, .5, 1);
    inbox.style.left = Math.max(8, Math.min(pi.x - inbox.offsetWidth / 2, a.root.getBoundingClientRect().width - inbox.offsetWidth - 8)) + 'px'; inbox.style.top = (pi.y + 14) + 'px';
    on(inbox);
    await w(2600);
    to.classList.remove('hl');
  }

  var DEMOS = { hero: hero, status: status, ask: ask, progress: progress, overwatch: overwatch, context: context, browser: browser, prompts: prompts, mesh: mesh };
  document.querySelectorAll('[data-demo]').forEach(function (el) { var f = DEMOS[el.dataset.demo]; if (f) demo(el, f); });
})();
