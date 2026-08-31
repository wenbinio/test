/* OUTPUT — the note builder.
   ES2020 and below. Classic script. No modules, no network, no dependencies
   beyond assets/site.js, which must load first. */
(function () {
  'use strict';

  if (!window.OUTPUT) { return; }
  var store = window.OUTPUT.store;
  var byId = window.OUTPUT.byId;
  var each = window.OUTPUT.each;

  var form = byId('noteform');
  if (!form) { return; }

  var KEY = 'output.note.v1';
  var STEPS = ['step-emergency', 'step-scope', 'step-blood', 'step-flags', 'step-detail', 'step-log', 'step-result'];
  var RESULT = STEPS.length - 1;
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
  var BRISTOL = {
    '1': 'separate hard lumps, like nuts, hard to pass',
    '2': 'sausage-shaped but lumpy',
    '3': 'sausage-shaped with cracks on the surface',
    '4': 'smooth and soft, like a sausage or snake',
    '5': 'soft blobs with clear-cut edges',
    '6': 'fluffy pieces with ragged edges, mushy',
    '7': 'entirely liquid, no solid pieces'
  };
  var QUESTIONS = [
    'What do you think is most likely, and what are you ruling out?',
    'What would change your mind, and what should bring me back?',
    'Which tests are you doing, and when and how will I get the results?',
    'If this test is normal, does that settle it, or is there a next step?',
    'Is this urgent enough for a fast-track referral? If not, what would make it so?',
    'Is there anything I should stop, start or change while we wait?',
    'Can you write down the name of what you think this is?'
  ];

  var state = {
    emg: [], scope: [], duration: '', blood: '', bloodwhen: '', flag: [],
    start: '', bristol: '', ucolour: '', freqnow: '', freqnormal: '',
    night: '', weight: '', meds: '', other: '', log: []
  };

  var current = 0;
  var firstRender = true;
  var saveTimer = null;

  /* ---------------- dates: never hand a made-up string to new Date() ------ */

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function parseISO(value) {
    if (typeof value !== 'string') { return null; }
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!m) { return null; }
    var y = parseInt(m[1], 10), mo = parseInt(m[2], 10), day = parseInt(m[3], 10);
    if (mo < 1 || mo > 12 || day < 1 || day > 31) { return null; }
    var d = new Date(y, mo - 1, day);
    if (d.getFullYear() !== y || d.getMonth() !== mo - 1 || d.getDate() !== day) { return null; }
    return d;
  }

  function longDate(value) {
    var d = parseISO(value);
    if (!d) { return value || ''; }
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function shortDate(value) {
    var d = parseISO(value);
    if (!d) { return value || ''; }
    return d.getDate() + ' ' + MONTHS[d.getMonth()].substring(0, 3) + ' ' + d.getFullYear();
  }

  /* ---------------- persistence ------------------------------------------ */

  function save() {
    try {
      store.set(KEY, JSON.stringify(state));
    } catch (e) { /* nothing we can do; the notice is already showing */ }
  }

  function load() {
    var raw = store.get(KEY);
    if (!raw) { return; }
    var parsed;
    try { parsed = JSON.parse(raw); } catch (e) { return; }
    if (!parsed || typeof parsed !== 'object') { return; }
    var keys = Object.keys(state);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (!Object.prototype.hasOwnProperty.call(parsed, k)) { continue; }
      var v = parsed[k];
      if (Object.prototype.toString.call(state[k]) === '[object Array]') {
        if (Object.prototype.toString.call(v) === '[object Array]') { state[k] = v; }
      } else if (typeof v === 'string') {
        state[k] = v;
      }
    }
    if (Object.prototype.toString.call(state.log) !== '[object Array]') { state.log = []; }
  }

  /* ---------------- reading the form ------------------------------------- */

  function checkedValues(name) {
    var out = [];
    each(form.querySelectorAll('input[name="' + name + '"]'), function (el) {
      if (el.checked) { out.push(el.value); }
    });
    return out;
  }

  function radioValue(name) {
    var els = form.querySelectorAll('input[name="' + name + '"]');
    for (var i = 0; i < els.length; i++) {
      if (els[i].checked) { return els[i].value; }
    }
    return '';
  }

  function textValue(id) {
    var el = byId(id);
    return el ? String(el.value).replace(/\s+$/, '') : '';
  }

  function readForm() {
    state.emg = checkedValues('emg');
    state.scope = checkedValues('scope');
    state.flag = checkedValues('flag');
    state.duration = radioValue('duration');
    state.blood = radioValue('blood');
    state.bristol = radioValue('bristol');
    state.ucolour = radioValue('ucolour');
    state.bloodwhen = textValue('d-bloodwhen');
    state.start = textValue('d-start');
    state.freqnow = textValue('d-freqnow');
    state.freqnormal = textValue('d-freqnormal');
    state.night = textValue('d-night');
    state.weight = textValue('d-weight');
    state.meds = textValue('d-meds');
    state.other = textValue('d-other');
  }

  function writeForm() {
    each(form.querySelectorAll('input[type="checkbox"]'), function (el) {
      var bucket = state[el.name];
      el.checked = Object.prototype.toString.call(bucket) === '[object Array]' && bucket.indexOf(el.value) !== -1;
    });
    setRadio('duration', state.duration);
    setRadio('blood', state.blood);
    setRadio('bristol', state.bristol);
    setRadio('ucolour', state.ucolour);
    setText('d-bloodwhen', state.bloodwhen);
    setText('d-start', state.start);
    setText('d-freqnow', state.freqnow);
    setText('d-freqnormal', state.freqnormal);
    setText('d-night', state.night);
    setText('d-weight', state.weight);
    setText('d-meds', state.meds);
    setText('d-other', state.other);
    markPickers();
  }

  function setRadio(name, value) {
    each(form.querySelectorAll('input[name="' + name + '"]'), function (el) {
      el.checked = (value !== '' && el.value === value);
    });
  }

  function setText(id, value) {
    var el = byId(id);
    if (el) { el.value = value || ''; }
  }

  function markPickers() {
    each(form.querySelectorAll('.picker label, .cpick label'), function (label) {
      var input = label.querySelector('input');
      var on = !!(input && input.checked);
      var cls = label.className.replace(/\s*\bsel\b/g, '');
      label.className = on ? (cls ? cls + ' sel' : 'sel') : cls;
    });
  }

  /* ---------------- triage ----------------------------------------------- */

  var LONG_DURATIONS = ['three weeks or more', 'more than three months', 'on and off for months, with no clear start'];

  function triage() {
    if (state.emg.length) {
      return { level: 'now', reasons: state.emg.slice() };
    }
    var reasons = [];
    if (state.blood && state.blood !== 'none seen') {
      reasons.push('You have seen blood — ' + state.blood + '. Visible blood is investigated whether or not it came back.');
    }
    if (LONG_DURATIONS.indexOf(state.duration) !== -1) {
      reasons.push('This has lasted ' + state.duration + '. Three weeks is the standard threshold for investigating a change in habit.');
    }
    for (var i = 0; i < state.flag.length; i++) {
      reasons.push(state.flag[i] + '.');
    }
    if (state.ucolour === 'pink or red' || state.ucolour === 'cola or dark brown') {
      reasons.push('You have described your urine as ' + state.ucolour + ', which needs a cause found.');
    }
    var loggedBlood = 0;
    for (var j = 0; j < state.log.length; j++) {
      var b = state.log[j].blood;
      if (b && b !== 'none' && b !== '') { loggedBlood++; }
    }
    if (loggedBlood > 0 && (!state.blood || state.blood === 'none seen')) {
      reasons.push('Your log records blood on ' + loggedBlood + (loggedBlood === 1 ? ' day' : ' days') + '.');
    }
    if (reasons.length) { return { level: 'days', reasons: reasons }; }
    return { level: 'calm', reasons: [] };
  }

  /* ---------------- the verdict panel ------------------------------------ */

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) { node.className = cls; }
    if (text) { node.textContent = text; }
    return node;
  }

  function renderVerdict(result) {
    var box = byId('verdict');
    box.innerHTML = '';
    var panel = el('div', 'verdict');
    var label = el('span', 'alarm__label');
    var h = el('h3');

    if (result.level === 'now') {
      panel.className = 'verdict verdict--now';
      label.textContent = 'Go now';
      h.textContent = 'Get emergency help now — do not wait to see whether this settles';
      panel.appendChild(label);
      panel.appendChild(h);
      panel.appendChild(el('p', null, 'Call 999, or your local emergency number, or go straight to A&E. Do not wait for a GP appointment. Do not drive yourself if you feel faint or are bleeding heavily — call an ambulance or have someone take you.'));
      panel.appendChild(el('p', null, 'You told this page:'));
      panel.appendChild(list(result.reasons));
      if (isCauda()) {
        var c = el('p');
        var strong = el('strong', null, 'Say the words "I think this might be cauda equina" when you arrive.');
        c.appendChild(strong);
        c.appendChild(document.createTextNode(' Nerve compression at the base of the spine can cause permanent loss of bladder, bowel and sexual function if it is not decompressed quickly. The window is measured in hours.'));
        panel.appendChild(c);
      }
      panel.appendChild(el('p', null, 'The summary below is still generated. Take it with you if there is time, but do not delay leaving in order to print it.'));
    } else if (result.level === 'days') {
      panel.className = 'verdict verdict--days';
      label.textContent = 'Book within days';
      h.textContent = 'Ask for the earliest appointment you can get';
      panel.appendChild(label);
      panel.appendChild(h);
      panel.appendChild(el('p', null, 'You do not have to work out what this is, and you do not have to be certain it is serious. Name the symptom when you book — "blood in my urine", or "a change in bowel habit for over three weeks" — because that is what appointments are triaged on. This is because:'));
      panel.appendChild(list(result.reasons));
      panel.appendChild(el('p', null, 'If any of the emergency signs in step 1 appear in the meantime, stop waiting and get urgent help instead.'));
    } else {
      panel.className = 'verdict verdict--calm';
      label.textContent = 'Probably nothing — keep the note';
      h.textContent = 'Nothing you have described crosses the usual thresholds';
      panel.appendChild(label);
      panel.appendChild(h);
      panel.appendChild(el('p', null, 'Short-lived symptoms with no blood and none of the other patterns are usually a bug, a new medicine, a diet change or a stressful fortnight, and most settle on their own. That is not a promise, and it is not a diagnosis.'));
      panel.appendChild(el('p', null, 'Book an appointment if any of these turn up: visible blood anywhere; symptoms still going at three weeks; weight coming off without trying; anything that wakes you at night; or simply the feeling that something is wrong. Keep adding to the log in the meantime — an intermittent problem is much easier to describe from records than from memory.'));
    }
    box.appendChild(panel);
  }

  function isCauda() {
    for (var i = 0; i < state.emg.length; i++) {
      if (state.emg[i].indexOf('Numbness around the genitals') === 0) { return true; }
      if (state.emg[i].indexOf('New leg weakness') === 0) { return true; }
    }
    return false;
  }

  function list(items) {
    var ul = document.createElement('ul');
    for (var i = 0; i < items.length; i++) {
      ul.appendChild(el('li', null, items[i]));
    }
    return ul;
  }

  /* ---------------- the plain-text summary -------------------------------- */

  function line(label, value) {
    return value ? ('  ' + label + ': ' + value + '\n') : '';
  }

  function heading(text) { return '\n' + text + '\n' + repeat('-', text.length) + '\n'; }

  function repeat(ch, n) {
    var s = '';
    for (var i = 0; i < n; i++) { s += ch; }
    return s;
  }

  function padRight(s, n) {
    s = String(s);
    while (s.length < n) { s += ' '; }
    return s;
  }

  function sortedLog() {
    return state.log.slice().sort(function (a, b) {
      if (a.date === b.date) { return 0; }
      return a.date < b.date ? -1 : 1;
    });
  }

  function buildSummary(result) {
    var t = '';
    t += 'NOTE FOR AN APPOINTMENT\n';
    t += repeat('=', 23) + '\n';
    t += 'Written on ' + longDate(todayISO()) + ' using OUTPUT, a general health\n';
    t += 'information site. This is a self-completed record, not a clinical\n';
    t += 'assessment, and nothing in it is a diagnosis.\n';

    t += heading('WHAT THIS RECORD SUGGESTS');
    if (result.level === 'now') {
      t += '  EMERGENCY. Seek urgent help now.\n';
    } else if (result.level === 'days') {
      t += '  Book an appointment within days, not months.\n';
    } else {
      t += '  No threshold crossed. Watch, log, and come back if anything changes.\n';
    }
    if (result.reasons.length) {
      t += '  Because:\n';
      for (var i = 0; i < result.reasons.length; i++) {
        t += '    - ' + result.reasons[i] + '\n';
      }
    }

    t += heading('WHAT HAS CHANGED');
    t += line('Affecting', state.scope.join(', '));
    t += line('Duration', state.duration);
    t += line('Started around', state.start ? longDate(state.start) : '');
    t += line('Going now', state.freqnow);
    t += line('Normal for me', state.freqnormal);
    t += line('Waking at night to pee', state.night ? state.night + ' time(s)' : '');

    t += heading('BLOOD');
    t += line('Reported', state.blood || 'not answered');
    t += line('When and how much', state.bloodwhen);

    if (state.flag.length) {
      t += heading('OTHER THINGS THAT RAISE URGENCY');
      for (var f = 0; f < state.flag.length; f++) {
        t += '  - ' + state.flag[f] + '\n';
      }
    }

    var hasDetail = state.bristol || state.ucolour || state.weight || state.meds || state.other;
    if (hasDetail) {
      t += heading('DETAIL');
      t += line('Usual stool form', state.bristol ? ('Bristol type ' + state.bristol + ' — ' + BRISTOL[state.bristol]) : '');
      t += line('Usual urine colour', state.ucolour);
      t += line('Weight change', state.weight);
      if (state.meds) { t += '  Medicines and supplements:\n' + indent(state.meds); }
      if (state.other) { t += '  Anything else:\n' + indent(state.other); }
    }

    var log = sortedLog();
    if (log.length) {
      t += heading('LOG — ' + log.length + (log.length === 1 ? ' day' : ' days') +
                   ', ' + shortDate(log[0].date) + ' to ' + shortDate(log[log.length - 1].date));
      t += '  ' + padRight('Date', 14) + padRight('Pees', 6) + padRight('Poos', 6) +
           padRight('Bristol', 9) + padRight('Urine colour', 22) + padRight('Blood', 14) + 'Note\n';
      var pees = 0, peeDays = 0, poos = 0, pooDays = 0, bloodDays = 0, minB = 9, maxB = 0;
      for (var j = 0; j < log.length; j++) {
        var e = log[j];
        t += '  ' + padRight(shortDate(e.date), 14) + padRight(e.pees || '-', 6) +
             padRight(e.poos || '-', 6) + padRight(e.bristol || '-', 9) +
             padRight(e.colour || '-', 22) + padRight(e.blood || '-', 14) + (e.note || '') + '\n';
        if (e.pees !== '') { pees += Number(e.pees); peeDays++; }
        if (e.poos !== '') { poos += Number(e.poos); pooDays++; }
        if (e.blood && e.blood !== 'none') { bloodDays++; }
        if (e.bristol) {
          var bn = Number(e.bristol);
          if (bn < minB) { minB = bn; }
          if (bn > maxB) { maxB = bn; }
        }
      }
      t += '\n';
      if (peeDays) { t += '  Average pees a day: ' + (pees / peeDays).toFixed(1) + ' over ' + peeDays + ' day(s).\n'; }
      if (pooDays) { t += '  Average poos a day: ' + (poos / pooDays).toFixed(1) + ' over ' + pooDays + ' day(s).\n'; }
      if (maxB) { t += '  Bristol types recorded: ' + (minB === maxB ? String(minB) : (minB + ' to ' + maxB)) + '.\n'; }
      t += '  Days with blood recorded: ' + bloodDays + ' of ' + log.length + '.\n';
    }

    t += heading('QUESTIONS I WANT TO ASK');
    for (var q = 0; q < QUESTIONS.length; q++) {
      t += '  ' + (q + 1) + '. ' + QUESTIONS[q] + '\n';
    }

    t += '\n' + repeat('-', 62) + '\n';
    t += 'Prepared by the person named above, not by a clinician.\n';
    return t;
  }

  function indent(text) {
    var lines = String(text).split(/\r?\n/);
    var out = '';
    for (var i = 0; i < lines.length; i++) {
      out += '    ' + lines[i] + '\n';
    }
    return out;
  }

  /* ---------------- the log ---------------------------------------------- */

  function renderLog() {
    var body = byId('log-body');
    var wrap = byId('log-wrap');
    var empty = byId('log-empty');
    body.innerHTML = '';
    var log = sortedLog();
    if (!log.length) {
      wrap.hidden = true;
      empty.hidden = false;
      return;
    }
    wrap.hidden = false;
    empty.hidden = true;
    for (var i = 0; i < log.length; i++) {
      var e = log[i];
      var tr = document.createElement('tr');
      var th = el('th', null, shortDate(e.date));
      th.setAttribute('scope', 'row');
      tr.appendChild(th);
      tr.appendChild(el('td', 'num', e.pees === '' ? '—' : e.pees));
      tr.appendChild(el('td', 'num', e.poos === '' ? '—' : e.poos));
      tr.appendChild(el('td', 'num', e.bristol === '' ? '—' : e.bristol));
      tr.appendChild(el('td', null, e.colour || '—'));
      tr.appendChild(el('td', null, e.blood || '—'));
      tr.appendChild(el('td', null, e.note || '—'));
      var cell = document.createElement('td');
      var btn = el('button', 'btn btn--ghost btn--small', 'Remove');
      btn.type = 'button';
      btn.setAttribute('data-date', e.date);
      btn.setAttribute('aria-label', 'Remove the entry for ' + shortDate(e.date));
      cell.appendChild(btn);
      tr.appendChild(cell);
      body.appendChild(tr);
    }
  }

  function addLogEntry() {
    var date = textValue('log-date');
    var status = byId('log-status');
    if (!parseISO(date)) {
      status.textContent = 'Pick a date first — the entry needs one.';
      byId('log-date').focus();
      return;
    }
    var entry = {
      date: date,
      pees: textValue('log-pees'),
      poos: textValue('log-poos'),
      bristol: textValue('log-bristol'),
      colour: textValue('log-colour'),
      blood: textValue('log-blood'),
      note: textValue('log-note')
    };
    var replaced = false;
    for (var i = 0; i < state.log.length; i++) {
      if (state.log[i].date === date) { state.log[i] = entry; replaced = true; break; }
    }
    if (!replaced) { state.log.push(entry); }
    save();
    renderLog();
    status.textContent = (replaced ? 'Updated ' : 'Added ') + shortDate(date) + '. ' +
      state.log.length + (state.log.length === 1 ? ' day' : ' days') + ' logged.';
    setText('log-note', '');
    setText('log-pees', '');
    setText('log-poos', '');
    setText('log-bristol', '');
    setText('log-colour', '');
    setText('log-blood', '');
  }

  /* ---------------- the stepper ------------------------------------------ */

  function buildProgress() {
    var bar = byId('progress');
    bar.innerHTML = '';
    for (var i = 0; i < STEPS.length; i++) {
      bar.appendChild(document.createElement('span'));
    }
  }

  function show(index) {
    current = index;
    for (var i = 0; i < STEPS.length; i++) {
      var node = byId(STEPS[i]);
      if (!node) { continue; }
      var cls = node.className.replace(/\s*\bstep--hidden\b/g, '');
      node.className = (i === index) ? cls : (cls ? cls + ' step--hidden' : 'step--hidden');
    }
    each(byId('progress').childNodes, function (pip, i) {
      pip.className = (i <= index) ? 'on' : '';
    });

    var back = byId('backbtn');
    var next = byId('nextbtn');
    back.disabled = (index === 0);
    if (index === RESULT) {
      next.hidden = true;
      byId('stepstatus').textContent = 'Your note is ready.';
    } else {
      next.hidden = false;
      next.textContent = (index === RESULT - 1) ? 'Build my note' : 'Continue';
      byId('stepstatus').textContent = 'Step ' + (index + 1) + ' of ' + RESULT + '.';
    }

    /* Do not steal focus on first paint — that would scroll past the intro. */
    if (firstRender) { firstRender = false; return; }
    var target = byId(STEPS[index]).querySelector('.step__q');
    if (target && typeof target.focus === 'function') {
      try { target.focus(); } catch (e) { /* ignore */ }
    }
  }

  function goResult() {
    readForm();
    save();
    var result = triage();
    renderVerdict(result);
    byId('summaryout').textContent = buildSummary(result);
    byId('copystatus').textContent = '';
    show(RESULT);
  }

  function next() {
    readForm();
    save();
    if (current === 0 && state.emg.length) { goResult(); return; }
    if (current === RESULT - 1) { goResult(); return; }
    show(current + 1);
  }

  function back() {
    if (current === RESULT) { show(state.emg.length ? 0 : RESULT - 1); return; }
    if (current > 0) { show(current - 1); }
  }

  /* ---------------- buttons ---------------------------------------------- */

  function doCopy() {
    var out = byId('summaryout');
    var status = byId('copystatus');
    window.OUTPUT.copyText(out.textContent, function (ok) {
      if (ok) {
        status.textContent = 'Copied. Paste it wherever you need it.';
      } else {
        var selected = window.OUTPUT.selectElementText(out);
        status.textContent = selected
          ? 'Copying is not available here, so the text is selected instead — press Ctrl+C, or Cmd+C on a Mac.'
          : 'Copying is not available here. Select the text below by hand and copy it.';
      }
    });
  }

  function doPrint() {
    try { window.print(); } catch (e) {
      byId('copystatus').textContent = 'Your browser would not open the print dialogue. Use the browser menu instead.';
    }
  }

  function doClear() {
    var ok = true;
    try {
      ok = window.confirm('Delete every answer and every logged day? This cannot be undone.');
    } catch (e) { ok = true; }
    if (!ok) { return; }
    state = {
      emg: [], scope: [], duration: '', blood: '', bloodwhen: '', flag: [],
      start: '', bristol: '', ucolour: '', freqnow: '', freqnormal: '',
      night: '', weight: '', meds: '', other: '', log: []
    };
    store.remove(KEY);
    form.reset();
    writeForm();
    renderLog();
    byId('log-status').textContent = '';
    byId('copystatus').textContent = 'Cleared.';
    setText('log-date', todayISO());
    show(0);
  }

  /* ---------------- wiring ------------------------------------------------ */

  function init() {
    if (!store.available) {
      var notice = byId('storenotice');
      if (notice) { notice.hidden = false; }
    }

    load();
    writeForm();
    renderLog();
    buildProgress();
    setText('log-date', todayISO());
    show(0);

    form.addEventListener('change', function (e) {
      var t = e.target;
      if (t && t.name && t.name.indexOf('log-') === 0) { return; }
      readForm();
      markPickers();
      save();
    });
    form.addEventListener('input', function (e) {
      var t = e.target;
      if (t && t.id && t.id.indexOf('log-') === 0) { return; }
      readForm();
      if (saveTimer) { window.clearTimeout(saveTimer); }
      saveTimer = window.setTimeout(function () { saveTimer = null; save(); }, 350);
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); });

    byId('nextbtn').addEventListener('click', next);
    byId('backbtn').addEventListener('click', back);
    byId('log-add').addEventListener('click', addLogEntry);
    byId('copybtn').addEventListener('click', doCopy);
    byId('printbtn').addEventListener('click', doPrint);
    byId('clearbtn').addEventListener('click', doClear);

    byId('log-body').addEventListener('click', function (e) {
      var btn = e.target;
      while (btn && btn !== this && btn.nodeName !== 'BUTTON') { btn = btn.parentNode; }
      if (!btn || btn.nodeName !== 'BUTTON') { return; }
      var date = btn.getAttribute('data-date');
      var kept = [];
      for (var i = 0; i < state.log.length; i++) {
        if (state.log[i].date !== date) { kept.push(state.log[i]); }
      }
      state.log = kept;
      save();
      renderLog();
      byId('log-status').textContent = 'Removed ' + shortDate(date) + '. ' +
        state.log.length + (state.log.length === 1 ? ' day' : ' days') + ' logged.';
      byId('log-add').focus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
