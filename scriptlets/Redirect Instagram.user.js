// ==UserScript==
// @name         Redirect Instagram
// @match        https://*.instagram.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
// Keep reels and stories on the website while blocking App Store handoffs.
(() => {
  'use strict';
  const l = location,
    p = l.pathname,
    K = (q) => /^\/(?:reel|stories)(?:\/|$)/.test(q),
    B = (v, d = 0) => {
      try {
        const u = new URL(v, l.href),
          s = u.protocol,
          h = u.hostname;
        if (
          /^itms-(?:apps|services):$/.test(s) ||
          /^instagram(?:-[a-z0-9-]+)?:$/.test(s) ||
          h === 'appsto.re' ||
          h.endsWith('.appsto.re') ||
          h === 'apps.apple.com' ||
          h.endsWith('.apps.apple.com') ||
          h === 'itunes.apple.com' ||
          h.endsWith('.itunes.apple.com') ||
          ((h === 'instagram.com' || h.endsWith('.instagram.com')) &&
            /^\/download(?:\/|$)/.test(u.pathname))
        )
          return true;
        if (d < 3)
          for (const k of ['u', 'url', 'redirect', 'redirect_uri']) {
            const n = u.searchParams.get(k);
            if (n && B(n, d + 1)) return true;
          }
      } catch {}
      return false;
    },
    S = (e) => {
      for (const n of e.composedPath ? e.composedPath() : [e.target]) {
        const u = n && (n.href || n.action);
        if (u && B(u)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
      }
    };
  addEventListener('click', S, true);
  addEventListener('auxclick', S, true);
  addEventListener('submit', S, true);
  const o = window.open;
  window.open = function (u, ...a) {
    return B(u) ? null : Reflect.apply(o, this, [u, ...a]);
  };
  if (window.navigation)
    navigation.addEventListener('navigate', (e) => {
      if (e.cancelable && B(e.destination.url)) e.preventDefault();
    });
  if (p.startsWith('/reel/') && !l.search.includes('l=1')) {
    l.replace(l.origin + p + '?l=1');
    return;
  }
  if (/^(?:www\.)?instagram\.com$/.test(l.host) && !p.includes('/embed/') && top === self) {
    const u = l.href;
    if (K(p)) return;
    const g = p.startsWith('/accounts/login');
    if (g && l.search.includes('next=')) {
      const n = new URLSearchParams(l.search).get('next');
      if (n) {
        const x = new URL(n, l.origin);
        if (K(x.pathname)) return;
        l.replace('https://imginn.com' + x.pathname);
        return;
      }
    } else if (u.includes('instagram.com')) l.replace(u.replace('instagram.com', 'imginn.com'));
  }
})();
