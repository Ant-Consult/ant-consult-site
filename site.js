/* Referenced as ?v=1. Bump that number in every page that links this file whenever you change it, so browsers fetch the new copy. */
/* shared by 42 pages */
document.querySelectorAll('.mobile-nav-toggle').forEach(function (toggle) {
  toggle.addEventListener('change', function () {
    if (toggle.checked) {
      var scrollY = window.scrollY || window.pageYOffset || 0;
      document.body.dataset.scrollLockY = scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollY + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.documentElement.classList.add('nav-open');
      document.body.classList.add('nav-open');
    } else {
      var y = parseInt(document.body.dataset.scrollLockY || '0', 10);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.documentElement.classList.remove('nav-open');
      document.body.classList.remove('nav-open');
      window.scrollTo(0, y);
    }
  });
});

/* shared by 41 pages */
(function () {
  var ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/25507063/4dozk6f/'; // ac-newsletter-subscribe
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) { return; }
      e.preventDefault();
      var input = form.querySelector('.newsletter-input');
      var btn = form.querySelector('.newsletter-btn');
      var email = input.value.trim();
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Subscribing\u2026';
      fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({ email: email, source: 'newsletter', page: location.pathname, timestamp: new Date().toISOString() })
      }).catch(function (err) {
        console.warn('Newsletter webhook failed:', err);
      }).finally(function () {
        input.value = '';
        input.placeholder = "Thanks \u2014 you're in!";
        btn.disabled = false;
        btn.textContent = originalText;
      });
    });
  });
})();

/* shared by 41 pages */
(function () {
  var KEY = 'ant_cookie_consent';
  var banner = document.getElementById('cookie-banner');
  var stored = localStorage.getItem(KEY);
  if (stored === 'granted') {
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
  } else if (stored !== 'denied') {
    banner.style.display = 'block';
  }
  document.getElementById('cookie-accept').addEventListener('click', function () {
    localStorage.setItem(KEY, 'granted');
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
    banner.style.display = 'none';
  });
  document.getElementById('cookie-decline').addEventListener('click', function () {
    localStorage.setItem(KEY, 'denied');
    banner.style.display = 'none';
  });
})();
