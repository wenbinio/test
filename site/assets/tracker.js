/* Pee & Poo Habits — tracker
 * Plain classic script. No modules, no fetch, no network. Works from file://.
 * Everything the user types stays in this browser (localStorage only).
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Thresholds. Each number is here because of a stated reason, not a
   * hunch. None of them are diagnoses — they decide when to show a
   * "worth mentioning" note.
   * ------------------------------------------------------------------ */

  // Most adults pass urine about 4-8 times in 24 h. "More than 8" is the
  // usual working definition of urinary frequency.
  var FREQUENCY_VOIDS_PER_DAY = 8;
  // A single busy or coffee-heavy day is normal. Three days out of seven
  // is what makes it a pattern rather than a blip.
  var FREQUENCY_DAYS_NEEDED = 3;

  // Getting up 2+ times a night to pass urine is the standard definition
  // of nocturia (once is common and often not treated as abnormal).
  var NOCTURIA_VOIDS_PER_NIGHT = 2;
  var NOCTURIA_NIGHTS_NEEDED = 3;

  // Fewer than 3 bowel motions a week is the long-standing cut-off used
  // in constipation criteria.
  var CONSTIPATION_MIN_POOS_PER_WEEK = 3;
  // Three or more logged days with nothing passed is the other half of the
  // same picture.
  var CONSTIPATION_MAX_EMPTY_DAYS = 3;
  // ...but only when the week's total is also on the low side. Eight motions
  // bunched onto two days is a loose-bowel pattern, not constipation, and
  // telling someone with diarrhoea that they are constipated is nonsense.
  var CONSTIPATION_EMPTY_ARM_MAX_POOS = 7;
  // Don't call constipation on an almost-empty log: a missing entry is not
  // the same as a missing bowel motion.
  var MIN_LOGGED_DAYS_FOR_CONSTIPATION = 4;

  // Bristol 6 (mushy, ragged edges) and 7 (liquid) are the loose types.
  var LOOSE_BRISTOL_MIN = 6;
  // Three or more loose stools in 24 h is the common definition of diarrhoea.
  var DIARRHOEA_STOOLS_PER_DAY = 3;
  // Diarrhoea running beyond about two weeks is treated as chronic and
  // should be looked at rather than waited out.
  var CHRONIC_DIARRHOEA_DAYS = 14;

  // Burning once can be irritation. On two separate days it is worth a
  // urine test.
  var UTI_PAIN_DAYS = 2;

  // Rough adult range for total drinks. Under ~1 L a day tends towards
  // dehydration; over ~4 L a day can dilute blood sodium (hyponatraemia),
  // especially if it is plain water drunk quickly.
  var FLUID_LOW_ML = 1000;
  var FLUID_HIGH_ML = 4000;

  // Night runs 22:00 to 06:00, so it crosses midnight. A void at 01:00 on
  // Tuesday belongs to the night that started on Monday.
  var NIGHT_START_HOUR = 22;
  var NIGHT_END_HOUR = 6;

  var WEEK_DAYS = 7;          // days shown in the 7-day table
  var RECENT_LIMIT = 20;      // rows in the recent-entries table
  var STORAGE_KEY = 'pph.entries.v1';
  var RED_FLAGS_HREF = 'red-flags.html';

  /* ------------------------------------------------------------------ *
   * Lookup tables
   * ------------------------------------------------------------------ */

  var BRISTOL = {
    '1': 'Type 1 — separate hard lumps, like nuts, hard to pass',
    '2': 'Type 2 — sausage-shaped but lumpy',
    '3': 'Type 3 — like a sausage with cracks on the surface',
    '4': 'Type 4 — like a sausage or snake, smooth and soft',
    '5': 'Type 5 — soft blobs with clear-cut edges, passed easily',
    '6': 'Type 6 — fluffy ragged-edged pieces, a mushy stool',
    '7': 'Type 7 — watery, no solid pieces, entirely liquid'
  };

  var COLOURS = {
    'pale-straw': 'Pale straw',
    'light-yellow': 'Light yellow',
    'dark-yellow': 'Dark yellow',
    'amber': 'Amber',
    'orange': 'Orange',
    'red-brown': 'Red or brown'
  };

  var BLOOD = {
    'none': 'None seen',
    'paper': 'On the paper',
    'bowl': 'In the bowl or water',
    'mixed': 'Mixed into the stool',
    'black': 'Black and tarry'
  };

  var VOLUME = { 'small': 'Small', 'medium': 'Medium', 'large': 'Large' };

  var URGENCY = {
    '0': '0 — no urgency',
    '1': '1 — mild, could wait',
    '2': '2 — strong, hard to wait',
    '3': '3 — could not hold on'
  };

  /* ------------------------------------------------------------------ *
   * Tiny DOM helpers
   * ------------------------------------------------------------------ */

  function $(id) { return document.getElementById(id); }

  function el(tag, text) {
    var node = document.createElement(tag);
    if (text !== undefined && text !== null) { node.textContent = String(text); }
    return node;
  }

  function clear(node) {
    if (!node) { return; }
    while (node.firstChild) { node.removeChild(node.firstChild); }
  }

  function pill(tone, text) {
    var span = el('span', text);
    span.className = 'pill pill--' + tone;
    return span;
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* ------------------------------------------------------------------ *
   * Dates — local time only, no library
   * ------------------------------------------------------------------ */

  function dateKey(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function keyToDate(key) {
    var p = String(key || '').split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function addDays(d, n) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  }

  function timeString(d) { return pad2(d.getHours()) + ':' + pad2(d.getMinutes()); }

  // Older desktop Safari renders <input type="date"> and type="time" as plain
  // text boxes, so whatever comes back has to be checked here rather than
  // assumed. Never hand a hand-built string to new Date() — iOS Safari will
  // not parse it. Build the Date from numbers and compare it back.
  function normaliseDateValue(value) {
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(value || '').replace(/\s/g, ''));
    if (!m) { return null; }
    var y = Number(m[1]), mo = Number(m[2]), da = Number(m[3]);
    if (mo < 1 || mo > 12 || da < 1 || da > 31) { return null; }
    var d = new Date(y, mo - 1, da);
    if (d.getFullYear() !== y || d.getMonth() !== mo - 1 || d.getDate() !== da) {
      return null;
    }
    return dateKey(d);
  }

  function normaliseTimeValue(value) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(value || '').replace(/\s/g, ''));
    if (!m) { return null; }
    var h = Number(m[1]), mi = Number(m[2]);
    if (h < 0 || h > 23 || mi < 0 || mi > 59) { return null; }
    return pad2(h) + ':' + pad2(mi);
  }

  function entryHour(entry) {
    var h = parseInt(String(entry.time || '00:00').split(':')[0], 10);
    return isNaN(h) ? 0 : h;
  }

  function isNight(entry) {
    var h = entryHour(entry);
    return h >= NIGHT_START_HOUR || h < NIGHT_END_HOUR;
  }

  // The date the night STARTED. 23:40 on the 5th and 02:10 on the 6th both
  // belong to the night of the 5th. Anything outside the night window
  // returns null.
  function nightKey(entry) {
    if (!isNight(entry)) { return null; }
    if (entryHour(entry) >= NIGHT_START_HOUR) { return entry.date; }
    return dateKey(addDays(keyToDate(entry.date), -1));
  }

  function prettyDate(key) {
    var d = keyToDate(key);
    if (isNaN(d.getTime())) { return String(key); }
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()];
  }

  /* ------------------------------------------------------------------ *
   * Storage
   * ------------------------------------------------------------------ */

  var entries = [];
  var storageWorks = true;

  function noteStorageProblem(message) {
    storageWorks = false;
    var notice = $('storage-notice');
    if (!notice) { return; }
    clear(notice);
    notice.appendChild(el('p', message));
    notice.hidden = false;
  }

  function looksLikeEntry(e) {
    return e && typeof e === 'object' &&
      (e.type === 'pee' || e.type === 'poo' || e.type === 'drink') &&
      typeof e.date === 'string';
  }

  // iOS Safari in Private Browsing has historically thrown QuotaExceededError
  // on setItem rather than failing quietly, and some browsers throw merely on
  // touching window.localStorage. Probe reads AND writes before trusting it.
  function probeStorage() {
    try {
      var store = window.localStorage;
      if (!store) { return false; }
      var probeKey = STORAGE_KEY + '.probe';
      store.setItem(probeKey, '1');
      store.getItem(probeKey);
      store.removeItem(probeKey);
      return true;
    } catch (err) {
      return false;
    }
  }

  function load() {
    if (!storageWorks) { return []; }
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) { return []; }
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter(looksLikeEntry) : [];
    } catch (err) {
      noteStorageProblem('This browser will not let the page save data (private browsing, or storage is switched off). You can still log entries and read the summaries, but they will be gone when you close the tab.');
      return [];
    }
  }

  function save() {
    if (!storageWorks) { return; }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (err) {
      noteStorageProblem('Saving failed, so this log is being kept in memory only and will be lost when you close the tab. Storage may be full or switched off.');
    }
  }

  // crypto.randomUUID does not exist on file:// or plain http:// origins, so
  // ids are a timestamp plus a counter. Unique enough for one browser's log.
  var idCounter = 0;
  function newId() {
    idCounter = idCounter + 1;
    return 'e' + String(Date.now()) + '-' + String(idCounter);
  }

  /* ------------------------------------------------------------------ *
   * Aggregation
   * ------------------------------------------------------------------ */

  function sortedEntries() {
    return entries.slice().sort(function (a, b) {
      var ka = a.date + 'T' + (a.time || '00:00');
      var kb = b.date + 'T' + (b.time || '00:00');
      if (ka === kb) { return 0; }
      return ka < kb ? -1 : 1;
    });
  }

  function blankDay(key) {
    return {
      key: key, pees: 0, poos: 0, nightPees: 0, fluidMl: 0,
      drinkCount: 0, bristolSum: 0, bristolCount: 0, loose: 0,
      bloodKinds: [], painPees: 0, redUrine: 0
    };
  }

  // Buckets entries by calendar date, plus night voids by the night's
  // starting date.
  function buildDays() {
    var byDate = {};
    function day(key) {
      if (!byDate[key]) { byDate[key] = blankDay(key); }
      return byDate[key];
    }
    var i, e, d, nk, b;
    for (i = 0; i < entries.length; i++) {
      e = entries[i];
      if (!looksLikeEntry(e)) { continue; }
      d = day(e.date);
      if (e.type === 'pee') {
        d.pees++;
        if (e.pain) { d.painPees++; }
        if (e.colour === 'red-brown') { d.redUrine++; }
        nk = nightKey(e);
        if (nk) { day(nk).nightPees++; }
      } else if (e.type === 'poo') {
        d.poos++;
        b = parseInt(e.bristol, 10);
        if (!isNaN(b) && b >= 1 && b <= 7) {
          d.bristolSum += b;
          d.bristolCount++;
          if (b >= LOOSE_BRISTOL_MIN) { d.loose++; }
        }
        if (e.blood && e.blood !== 'none') { d.bloodKinds.push(e.blood); }
      } else if (e.type === 'drink') {
        var ml = parseInt(e.ml, 10);
        if (!isNaN(ml) && ml > 0) { d.fluidMl += ml; d.drinkCount++; }
      }
    }
    return byDate;
  }

  function lastNDayKeys(n) {
    var out = [];
    var today = new Date();
    for (var i = n - 1; i >= 0; i--) { out.push(dateKey(addDays(today, -i))); }
    return out;
  }

  function dayOrBlank(days, key) { return days[key] || blankDay(key); }

  /* ------------------------------------------------------------------ *
   * Form
   * ------------------------------------------------------------------ */

  function currentType() {
    var sel = $('f-type');
    return sel ? sel.value : 'pee';
  }

  function syncTypeFields() {
    var type = currentType();
    var pee = $('pee-fields');
    var poo = $('poo-fields');
    var drink = $('drink-fields');
    if (pee) { pee.hidden = (type !== 'pee'); }
    if (poo) { poo.hidden = (type !== 'poo'); }
    if (drink) { drink.hidden = (type !== 'drink'); }
  }

  function resetFormTimes() {
    var now = new Date();
    var date = $('f-date');
    var time = $('f-time');
    if (date && !date.value) { date.value = dateKey(now); }
    if (time) { time.value = timeString(now); }
  }

  function readForm() {
    var now = new Date();
    var dateEl = $('f-date');
    var timeEl = $('f-time');
    var notesEl = $('f-notes');
    var dateValue = dateEl && dateEl.value
      ? normaliseDateValue(dateEl.value) : dateKey(now);
    var timeValue = timeEl && timeEl.value
      ? normaliseTimeValue(timeEl.value) : timeString(now);
    if (!dateValue) { return { invalid: 'date', field: dateEl }; }
    if (!timeValue) { return { invalid: 'time', field: timeEl }; }

    var entry = {
      id: newId(),
      type: currentType(),
      date: dateValue,
      time: timeValue,
      notes: notesEl ? String(notesEl.value || '').slice(0, 500) : '',
      demo: false
    };

    if (entry.type === 'pee') {
      entry.volume = $('f-pee-volume') ? $('f-pee-volume').value : '';
      var mlEl = $('f-pee-ml');
      var ml = mlEl ? parseInt(mlEl.value, 10) : NaN;
      entry.ml = isNaN(ml) ? null : ml;
      entry.urgency = $('f-pee-urgency') ? $('f-pee-urgency').value : '0';
      entry.colour = $('f-pee-colour') ? $('f-pee-colour').value : '';
      entry.pain = !!($('f-pee-pain') && $('f-pee-pain').checked);
      entry.leak = !!($('f-pee-leak') && $('f-pee-leak').checked);
    } else if (entry.type === 'poo') {
      entry.bristol = $('f-bristol') ? $('f-bristol').value : '';
      entry.strain = !!($('f-poo-strain') && $('f-poo-strain').checked);
      entry.blood = $('f-poo-blood') ? $('f-poo-blood').value : 'none';
      entry.urgency = $('f-poo-urgency') ? $('f-poo-urgency').value : '0';
      entry.incomplete = !!($('f-poo-incomplete') && $('f-poo-incomplete').checked);
    } else {
      var dml = $('f-drink-ml') ? parseInt($('f-drink-ml').value, 10) : NaN;
      entry.ml = isNaN(dml) ? 0 : dml;
    }
    return entry;
  }

  function clearFormInputs() {
    var ids = ['f-pee-ml', 'f-notes', 'f-drink-ml'];
    for (var i = 0; i < ids.length; i++) {
      var node = $(ids[i]);
      if (node) { node.value = ''; }
    }
    var checks = ['f-pee-pain', 'f-pee-leak', 'f-poo-strain', 'f-poo-incomplete'];
    for (var j = 0; j < checks.length; j++) {
      var c = $(checks[j]);
      if (c) { c.checked = false; }
    }
    var selects = { 'f-pee-urgency': '0', 'f-poo-urgency': '0', 'f-poo-blood': 'none' };
    for (var key in selects) {
      if (Object.prototype.hasOwnProperty.call(selects, key) && $(key)) {
        $(key).value = selects[key];
      }
    }
  }

  function announceSaved(entry) {
    var status = $('save-status');
    if (!status) { return; }
    var word = entry.type === 'pee' ? 'Pee' : (entry.type === 'poo' ? 'Poo' : 'Drink');
    status.textContent = word + ' logged at ' + entry.time + ' on ' + prettyDate(entry.date) + '.';
  }

  function onSubmit(event) {
    event.preventDefault();
    var status = $('save-status');
    var entry = readForm();
    if (entry.invalid) {
      if (status) {
        status.textContent = entry.invalid === 'date'
          ? 'That date did not make sense. Use the format YYYY-MM-DD, for example 2026-08-31.'
          : 'That time did not make sense. Use the 24-hour format HH:MM, for example 07:15 or 22:40.';
      }
      if (entry.field && entry.field.focus) { entry.field.focus(); }
      return;
    }
    if (entry.type === 'drink' && (!entry.ml || entry.ml <= 0)) {
      if (status) { status.textContent = 'Add an amount in millilitres before saving a drink.'; }
      var ml = $('f-drink-ml');
      if (ml && ml.focus) { ml.focus(); }
      return;
    }
    entries.push(entry);
    save();
    clearFormInputs();
    resetFormTimes();
    announceSaved(entry);
    renderAll();
  }

  /* ------------------------------------------------------------------ *
   * "Today" tiles
   * ------------------------------------------------------------------ */

  function setTile(numId, pillId, value, tone, text) {
    var num = $(numId);
    if (num) { num.textContent = String(value); }
    var holder = $(pillId);
    if (!holder) { return; }
    clear(holder);
    if (!tone) { holder.hidden = true; return; }
    holder.hidden = false;
    holder.appendChild(pill(tone, text));
  }

  function renderToday() {
    var days = buildDays();
    var todayKey = dateKey(new Date());
    var yesterdayKey = dateKey(addDays(new Date(), -1));
    var today = dayOrBlank(days, todayKey);
    // Night pees shown are for the night that just ended: it started
    // yesterday at 22:00 and ran to 06:00 this morning.
    var lastNight = dayOrBlank(days, yesterdayKey).nightPees;

    var peeTone = 'green', peeText = 'Typical so far';
    if (today.pees > 10) { peeTone = 'amber'; peeText = 'Above typical'; }
    else if (today.pees < 4) { peeText = 'Below 4 so far today'; }
    setTile('stat-pees', 'pill-pees', today.pees, peeTone, peeText);

    var pooTone = 'green', pooText = 'Typical';
    if (today.poos > 3) { pooTone = 'amber'; pooText = 'More often than usual'; }
    else if (today.poos === 0) { pooText = 'None logged yet today'; }
    setTile('stat-poos', 'pill-poos', today.poos, pooTone, pooText);

    var fluidTone = null, fluidText = '';
    if (today.drinkCount > 0) {
      if (today.fluidMl < FLUID_LOW_ML) { fluidTone = 'amber'; fluidText = 'Low so far'; }
      else if (today.fluidMl > FLUID_HIGH_ML) { fluidTone = 'amber'; fluidText = 'High for one day'; }
      else { fluidTone = 'green'; fluidText = 'In the usual range'; }
    }
    setTile('stat-fluid', 'pill-fluid', today.fluidMl, fluidTone, fluidText);

    var nightTone = 'green', nightText = 'Typical';
    if (lastNight >= 3) { nightTone = 'red'; nightText = 'Well above typical'; }
    else if (lastNight >= NOCTURIA_VOIDS_PER_NIGHT) { nightTone = 'amber'; nightText = 'Above typical'; }
    setTile('stat-night', 'pill-night', lastNight, nightTone, nightText);

    var count = $('entry-count');
    if (count) {
      count.textContent = entries.length === 1
        ? '1 entry saved in this browser.'
        : entries.length + ' entries saved in this browser.';
    }
  }

  /* ------------------------------------------------------------------ *
   * 7-day table
   * ------------------------------------------------------------------ */

  function barCell(count, max) {
    var td = el('td');
    td.appendChild(el('span', String(count)));
    if (count > 0 && max > 0) {
      var bar = el('span', '');
      // The one inline style from JS: bar width as a share of the busiest
      // day. The number above is the real value; the bar is decoration and
      // is hidden from screen readers.
      bar.style.display = 'inline-block';
      bar.style.width = Math.max(6, Math.round((count / max) * 100)) + '%';
      bar.style.height = '0.55em';
      bar.style.background = 'currentColor';
      bar.setAttribute('aria-hidden', 'true');
      td.appendChild(document.createTextNode(' '));
      td.appendChild(bar);
    }
    return td;
  }

  function renderWeek() {
    var body = $('week-body');
    if (!body) { return; }
    clear(body);
    var days = buildDays();
    var keys = lastNDayKeys(WEEK_DAYS);
    var max = 1, i, d;
    for (i = 0; i < keys.length; i++) {
      d = dayOrBlank(days, keys[i]);
      if (d.pees > max) { max = d.pees; }
    }
    for (i = keys.length - 1; i >= 0; i--) {
      d = dayOrBlank(days, keys[i]);
      var tr = el('tr');
      tr.appendChild(el('td', prettyDate(keys[i])));
      tr.appendChild(barCell(d.pees, max));
      tr.appendChild(el('td', String(d.nightPees)));
      tr.appendChild(el('td', String(d.poos)));
      tr.appendChild(el('td', d.bristolCount
        ? (d.bristolSum / d.bristolCount).toFixed(1)
        : '—'));
      var bloodTd = el('td');
      if (d.bloodKinds.length) {
        var black = d.bloodKinds.indexOf('black') !== -1;
        bloodTd.appendChild(pill(black ? 'red' : 'red',
          black ? 'Black tarry' : 'Blood logged'));
      } else {
        bloodTd.appendChild(document.createTextNode('None logged'));
      }
      tr.appendChild(bloodTd);
      tr.appendChild(el('td', d.drinkCount ? String(d.fluidMl) : '—'));
      body.appendChild(tr);
    }
  }

  /* ------------------------------------------------------------------ *
   * Pattern check
   * ------------------------------------------------------------------ */

  function flag(tone, title, meaning, action, linkToRedFlags) {
    return {
      tone: tone, title: title, meaning: meaning,
      action: action, link: linkToRedFlags !== false
    };
  }

  function buildFlags() {
    var days = buildDays();
    var weekKeys = lastNDayKeys(WEEK_DAYS);
    var out = [];
    var i, d;

    // --- whole-history scans (blood and visible red urine are never
    // limited to the last week, and are never auto-dismissed) ---
    var bloodDates = [], blackDates = [], redUrineDates = [], painDates = [];
    var loose3Days = 0;
    var allKeys = [];
    for (var k in days) {
      if (Object.prototype.hasOwnProperty.call(days, k)) { allKeys.push(k); }
    }
    allKeys.sort();
    for (i = 0; i < allKeys.length; i++) {
      d = days[allKeys[i]];
      var hasBlack = d.bloodKinds.indexOf('black') !== -1;
      var hasVisible = false;
      for (var b = 0; b < d.bloodKinds.length; b++) {
        if (d.bloodKinds[b] !== 'black') { hasVisible = true; }
      }
      if (hasBlack) { blackDates.push(d.key); }
      if (hasVisible) { bloodDates.push(d.key); }
      if (d.redUrine > 0) { redUrineDates.push(d.key); }
      if (d.painPees > 0) { painDates.push(d.key); }
      if (d.loose >= DIARRHOEA_STOOLS_PER_DAY) { loose3Days++; }
    }

    if (blackDates.length) {
      out.push(flag('red', 'Black, tarry stool logged',
        'Black tarry stool usually means bleeding higher up in the gut, and it is treated as urgent.',
        'Get seen today — same-day GP appointment, NHS 111, or A&E if you also feel faint, breathless or unwell. Do not wait to see if it settles.'));
    }
    if (bloodDates.length) {
      out.push(flag('red', 'Blood logged with a bowel motion (' + bloodDates.length + (bloodDates.length === 1 ? ' day' : ' days') + ')',
        'Blood on the paper, in the bowl or mixed into the stool has common and harmless causes such as piles, but it can also be the first sign of something that needs treating.',
        'Book a GP appointment about this specifically. It stays on this list — it will not disappear on its own, and it should not be filed under "probably nothing".'));
    }
    if (redUrineDates.length) {
      out.push(flag('red', 'Red or brown urine logged',
        'Visible blood in urine needs assessment even if it happened only once and even if it then cleared up completely.',
        'Contact your GP promptly and say you have passed red or brown urine. If you cannot pass urine at all, or you have fever and back pain, seek urgent care.'));
    }

    // --- last-7-day scans ---
    var freqDays = 0, nocturiaNights = 0, weekPoos = 0, emptyPooDays = 0;
    var loggedDays = 0, lowFluidDays = 0, highFluidDays = 0, diarrhoeaDays = 0;
    for (i = 0; i < weekKeys.length; i++) {
      d = dayOrBlank(days, weekKeys[i]);
      var logged = (d.pees + d.poos + d.drinkCount) > 0;
      if (logged) { loggedDays++; }
      if (d.pees > FREQUENCY_VOIDS_PER_DAY) { freqDays++; }
      if (d.nightPees >= NOCTURIA_VOIDS_PER_NIGHT) { nocturiaNights++; }
      weekPoos += d.poos;
      if (logged && d.poos === 0) { emptyPooDays++; }
      if (d.loose >= DIARRHOEA_STOOLS_PER_DAY) { diarrhoeaDays++; }
      if (d.drinkCount > 0 && d.fluidMl < FLUID_LOW_ML) { lowFluidDays++; }
      if (d.fluidMl > FLUID_HIGH_ML) { highFluidDays++; }
    }

    if (freqDays >= FREQUENCY_DAYS_NEEDED) {
      out.push(flag('amber', 'Passing urine more than ' + FREQUENCY_VOIDS_PER_DAY + ' times a day, on ' + freqDays + ' of the last 7 days',
        'Going often can simply follow how much you drink, caffeine or cold weather, but a sustained pattern can also point to a bladder irritation, an infection, diabetes or prostate changes.',
        'Worth mentioning to a GP, especially alongside how much you are drinking. Bring this log with you.'));
    }
    if (nocturiaNights >= NOCTURIA_NIGHTS_NEEDED) {
      out.push(flag('amber', 'Getting up ' + NOCTURIA_VOIDS_PER_NIGHT + ' or more times a night, on ' + nocturiaNights + ' of the last 7 nights',
        'Repeatedly waking to pass urine (nocturia) can come from evening fluids or alcohol, but also from prostate changes, poorly controlled diabetes, heart or kidney issues, or sleep apnoea.',
        'Try shifting fluids earlier in the day for a week; if it persists, book a GP appointment and take this log.'));
    }
    var emptyDayArm = emptyPooDays >= CONSTIPATION_MAX_EMPTY_DAYS &&
      weekPoos < CONSTIPATION_EMPTY_ARM_MAX_POOS &&
      diarrhoeaDays === 0;
    if (loggedDays >= MIN_LOGGED_DAYS_FOR_CONSTIPATION &&
        (weekPoos < CONSTIPATION_MIN_POOS_PER_WEEK || emptyDayArm)) {
      out.push(flag('amber', 'A constipation pattern (' + weekPoos + ' bowel motion' + (weekPoos === 1 ? '' : 's') + ' in the last 7 days, ' + emptyPooDays + ' logged day' + (emptyPooDays === 1 ? '' : 's') + ' with none)',
        'Fewer than three bowel motions a week, or several days in a row with nothing, is the usual definition of constipation. It is often about fibre, fluid, movement or medication.',
        'More fibre and fluid and a bit more walking usually help. See a GP if it is new, painful, or comes with weight loss or blood.'));
    }
    if (diarrhoeaDays > 0) {
      if (loose3Days >= CHRONIC_DIARRHOEA_DAYS) {
        out.push(flag('red', 'Loose stools on ' + loose3Days + ' separate days across your whole log',
          'Diarrhoea that keeps coming back over more than about two weeks is treated as chronic, and it is not something to keep waiting out.',
          'Book a GP appointment and take this log. Ask specifically about stool tests and, if you are losing weight or seeing blood, about a faster referral.'));
      } else {
        out.push(flag('amber', 'Three or more loose stools in a day, on ' + diarrhoeaDays + ' of the last 7 days',
          'A short bout of diarrhoea is usually an infection or something you ate, and it settles in a few days.',
          'Keep fluids up. See a GP if it lasts beyond a week, you cannot keep fluids down, or you become dizzy or very tired.'));
      }
    }
    if (painDates.length >= UTI_PAIN_DAYS) {
      out.push(flag('amber', 'Pain or burning when passing urine, on ' + painDates.length + ' separate days',
        'Burning on more than one day is a common sign of a urinary tract infection, and less often of irritation or another cause.',
        'Ask your GP or pharmacist about a urine test. Seek urgent care if you get a fever, back or side pain, shivering, or confusion.'));
    }
    if (lowFluidDays > 0) {
      out.push(flag('amber', 'Under ' + FLUID_LOW_ML + ' mL of drinks logged on ' + lowFluidDays + ' day' + (lowFluidDays === 1 ? '' : 's'),
        'If that reflects what you actually drank, it is on the low side and can leave you dehydrated, with dark urine, headaches and constipation.',
        'Try spreading drinks across the day rather than in one go. If you are logging only some of what you drink, this one can be ignored.'));
    }
    if (highFluidDays > 0) {
      out.push(flag('amber', 'Over ' + FLUID_HIGH_ML + ' mL of drinks logged on ' + highFluidDays + ' day' + (highFluidDays === 1 ? '' : 's'),
        'Very high intake keeps you running to the toilet, and drinking a great deal of plain water quickly can dilute the sodium in your blood (hyponatraemia).',
        'If the thirst is constant and unexplained, mention it to a GP — persistent excessive thirst is worth checking for diabetes.'));
    }

    return out;
  }

  function renderPatterns() {
    var host = $('pattern-list');
    if (!host) { return; }
    clear(host);
    var flags = buildFlags();

    if (!entries.length) {
      var empty = el('aside');
      empty.className = 'callout callout--info';
      empty.appendChild(el('p', 'Nothing logged yet. Add a few entries, or use "Add a sample week" below to see how the pattern check reads a log.'));
      host.appendChild(empty);
      return;
    }

    if (!flags.length) {
      var ok = el('aside');
      ok.className = 'callout callout--info';
      var p1 = el('p');
      p1.appendChild(pill('green', 'Nothing flagged'));
      p1.appendChild(document.createTextNode(' Nothing in this log crosses any of the thresholds on this page. That is good news, and it is also useful information in its own right.'));
      ok.appendChild(p1);
      ok.appendChild(el('p', 'A normal, boring log is genuinely worth bringing to an appointment: it shows what your usual pattern actually is, which is much harder to answer from memory.'));
      ok.appendChild(el('p', 'This check only reads what you have logged. If something feels wrong and it is not on this list, that is still worth raising.'));
      host.appendChild(ok);
      return;
    }

    for (var i = 0; i < flags.length; i++) {
      var f = flags[i];
      var box = el('aside');
      box.className = 'callout callout--' + (f.tone === 'red' ? 'danger' : 'warn');

      var head = el('p');
      head.appendChild(pill(f.tone, f.tone === 'red' ? 'Get this checked' : 'Worth a look'));
      head.appendChild(document.createTextNode(' '));
      var strong = el('strong', f.title);
      head.appendChild(strong);
      box.appendChild(head);

      var meaning = el('p');
      meaning.appendChild(el('strong', 'What this could mean: '));
      meaning.appendChild(document.createTextNode(f.meaning));
      box.appendChild(meaning);

      var action = el('p');
      action.appendChild(el('strong', 'What to do: '));
      action.appendChild(document.createTextNode(f.action + ' '));
      if (f.link) {
        action.appendChild(document.createTextNode('See '));
        var a = el('a', 'the red flags page');
        a.setAttribute('href', RED_FLAGS_HREF);
        action.appendChild(a);
        action.appendChild(document.createTextNode('.'));
      }
      box.appendChild(action);
      host.appendChild(box);
    }
  }

  /* ------------------------------------------------------------------ *
   * Recent entries
   * ------------------------------------------------------------------ */

  function describe(entry) {
    var bits = [];
    if (entry.type === 'pee') {
      if (entry.volume && VOLUME[entry.volume]) { bits.push(VOLUME[entry.volume]); }
      if (entry.ml) { bits.push(entry.ml + ' mL'); }
      if (entry.colour && COLOURS[entry.colour]) { bits.push(COLOURS[entry.colour]); }
      if (entry.urgency && entry.urgency !== '0') { bits.push('urgency ' + entry.urgency); }
      if (entry.pain) { bits.push('pain or burning'); }
      if (entry.leak) { bits.push('leak'); }
    } else if (entry.type === 'poo') {
      if (entry.bristol && BRISTOL[entry.bristol]) { bits.push('Bristol ' + entry.bristol); }
      if (entry.blood && entry.blood !== 'none' && BLOOD[entry.blood]) {
        bits.push('blood: ' + BLOOD[entry.blood].toLowerCase());
      }
      if (entry.strain) { bits.push('straining'); }
      if (entry.incomplete) { bits.push('felt incomplete'); }
      if (entry.urgency && entry.urgency !== '0') { bits.push('urgency ' + entry.urgency); }
    } else {
      bits.push((entry.ml || 0) + ' mL');
    }
    if (entry.demo) { bits.push('sample data'); }
    return bits.join(', ');
  }

  function typeLabel(type) {
    return type === 'pee' ? 'Pee' : (type === 'poo' ? 'Poo' : 'Drink');
  }

  function deleteEntry(id) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].id === id) { entries.splice(i, 1); break; }
    }
    save();
    renderAll();
    var status = $('save-status');
    if (status) { status.textContent = 'Entry deleted.'; }
  }

  function makeDeleteButton(entry) {
    var btn = el('button', 'Delete');
    btn.type = 'button';
    btn.className = 'btn btn--ghost';
    btn.setAttribute('data-entry-id', entry.id);
    btn.setAttribute('aria-label',
      'Delete ' + typeLabel(entry.type).toLowerCase() + ' entry, ' +
      prettyDate(entry.date) + ' at ' + entry.time);
    btn.addEventListener('click', function () { deleteEntry(entry.id); });
    return btn;
  }

  function renderRecent() {
    var body = $('recent-body');
    if (!body) { return; }
    clear(body);
    var list = sortedEntries().reverse().slice(0, RECENT_LIMIT);
    var emptyRow;
    if (!list.length) {
      emptyRow = el('tr');
      var td = el('td', 'No entries yet.');
      td.setAttribute('colspan', '5');
      emptyRow.appendChild(td);
      body.appendChild(emptyRow);
      return;
    }
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      var tr = el('tr');
      tr.appendChild(el('td', prettyDate(e.date)));
      tr.appendChild(el('td', e.time || ''));
      tr.appendChild(el('td', typeLabel(e.type)));
      // Notes are user input. textContent only — never innerHTML.
      var detail = el('td');
      detail.appendChild(document.createTextNode(describe(e)));
      if (e.notes) {
        detail.appendChild(el('br'));
        detail.appendChild(el('em', e.notes));
      }
      tr.appendChild(detail);
      var actions = el('td');
      actions.appendChild(makeDeleteButton(e));
      tr.appendChild(actions);
      body.appendChild(tr);
    }
  }

  /* ------------------------------------------------------------------ *
   * Doctor summary
   * ------------------------------------------------------------------ */

  function buildSummaryText() {
    var lines = [];
    var days = buildDays();
    var sorted = sortedEntries();
    lines.push('Bladder and bowel log — summary');
    lines.push('Generated ' + prettyDate(dateKey(new Date())) + ' at ' + timeString(new Date()));
    lines.push('');

    if (!sorted.length) {
      lines.push('No entries logged yet.');
      return lines.join('\n');
    }

    var first = sorted[0], last = sorted[sorted.length - 1];
    lines.push('Range: ' + prettyDate(first.date) + ' to ' + prettyDate(last.date) +
      ' (' + sorted.length + ' entries)');
    lines.push('');
    lines.push('DAILY COUNTS (last ' + WEEK_DAYS + ' days)');
    lines.push('Date            Pees  Night  Poos  Avg Bristol  Fluid mL');
    var weekKeys = lastNDayKeys(WEEK_DAYS), i, d;
    for (i = 0; i < weekKeys.length; i++) {
      d = dayOrBlank(days, weekKeys[i]);
      var name = prettyDate(weekKeys[i]);
      while (name.length < 15) { name += ' '; }
      lines.push(name +
        String(d.pees) + '     ' +
        String(d.nightPees) + '      ' +
        String(d.poos) + '     ' +
        (d.bristolCount ? (d.bristolSum / d.bristolCount).toFixed(1) : '-') + '          ' +
        (d.drinkCount ? String(d.fluidMl) : '-'));
    }
    lines.push('');

    var dist = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0 };
    var bloodEvents = [], painEvents = 0, redUrine = [], leaks = 0;
    for (i = 0; i < sorted.length; i++) {
      var e = sorted[i];
      if (e.type === 'poo') {
        if (dist[e.bristol] !== undefined) { dist[e.bristol]++; }
        if (e.blood && e.blood !== 'none') {
          bloodEvents.push(prettyDate(e.date) + ' ' + e.time + ' — ' + (BLOOD[e.blood] || e.blood));
        }
      } else if (e.type === 'pee') {
        if (e.pain) { painEvents++; }
        if (e.leak) { leaks++; }
        if (e.colour === 'red-brown') { redUrine.push(prettyDate(e.date) + ' ' + e.time); }
      }
    }
    lines.push('BRISTOL DISTRIBUTION (whole log)');
    for (var t = 1; t <= 7; t++) {
      lines.push('  Type ' + t + ': ' + dist[String(t)]);
    }
    lines.push('');
    lines.push('BLOOD EVENTS: ' + (bloodEvents.length ? bloodEvents.length : 'none logged'));
    for (i = 0; i < bloodEvents.length; i++) { lines.push('  ' + bloodEvents[i]); }
    lines.push('RED OR BROWN URINE: ' + (redUrine.length ? redUrine.join('; ') : 'none logged'));
    lines.push('PAIN OR BURNING ON PASSING URINE: ' + painEvents + ' entries');
    lines.push('LEAKS / INCONTINENCE: ' + leaks + ' entries');
    lines.push('');

    var flags = buildFlags();
    lines.push('FLAGS RAISED BY THIS PAGE');
    if (!flags.length) {
      lines.push('  None. Log within the ranges this page checks.');
    } else {
      for (i = 0; i < flags.length; i++) {
        lines.push('  [' + (flags[i].tone === 'red' ? 'URGENT/RED' : 'AMBER') + '] ' + flags[i].title);
      }
    }

    var notes = [];
    for (i = sorted.length - 1; i >= 0 && notes.length < 10; i--) {
      if (sorted[i].notes) {
        notes.push('  ' + prettyDate(sorted[i].date) + ' ' + sorted[i].time + ' — ' + sorted[i].notes);
      }
    }
    if (notes.length) {
      lines.push('');
      lines.push('RECENT NOTES');
      for (i = 0; i < notes.length; i++) { lines.push(notes[i]); }
    }

    var anyDemo = false;
    for (i = 0; i < entries.length; i++) { if (entries[i].demo) { anyDemo = true; break; } }
    if (anyDemo) {
      lines.push('');
      lines.push('NOTE: this log still contains sample (demo) data, which is not real.');
    }
    lines.push('');
    lines.push('This is a self-kept diary, not a medical assessment.');
    return lines.join('\n');
  }

  function onBuildSummary() {
    var box = $('doctor-summary');
    if (!box) { return; }
    box.value = buildSummaryText();
    var status = $('copy-status');
    if (status) { status.textContent = 'Summary built. Read it over before you share it.'; }
  }

  function selectSummary() {
    var box = $('doctor-summary');
    if (!box) { return; }
    box.focus();
    if (box.select) { box.select(); }
    if (box.setSelectionRange) { box.setSelectionRange(0, box.value.length); }
  }

  function onCopy() {
    var box = $('doctor-summary');
    var status = $('copy-status');
    if (!box) { return; }
    if (!box.value) { onBuildSummary(); }
    function fallback(message) {
      selectSummary();
      if (status) {
        status.textContent = message ||
          'Copying automatically is not available here — the text is selected, so press Ctrl+C (or Cmd+C).';
      }
    }
    // navigator.clipboard is undefined in non-secure contexts, which includes
    // file:// and plain http://. Detect it, guard the call, and catch the
    // promise so a rejection never surfaces as an unhandled error.
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        var promise = navigator.clipboard.writeText(box.value);
        if (promise && typeof promise.then === 'function') {
          promise.then(function () {
            if (status) { status.textContent = 'Summary copied to the clipboard.'; }
          })['catch'](function () { fallback(); });
        } else {
          fallback();
        }
      } else {
        fallback();
      }
    } catch (err) {
      fallback();
    }
  }

  /* ------------------------------------------------------------------ *
   * Demo data / wipe
   * ------------------------------------------------------------------ */

  function demoEntry(dayOffset, time, type, extra) {
    var e = {
      id: newId(),
      demo: true,
      type: type,
      date: dateKey(addDays(new Date(), -dayOffset)),
      time: time,
      notes: ''
    };
    for (var k in extra) {
      if (Object.prototype.hasOwnProperty.call(extra, k)) { e[k] = extra[k]; }
    }
    return e;
  }

  // A plausible, unremarkable week: 5-7 daytime pees, the odd night one,
  // roughly daily bowel motions around Bristol 3-4, about 1.8 L of drinks.
  function addDemoWeek() {
    var peeTimes = ['07:10', '09:40', '12:25', '15:05', '18:30', '21:45'];
    var drinkTimes = [['07:15', 300], ['10:00', 250], ['13:00', 400],
                      ['16:00', 300], ['19:30', 350]];
    var added = [];
    for (var day = 6; day >= 0; day--) {
      var peeCount = 5 + (day % 2);
      for (var p = 0; p < peeCount; p++) {
        added.push(demoEntry(day, peeTimes[p], 'pee', {
          volume: p === 0 ? 'large' : 'medium',
          ml: null,
          urgency: p === 0 ? '1' : '0',
          colour: p === 0 ? 'dark-yellow' : 'light-yellow',
          pain: false,
          leak: false
        }));
      }
      if (day === 2 || day === 5) {
        added.push(demoEntry(day, '02:20', 'pee', {
          volume: 'medium', ml: null, urgency: '1',
          colour: 'light-yellow', pain: false, leak: false
        }));
      }
      if (day !== 4) {
        added.push(demoEntry(day, '08:05', 'poo', {
          bristol: (day % 3 === 0) ? '3' : '4',
          strain: (day % 3 === 0),
          blood: 'none',
          urgency: '1',
          incomplete: false
        }));
      }
      for (var dr = 0; dr < drinkTimes.length; dr++) {
        added.push(demoEntry(day, drinkTimes[dr][0], 'drink', { ml: drinkTimes[dr][1] }));
      }
    }
    entries = entries.concat(added);
    save();
    renderAll();
    var status = $('save-status');
    if (status) {
      status.textContent = 'Added ' + added.length + ' sample entries across the last 7 days. They are labelled "sample data" and you can remove them again.';
    }
  }

  function removeDemo() {
    var before = entries.length;
    entries = entries.filter(function (e) { return !e.demo; });
    save();
    renderAll();
    var status = $('save-status');
    if (status) {
      status.textContent = (before - entries.length) + ' sample entries removed. Your own entries are untouched.';
    }
  }

  function deleteAll() {
    if (!window.confirm('Delete every entry in this log? This cannot be undone, and nothing is backed up anywhere.')) {
      return;
    }
    entries = [];
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      noteStorageProblem('The log has been cleared on screen, but this browser would not let the page touch its storage.');
    }
    var box = $('doctor-summary');
    if (box) { box.value = ''; }
    renderAll();
    var status = $('save-status');
    if (status) { status.textContent = 'All entries deleted.'; }
  }

  /* ------------------------------------------------------------------ *
   * Wiring
   * ------------------------------------------------------------------ */

  function renderAll() {
    renderToday();
    renderWeek();
    renderPatterns();
    renderRecent();
  }

  function on(id, event, handler) {
    var node = $(id);
    if (node) { node.addEventListener(event, handler); }
  }

  function init() {
    // If this fragment is not on the page, do nothing at all.
    if (!$('tracker-root') || !$('entry-form')) { return; }

    storageWorks = probeStorage();
    if (!storageWorks) {
      noteStorageProblem('This browser will not let the page save anything (private browsing, or storage is switched off). The tracker still works, but the log is kept in memory only and will be gone when you close the tab.');
    }
    entries = load();

    on('entry-form', 'submit', onSubmit);
    on('f-type', 'change', syncTypeFields);
    on('btn-build-summary', 'click', onBuildSummary);
    on('btn-copy', 'click', onCopy);
    on('btn-demo', 'click', addDemoWeek);
    on('btn-remove-demo', 'click', removeDemo);
    on('btn-clear', 'click', deleteAll);

    syncTypeFields();
    resetFormTimes();
    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
