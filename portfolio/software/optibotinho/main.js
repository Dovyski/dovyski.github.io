// OptiBotinho landing: icons, reveal on scroll, and the animated HTML fragments.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- icons (lucide-style strokes) ----------
  function circle(cx, cy, r) { return 'M' + (cx - r) + ' ' + cy + 'a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0a' + r + ' ' + r + ' 0 1 0 ' + -2 * r + ' 0'; }
  var ICONS = {
    chev: 'm9 18 6-6-6-6', down: 'm6 9 6 6 6-6',
    eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' + circle(12, 12, 3),
    gh: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2',
    code: 'm16 18 6-6-6-6M8 6l-6 6 6 6',
    issue: circle(12, 12, 10) + circle(12, 12, 1),
    pr: circle(18, 18, 3) + circle(6, 6, 3) + 'M13 6h3a2 2 0 0 1 2 2v7M6 9v12',
    merge: circle(18, 18, 3) + circle(6, 6, 3) + 'M6 21V9a9 9 0 0 0 9 9',
    msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    file: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v4a2 2 0 0 0 2 2h4',
    tag: 'M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l6.59-6.59a1 1 0 0 0 0-1.41z' + circle(7, 7, 1),
    bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
    key: circle(7.5, 15.5, 5.5) + 'm21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3',
    check: 'M20 6 9 17l-5-5', x: 'M18 6 6 18M6 6l12 12',
    board: 'M3 3h18v18H3zM9 3v18M15 3v18',
    push: 'M12 19V5M5 12l7-7 7 7'
  };
  function svgIcon(name, cls) {
    if (name === 'play') return '<svg class="ic" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M8 5.5v13l11-6.5z"/></svg>';
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + ICONS[name] + '"/></svg>';
  }
  document.querySelectorAll('i[data-i]').forEach(function (el) {
    var tmp = document.createElement('span'); tmp.innerHTML = svgIcon(el.getAttribute('data-i'), el.className);
    el.replaceWith(tmp.firstChild);
  });
  var BOT = '<svg class="bot-av"><use href="#bot"/></svg>';

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

  function demo(root, script) {
    var tpl = root.innerHTML, tok = null;
    function start() {
      if (tok) return;
      var t = tok = { c: false };
      (async function () {
        while (!t.c) {
          root.innerHTML = tpl;
          var w = waiter(t);
          try { await script(makeApi(root, w), w); await w(2600); }
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
      pos: function (node, fx, fy) {
        var r = node.getBoundingClientRect(), R = root.getBoundingClientRect();
        return { x: r.left - R.left + r.width * (fx == null ? .5 : fx), y: r.top - R.top + r.height * (fy == null ? .5 : fy) };
      },
      cursorTo: async function (node, fx, fy) {
        if (!cur) return;
        var p = api.pos(node, fx == null ? .35 : fx, fy == null ? .55 : fy);
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
      type: async function (node, text, speed) { for (var i = 0; i < text.length; i++) { node.textContent += text[i]; await w(speed || 38); } },
      count: function (node, text) { if (!node) return; node.textContent = text; node.classList.remove('bump'); node.offsetWidth; node.classList.add('bump'); },
      press: async function (node) { node.classList.add('press'); await w(160); node.classList.remove('press'); },
      // Append to a scrolling timeline and keep its end in view.
      append: function (box, node) {
        box.appendChild(node);
        var top = box.scrollHeight - box.clientHeight;
        if (top > 0) box.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
        return node;
      }
    };
    return api;
  }

  function evHtml(icon, iconCls, html) {
    return '<span class="ev-i ' + (iconCls || '') + '">' + svgIcon(icon) + '</span><span class="ev-t">' + html + '</span>';
  }
  var BOTNAME = BOT + '<b>OptiBotinho</b>';

  // ---------- hero: one pull request, opened to merged ----------
  async function hero(a, w) {
    var tl = a.$('[data-tl]'), labels = a.$('[data-labels]'), chip = a.$('[data-issue]');
    var lane = a.$('[data-mq-lane]'), score = a.$('[data-mq-score]'), bar = a.$('[data-mq-bar]'), next = a.$('[data-mq-next]');
    function ev(icon, cls, html) { return a.append(tl, el('div', 'ev new', evHtml(icon, cls, html))); }
    function label(cls, text) { var n = labels.querySelector('.none'); if (n) n.remove(); labels.appendChild(el('span', 'lbl enter ' + cls, text)); }
    function issue(cls, text) { chip.className = 'status-chip ' + cls; chip.textContent = text; }

    await w(900);
    ev('board', '', BOTNAME + ' moved <b>#5910</b> to <b>In review</b>');
    issue('review', 'In review');
    await w(900);
    ev('tag', '', BOTNAME + ' added <span class="lbl l-assist">lane:assist</span>');
    label('l-assist', 'lane:assist');
    lane.textContent = 'assist'; a.count(lane, 'assist');
    next.textContent = 'Waiting for AI review';
    await w(900);
    var ck = a.append(tl, el('div', 'ck enter', '<span class="ck-st">' + SPIN + '</span><b>Optibotinho · AI code review</b><span class="mut ck-t">3 reviewers running</span>'));
    a.$('[data-rv-bot]').innerHTML = SPIN;
    await w(2600);
    ck.querySelector('.ck-st').innerHTML = svgIcon('check', 'c-gr');
    ck.querySelector('.ck-t').textContent = 'Approved · no findings';
    a.append(tl, el('div', 'tli new',
      '<span class="av lg" style="--c:transparent">' + BOT + '</span>' +
      '<div class="cbox bot"><div class="cbox-h">' + BOTNAME + '<span class="bot-tag">bot</span><span class="mut">reviewed now</span></div>' +
      '<div class="cbox-b"><div class="vrd"><span class="vd green"></span>Approved</div>' +
      '<div class="vrd-p">Retries are bounded, jittered and covered by tests.</div>' +
      '<div class="ov-meta"><b>Review round:</b> 1 · <b>Reviewers:</b> <code>Security</code> <code>Correctness</code> <code>Tests</code></div></div></div>'));
    await w(1300);
    ev('check', 'gr', BOTNAME + ' approved these changes');
    a.$('[data-rv-bot]').innerHTML = svgIcon('check', 'c-gr');
    next.textContent = 'Waiting for approvals';
    await w(1400);
    a.append(tl, el('div', 'tli new',
      '<span class="av lg" style="--c:#f97316">SM</span><div class="cbox"><div class="cbox-h"><b>sam</b> <span class="mut">commented now</span></div>' +
      '<div class="cbox-b"><span class="mention">@alex</span> nice. Can the retry count show up on the dashboard later?</div></div>'));
    await w(600);
    on(a.$('[data-toast]'));
    await w(1500);
    ev('check', 'gr', '<span class="av" style="--c:#f97316">SM</span><b>sam</b> approved these changes');
    a.$('[data-rv-sam]').innerHTML = svgIcon('check', 'c-gr');
    a.count(score, '2 / 2'); score.style.color = '#c4b5fd';
    bar.style.width = '100%';
    await w(1200);
    on(a.$('[data-toast]'), false);
    ev('tag', '', BOTNAME + ' added <span class="lbl l-q">merge:queued</span>');
    label('l-q', 'merge:queued');
    for (var s = 5; s > 0; s--) { next.textContent = 'Merging after delay · 0:0' + s; await w(520); }
    next.textContent = 'Head, base and labels rechecked';
    await w(800);
    ev('merge', 'vi', BOTNAME + ' merged commit <code>4f2a91c</code> into <code>dev</code>');
    var st = a.$('[data-state]'); st.classList.add('merged'); st.innerHTML = svgIcon('merge') + '<span>Merged</span>';
    a.$('[data-meta]').innerHTML = '<b>OptiBotinho</b> merged 3 commits into <code>dev</code> from <code>5932-webhook-retries</code>';
    next.textContent = 'merged';
    await w(1000);
    ev('board', '', BOTNAME + ' moved <b>#5910</b> to <b>To deploy</b>');
    issue('deploy', 'To deploy');
    await w(1600);
  }

  // ---------- review: tiers, panel, manager, overview ----------
  async function review(a, w) {
    function tier(n, cls, txt) { var t = a.$('[data-tier="' + n + '"]'); t.className = 'tier ' + cls; a.$('[data-tier-st="' + n + '"]').innerHTML = txt; }
    function rvr(sel, outSel, cls, txt) { a.$(sel).className = 'rvr ' + cls + (sel === '[data-mgr]' ? ' mgr' : ''); a.$(outSel).innerHTML = txt; }
    var ckSt = a.$('[data-ck-st]'), ckT = a.$('[data-ck-t]');
    await w(500);
    tier(1, 'scan', SPIN);
    await w(600);
    tier(1, 'hit', '<span class="c-vi">matched</span>');
    tier(2, 'skip', 'not reached'); tier(3, 'skip', 'not reached');
    await w(700);
    ckSt.innerHTML = SPIN; ckT.textContent = '3 reviewers running';
    for (var i = 1; i <= 3; i++) { rvr('[data-r="' + i + '"]', '[data-r-out="' + i + '"]', 'run', SPIN + ' reviewing'); await w(200); }
    await w(1100);
    rvr('[data-r="2"]', '[data-r-out="2"]', 'done', '1 finding');
    await w(700);
    rvr('[data-r="1"]', '[data-r-out="1"]', 'done', '2 findings');
    await w(600);
    rvr('[data-r="3"]', '[data-r-out="3"]', 'done', '1 finding');
    await w(500);
    rvr('[data-mgr]', '[data-mgr-out]', 'run', SPIN + ' verifying 4 at 9c1e07d');
    ckT.textContent = 'Verifying findings';
    await w(1500);
    rvr('[data-mgr]', '[data-mgr-out]', 'done', '<span class="c-gr">kept 2</span> · dropped 2');
    ckSt.innerHTML = '<span class="dot amber"></span>'; ckT.textContent = 'Changes recommended · 2 open';
    await w(500);
    on(a.$('[data-ov]'));
    await w(1600);
    on(a.$('[data-inline]'));
    await w(2600);
  }

  // ---------- rounds: superseded overviews and carried findings ----------
  async function rounds(a, w) {
    var box = a.$('[data-rounds]');
    function push(sha) { box.appendChild(el('div', 'push enter', svgIcon('push') + '<b>alex</b> pushed 1 commit · head <code>' + sha + '</code>')); }
    function supersede(card, n, k) {
      card.classList.add('sup');
      card.querySelector('.rd-v').innerHTML = '<span class="vd grey"></span>Superseded by round ' + n;
      card.querySelectorAll('.rd-n').forEach(function (x) { x.remove(); });
      card.appendChild(el('div', 'rd-fold', svgIcon('chev') + 'Findings at the time (' + k + ')'));
    }
    function round(n) {
      return box.appendChild(el('div', 'round enter', '<div class="rd-h">' + BOTNAME + '<span class="mut">round ' + n + '</span><span class="rd-v">' + SPIN + ' reviewing</span></div>'));
    }
    function finding(card, sev, text, nov, novTxt) { return card.appendChild(el('div', 'rd-f enter', '<span class="sev ' + sev + '">' + sev[0].toUpperCase() + sev.slice(1) + '</span>' + text + '<span class="nov ' + nov + '">' + novTxt + '</span>')); }

    await w(1400);
    push('a41b7d2');
    await w(700);
    supersede(a.$('[data-round="1"]'), 2, 2);
    var r2 = round(2);
    await w(1800);
    finding(r2, 'low', 'No test for an empty payload', 'carried', 'carried');
    await w(350);
    finding(r2, 'medium', 'Retry ignores the Retry-After header', 'novel', 'novel');
    r2.appendChild(el('div', 'rd-n enter', '1 duplicate finding not posted again'));
    r2.querySelector('.rd-v').innerHTML = '<span class="vd amber"></span>Changes recommended';
    await w(2200);
    push('d07e3f9');
    await w(700);
    supersede(r2, 3, 2);
    var r3 = round(3);
    await w(1800);
    var low = finding(r3, 'low', 'No test for an empty payload', 'carried', 'carried');
    r3.querySelector('.rd-v').innerHTML = '<span class="vd amber"></span>Changes recommended';
    var note = r3.appendChild(el('div', 'rd-n warn enter', 'Approval waits until the unresolved prior findings carried in this round are resolved.'));
    await w(2400);
    low.classList.add('res');
    low.querySelector('.nov').textContent = 'resolved';
    note.className = 'rd-n'; note.textContent = 'alex resolved the last open thread.';
    await w(900);
    r3.classList.add('ok');
    r3.querySelector('.rd-v').innerHTML = '<span class="vd green"></span>Approved';
    note.innerHTML = '<span class="c-gr">✓</span> OptiBotinho approved these changes';
    await w(2200);
  }

  // ---------- merge queue ----------
  async function queue(a, w) {
    var log = a.$('[data-qlog]'), merged = 0;
    function card(k) { return a.$('[data-qc="' + k + '"]'); }
    function st(k, cls, text) { var c = card(k); c.classList.remove('act', 'wait', 'held', 'done'); if (cls) c.classList.add(cls); c.querySelector('[data-st]').innerHTML = text; }
    function line(kind, cls, text) { log.appendChild(el('div', 'ql', '<span class="k ' + cls + '">' + kind + '</span><span>' + text + '</span>')); }
    function done(k, text) { st(k, 'done', text || 'merged'); merged++; a.count(a.$('[data-q-cnt]'), merged + ' merged today'); }

    await w(900);
    st('dep', 'act', SPIN + ' rechecking');
    await w(1100);
    done('dep');
    line('merged', 'merged', 'acme/web#5941 · lane:auto · AI review skipped by rule');
    await w(800);
    st('ver', 'act', SPIN + ' rechecking');
    await w(1100);
    done('ver');
    line('merged', 'merged', 'acme/chat#140 · version PR · merge commit');
    await w(900);
    var sc = card('csv').querySelector('[data-score]');
    a.count(sc, 'score 2 / 2'); sc.classList.add('c-gr');
    st('csv', 'act', 'delay');
    var bar = card('csv').querySelector('[data-bar]'), dl = card('csv').querySelector('[data-delay]');
    for (var i = 0; i <= 10; i++) { bar.style.width = (i * 10) + '%'; dl.textContent = 'delay ' + (10 - i) + ' min'; await w(170); }
    st('csv', 'act', SPIN + ' rechecking');
    await w(900);
    done('csv');
    line('merged', 'merged', 'acme/web#5926 · lane:assist · score 2 / 2');
    await w(800);
    var ai = card('sess').querySelector('[data-ai]');
    ai.className = 'chip c-rd'; ai.textContent = 'AI review: 2 findings';
    st('sess', 'wait', 'waiting for update');
    line('blocked', 'wait', 'acme/mobile#87 · open AI findings');
    await w(1400);
    var wip = card('bill').querySelector('[data-wip]');
    st('bill', 'held', 'blocked');
    await w(900);
    wip.className = 'chip'; wip.textContent = 'WIP removed';
    st('bill', 'act', 'a person is merging');
    await w(1300);
    done('bill', 'merged by hand');
    line('merged_externally', 'ext', 'acme/api#219 · lane:human');
    await w(1800);
  }

  // ---------- commands ----------
  async function commands(a, w) {
    var tl = a.$('[data-tl]'), box = a.$('[data-type]'), send = a.$('[data-send]');
    function mine(text) {
      return a.append(tl, el('div', 'tli new', '<span class="av lg" style="--c:#0ea5e9">AL</span><div class="cbox"><div class="cbox-h"><b>alex</b> <span class="mut">commented now</span></div><div class="cbox-b"><span class="mention">@OptiBotinho</span> ' + text + '</div></div>'));
    }
    function bot(html) {
      return a.append(tl, el('div', 'tli new', '<span class="av lg" style="--c:transparent">' + BOT + '</span><div class="cbox bot"><div class="cbox-h">' + BOTNAME + '<span class="bot-tag">bot</span><span class="mut">commented now</span></div><div class="cbox-b">' + html + '</div></div>'));
    }
    async function say(cmd) {
      await a.cursorTo(a.$('.cmp-box'), .2, .5);
      await a.click();
      a.hideCursor();
      await a.type(box, '@OptiBotinho ' + cmd, 40);
      await w(300);
      await a.cursorTo(send);
      await a.click(); await a.press(send);
      a.hideCursor();
      box.textContent = '';
      var c = mine(cmd);
      await w(800);
      c.querySelector('.cbox-b').appendChild(el('span', 'react new', '👀 1'));
      return c;
    }
    await w(700);
    await say('clone');
    await w(1300);
    bot('Cloned this issue to the other repositories, with its labels, assignees, milestone and project:' +
      '<div class="cl-list"><span>' + svgIcon('issue', 'c-gr') + '<code>acme/api#231</code></span><span>' + svgIcon('issue', 'c-gr') + '<code>acme/mobile#94</code></span></div>');
    await w(2000);
    await say('report milestone Faster checkout');
    await w(1400);
    bot('<b>Faster checkout</b>' +
      '<table class="mdt"><tr><th>Repository</th><th>% of completion</th><th>Open issues</th><th>Closed issues</th></tr>' +
      '<tr><td>acme/web</td><td><span class="pc"><i style="width:72%"></i></span>72%</td><td>5</td><td>13</td></tr>' +
      '<tr><td>acme/api</td><td><span class="pc"><i style="width:60%"></i></span>60%</td><td>4</td><td>6</td></tr>' +
      '<tr><td>acme/mobile</td><td><span class="pc"><i style="width:25%"></i></span>25%</td><td>6</td><td>2</td></tr></table>');
    await w(2600);
  }

  // ---------- workflow ----------
  async function workflow(a, w) {
    var card = a.$('[data-icard]'), log = a.$('[data-wlog]'), lab = a.$('[data-ilabels]');
    var cols = a.root.querySelectorAll('.bcol');
    async function move(n) {
      card.classList.add('lift');
      cols.forEach(function (c, i) { c.classList.toggle('hl', i === n); });
      card.style.setProperty('--col', n);
      await w(850);
      card.classList.remove('lift');
    }
    function entry(when, html) { log.appendChild(el('div', 'wl', '<span>' + when + '</span><span>' + html + '</span>')); }
    await w(900);
    entry('10:02', 'PR <b>#5932</b> opened');
    await move(1);
    entry('10:02', '#5910 → <b>In review</b>');
    await w(500);
    on(a.$('[data-mk="env"]'));
    lab.appendChild(el('span', 'lbl l-env enter', 'has:env'));
    await w(500);
    on(a.$('[data-mk="mi"]'));
    lab.appendChild(el('span', 'lbl l-mig enter', 'has:migration'));
    await w(1500);
    entry('11:40', '#5932 merged into <b>dev</b>');
    await move(2);
    entry('11:40', '#5910 → <b>To deploy</b>');
    await w(1600);
    entry('14:00', 'dev → main merged');
    await move(3);
    entry('14:00', '#5910 → <b>Testing</b> · alex told');
    await w(700);
    on(a.$('[data-release]'));
    await w(2400);
    cols.forEach(function (c) { c.classList.remove('hl'); });
  }

  // ---------- chat ----------
  async function chat(a, w) {
    var dm = a.$('[data-msgs="dm"]'), grp = a.$('[data-msgs="grp"]');
    function msg(box, html) { box.appendChild(el('div', 'msg', BOT + '<div class="msg-b"><div class="msg-h"><b>OptiBotinho</b><span class="mut">now</span></div><div class="msg-t">' + html + '</div></div>')); }
    function badge(k, n) { var b = a.$('[data-n="' + k + '"]'); b.textContent = n; on(b, n > 0); }
    function prev(k, t) { a.$('[data-prev="' + k + '"]').textContent = t; }
    await w(900);
    msg(dm, '<b>sam</b> mentioned you in <code>acme/web#5932</code><br><q>@alex nice. Can the retry count show up on the dashboard later?</q>');
    prev('dm', 'sam mentioned you');
    await w(2000);
    msg(dm, 'Ready for testing: 3 issues you worked on reached <b>Testing</b>' +
      '<ul><li><code>acme/web#5910</code> Webhook deliveries are lost on 502</li><li><code>acme/web#5904</code> Export keeps the selected filters</li><li><code>acme/api#226</code> Faster report queries</li></ul>');
    prev('dm', 'Ready for testing: 3 issues');
    await w(1600);
    badge('grp', 1); prev('grp', 'Ready for testing in acme/web');
    await w(900);
    a.$('[data-conv="dm"]').classList.remove('on'); a.$('[data-conv="grp"]').classList.add('on');
    a.$('[data-ch-title]').textContent = '# dev-news';
    dm.hidden = true; grp.hidden = false; badge('grp', 0);
    await w(400);
    msg(grp, '<b>acme/web</b> has issues ready for testing: <code>#5910</code> <code>#5904</code>');
    await w(1800);
    msg(grp, '<b>Project board</b>' +
      '<div class="brd"><span>In progress</span><b>6</b><span>To deploy</span><b>4</b><span class="warn">In review</span><b class="warn">9</b><span>Testing</span><b>3</b></div>' +
      '<div style="margin-top:6px" class="c-am">In review is piling up. Pick one before starting something new.</div>');
    await w(2800);
  }

  // ---------- nightwatch ----------
  async function nightwatch(a, w) {
    var inBox = a.$('[data-nwin]'), outBox = a.$('[data-nwout]');
    var issues = {};
    function event(app, text) {
      return inBox.appendChild(el('div', 'nw-ev', '<div class="r1"><span class="app-n">' + app + '</span><span class="cat"></span></div><div class="msg-l">' + text + '</div>'));
    }
    function classify(ev, cls, name) { var c = ev.querySelector('.cat'); c.className = 'cat on ' + cls; c.textContent = name; }
    function issue(key, title, where, apps) {
      var n = issues[key];
      if (!n) {
        n = issues[key] = outBox.appendChild(el('div', 'nw-iss', svgIcon('issue') + '<div><b>' + title + '</b><small>' + where + '</small></div><span class="cnt">' + svgIcon('msg') + '<span>' + apps + '</span></span>'));
      } else {
        a.count(n.querySelector('.cnt span'), apps);
        n.classList.add('hl'); setTimeout(function () { n.classList.remove('hl'); }, 900);
      }
    }
    async function step(app, text, cls, name, after) {
      var e = event(app, text);
      await w(700);
      classify(e, cls, name);
      await w(400);
      after(e);
      await w(800);
    }
    await w(700);
    await step('web', 'RedisException: Connection refused', 'infra', 'infrastructure', function () { issue('redis', 'Redis: connection refused', 'acme/platform#77 · infrastructure', '1 app'); });
    await step('api', 'RedisException: Connection refused', 'infra', 'infrastructure', function () { issue('redis', '', '', '2 apps'); });
    await step('chat', 'RedisException: Connection refused', 'infra', 'infrastructure', function () { issue('redis', '', '', '3 apps'); });
    await step('web', 'ErrorException: Undefined array key "plan"', 'app', 'application', function () { issue('plan', 'Undefined array key "plan"', 'acme/web#5950 · application', '1 app'); });
    await step('api', 'cURL error 28: timed out · api.payments.example', 'ext', 'external dependency', function () { issue('pay', 'api.payments.example is not responding', 'acme/platform#78 · external dependency', '1 app'); });
    await step('agent', 'Nightwatch agent: buffer flush timed out', 'agent', 'agent', function (e) { e.classList.add('drop'); e.querySelector('.cat').textContent = 'agent · suppressed'; });
    await w(2000);
  }

  var DEMOS = { hero: hero, review: review, rounds: rounds, queue: queue, commands: commands, workflow: workflow, chat: chat, nightwatch: nightwatch };
  document.querySelectorAll('[data-demo]').forEach(function (node) { var f = DEMOS[node.dataset.demo]; if (f) demo(node, f); });
})();
