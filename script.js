/* =========================================================
   Aldacir — interactions
   ========================================================= */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    setYear();
    initLanguage();
    initNav();
    initReveal();
    initScrollSpy();
    initForm();
    initHeroScene();
  });

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Bilingual EN / PT ---------- */
  function initLanguage() {
    var STORE = "aldacir-lang";
    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    var browser = (navigator.language || "en").toLowerCase().indexOf("pt") === 0 ? "pt" : "en";
    var lang = saved === "pt" || saved === "en" ? saved : browser;

    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-set-lang]"));

    function apply(next) {
      lang = next;
      document.documentElement.lang = next === "pt" ? "pt-BR" : "en";

      document.querySelectorAll("[data-lang-en]").forEach(function (el) {
        var val = el.getAttribute("data-lang-" + next);
        if (val !== null) el.textContent = val;
      });
      document.querySelectorAll("[data-lang-en-ph]").forEach(function (el) {
        var val = el.getAttribute("data-lang-" + next + "-ph");
        if (val !== null) el.setAttribute("placeholder", val);
      });
      document.querySelectorAll("[data-lang-en-aria]").forEach(function (el) {
        var val = el.getAttribute("data-lang-" + next + "-aria");
        if (val !== null) el.setAttribute("aria-label", val);
      });

      buttons.forEach(function (b) {
        var on = b.getAttribute("data-set-lang") === next;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });

      try { localStorage.setItem(STORE, next); } catch (e) {}
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.getAttribute("data-set-lang"));
      });
    });

    apply(lang);
  }

  /* ---------- Navigation: scroll state + mobile menu ---------- */
  function initNav() {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");

    var onScroll = function () {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && menu) {
      var close = function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      };
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", close);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") close();
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Active nav link ---------- */
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      var id = a.getAttribute("href").replace("#", "");
      if (id) links[id] = a;
    });
    var sections = document.querySelectorAll("main section[id]");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = links[entry.target.id];
        if (a && entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("is-active"); });
          a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Contact form (Netlify, progressive enhancement) ---------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");
    if (!form) return;

    var copy = {
      sending: { en: "Sending…", pt: "Enviando…" },
      ok: { en: "Thanks — I'll get back to you soon.", pt: "Obrigado — retornarei em breve." },
      err: { en: "Something went wrong. Please email or WhatsApp instead.", pt: "Algo deu errado. Tente por e-mail ou WhatsApp." }
    };
    var lang = function () { return document.documentElement.lang.indexOf("pt") === 0 ? "pt" : "en"; };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) { status.className = "form-status"; status.textContent = copy.sending[lang()]; }

      var data = new FormData(form);
      var body = new URLSearchParams(data).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      }).then(function (res) {
        if (!res.ok) throw new Error("bad status");
        form.reset();
        if (status) { status.className = "form-status is-ok"; status.textContent = copy.ok[lang()]; }
      }).catch(function () {
        if (status) { status.className = "form-status is-error"; status.textContent = copy.err[lang()]; }
      });
    });
  }

  /* ---------- Hero scene: Everglades twilight + perched owl ---------- */
  function initHeroScene() {
    var canvas = document.getElementById("hero-canvas");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");

    var w = 0, h = 0, dpr = 1, horizon = 0;
    var stars = [], fireflies = [], treeline = [], reeds = [], shimmer = [];
    var owl = {};

    function rand(a, b) { return a + Math.random() * (b - a); }

    function build() {
      // Stars in the upper sky
      stars = [];
      var nStars = Math.round(w / 14);
      for (var i = 0; i < nStars; i++) {
        stars.push({
          x: rand(0, w),
          y: rand(0, horizon * 0.85),
          r: rand(0.3, 1.3),
          a: rand(0.2, 0.9),
          tw: rand(0, Math.PI * 2),
          sp: rand(0.6, 1.8)
        });
      }
      // Fireflies low over the water/reeds
      fireflies = [];
      var nF = Math.round(w / 90);
      for (var j = 0; j < nF; j++) {
        fireflies.push({
          x: rand(0, w),
          y: rand(horizon - 40, h - 20),
          r: rand(0.8, 2),
          ph: rand(0, Math.PI * 2),
          sp: rand(0.4, 1.1),
          drift: rand(6, 22)
        });
      }
      // Distant treeline silhouette as sampled heights
      treeline = [];
      var step = 26, prev = horizon - rand(20, 60);
      for (var x = -step; x <= w + step; x += step) {
        prev += rand(-26, 26);
        var top = Math.max(horizon - 130, Math.min(horizon - 6, prev));
        treeline.push({ x: x, y: top });
      }
      // Foreground reeds
      reeds = [];
      var nR = Math.round(w / 22);
      for (var k = 0; k < nR; k++) {
        reeds.push({
          x: rand(0, w),
          hgt: rand(h * 0.12, h * 0.34),
          lean: rand(-0.18, 0.18),
          ph: rand(0, Math.PI * 2),
          wgt: rand(1.2, 3.2)
        });
      }
      // Water shimmer lines
      shimmer = [];
      for (var s = 0; s < 7; s++) {
        shimmer.push({ y: horizon + (h - horizon) * rand(0.12, 0.92), ph: rand(0, Math.PI * 2), len: rand(0.3, 0.7) });
      }
      // Owl, perched right of centre on a branch near the horizon
      var oScale = Math.max(0.7, Math.min(1.4, w / 1100));
      owl = {
        x: w * (w < 720 ? 0.72 : 0.78),
        y: horizon - 6,
        s: oScale * (w < 720 ? 0.8 : 1)
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      horizon = h * 0.66;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    var sunX;
    function drawSky() {
      sunX = w * 0.72;
      var sky = ctx.createLinearGradient(0, 0, 0, horizon);
      sky.addColorStop(0, "#141a33");
      sky.addColorStop(0.5, "#272445");
      sky.addColorStop(0.82, "#5b3b3f");
      sky.addColorStop(1, "#9a5e2c");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, horizon + 1);

      // Low sun glow on the horizon
      var glow = ctx.createRadialGradient(sunX, horizon, 4, sunX, horizon, h * 0.6);
      glow.addColorStop(0, "rgba(255, 214, 138, 0.95)");
      glow.addColorStop(0.18, "rgba(233, 162, 60, 0.55)");
      glow.addColorStop(0.5, "rgba(233, 162, 60, 0.12)");
      glow.addColorStop(1, "rgba(233, 162, 60, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, horizon + 60);

      // Sun disc
      ctx.beginPath();
      ctx.arc(sunX, horizon - 2, Math.max(14, w * 0.018), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 226, 170, 0.95)";
      ctx.fill();
    }

    function drawStars(t) {
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var a = s.a * (0.55 + 0.45 * Math.sin(t * s.sp + s.tw));
        // Fade stars near the bright sun
        var d = Math.abs(s.x - sunX) / w;
        a *= Math.min(1, 0.25 + d);
        ctx.globalAlpha = Math.max(0, a);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fdf3df";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function drawTreeline() {
      ctx.beginPath();
      ctx.moveTo(-30, horizon + 2);
      for (var i = 0; i < treeline.length; i++) ctx.lineTo(treeline[i].x, treeline[i].y);
      ctx.lineTo(w + 30, horizon + 2);
      ctx.closePath();
      ctx.fillStyle = "#08160f";
      ctx.fill();
    }

    function drawWater(t) {
      var water = ctx.createLinearGradient(0, horizon, 0, h);
      water.addColorStop(0, "#123028");
      water.addColorStop(0.5, "#0e2620");
      water.addColorStop(1, "#08201c");
      ctx.fillStyle = water;
      ctx.fillRect(0, horizon, w, h - horizon);

      // Reflection of the sun
      var refl = ctx.createLinearGradient(sunX, horizon, sunX, h);
      refl.addColorStop(0, "rgba(233, 162, 60, 0.35)");
      refl.addColorStop(1, "rgba(233, 162, 60, 0)");
      ctx.fillStyle = refl;
      ctx.fillRect(sunX - w * 0.08, horizon, w * 0.16, h - horizon);

      // Shimmer lines
      for (var i = 0; i < shimmer.length; i++) {
        var sh = shimmer[i];
        var wob = Math.sin(t * 0.8 + sh.ph) * 6;
        ctx.globalAlpha = 0.10;
        ctx.strokeStyle = "#cfe0c4";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w * (0.5 - sh.len / 2) + wob, sh.y);
        ctx.lineTo(w * (0.5 + sh.len / 2) + wob, sh.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function drawOwl(t) {
      var s = owl.s, x = owl.x, baseY = owl.y;
      // Branch
      ctx.strokeStyle = "#06120e";
      ctx.lineWidth = 6 * s;
      ctx.beginPath();
      ctx.moveTo(x - 90 * s, baseY + 2);
      ctx.lineTo(x + 70 * s, baseY - 4);
      ctx.stroke();

      ctx.save();
      ctx.translate(x, baseY);
      ctx.scale(s, s);

      ctx.fillStyle = "#05110d";
      // Body
      ctx.beginPath();
      ctx.ellipse(0, -34, 26, 38, 0, 0, Math.PI * 2);
      ctx.fill();
      // Head
      ctx.beginPath();
      ctx.arc(0, -70, 24, 0, Math.PI * 2);
      ctx.fill();
      // Ear tufts
      ctx.beginPath();
      ctx.moveTo(-20, -86); ctx.lineTo(-9, -104); ctx.lineTo(-4, -84); ctx.closePath();
      ctx.moveTo(20, -86); ctx.lineTo(9, -104); ctx.lineTo(4, -84); ctx.closePath();
      ctx.fill();
      // Tail
      ctx.beginPath();
      ctx.moveTo(-10, -4); ctx.lineTo(0, 18); ctx.lineTo(10, -4); ctx.closePath();
      ctx.fill();

      // Rim light from the sun (left/right depending) — subtle amber edge
      ctx.strokeStyle = "rgba(233, 162, 60, 0.4)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0, -70, 24, -Math.PI * 0.15, Math.PI * 0.55);
      ctx.stroke();

      // Eyes (blink)
      var cycle = 4.6;
      var tt = t % cycle;
      var open = 1;
      if (tt > cycle - 0.16) open = Math.abs(Math.cos(((tt - (cycle - 0.16)) / 0.16) * Math.PI));
      drawEye(-9, -70, open);
      drawEye(9, -70, open);

      // Beak
      ctx.fillStyle = "#0a0a0a";
      ctx.beginPath();
      ctx.moveTo(-2.5, -64); ctx.lineTo(2.5, -64); ctx.lineTo(0, -57); ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    function drawEye(ex, ey, open) {
      var rx = 7, ry = 7 * Math.max(0.06, open);
      // Glow halo
      var g = ctx.createRadialGradient(ex, ey, 0, ex, ey, 16);
      g.addColorStop(0, "rgba(255, 210, 130, " + (0.55 * open) + ")");
      g.addColorStop(1, "rgba(255, 210, 130, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ex, ey, 16, 0, Math.PI * 2);
      ctx.fill();
      // Iris
      var iris = ctx.createRadialGradient(ex - 1, ey - 1, 0.5, ex, ey, rx);
      iris.addColorStop(0, "#ffe2a6");
      iris.addColorStop(0.5, "#e9a23c");
      iris.addColorStop(1, "#9a5e1c");
      ctx.fillStyle = iris;
      ctx.beginPath();
      ctx.ellipse(ex, ey, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      // Pupil
      if (open > 0.25) {
        ctx.fillStyle = "#08130d";
        ctx.beginPath();
        ctx.ellipse(ex, ey, 2.6, 2.6 * open, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawReeds(t) {
      ctx.strokeStyle = "#06130e";
      ctx.lineCap = "round";
      for (var i = 0; i < reeds.length; i++) {
        var r = reeds[i];
        var sway = Math.sin(t * 0.9 + r.ph) * 8;
        ctx.lineWidth = r.wgt;
        ctx.beginPath();
        ctx.moveTo(r.x, h);
        ctx.quadraticCurveTo(
          r.x + r.lean * r.hgt + sway * 0.5,
          h - r.hgt * 0.55,
          r.x + r.lean * r.hgt + sway,
          h - r.hgt
        );
        ctx.stroke();
      }
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      drawSky();
      drawStars(t);
      drawTreeline();
      drawWater(t);
      drawOwl(t);
      drawReeds(t);
    }

    var start = performance.now();
    function loop(now) {
      frame((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    }

    var raf = null;
    resize();
    if (prefersReduced) {
      frame(0.4); // single static dusk frame, eyes open
    } else {
      raf = requestAnimationFrame(loop);
    }

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        resize();
        if (prefersReduced) frame(0.4);
      }, 150);
    });
  }
})();
