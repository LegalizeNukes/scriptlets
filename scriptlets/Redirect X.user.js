// ==UserScript==
// @name         Redirect X
// @match        https://*.x.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(() => {
  const l = location,
    h = l.hostname;
  if (top === self && !l.pathname.startsWith('/embed/') && (h === 'x.com' || h === 'www.x.com'))
    l.replace('https://xcancel.com' + l.pathname + l.search + l.hash);
})();
