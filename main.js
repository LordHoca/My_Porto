/* =====================================================================
   FENNEC — Portofolio · main.js
   UI: preloader, menu, kursor kustom, reveal/scroll, galeri 3D, bola skill 3D,
   lightbox, form kontak. (Adegan Three.js ada di scene.js)

   >>> EDIT KONTEN ANDA DI BAGIAN CONFIG DI BAWAH INI <<<
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------------------- CONFIG ---------------------------- */
  var CONFIG = {
    email: 'Visit me lordhoca1@gmail.com',
    // Ganti '#' dengan tautan sosial media Anda
    social: {
      instagram: '#',
      github: '#',
      linkedin: '#',
      behance: '#'
    },
    // Karya galeri. Isi "img" dengan URL gambar untuk memakai foto asli
    // (jika kosong, kartu memakai seni generatif dari warna "colors").
    works: [
      { title: 'Fennec Brand Visual', cat: 'Branding', year: 2026, colors: ['#e8742a', '#3a1604', '#ffc98a'],
        img: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261016_125845_ec7f8569-08dd-4a78-8310-9e094f5dd0a3.png',
        desc: 'Identitas visual untuk merek otomasi bertema rubah: logo matahari, palet hangat, dan sistem ilustrasi 3D.',
        tags: ['Logo', 'Palet warna', '3D'] },
      { title: 'Aurora Dashboard', cat: 'UI Design', year: 2026, colors: ['#1f3b73', '#0b1020', '#7aa2ff'],
        desc: 'Dasbor analitik dengan mode gelap, grafik interaktif, dan sistem komponen yang konsisten.',
        tags: ['Figma', 'Design system', 'Data viz'] },
      { title: 'Boba Mobile App', cat: 'Mobile App', year: 2025, colors: ['#8a3b2a', '#2b0f08', '#ffb38a'],
        desc: 'Aplikasi pemesanan minuman dengan alur checkout tiga ketukan dan animasi mikro yang menyenangkan.',
        tags: ['UX', 'Prototype', 'Motion'] },
      { title: 'Orbit 3D Landing', cat: 'WebGL', year: 2025, colors: ['#3a1f6b', '#0d0620', '#c39bff'],
        desc: 'Halaman peluncuran produk dengan objek 3D yang mengikuti kursor dan bereaksi saat di-scroll.',
        tags: ['Three.js', 'GLSL', 'Scroll'] },
      { title: 'Kopi Kita Identity', cat: 'Branding', year: 2024, colors: ['#5a3a1e', '#1a0f07', '#e8c9a0'],
        desc: 'Rebranding kedai kopi lokal: kemasan, signage, dan sistem tipografi yang hangat.',
        tags: ['Kemasan', 'Tipografi', 'Print'] },
      { title: 'Pulse Motion Reel', cat: 'Motion', year: 2024, colors: ['#a3153a', '#2a0610', '#ff8aa6'],
        desc: 'Kumpulan animasi UI dan transisi merek yang dibangun dengan ritme dan easing yang konsisten.',
        tags: ['After Effects', 'Lottie', 'Easing'] },
      { title: 'Nusantara Atlas', cat: 'Data Viz', year: 2023, colors: ['#0e5a52', '#04201d', '#7de0c9'],
        desc: 'Peta interaktif budaya dan kuliner Nusantara dengan filter, penelusuran, dan cerita per daerah.',
        tags: ['D3.js', 'Peta', 'Storytelling'] },
      { title: 'Lumen Store', cat: 'E-commerce', year: 2023, colors: ['#b58a1a', '#2b1f04', '#ffe08a'],
        desc: 'Toko online lampu dekoratif dengan pratinjau produk 3D dan checkout yang cepat.',
        tags: ['Frontend', 'Performa', 'Konversi'] },
      { title: 'Sora Poster Series', cat: 'Ilustrasi', year: 2022, colors: ['#2a6fa8', '#07182a', '#a8d8ff'],
        desc: 'Seri poster ilustrasi langit dan awan dengan tekstur kertas serta gradasi halus.',
        tags: ['Ilustrasi', 'Poster', 'Tekstur'] }
    ],
    // Awan skill 3D
    tags: ['Figma', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Three.js', 'WebGL', 'GSAP', 'Blender',
           'Node.js', 'Tailwind', 'UI/UX', 'Branding', 'Motion', 'Framer', 'Git', 'Illustrator', 'Photoshop',
           'After Effects', 'Next.js', 'Spline', 'GLSL', 'Accessibility']
  };

  /* ---------------------------- HELPER ---------------------------- */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var vw = window.innerWidth, vh = window.innerHeight;
  var mouse = { x: vw / 2, y: vh / 2, nx: 0, ny: 0 };

  // terapkan CONFIG ke DOM
  $$('[data-email]').forEach(function (el) { el.textContent = CONFIG.email; });
  $$('[data-social]').forEach(function (a) {
    var url = CONFIG.social[a.getAttribute('data-social')];
    if (url) a.setAttribute('href', url);
    if (url && url !== '#') { a.target = '_blank'; a.rel = 'noopener'; }
  });

  /* ---------------------------- PRELOADER ---------------------------- */
  (function preloader() {
    var loader = $('#loader'), num = $('#loaderNum'), bar = $('#loaderBar');
    var target = 0, shown = 0, finished = false, start = performance.now();
    var MIN_MS = reduce ? 300 : 1500;

    window.addEventListener('fennec:progress', function (e) { target = Math.max(target, e.detail || 0); });
    window.addEventListener('fennec:ready', function () { target = 100; });
    window.addEventListener('fennec:error', function () { target = 100; });
    setTimeout(function () { target = 100; }, 15000); // pengaman

    function finish() {
      if (finished) return;
      finished = true;
      loader.classList.add('is-done');
      setTimeout(function () { root.classList.add('is-loaded'); }, 350);
      setTimeout(function () { loader.style.display = 'none'; }, 1400);
    }
    function tick(now) {
      var elapsed = now - start;
      var fake = Math.min(35, elapsed / 60);          // gerak awal agar terasa hidup
      var goal = Math.max(target, fake);
      shown += (goal - shown) * 0.08 + 0.12;
      if (shown > goal) shown = goal;
      num.textContent = Math.round(shown);
      bar.style.transform = 'scaleX(' + (shown / 100) + ')';
      if (shown >= 99.5 && elapsed >= MIN_MS) { num.textContent = 100; bar.style.transform = 'scaleX(1)'; finish(); return; }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ---------------------------- MENU ---------------------------- */
  (function menu() {
    var menuEl = $('#menu'), brand = $('.brand'), burger = $('.brand__menu');
    var backdrop = $('.menu-backdrop');
    var links = $$('a', menuEl);

    function setPill() { menuEl.style.setProperty('--pill-w', brand.offsetWidth + 'px'); }
    setPill();
    window.addEventListener('load', setPill);
    window.addEventListener('resize', setPill);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setPill);

    links.forEach(function (a) { a.tabIndex = -1; });

    function toggle(open) {
      root.classList.toggle('is-menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      links.forEach(function (a) { a.tabIndex = open ? 0 : -1; });
    }
    burger.addEventListener('click', function () { toggle(!root.classList.contains('is-menu-open')); });
    backdrop.addEventListener('click', function () { toggle(false); });
    links.forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
  })();

  /* ---------------------------- TEMA ---------------------------- */
  (function theme() {
    var btn = $('.toggle');
    btn.addEventListener('click', function () {
      var night = root.getAttribute('data-theme') !== 'night';
      if (night) root.setAttribute('data-theme', 'night'); else root.removeAttribute('data-theme');
      btn.setAttribute('aria-pressed', String(night));
      window.dispatchEvent(new CustomEvent('fennec:theme', { detail: night ? 'night' : 'day' }));
    });
  })();

  /* ---------------------------- KURSOR ---------------------------- */
  var magnets = [];
  (function cursor() {
    if (!fine) return;
    root.classList.add('has-cursor');
    var cur = $('#cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    var rx = mouse.x, ry = mouse.y;

    document.addEventListener('pointermove', function (e) {
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.nx = (e.clientX / vw) * 2 - 1;
      mouse.ny = (e.clientY / vh) * 2 - 1;
      cur.classList.remove('cursor--hidden');
    });
    document.addEventListener('mouseleave', function () { cur.classList.add('cursor--hidden'); });
    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      if (!(t instanceof Element)) return;
      var lab = t.closest('[data-cursor]');
      var link = t.closest('a, button, input, textarea, [data-magnetic]');
      cur.classList.toggle('cursor--label', !!lab);
      if (lab) label.textContent = lab.getAttribute('data-cursor');
      cur.classList.toggle('cursor--link', !lab && !!link);
    });
    document.addEventListener('pointerdown', function (e) {
      cur.classList.add('cursor--down');
      var r = document.createElement('div');
      r.className = 'ripple';
      r.style.left = e.clientX + 'px';
      r.style.top = e.clientY + 'px';
      document.body.appendChild(r);
      setTimeout(function () { r.remove(); }, 850);
    });
    document.addEventListener('pointerup', function () { cur.classList.remove('cursor--down'); });

    // dipanggil dari loop utama
    cursorStep = function () {
      rx += (mouse.x - rx) * 0.18;
      ry += (mouse.y - ry) * 0.18;
      dot.style.transform = 'translate3d(' + mouse.x + 'px,' + mouse.y + 'px,0)';
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    };
  })();
  var cursorStep = cursorStep || function () {};

  // elemen magnetik (tombol "tertarik" ke kursor)
  $$('[data-magnetic]').forEach(function (el) { magnets.push({ el: el, x: 0, y: 0 }); });
  function magnetStep() {
    if (!fine || reduce) return;
    for (var i = 0; i < magnets.length; i++) {
      var m = magnets[i];
      var r = m.el.getBoundingClientRect();
      var tx = 0, ty = 0;
      if (r.bottom > 0 && r.top < vh) {
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = mouse.x - cx, dy = mouse.y - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var reach = Math.max(r.width, r.height) * 0.9 + 30;
        if (dist < reach) { tx = dx * 0.32; ty = dy * 0.32; }
      }
      m.x += (tx - m.x) * 0.15; m.y += (ty - m.y) * 0.15;
      if (Math.abs(m.x) > 0.05 || Math.abs(m.y) > 0.05 || m.on) {
        m.el.style.translate = m.x.toFixed(2) + 'px ' + m.y.toFixed(2) + 'px';
        m.on = Math.abs(m.x) > 0.05 || Math.abs(m.y) > 0.05;
      }
    }
  }

  /* ---------------------------- KARTU TILT 3D ---------------------------- */
  if (fine && !reduce) {
    $$('.tilt').forEach(function (el) {
      var inner = el.firstElementChild;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        inner.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 16).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 16).toFixed(2) + 'deg) translateZ(10px)';
        inner.style.setProperty('--mx', (px * 100) + '%');
        inner.style.setProperty('--my', (py * 100) + '%');
      });
      el.addEventListener('pointerleave', function () {
        inner.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
      });
    });
  }

  /* ---------------------------- TEKS: split, scramble, scrub ---------------------------- */
  function splitWords(el, mode) {
    var idx = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function (tok) {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
            var inner = document.createElement('span');
            inner.textContent = tok;
            if (mode === 'scrub') {
              inner.className = 'sw';
              frag.appendChild(inner);
            } else {
              var w = document.createElement('span');
              w.className = 'w';
              inner.style.transitionDelay = (idx * 0.07) + 's';
              w.appendChild(inner);
              frag.appendChild(w);
            }
            idx++;
          });
          ch.parentNode.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') {
          walk(ch);
        }
      });
    })(el);
    return idx;
  }
  $$('[data-split]').forEach(function (el) { el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim()); splitWords(el, 'reveal'); });
  var scrubs = $$('[data-scrub]').map(function (el) {
    splitWords(el, 'scrub');
    return { el: el, words: $$('.sw', el), last: -1 };
  });
  scrubs.forEach(function (s) { s.words.forEach(function (w) { w.style.opacity = reduce ? 1 : 0.18; }); });

  var CH = '!<>-_\\/[]{}=+*^?#abcdefghijklmnopqrstuvwxyz';
  function scramble(el) {
    if (reduce) return;
    if (!el.dataset.text) el.dataset.text = el.textContent;
    var finalText = el.dataset.text, len = finalText.length, start = performance.now(), dur = 700 + len * 22;
    (function f(now) {
      var t = Math.min(1, (now - start) / dur), out = '';
      for (var i = 0; i < len; i++) {
        var c = finalText.charAt(i);
        out += (c === ' ' || i < t * len * 1.1) ? c : CH.charAt((Math.random() * CH.length) | 0);
      }
      el.textContent = out;
      if (t < 1) requestAnimationFrame(f); else el.textContent = finalText;
    })(start);
  }

  function countUp(el) {
    var n = parseFloat(el.getAttribute('data-count')) || 0, suf = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = n + suf; return; }
    var start = performance.now(), dur = 1700;
    (function f(now) {
      var t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(n * e) + suf;
      if (t < 1) requestAnimationFrame(f);
    })(start);
  }

  /* ---------------------------- REVEAL (IntersectionObserver) ---------------------------- */
  (function reveal() {
    var els = $$('[data-reveal]');
    function show(el) {
      el.classList.add('in');
      if (el.hasAttribute('data-scramble')) scramble(el);
      if (el.hasAttribute('data-count')) countUp(el);
      $$('[data-count]', el).forEach(countUp);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------------------- DATA SECTION (untuk scroll) ---------------------------- */
  var secs = $$('main > .section');
  var tops = [], heights = [];
  function measure() {
    var y = window.scrollY;
    tops = secs.map(function (s) { return s.getBoundingClientRect().top + y; });
    heights = secs.map(function (s) { return s.offsetHeight; });
  }
  measure();
  window.addEventListener('load', function () { measure(); setTimeout(measure, 600); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe($('#main'));

  var dotLinks = $$('#dots a');
  var navLinks = $$('.nav__links a[data-link]');
  var ids = secs.map(function (s) { return s.id; });
  var activeIdx = -1;
  function setActive(i) {
    if (i === activeIdx) return;
    activeIdx = i;
    dotLinks.forEach(function (a, k) { a.classList.toggle('is-active', k === i); });
    navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-link') === ids[i]); });
    root.setAttribute('data-section', ids[i] || '');
  }

  /* ---------------------------- PARALLAX [data-depth] ---------------------------- */
  var depthEls = $$('[data-depth]');
  function parallaxStep() {
    for (var i = 0; i < depthEls.length; i++) {
      var el = depthEls[i], d = parseFloat(el.getAttribute('data-depth')) || 0.15;
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var off = (r.top + r.height / 2 - vh / 2);
      // gunakan posisi tanpa transform agar tidak berumpan balik
      var curY = el._py || 0;
      var base = off - curY;
      var ty = -base * d;
      var tx = -mouse.nx * d * 50;
      el._py = ty;
      el.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0)';
    }
  }

  /* ---------------------------- HERO TILT 3D ---------------------------- */
  var heroCopy = $('#heroCopy'), hrx = 0, hry = 0;
  function heroStep() {
    if (reduce || !fine || window.scrollY > vh) return;
    hrx += ((-mouse.ny * 4) - hrx) * 0.06;
    hry += ((mouse.nx * 6) - hry) * 0.06;
    heroCopy.style.transform = 'perspective(1000px) rotateX(' + hrx.toFixed(2) + 'deg) rotateY(' + hry.toFixed(2) + 'deg)';
  }

  /* ---------------------------- SCRUB TEKS ---------------------------- */
  function scrubStep() {
    if (reduce) return;
    scrubs.forEach(function (s) {
      var r = s.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = clamp((vh * 0.85 - r.top) / (vh * 0.4 + r.height), 0, 1);
      var n = s.words.length;
      var key = Math.round(p * 1000);
      if (key === s.last) return;
      s.last = key;
      for (var i = 0; i < n; i++) {
        s.words[i].style.opacity = (0.18 + 0.82 * clamp(p * (n + 2) - i, 0, 1)).toFixed(2);
      }
    });
  }

  /* ====================================================================
     GALERI — cincin kartu 3D (CSS 3D), drag + inersia + terhubung scroll
     ==================================================================== */
  function rng(seed) { var s = seed * 9301 + 49297; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function artSVG(w, i) {
    var r = rng(i + 3), c = w.colors, id = 'g' + i;
    var s = '<svg viewBox="0 0 400 540" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient>' +
      '<radialGradient id="' + id + 'r" cx=".3" cy=".25" r=".8"><stop offset="0" stop-color="' + c[2] + '" stop-opacity=".55"/><stop offset="1" stop-color="' + c[2] + '" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="400" height="540" fill="url(#' + id + ')"/><rect width="400" height="540" fill="url(#' + id + 'r)"/>';
    var v = i % 4, k;
    if (v === 0) {
      for (k = 0; k < 6; k++) s += '<circle cx="' + (200 + (r() - .5) * 60) + '" cy="' + (230 + (r() - .5) * 60) + '" r="' + (30 + k * 26) + '" fill="none" stroke="' + c[2] + '" stroke-opacity="' + (0.55 - k * 0.07).toFixed(2) + '" stroke-width="2"/>';
      s += '<circle cx="200" cy="230" r="26" fill="' + c[2] + '"/>';
    } else if (v === 1) {
      for (k = 0; k < 7; k++) { var h = 60 + r() * 220; s += '<rect x="' + (34 + k * 48) + '" y="' + (420 - h) + '" width="32" height="' + h + '" rx="16" fill="' + c[2] + '" fill-opacity="' + (0.25 + r() * 0.55).toFixed(2) + '"/>'; }
    } else if (v === 2) {
      for (k = 0; k < 9; k++) { var y0 = 120 + k * 30; s += '<path d="M0 ' + y0 + ' C 100 ' + (y0 - 50 + r() * 40) + ' 200 ' + (y0 + 50 - r() * 40) + ' 400 ' + y0 + '" fill="none" stroke="' + c[2] + '" stroke-opacity="' + (0.7 - k * 0.06).toFixed(2) + '" stroke-width="2.5"/>'; }
    } else {
      for (var gy = 0; gy < 9; gy++) for (var gx = 0; gx < 7; gx++) s += '<circle cx="' + (40 + gx * 53) + '" cy="' + (90 + gy * 38) + '" r="' + (1.5 + r() * 3.5).toFixed(1) + '" fill="' + c[2] + '" fill-opacity=".7"/>';
      s += '<circle cx="270" cy="200" r="70" fill="' + c[2] + '" fill-opacity=".85"/>';
    }
    return s + '</svg>';
  }
  function artHTML(w, i) {
    if (w.img) return '<div class="card__art" style="background-image:url(\'' + w.img + '\')"></div>';
    return '<div class="card__art">' + artSVG(w, i) + '</div>';
  }

  var ring = $('#ring'), ringWrap = $('#ringWrap');
  var works = CONFIG.works, N = works.length, STEP = 360 / N;
  var ang = 0, vel = 0, dragging = false, lastX = 0, moved = 0, downCard = null, tilt = -6, tiltT = -6, ringVisible = false;

  (function buildRing() {
    works.forEach(function (w, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'card';
      b.setAttribute('data-cursor', 'lihat');
      b.setAttribute('data-i', i);
      b.setAttribute('aria-label', w.title + ' — ' + w.cat);
      b.style.setProperty('--a', (i * STEP) + 'deg');
      b.innerHTML = artHTML(w, i) + '<div class="card__meta"><small>' + w.cat + ' · ' + w.year + '</small><b>' + w.title + '</b></div>';
      ring.appendChild(b);
    });
    function setRadius() {
      var cw = parseFloat(getComputedStyle(ring).getPropertyValue('--cw')) || 232;
      var R = (cw / 2) / Math.tan(Math.PI / N) + (window.innerWidth < 720 ? 22 : 40);
      ring.style.setProperty('--r', R + 'px');
    }
    setRadius();
    window.addEventListener('resize', setRadius);
  })();

  ringWrap.addEventListener('pointerdown', function (e) {
    dragging = true; moved = 0; vel = 0; lastX = e.clientX;
    downCard = e.target.closest ? e.target.closest('.card') : null;
    try { ringWrap.setPointerCapture(e.pointerId); } catch (err) {}
  });
  ringWrap.addEventListener('pointermove', function (e) {
    if (dragging) {
      var dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
      ang += dx * 0.32; vel = dx * 0.32;
    }
    tiltT = -6 + ((e.clientY - ringWrap.getBoundingClientRect().top) / ringWrap.offsetHeight - 0.5) * -14;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    if (moved < 6 && downCard) openLightbox(parseInt(downCard.getAttribute('data-i'), 10));
    downCard = null;
  }
  ringWrap.addEventListener('pointerup', endDrag);
  ringWrap.addEventListener('pointercancel', function () { dragging = false; downCard = null; });
  ringWrap.addEventListener('click', function (e) {   // aktivasi lewat keyboard
    if (e.detail === 0) { var c = e.target.closest('.card'); if (c) openLightbox(parseInt(c.getAttribute('data-i'), 10)); }
  });

  var ringIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (en) { ringVisible = en[0].isIntersecting; }, { threshold: 0 }) : null;
  if (ringIO) ringIO.observe(ringWrap); else ringVisible = true;

  var lastScrollForRing = window.scrollY;
  function ringStep() {
    var sy = window.scrollY, dScroll = sy - lastScrollForRing; lastScrollForRing = sy;
    if (!ringVisible) return;
    if (!dragging) {
      ang += vel;
      vel *= 0.94;
      if (!reduce && Math.abs(vel) < 0.06) ang += 0.12;       // putar otomatis pelan
    }
    ang += dScroll * 0.1;                                      // scroll ikut memutar cincin
    tilt += (tiltT - tilt) * 0.06;
    ring.style.transform = 'rotateX(' + tilt.toFixed(2) + 'deg) rotateY(' + ang.toFixed(2) + 'deg)';
  }

  /* ---------------------------- LIGHTBOX ---------------------------- */
  var lb = $('#lightbox'), lbCard = $('#lbCard'), cur = 0;
  function fillLightbox(i) {
    var w = works[i];
    cur = (i + N) % N; w = works[cur];
    $('#lbArt').innerHTML = w.img ? '' : artSVG(w, cur);
    $('#lbArt').style.backgroundImage = w.img ? 'url(\'' + w.img + '\')' : '';
    $('#lbCat').textContent = w.cat + ' · ' + w.year;
    $('#lbTitle').textContent = w.title;
    $('#lbDesc').textContent = w.desc;
    $('#lbTags').innerHTML = (w.tags || []).map(function (t) { return '<li>' + t + '</li>'; }).join('');
    $('#lbCount').textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
  }
  function openLightbox(i) { fillLightbox(i); lb.classList.add('is-open'); $('#lbClose').focus({ preventScroll: true }); }
  function closeLightbox() { lb.classList.remove('is-open'); lbCard.style.removeProperty('--rx'); lbCard.style.removeProperty('--ry'); }
  $('#lbClose').addEventListener('click', closeLightbox);
  $('#lbPrev').addEventListener('click', function () { fillLightbox(cur - 1); });
  $('#lbNext').addEventListener('click', function () { fillLightbox(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') fillLightbox(cur - 1);
    if (e.key === 'ArrowRight') fillLightbox(cur + 1);
  });
  if (fine && !reduce) {
    lb.addEventListener('pointermove', function (e) {
      lbCard.style.setProperty('--ry', ((e.clientX / vw - 0.5) * 8).toFixed(2) + 'deg');
      lbCard.style.setProperty('--rx', ((0.5 - e.clientY / vh) * 6).toFixed(2) + 'deg');
    });
  }

  /* ====================================================================
     SKILL — bola tag 3D (proyeksi manual, tanpa pustaka)
     ==================================================================== */
  var sphereEl = $('#sphere'), sphereVisible = false;
  var tagEls = [], tagPts = [];
  CONFIG.tags.forEach(function (t, i) {
    var el = document.createElement('span');
    el.className = 'sphere__tag';
    el.textContent = t;
    sphereEl.appendChild(el);
    var n = CONFIG.tags.length;
    var y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
    tagPts.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r });
    tagEls.push(el);
  });
  var sax = 0, say = 0, svx = 0.0015, svy = 0.004, tvx = 0.0015, tvy = 0.004, sphereHover = false;
  sphereEl.addEventListener('pointerenter', function () { sphereHover = true; });
  sphereEl.addEventListener('pointerleave', function () { sphereHover = false; tvx = 0.0015; tvy = 0.004; });
  sphereEl.addEventListener('pointermove', function (e) {
    var r = sphereEl.getBoundingClientRect();
    var nx = ((e.clientX - r.left) / r.width - 0.5) * 2, ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    tvy = nx * 0.022; tvx = -ny * 0.022;
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { sphereVisible = en[0].isIntersecting; }, { threshold: 0 }).observe(sphereEl);
  else sphereVisible = true;

  function sphereStep() {
    if (!sphereVisible) return;
    var k = reduce ? 0 : 1;
    svx += (tvx * k - svx) * 0.06; svy += (tvy * k - svy) * 0.06;
    sax += svx; say += svy;
    var R = sphereEl.clientWidth * 0.4;
    var cx = Math.cos(sax), sx = Math.sin(sax), cy = Math.cos(say), sy = Math.sin(say);
    for (var i = 0; i < tagPts.length; i++) {
      var p = tagPts[i];
      var x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
      var y1 = p.y * cx - z1 * sx, z2 = p.y * sx + z1 * cx;
      var depth = (z2 + 1) / 2;
      var el = tagEls[i];
      el.style.transform = 'translate(-50%,-50%) translate3d(' + (x1 * R).toFixed(1) + 'px,' + (y1 * R).toFixed(1) + 'px,0) scale(' + (0.62 + 0.55 * depth).toFixed(3) + ')';
      el.style.opacity = (0.28 + 0.72 * depth).toFixed(2);
      el.style.zIndex = Math.round(depth * 100);
    }
  }

  /* ---------------------------- KONTAK ---------------------------- */
  (function contact() {
    var form = $('#form'), status = $('#formStatus');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nama = (d.get('nama') || '').toString().trim(), email = (d.get('email') || '').toString().trim(), pesan = (d.get('pesan') || '').toString().trim();
      var ok = nama && /^\S+@\S+\.\S+$/.test(email) && pesan;
      status.classList.toggle('is-error', !ok);
      if (!ok) { status.textContent = 'mohon lengkapi nama, email yang valid, dan pesan.'; return; }
      var subject = encodeURIComponent('Halo Fennec — ' + nama);
      var body = encodeURIComponent(pesan + '\n\n— ' + nama + ' (' + email + ')');
      status.textContent = 'terima kasih! aplikasi email Anda akan terbuka.';
      window.location.href = 'mailto:' + CONFIG.email + '?subject=' + subject + '&body=' + body;
    });

    var copy = $('#copyMail'), chip = $('i', copy);
    copy.addEventListener('click', function () {
      function done() { chip.textContent = 'tersalin ✓'; setTimeout(function () { chip.textContent = 'salin'; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(CONFIG.email).then(done, done);
      else {
        var ta = document.createElement('textarea'); ta.value = CONFIG.email; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (err) {}
        ta.remove(); done();
      }
    });
  })();

  /* ====================================================================
     LOOP UTAMA
     ==================================================================== */
  var progressEl = $('#progress');
  function frame() {
    requestAnimationFrame(frame);
    var y = window.scrollY;
    var max = Math.max(1, document.documentElement.scrollHeight - vh);
    root.style.setProperty('--sp', (y / max).toFixed(4));
    root.style.setProperty('--veil-a', (clamp(y / (vh * 0.9), 0, 1) * 0.78).toFixed(3));

    // section aktif
    var mid = y + vh * 0.5, idx = 0;
    for (var i = 0; i < tops.length; i++) if (mid >= tops[i]) idx = i;
    setActive(idx);

    cursorStep();
    magnetStep();
    heroStep();
    parallaxStep();
    scrubStep();
    ringStep();
    sphereStep();
  }
  requestAnimationFrame(frame);

  window.addEventListener('resize', function () { vw = window.innerWidth; vh = window.innerHeight; measure(); });
})();
