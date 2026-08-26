// ==UserScript==
// @name         Tube Cleaner Lite
// @match        https://m.youtube.com/*
// @exclude      https://m.youtube.com/shorts*
// @noframes
// @run-at       document-start
// @inject-into  page
// @grant        none
// ==/UserScript==
// Keep page-context access to YouTube's native player APIs.
!(function () {
  'use strict';
  function e() {
    return 'm.youtube.com' === location.hostname && /^\/watch(?:\/|$)/.test(location.pathname);
  }
  var t = 'wblock.tubeCleaner.audioOnly',
    n = 'wblock.tubeCleaner.quality',
    i = 'wblock.tubeCleaner.position.',
    r = 'data-wblock-tc-cleaned',
    o = 'wblock-tube-cleaner-subtitles-v1',
    a = 6048e5,
    c =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      ('MacIntel' === navigator.platform && navigator.maxTouchPoints > 1),
    l = !0,
    u = !1;
  try {
    l = (function () {
      try {
        var e = localStorage.getItem('wblock.tubeCleaner.autoPiP');
        return null === e || '1' === e;
      } catch (t) {
        return !0;
      }
    })();
  } catch (ze) {}
  function s(e) {
    try {
      return !(
        !e ||
        'function' != typeof e.webkitSupportsPresentationMode ||
        !e.webkitSupportsPresentationMode('picture-in-picture')
      );
    } catch (ze) {
      return !1;
    }
  }
  function d(e) {
    return (
      document.pictureInPictureElement === e ||
      (e && 'picture-in-picture' === e.webkitPresentationMode)
    );
  }
  function p(e) {
    if (e && l && !d(e) && !e.paused && !e.ended)
      try {
        if (s(e) && 'function' == typeof e.webkitSetPresentationMode)
          ((u = !0), e.webkitSetPresentationMode('picture-in-picture'));
        else if ('function' == typeof e.requestPictureInPicture) {
          u = !0;
          var t = e.requestPictureInPicture();
          t &&
            t.catch &&
            t.catch(function () {
              u = !1;
            });
        }
      } catch (ze) {
        u = !1;
      }
  }
  function f(e) {
    if (e && u)
      if (d(e))
        try {
          if (s(e) && 'function' == typeof e.webkitSetPresentationMode)
            (e.webkitSetPresentationMode('inline'), (u = !1));
          else if (
            document.pictureInPictureElement &&
            'function' == typeof document.exitPictureInPicture
          ) {
            var t = document.exitPictureInPicture();
            (t && t.catch && t.catch(function () {}), (u = !1));
          }
        } catch (ze) {}
      else u = !1;
  }
  function v() {
    try {
      return '1' === localStorage.getItem(t);
    } catch (ze) {
      return !1;
    }
  }
  function m(e) {
    try {
      localStorage.setItem(t, e ? '1' : '0');
    } catch (ze) {}
  }
  function y() {
    try {
      var e = localStorage.getItem(n) || 'auto';
      return 'auto' === e || -1 !== se.indexOf(e) ? e : 'auto';
    } catch (ze) {
      return 'auto';
    }
  }
  var h = 'wblock-tc-style',
    b = [
      '#movie_player .ytp-chrome-top,',
      '#movie_player .ytp-chrome-bottom,',
      '#movie_player .ytp-gradient-top,',
      '#movie_player .ytp-gradient-bottom,',
      '#movie_player .ytp-title,',
      '#movie_player .ytp-pip-button,',
      '#movie_player .ytp-chrome-controls,',
      '#movie_player .ytp-right-controls,',
      '#movie_player .ytp-left-controls,',
      '#movie_player .ytp-play-button,',
      '#movie_player .ytp-volume-area,',
      '#movie_player .ytp-time-display,',
      '#movie_player .ytp-progress-bar,',
      '#movie_player .ytp-progress-bar-container,',
      '#movie_player .ytp-settings-button,',
      '#movie_player .ytp-settings-menu,',
      '#movie_player .ytp-panel,',
      '#movie_player .ytp-panel-menu,',
      '#movie_player .ytp-quality-menu,',
      '#movie_player .ytp-fullscreen-button,',
      '#movie_player .ytp-remote-button,',
      '#movie_player .ytp-size-button,',
      '#movie_player .ytp-subtitles-button,',
      '#movie_player .ytp-autonav-endscreen-button,',
      '#movie_player .ytp-share-button,',
      '#movie_player .ytp-watch-later-button,',
      '#movie_player .ytp-menuitem,',
      '.ytp-storyboard-framepreview,',
      '.ytp-tooltip,',
      '.ytp-ad-module,',
      '.video-ads,',
      '#player-ads,',
      '.ytp-ad-overlay-container,',
      '.ytp-ad-overlay-slot,',
      '.ytp-ad-image-overlay,',
      '.ytp-ad-overlay-image,',
      '.ytp-ad-badge,',
      '.ytp-ce-element,',
      '.ytp-cards-teaser,',
      '.iv-branding,',
      '.ytp-ce-covering-overlay,',
      '.ytp-ce-cover,',
      '.ytp-pause-overlay,',
      '.ytp-autonav-endscreen-countdown-overlay,',
      '.ytp-autonav-toggle-button-container,',
      '.ytp-video-info-panel,',
      '.ytp-watermark,',
      '.ytp-related-overlay,',
      '.ytp-large-play-button,',
      '.ytp-error,',
      '.ytp-spoiler-overlay',
      '{ display: none !important; }',
      '#movie_player .html5-video-player,',
      '#movie_player',
      '{ background: transparent !important; }',
      '#movie_player .html5-video-container',
      '{ position: static !important; }',
      '#movie_player video',
      '{ position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; object-fit: contain !important; object-position: center center !important; }',
      '#movie_player',
      '{ cursor: default !important; }',
      '.ytp-youtube-button,',
      '.ytp-title-link',
      '{ display: none !important; }',
      '#movie_player',
      '{ overflow: visible !important; }',
      '.wblock-tc-native video',
      '{ display: block !important; pointer-events: auto !important; }',
      '.wblock-tc-native .ytp-cued-thumbnail-overlay,',
      '.wblock-tc-native .ytp-paid-content-overlay,',
      '.wblock-tc-native .ytp-bezel,',
      '.wblock-tc-native .ytp-spinner,',
      '.wblock-tc-native .ytp-doubletap-ui-legacy,',
      '.wblock-tc-native .ytp-touch-response,',
      '.wblock-tc-native .ytp-player-content',
      '{ pointer-events: none !important; }',
      '#player-control-container,',
      'ytm-custom-control,',
      'ytm-watch-player-controls',
      '{ display: none !important; pointer-events: none !important; }',
      '#player-container-id.player-container',
      '{ position: absolute !important; }',
      'ytm-related-chip-cloud-renderer',
      '{ top: 48px !important; }',
      '#movie_player .html5-video-container',
      '{ overflow: visible !important; }',
      '.wblock-tc-native',
      '{ overflow: visible !important; }',
      '.wblock-tc-native .ytp-chrome-top,',
      '.wblock-tc-native .ytp-chrome-bottom,',
      '.wblock-tc-native .ytp-gradient-top,',
      '.wblock-tc-native .ytp-gradient-bottom,',
      '.wblock-tc-native .ytp-title,',
      '.wblock-tc-native .ytp-large-play-button,',
      '.wblock-tc-native .ytp-ad-module,',
      '.wblock-tc-native .video-ads,',
      '.wblock-tc-native .ytp-ad-overlay-container,',
      '.wblock-tc-native .ytp-ce-element,',
      '.wblock-tc-native .ytp-cards-teaser,',
      '.wblock-tc-native .ytp-pause-overlay,',
      '.wblock-tc-native .ytp-autonav-endscreen-countdown-overlay,',
      '.wblock-tc-native .ytp-watermark,',
      '.wblock-tc-native .ytp-related-overlay,',
      '.wblock-tc-native .ytp-settings-menu,',
      '.wblock-tc-native .ytp-panel,',
      '.wblock-tc-native .ytp-panel-menu,',
      '.wblock-tc-native .ytp-quality-menu,',
      '.wblock-tc-native .ytp-error',
      '{ display: none !important; }',
      '.wblock-tc-native .html5-video-container',
      '{ position: static !important; overflow: visible !important; }',
      '.wblock-tc-native video',
      '{ position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; object-fit: contain !important; object-position: center center !important; }',
      '.wblock-tc-aspect-host',
      '{ box-sizing: border-box !important; height: var(--wblock-tc-player-height) !important; min-height: var(--wblock-tc-player-height) !important; max-height: none !important; aspect-ratio: auto !important; padding-top: 0 !important; padding-bottom: 0 !important; }',
      '.wblock-tc-content-offset',
      '{ margin-top: var(--wblock-tc-content-margin) !important; }',
      '.wblock-tc-toolbar button, .wblock-tc-toolbar div',
      '{ touch-action: manipulation !important; }',
    ].join(' ');
  c &&
    (b +=
      ' #movie_player.wblock-tc-native .html5-video-container, .wblock-tc-native .html5-video-container { position:absolute !important;inset:0 !important;width:100% !important;height:100% !important; }');
  var g = [
    '.wblock-tc-native video,',
    '.wblock-tc-native .html5-video-container',
    '{ visibility: hidden !important; }',
  ].join(' ');
  function w() {
    if (document.getElementById(h)) return !0;
    var e = document.head || document.documentElement;
    if (!e) return !1;
    var t = document.createElement('style');
    return ((t.id = h), (t.textContent = b), e.appendChild(t), !0);
  }
  function k(e) {
    var t = h + '-audio',
      n = document.getElementById(t);
    if (e && !n) {
      var i = document.createElement('style');
      ((i.id = t), (i.textContent = g), (document.head || document.documentElement).appendChild(i));
    } else !e && n && n.remove();
  }
  var E = !1,
    x = !1;
  function L(e) {
    try {
      for (var t = document; t;) {
        var n = Object.getOwnPropertyDescriptor(t, e);
        if (n && 'function' == typeof n.get) return n.get;
        t = Object.getPrototypeOf(t);
      }
    } catch (ze) {}
    return null;
  }
  var S = L('hidden'),
    P = L('visibilityState');
  function A() {
    try {
      ((E = S ? S.call(document) : document.hidden),
        P ? P.call(document) : document.visibilityState);
    } catch (ze) {}
  }
  function _() {
    if (!x) {
      try {
        Object.defineProperty(document, 'hidden', {
          get: function () {
            return !1;
          },
          configurable: !0,
        });
      } catch (ze) {}
      try {
        Object.defineProperty(document, 'visibilityState', {
          get: function () {
            return 'visible';
          },
          configurable: !0,
        });
      } catch (ze) {}
      x = !0;
    }
  }
  (A(), document.addEventListener('visibilitychange', A));
  var C = null,
    T = null,
    M = null,
    O = [],
    I = null,
    q = !1;
  function R(e) {
    try {
      var t = e && 'function' == typeof e.getVideoData ? e.getVideoData() : null,
        n = t && (t.video_id || t.videoId);
      return n && /^[A-Za-z0-9_-]{11}$/.test(String(n)) ? String(n) : null;
    } catch (ze) {
      return null;
    }
  }
  function N() {
    try {
      var e = location.pathname.match(/^\/(?:shorts|embed)\/([A-Za-z0-9_-]{11})(?:\/|$)/),
        t = new URLSearchParams(location.search).get('v');
      if (e) return e[1];
      if (t && /^[A-Za-z0-9_-]{11}$/.test(t)) return t;
    } catch (ze) {}
    return null;
  }
  function D(e) {
    return N() || R(e);
  }
  function F(e, t, n, r) {
    try {
      r || (n > 0 && t >= n - 0.5)
        ? localStorage.removeItem(i + e)
        : isFinite(t) &&
          (t > 0.25
            ? localStorage.setItem(i + e, JSON.stringify({ time: t, updatedAt: Date.now() }))
            : localStorage.removeItem(i + e));
    } catch (ze) {}
  }
  function z(e) {
    O.push(e);
  }
  function B() {
    var e = C;
    (e &&
      e._wblockPlaybackState &&
      ((e._wblockPlaybackState.paused = e.paused), (I = e._wblockPlaybackState)),
      Ee && Se());
    var t = O;
    O = [];
    for (var n = 0; n < t.length; n++)
      try {
        t[n]();
      } catch (ze) {}
    (e &&
      ((e._wblockAutoPiPHooked = !1),
      (e._wblockControlsGuarded = !1),
      (e._wblockControlsPatched = !1),
      (e._wblockMediaSessionHooked = !1)),
      (C = null),
      (T = null),
      pe(),
      (W = null),
      (u = !1));
  }
  function V(t, r) {
    (B(),
      (T = t),
      (C = r),
      pe(),
      (Le = y()),
      (function (e, t) {
        var n = D(e);
        if (n) {
          var r = I && I.identity,
            o = I && I.identity === n ? I : null;
          I = null;
          var a = !1,
            c = !1,
            l = !o,
            u = !(!r || r === n),
            s = null,
            d = (function (e) {
              try {
                var t = JSON.parse(localStorage.getItem(i + e) || 'null');
                return t && isFinite(t.time) && t.time > 0 ? Number(t.time) : null;
              } catch (ze) {
                return null;
              }
            })(n);
          ((!r || r !== n) && (t._wblockAutoplayIdentity = n),
            (t._wblockPlaybackState = { identity: n, paused: t.paused }),
            (t._wblockConfirmedVideoId = n),
            t.addEventListener('loadedmetadata', b),
            t.addEventListener('durationchange', b),
            t.addEventListener('canplay', b),
            t.addEventListener('timeupdate', y),
            t.addEventListener('pause', h),
            t.addEventListener('ended', m),
            window.addEventListener('pagehide', g),
            p(),
            z(function () {
              (null !== s && clearTimeout(s),
                (a = !0),
                f(!0),
                t.removeEventListener('loadedmetadata', b),
                t.removeEventListener('durationchange', b),
                t.removeEventListener('canplay', b),
                t.removeEventListener('timeupdate', y),
                t.removeEventListener('pause', h),
                t.removeEventListener('ended', m),
                window.removeEventListener('pagehide', g),
                delete t._wblockPlaybackState);
            }));
        } else I = null;
        function p() {
          if (!(
            a ||
            c ||
            u ||
            C !== t ||
            D(e) !== n ||
            t.readyState < 1 ||
            !isFinite(t.duration) ||
            t.duration <= 0
          )) {
            c = !0;
            var i = !0;
            if (null !== d)
              if (d >= t.duration - 0.5) F(n, 0, t.duration, !0);
              else
                try {
                  t.currentTime = Math.min(d, Math.max(0, t.duration - 0.1));
                } catch (ze) {
                  i = !1;
                }
            i
              ? (function () {
                  if (!a && !l && o && C === t) {
                    l = !0;
                    try {
                      if (o.paused) t.pause();
                      else if (t.paused) {
                        var e = t.play();
                        e && e.catch && e.catch(function () {});
                      }
                    } catch (ze) {}
                  }
                })()
              : (c = !1);
          }
        }
        function f(e) {
          (null !== s && (clearTimeout(s), (s = null)),
            (a && !e) || F(n, Number(t.currentTime), Number(t.duration), t.ended));
        }
        function v() {
          a ||
            null !== s ||
            (s = setTimeout(function () {
              ((s = null), f(!1));
            }, 5e3));
        }
        function m() {
          f(!0);
        }
        function y() {
          v();
        }
        function h() {
          v();
        }
        function b() {
          (u && ((u = !1), (t._wblockConfirmedVideoId = n)),
            p(),
            t._wblockAutoplayIdentity === n &&
              (t.paused && !t.ended
                ? (function () {
                    try {
                      var e = t.play();
                      e && 'function' == typeof e.then
                        ? e.then(
                            function () {
                              t._wblockAutoplayIdentity === n &&
                                delete t._wblockAutoplayIdentity;
                            },
                            function () {}
                          )
                        : delete t._wblockAutoplayIdentity;
                    } catch (ze) {}
                  })()
                : delete t._wblockAutoplayIdentity));
        }
        function g() {
          f(!0);
        }
      })(t, r),
      z(Se),
      (function (e) {
        e._wblockControlsPatched || ((e._wblockControlsPatched = !0), j(e));
      })(r),
      (function (e) {
        if (e && !e._wblockControlsGuarded) {
          e._wblockControlsGuarded = !0;
          var t = null;
          try {
            (t = new MutationObserver(n)).observe(e, {
              attributes: !0,
              attributeFilter: [
                'controls',
                'controlslist',
                'disablepictureinpicture',
                'disableremoteplayback',
                'playsinline',
                'webkit-playsinline',
                'x-webkit-airplay',
              ],
            });
          } catch (ze) {}
          (n(),
            z(function () {
              if (t)
                try {
                  t.disconnect();
                } catch (ze) {}
            }));
        }
        function n() {
          j(e);
        }
      })(r),
      (function (e, t) {
        if (e && t) {
          var n = 'file:' === location.protocol,
            i = /^\/watch(?:\/|$)/.test(location.pathname);
          if (
            (n || (i && 'music.youtube.com' !== location.hostname)) &&
            !/^\/shorts(?:\/|$)/.test(location.pathname)
          ) {
            var r = [],
              o = null,
              a = null,
              c = null,
              l = '';
            if (
              (t.addEventListener('loadedmetadata', d),
              t.addEventListener('resize', d),
              t.addEventListener('emptied', d),
              window.addEventListener('resize', d),
              'undefined' != typeof ResizeObserver)
            )
              try {
                ((a = new ResizeObserver(d)).observe(e),
                  e.parentElement && a.observe(e.parentElement));
              } catch (ze) {
                a = null;
              }
            (document.addEventListener('fullscreenchange', d),
              document.addEventListener('webkitfullscreenchange', d),
              t.addEventListener('webkitbeginfullscreen', d),
              t.addEventListener('webkitendfullscreen', d),
              t.addEventListener('webkitpresentationmodechanged', d),
              t.addEventListener('enterpictureinpicture', d),
              t.addEventListener('leavepictureinpicture', d),
              d(),
              z(function () {
                if (
                  (t.removeEventListener('loadedmetadata', d),
                  t.removeEventListener('resize', d),
                  t.removeEventListener('emptied', d),
                  window.removeEventListener('resize', d),
                  document.removeEventListener('fullscreenchange', d),
                  document.removeEventListener('webkitfullscreenchange', d),
                  t.removeEventListener('webkitbeginfullscreen', d),
                  t.removeEventListener('webkitendfullscreen', d),
                  t.removeEventListener('webkitpresentationmodechanged', d),
                  t.removeEventListener('enterpictureinpicture', d),
                  t.removeEventListener('leavepictureinpicture', d),
                  a)
                )
                  try {
                    a.disconnect();
                  } catch (ze) {}
                ((a = null), null !== o && cancelAnimationFrame(o), u());
              }));
          }
        }
        function u() {
          c &&
            (c.classList.remove('wblock-tc-content-offset'),
            c.style.removeProperty('--wblock-tc-content-margin'),
            (c = null));
          for (var e = 0; e < r.length; e++)
            (r[e].classList.remove('wblock-tc-aspect-host'),
              r[e].style.removeProperty('--wblock-tc-player-height'));
          r = [];
        }
        function s() {
          o = null;
          for (
            var n = e.getBoundingClientRect(),
              i =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                e.classList.contains('ytp-fullscreen') ||
                !0 === t.webkitDisplayingFullscreen ||
                'fullscreen' === t.webkitPresentationMode,
              s = Number(t.videoWidth) || 0,
              d = Number(t.videoHeight) || 0,
              p = document.documentElement.clientHeight || window.innerHeight || n.height,
              f = [Math.round(n.width), s, d, Math.round(p), i ? 1 : 0].join('|'),
              v = r.length > 0,
              m = 0;
            m < r.length && v;
            m++
          )
            v = r[m].isConnected;
          if (f !== l || (!i && !v))
            if (((l = f), i)) {
              if ((u(), a))
                try {
                  a.disconnect();
                } catch (ze) {}
            } else if ((u(), (n = e.getBoundingClientRect()).width && n.height && s && d)) {
              var y = n.width / n.height;
              if (
                ((function (t) {
                  if (t.width && t.height)
                    for (
                      var n = e, i = 0;
                      n && i < 8 && n !== document.body && n !== document.documentElement;
                      i++
                    ) {
                      var o = n.getBoundingClientRect();
                      if (Math.abs(o.width - t.width) > 4 || Math.abs(o.height - t.height) > 4)
                        break;
                      (r.push(n), (n = n.parentElement));
                    }
                })(n),
                (function () {
                  var t = document.querySelector('.player-placeholder');
                  if (t && !e.contains(t) && !t.contains(e)) {
                    for (var n = !1, i = 0; i < r.length; i++)
                      if (r[i] === t) {
                        n = !0;
                        break;
                      }
                    n || r.push(t);
                  }
                })(),
                r.length)
              ) {
                var h = n.width / y,
                  b = (n.width * d) / s,
                  g = Math.min(b, Math.max(h, 0.85 * p));
                if (g <= h + 2) u();
                else {
                  !(function () {
                    if (a) {
                      try {
                        a.disconnect();
                      } catch (ze) {}
                      try {
                        a.observe(e);
                      } catch (ze) {}
                      if (e.parentElement)
                        try {
                          a.observe(e.parentElement);
                        } catch (ze) {}
                      for (var t = 0; t < r.length; t++)
                        try {
                          a.observe(r[t]);
                        } catch (ze) {}
                    }
                  })();
                  for (var w = Math.round(100 * g) / 100 + 'px', k = 0; k < r.length; k++)
                    (r[k].style.setProperty('--wblock-tc-player-height', w),
                      r[k].classList.add('wblock-tc-aspect-host'));
                  var E = (function (t) {
                    for (
                      var n = [
                          '#below',
                          'ytm-single-column-watch-next-results-renderer',
                          'ytm-watch-next-secondary-results-renderer',
                          'ytm-slim-video-metadata-section-renderer',
                          'ytd-watch-metadata',
                          '#watch-metadata',
                        ],
                        i = 0;
                      i < n.length;
                      i++
                    ) {
                      var r = document.querySelector(n[i]);
                      if (r && !r.contains(e) && !e.contains(r)) {
                        var o = r.getBoundingClientRect();
                        if (o.width && o.top >= t.bottom - 16) return r;
                      }
                    }
                    for (var a = e, c = 0; a && a.parentElement && c < 12; c++) {
                      for (var l = a.nextElementSibling; l;) {
                        var u = l.getBoundingClientRect();
                        if (u.width && u.height && u.top >= t.bottom - 16) return l;
                        l = l.nextElementSibling;
                      }
                      if ((a = a.parentElement) === document.body || a === document.documentElement)
                        break;
                    }
                    return null;
                  })(n);
                  if (E) {
                    E === c &&
                      (E.classList.remove('wblock-tc-content-offset'),
                      E.style.removeProperty('--wblock-tc-content-margin'));
                    var x = E.getBoundingClientRect().top,
                      L = e.getBoundingClientRect().bottom - x;
                    if (L > 1) {
                      var S = parseFloat(getComputedStyle(E).marginTop) || 0,
                        P = Math.round(100 * (S + L)) / 100 + 'px';
                      (E.style.setProperty('--wblock-tc-content-margin', P),
                        E.classList.add('wblock-tc-content-offset'),
                        (c = E));
                    } else c = null;
                  } else
                    c &&
                      (c.classList.remove('wblock-tc-content-offset'),
                      c.style.removeProperty('--wblock-tc-content-margin'),
                      (c = null));
                }
              }
            }
        }
        function d() {
          null === o && (o = requestAnimationFrame(s));
        }
      })(t, r),
      (function (e, t) {
        var i = e.querySelector('.wblock-tc-toolbar');
        i && i.remove();
        var r = document.createElement('div');
        ((r.className = 'wblock-tc-toolbar'),
          (r.style.cssText =
            'position:absolute;left:50%;top:0;transform:translateX(-50%);z-index:2147483646;display:flex;align-items:center;gap:6px;pointer-events:auto;font:600 11px/1.1 -apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;transition:opacity .18s ease'));
        var o =
            'box-sizing:border-box;min-width:0;min-height:28px;padding:4px 3px;border:0;border-radius:0;background:transparent;box-shadow:none;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.9);font:600 11px/1 -apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;cursor:pointer;-webkit-user-select:none;user-select:none;touch-action:manipulation;-webkit-appearance:none;appearance:none',
          a = document.createElement('div');
        a.style.cssText = 'position:relative';
        var l = document.createElement('button');
        function u() {
          var e = Le || ye();
          ((l.textContent = me(e)), (l.title = 'Video quality'));
        }
        ((l.className = 'wblock-tc-quality-button'),
          (l.type = 'button'),
          (l.style.cssText = o + ';color:#d3d6d8;text-shadow:none'),
          l.setAttribute('aria-haspopup', 'menu'),
          l.setAttribute('aria-expanded', 'false'));
        var s = document.createElement('div');
        ((s.className = 'wblock-tc-quality-menu'),
          s.setAttribute('role', 'menu'),
          s.setAttribute('aria-label', 'Video quality'),
          (s.style.cssText =
            'position:fixed;box-sizing:border-box;width:132px;max-height:210px;padding:4px;overflow-y:auto;display:none;border:.5px solid rgba(255,255,255,.24);border-radius:14px;background:rgba(28,28,30,.78);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 8px 24px rgba(0,0,0,.44);color:#fff;font:400 13px/1.2 -apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;z-index:2147483647'));
        var d = !1;
        function p(e) {
          if (d !== e) {
            d = e;
            var t = e ? 'addEventListener' : 'removeEventListener';
            (document[t]('click', h),
              document[t]('scroll', b, !0),
              window[t]('resize', b),
              window[t]('orientationchange', b));
          }
        }
        function f() {
          ((s.style.display = 'none'),
            l.setAttribute('aria-expanded', 'false'),
            p(!1),
            '0' !== r.style.opacity && L());
        }
        function h() {
          f();
        }
        function b() {
          'block' === s.style.display && Ce(l, s);
        }
        if (
          (l.addEventListener('click', function (e) {
            (e.preventDefault(),
              e.stopPropagation(),
              'none' === s.style.display
                ? (u(),
                  (function () {
                    for (; s.firstChild;) s.removeChild(s.firstChild);
                    var e = [{ id: 'auto', label: 'Auto' }].concat(fe()),
                      t = Le || (c ? ye() : y());
                    'auto' === t ||
                      e.some(function (e) {
                        return e.id === t;
                      }) ||
                      1 !== e.length ||
                      e.push({ id: t, label: me(t) });
                    for (var i = 0; i < e.length; i++)
                      (function (e) {
                        var i = document.createElement('button'),
                          r = e.id === t;
                        ((i.type = 'button'),
                          i.setAttribute('role', 'menuitemradio'),
                          i.setAttribute('aria-checked', r ? 'true' : 'false'),
                          (i.style.cssText =
                            'display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-height:36px;padding:7px 9px;border:0;border-radius:8px;background:' +
                            (r ? 'rgba(255,255,255,.14)' : 'transparent') +
                            ';color:#fff;font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;-webkit-appearance:none;appearance:none'));
                        var o = document.createElement('span');
                        o.textContent = e.label;
                        var a = document.createElement('span');
                        ((a.textContent = r ? '\u2713' : ''),
                          (a.style.cssText =
                            'min-width:12px;color:#0a84ff;font-weight:700;text-align:right'),
                          i.appendChild(o),
                          i.appendChild(a),
                          i.addEventListener('click', function (t) {
                            var i;
                            (t.preventDefault(),
                              t.stopPropagation(),
                              (function (e) {
                                try {
                                  localStorage.setItem(n, e);
                                } catch (ze) {}
                                (pe(), xe && xe.stop && xe.stop());
                              })((i = e.id)),
                              _e(i, u),
                              u(),
                              f());
                          }),
                          s.appendChild(i));
                      })(e[i]);
                  })(),
                  Ce(l, s),
                  l.setAttribute('aria-expanded', 'true'),
                  p(!0))
                : f());
          }),
          s.addEventListener('click', function (e) {
            e.stopPropagation();
          }),
          a.appendChild(l),
          a.appendChild(s),
          r.appendChild(a),
          !c)
        ) {
          var g = document.createElement('button');
          function C() {
            ((g.textContent = v() ? 'Video' : 'Audio'),
              (g.title = v() ? 'Switch to video mode' : 'Switch to audio-only mode'));
          }
          ((g.className = 'wblock-tc-audio-button'),
            (g.type = 'button'),
            (g.style.cssText = o),
            C(),
            g.addEventListener('click', function (e) {
              (e.preventDefault(), e.stopPropagation());
              var t = !v();
              (m(t), k(t), C());
            }),
            r.appendChild(g));
        }
        var w = null;
        function E() {
          ((r.style.opacity = '1'),
            (r.style.pointerEvents = 'auto'),
            null !== w && clearTimeout(w),
            (w = null));
        }
        function x() {
          (null !== w && clearTimeout(w),
            (w = null),
            'block' === s.style.display ||
              ((r.style.opacity = '0'), (r.style.pointerEvents = 'none')));
        }
        function L() {
          (null !== w && clearTimeout(w), (w = setTimeout(x, 2e3)));
        }
        var S = 0;
        function P() {
          '0' === r.style.opacity ? (E(), L()) : (f(), x());
        }
        function A() {
          ((S = Date.now()), P());
        }
        function _() {
          Date.now() - S < 700 || P();
        }
        (t.addEventListener('click', _),
          t.addEventListener('touchend', A, { passive: !0 }),
          r.addEventListener('touchstart', E, { passive: !0 }),
          u(),
          E(),
          L(),
          e.appendChild(r),
          z(function () {
            (null !== w && clearTimeout(w),
              p(!1),
              t.removeEventListener('click', _),
              t.removeEventListener('touchend', A),
              s.parentNode && s.parentNode !== a && s.remove(),
              r.parentNode && r.remove());
          }));
      })(t, r),
      (function (e) {
        if (e && !e._wblockAutoPiPHooked) {
          ((e._wblockAutoPiPHooked = !0),
            document.addEventListener('visibilitychange', o),
            window.addEventListener('focus', a));
          var t = document.getElementById('player-container-id'),
            n = !(!t || !t.classList.contains('sticky-player')),
            i = null,
            r = !1;
          (n ||
            ((i = new IntersectionObserver(
              function (t) {
                q ||
                  (l &&
                    t.forEach(function (t) {
                      t.isIntersecting || e.paused || e.ended
                        ? t.isIntersecting && d(e) && f(e)
                        : p(e);
                    }));
              },
              { threshold: 0.1 }
            )).observe(e),
            (r = !0)),
            e.addEventListener('webkitpresentationmodechanged', v),
            e.addEventListener('webkitbeginfullscreen', s),
            e.addEventListener('webkitendfullscreen', c),
            document.addEventListener('fullscreenchange', c),
            document.addEventListener('webkitfullscreenchange', c),
            e.addEventListener('leavepictureinpicture', m),
            z(function () {
              (document.removeEventListener('visibilitychange', o),
                window.removeEventListener('focus', a));
              try {
                i && i.disconnect();
              } catch (ze) {}
              (e.removeEventListener('webkitpresentationmodechanged', v),
                e.removeEventListener('webkitbeginfullscreen', s),
                e.removeEventListener('webkitendfullscreen', c),
                document.removeEventListener('fullscreenchange', c),
                document.removeEventListener('webkitfullscreenchange', c),
                e.removeEventListener('leavepictureinpicture', m));
            }));
        }
        function o() {
          l && (E ? e.paused || e.ended || p(e) : document.hasFocus() && d(e) && f(e));
        }
        function a() {
          l && (E || (document.hasFocus() && d(e) && f(e)));
        }
        function c() {
          if (i) {
            var t = !ae(T, e);
            t && !r ? (i.observe(e), (r = !0)) : !t && r && s();
          }
        }
        function s() {
          i && r && (i.disconnect(), (r = !1));
        }
        function v() {
          (c(), 'picture-in-picture' !== e.webkitPresentationMode && (u = !1));
        }
        function m() {
          u = !1;
        }
      })(r),
      (function (e, t) {
        if (
          t &&
          !t._wblockMediaSessionHooked &&
          navigator.mediaSession &&
          'undefined' != typeof MediaMetadata
        ) {
          t._wblockMediaSessionHooked = !0;
          var n = navigator.mediaSession,
            i = null,
            r = null;
          (t.addEventListener('play', f),
            t.addEventListener('pause', v),
            t.addEventListener('ended', m),
            t.addEventListener('loadedmetadata', y),
            t.addEventListener('durationchange', y),
            t.addEventListener('loadeddata', y),
            t.addEventListener('ratechange', h),
            t.addEventListener('timeupdate', b),
            document.addEventListener('yt-navigate-finish', g, !0),
            document.addEventListener('yt-page-data-updated', g, !0),
            t.paused || p(),
            z(function () {
              if (
                (t.removeEventListener('play', f),
                t.removeEventListener('pause', v),
                t.removeEventListener('ended', m),
                t.removeEventListener('loadedmetadata', y),
                t.removeEventListener('durationchange', y),
                t.removeEventListener('loadeddata', y),
                t.removeEventListener('ratechange', h),
                t.removeEventListener('timeupdate', b),
                document.removeEventListener('yt-navigate-finish', g, !0),
                document.removeEventListener('yt-page-data-updated', g, !0),
                null !== i && clearTimeout(i),
                null !== r && clearTimeout(r),
                (i = null),
                (r = null),
                delete t._wblockMediaSessionHooked,
                H === t)
              ) {
                if (((H = null), n.metadata === t._wblockMediaMetadata))
                  try {
                    n.metadata = null;
                  } catch (ze) {}
                (t._wblockMediaActions || []).forEach(function (e) {
                  try {
                    'function' == typeof n.setActionHandler && n.setActionHandler(e, null);
                  } catch (ze) {}
                });
                try {
                  n.playbackState = 'none';
                } catch (ze) {}
                ((t._wblockMediaMetadata = null), (t._wblockMediaActions = null));
              }
            }));
        }
        function o(e) {
          var t = document.querySelector('meta[property="' + e + '"],meta[name="' + e + '"]');
          return (t && t.content) || '';
        }
        function a() {
          var e = (function () {
              var e = re();
              try {
                return (e && 'function' == typeof e.getVideoData && e.getVideoData()) || {};
              } catch (ze) {
                return {};
              }
            })(),
            n =
              (window.ytInitialPlayerResponse && window.ytInitialPlayerResponse.videoDetails) || {},
            i = e.title || n.title || o('og:title') || document.title || location.hostname,
            r =
              e.author ||
              e.ownerChannelName ||
              n.author ||
              n.channelTitle ||
              o('og:site_name') ||
              location.hostname,
            a = (e.thumbnail && e.thumbnail.thumbnails) || (n.thumbnail && n.thumbnail.thumbnails),
            c = t.poster || (a && a.length && a[a.length - 1].url) || o('og:image'),
            l = { title: String(i), artist: String(r) };
          return (c && (l.artwork = [{ src: String(c) }]), l);
        }
        function c() {
          if (H === t) {
            var e,
              i = a();
            try {
              e = new MediaMetadata(i);
            } catch (ze) {
              delete i.artwork;
              try {
                e = new MediaMetadata(i);
              } catch (r) {
                return;
              }
            }
            if (H === t) {
              t._wblockMediaMetadata = e;
              try {
                n.metadata = e;
              } catch (ze) {}
            }
          }
        }
        function l() {
          null === r &&
            (r = setTimeout(function () {
              ((r = null), c());
            }, 50));
        }
        function u() {
          if (H === t)
            try {
              n.playbackState = t.ended ? 'none' : t.paused ? 'paused' : 'playing';
            } catch (ze) {}
        }
        function s() {
          H === t &&
            'function' == typeof n.setPositionState &&
            null === i &&
            (i = setTimeout(function () {
              if (((i = null), H === t)) {
                var e = Number(t.duration),
                  r = Number(t.currentTime),
                  o = Number(t.playbackRate) || 1;
                if (!(!isFinite(e) || e <= 0 || !isFinite(r) || r < 0 || !isFinite(o) || o <= 0))
                  try {
                    n.setPositionState({ duration: e, playbackRate: o, position: Math.min(r, e) });
                  } catch (ze) {}
              }
            }, 750));
        }
        function d(e) {
          var n = Number(e);
          (isFinite(n) && 0 !== n) || (n = 10);
          try {
            t.currentTime = Math.max(0, Math.min(t.duration || 1 / 0, t.currentTime + n));
          } catch (ze) {}
        }
        function p() {
          if (
            (H !== t &&
              ((function (e) {
                if (e && H === e) {
                  if (
                    ((e._wblockMediaActions || []).forEach(function (e) {
                      try {
                        'function' == typeof n.setActionHandler && n.setActionHandler(e, null);
                      } catch (ze) {}
                    }),
                    n.metadata === e._wblockMediaMetadata)
                  )
                    try {
                      n.metadata = null;
                    } catch (ze) {}
                  ((e._wblockMediaActions = null), (e._wblockMediaMetadata = null));
                }
              })(H),
              (H = t)),
            c(),
            u(),
            s(),
            'function' == typeof n.setActionHandler)
          ) {
            var e = {
              play: function () {
                var e = t.play();
                e && e.catch && e.catch(function () {});
              },
              pause: function () {
                try {
                  t.pause();
                } catch (ze) {}
              },
              seekbackward: function (e) {
                d(-((e && e.seekOffset) || 10));
              },
              seekforward: function (e) {
                d((e && e.seekOffset) || 10);
              },
              seekto: function (e) {
                if (e && isFinite(e.seekTime))
                  try {
                    e.fastSeek && 'function' == typeof t.fastSeek
                      ? t.fastSeek(e.seekTime)
                      : (t.currentTime = e.seekTime);
                  } catch (ze) {}
              },
              stop: function () {
                try {
                  (t.pause(), (t.currentTime = 0));
                } catch (ze) {}
              },
            };
            for (var i in ((t._wblockMediaActions = Object.keys(e)), e))
              try {
                n.setActionHandler(i, e[i]);
              } catch (ze) {}
          }
        }
        function f() {
          p();
        }
        function v() {
          (u(), s());
        }
        function m() {
          (u(), s());
        }
        function y() {
          (l(), s());
        }
        function h() {
          (l(), s());
        }
        function b() {
          s();
        }
        function g() {
          l();
        }
      })(0, r),
      (function (e, t) {
        if (e && t && window.fetch && window.Blob && URL.createObjectURL) {
          var n = !1,
            i = 'undefined' != typeof AbortController ? new AbortController() : null,
            r = null,
            o = 0,
            a = !1,
            c = [],
            l = [],
            u = [0, 250, 750, 1500, 3e3];
          (t.textTracks &&
            'function' == typeof t.textTracks.addEventListener &&
            t.textTracks.addEventListener('change', d),
            t.addEventListener('webkitbeginfullscreen', m),
            t.addEventListener('webkitendfullscreen', m),
            document.addEventListener('fullscreenchange', m),
            document.addEventListener('webkitfullscreenchange', m),
            v(),
            z(function () {
              ((n = !0),
                p(),
                t.textTracks &&
                  'function' == typeof t.textTracks.removeEventListener &&
                  t.textTracks.removeEventListener('change', d),
                t.removeEventListener('webkitbeginfullscreen', m),
                t.removeEventListener('webkitendfullscreen', m),
                document.removeEventListener('fullscreenchange', m),
                document.removeEventListener('webkitfullscreenchange', m),
                i && i.abort());
              for (var e = 0; e < c.length; e++) c[e].parentNode && c[e].remove();
              for (var r = 0; r < l.length; r++)
                try {
                  URL.revokeObjectURL(l[r]);
                } catch (ze) {}
            }));
        }
        function s() {
          if (
            (function () {
              try {
                return 'function' == typeof e.isSubtitlesOn && e.isSubtitlesOn();
              } catch (ze) {
                return !1;
              }
            })()
          )
            try {
              var t = e.querySelector('.ytp-subtitles-button');
              t && 'function' == typeof t.click && t.click();
            } catch (ze) {}
        }
        function d() {
          s();
        }
        function p() {
          (null !== r && clearTimeout(r), (r = null));
        }
        function f(r) {
          var o = i ? i.signal : void 0,
            a = (function (e) {
              var t = D(e);
              if (t) return t;
              try {
                var n = e && 'function' == typeof e.getVideoData ? e.getVideoData() : null;
                if (n && n.video_id) return String(n.video_id);
              } catch (ze) {}
              return null;
            })(e),
            u = Y(r),
            d =
              !u.length ||
              (function (e) {
                for (var t = 0; t < e.length; t++)
                  try {
                    var n = new URL(e[t].baseUrl, location.href);
                    if ('xpe' === n.searchParams.get('exp') && !n.searchParams.get('pot'))
                      return !0;
                  } catch (ze) {}
                return !1;
              })(u);
          (d ? ne(a, o) : Promise.resolve(u))
            .then(function (e) {
              if (n) return [];
              var t = Y((e || []).concat(u));
              return ie(a, t, o);
            })
            .then(function (e) {
              return n || e.length || d
                ? e
                : ne(a, o).then(function (e) {
                    return ie(a, Y(e), o);
                  });
            })
            .then(function (e) {
              !n &&
                e &&
                (function (e) {
                  if (!n && e.length) {
                    for (var i = {}, r = 0; r < e.length; r++) {
                      var o = e[r].definition,
                        a = o.languageCode || '',
                        u = U(o.name) || a || 'CC',
                        d = o.vssId || a + '|' + u;
                      if (!i[d]) {
                        i[d] = !0;
                        try {
                          var p = URL.createObjectURL(new Blob([e[r].vtt], { type: 'text/vtt' })),
                            f = document.createElement('track');
                          ((f.kind = 'subtitles'),
                            (f.label = u),
                            (f.srclang = a),
                            (f.src = p),
                            (f.default = !1),
                            f.setAttribute('data-wblock-native-subtitle', d),
                            t.appendChild(f),
                            c.push(f),
                            l.push(p));
                        } catch (ze) {}
                      }
                    }
                    s();
                  }
                })(e);
            })
            .catch(function () {});
        }
        function v() {
          if (!a && !n) {
            var t = (function (e) {
              var t = D(e) || '';
              if (W && W.identity === t && W.expires > Date.now()) return W.tracks;
              var n = null;
              try {
                e && 'function' == typeof e.getPlayerResponse && (n = e.getPlayerResponse());
              } catch (ze) {}
              var i = $(n, t) ? Q(n) : [],
                r = window.ytInitialPlayerResponse;
              return (
                !i.length && $(r, t) && (i = Q(r)),
                i.length && (W = { identity: t, tracks: i, expires: Date.now() + 6e4 }),
                i
              );
            })(e);
            if (t.length) return ((a = !0), p(), void f(t));
            o < u.length &&
              (p(),
              (r = setTimeout(function () {
                ((r = null), o++, v());
              }, u[o])));
          }
        }
        function m() {
          (s(), v());
        }
      })(t, r),
      (function (t, n) {
        function i() {
          ce(ae(t, n));
        }
        function r() {
          ce(!0);
        }
        function o() {
          ce(!1);
        }
        (n.addEventListener('webkitbeginfullscreen', r),
          n.addEventListener('webkitendfullscreen', o),
          n.addEventListener('webkitpresentationmodechanged', i),
          document.addEventListener('fullscreenchange', i),
          document.addEventListener('webkitfullscreenchange', i),
          i(),
          z(function () {
            (n.removeEventListener('webkitbeginfullscreen', r),
              n.removeEventListener('webkitendfullscreen', o),
              n.removeEventListener('webkitpresentationmodechanged', i),
              document.removeEventListener('fullscreenchange', i),
              document.removeEventListener('webkitfullscreenchange', i),
              q && ((q = !1), e() && Fe()));
          }));
      })(t, r));
  }
  var H = null;
  function j(e) {
    if (e)
      try {
        (e.controls || (e.controls = !0),
          e.hasAttribute('controls') || e.setAttribute('controls', ''),
          (function (e) {
            if (e)
              try {
                (e.playsInline || (e.playsInline = !0),
                  e.hasAttribute('playsinline') || e.setAttribute('playsinline', ''),
                  e.hasAttribute('webkit-playsinline') || e.setAttribute('webkit-playsinline', ''));
              } catch (ze) {}
          })(e),
          e.hasAttribute('controlslist') && e.removeAttribute('controlslist'),
          e.hasAttribute('disablepictureinpicture') && e.removeAttribute('disablepictureinpicture'),
          e.disablePictureInPicture && (e.disablePictureInPicture = !1));
        var t = (function (e) {
          try {
            return !(
              !e ||
              (0 !== (e.currentSrc || '').indexOf('blob:') && 0 !== (e.src || '').indexOf('blob:'))
            );
          } catch (ze) {
            return !1;
          }
        })(e);
        c ||
          (t
            ? 'allow' === e.getAttribute('x-webkit-airplay') &&
              e.removeAttribute('x-webkit-airplay')
            : (e.hasAttribute('disableremoteplayback') &&
                e.removeAttribute('disableremoteplayback'),
              e.disableRemotePlayback && (e.disableRemotePlayback = !1),
              'allow' !== e.getAttribute('x-webkit-airplay') &&
                e.setAttribute('x-webkit-airplay', 'allow')));
      } catch (ze) {}
  }
  function U(e) {
    if (!e) return '';
    if (e.simpleText) return e.simpleText;
    if (e.runs && e.runs.length) {
      for (var t = '', n = 0; n < e.runs.length; n++) t += e.runs[n].text || '';
      return t;
    }
    return '';
  }
  function Q(e) {
    try {
      var t = e && e.captions && e.captions.playerCaptionsTracklistRenderer;
      return t && Array.isArray(t.captionTracks) ? t.captionTracks.slice(0, 24) : [];
    } catch (ze) {
      return [];
    }
  }
  var W = null;
  function $(e, t) {
    if (!t) return !0;
    try {
      var n = e && e.videoDetails && e.videoDetails.videoId;
      return !n || String(n) === t;
    } catch (ze) {
      return !1;
    }
  }
  function X(e) {
    try {
      if (window.ytcfg && 'function' == typeof window.ytcfg.get) {
        var t = window.ytcfg.get(e);
        if (null != t) return t;
      }
      if (window.ytcfg && window.ytcfg.data_ && void 0 !== window.ytcfg.data_[e])
        return window.ytcfg.data_[e];
    } catch (ze) {}
    return null;
  }
  function G(e) {
    return String(e || '')
      .replace(/_/g, '-')
      .toLowerCase();
  }
  function J(e) {
    return !(!e || ('asr' !== e.kind && !/^a\./.test(String(e.vssId || ''))));
  }
  function Y(e) {
    var t = (function () {
      var e = '';
      try {
        e =
          navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
      } catch (ze) {}
      return (e || (e = document.documentElement && document.documentElement.lang), G(e));
    })();
    if (!t || !e || !e.length) return [];
    for (var n = t.split('-')[0], i = null, r = null, o = 0; o < e.length; o++) {
      var a = e[o],
        c = G(a && a.languageCode),
        l = c === t ? 2 : c.split('-')[0] === n ? 1 : 0;
      if (l) {
        var u = J(a) ? r : i;
        (!u || l > u.score) && ((u = { track: a, score: l }), J(a) ? (r = u) : (i = u));
      }
    }
    var s = [];
    return (i && s.push(i.track), r && s.push(r.track), s);
  }
  var Z = {},
    K = [],
    ee = 0;
  function te(e, t, n) {
    var i = 2 * t.length,
      r = K.indexOf(e);
    if ((-1 !== r && ((ee -= Z[e].size), K.splice(r, 1)), i > 1572864)) delete Z[e];
    else
      for (
        Z[e] = { vtt: t, storedAt: n, size: i }, ee += i, K.push(e);
        K.length > 2 || ee > 1572864;
      ) {
        var o = K.shift();
        ((ee -= Z[o].size), delete Z[o]);
      }
  }
  function ne(e, t) {
    var n = X('INNERTUBE_API_KEY');
    if (!n || !e) return Promise.resolve([]);
    var i = X('VISITOR_DATA');
    if (!i) {
      var r = X('INNERTUBE_CONTEXT');
      i = r && r.client && r.client.visitorData;
    }
    var o = {
      clientName: 'ANDROID_VR',
      clientVersion: '1.65.10',
      deviceMake: 'Oculus',
      deviceModel: 'Quest 3',
      androidSdkVersion: 32,
      osName: 'Android',
      osVersion: '12L',
      userAgent: 'com.google.android.apps.youtube.vr.oculus/1.65.10 (Linux; U; Android 12L) gzip',
    };
    i && (o.visitorData = i);
    var a = {
      'Content-Type': 'application/json',
      'X-YouTube-Client-Name': '28',
      'X-YouTube-Client-Version': o.clientVersion,
    };
    return (
      i && (a['X-Goog-Visitor-Id'] = i),
      fetch('/youtubei/v1/player?key=' + encodeURIComponent(n) + '&prettyPrint=false', {
        method: 'POST',
        credentials: 'same-origin',
        signal: t,
        headers: a,
        body: JSON.stringify({
          context: { client: o },
          videoId: e,
          contentCheckOk: !0,
          racyCheckOk: !0,
        }),
      })
        .then(function (e) {
          return e.ok ? e.json() : null;
        })
        .then(Q)
        .catch(function () {
          return [];
        })
    );
  }
  function ie(e, t, n) {
    return Promise.all(
      t.map(function (t) {
        var i = (function (e) {
          if (!e || !e.baseUrl) return null;
          try {
            var t = new URL(e.baseUrl, location.href);
            return (t.searchParams.set('fmt', 'vtt'), t.href);
          } catch (ze) {
            return null;
          }
        })(t);
        if (!i) return Promise.resolve(null);
        var r = e
          ? (function (e, t) {
              var n = G(t && t.languageCode) || 'und',
                i = J(t) ? 'auto' : 'official',
                r = String((t && t.vssId) || n + '-' + i);
              return (
                location.origin +
                '/__wblock_tc_caption_cache__/' +
                encodeURIComponent(e) +
                '/' +
                encodeURIComponent(n + '-' + i + '-' + r)
              );
            })(e, t)
          : null;
        return (
          r
            ? (function (e) {
                var t = Date.now(),
                  n = Z[e];
                return n && t - n.storedAt < a
                  ? Promise.resolve(n.vtt)
                  : window.caches
                    ? window.caches
                        .open(o)
                        .then(function (n) {
                          return n.match(e).then(function (i) {
                            if (!i) return null;
                            var r = Number(i.headers.get('x-wblock-stored-at')) || 0;
                            return !r || t - r >= a
                              ? (n.delete(e).catch(function () {}), null)
                              : i.text().then(function (t) {
                                  return t && -1 !== t.indexOf('--\x3e') ? (te(e, t, r), t) : null;
                                });
                          });
                        })
                        .catch(function () {
                          return null;
                        })
                    : Promise.resolve(null);
              })(r)
            : Promise.resolve(null)
        )
          .then(function (e) {
            return e
              ? { definition: t, vtt: e }
              : n && n.aborted
                ? null
                : fetch(i, { credentials: 'same-origin', signal: n })
                    .then(function (e) {
                      return e.ok ? e.text() : '';
                    })
                    .then(function (e) {
                      return 'WEBVTT' !==
                        (e = String(e || '').replace(/^\uFEFF/, '')).slice(0, 6) ||
                        -1 === e.indexOf('--\x3e') ||
                        e.length > 5e6 ||
                        -1 ===
                          (e = (function (e) {
                            for (
                              var t = String(e || '')
                                  .replace(/^\uFEFF/, '')
                                  .replace(/\r\n?/g, '\n')
                                  .split(/\n{2,}/),
                                n = ['WEBVTT'],
                                i = 0;
                              i < t.length;
                              i++
                            ) {
                              for (var r = t[i].split('\n'), o = -1, a = 0; a < r.length; a++)
                                if (-1 !== r[a].indexOf('--\x3e')) {
                                  o = a;
                                  break;
                                }
                              if (-1 !== o) {
                                var c = r[o].match(/^\s*([0-9:.]+)\s+-->\s+([0-9:.]+)/);
                                if (c) {
                                  for (
                                    var l = r.slice(o + 1).map(function (e) {
                                      return e
                                        .replace(/<(?:\d{2}:)?\d{2}:\d{2}\.\d{3}>/g, '')
                                        .replace(/<\/?c(?:\.[^>]*)?>/g, '')
                                        .replace(/<\/?v(?:\s+[^>]*)?>/g, '')
                                        .replace(/<\/?lang(?:\s+[^>]*)?>/g, '');
                                    });
                                    l.length && !l[l.length - 1].trim();
                                  )
                                    l.pop();
                                  l.length &&
                                    n.push(
                                      c[1] +
                                        ' --\x3e ' +
                                        c[2] +
                                        ' position:50% align:center\n' +
                                        l.join('\n')
                                    );
                                }
                              }
                            }
                            return n.join('\n\n') + '\n';
                          })(e)).indexOf('--\x3e')
                        ? null
                        : (r &&
                            (function (e, t) {
                              var n = Date.now();
                              (te(e, t, n),
                                window.caches &&
                                  void 0 !== window.Response &&
                                  window.caches
                                    .open(o)
                                    .then(function (i) {
                                      return i
                                        .put(
                                          e,
                                          new window.Response(t, {
                                            headers: {
                                              'content-type': 'text/vtt; charset=utf-8',
                                              'x-wblock-stored-at': String(n),
                                              'x-wblock-size': String(2 * t.length),
                                            },
                                          })
                                        )
                                        .then(function () {
                                          return (function (e) {
                                            return e
                                              .keys()
                                              .then(function (t) {
                                                return Promise.all(
                                                  t.map(function (t) {
                                                    return e.match(t).then(function (e) {
                                                      return {
                                                        request: t,
                                                        storedAt:
                                                          (e &&
                                                            Number(
                                                              e.headers.get('x-wblock-stored-at')
                                                            )) ||
                                                          0,
                                                        size:
                                                          (e &&
                                                            Number(
                                                              e.headers.get('x-wblock-size')
                                                            )) ||
                                                          0,
                                                      };
                                                    });
                                                  })
                                                );
                                              })
                                              .then(function (t) {
                                                t.sort(function (e, t) {
                                                  return t.storedAt - e.storedAt;
                                                });
                                                var n = Date.now(),
                                                  i = 0,
                                                  r = 0;
                                                return Promise.all(
                                                  t.map(function (t) {
                                                    return !t.storedAt ||
                                                      n - t.storedAt >= a ||
                                                      i >= 24 ||
                                                      r + t.size > 8388608
                                                      ? e.delete(t.request)
                                                      : (i++, (r += t.size), !1);
                                                  })
                                                );
                                              })
                                              .catch(function () {});
                                          })(i);
                                        });
                                    })
                                    .catch(function () {}));
                            })(r, e),
                          { definition: t, vtt: e });
                    });
          })
          .catch(function () {
            return null;
          });
      })
    ).then(function (e) {
      return e.filter(function (e) {
        return !!e;
      });
    });
  }
  function re() {
    if (T && T.isConnected) {
      var e = T.querySelector && T.querySelector('video');
      if (e && (!C || e === C)) return T;
    }
    var t = [];
    function n(e) {
      if (e) {
        var n =
          e.matches && e.matches('.html5-video-player')
            ? e
            : (e.querySelector && e.querySelector('.html5-video-player')) || e;
        n.querySelector && n.querySelector('video') && -1 === t.indexOf(n) && t.push(n);
      }
    }
    for (
      var i = document.querySelectorAll('#movie_player, .html5-video-player'), r = 0;
      r < i.length;
      r++
    )
      n(i[r]);
    if (!t.length)
      for (
        var o = document.querySelectorAll('ytd-player, ytm-player, #player-container'), a = 0;
        a < o.length;
        a++
      )
        n(o[a]);
    if (!t.length) return null;
    if (1 === t.length) return t[0];
    for (var c = null, l = 0; l < t.length; l++)
      if (
        t[l].classList.contains('playing-mode') &&
        'true' !== t[l].getAttribute('aria-hidden') &&
        !t[l].hidden
      ) {
        if (c) {
          c = null;
          break;
        }
        c = t[l];
      }
    if (c) return c;
    for (var u = t[0], s = -1 / 0, d = 0; d < t.length; d++) {
      var p = t[d],
        f = p.querySelector('video'),
        v = 0;
      try {
        (('true' === p.getAttribute('aria-hidden') || p.hidden) && (v -= 200),
          p.classList.contains('playing-mode') && (v += 80),
          (f.currentSrc || f.src) && (v += 30),
          f.readyState > 0 && (v += 30),
          f.paused || f.ended || (v += 100));
        var m = p.getBoundingClientRect();
        m.width > 1 &&
          m.height > 1 &&
          m.bottom > 0 &&
          m.right > 0 &&
          m.top < window.innerHeight &&
          m.left < window.innerWidth &&
          (v += 60);
        var y = getComputedStyle(p);
        ('none' !== y.display && 'hidden' !== y.visibility) || (v -= 200);
      } catch (ze) {}
      v > s && ((u = p), (s = v));
    }
    return u;
  }
  function oe(e) {
    if (M) {
      try {
        M.disconnect();
      } catch (ze) {}
      M = null;
    }
    e &&
      !q &&
      'undefined' != typeof MutationObserver &&
      (M = new MutationObserver(function (t) {
        if (!q) {
          for (var n = !1, i = 0; i < t.length && !n; i++)
            for (var r = 0; r < t[i].addedNodes.length; r++) {
              var o = t[i].addedNodes[r];
              if (
                1 === o.nodeType &&
                ('VIDEO' === o.tagName || (o.querySelector && o.querySelector('video')))
              ) {
                n = !0;
                break;
              }
            }
          if (n) {
            var a = e.querySelector('video');
            a && a !== C && V(e, a);
          }
        }
      })).observe(e.querySelector('.html5-video-container') || e, { childList: !0, subtree: !0 });
  }
  function ae(e, t) {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      (e && e.classList.contains('ytp-fullscreen')) ||
      (t && (!0 === t.webkitDisplayingFullscreen || 'fullscreen' === t.webkitPresentationMode))
    );
  }
  function ce(t) {
    if (q !== (t = !!t))
      if (((q = t), t)) {
        if (M) {
          try {
            M.disconnect();
          } catch (ze) {}
          M = null;
        }
        Ne();
      } else e() && (Fe(), oe(T));
  }
  function le() {
    if (e()) {
      var t = re();
      if (t) {
        var n = t.querySelector('video');
        if (n) {
          var i = D(t) || '';
          if (t.getAttribute(r) !== i || C !== n) {
            (t.setAttribute(r, i),
              t.classList.add('wblock-tc-native'),
              V(t, n),
              c ? (v() && m(!1), k(!1)) : k(v()),
              _());
            var o = setTimeout(function () {
              ((o = null),
                (function () {
                  var e = y();
                  if (!xe) {
                    var t = { attempts: 0, timer: null, waiting: !1 };
                    ((xe = t), (t.stop = n), r(), z(n));
                  }
                  function n() {
                    (null !== t.timer && clearTimeout(t.timer),
                      (t.timer = null),
                      xe === t && (xe = null));
                  }
                  function i() {
                    null === t.timer &&
                      xe === t &&
                      (t.timer = setTimeout(function () {
                        ((t.timer = null), r());
                      }, 500));
                  }
                  function r() {
                    if (t.waiting || Ee) i();
                    else {
                      t.attempts++;
                      var r = re(),
                        o = N(),
                        a = R(r);
                      if (o && a && o !== a) t.attempts > 12 ? n() : i();
                      else {
                        var c = ve();
                        'auto' === e || c.length
                          ? t.attempts > 12
                            ? n()
                            : ((t.waiting = !0),
                              _e(e, function (e) {
                                ((t.waiting = !1), e || t.attempts > 12 ? n() : i());
                              }))
                          : t.attempts > 12
                            ? n()
                            : i();
                      }
                    }
                  }
                })());
            }, 500);
            (z(function () {
              null !== o && (clearTimeout(o), (o = null));
            }),
              oe(t));
          }
        }
      }
    }
  }
  var ue = {
      auto: 'Auto',
      highres: '4320p',
      hd2880: '2880p',
      hd2160: '2160p',
      hd1440: '1440p',
      hd1080: '1080p',
      hd720: '720p',
      large: '480p',
      medium: '360p',
      small: '240p',
      tiny: '144p',
    },
    se = [
      'highres',
      'hd2880',
      'hd2160',
      'hd1440',
      'hd1080',
      'hd720',
      'large',
      'medium',
      'small',
      'tiny',
    ],
    de = null;
  function pe() {
    de = null;
  }
  function fe() {
    var e = re();
    if (!e) return [];
    var t = Date.now(),
      n = D(e) || '';
    if (de && de.player === e && de.identity === n && de.expires > t) return de.options;
    var i = [],
      r = [];
    try {
      'function' == typeof e.getAvailableQualityData && (i = e.getAvailableQualityData() || []);
    } catch (ze) {
      i = [];
    }
    try {
      'function' == typeof e.getAvailableQualityLevels && (r = e.getAvailableQualityLevels() || []);
    } catch (ze) {
      r = [];
    }
    for (var o = {}, a = [], c = 0; c < i.length; c++) {
      var l = i[c] || {},
        u = l.quality || l.qualityId || l.id;
      if (u && 'auto' !== u && !1 !== l.isPlayable) {
        ((u = String(u)), -1 === a.indexOf(u) && a.push(u));
        var s = l.qualityLabel || l.label || l.qualityDisplayName;
        s && (o[u] = String(s));
      }
    }
    r.length || (r = a);
    for (var d = {}, p = [], f = 0; f < r.length; f++) {
      var v = String(r[f] || '');
      v && 'auto' !== v && !d[v] && ((d[v] = !0), p.push({ id: v, label: o[v] || ue[v] || v }));
    }
    return ((de = { player: e, identity: n, options: p, expires: t + (p.length ? 750 : 150) }), p);
  }
  function ve() {
    return fe()
      .map(function (e) {
        return e.id;
      })
      .sort(function (e, t) {
        var n = se.indexOf(e),
          i = se.indexOf(t);
        return (-1 === n && (n = se.length), -1 === i && (i = se.length), n - i);
      });
  }
  function me(e) {
    if ('auto' === e) return 'Auto';
    for (var t = fe(), n = 0; n < t.length; n++) if (t[n].id === e) return t[n].label;
    return ue[e] || 'Auto';
  }
  function ye() {
    var e,
      t = re();
    if (!t || !t.getPlaybackQuality) return 'auto';
    try {
      e = String(t.getPlaybackQuality() || '');
    } catch (ze) {
      return 'auto';
    }
    return 'auto' === e || -1 !== se.indexOf(e) || -1 !== ve().indexOf(e) ? e : 'auto';
  }
  function he(e) {
    var t =
      e.querySelector('.ytp-settings-button') ||
      e.querySelector('[aria-label="Settings"]') ||
      e.querySelector('.ytp-button[aria-label*="Settings"]');
    return (
      !!t &&
      ('true' === t.getAttribute('aria-expanded') ||
        e.classList.contains('ytp-settings-menu-open') ||
        t.click(),
      !0)
    );
  }
  function be(e) {
    for (var t = e.querySelectorAll('.ytp-menuitem'), n = 0; n < t.length; n++) {
      var i = t[n],
        r = i.querySelector('.ytp-menuitem-content');
      if (r && r.textContent && r.textContent.match(/\d{3,}/)) return (i.click(), !0);
    }
    for (var o = 0; o < t.length; o++) {
      var a = t[o].querySelector('.ytp-menuitem-label');
      if (a && a.textContent && -1 !== a.textContent.toLowerCase().indexOf('quality'))
        return (t[o].click(), !0);
    }
    return !1;
  }
  function ge(e, t) {
    for (
      var n = ue[t] || t,
        i = e.querySelectorAll(
          '.ytp-quality-menu .ytp-menuitem, .ytp-drop-down-menu-button, [role="menuitemradio"], .ytp-panel-menu .ytp-menuitem'
        ),
        r = [],
        o = 0;
      o < i.length;
      o++
    )
      r.push(i[o]);
    for (var a = null, c = -1, l = 0; l < r.length; l++) {
      var u = (r[l].textContent || '').toLowerCase(),
        s = 0;
      (-1 !== u.indexOf(String(n).toLowerCase())
        ? (s = 2)
        : -1 !== u.indexOf(String(t).toLowerCase()) && (s = 1),
        s > c && ((c = s), (a = r[l])));
    }
    return !!(a && c > 0) && (a.click(), !0);
  }
  function we(e) {
    var t = e.querySelector('.ytp-settings-button');
    return !(
      !t ||
      ('true' !== t.getAttribute('aria-expanded') &&
        !e.classList.contains('ytp-settings-menu-open')) ||
      (t.click(), 0)
    );
  }
  var ke = 0,
    Ee = null,
    xe = null,
    Le = null;
  function Se() {
    var e = Ee;
    if (e) {
      ((e.cancelled = !0), ke++);
      for (var t = 0; t < e.timers.length; t++) clearTimeout(e.timers[t]);
      ((e.timers = []), we(e.player), (Ee = null));
      for (var n = 0; n < e.callbacks.length; n++) e.callbacks[n](!1);
    }
  }
  function Pe(e, t) {
    if (Ee === e && !e.cancelled && e.generation === ke) {
      for (var n = 0; n < e.timers.length; n++) clearTimeout(e.timers[n]);
      ((e.timers = []), (Ee = null));
      for (var i = 0; i < e.callbacks.length; i++) e.callbacks[i](t);
    }
  }
  function Ae(e, t) {
    var n = !1,
      i = ve(),
      r = i.length ? i[0] : 'highres';
    try {
      if ('auto' === t) {
        ('function' == typeof e.setPlaybackQuality && (e.setPlaybackQuality('auto'), (n = !0)),
          'function' == typeof e.setPlaybackQualityRange &&
            (e.setPlaybackQualityRange('tiny', r), (n = !0)));
        try {
          localStorage.removeItem('yt-player-quality');
        } catch (ze) {}
      } else
        ('function' == typeof e.setPlaybackQualityRange &&
          (e.setPlaybackQualityRange(t, t), (n = !0)),
          'function' == typeof e.setPlaybackQuality && (e.setPlaybackQuality(t), (n = !0)));
    } catch (ze) {}
    return n;
  }
  function _e(e, t) {
    var n = re();
    if (!n || !C) return (t && t(!1), !1);
    if (Ee) {
      if (Ee.player === n && Ee.target === e) return (t && Ee.callbacks.push(t), !0);
      Se();
    }
    if ('auto' !== e) {
      var i = ve();
      e = (function (e, t) {
        if ('auto' === e) return 'auto';
        if (!(t = t || ve()).length || -1 !== t.indexOf(e)) return e;
        var n = se.indexOf(e);
        if (-1 === n) return t[0];
        for (var i = n + 1; i < se.length; i++) if (-1 !== t.indexOf(se[i])) return se[i];
        return t[t.length - 1];
      })(e, i);
    }
    var r = {
      player: n,
      video: C,
      target: e,
      generation: ++ke,
      cancelled: !1,
      timers: [],
      callbacks: t ? [t] : [],
    };
    function o() {
      return Ee === r && !r.cancelled && r.generation === ke && C === r.video;
    }
    function a(e, t) {
      r.timers.push(
        setTimeout(function () {
          o() && e();
        }, t)
      );
    }
    function l() {
      if (o()) {
        we(n);
        var t = Ae(n, e);
        if (t && 'auto' !== e && !c)
          try {
            localStorage.setItem(
              'yt-player-quality',
              JSON.stringify({ quality: e, previousQuality: 'auto', expiry: Date.now() + 864e5 })
            );
          } catch (ze) {}
        Pe(r, t);
      }
    }
    Ee = r;
    try {
      if (((Le = e), Ae(n, e)))
        return (
          a(function () {
            (Ae(n, e),
              'auto' === e
                ? o() &&
                  (he(n)
                    ? a(function () {
                        if (!be(n)) return (we(n), void Pe(r, !0));
                        a(function () {
                          (ge(n, 'auto'), we(n), Pe(r, !0));
                        }, 180);
                      }, 180)
                    : Pe(r, !0))
                : Pe(r, !0));
          }, 240),
          !0
        );
      if (!he(n)) return (l(), !0);
      a(function () {
        be(n)
          ? a(function () {
              ge(n, e)
                ? a(function () {
                    (we(n), Pe(r, !0));
                  }, 100)
                : l();
            }, 180)
          : l();
      }, 180);
    } catch (ze) {
      l();
    }
    return !0;
  }
  function Ce(e, t) {
    if (e && t) {
      var n = document.fullscreenElement || document.webkitFullscreenElement,
        i = n && 'VIDEO' !== n.tagName && n.appendChild ? n : document.body;
      if (i) {
        (t.parentNode !== i && i.appendChild(t),
          (t.style.position = 'fixed'),
          (t.style.left = '0'),
          (t.style.top = '0'),
          (t.style.right = 'auto'),
          (t.style.bottom = 'auto'),
          (t.style.maxHeight = 'min(210px, calc(100vh - 16px))'),
          (t.style.maxHeight = 'min(210px, calc(100dvh - 16px))'),
          (t.style.overflowY = 'auto'),
          (t.style.webkitOverflowScrolling = 'touch'),
          (t.style.overscrollBehavior = 'contain'),
          (t.style.zIndex = '2147483647'),
          (t.style.visibility = 'hidden'),
          (t.style.display = 'block'));
        var r = e.getBoundingClientRect(),
          o = t.getBoundingClientRect(),
          a = document.documentElement.clientWidth || window.innerWidth,
          c = document.documentElement.clientHeight || window.innerHeight,
          l = r.top;
        l = Math.max(0, Math.min(l, c - o.height - 0));
        var u = Math.max(0, Math.min(r.left + (r.width - o.width) / 2, a - o.width - 0));
        ((t.style.left = Math.round(u) + 'px'),
          (t.style.top = Math.round(l) + 'px'),
          (t.style.visibility = 'visible'));
      }
    }
  }
  var Te = '',
    Me = 0,
    Oe = [];
  function Ie() {
    var t = location.href !== Te;
    if (((Te = location.href), e())) {
      (q || Fe(), w(), _());
      var n = re(),
        i = n && n.querySelector('video'),
        o = D(n) || '';
      (!t && n && n.getAttribute(r) === o && C === i) || (n && n.removeAttribute(r), le());
    } else
      !(function () {
        if ((Ne(), M)) {
          try {
            M.disconnect();
          } catch (ze) {}
          M = null;
        }
        B();
        for (
          var e = document.querySelectorAll('.wblock-tc-native,[' + r + ']'), t = 0;
          t < e.length;
          t++
        ) {
          (e[t].classList.remove('wblock-tc-native'), e[t].removeAttribute(r));
          var n = e[t].querySelector && e[t].querySelector('video');
          if (n)
            try {
              ((n.controls = !1), n.removeAttribute('controls'));
            } catch (ze) {}
        }
        var i = document.getElementById(h);
        i && i.remove();
        var o = document.getElementById(h + '-audio');
        (o && o.remove(),
          (function () {
            if (x) {
              try {
                delete document.hidden;
              } catch (ze) {}
              try {
                delete document.visibilityState;
              } catch (ze) {}
              ((x = !1), A());
            }
          })());
      })();
  }
  function qe() {
    !(function () {
      for (var e = 0; e < Oe.length; e++) clearTimeout(Oe[e]);
      Oe = [];
    })();
    var t = ++Me;
    e()
      ? (Ie(),
        [120, 500].forEach(function (n) {
          Oe.push(
            setTimeout(function () {
              t === Me && e() && Ie();
            }, n)
          );
        }))
      : Ie();
  }
  var Re = null;
  function Ne() {
    if (Re) {
      try {
        Re.disconnect();
      } catch (ze) {}
      Re = null;
    }
  }
  function De(e) {
    if (!e || 1 !== e.nodeType) return !1;
    try {
      return !(
        'VIDEO' !== e.tagName &&
        'movie_player' !== e.id &&
        'player-container' !== e.id &&
        !e.matches('.html5-video-player, ytd-player') &&
        !e.querySelector('video, #movie_player, .html5-video-player, ytd-player, #player-container')
      );
    } catch (ze) {
      return !1;
    }
  }
  function Fe() {
    if (!Re && 'undefined' != typeof MutationObserver) {
      Re = new MutationObserver(function (t) {
        if (e() && !q && !(T && C && T.isConnected && C.isConnected && T.contains(C))) {
          for (var n = !1, i = 0; i < t.length && !n; i++)
            for (var r = t[i], o = 0; o < r.addedNodes.length; o++)
              if (De(r.addedNodes[o])) {
                n = !0;
                break;
              }
          n && (w(), le());
        }
      });
      try {
        Re.observe(document, { childList: !0, subtree: !0 });
      } catch (ze) {}
    }
  }
  ((Te = location.href),
    (function () {
      (document.addEventListener('yt-navigate-start', qe, !0),
        document.addEventListener('yt-navigate-finish', qe, !0));
      try {
        document.addEventListener('yt-page-data-updated', qe, !0);
      } catch (ze) {}
      window.addEventListener('popstate', qe, !0);
    })(),
    e() &&
      (Fe(),
      w(),
      _(),
      le(),
      'loading' === document.readyState &&
        (document.addEventListener('DOMContentLoaded', le, { once: !0 }),
        window.addEventListener('load', le, { once: !0 }))));
})();
