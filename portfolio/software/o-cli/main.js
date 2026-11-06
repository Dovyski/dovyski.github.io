// o-cli landing: icons, reveal on scroll, and the scripted terminal sessions.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- icons (lucide-style strokes) ----------
  function circle(cx, cy, r) { return 'M' + (cx - r) + ' ' + cy + 'a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0a' + r + ' ' + r + ' 0 1 0 ' + -2 * r + ' 0'; }
  var ICONS = {
    chev: 'm9 18 6-6-6-6', back: 'm15 18-6-6 6-6', fwd: 'm9 18 6-6-6-6',
    term: 'm4 17 6-6-6-6M12 19h8', plus: 'M5 12h14M12 5v14', min: 'M5 12h14', max: 'M5 5h14v14H5z', x: 'M18 6 6 18M6 6l12 12',
    folder: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6',
    msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    db: 'M3 5c0-1.7 4-3 9-3s9 1.3 9 3-4 3-9 3-9-1.3-9-3M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3'
  };
  document.querySelectorAll('i[data-i]').forEach(function (el) {
    var tmp = document.createElement('span');
    tmp.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + ICONS[el.getAttribute('data-i')] + '"/></svg>';
    var node = tmp.firstChild;
    if (el.className) node.setAttribute('class', 'ic ' + el.className);
    el.replaceWith(node);
  });

  // ---------- reveal ----------
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }

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
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  function demo(root, script) {
    var tpl = root.innerHTML, tok = null;
    function start() {
      if (tok) return;
      var t = tok = { c: false };
      (async function () {
        while (!t.c) {
          root.innerHTML = tpl;
          var w = waiter(t);
          try { await script(makeApi(root, w), w); await w(3200); }
          catch (e) { if (e !== STOP) { console.error(e); return; } }
          if (reduced) return;
        }
      })();
    }
    function stop() { if (tok) { tok.c = true; tok = null; } }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.isIntersecting ? start() : stop(); });
    }, { threshold: 0.25 }).observe(root);
  }

  function makeApi(root, w) {
    var cur = $(root, '[data-cursor]');
    var api = {
      root: root,
      $: function (s) { return $(root, s); },
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
      press: async function (el) { el.classList.add('press'); await w(160); el.classList.remove('press'); },
      type: async function (el, text, speed) {
        for (var i = 0; i < text.length; i++) { el.textContent += text[i]; await w(speed || 38); }
      },
      scroll: function (term) { term.scrollTop = term.scrollHeight; },
      // Append one output line (HTML) to a terminal and keep the newest line in view.
      line: function (term, html, cls) {
        var d = document.createElement('div'); d.className = 'tl new' + (cls ? ' ' + cls : ''); d.innerHTML = html == null ? '' : html;
        term.appendChild(d); api.scroll(term);
        return d;
      },
      // A prompt line that types a command, then loses its caret.
      cmd: async function (term, text, opts) {
        opts = opts || {};
        var d = api.line(term, (opts.prompt || '<span class="ps">$</span> ') + '<span class="typed"></span><span class="tcaret"></span>', opts.gap === false ? '' : 'gap');
        if (term.children.length === 1) d.classList.remove('gap');
        await w(opts.pause == null ? 350 : opts.pause);
        await api.type(d.querySelector('.typed'), text, opts.speed || 34);
        await w(260);
        d.querySelector('.tcaret').remove();
        return d;
      },
      // A line with a spinner that later settles into its final text.
      spin: function (term, html, cls) { return api.line(term, '<span class="spin">⠋</span> ' + html, cls); },
      settle: function (line, html) { line.innerHTML = html; },
      idle: function (term, prompt) { api.line(term, (prompt || '<span class="ps">$</span> ') + '<span class="tcaret"></span>', 'gap'); }
    };
    return api;
  }

  function dots(label, width) { var n = Math.max(3, width - label.length); return label + ' ' + '.'.repeat(n); }
  function tbl(cols, rows) {
    return '<div class="tbl c' + cols + '">' + rows.map(function (r) { return r.map(function (c) { return '<span>' + c + '</span>'; }).join(''); }).join('') + '</div>';
  }

  // ---------- hero: o work ----------
  async function hero(a, w) {
    var t = a.$('[data-term]'), clock = a.$('[data-clock]');
    a.line(t, '<span class="mut">PowerShell 7.5 · ~/work</span>');
    await w(500);
    await a.cmd(t, 'o w acme-app/124 --herd', { speed: 55, pause: 600 });
    a.line(t, '<span class="c-cy">→</span> Fetching issue #124 from acme/acme-app...');
    await w(600);
    var steps = [
      ['clone', 'Step 1: Cloning acme/acme-app...', ["Cloning into 'acme-app-124'... done."]],
      ['branch', 'Step 2: Creating branch 124-retry-failed-deliveries from dev...', ['pushed with an empty initial commit']],
      ['pr', 'Step 3: Creating pull request...', ['draft #131 · WIP (issue #124) → dev']],
      ['db', 'Step 4: Creating database acme-app-124...', ['acme-app-124, acme-app-124_test']],
      ['site', 'Step 5: Linking Laravel Herd site acme-app-124...', ['https://acme-app-124.test']],
      ['env', 'Step 6: Setting up environment...', ['.env: DB_*, APP_URL, CACHE_PREFIX', 'composer install · npm install · npm run build', 'migrate:fresh · db:seed']],
      ['test', 'Step 7: Creating .env.testing...', ['DB_DATABASE=acme-app-124_test · migrated · seeded']]
    ];
    for (var i = 0; i < steps.length; i++) {
      var s = steps[i], row = a.$('[data-ws="' + s[0] + '"]');
      row.classList.add('run');
      clock.textContent = 'step ' + (i + 1) + '/7';
      a.line(t, '<span class="c-y">→ ' + esc(s[1]) + '</span>');
      await w(s[0] === 'env' ? 500 : 650);
      for (var j = 0; j < s[2].length; j++) { a.line(t, esc(s[2][j]), 'ind mut'); await w(s[0] === 'env' ? 650 : 280); }
      row.classList.remove('run'); row.classList.add('done');
      await w(200);
    }
    clock.textContent = 'done';
    a.line(t, '<span class="c-gr">✓ Work environment ready! 🚀</span>', 'gap');
    a.line(t, '  Folder:  ~/work/acme-app-124', 'mut');
    a.line(t, '  Branch:  124-retry-failed-deliveries', 'mut');
    a.line(t, '  PR:      https://github.com/acme/acme-app/pull/131', 'mut');
    a.line(t, '  Site:    https://acme-app-124.test', 'mut');
    a.idle(t);
    await w(2400);
  }

  // ---------- problem: the manual checklist ----------
  async function problem(a, w) {
    var items = a.root.querySelectorAll('[data-chk] li'), n = a.$('[data-chkn]');
    await w(500);
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('on');
      await w(190);
      items[i].classList.remove('on'); items[i].classList.add('ok');
      n.textContent = (i + 1) + ' / 14';
    }
    await w(500);
    a.$('[data-chk]').classList.add('fold');
    on(a.$('[data-chkone]'));
    await w(2600);
  }

  // ---------- workspace: per-clone .env ----------
  async function env(a, w) {
    var FROM = { url: 'https://acme-app.test', db: 'acme', user: 'root', cookie: 'acme-app.test', cache: '' };
    a.root.querySelectorAll('.el[data-k]').forEach(function (el) {
      var ev = el.querySelector('.ev'); ev.dataset.to = ev.textContent; ev.textContent = FROM[el.dataset.k];
    });
    await w(800);
    var keys = ['url', 'db', 'user', 'cookie', 'cache'];
    for (var i = 0; i < keys.length; i++) {
      a.root.querySelectorAll('.el[data-k="' + keys[i] + '"]').forEach(function (el) {
        var ev = el.querySelector('.ev'); ev.textContent = ev.dataset.to; el.classList.add('on', 'set');
      });
      await w(520);
      a.root.querySelectorAll('.el.on').forEach(function (el) { el.classList.remove('on'); });
    }
    await w(300);
    on(a.$('[data-keys]'));
    await w(700);
    on(a.$('[data-oknote]'));
    await w(1600);
  }

  // ---------- review: o md ----------
  async function md(a, w) {
    var sel = a.$('[data-sel]'), cbox = a.$('[data-cbox]'), raw = a.$('[data-raw]'), t = a.$('[data-term]');
    a.line(t, '<span class="mut"># later, in the agent\'s terminal</span>');
    await w(1000);
    await a.cursorTo(sel, 0, .7);
    sel.classList.add('on');
    await a.cursorTo(sel, 1, .7);
    await w(300);
    on(cbox);
    await a.cursorTo(a.$('.cb-in'), .12, .5);
    await a.type(a.$('.cb-in [data-type]'), 'Log it and expose the count in the summary.', 30);
    a.$('.cb-in .tcaret').remove();
    await a.cursorTo(a.$('[data-send]'), .5, .5);
    await a.click(); await a.press(a.$('[data-send]'));
    on(cbox, false); a.hideCursor();
    sel.classList.remove('on'); sel.classList.add('anno');
    raw.classList.add('marked'); on(a.$('[data-saved]'));
    await w(1400);
    await a.cmd(t, 'o md --list plan.md', { gap: false });
    a.line(t, 'plan.md:7  <span class="c-y">#1</span>  and then drops the row silently <span class="mut">→</span> Log it and expose the count in the summary.');
    await w(1800);
  }

  // ---------- release ----------
  async function release(a, w) {
    var t = a.$('[data-term]');
    await a.cmd(t, 'o release -r acme-app', { pause: 600 });
    await w(300);
    var steps = [
      ['Creating PR to merge main → dev (sync hotfixes)', 700],
      ['Creating PR to merge dev → main (prepare release)', 700],
      ['Merging main → dev', 900],
      ['Merging dev → main', 0],
      ['Creating GitHub release', 800]
    ];
    for (var i = 0; i < steps.length; i++) {
      var label = '- ' + dots(steps[i][0], 52), l = a.spin(t, '', '');
      l.innerHTML = esc(label) + ' <span class="spin">⠋</span>';
      if (steps[i][1] === 0) {
        l.innerHTML = esc(label) + ' <span class="spin">⠋</span> <span class="c-am">Waiting for merge (blocked)</span>';
        await w(2800);
      } else { await w(steps[i][1]); }
      a.settle(l, esc(label) + ' <span class="c-gr">✓ Success</span>');
    }
    await w(300);
    a.line(t, 'Links:', 'gap');
    a.line(t, '- main → dev: https://github.com/acme/acme-app/pull/377');
    a.line(t, '- dev → main: https://github.com/acme/acme-app/pull/378');
    a.line(t, '- <span class="c-y">v2026.11.06.1435</span>: https://github.com/acme/acme-app/releases/tag/v2026.11.06.1435');
    a.$('[data-rdot]').className = 'dot done';
    a.idle(t);
  }

  // ---------- shell ----------
  async function ssh(a, w) {
    var t = a.$('[data-term]'), envb = a.$('[data-senv]'), dot = a.$('[data-sdot]');
    await a.cmd(t, 'o ssh list', { pause: 600 });
    await w(400);
    ['app-web-1', 'app-queue-1', 'api-web-1', 'mail-web-1'].forEach(function (n) { a.line(t, n, 'mut'); });
    await w(800);
    await a.cmd(t, 'o ssh app-web-1');
    await w(600);
    var p1 = '<span class="c-gr">root@app-web-1</span>:<span class="c-bl">/var/www</span># ';
    await a.cmd(t, 'php artisan migrate:status | tail -n 1', { prompt: p1, gap: false, pause: 300, speed: 26 });
    a.line(t, '  2026_11_02_101500_add_retry_count_to_deliveries ........ [12] <span class="c-gr">Ran</span>');
    await a.cmd(t, 'exit', { prompt: p1, gap: false, pause: 500 });
    await w(400);
    envb.textContent = 'prod-br'; envb.classList.add('prod');
    await a.cmd(t, 'o ssh --env prod-br shop/api');
    await w(700);
    a.line(t, '<span class="mut"># the bastion picked a ready pod of the shop/api Deployment</span>');
    var p2 = '<span class="c-gr">www-data@api-6f9c7d8b5-q2xkz</span>:<span class="c-bl">/app</span>$ ';
    await a.cmd(t, 'php artisan about --only=environment', { prompt: p2, gap: false, pause: 400, speed: 26 });
    a.line(t, '  Environment ...................................... <span class="c-y">production</span>');
    a.line(t, '  Debug Mode ............................................ <span class="c-gr">OFF</span>');
    a.idle(t, p2);
    dot.className = 'dot ok';
  }

  // ---------- vault ----------
  async function vault(a, w) {
    var t = a.$('[data-term]');
    await a.cmd(t, 'o vault stage', { pause: 600 });
    await w(400);
    a.line(t, tbl(4, [
      ['<span class="th">NAME</span>', '<span class="th">FORMAT</span>', '<span class="th">CLEARANCE</span>', '<span class="th">DESCRIPTION</span>'],
      ['stage-db', 'text', '2', 'Stage PostgreSQL superuser'],
      ['stage-smtp', 'text', '2', 'Stage SMTP relay'],
      ['stage-runbook', 'markdown', '1', 'Rotating the stage keys']
    ]));
    await w(900);
    await a.cmd(t, 'o vault get stage-db');
    await w(400);
    var l = a.line(t, 'TOTP code: <span class="typed"></span><span class="tcaret"></span>');
    await w(500);
    await a.type(l.querySelector('.typed'), '481902', 160);
    l.querySelector('.tcaret').remove();
    await w(500);
    a.line(t, "<span class=\"c-gr\">✓</span> Secret <span class=\"c-y\">'stage-db'</span> copied to the clipboard (nothing printed; pass --stdout to print instead).");
    await w(900);
    await a.cmd(t, "cat .env | o vault set acme-app-env --description 'acme-app on stage'", { speed: 22 });
    await w(400);
    a.line(t, "<span class=\"c-gr\">✓</span> Vault entry <span class=\"c-y\">'acme-app-env'</span> created (clearance 2, text).");
    await w(900);
    a.line(t, '# an agent, with no terminal attached', 'sep');
    await a.cmd(t, 'echo 481902 | o vault get stage-db', { gap: false, speed: 26 });
    await w(400);
    a.line(t, '<span class="c-rd">Error: revealing a vault entry needs a TOTP code typed into an interactive terminal, and stdin is not one</span>');
    a.$('[data-vdot]').className = 'dot ok';
  }

  // ---------- format ----------
  async function fmt(a, w) {
    var t = a.$('[data-term]'), php = a.$('[data-php]'), st = a.$('[data-fstate]');
    await w(900);
    await a.cmd(t, 'o fmt laravel app/Services', { speed: 30 });
    await w(700);
    php.classList.add('after'); st.textContent = 'after'; st.classList.add('after');
    await w(700);
    a.line(t, '<span class="c-am">warn</span> app/Services/ReportService.php:12 public method build has no docblock');
    a.line(t, 'fixed app/Services/ReportService.php (2)');
    a.line(t, '1 file(s), 2 replacement(s).', 'mut');
    await w(1500);
    php.classList.add('done');
    await a.cmd(t, 'o fmt laravel --test --format=github-action app', { speed: 22 });
    await w(600);
    a.line(t, '<span class="c-am">::warning</span> file=app/Services/ReportService.php,line=12,title=docblock::public method build has no docblock');
  }

  // ---------- board ----------
  async function board(a, w) {
    var t = a.$('[data-term]');
    function st(s, c) { return '<span class="' + c + '">' + (s + '        ').slice(0, 8) + '</span>'; }
    function num(n) { return '<span class="c-y">#' + n + '</span>'; }
    await a.cmd(t, 'o tasks', { pause: 600 });
    var s1 = a.spin(t, '<span class="mut">Fetching Acme (1/2)</span>');
    await w(1100); s1.remove();
    a.line(t, '🏢  Project: <b>Acme</b>  <span class="mut">https://github.com/orgs/acme/projects/1</span>');
    a.line(t, tbl(3, [
      [st('TODO', 'c-bl'), num(5931), 'webhooks: retry failed deliveries'],
      [st('DOING', 'c-mg'), num(5902), 'billing: export invoices as CSV'],
      [st('REDO', 'c-rd'), num(5874), 'auth: keep the session after a password reset']
    ]), 'ind');
    var s2 = a.spin(t, '<span class="mut">Fetching Platform (2/2)</span>');
    await w(1000); s2.remove();
    a.line(t, '☁️  Project: <b>Platform</b>  <span class="mut">https://github.com/orgs/acme/projects/2</span>');
    a.line(t, tbl(3, [[st('TESTING', 'c-y'), num(212), 'ci: cache composer between jobs']]), 'ind');
    await w(1100);
    await a.cmd(t, 'o issue update acme-app#5931 --status Doign', { speed: 30 });
    await w(500);
    a.line(t, '<span class="c-rd">Error: --status: &quot;Doign&quot; is not an option of field &quot;Status&quot; on project Acme (#1); valid options: Todo, Doing, Testing, Redo, Done</span>');
    await w(1200);
    await a.cmd(t, 'o issue update acme-app#5931 --status Doing --priority High --dry-run', { speed: 22 });
    await w(500);
    a.line(t, 'Dry run: nothing was written.');
    a.line(t, '  issue    acme/acme-app#5931 <span class="mut">https://github.com/acme/acme-app/issues/5931</span>', 'gap');
    a.line(t, '  project  Acme (#1)');
    a.line(t, 'Fields:', 'gap');
    a.line(t, tbl(3, [['Status', 'Todo', '<span class="c-gr">→ Doing</span>'], ['Priority', 'Medium', '<span class="c-gr">→ High</span>']]), 'ind');
    a.$('[data-bdot]').className = 'dot ok';
  }

  // ---------- agents ----------
  async function agent(a, w) {
    var t = a.$('[data-term]'), chat = a.$('[data-chat]');
    await a.cmd(t, 'Put the settings screenshot on the PR and ping me', { prompt: '<span class="mut">&gt;</span> ', pause: 700, speed: 26 });
    await w(700);
    a.line(t, '<span class="c-gr">●</span> Screenshot saved as settings.png. Uploading it for the PR.', 'gap');
    await w(700);
    a.line(t, '<span class="c-gr">●</span> <b>Bash</b>(o upload settings.png --markdown --alt "Settings screen")');
    await w(900);
    a.line(t, '⎿ ![Settings screen](https://files.example.com/9c/3f1a7e.png)', 'ind mut');
    await w(700);
    a.line(t, '<span class="c-gr">●</span> <b>Bash</b>(gh pr comment 5932 --body-file evidence.md)');
    await w(800);
    a.line(t, '⎿ https://github.com/acme/acme-app/pull/5932#issuecomment-2210', 'ind mut');
    await w(700);
    a.line(t, '<span class="c-gr">●</span> <b>Bash</b>(o talk --github fernando -m "**#5932** is ready for review. Screenshot is on the PR.")');
    await w(900);
    var b = document.createElement('div'); b.className = 'bub enter';
    b.innerHTML = '<div class="bub-h"><span class="o-mark sm">o</span><b>Team bot</b><span class="mut">now</span></div><b>#5932</b> is ready for review. Screenshot is on the PR.<br><span class="for">asked by Fernando Bevilacqua</span>';
    chat.appendChild(b);
    a.line(t, '⎿ sent', 'ind mut');
    await w(800);
    a.line(t, '<span class="c-gr">●</span> Done. The screenshot is on #5932 and you have a message.');
    a.$('[data-adot]').className = 'dot ok';
  }

  var DEMOS = { hero: hero, problem: problem, env: env, md: md, release: release, ssh: ssh, vault: vault, fmt: fmt, board: board, agent: agent };
  document.querySelectorAll('[data-demo]').forEach(function (el) { var f = DEMOS[el.dataset.demo]; if (f) demo(el, f); });
})();
