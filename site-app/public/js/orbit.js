/* Orbit block: CSS-3D hardcovers orbiting a headline. Spring physics in one
   requestAnimationFrame loop; drag to throw, open in a focus view, search, filter,
   morph into a grid, keep a selection that pre-fills the contact form.
   Plain script, no dependency. Markup and data are written by tools/build_site.py. */
(function () {
    'use strict';
    var root = document.querySelector('[data-orbit]');
    var dataEl = document.getElementById('orbit-data');
    if (!root || !dataEl) return;

    var DATA = JSON.parse(dataEl.textContent);
    var ITEMS = DATA.items, CATS = DATA.categories, TEXT = DATA.text;
    var stage = root.querySelector('.orbit-stage');
    var bookEls = Array.prototype.slice.call(stage.querySelectorAll('.book'));
    var shadowEls = Array.prototype.slice.call(stage.querySelectorAll('.bshadow'));
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var TILT = [-16, 12, -8, 15, -13, 9, -18, 11, -6, 17, -12, 7];
    var KEYS = ['x', 'y', 'z', 'rx', 'ry', 'rz', 's', 'o', 'open'];
    var K = { x: 120, y: 120, z: 140, rx: 160, ry: 160, rz: 120, s: 170, o: 90, open: 110 };
    var C = { x: 17, y: 17, z: 20, rx: 18, ry: 18, rz: 15, s: 21, o: 19, open: 20 };

    var W = 0, H = 0, BW = 0, BH = 0, D = 0, mobile = false;
    var RING_N = 720, ring = [];
    var phase = 0, phaseV = 0, time = 0, last = 0, introAt = 0;
    var mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
    var pointer = { x: -9999, y: -9999, inside: false };
    var mode = 'orbit', focus = -1, focusOpen = 0, focusTimer = 0;
    var query = '', cat = null;
    var running = false, visible = true, raf = 0;
    var spin = null;

    var books = bookEls.map(function (el, i) {
        var b = {
            el: el, sh: shadowEls[i], i: i, d: ITEMS[i], tilt: TILT[i % TILT.length],
            seed: Math.sin(i * 91.7) * 0.5 + 0.5, p: {}, v: {}, t: {},
            active: true, hover: false, drag: null, angle: 0
        };
        KEYS.forEach(function (k) { b.p[k] = 0; b.v[k] = 0; b.t[k] = 0; });
        return b;
    });

    // ------------------------------------------------------------------ helpers
    function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function local(e) {
        var r = root.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    var toastTimer = 0;
    function toast(text) {
        var el = root.querySelector('.orbit-toast');
        el.textContent = text;
        el.classList.add('is-on');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 1800);
    }
    function kick(b, amount) {
        b.v.rz += (Math.random() - 0.5) * 420 * amount;
        b.v.z += (220 + Math.random() * 220) * amount;
    }

    // ------------------------------------------------------------------ layout
    function buildRing() {
        var RX = (mobile ? 0.5 : 0.42) * W, RY = (mobile ? 0.42 : 0.43) * H;
        var pts = [], len = [0], total = 0, k, th, c, s;
        for (k = 0; k <= RING_N; k++) {
            th = (k / RING_N) * Math.PI * 2;
            c = Math.cos(th); s = Math.sin(th);
            pts.push([Math.sign(c) * Math.pow(Math.abs(c), 0.5) * RX, Math.sign(s) * Math.pow(Math.abs(s), 0.5) * RY]);
            if (k) { total += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); len.push(total); }
        }
        // Re-sample by arc length so the books are evenly spaced along the ring.
        ring = [];
        var j = 0;
        for (k = 0; k < RING_N; k++) {
            var target = (k / RING_N) * total;
            while (j < RING_N - 1 && len[j + 1] < target) j++;
            var f = (target - len[j]) / ((len[j + 1] - len[j]) || 1);
            ring.push([pts[j][0] + (pts[j + 1][0] - pts[j][0]) * f, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * f]);
        }
    }
    function ringAt(u) {
        u = ((u % 1) + 1) % 1;
        var f = u * RING_N, i = Math.floor(f), t = f - i, a = ring[i], b = ring[(i + 1) % RING_N];
        return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    }
    function layout() {
        W = root.clientWidth; H = root.clientHeight;
        var vw = window.innerWidth;
        mobile = vw < 760;
        BW = mobile ? Math.min(vw * 0.30, 140) : clamp(vw * 0.128, 130, 230);
        BH = BW * 1.327; D = BW * 0.085;
        stage.style.setProperty('--bw', BW.toFixed(2) + 'px');
        stage.style.setProperty('--bh', BH.toFixed(2) + 'px');
        stage.style.setProperty('--d', D.toFixed(2) + 'px');
        buildRing();
    }

    // ------------------------------------------------------------------ targets
    function activeList() { return books.filter(function (b) { return b.active; }); }

    function orbitTarget(b, k, n, t) {
        var u = phase / (Math.PI * 2) + k / n;
        var pt = ringAt(u);
        var x = W / 2 + pt[0], y = 0.53 * H + pt[1], s = 1, z = 0;
        // Top clearance: books crossing the top centre rise and shrink.
        var dx = x - W / 2;
        if (pt[1] < 0 && Math.abs(dx) < 0.2 * W) {
            var f = 1 - Math.abs(dx) / (0.2 * W), e = f * f * (3 - 2 * f);
            e *= clamp(-pt[1] / (0.3 * H), 0, 1);
            y -= e * (0.17 * H + 0.35 * BH);
            s *= 1 - 0.25 * e;
        }
        // Bottom clearance: books crossing the bottom centre dip so the chips stay readable.
        if (pt[1] > 0 && Math.abs(dx) < 0.24 * W) {
            var fb = 1 - Math.abs(dx) / (0.24 * W), eb = fb * fb * (3 - 2 * fb);
            eb *= clamp(pt[1] / (0.3 * H), 0, 1);
            y += eb * (0.08 * H + 0.3 * BH);
            s *= 1 - 0.18 * eb;
        }
        var depth = 0.6 + b.seed * 0.8;
        x += (mx - 0.5) * -38 * depth;
        y += (my - 0.5) * -26 * depth;
        if (!reduce) y += Math.sin(time * 0.7 + b.i * 1.7) * 5;
        var rz = b.tilt + (reduce ? 0 : Math.sin(time * 0.5 + b.i) * 2.5);
        var rx = (my - 0.5) * -16, ry = (mx - 0.5) * 22, open = 0;
        if (pointer.inside && !b.hover && !anyDrag()) {
            var ddx = x - pointer.x, ddy = y - pointer.y, dist = Math.hypot(ddx, ddy), R = 1.25 * BW;
            if (dist < R && dist > 0.001) {
                var push = (1 - dist / R) * 0.35 * BW;
                x += (ddx / dist) * push; y += (ddy / dist) * push;
            }
        }
        if (b.hover) { z = 70; s *= 1.07; rz *= 0.45; open = 0.06; }
        set(t, x, y, z, rx, ry, rz, s, 1, open);
    }
    function gridTarget(b, k, n, t) {
        var cols = mobile ? 3 : 6, sc = Math.min(0.78, (0.24 * H) / BH);
        var rows = Math.ceil(n / cols), r = Math.floor(k / cols), c = k % cols;
        var inRow = r === rows - 1 ? n - r * cols : cols;
        var gx = BW * sc * (mobile ? 1.12 : 1.3), gy = BH * sc * 1.12;
        var x = W / 2 + (c - (inRow - 1) / 2) * gx + (mx - 0.5) * -10;
        var y = 0.66 * H + (r - (rows - 1) / 2) * gy + (my - 0.5) * -8;
        var z = b.hover ? 60 : 0, s = sc * (b.hover ? 1.08 : 1);
        set(t, x, y, z, (my - 0.5) * -10, (mx - 0.5) * 14, b.hover ? 0 : b.tilt * 0.18, s, 1, b.hover ? 0.06 : 0);
    }
    function set(t, x, y, z, rx, ry, rz, s, o, open) {
        t.x = x; t.y = y; t.z = z; t.rx = rx; t.ry = ry; t.rz = rz; t.s = s; t.o = o; t.open = open;
    }
    function anyDrag() { for (var i = 0; i < books.length; i++) if (books[i].drag) return true; return false; }

    function computeTargets(now) {
        var act = activeList(), n = act.length;
        books.forEach(function (b) {
            var t = b.t;
            // Intro: everyone waits at the headline, then bursts out one by one.
            if ((now - introAt) / 1000 < 0.25 + b.i * 0.07 && !reduce) {
                set(t, W / 2, 0.53 * H, 0, 0, 0, b.tilt, 0.15, 0, 0);
                return;
            }
            if (focus >= 0) {
                if (b.i === focus) {
                    var s = mobile ? Math.min(1.05, (0.34 * H) / BH) : Math.min(1.6, (0.56 * H) / BH);
                    var x = mobile ? W / 2 + BW * s * 0.25 : Math.max(BW * s * 1.5 + 30, 0.53 * W - (BW * s) / 2 - 24);
                    var y = mobile ? 0.34 * H : 0.5 * H;
                    set(t, x, y, 120, (my - 0.5) * -6, -12 + (mx - 0.5) * 10, 0, s, 1, focusOpen);
                } else {
                    set(t, W / 2 + Math.cos(b.angle) * 0.62 * W, H / 2 + Math.sin(b.angle) * 0.62 * H, -60,
                        0, 0, b.tilt * 1.5, 0.8, 0, 0);
                }
                return;
            }
            if (!b.active) {
                set(t, b.p.x, H + 1.2 * BH, 0, 30, 0, b.tilt + (b.seed - 0.5) * 140, 0.9, 0, 0);
                return;
            }
            var k = act.indexOf(b);
            if (mode === 'grid') gridTarget(b, k, n, t); else orbitTarget(b, k, n, t);
        });
    }

    // ------------------------------------------------------------------ loop
    function step(dt) {
        var h = dt / 4;
        books.forEach(function (b) {
            for (var sub = 0; sub < 4; sub++) {
                for (var q = 0; q < KEYS.length; q++) {
                    var k = KEYS[q];
                    if (b.drag && (k === 'x' || k === 'y')) continue;
                    var a = K[k] * (b.t[k] - b.p[k]) - C[k] * b.v[k];
                    b.v[k] += a * h;
                    b.p[k] += b.v[k] * h;
                }
            }
        });
    }
    function render() {
        books.forEach(function (b) {
            var p = b.p, s = Math.max(0.01, p.s), o = clamp(p.o, 0, 1);
            b.el.style.transform = 'translate3d(' + (p.x - BW / 2).toFixed(2) + 'px,' + (p.y - BH / 2).toFixed(2) + 'px,' + p.z.toFixed(2) +
                'px) rotateZ(' + p.rz.toFixed(2) + 'deg) rotateX(' + p.rx.toFixed(2) + 'deg) rotateY(' + p.ry.toFixed(2) + 'deg) scale(' + s.toFixed(4) + ')';
            b.el.style.opacity = o.toFixed(3);
            b.el.style.setProperty('--open', clamp(p.open, 0, 1).toFixed(3));
            b.el.style.setProperty('--gx', (p.ry * 3 + p.rz).toFixed(1) + '%');
            b.el.style.zIndex = String(Math.round(1000 + p.z * 4 + p.y * 0.01));
            var lift = Math.max(0, p.z);
            b.sh.style.transform = 'translate3d(' + (p.x - BW / 2 + 6 + lift * 0.25).toFixed(2) + 'px,' + (p.y - BH / 2 + 14 + lift * 0.45).toFixed(2) +
                'px,0) rotateZ(' + p.rz.toFixed(2) + 'deg) scale(' + (s * 0.94).toFixed(4) + ')';
            b.sh.style.opacity = (o * clamp(1 - lift / 220, 0.22, 1) * 0.85).toFixed(3);
        });
    }
    function frame(now) {
        raf = 0;
        if (!running) return;
        var dt = Math.min(0.033, (now - last) / 1000 || 0.016);
        last = now;
        time += dt;
        mx += (tmx - mx) * 0.08; my += (tmy - my) * 0.08;
        if (mode === 'orbit' && focus < 0) {
            if (!spin) phase += (reduce ? 0 : 0.035 * dt) + phaseV;
            phaseV *= 0.93;
        }
        computeTargets(now);
        step(dt);
        render();
        raf = requestAnimationFrame(frame);
    }
    function start() {
        if (running || !visible || document.hidden) return;
        running = true; last = performance.now();
        raf = requestAnimationFrame(frame);
    }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

    // ------------------------------------------------------------------ filters
    function matches(item) {
        if (cat && item.cat !== cat) return false;
        if (!query) return true;
        return norm(item.title + ' ' + item.catLabel + ' ' + item.stack + ' ' + item.format).indexOf(query) !== -1;
    }
    function applyFilters() {
        var before = activeList().length;
        books.forEach(function (b) {
            b.active = matches(b.d);
            b.el.classList.toggle('is-out', !b.active);
            b.el.setAttribute('aria-hidden', String(!b.active));
            b.el.tabIndex = b.active ? 0 : -1;
        });
        if (activeList().length !== before) books.forEach(function (b) { if (b.active) b.v.z += 160; });
    }

    // ------------------------------------------------------------------ hover tooltip
    var tip = root.querySelector('.orbit-tip');
    function showTip(b, e) {
        if (focus >= 0 || b.drag) return;
        tip.innerHTML = esc(b.d.title) + '<small>' + esc(b.d.catLabel) + '</small>';
        tip.classList.add('is-on');
        moveTip(e);
    }
    function moveTip(e) { tip.style.transform = 'translate3d(' + (e.clientX + 16) + 'px,' + (e.clientY + 18) + 'px,0)'; }
    function hideTip() { tip.classList.remove('is-on'); }

    // ------------------------------------------------------------------ drag to throw
    var TOASTS = TEXT.throws;
    books.forEach(function (b) {
        var el = b.el;
        el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { b.hover = !anyDrag() && focus < 0; showTip(b, e); } });
        el.addEventListener('pointerleave', function () { b.hover = false; hideTip(); });
        el.addEventListener('pointerdown', function (e) {
            if (focus >= 0 || e.button > 0) return;
            e.preventDefault(); e.stopPropagation();
            el.setPointerCapture(e.pointerId);
            var q = local(e);
            b.drag = { sx: q.x, sy: q.y, lx: q.x, ly: q.y, lt: performance.now(), vx: 0, vy: 0, moved: 0, ox: b.p.x - q.x, oy: b.p.y - q.y };
            el.classList.add('is-dragging');
            hideTip();
        });
        el.addEventListener('pointermove', function (e) {
            if (e.pointerType === 'mouse' && !b.drag) moveTip(e);
            if (!b.drag) return;
            var q = local(e), now = performance.now(), d = b.drag;
            var ms = Math.max(1, now - d.lt), fx = ((q.x - d.lx) / ms) * 16.67, fy = ((q.y - d.ly) / ms) * 16.67;
            d.vx = d.vx * 0.5 + fx * 0.5; d.vy = d.vy * 0.5 + fy * 0.5;
            d.lx = q.x; d.ly = q.y; d.lt = now;
            d.moved = Math.max(d.moved, Math.hypot(q.x - d.sx, q.y - d.sy));
            b.p.x = q.x + d.ox; b.p.y = q.y + d.oy;
            b.v.x = 0; b.v.y = 0;
        });
        function end(e) {
            if (!b.drag) return;
            var d = b.drag;
            b.drag = null;
            el.classList.remove('is-dragging');
            if (d.moved < 6) { openFocus(b.i); return; }
            b.v.x = clamp(d.vx, -60, 60) * 60; b.v.y = clamp(d.vy, -60, 60) * 60;
            b.v.rz += d.vx * 30;
            toast(TOASTS[Math.floor(Math.random() * TOASTS.length)]);
        }
        el.addEventListener('pointerup', end);
        el.addEventListener('pointercancel', end);
        el.addEventListener('keydown', function (e) {
            if ((e.key === 'Enter' || e.key === ' ') && focus < 0) { e.preventDefault(); openFocus(b.i); }
        });
    });
    // While dragging, the book leans into its own velocity.
    var baseCompute = computeTargets;
    computeTargets = function (now) {
        baseCompute(now);
        books.forEach(function (b) {
            if (!b.drag) return;
            var d = b.drag;
            b.t.z = 110; b.t.s = 1.1; b.t.o = 1; b.t.open = 0;
            b.t.rz = b.tilt + clamp(d.vx * 2.2, -40, 40);
            b.t.ry = clamp(d.vx * 3, -45, 45);
            b.t.rx = clamp(-d.vy * 3, -45, 45);
            d.vx *= 0.9; d.vy *= 0.9;
        });
    };

    // ------------------------------------------------------------------ empty space: spin, parallax, close
    root.addEventListener('pointermove', function (e) {
        var q = local(e);
        pointer.x = q.x; pointer.y = q.y; pointer.inside = true;
        tmx = clamp(q.x / W, 0, 1); tmy = clamp(q.y / H, 0, 1);
        if (spin) {
            var dx = q.x - spin.x;
            spin.x = q.x;
            var dphi = (dx / W) * 1.6;
            phase += dphi;
            spin.v = dphi;
            if (Math.abs(q.x - spin.sx) > 6) spin.moved = true;
        }
    });
    root.addEventListener('pointerleave', function () { pointer.inside = false; tmx = 0.5; tmy = 0.5; });
    function isUi(target) { return !!target.closest('button, a, input, label, .orbit-panel, .orbit-results, .orbit-shelf-drop, .book'); }
    root.addEventListener('pointerdown', function (e) {
        if (isUi(e.target) || focus >= 0 || mode !== 'orbit' || e.button > 0) return;
        var q = local(e);
        spin = { x: q.x, sx: q.x, v: 0, moved: false };
    });
    window.addEventListener('pointerup', function () { if (spin) { phaseV = clamp(spin.v, -0.08, 0.08); spin = null; } });
    root.addEventListener('click', function (e) {
        if (focus >= 0 && !isUi(e.target)) closeFocus();
    });
    root.addEventListener('wheel', function (e) {
        // Horizontal wheel or trackpad swipe spins the ring; vertical keeps scrolling the page.
        if (focus >= 0 || mode !== 'orbit') return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); phaseV += e.deltaX * 0.00009; }
    }, { passive: false });

    // ------------------------------------------------------------------ focus view
    var panel = root.querySelector('.orbit-panel');
    var readBtn, addBtn;
    // The selection ("Ma sélection") and the browse button are optional in the markup.
    var HAS_SHELF = !!root.querySelector('.orbit-shelf');
    function fillPanel(item) {
        panel.innerHTML =
            '<p class="op-kicker">' + esc(item.catLabel) + ' · ' + esc(item.format) + '</p>' +
            '<h2 class="op-title" tabindex="-1">' + esc(item.title) + '</h2>' +
            '<p class="op-by">' + esc(TEXT.by.replace('{cat}', item.pole || item.catLabel)) + '</p>' +
            '<dl class="op-meta"><div><dt>' + esc(TEXT.meta[0]) + '</dt><dd>' + esc(item.format) + '</dd></div>' +
            '<div><dt>' + esc(TEXT.meta[1]) + '</dt><dd>' + esc(item.deliverable) + '</dd></div>' +
            '<div><dt>' + esc(TEXT.meta[2]) + '</dt><dd>' + esc(item.stack) + '</dd></div></dl>' +
            '<p class="op-note">' + esc(item.note) + '</p>' +
            '<div class="op-actions"><button type="button" class="op-read">' + esc(TEXT.read[1]) + '</button>' +
            (HAS_SHELF ? '<button type="button" class="op-add"></button>' : '') + '</div>';
        readBtn = panel.querySelector('.op-read');
        addBtn = panel.querySelector('.op-add');
        readBtn.addEventListener('click', function () {
            focusOpen = focusOpen > 0.5 ? 0.18 : 0.92;
            readBtn.textContent = focusOpen > 0.5 ? TEXT.read[1] : TEXT.read[0];
        });
        if (addBtn) addBtn.addEventListener('click', function () { toggleShelf(focus, true); });
        syncAdd();
    }
    function syncAdd() {
        if (!addBtn || focus < 0) return;
        var on = shelf.indexOf(ITEMS[focus].id) !== -1;
        addBtn.classList.toggle('is-on', on);
        addBtn.textContent = on ? TEXT.added : TEXT.add;
    }
    function openFocus(i) {
        if (i < 0 || i >= books.length) return;
        if (!books[i].active) { cat = null; query = ''; searchInput.value = ''; syncChips(); applyFilters(); }
        hideTip(); closeResults(); closeShelf();
        var first = focus < 0;
        focus = i; focusOpen = 0;
        books.forEach(function (b) {
            b.hover = false;
            b.el.classList.toggle('is-focused', b.i === i);
            if (b.i !== i) b.angle = Math.atan2(b.p.y - H / 2, b.p.x - W / 2);
        });
        root.classList.add('is-focus');
        fillPanel(ITEMS[i]);
        clearTimeout(focusTimer);
        focusTimer = setTimeout(function () { if (focus === i) focusOpen = 0.92; }, 650);
        if (first) {
            var top = root.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(root).scrollMarginTop) || 72);
            if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
            document.documentElement.classList.add('orbit-lock');
        }
        var title = panel.querySelector('.op-title');
        if (title) title.focus({ preventScroll: true });
    }
    function closeFocus() {
        if (focus < 0) return;
        var was = focus;
        focus = -1; focusOpen = 0;
        root.classList.remove('is-focus');
        document.documentElement.classList.remove('orbit-lock');
        books.forEach(function (b) { b.el.classList.remove('is-focused'); kick(b, 0.6); });
        books[was].el.focus({ preventScroll: true });
    }
    function stepFocus(dir) {
        var act = activeList();
        if (!act.length) return;
        var k = act.findIndex(function (b) { return b.i === focus; });
        var next = act[(k + dir + act.length) % act.length].i;
        books[focus].v.x += dir * -600;
        openFocus(next);
    }
    root.querySelector('.orbit-close').addEventListener('click', closeFocus);
    root.querySelector('.orbit-prev').addEventListener('click', function () { stepFocus(-1); });
    root.querySelector('.orbit-next').addEventListener('click', function () { stepFocus(1); });

    // ------------------------------------------------------------------ layout switch
    var cta = root.querySelector('.orbit-cta');
    var switchBtns = Array.prototype.slice.call(root.querySelectorAll('.orbit-switch button'));
    function setMode(next) {
        if (next === mode) return;
        mode = next;
        root.classList.toggle('is-grid', mode === 'grid');
        switchBtns.forEach(function (btn) { btn.setAttribute('aria-pressed', String(btn.dataset.mode === mode)); });
        if (cta) cta.querySelector('.label').textContent = mode === 'grid' ? TEXT.cta[1] : TEXT.cta[0];
        books.forEach(function (b) { kick(b, 1); });
    }
    if (cta) cta.addEventListener('click', function () { setMode(mode === 'grid' ? 'orbit' : 'grid'); });
    switchBtns.forEach(function (btn) { btn.addEventListener('click', function () { setMode(btn.dataset.mode); }); });

    // ------------------------------------------------------------------ chips
    var chips = Array.prototype.slice.call(root.querySelectorAll('.orbit-chip'));
    function syncChips() { chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.cat === cat)); }); }
    chips.forEach(function (c) {
        c.addEventListener('click', function () {
            cat = cat === c.dataset.cat ? null : c.dataset.cat;
            syncChips(); applyFilters();
        });
    });

    // ------------------------------------------------------------------ search
    var searchInput = root.querySelector('.orbit-search input');
    var results = root.querySelector('.orbit-results');
    var sel = 0, found = [];
    function highlight(title, q) {
        if (!q) return esc(title);
        var n = '';
        for (var i = 0; i < title.length; i++) n += norm(title[i]).charAt(0) || title[i];
        var at = n.indexOf(q);
        if (at < 0) return esc(title);
        return esc(title.slice(0, at)) + '<mark>' + esc(title.slice(at, at + q.length)) + '</mark>' + esc(title.slice(at + q.length));
    }
    function renderResults() {
        if (!query) { closeResults(); return; }
        found = books.filter(function (b) { return b.active; });
        if (!found.length) {
            results.innerHTML = '<li class="empty" role="option" aria-disabled="true">' + esc(TEXT.empty) + '</li>';
        } else {
            sel = clamp(sel, 0, found.length - 1);
            results.innerHTML = found.map(function (b, k) {
                return '<li role="option" id="orbit-opt-' + k + '" data-i="' + b.i + '" aria-selected="' + (k === sel) + '">' +
                    '<span class="thumb" style="--c:' + b.d.cover + ';--ci:' + b.d.ink + '">' + b.d.icon + '</span>' +
                    '<span><strong>' + highlight(b.d.title, query) + '</strong><small>' + esc(b.d.catLabel) + '</small></span></li>';
            }).join('');
            searchInput.setAttribute('aria-activedescendant', 'orbit-opt-' + sel);
        }
        results.hidden = false;
        searchInput.setAttribute('aria-expanded', 'true');
    }
    function closeResults() { results.hidden = true; searchInput.setAttribute('aria-expanded', 'false'); searchInput.removeAttribute('aria-activedescendant'); }
    searchInput.addEventListener('input', function () {
        query = norm(searchInput.value.trim()); sel = 0;
        applyFilters(); renderResults();
    });
    searchInput.addEventListener('focus', renderResults);
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!found.length) return;
            sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + found.length) % found.length;
            renderResults();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (found[sel]) { openFocus(found[sel].i); searchInput.blur(); }
        } else if (e.key === 'Escape') {
            searchInput.value = ''; query = ''; applyFilters(); closeResults(); searchInput.blur();
        }
    });
    results.addEventListener('pointerdown', function (e) {
        var li = e.target.closest('li[data-i]');
        if (li) { e.preventDefault(); openFocus(Number(li.dataset.i)); searchInput.blur(); }
    });
    searchInput.addEventListener('blur', function () { setTimeout(closeResults, 120); });

    // ------------------------------------------------------------------ selection ("shelf")
    var STORE = 'orbit-selection:' + location.pathname;
    var shelf = [];
    try { shelf = JSON.parse(localStorage.getItem(STORE) || '[]').filter(function (id) { return ITEMS.some(function (it) { return it.id === id; }); }); } catch (e) { shelf = []; }
    var shelfBtn = root.querySelector('.orbit-shelf-btn');
    var shelfDrop = root.querySelector('.orbit-shelf-drop');
    var shelfList = shelfDrop && shelfDrop.querySelector('ul');
    var shelfCta = shelfDrop && shelfDrop.querySelector('.btn');
    function saveShelf() { try { localStorage.setItem(STORE, JSON.stringify(shelf)); } catch (e) { /* private mode */ } }
    function renderShelf() {
        if (!HAS_SHELF) return;
        shelfBtn.querySelector('.count').textContent = String(shelf.length);
        shelfDrop.classList.toggle('is-empty', !shelf.length);
        shelfList.innerHTML = shelf.map(function (id) {
            var item = ITEMS.find(function (it) { return it.id === id; });
            var idx = ITEMS.indexOf(item);
            return '<li><button type="button" data-i="' + idx + '" style="--c:' + item.cover + ';--ci:' + item.ink + '" aria-label="' + esc(item.title) + '" title="' + esc(item.title) + '">' + item.icon + '</button></li>';
        }).join('');
        var picked = shelf.map(function (id) { return ITEMS.find(function (it) { return it.id === id; }); });
        var type = picked.length ? picked[0].contact : '';
        var params = new URLSearchParams();
        if (type) params.set('type', type);
        if (picked.length) params.set('offres', picked.map(function (it) { return it.title; }).join('|'));
        shelfCta.href = DATA.contact + (picked.length ? '?' + params.toString() : '');
    }
    function bump() {
        shelfBtn.classList.remove('bump'); void shelfBtn.offsetWidth; shelfBtn.classList.add('bump');
        setTimeout(function () { shelfBtn.classList.remove('bump'); }, 450);
    }
    function flyToShelf(i) {
        var from = books[i].el.querySelector('.cv').getBoundingClientRect();
        var to = shelfBtn.querySelector('.count').getBoundingClientRect();
        if (reduce || !from.width || !document.body.animate) { bump(); return; }
        var fly = document.createElement('div');
        fly.className = 'orbit-fly';
        fly.style.setProperty('--c', ITEMS[i].cover); fly.style.setProperty('--ci', ITEMS[i].ink);
        fly.style.width = from.width + 'px'; fly.style.height = from.height + 'px';
        fly.innerHTML = ITEMS[i].icon;
        document.body.appendChild(fly);
        var x0 = from.left, y0 = from.top, x1 = to.left + to.width / 2 - from.width / 2, y1 = to.top + to.height / 2 - from.height / 2;
        var mxp = (x0 + x1) / 2, myp = Math.min(y0, y1) - 160;
        fly.animate([
            { transform: 'translate(' + x0 + 'px,' + y0 + 'px) rotate(0deg) scale(1)', opacity: 1 },
            { transform: 'translate(' + mxp + 'px,' + myp + 'px) rotate(-14deg) scale(.5)', opacity: 1, offset: 0.55 },
            { transform: 'translate(' + x1 + 'px,' + y1 + 'px) rotate(-28deg) scale(.08)', opacity: 0.6 }
        ], { duration: 900, easing: 'cubic-bezier(.5,0,.3,1)' }).onfinish = function () { fly.remove(); bump(); };
    }
    function toggleShelf(i, animate) {
        var id = ITEMS[i].id, at = shelf.indexOf(id);
        if (at === -1) { shelf.push(id); if (animate) flyToShelf(i); else bump(); }
        else { shelf.splice(at, 1); bump(); }
        saveShelf(); renderShelf(); syncAdd();
    }
    function closeShelf() { if (HAS_SHELF) { shelfDrop.hidden = true; shelfBtn.setAttribute('aria-expanded', 'false'); } }
    if (HAS_SHELF) {
        shelfBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = shelfDrop.hidden;
            shelfDrop.hidden = !open; shelfBtn.setAttribute('aria-expanded', String(open));
        });
        shelfList.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-i]');
            if (btn) { closeShelf(); openFocus(Number(btn.dataset.i)); }
        });
        document.addEventListener('click', function (e) { if (!e.target.closest('.orbit-shelf')) closeShelf(); });
    }

    // ------------------------------------------------------------------ mini book in the headline
    var mini = root.querySelector('.mini');
    if (mini) {
        var inner = mini.querySelector('.mini-in'), faces = [mini.querySelector('.mini-f'), mini.querySelector('.mini-b')];
        var mIdx = 0, mAngle = 0, mFace = 0;
        function paint(face, item) { face.style.setProperty('--c', item.cover); face.style.setProperty('--ci', item.ink); face.innerHTML = item.icon; }
        paint(faces[0], ITEMS[0]);
        if (!reduce) setInterval(function () {
            if (!running) return;
            mIdx = (mIdx + 1) % ITEMS.length; mFace = 1 - mFace;
            paint(faces[mFace], ITEMS[mIdx]);
            mAngle += 180;
            inner.style.transform = 'rotateY(' + mAngle + 'deg)';
        }, 2600);
        mini.addEventListener('click', function () {
            if (mode !== 'orbit' || focus >= 0) return;
            books.forEach(function (b) {
                b.tilt = Math.round(Math.random() * 36 - 18);
                b.v.x += (Math.random() - 0.5) * 900; b.v.y += (Math.random() - 0.5) * 900;
                kick(b, 1.4);
            });
            phaseV += 0.04;
            toast(TEXT.shuffled);
        });
    }

    // ------------------------------------------------------------------ keyboard
    document.addEventListener('keydown', function (e) {
        var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
        if (e.key === '/' && !typing) { e.preventDefault(); searchInput.focus(); return; }
        if (focus < 0) return;
        if (e.key === 'Escape') { e.preventDefault(); closeFocus(); }
        else if (e.key === 'ArrowRight' && !typing) { e.preventDefault(); stepFocus(1); }
        else if (e.key === 'ArrowLeft' && !typing) { e.preventDefault(); stepFocus(-1); }
    });

    // ------------------------------------------------------------------ boot
    function boot() {
        layout();
        books.forEach(function (b) {
            b.p.x = W / 2; b.p.y = 0.53 * H; b.p.s = reduce ? 1 : 0.15; b.p.o = reduce ? 1 : 0; b.p.rz = b.tilt;
        });
        introAt = performance.now();
        renderShelf();
        root.classList.add('is-ready');
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) start(); else stop();
            }).observe(root);
        }
        document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
        window.addEventListener('resize', layout);
        start();
    }
    boot();

    window.__orbit = {
        open: openFocus, close: closeFocus, mode: setMode,
        get state() { return { mode: mode, focus: focus, active: activeList().length, shelf: shelf.slice(), W: W, H: H, BW: BW }; },
        book: function (i) { return books[i].p; }
    };
})();
