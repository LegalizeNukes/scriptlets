// ==UserScript==
// @name         Redirect Imgur
// @match        https://*.imgur.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(() => {
  if (top == self && /^(?:www\.)?imgur\.com$/.test(location.hostname))
    location.replace(
      'https://rimgo.catsarch.com' + location.pathname + location.search + location.hash
    );
})();
