// ==UserScript==
// @name         Pokeidle - correção do login (Turnstile)
// @match        https://pokeidle.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  let real = null;
  // Se a Cloudflare carregar antes do jogo, este "segura" o aviso
  // e repassa para o jogo assim que ele estiver pronto.
  const stub = function () {
    const t = setInterval(function () {
      const fn = window.onTurnstilePronto;
      if (typeof fn === 'function' && fn !== stub) {
        clearInterval(t);
        fn();
      }
    }, 100);
  };
  Object.defineProperty(window, 'onTurnstilePronto', {
    configurable: true,
    get() { return real || stub; },
    set(fn) { real = fn; }
  });
})();
