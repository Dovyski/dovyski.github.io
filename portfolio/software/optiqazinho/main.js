// OptiQazinho landing: icons, reveal on scroll, and the animated HTML fragments.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- icons (lucide-style strokes) ----------
  function circle(cx, cy, r) { return 'M' + (cx - r) + ' ' + cy + 'a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0a' + r + ' ' + r + ' 0 1 0 ' + -2 * r + ' 0'; }
  var ICONS = {
    chev: 'm9 18 6-6-6-6', down: 'm6 9 6 6 6-6',
    gh: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2',
    code: 'm16 18 6-6-6-6M8 6l-6 6 6 6',
    issue: circle(12, 12, 10) + circle(12, 12, 1),
    pr: circle(18, 18, 3) + circle(6, 6, 3) + 'M13 6h3a2 2 0 0 1 2 2v7M6 9v12',
    merge: circle(18, 18, 3) + circle(6, 6, 3) + 'M6 21V9a9 9 0 0 0 9 9',
    msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    file: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v4a2 2 0 0 0 2 2h4',
    tag: 'M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l6.59-6.59a1 1 0 0 0 0-1.41z' + circle(7, 7, 1),
    bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
    check: 'M20 6 9 17l-5-5', x: 'M18 6 6 18M6 6l12 12',
    board: 'M3 3h18v18H3zM9 3v18M15 3v18',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
    reload: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
    filter: 'M22 3H2l8 9.46V19l4 2v-8.54z',
    layers: 'm12 2 10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    user: circle(12, 7, 4) + 'M5 21a7 7 0 0 1 14 0',
    alert: 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01'
  };
  function svgIcon(name, cls) {
    if (name === 'play') return '<svg class="ic" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M8 5.5v13l11-6.5z"/></svg>';
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + ICONS[name] + '"/></svg>';
  }
  document.querySelectorAll('i[data-i]').forEach(function (n) {
    var tmp = document.createElement('span'); tmp.innerHTML = svgIcon(n.getAttribute('data-i'), n.className);
    n.replaceWith(tmp.firstChild);
  });
  var QA = '<svg class="qa-av"><use href="#qa"/></svg>';
  var QANAME = QA + '<b>OptiQazinho</b>';

  // ---------- reveal ----------
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (n) { io.observe(n); });
  } else {
    els.forEach(function (n) { n.classList.add('in'); });
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
  function on(n, v) { if (n) n.classList.toggle('on', v !== false); }
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
          try { await script(makeApi(root, w), w); await w(2800); }
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
      all: function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); },
      pos: function (node, fx, fy) {
        var r = node.getBoundingClientRect(), R = cur.offsetParent.getBoundingClientRect();
        return { x: r.left - R.left + r.width * (fx == null ? .5 : fx), y: r.top - R.top + r.height * (fy == null ? .5 : fy) };
      },
      cursorTo: async function (node, fx, fy) {
        if (!cur || !cur.offsetParent) return;
        var p = api.pos(node, fx == null ? .4 : fx, fy == null ? .55 : fy);
        if (!cur.classList.contains('on')) {
          var R = cur.offsetParent.getBoundingClientRect();
          cur.style.transition = 'none';
          cur.style.transform = 'translate(' + (R.width * .6) + 'px,' + (R.height + 20) + 'px)';
          cur.offsetWidth; cur.style.transition = '';
          on(cur);
        }
        cur.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
        await w(800);
      },
      click: async function () { if (!cur) return; cur.classList.remove('click'); cur.offsetWidth; cur.classList.add('click'); await w(220); },
      hideCursor: function () { on(cur, false); },
      type: async function (node, text, speed) { for (var i = 0; i < text.length; i++) { node.textContent += text[i]; await w(speed || 26); } },
      count: function (node, text) { if (!node) return; node.textContent = text; node.classList.remove('bump'); node.offsetWidth; node.classList.add('bump'); },
      press: async function (node) { node.classList.add('press'); await w(160); node.classList.remove('press'); },
      // Append to a fixed-height timeline and keep its end in view.
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
  function qaComment(body) {
    return el('div', 'tli new', '<span class="av lg" style="--c:transparent">' + QA + '</span>' +
      '<div class="cbox qa"><div class="cbox-h">' + QANAME + '<span class="mut">commented now</span></div><div class="cbox-b">' + body + '</div></div>');
  }
  function shot(rows, cap) {
    return '<div class="shot"><div class="shot-b"><div class="shot-side"><i></i><i></i><i></i><i></i></div><div class="shot-m">' + rows + '</div></div>' +
      '<div class="shot-cap">' + cap + '</div></div>';
  }

  // ---------- hero: one issue, from Testing to verdict ----------
  async function hero(a, w) {
    var tl = a.$('[data-tl]'), labels = a.$('[data-labels]'), asg = a.$('[data-asg]'), tc = a.$('[data-tc]');
    var sb = a.$('[data-sb]'), acc = a.$('[data-sb-acc]'), panel = a.$('[data-sb-panel]'), due = a.$('[data-sb-due]'), title = a.$('[data-sb-title]');
    var step = a.$('[data-sb-step]');
    function ev(icon, cls, html) { return a.append(tl, el('div', 'ev new', evHtml(icon, cls, html))); }
    function setStep(done, text) { step.innerHTML = (done ? '<span class="ok">✓</span>' : SPIN) + '<span>' + text + '</span>'; }
    function task(n) { a.all('[data-sb-task]').forEach(function (t) { t.classList.toggle('on', t.dataset.sbTask === String(n)); }); }
    function row(n) { return tc.querySelectorAll('tr')[n - 1]; }
    async function pass(n, comment) {
      var r = row(n); r.classList.remove('run');
      r.children[2].innerHTML = '✅'; r.children[2].classList.add('okc');
      if (comment) r.children[3].innerHTML = '<span class="tcm">' + comment + '</span>';
      await w(700);
    }

    await w(900);
    ev('user', '', QANAME + ' self-assigned this');
    asg.innerHTML = QA + '<b>OptiQazinho</b>';
    await w(1000);
    tc.innerHTML = '';
    [['TC1', 'A shared user opens the task panel: the due date is shown'],
     ['TC2', 'A second account with access sees the same date'],
     ['TC3', 'A task without a due date: the panel says so']].forEach(function (t) {
      tc.appendChild(el('tr', 'enter', '<td><code>' + t[0] + '</code></td><td>' + t[1] + '</td><td class="tcs"></td><td></td>'));
    });
    a.$('[data-edited]').textContent = 'edited by OptiQazinho';
    await w(1100);
    a.append(tl, qaComment('I added three test cases to the description, from the acceptance criteria and the notes on <code>#5928</code>.'));
    await w(1300);

    on(sb); setStep(false, 'Logging in with the general account');
    await w(1300);
    row(1).classList.add('run');
    task(1); setStep(false, 'TC1 · opening a shared task');
    await w(800);
    on(panel);
    await w(600);
    due.classList.add('hl'); setStep(true, 'TC1 passed · Due Nov 12 is shown');
    await pass(1, 'general account');

    due.classList.remove('hl'); on(panel, false); task(0);
    acc.textContent = 'second account'; acc.classList.add('b');
    row(2).classList.add('run');
    setStep(false, 'Logging in with a second account');
    await w(1200);
    task(1); on(panel);
    await w(600);
    due.classList.add('hl'); setStep(true, 'TC2 passed · same date for both accounts');
    await pass(2, 'second account');

    due.classList.remove('hl'); on(panel, false);
    row(3).classList.add('run');
    task(3); title.textContent = 'Team offsite plan';
    due.textContent = 'No due date';
    setStep(false, 'TC3 · opening a task without a date');
    await w(800);
    on(panel);
    await w(600);
    setStep(true, 'TC3 passed · the panel says No due date');
    await pass(3, '');
    await w(500);
    on(sb, false);

    a.all('[data-ac] .cb').forEach(function (c) { c.classList.add('on'); });
    await w(900);
    a.append(tl, qaComment('<p>All three cases passed on stage. Someone a task is shared with now sees <b>Due Nov 12</b> in the task panel, the same as the owner.</p>' +
      shot('<div class="sh-h"><span>Quarterly report draft</span><span>shared</span></div><div class="shot-r">Owner<span>sam</span></div><div class="shot-r hl">Due<span class="sh-d">Nov 12</span></div>',
        'The task panel as the second account sees it')));
    await w(1500);
    ev('tag', '', QANAME + ' added <span class="lbl l-ok">qa:ok 💚</span><span class="lbl l-done">ai:done</span>');
    labels.appendChild(el('span', 'lbl enter l-ok', 'qa:ok 💚'));
    labels.appendChild(el('span', 'lbl enter l-done', 'ai:done'));
    await w(1200);
    ev('user', '', QANAME + ' removed their assignment');
    asg.innerHTML = '<span class="none">No one assigned</span>';
    await w(1600);
    // End on the description: every case marked, every criterion ticked.
    tl.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    await w(2400);
  }

  // ---------- plan: sources to test cases ----------
  async function plan(a, w) {
    var body = a.$('[data-pl]');
    var src = { ac: a.$('[data-src="ac"]'), pr: a.$('[data-src="pr"]'), cm: a.$('[data-src="cm"]') };
    var COL = { ac: '#fbbf24', pr: '#a371f7', cm: '#38bdf8' };
    function focus(k) { Object.keys(src).forEach(function (s) { src[s].classList.toggle('on', s === k); src[s].classList.toggle('dim', s !== k); }); }
    var rows = [
      ['ac', 'TC1', 'Filter by Paid, export: the CSV has only the paid rows'],
      ['ac', 'TC2', 'Reload with a filter applied: it is still applied'],
      ['pr', 'TC3', 'Two filters combined: CSV row count matches the table'],
      ['cm', 'TC4', 'No row matches: empty state and no broken export']
    ];
    await w(700);
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      focus(r[0]);
      await w(650);
      var tr = body.appendChild(el('tr', 'enter', '<td><code>' + r[1] + '</code></td><td><span class="src-tag" style="background:' + COL[r[0]] + '"></span><span class="tx"></span><span class="tcaret"></span></td><td></td><td></td>'));
      await a.type(tr.querySelector('.tx'), r[2], 20);
      tr.querySelector('.tcaret').remove();
      await w(450);
    }
    Object.keys(src).forEach(function (s) { src[s].classList.remove('on', 'dim'); });
    await w(600);
    on(a.$('[data-pl-note]'));
    await w(2200);
  }

  // ---------- browser: four cases on stage ----------
  async function browser(a, w) {
    var log = a.$('[data-log]'), n = a.$('[data-log-n]'), menu = a.$('[data-br-menu]'), chips = a.$('[data-br-chips]');
    var fbtn = a.$('[data-br-filters]'), ebtn = a.$('[data-br-export]'), toast = a.$('[data-br-toast]'), cnt = a.$('[data-br-count]');
    var rows = a.all('.br-r[data-st]');
    function cmd(text, note) { a.append(log, el('div', 'll', '<span class="p">$</span><span class="t">playwright-cli ' + text + (note ? ' <span class="cm"># ' + note + '</span>' : '') + '</span>')); }
    function out(text) { a.append(log, el('div', 'll out', '<span class="t">' + text + '</span>')); }
    function verdict(ok, text) { a.append(log, el('div', 'll ' + (ok ? 'pass' : 'fail'), '<span>' + (ok ? '✓' : '✕') + '</span><span class="t">' + text + '</span>')); }
    function visible() { return rows.filter(function (r) { return !r.classList.contains('gone'); }).length; }
    function chip(text) { chips.appendChild(el('span', 'br-chip', text + ' ×')); }
    async function showToast(text, err) { toast.className = 'br-toast' + (err ? ' err' : ''); toast.innerHTML = svgIcon(err ? 'alert' : 'down') + '<span>' + text + '</span>'; await w(30); toast.classList.add('on'); }

    await w(600);
    cmd('open https://app.stage.example/reports', 'general account');
    await w(700);
    out('page loaded · Reports · 6 rows');
    await w(600);
    cmd('snapshot');
    await w(500);
    out('button "Filters" [e12] · button "Export CSV" [e15]');
    await w(700);

    // TC1
    await a.cursorTo(fbtn); await a.click(); await a.press(fbtn);
    cmd('click e12'); on(menu);
    await w(600);
    var paid = a.$('[data-opt="paid"]');
    await a.cursorTo(paid, .3); paid.classList.add('hv'); await a.click();
    cmd('click e31', 'Status: Paid');
    on(menu, false); paid.classList.remove('hv');
    chip('Status: Paid');
    rows.forEach(function (r) { if (r.dataset.st !== 'paid') r.classList.add('gone'); });
    a.count(cnt, visible() + ' rows');
    await w(900);
    await a.cursorTo(ebtn, .5); await a.click(); await a.press(ebtn);
    cmd('click e15');
    await showToast('report.csv downloaded · 3 rows');
    await w(600);
    out('download report.csv · 3 rows, all Paid');
    verdict(true, 'TC1 passed · the CSV has only the 3 paid rows');
    a.count(n, '1 / 4');
    await w(1100);
    toast.classList.remove('on');

    // TC2
    a.hideCursor();
    var rl = a.$('[data-br-rl]'); rl.classList.add('on');
    cmd('reload');
    await w(700);
    rl.classList.remove('on');
    out('filter "Status: Paid" still applied · 3 rows');
    verdict(true, 'TC2 passed · the filter survives a reload');
    a.count(n, '2 / 4');
    await w(1100);

    // TC3
    await a.cursorTo(fbtn); await a.click(); await a.press(fbtn);
    cmd('fill e40 "500"', 'Total over $500');
    chip('Total > $500');
    rows[4].classList.add('gone');
    a.count(cnt, visible() + ' rows');
    await w(800);
    await a.cursorTo(ebtn, .5); await a.click(); await a.press(ebtn);
    cmd('click e15');
    await showToast('report.csv downloaded · 2 rows');
    await w(600);
    out('table 2 rows · report.csv 2 rows');
    verdict(true, 'TC3 passed · row counts match with two filters');
    a.count(n, '3 / 4');
    await w(1100);
    toast.classList.remove('on');

    // TC4
    await a.cursorTo(fbtn); await a.click(); await a.press(fbtn);
    on(menu);
    await w(500);
    var vd = a.$('[data-opt="void"]');
    await a.cursorTo(vd, .3); vd.classList.add('hv'); await a.click();
    cmd('click e33', 'Status: Void, nothing matches');
    on(menu, false);
    chip('Status: Void');
    rows.forEach(function (r) { r.classList.add('gone'); });
    a.$('.br-empty').classList.add('on');
    a.count(cnt, '0 rows');
    await w(800);
    out('empty state shown: "No reports found"');
    await w(500);
    await a.cursorTo(ebtn, .5); await a.click(); await a.press(ebtn);
    cmd('click e15');
    await showToast('Export failed. Try again later.', true);
    await w(700);
    on(a.$('[data-flash]'));
    cmd('screenshot', 'evidence for TC4');
    await w(600);
    cmd('console');
    await w(400);
    out('error · 500 on POST /reports/export');
    verdict(false, 'TC4 failed · exporting an empty result answers an error');
    a.count(n, '4 / 4');
    a.hideCursor();
    await w(2400);
  }

  // ---------- accounts: same page, two sessions ----------
  async function accounts(a, w) {
    var A = a.$('[data-acc-b="a"]'), B = a.$('[data-acc-b="b"]'), api = a.$('[data-api]');
    function call(m, u, s, note) {
      var c = s >= 400 ? 's4' : 's2';
      api.appendChild(el('div', 'ar', '<span class="m">' + m + '</span><span class="u">' + u + '</span><span class="s ' + c + '">' + s + '</span>' + (note ? '<small>' + note + '</small>' : '')));
    }
    await w(800);
    A.innerHTML = '<span class="ok-tag">200</span><div class="rp-t">Report #42 · Q3 revenue</div><div class="rp-l" style="width:90%"></div><div class="rp-l" style="width:72%"></div><div class="rp-l" style="width:84%"></div><div class="rp-l" style="width:55%"></div>';
    await w(1000);
    call('POST', '/auth/token', 200, 'token minted for the general account');
    await w(800);
    call('GET', '/api/reports/42', 200, 'owner can read it');
    await w(1100);
    B.innerHTML = '<div class="acc-wait">' + SPIN + ' Logging in</div>';
    await w(1000);
    B.innerHTML = '<span class="no-tag">as expected</span><div class="denied"><b>403</b><span>You don\'t have access to this report</span></div>';
    await w(1000);
    call('POST', '/auth/token', 200, 'token minted for the other tenant user');
    await w(800);
    call('GET', '/api/reports/42', 403, 'blocked in the API too');
    await w(900);
    api.appendChild(el('div', 'ar-ok', '✓ TC5 passed · the other tenant is refused in the browser and in the API'));
    await w(2200);
  }

  // ---------- report: description state + comment with evidence ----------
  async function report(a, w) {
    var tl = a.$('[data-rtl]'), labels = a.$('[data-rlabels]'), st = a.$('[data-rstatus]'), asg = a.$('[data-rasg]');
    function ev(icon, cls, html) { return a.append(tl, el('div', 'ev new', evHtml(icon, cls, html))); }
    await w(700);
    var res = ['✅', '✅', '✅', '❌'];
    for (var i = 0; i < res.length; i++) {
      var c = a.$('[data-rs="' + (i + 1) + '"]'); c.textContent = res[i]; c.classList.add('okc');
      await w(450);
    }
    a.$('[data-rac="2"] .cb').classList.add('on');
    await w(900);
    a.append(tl, qaComment('<p>I tested #5904 on stage with the general account. Three of the four cases passed.</p>' +
      '<p><b>TC4 failed:</b> when no row matches the filters, Export CSV answers an error instead of an empty file.</p>' +
      '<ol><li>Open Reports</li><li>Filter by Status: Void</li><li>Click Export CSV</li></ol>' +
      shot('<div class="sh-h"><span>Reports</span><span>0 rows</span></div><div class="shot-r">Status: Void</div><div class="shot-r hl">Export CSV<span class="sh-err">Export failed</span></div>',
        'Export with no matching rows shows an error')));
    await w(1600);
    ev('tag', '', QANAME + ' added <span class="lbl l-prob">qa:problem ⚠️</span>');
    labels.appendChild(el('span', 'lbl enter l-prob', 'qa:problem ⚠️'));
    await w(1000);
    ev('board', 'rd', QANAME + ' moved this to <b>Redo</b>');
    st.className = 'status-chip redo'; st.textContent = 'Redo';
    await w(1000);
    ev('user', '', QANAME + ' removed their assignment');
    asg.classList.add('gone');
    await w(2000);
  }

  // ---------- talk: a request in chat ----------
  async function talk(a, w) {
    var box = a.$('[data-msgs]'), prev = a.$('[data-prev]');
    function msg(who, html) {
      var me = who === 'qa';
      var av = me ? QA : '<span class="av lg" style="--c:' + (who === 'alex' ? '#0ea5e9' : '#f97316') + '">' + (who === 'alex' ? 'AL' : 'SM') + '</span>';
      return a.append(box, el('div', 'msg' + (me ? ' me' : ''), av + '<div class="msg-b"><div class="msg-h"><b>' + (me ? 'OptiQazinho' : who) + '</b><span class="mut">now</span></div><div class="msg-t">' + html + '</div></div>'));
    }
    async function reply(html, pv) {
      var m = msg('qa', '<span class="typing"><i></i><i></i><i></i></span>');
      await w(1100);
      m.querySelector('.msg-t').innerHTML = html;
      if (pv) prev.textContent = pv;
      await w(300);
      box.scrollTo({ top: box.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
    }
    await w(700);
    msg('alex', 'Can you test <code>web#5904</code>?');
    await w(700);
    await reply('Sure. I\'ll test #5904 after the mail retest I\'m on now.', 'Queued #5904');
    await w(1500);
    await reply('I\'m testing #5904 on stage now.', 'Testing #5904');
    await w(1100);
    msg('alex', 'How is it going?');
    await w(500);
    await reply('Three of the four cases have passed. I\'m on the empty result now.');
    await w(1500);
    await reply('Tested #5904: one case failed, details in the issue.<div class="lnk">' + svgIcon('issue') + '<span><b>acme/web#5904</b> · qa:problem ⚠️</span></div>', 'Tested #5904');
    await w(1300);
    msg('sam', 'Can you also test <code>web#5913</code>?');
    await w(500);
    await reply('#5913 needs the <code>ai:testing</code> label and the Testing status before I can test it.');
    await w(2000);
  }

  // ---------- fleet: one job through a deploy ----------
  async function fleet(a, w) {
    var grid = a.$('[data-fl]'), sum = a.$('[data-fl-sum]'), wst = a.$('[data-fl-w]'), lg = a.$('[data-jqlog]');
    var col = { pending: a.$('[data-jq="pending"]'), running: a.$('[data-jq="running"]'), done: a.$('[data-jq="done"]') };
    var NAMES = ['Web', 'Mail', 'Calendar', 'Drive', 'Chat', 'Forms', 'Projects', 'Contacts', 'Social', 'Docs', 'Calls', 'Spaces', 'Import', 'API gateway', 'AI', 'Shared package'];
    var tiles = NAMES.map(function (nm) { return grid.appendChild(el('div', 'tt', '<b><span class="dot"></span>' + nm + '</b><small>idle</small>')); });
    function tile(i, cls, text) { tiles[i].className = 'tt' + (cls ? ' ' + cls : ''); tiles[i].querySelector('small').textContent = text; }
    function line(cls, text) { var d = lg.appendChild(el('div', cls, text)); while (lg.children.length > 7) lg.removeChild(lg.firstChild); return d; }
    function running(k) { a.count(sum, '16 testers · ' + k + ' running'); }
    function brain(busy, text) { wst.className = 'fl-w' + (busy ? ' busy' : ''); wst.innerHTML = (busy ? SPIN : '<span class="dot green"></span>') + text; }
    var job = null;
    function put(where, cls, title, sub) {
      if (job) job.remove();
      job = col[where].appendChild(el('div', 'job ' + cls, '<b>' + title + '</b><small>' + sub + '</small>'));
    }

    await w(600);
    tile(1, 'run', '#812 · TC2'); running(1);
    line('', 'mail · running #812');
    await w(900);
    brain(true, 'chat request');
    await w(700);
    put('pending', '', 'web#5904', 'attempt 1 · from chat');
    line('hl', 'queued web#5904 · reply sent to the chat');
    await w(900);
    brain(false, 'waiting for activity');
    await w(500);
    put('running', 'run', 'web#5904', 'attempt 1 · TC2');
    tile(0, 'run', '#5904 · attempt 1'); running(2);
    line('', 'web · claimed web#5904');
    await w(1600);
    line('rd', 'deploy · tester image updated');
    put('running', 'int', 'web#5904', 'interrupted by deploy');
    tile(0, 'int', 'restarting');
    await w(1300);
    put('pending', '', 'web#5904', 'attempt 2 of 2');
    tile(0, '', 'idle'); running(1);
    line('', 'requeued web#5904 · attempt 2');
    await w(1100);
    put('running', 'run', 'web#5904', 'attempt 2 · TC3');
    tile(0, 'run', '#5904 · attempt 2'); running(2);
    line('hl', 'marker found · continues at TC3, no duplicate comment');
    await w(1500);
    tile(1, '', 'idle');
    line('gr', 'mail · #812 done · qa:ok');
    running(1);
    await w(900);
    put('done', 'prob', 'web#5904', 'qa:problem');
    tile(0, '', 'idle'); running(0);
    brain(true, 'relaying result');
    line('gr', 'web#5904 done · result sent to the chat that asked');
    await w(1100);
    brain(false, 'waiting for activity');
    await w(2000);
  }

  var DEMOS = { hero: hero, plan: plan, browser: browser, accounts: accounts, report: report, talk: talk, fleet: fleet };
  document.querySelectorAll('[data-demo]').forEach(function (node) { var f = DEMOS[node.dataset.demo]; if (f) demo(node, f); });
})();
