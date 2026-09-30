/* Passant site script. Small on purpose: theme toggle, menu, waitlist form, copy button. */
(function () {
  'use strict';

  /* TODO before launch: set this to the URL that receives waitlist sign-ups as JSON via POST.
     While it is empty the form refuses to pretend it worked. */
  var WAITLIST_ENDPOINT = '';
  var CONTACT_EMAIL = 'hello@passant.io';

  /* ----- Theme ----- */
  var root = document.documentElement;
  function label() {
    var next = root.getAttribute('data-theme') === 'dark' ? 'Light mode' : 'Dark mode';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) { b.textContent = next; });
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', t);
      try { localStorage.setItem('theme', t); } catch (e) {}
      label();
    });
  });
  label();

  /* ----- Mobile menu closes after a choice ----- */
  document.querySelectorAll('.menu-panel a').forEach(function (a) {
    a.addEventListener('click', function () { var m = a.closest('details'); if (m) m.removeAttribute('open'); });
  });

  /* ----- Copy button on code blocks ----- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-copy'));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.textContent).then(function () {
        var old = btn.textContent; btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1600);
      });
    });
  });

  /* ----- Waitlist form ----- */
  var form = document.getElementById('waitlist-form');
  if (!form) return;
  var email = form.querySelector('#email');
  var emailError = document.getElementById('email-error');
  var status = document.getElementById('form-status');
  var done = document.getElementById('waitlist-done');
  var button = form.querySelector('button[type="submit"]');

  function setStatus(text, state) { status.textContent = text; if (state) status.setAttribute('data-state', state); else status.removeAttribute('data-state'); }

  function validEmail() {
    var ok = email.value.trim() !== '' && email.checkValidity();
    email.setAttribute('aria-invalid', ok ? 'false' : 'true');
    emailError.textContent = ok ? '' : 'Enter a work email address, like name@company.com.';
    return ok;
  }
  email.addEventListener('blur', function () { if (email.value) validEmail(); });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!validEmail()) { email.focus(); return; }
    if (!WAITLIST_ENDPOINT) {
      setStatus('The waitlist is not connected yet. Email ' + CONTACT_EMAIL + ' and we will add you.', 'error');
      return;
    }
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    button.disabled = true;
    setStatus('Joining the waitlist…');
    fetch(WAITLIST_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.hidden = true; done.hidden = false; done.focus();
      })
      .catch(function () {
        setStatus('That did not go through. Try again, or email ' + CONTACT_EMAIL + '.', 'error');
        button.disabled = false;
      });
  });
})();
