/* OUTPUT — shared site script.
   ES2020 and below. Classic script, no modules. Works from file://.
   No network access of any kind. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.className = root.className ? root.className + ' js' : 'js';

  /* ----------------------------------------------------------------------
     Safe storage. localStorage throws outright in iOS Private Browsing and
     can be disabled elsewhere, so every call is guarded and we fall back to
     a plain in-memory object. Consumers read .available to decide whether to
     show the "nothing will be saved" notice.
     ---------------------------------------------------------------------- */
  var memory = {};
  var available = false;
  try {
    if (typeof window.localStorage !== 'undefined' && window.localStorage !== null) {
      var probe = '__output_probe__';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      available = true;
    }
  } catch (e) {
    available = false;
  }

  var store = {
    available: available,
    get: function (key) {
      if (available) {
        try {
          return window.localStorage.getItem(key);
        } catch (err) { /* fall through to memory */ }
      }
      return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
    },
    set: function (key, value) {
      memory[key] = String(value);
      if (available) {
        try {
          window.localStorage.setItem(key, String(value));
          return true;
        } catch (err) { return false; }
      }
      return false;
    },
    remove: function (key) {
      delete memory[key];
      if (available) {
        try { window.localStorage.removeItem(key); } catch (err) { /* ignore */ }
      }
    }
  };

  /* ----------------------------------------------------------------------
     Clipboard. navigator.clipboard is undefined on file:// and on plain
     http, and can reject even where it exists. Always feature-detect, always
     .catch(), and always tell the caller to fall back to selecting the text.
     ---------------------------------------------------------------------- */
  function copyText(text, onDone) {
    var ok = function () { onDone(true); };
    var fail = function () { onDone(false); };
    try {
      if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(text).then(ok, fail)['catch'](fail);
        return;
      }
    } catch (e) { /* fall through */ }
    fail();
  }

  function selectElementText(el) {
    try {
      if (window.getSelection && document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  /* small helpers shared with note.js */
  function byId(id) { return document.getElementById(id); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* ----------------------------------------------------------------------
     Theme: auto / light / dark, remembered when storage allows.
     ---------------------------------------------------------------------- */
  var THEME_KEY = 'output.theme';
  var order = ['auto', 'light', 'dark'];
  var labels = { auto: 'Theme: auto', light: 'Theme: light', dark: 'Theme: dark' };

  function applyTheme(mode) {
    if (mode === 'light' || mode === 'dark') {
      root.setAttribute('data-theme', mode);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function initTheme() {
    var saved = store.get(THEME_KEY);
    var mode = (saved === 'light' || saved === 'dark' || saved === 'auto') ? saved : 'auto';
    applyTheme(mode);

    var btn = byId('themebtn');
    if (!btn) { return; }
    btn.hidden = false;
    var setLabel = function (m) {
      btn.textContent = labels[m];
      btn.setAttribute('aria-label', 'Colour theme, currently ' + m + '. Activate to change.');
    };
    setLabel(mode);
    btn.addEventListener('click', function () {
      var i = order.indexOf(mode);
      mode = order[(i + 1) % order.length];
      applyTheme(mode);
      setLabel(mode);
      store.set(THEME_KEY, mode);
    });
  }

  /* ----------------------------------------------------------------------
     Mark the current page in the nav without hard-coding it per file.
     ---------------------------------------------------------------------- */
  function markCurrent() {
    var path = window.location.pathname;
    var slash = path.lastIndexOf('/');
    var file = slash >= 0 ? path.substring(slash + 1) : path;
    if (!file) { file = 'index.html'; }
    each(document.querySelectorAll('.nav a'), function (a) {
      var href = a.getAttribute('href') || '';
      if (href === file) { a.setAttribute('aria-current', 'page'); }
    });
  }

  /* ----------------------------------------------------------------------
     Tell people a table scrolls, only when it actually does.
     ---------------------------------------------------------------------- */
  function hintScrollables() {
    each(document.querySelectorAll('.tablewrap'), function (box) {
      var hint = box.nextElementSibling;
      if (!hint || hint.className.indexOf('scrollhint') === -1) { return; }
      if (box.scrollWidth <= box.clientWidth + 2) { hint.style.display = 'none'; }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    markCurrent();
    hintScrollables();
  });
  window.addEventListener('resize', hintScrollables);

  window.OUTPUT = {
    store: store,
    copyText: copyText,
    selectElementText: selectElementText,
    byId: byId,
    each: each
  };
}());
