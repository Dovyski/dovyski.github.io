// OptiDevinho landing: icons, reveal on scroll, and the animated HTML fragments.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- icons (lucide-style strokes) ----------
  function circle(cx, cy, r) { return 'M' + (cx - r) + ' ' + cy + 'a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0a' + r + ' ' + r + ' 0 1 0 ' + -2 * r + ' 0'; }
  var ICONS = {
    chev: 'm9 18 6-6-6-6',
    gh: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2',
    code: 'm16 18 6-6-6-6M8 6l-6 6 6 6',
    issue: circle(12, 12, 10) + circle(12, 12, 1),
    pr: circle(18, 18, 3) + circle(6, 6, 3) + 'M13 6h3a2 2 0 0 1 2 2v7M6 9v12',
    msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    file: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v4a2 2 0 0 0 2 2h4',
    tag: 'M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l6.59-6.59a1 1 0 0 0 0-1.41z' + circle(7, 7, 1),
    user: circle(12, 8, 4) + 'M4 21a8 8 0 0 1 16 0',
    board: 'M3 3h18v18H3zM9 3v18M15 3v18',
    check: 'M20 6 9 17l-5-5', x: 'M18 6 6 18M6 6l12 12',
    commit: circle(12, 12, 3) + 'M3 12h6M15 12h6',
    push: 'M12 19V5M5 12l7-7 7 7',
    eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' + circle(12, 12, 3),
    inbox: 'M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
    brain: 'M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18ZM12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18ZM12 5v13',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    term: 'm4 17 6-6-6-6M12 19h8'
  };
  function svgIcon(name, cls) {
    if (name === 'play') return '<svg class="ic" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M8 5.5v13l11-6.5z"/></svg>';
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + ICONS[name] + '"/></svg>';
  }
  document.querySelectorAll('i[data-i]').forEach(function (el) {
    var tmp = document.createElement('span'); tmp.innerHTML = svgIcon(el.getAttribute('data-i'), el.className);
    el.replaceWith(tmp.firstChild);
  });
  var DEV = '<svg class="bot-av"><use href="#dev"/></svg>';
  var DEVNAME = DEV + '<b>OptiDevinho</b>';

  // ---------- reveal ----------
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- braille spinners ----------
  var FR = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏', fi = 0;
  if (!reduced) setInterval(function () { fi = (fi + 1) % FR.length; document.querySelectorAll('.spin').forEach(function (s) { s.textContent = FR[fi]; }); }, 90);
  var SPIN = '<span class="spin">⠋</span>';

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
  function el(tag, cls, html) { var d = document.createElement(tag); if (cls) d.className = cls; if (html != null) d.innerHTML = html; return d; }
  function append(box, node) {
    box.appendChild(node);
    var top = box.scrollHeight - box.clientHeight;
    if (top > 0) box.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
    return node;
  }
  function bump(node, text) { if (!node) return; if (text != null) node.textContent = text; node.classList.remove('bump'); node.offsetWidth; node.classList.add('bump'); }
  async function type(node, text, w, speed) { for (var i = 0; i < text.length; i++) { node.textContent += text[i]; await w(speed || 30); } }

  function demo(root, script) {
    var tpl = root.innerHTML, tok = null;
    function start() {
      if (tok) return;
      var t = tok = { c: false };
      (async function () {
        while (!t.c) {
          root.innerHTML = tpl;
          var w = waiter(t);
          try { await script(root, w); await w(3200); }
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

  // terminal line helper: kind = '' | 'mut' | 'ok' | 'bad' | 'hd' | 'json'
  function termLine(box, prefix, html, kind) {
    return append(box, el('div', 'tl' + (kind ? ' ' + kind : ''), (prefix ? '<span class="p">' + prefix + '</span>' : '') + '<span>' + html + '</span>'));
  }
  function evHtml(icon, cls, html) { return '<span class="ev-i ' + (cls || '') + '">' + svgIcon(icon) + '</span><span class="ev-t">' + html + '</span>'; }

  // ---------- hero: one issue, picked up to ready for review ----------
  async function hero(root, w) {
    var tl = $(root, '[data-tl]'), term = $(root, '[data-term]'), clock = $(root, '[data-clock]');
    var labels = $(root, '[data-labels]'), asg = $(root, '[data-asg]'), status = $(root, '[data-status]'), dev = $(root, '[data-dev]');
    function ev(icon, cls, html) { return append(tl, el('div', 'ev', evHtml(icon, cls, html))); }
    function T(p, html, kind) { return termLine(term, p, html, kind); }
    function st(cls, text) { status.className = 'status-chip ' + cls; status.textContent = text; }

    await w(900);
    labels.appendChild(el('span', 'lbl l-ai enter', 'ai:managed'));
    ev('tag', '', '<b>alex</b> added <span class="lbl l-ai">ai:managed</span>');
    await w(900);
    clock.textContent = '0:00';
    T('›', 'sweep · acme/web#5932 changed', 'mut');
    await w(500);
    T('›', 'task queued · <span class="hl">routine_new_issue</span> · priority 50', 'mut');
    await w(800);
    T('$', 'claim acme/web#issue-5932 · attempt 1');
    on(asg);
    ev('user', '', DEVNAME + ' was assigned');
    await w(700);
    st('doing', 'Doing');
    ev('board', '', DEVNAME + ' moved this to <b>Doing</b>');
    await w(800);
    T('›', 'kickoff · draft PR <span class="hl">#5933</span> · empty commit · <span class="hl">- Fix: #5932</span>', 'ok');
    dev.innerHTML = '';
    dev.appendChild(el('div', 'dev-pr', svgIcon('pr', 'draft') + '<span>#5933 Retry failed webhook deliveries</span>'));
    ev('pr', '', DEVNAME + ' linked draft pull request <b>#5933</b>');
    await w(1000);
    clock.textContent = '0:41';
    T('$', 'read AGENTS.md CLAUDE.md docs/webhooks.md', 'mut');
    await w(600);
    T('›', 'postgres + redis on loopback · activity db ready', 'mut');
    await w(800);
    clock.textContent = '3:12';
    T('✎', 'app/Jobs/DeliverWebhook.php <span class="add">+38</span> <span class="del">−6</span>');
    await w(500);
    T('✎', 'config/webhooks.php <span class="add">+4</span>');
    await w(500);
    T('✎', 'tests/Feature/WebhookRetryTest.php <span class="add">+71</span>');
    await w(800);
    clock.textContent = '6:05';
    var run = T('$', 'composer test:unit ' + SPIN);
    await w(1700);
    run.innerHTML = '<span class="p">$</span><span>composer test:unit</span>';
    T('', 'Tests: 214 passed (612 assertions)', 'ok');
    await w(800);
    clock.textContent = '7:20';
    T('$', 'git push origin 5932-retry-failed-webhook-deliveries');
    await w(700);
    T('$', 'gh pr ready 5933');
    dev.innerHTML = '';
    dev.appendChild(el('div', 'dev-pr', svgIcon('pr', 'open') + '<span>#5933 fix: retry failed webhook deliveries</span>'));
    ev('eye', 'te', DEVNAME + ' marked <b>#5933</b> as ready for review');
    await w(600);
    st('review', 'In review');
    ev('board', '', DEVNAME + ' moved this to <b>In review</b>');
    await w(700);
    T('', '{"outcome":"success","currentStateFetched":true}', 'json');
    clock.textContent = 'idle';
  }

  // ---------- how it works: inbox → resolver → queue → worker ----------
  async function flow(root, w) {
    var inbox = $(root, '[data-inbox]'), res = $(root, '[data-resolve]'), queue = $(root, '[data-queue]');
    var inN = $(root, '[data-in-n]'), wk = $(root, '[data-worker]'), wSt = $(root, '[data-w-st]'), wT = $(root, '[data-w-t]'), wBar = $(root, '[data-w-bar]');
    var H = [
      { src: 'talk', t: 'Talk · sam', b: 'the check on acme/web#5940 is red, can you look?', key: 'acme/web#pr-5940', cat: 'explicit_instruction', p: 100, req: 'Fix the failing check on PR #5940.' },
      { src: 'sweep', t: 'sweep', b: 'acme/web#5926 · new review from Copilot', key: 'acme/web#issue-5926', cat: 'actionable_review', p: 90, req: 'Address the review on PR #5927.' },
      { src: 'mention', t: '@OptiDevinho · alex', b: 'acme/api#219 · resolve the conflicts', key: 'acme/api#issue-219', cat: 'explicit_instruction', p: 100, req: 'Resolve the merge conflicts on PR #220.' },
      { src: 'sweep', t: 'sweep', b: 'acme/web#5932 · labelled ai:managed', key: 'acme/web#issue-5932', cat: 'routine_new_issue', p: 50, req: 'Implement issue #5932.' }
    ];
    var pending = 0;
    function card(h) {
      return el('div', 'hcard', '<div class="hc-t"><span class="src ' + h.src + '">' + h.src + '</span><span>' + h.t + '</span></div><div class="hc-b">' + h.b + '</div>');
    }
    for (var i = 0; i < H.length; i++) {
      H[i].inCard = append(inbox, card(H[i]));
      bump(inN, (++pending) + ' pending');
      await w(650);
    }
    await w(400);
    // resolve the first three in parallel, then the fourth
    async function resolveOne(h, delay) {
      h.inCard.classList.add('out');
      await w(300);
      h.inCard.remove();
      bump(inN, (--pending) + ' pending');
      h.rc = append(res, el('div', 'hcard live', '<div class="hc-t"><span class="src ' + h.src + '">' + h.src + '</span><code>' + h.key + '</code></div><div class="hc-r"><span class="intent">' + SPIN + ' resolving</span></div>'));
      await w(delay);
      h.rc.classList.remove('live');
      h.rc.querySelector('.hc-r').innerHTML = '<span class="intent">work</span><span class="mut">' + h.cat + '</span><span class="prio">' + h.p + '</span>';
    }
    await Promise.all([resolveOne(H[0], 1500), (async function () { await w(250); await resolveOne(H[1], 1700); })(), (async function () { await w(500); await resolveOne(H[2], 1300); })()]);
    await w(400);
    await resolveOne(H[3], 1200);
    await w(500);
    // queue by priority (stable)
    var order = H.slice().sort(function (a, b) { return b.p - a.p; });
    for (var j = 0; j < order.length; j++) {
      var h = order[j];
      h.rc.classList.add('out');
      await w(250);
      h.rc.remove();
      h.qc = append(queue, el('div', 'hcard', '<div class="hc-t"><code>' + h.key + '</code><span class="prio">' + h.p + '</span></div><div class="hc-b">' + h.req + '</div>'));
      await w(350);
    }
    await w(500);
    for (var k = 0; k < 2; k++) {
      var top = order[k];
      top.qc.classList.add('out');
      await w(300);
      top.qc.remove();
      on(wk);
      wSt.textContent = 'running';
      wT.textContent = top.key + ' · ' + top.req;
      wBar.style.transition = 'none'; wBar.style.width = '0'; wBar.offsetWidth; wBar.style.transition = '';
      wBar.style.width = '100%';
      await w(1900);
      wSt.textContent = 'success';
      await w(600);
    }
    on(wk, false);
    wSt.textContent = 'idle';
    wT.textContent = 'Next: ' + order[2].key;
    wBar.style.transition = 'none'; wBar.style.width = '0';
  }

  // ---------- pull request: draft to ready ----------
  async function pr(root, w) {
    var md = $(root, '[data-md]'), commits = $(root, '[data-commits]'), n = $(root, '[data-pr-n]');
    var ck = $(root, '[data-ck-st]'), ckT = $(root, '[data-ck-t]'), title = $(root, '[data-pr-title]'), state = $(root, '[data-pr-state]'), stateT = $(root, '[data-pr-state-t]');
    function commit(msg, sha) { append(commits, el('div', 'pc', svgIcon('commit') + '<span class="pc-t">' + msg + '</span><code>' + sha + '</code>')); }
    await w(1200);
    commit('feat: retry 5xx and timeouts with backoff', 'a3f19c2');
    bump(n, '2 commits');
    await w(900);
    commit('test: cover retries and the last attempt', '5b7d2e0');
    bump(n, '3 commits');
    await w(700);
    ck.innerHTML = SPIN; ckT.textContent = 'In progress';
    await w(1600);
    ck.innerHTML = svgIcon('check', 'c-gr'); ckT.textContent = '214 passed · 41 s';
    await w(800);
    var start = $(md, '[data-md-start]'); if (start) start.remove();
    var fix = $(md, '.md-fix');
    var parts = [
      ['md-h', 'Overview'], ['md-l', 'Failed deliveries are retried on 5xx and timeouts, up to 5 times.'],
      ['md-h', 'Details'], ['md-l', 'Exponential backoff with jitter in <code>DeliverWebhook</code>.'], ['md-l', 'After the last attempt the delivery is logged as failed.'],
      ['md-h', 'How to test'], ['md-l', 'Point a webhook at an endpoint that returns 503.'], ['md-l', 'Check the delivery log: 5 attempts, growing intervals.'],
      ['md-l', '<code>- ENV: WEBHOOK_RETRY_MAX=5</code>']
    ];
    for (var i = 0; i < parts.length; i++) { md.insertBefore(el('p', parts[i][0], parts[i][1]), fix); await w(260); }
    await w(700);
    title.innerHTML = 'fix: retry failed webhook deliveries (issue #5932) <span class="mut">#5933</span>';
    bump(title);
    await w(900);
    state.className = 'state open'; stateT.textContent = 'Open';
    bump(state);
  }

  // ---------- test gate ----------
  async function gate(root, w) {
    var term = $(root, '[data-gterm]'), clock = $(root, '[data-g-clock]');
    function step(i, cls) { var s = $(root, '[data-step="' + i + '"]'); s.className = 'gs-step ' + cls; }
    function T(p, html, kind) { return termLine(term, p, html, kind); }
    function hit(sel, v) { root.querySelectorAll(sel).forEach(function (s) { s.classList.toggle('hit', v); }); }
    function ok(sel) { root.querySelectorAll(sel).forEach(function (s) { s.classList.remove('hit'); s.classList.add('ok'); }); }

    await w(700);
    step(1, 'run'); hit('[data-bin]', true);
    T('›', 'profile acme/web · checking required binaries', 'mut');
    await w(900);
    T('', 'php composer git gh psql redis-cli', 'ok');
    ok('[data-bin]'); step(1, 'done');
    await w(500);
    step(2, 'run'); clock.textContent = '0:04';
    var c = T('$', 'composer install ' + SPIN);
    await w(1400);
    c.innerHTML = '<span class="p">$</span><span>composer install <span class="k">· private packages with a read-only credential</span></span>';
    T('', 'Installed 118 packages', 'ok');
    step(2, 'done');
    await w(500);
    step(3, 'run'); hit('[data-svc]', true); clock.textContent = '0:31';
    T('›', 'postgresql · 127.0.0.1 · locale en_US.UTF-8', 'mut');
    await w(600);
    T('›', 'redis-server · 127.0.0.1', 'mut');
    await w(600);
    T('›', '.env · activity database block written (rewritten every attempt)', 'mut');
    ok('[data-svc]'); step(3, 'done');
    await w(700);
    step(4, 'run'); hit('[data-chk]', true); clock.textContent = '0:40';
    T('$', 'composer test:unit');
    await w(500);
    T('', '<span class="add">PASS</span> Tests\\Feature\\WebhookRetryTest');
    await w(350);
    T('', '  ✓ retries a 503 with backoff');
    await w(300);
    T('', '  ✓ does not retry a 404');
    await w(300);
    T('', '  ✓ gives up after the fifth attempt');
    await w(450);
    T('', '<span class="add">PASS</span> Tests\\Unit\\BackoffTest');
    await w(700);
    clock.textContent = '1:21';
    T('', 'Tests: 214 passed (612 assertions) · Duration: 41.2 s', 'ok');
    ok('[data-chk]'); step(4, 'done');
    await w(700);
    T('', '{"schemaVersion":1,"outcome":"success","reconciliationVerified":true}', 'json');
  }

  // ---------- review ----------
  async function review(root, w) {
    var list = $(root, '[data-rvl]'), cnt = $(root, '[data-rv-n]');
    function ev(icon, html) { return append(list, el('div', 'rv-ev', '<span class="ev-i">' + svgIcon(icon) + '</span><span class="ev-t">' + html + '</span>')); }
    function reply(i, text) {
      var th = $(root, '[data-th="' + i + '"]');
      th.appendChild(el('div', 'th-c', DEV + '<div><b>OptiDevinho</b><p>' + text + '</p></div>'));
      list.scrollTo({ top: list.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
    }
    function resolve(i) { var th = $(root, '[data-th="' + i + '"]'); th.classList.add('res'); $(root, '[data-th-st="' + i + '"]').innerHTML = '<span class="rs">Resolved</span>'; }

    await w(1500);
    ev('push', '<b>OptiDevinho</b> pushed <code>7c2e9b1</code> fix: retry only 5xx and timeouts, cap the backoff');
    await w(1100);
    reply(1, 'Fixed in <code>7c2e9b1</code>: only 5xx responses and timeouts are retried now, and a test covers the 404 case.');
    await w(900);
    resolve(1); bump(cnt, '1 unresolved');
    await w(900);
    reply(2, 'Done in <code>7c2e9b1</code>: the delay is capped at ten minutes, set by <code>WEBHOOK_RETRY_MAX_DELAY</code>.');
    await w(900);
    resolve(2); bump(cnt, '0 unresolved');
    await w(1000);
    ev('eye', '<b>OptiDevinho</b> requested a review from <b>Copilot</b>');
    await w(900);
    ev('check', 'All checks have passed');
  }

  // ---------- talk ----------
  async function talk(root, w) {
    var box = $(root, '[data-msgs]'), comp = $(root, '[data-type]');
    function msg(who, html, isDev, color) {
      var av = isDev ? DEV : '<span class="av lg" style="--c:' + color + '">' + who.slice(0, 2).toUpperCase() + '</span>';
      return append(box, el('div', 'msg' + (isDev ? ' dev' : ''), av + '<div class="msg-b"><div class="msg-h"><b>' + (isDev ? 'OptiDevinho' : who) + '</b><span class="mut">now</span></div><div class="msg-t">' + html + '</div></div>'));
    }
    async function say(who, color, text, html) {
      await type(comp, text, w, 24);
      await w(350);
      comp.textContent = '';
      msg(who, html, false, color);
    }
    async function devSay(html, think) {
      var m = msg('', '<span class="typing"><i></i><i></i><i></i></span>', true);
      await w(think || 1200);
      m.querySelector('.msg-t').innerHTML = html;
      box.scrollTo({ top: box.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
    }

    await w(700);
    await say('sam', '#f97316', '@OptiDevinho the check on acme/web#5940 is red, can you take a look?',
      '<span class="mention">@OptiDevinho</span> the check on <code>acme/web#5940</code> is red, can you take a look?');
    await w(500);
    await devSay("I'll fix the failing check on PR #5940. I'm starting on it now.");
    await w(900);
    await say('sam', '#f97316', 'also raise the timeout on that test while you are there',
      '<span class="mention">@OptiDevinho</span> also raise the timeout on that test while you are there');
    await w(400);
    await devSay("Got it. I'll include that in the work on #5940.", 1000);
    await w(1600);
    await devSay('Done: the date test depended on the server time zone. I fixed it, raised its timeout to 10 s and pushed <code>3f9a1c2</code>. Checks are green on PR #5940.', 1500);
    await w(1200);
    await say('alex', '#0ea5e9', '@OptiDevinho what are you working on?',
      '<span class="mention">@OptiDevinho</span> what are you working on?');
    await w(300);
    await devSay("I'm free right now. The last thing I did was fix the check on #5940.", 1000);
  }

  var SCRIPTS = { hero: hero, flow: flow, pr: pr, gate: gate, review: review, talk: talk };
  document.querySelectorAll('[data-demo]').forEach(function (root) {
    var s = SCRIPTS[root.getAttribute('data-demo')];
    if (s && 'IntersectionObserver' in window) demo(root, s);
  });
})();
