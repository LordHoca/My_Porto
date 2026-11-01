/* =====================================================================
   FENNEC — Portofolio · scene.js
   Adegan 3D (Three.js r160): rubah 3D yang "berjalan" mengikuti scroll,
   bentuk geometri melayang dengan parallax kedalaman, dan partikel.

   Ini skrip KLASIK yang memakai import() dinamis (lewat import map di index.html),
   sehingga tetap jalan saat index.html dibuka langsung dari file (file://).
   ===================================================================== */
(function () {
  'use strict';

  var FOX_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261016_125948_52f145de-4509-41e1-9289-523cf0ac9c86.glb';
  var emit = function (n, d) { window.dispatchEvent(new CustomEvent(n, { detail: d })); };

  (async function () {
    var THREE = await import('three');
    var gltfMod = await import('three/addons/loaders/GLTFLoader.js');
    var envMod = await import('three/addons/environments/RoomEnvironment.js');
    var GLTFLoader = gltfMod.GLTFLoader, RoomEnvironment = envMod.RoomEnvironment;

    var root = document.documentElement;
    var canvas = document.getElementById('fox');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    var lerp = function (a, b, t) { return a + (b - a) * t; };
    var smooth = function (t) { return t * t * (3 - 2 * t); };

    /* ---------------- renderer, scene, kamera ---------------- */
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    var scene = new THREE.Scene();
    var pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.HemisphereLight(0xffe2c0, 0x6b3a12, 1.1));
    var key = new THREE.DirectionalLight(0xffc98a, 2.2); key.position.set(-3, 4, 3); scene.add(key);
    var rim = new THREE.DirectionalLight(0xffa24d, 1.6); rim.position.set(3, 2, -3); scene.add(rim);

    /* ---------------- rubah ---------------- */
    var pivot = new THREE.Group();
    scene.add(pivot);

    var loader = new GLTFLoader();
    loader.load(
      FOX_URL,
      function (gltf) {
        var model = gltf.scene;
        var box = new THREE.Box3().setFromObject(model);
        var center = box.getCenter(new THREE.Vector3());
        var size = box.getSize(new THREE.Vector3());
        model.position.sub(center);

        var holder = new THREE.Group();
        holder.add(model);
        holder.scale.setScalar(3.15 / Math.max(size.x, size.y, size.z));
        pivot.add(holder);

        var maxAniso = renderer.capabilities.getMaxAnisotropy();
        model.traverse(function (o) {
          if (!o.isMesh) return;
          var mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach(function (m) {
            if (!m) return;
            m.envMapIntensity = 0.7;
            if (m.map) m.map.anisotropy = maxAniso;
          });
        });
        layout();
        canvas.classList.add('is-ready');
        emit('fennec:ready');
      },
      function (xhr) {
        if (xhr && xhr.lengthComputable) emit('fennec:progress', (xhr.loaded / xhr.total) * 100);
      },
      function (err) { console.error('[fennec] gagal memuat model rubah', err); emit('fennec:error'); }
    );

    /* ---------------- bentuk melayang ---------------- */
    var seed = 7;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    var geos = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.28, 16, 40),
      new THREE.TorusKnotGeometry(0.6, 0.2, 80, 12),
      new THREE.SphereGeometry(0.8, 24, 16),
      new THREE.DodecahedronGeometry(1, 0)
    ];
    var dayCols = [0xe8742a, 0xffc98a, 0xfff2e0, 0x5a2808, 0xff9a4d];
    var nightCols = [0x7aa2ff, 0xb7ccff, 0xeaf0ff, 0x1a2a66, 0x9a8cff];

    var shapes = [];
    for (var i = 0; i < 14; i++) {
      var ci = i % dayCols.length;
      var mat = new THREE.MeshStandardMaterial({ color: dayCols[ci], metalness: 0.55, roughness: 0.28, flatShading: true });
      var mesh = new THREE.Mesh(geos[Math.floor(rnd() * geos.length)], mat);
      var z = -5 + rnd() * 5.8;
      mesh.userData = {
        ci: ci,
        bx: rnd() * 2 - 1,
        by: rnd() * 2 - 1,
        z: z,
        size: 0.14 + rnd() * 0.3,
        rx: (rnd() - 0.5) * 0.9,
        ry: (rnd() - 0.5) * 0.9,
        fs: 0.6 + rnd() * 0.9,
        ph: rnd() * 6.28,
        par: 0.35 + 0.9 * ((z + 5) / 5.8),
        hh: 1, hw: 1, range: 1
      };
      mesh.rotation.set(rnd() * 3, rnd() * 3, 0);
      mesh.scale.setScalar(0.0001);
      scene.add(mesh);
      shapes.push(mesh);
    }

    /* ---------------- partikel ---------------- */
    var pCount = 450, pArr = new Float32Array(pCount * 3);
    for (var p = 0; p < pCount; p++) {
      pArr[p * 3] = (rnd() * 2 - 1) * 9;
      pArr[p * 3 + 1] = (rnd() * 2 - 1) * 6;
      pArr[p * 3 + 2] = -9 + rnd() * 11;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
    var pMat = new THREE.PointsMaterial({ color: 0xffd9b0, size: 0.035, transparent: true, opacity: 0.7, depthWrite: false, sizeAttenuation: true });
    var points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    window.addEventListener('fennec:theme', function (e) {
      var night = e.detail === 'night', cols = night ? nightCols : dayCols;
      shapes.forEach(function (m) { m.material.color.setHex(cols[m.userData.ci]); });
      pMat.color.setHex(night ? 0xbcd2ff : 0xffd9b0);
    });

    /* ---------------- pose rubah per section (mengikuti scroll) ---------------- */
    var stops = [], tops = [], heights = [], sections = [];
    var mobile = false;

    function measure() {
      sections = Array.prototype.slice.call(document.querySelectorAll('main > .section'));
      var y = window.scrollY;
      tops = sections.map(function (s) { return s.getBoundingClientRect().top + y; });
      heights = sections.map(function (s) { return s.offsetHeight; });
    }

    function buildStops() {
      var w = window.innerWidth, h = window.innerHeight, aspect = w / h;
      mobile = w < 720;
      var compact = w < 900;
      var halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      var halfW = halfH * aspect;
      var base = mobile ? 0.62 : Math.min(1, Math.max(0.75, aspect / 1.78));
      var home = { x: mobile ? 0 : 0.05, y: mobile ? 0.45 : 0.05, s: base, ry: 0 };
      var hidden = function (ry) { return { x: 0, y: 0, s: 0, ry: ry }; };
      if (compact) {
        stops = [home, hidden(2.2), hidden(3.4), hidden(-3.4), hidden(-2.2)];
      } else {
        stops = [
          home,
          { x: -halfW * 0.55, y: -0.05, s: base * 0.8, ry: 0.55 },   // tentang: rubah di kiri
          hidden(3.6),                                              // galeri: mengecil sambil berputar
          hidden(-3.6),                                             // skill
          { x: halfW * 0.55, y: -0.1, s: base * 0.88, ry: -0.5 }     // kontak: rubah di kanan
        ];
      }
      shapes.forEach(function (m) {
        var d = m.userData, dist = camera.position.z - d.z;
        d.hh = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist;
        d.hw = d.hh * camera.aspect;
        d.range = d.hh * 2.5;
      });
    }

    function indexAt(y) {
      var n = tops.length;
      if (!n) return 0;
      var vy = y + window.innerHeight * 0.5, i = 0;
      for (var k = 0; k < n; k++) if (vy >= tops[k]) i = k;
      if (i >= n - 1) return Math.min(n - 1, stops.length - 1);
      var pos = clamp((vy - tops[i]) / Math.max(1, heights[i]), 0, 1);
      return Math.min(i + smooth(clamp((pos - 0.6) / 0.4, 0, 1)), stops.length - 1);
    }

    /* ---------------- layout ---------------- */
    function layout() {
      var w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      measure();
      buildStops();
    }
    window.addEventListener('resize', layout);
    window.addEventListener('load', function () { measure(); setTimeout(measure, 600); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.getElementById('main'));
    layout();

    /* ---------------- pointer parallax ---------------- */
    var target = { x: 0, y: 0 }, look = { x: 0, y: 0 };
    window.addEventListener('pointermove', function (e) {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    /* ---------------- animasi ---------------- */
    var clock = new THREE.Clock();
    var scrollSm = window.scrollY, prevS = scrollSm, rollV = 0, appearT0 = null, appear = 0;
    var pose = { x: stops[0].x, y: stops[0].y, s: stops[0].s, ry: 0 };

    function frame() {
      requestAnimationFrame(frame);
      var dt = Math.min(clock.getDelta(), 0.05);
      var t = reduced ? 0 : clock.elapsedTime;

      scrollSm += (window.scrollY - scrollSm) * (reduced ? 1 : 0.09);
      var vel = scrollSm - prevS; prevS = scrollSm;
      rollV += (clamp(vel * 0.0025, -0.25, 0.25) - rollV) * 0.12;

      look.x += (target.x - look.x) * 0.04;
      look.y += (target.y - look.y) * 0.04;

      /* pose rubah dari posisi scroll */
      var u = indexAt(scrollSm);
      var i0 = Math.floor(u), i1 = Math.min(i0 + 1, stops.length - 1), f = u - i0;
      var a = stops[i0], b = stops[i1];
      pose.x = lerp(a.x, b.x, f); pose.y = lerp(a.y, b.y, f); pose.s = lerp(a.s, b.s, f); pose.ry = lerp(a.ry, b.ry, f);

      pivot.visible = pose.s > 0.01;
      pivot.scale.setScalar(Math.max(pose.s, 0.0001));

      var bob = reduced ? 0 : Math.sin(t * 2.2) * 0.09;
      pivot.position.set(pose.x + look.x * 0.06, pose.y + bob, 0);
      pivot.rotation.z = (reduced ? 0 : Math.sin(t * 2.2 + 0.6) * 0.025) + rollV;
      pivot.rotation.y = look.x * 0.22 + (reduced ? 0 : Math.sin(t * 0.9) * 0.05) + pose.ry;
      pivot.rotation.x = look.y * 0.1 + (reduced ? 0 : Math.cos(t * 2.2) * 0.02);

      /* bentuk melayang: muncul setelah preloader selesai */
      if (appearT0 === null && root.classList.contains('is-loaded')) appearT0 = clock.elapsedTime;
      appear = appearT0 === null ? 0 : clamp((clock.elapsedTime - appearT0) / 1.8, 0, 1);
      var ease = 1 - Math.pow(1 - appear, 3);

      var pages = scrollSm / window.innerHeight;
      for (var k = 0; k < shapes.length; k++) {
        var m = shapes[k], d = m.userData;
        var y = d.by * d.hh * 1.2 + pages * d.hh * d.par * 1.1;
        y = (((y + d.range / 2) % d.range) + d.range) % d.range - d.range / 2;      // bungkus agar berulang tanpa putus
        var floatY = reduced ? 0 : Math.sin(t * d.fs + d.ph) * 0.08;
        m.position.set(d.bx * d.hw * 1.05 + look.x * 0.25 * d.par, y + floatY - look.y * 0.15 * d.par, d.z);
        if (!reduced) { m.rotation.x += dt * d.rx; m.rotation.y += dt * d.ry; }
        m.scale.setScalar(Math.max(0.0001, d.size * ease * (mobile ? 0.7 : 1)));
      }

      points.rotation.y = (reduced ? 0 : t * 0.02) + look.x * 0.08;
      points.rotation.x = look.y * 0.04;
      points.position.y = pages * 0.9;

      renderer.render(scene, camera);
    }
    frame();
  })().catch(function (err) {
    console.error('[fennec] adegan 3D gagal dimuat:', err);
    emit('fennec:error');
  });
})();
