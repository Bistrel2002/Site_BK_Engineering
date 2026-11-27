/* Shared by every page: mobile menu, contact form, reveal-on-scroll.
   Plain script, no module, no dependency: it also runs where WebGL does not. */
(function () {
    'use strict';
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Mobile menu ---------------------------------------------------------
    function setupMenu() {
        var toggle = document.querySelector('.menu-toggle');
        var menu = document.getElementById('mobile-menu');
        if (!toggle || !menu) return;
        function set(open) {
            toggle.setAttribute('aria-expanded', String(open));
            document.body.classList.toggle('menu-open', open);
            menu.hidden = !open;
            if (open) { var first = menu.querySelector('a'); if (first) first.focus(); }
        }
        toggle.addEventListener('click', function () { set(toggle.getAttribute('aria-expanded') !== 'true'); });
        menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { set(false); toggle.focus(); }
        });
        window.addEventListener('resize', function () { if (window.innerWidth > 820) set(false); });
    }

    // ---- Contact form ------------------------------------------------------------
    // Posts JSON to data-endpoint when one is configured, in the shape
    // {type, data: {name, email, subject, message}}; on any failure, or without an
    // endpoint, it opens the visitor's mail client with the same message prefilled.
    function fields(form) {
        var data = new FormData(form);
        var get = function (name) { return String(data.get(name) || '').trim(); };
        var labelOf = function (name) {
            var el = form.elements[name];
            if (!el || !el.options) return get(name);
            var opt = el.options[el.selectedIndex];
            return opt && opt.value ? opt.textContent.trim() : '';
        };
        return {
            name: get('name'), email: get('email'), company: get('company'), phone: get('phone'),
            type: labelOf('type'), budget: labelOf('budget'), message: get('message') || get('project'),
            trap: get('website')
        };
    }
    function compose(form) {
        var f = fields(form);
        var prefix = form.dataset.subject || 'Demande de contact';
        var subject = prefix + (f.type ? ' · ' + f.type : '') + ' · ' + f.name + (f.company ? ' (' + f.company + ')' : '');
        var lines = [
            'Nom : ' + f.name, 'E-mail : ' + f.email,
            f.company ? 'Entreprise : ' + f.company : null, f.phone ? 'Téléphone : ' + f.phone : null,
            f.type ? 'Type de demande : ' + f.type : null, f.budget ? 'Budget estimé : ' + f.budget : null,
            '', f.message
        ].filter(function (line) { return line !== null; });
        // For the API: name and e-mail travel as their own fields, so the message keeps
        // the rest, and the subject is the request type (what the confirmation e-mail quotes).
        var details = [
            f.company ? 'Entreprise : ' + f.company : null, f.phone ? 'Téléphone : ' + f.phone : null,
            f.budget ? 'Budget estimé : ' + f.budget : null
        ].filter(function (line) { return line !== null; });
        var apiMessage = (details.length ? details.join('\n') + '\n\n' : '') + (form.dataset.messageLabel || 'Description du besoin :') + '\n' + f.message;
        return { fields: f, subject: subject, body: lines.join('\n'),
                 apiSubject: f.type || form.dataset.apiSubject || 'Demande de contact', apiMessage: apiMessage };
    }
    function mailto(form) {
        var c = compose(form);
        var to = form.dataset.email;
        if (!to) return null;
        return 'mailto:' + to + '?subject=' + encodeURIComponent(c.subject) + '&body=' + encodeURIComponent(c.body);
    }
    function status(form, kind, text) {
        var el = form.querySelector('.form-status');
        if (!el) return;
        el.textContent = text;
        el.dataset.kind = kind;
    }
    function setupForms() {
        // Prefill the request type from the URL: /contact?type=candidature
        var params = new URLSearchParams(window.location.search);
        document.querySelectorAll('form[data-site-form]').forEach(function (form) {
            var wanted = params.get('type');
            if (wanted && form.elements.type) {
                var select = form.elements.type;
                for (var i = 0; i < select.options.length; i++) if (select.options[i].value === wanted) select.selectedIndex = i;
            }
            // Offers picked in an orbit selection: /contact?offres=A|B
            var offers = (params.get('offres') || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 12);
            var box = form.elements.message || form.elements.project;
            if (offers.length && box && !box.value) {
                box.value = (form.dataset.offersIntro || 'Les offres qui m’intéressent :') + '\n' +
                    offers.map(function (o) { return '- ' + o.slice(0, 80); }).join('\n') + '\n\n';
            }
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!form.reportValidity()) return;
                var c = compose(form);
                if (c.fields.trap) { status(form, 'ok', form.dataset.ok || 'Merci.'); form.reset(); return; }   // bot
                var fallback = function () {
                    var link = mailto(form);
                    status(form, 'info', form.dataset.fallback || 'Votre messagerie va s’ouvrir avec le message prêt à envoyer.');
                    if (link) window.location.href = link;
                };
                var endpoint = form.dataset.endpoint;
                if (!endpoint || !window.fetch) { fallback(); return; }
                var button = form.querySelector('[type=submit]');
                if (button) button.disabled = true;
                status(form, 'busy', form.dataset.busy || 'Envoi en cours…');
                var controller = window.AbortController ? new AbortController() : null;
                var timer = setTimeout(function () { if (controller) controller.abort(); }, 12000);
                fetch(endpoint, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: form.dataset.kind || 'contact', data: {
                        name: c.fields.name, email: c.fields.email, subject: c.apiSubject, message: c.apiMessage } }),
                    signal: controller ? controller.signal : undefined
                }).then(function (response) {
                    clearTimeout(timer);
                    if (!response.ok) throw new Error('HTTP ' + response.status);
                    status(form, 'ok', form.dataset.ok || 'Message envoyé. Nous revenons vers vous rapidement.');
                    form.reset();
                }).catch(function () {
                    clearTimeout(timer);
                    fallback();
                }).then(function () { if (button) button.disabled = false; });
            });
        });
        window.__siteForm = { mailto: mailto, compose: compose };
    }

    // ---- Reveal on scroll (inner pages) ------------------------------------------
    function setupReveal() {
        var items = document.querySelectorAll('[data-reveal]');
        if (!items.length) return;
        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-in'); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        items.forEach(function (el) { io.observe(el); });
    }

    // ---- Timelines: the rail fills with the scroll, the step in view lights up ----
    function setupTimelines() {
        document.querySelectorAll('[data-timeline]').forEach(function (list) {
            var steps = Array.prototype.slice.call(list.querySelectorAll('.tl-step'));
            var section = list.closest('section');
            var links = section ? Array.prototype.slice.call(section.querySelectorAll('.tl-index a')) : [];
            var ticking = false;
            function update() {
                ticking = false;
                var box = list.getBoundingClientRect();
                var mark = window.innerHeight * 0.55;              // reading line
                var progress = Math.max(0, Math.min(1, (mark - box.top - 26) / Math.max(1, box.height - 52)));
                list.style.setProperty('--tl-progress', progress.toFixed(4));
                var current = 0;
                steps.forEach(function (step, i) {
                    var reached = step.getBoundingClientRect().top < mark;
                    step.classList.toggle('is-reached', reached);
                    if (reached) current = i;
                });
                steps.forEach(function (step, i) { step.classList.toggle('is-current', i === current); });
                links.forEach(function (link, i) { link.classList.toggle('is-current', i === current); });
            }
            function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
            window.addEventListener('scroll', request, { passive: true });
            window.addEventListener('resize', request);
            update();
        });
    }

    // ---- Motion emblem: tilts toward the pointer, leaves with the scroll -----------
    function setupMotionEmblem() {
        var emblem = document.querySelector('[data-motion-emblem]');
        if (!emblem) return;
        var cst = document.querySelector('[data-constellation]');
        if (cst && !reduceMotion) { setupFlight(emblem, cst); return; }
        if (cst) {   // reduced motion: the finished drawing sits still at the centre of the rings
            var core = cst.querySelector('[data-cst-core]');
            if (core) core.appendChild(emblem.cloneNode(true));
        }
        if (reduceMotion) return;
        var hero = emblem.closest('.page-hero') || document.body;
        var target = { x: 0, y: 0 }, now = { x: 0, y: 0 }, running = false;
        function frame() {
            now.x += (target.x - now.x) * 0.08;
            now.y += (target.y - now.y) * 0.08;
            var sp = Math.max(0, Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight)));
            emblem.style.setProperty('--rx', (now.x * 10).toFixed(2) + 'deg');
            emblem.style.setProperty('--ry', (now.y * -8).toFixed(2) + 'deg');
            emblem.style.setProperty('--sp', sp.toFixed(3));
            running = Math.abs(target.x - now.x) > 0.001 || Math.abs(target.y - now.y) > 0.001;
            if (running) requestAnimationFrame(frame);
        }
        function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }
        hero.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') return;
            var box = emblem.getBoundingClientRect();
            target.x = Math.max(-1, Math.min(1, (e.clientX - (box.left + box.width / 2)) / (box.width * 1.4)));
            target.y = Math.max(-1, Math.min(1, (e.clientY - (box.top + box.height / 2)) / (box.height * 1.4)));
            kick();
        });
        hero.addEventListener('pointerleave', function () { target.x = 0; target.y = 0; kick(); });
        window.addEventListener('scroll', kick, { passive: true });
        kick();
    }

    // ---- Flight: the hero emblem falls out of the hero, travels hidden behind the page,
    // rises into the constellation section, then its points light up one by one ----------
    function setupFlight(emblem, cst) {
        var root = document.documentElement;
        var hero = emblem.closest('.page-hero');
        var track = cst.querySelector('.cst-track');
        var core = cst.querySelector('[data-cst-core]');
        if (!hero || !track || !core) return;
        root.classList.add('js-flight');
        // The emblem moves to a fixed layer under the content; a placeholder keeps its place.
        var slot = document.createElement('div');
        slot.className = 'emblem emblem-motion emblem-slot';
        slot.setAttribute('aria-hidden', 'true');
        emblem.parentNode.insertBefore(slot, emblem);
        var layer = document.createElement('div');
        layer.className = 'flight';
        layer.setAttribute('aria-hidden', 'true');
        document.body.appendChild(layer);
        layer.appendChild(emblem);
        var points = Array.prototype.slice.call(cst.querySelectorAll('.cst-point'));
        var counter = cst.querySelector('[data-cst-current]');
        var progress = cst.querySelector('.cst-ring-progress');
        var ticking = false;
        function clamp(v) { return Math.max(0, Math.min(1, v)); }
        function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
        function update() {
            ticking = false;
            var vh = window.innerHeight;
            var s = slot.getBoundingClientRect(), base = s.width || 1;
            var tr = track.getBoundingClientRect(), c = core.getBoundingClientRect();
            var p = clamp(window.scrollY / (hero.offsetHeight * 0.95));     // hero: falling
            var start = vh * 0.72;                                           // title well in view
            var q = clamp((start - tr.top) / start);                         // constellation: coming back
            var t = clamp(-tr.top / Math.max(1, tr.height - vh));            // pinned: points
            var x, y, sc = 1, rx = 0, ry = 0, rz = 0, op = 0;
            if (q > 0) {
                // It comes back out from the top, just under the title, small, then grows as it
                // travels to the centre until it fills the screen on its own; once pinned it
                // settles to its place in the rings while they open around it.
                var e = ease(q), target = c.width / base;
                var big = Math.min(vh * 0.9, window.innerWidth * 0.92) / base;
                var small = Math.min(target * 0.3, 150 / base);
                var k = clamp(q / 0.18);                                     // the first moments: emerging
                var underTitle = tr.top + small * base / 2 + 8 - (1 - k) * 70;
                x = c.left + c.width / 2;
                y = underTitle * (1 - e) + (c.top + c.height / 2) * e;
                var settle = ease(clamp((t - 0.07) / 0.13));
                sc = (small + (big - small) * e) * (1 - settle) + target * settle;
                rx = -40 * (1 - e); ry = -360 * (1 - e);                     // one full turn, face on at both ends
                op = c.bottom < -40 ? 0 : k;
            } else if (p < 1) {
                var e2 = ease(p);
                var y0 = s.top + window.scrollY + s.height / 2;               // where it sat at the top
                x = s.left + s.width / 2;
                y = y0 + e2 * (vh + base * 0.6 - y0);
                sc = 1 - 0.3 * e2;
                rx = 58 * e2; rz = 24 * e2;
                op = 1 - clamp((p - 0.6) / 0.4);
            }
            if (op > 0) {
                emblem.style.width = emblem.style.height = base + 'px';
                emblem.style.transform = 'translate3d(' + (x - base / 2).toFixed(1) + 'px,' + (y - base / 2).toFixed(1) + 'px,0) ' +
                    'perspective(1200px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) ' +
                    'rotateZ(' + rz.toFixed(2) + 'deg) scale(' + sc.toFixed(4) + ')';
            }
            emblem.style.opacity = op.toFixed(3);
            emblem.style.visibility = op > 0.01 ? 'visible' : 'hidden';
            // The logo alone first, then the rings open, then one point per stretch of scroll.
            cst.style.setProperty('--draw', clamp((t - 0.12) / 0.12).toFixed(3));
            var n = points.length, first = 0.26, seg = (0.95 - first) / Math.max(1, n);
            var shown = t < first ? 0 : Math.min(n, Math.floor((t - first) / seg) + 1);
            points.forEach(function (pt, i) {
                pt.classList.toggle('is-on', i < shown);
                pt.classList.toggle('is-active', i === shown - 1);
            });
            // One blue arc, from the top of the ring to the point in focus; it moves a step
            // at a time (a CSS transition), not with every pixel of scroll.
            var arc = shown ? parseFloat(points[shown - 1].dataset.arc) || 0 : 0;
            if (progress && progress.dataset.arc !== String(arc)) {
                progress.dataset.arc = String(arc);
                progress.style.strokeDashoffset = String(1 - arc);
                progress.style.opacity = shown ? '1' : '0';
            }
            if (counter) counter.textContent = (shown < 10 ? '0' : '') + Math.max(1, shown);
        }
        function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
        window.addEventListener('scroll', request, { passive: true });
        window.addEventListener('resize', request);
        update();
    }

    // ---- Statements: the words light up one by one as the reader scrolls ------------
    function setupStatements() {
        document.querySelectorAll('[data-statement]').forEach(function (el) {
            var words = Array.prototype.slice.call(el.querySelectorAll('.w'));
            if (reduceMotion) { words.forEach(function (w) { w.classList.add('is-lit'); }); return; }
            var ticking = false;
            function update() {
                ticking = false;
                var box = el.getBoundingClientRect(), vh = window.innerHeight;
                var p = (vh * 0.82 - box.top) / Math.max(1, box.height + vh * 0.32);
                var lit = Math.round(Math.max(0, Math.min(1, p)) * words.length);
                words.forEach(function (w, i) { w.classList.toggle('is-lit', i < lit); });
            }
            function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
            window.addEventListener('scroll', request, { passive: true });
            window.addEventListener('resize', request);
            update();
        });
    }

    // ---- Counters: figures count up the first time they come into view -------------
    function setupCounters() {
        var items = document.querySelectorAll('[data-count]');
        if (!items.length || reduceMotion || !('IntersectionObserver' in window)) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                var el = entry.target, end = parseInt(el.dataset.count, 10), start = null;
                function step(t) {
                    if (start === null) start = t;
                    var k = Math.min(1, (t - start) / 1600);
                    el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
                    if (k < 1) requestAnimationFrame(step);
                }
                el.textContent = '0';
                requestAnimationFrame(step);
            });
        }, { threshold: 0.6 });
        items.forEach(function (el) { io.observe(el); });
    }

    // ---- Home: static layout if the 3D never started ---------------------------
    function watchHome() {
        if (!document.body.classList.contains('page-home')) return;
        setTimeout(function () { if (!window.__glassSite) document.body.classList.add('no-webgl'); }, 7000);
    }

    function start() {
        setupMenu(); setupForms(); setupReveal(); setupTimelines();
        setupMotionEmblem(); setupStatements(); setupCounters(); watchHome();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
