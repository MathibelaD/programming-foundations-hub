/* Programming Foundations — router, progress tracking, search. No backend. */
(function () {
  'use strict';

  var KEY = {
    done: 'pfh.done', checks: 'pfh.checks', theme: 'pfh.theme', last: 'pfh.last', stages: 'pfh.stages',
    quiz: 'pfh.quiz', steps: 'pfh.steps', mode: 'pfh.mode'
  };
  var index = null, project = null, searchDocs = null, flat = [];
  var main = document.getElementById('main');
  var lessonKeys = null;   // arrow-key handler for the open lesson, if any

  /* ---------- storage (never trusted, always guarded) ------------------ */
  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
  }
  var done = load(KEY.done, {});
  var checks = load(KEY.checks, {});
  var stages = load(KEY.stages, {});
  var quiz = load(KEY.quiz, {});        // "lessonId::n" -> { pick, ok, tries, revealed }
  var stepAt = load(KEY.steps, {});     // lessonId -> { at, seen: [..] }
  var mode = load(KEY.mode, 'steps');   // 'steps' | 'full'

  function isDone(id) { return !!done[id]; }
  function setDone(id, on) {
    if (on) done[id] = new Date().toISOString(); else delete done[id];
    save(KEY.done, done);
  }

  /* ---------- theme ---------------------------------------------------- */
  var theme = 'dark';
  try { theme = localStorage.getItem(KEY.theme) || 'dark'; } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-btn').addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY.theme, theme); } catch (e) {}
  });

  /* ---------- helpers -------------------------------------------------- */
  function esc(s) { return LessonRender.escape(s); }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function two(n) { return String(n).padStart(2, '0'); }

  function phaseStats(p) {
    var c = p.lessons.filter(function (l) { return isDone(l.id); }).length;
    return { done: c, total: p.lessons.length, pct: pct(c, p.lessons.length) };
  }
  function courseStats() {
    var total = flat.length;
    var c = flat.filter(function (l) { return isDone(l.id); }).length;
    return { done: c, total: total, pct: pct(c, total) };
  }
  function phaseOf(lesson) {
    return index.phases.find(function (p) { return p.id === lesson.id.split('/')[0]; });
  }
  function lessonChips(l) {
    var b = l.blocks || {}, out = ['<span class="chip chip-time">' + l.minutes + ' min</span>'];
    if (b.quiz) out.push('<span class="chip chip-quiz">' + b.quiz + ' knowledge check' + (b.quiz > 1 ? 's' : '') + '</span>');
    if (b.exercise) out.push('<span class="chip chip-exercise">' + b.exercise + ' exercise' + (b.exercise > 1 ? 's' : '') + '</span>');
    if (b.project) out.push('<span class="chip chip-project">project work</span>');
    return out.join('');
  }

  /* ---------- sidebar -------------------------------------------------- */
  function renderSidebar(activeId) {
    var nav = document.getElementById('nav');
    var openPhase = activeId ? activeId.split('/')[0] : null;
    nav.innerHTML = index.phases.map(function (p) {
      var s = phaseStats(p);
      var isOpen = p.id === openPhase || (!openPhase && p.order === 0);
      return '<details class="nav-phase"' + (isOpen ? ' open' : '') + '>' +
        '<summary>' +
          '<span class="nav-num">' + two(p.order) + '</span>' +
          '<span class="nav-title">' + esc(p.title) + '</span>' +
          '<span class="nav-count' + (s.pct === 100 ? ' complete' : '') + '">' + s.done + '/' + s.total + '</span>' +
        '</summary>' +
        '<ul>' + p.lessons.map(function (l) {
          return '<li><a href="#/' + l.id + '" class="' +
            (l.id === activeId ? 'active ' : '') + (isDone(l.id) ? 'done' : '') + '">' +
            '<span class="tick">' + (isDone(l.id) ? '✓' : '') + '</span>' + esc(l.title) + '</a></li>';
        }).join('') + '</ul></details>';
    }).join('');

    var cs = courseStats();
    document.getElementById('sp-pct').textContent = cs.pct + '%';
    document.getElementById('sp-bar').style.width = cs.pct + '%';
    document.getElementById('sp-meta').textContent = cs.done + ' of ' + cs.total + ' lessons complete';
  }

  /* ---------- views ---------------------------------------------------- */
  function viewHome() {
    var t = index.totals, cs = courseStats();
    var last = null;
    try { last = localStorage.getItem(KEY.last); } catch (e) {}
    var next = flat.find(function (l) { return !isDone(l.id); }) || flat[0];
    var resume = (last && byId(last) && !isDone(last)) ? byId(last) : next;
    var rp = phaseOf(resume);

    main.innerHTML =
      '<div class="page home">' +
      '<section class="hero">' +
        '<div class="hero-copy">' +
          '<p class="eyebrow">Never written code before? Start here.</p>' +
          '<h1>Learn to think like a programmer, one small step at a time.</h1>' +
          '<p class="lede">Short steps, each followed by a quick check that you really got it. ' +
          'You run every example on your own computer, and you build one real program, <strong>Budget Buddy</strong>, as you go.</p>' +
        '</div>' +
        '<a class="next-card" href="#/' + resume.id + '">' +
          '<span class="nc-label">' + (cs.done ? 'Pick up where you left off' : 'Your first lesson') + '</span>' +
          '<span class="nc-phase">Phase ' + two(rp.order) + ' · ' + esc(rp.title) + '</span>' +
          '<strong class="nc-title">' + esc(resume.title) + '</strong>' +
          '<span class="nc-meta">' + resume.minutes + ' min' + (resume.blocks && resume.blocks.quiz ? ' · ' + resume.blocks.quiz + ' checks' : '') + '</span>' +
          '<span class="nc-go">' + (cs.done ? 'Continue' : 'Start') + ' →</span>' +
          '<span class="nc-progress"><span class="bar"><i style="width:' + cs.pct + '%"></i></span>' +
            '<span>' + cs.done + ' of ' + cs.total + ' lessons done</span></span>' +
        '</a>' +
      '</section>' +

      '<section class="how">' + [
        ['Read one short step', 'Lessons open one section at a time, so there is only ever one idea on screen.'],
        ['Type it and run it', 'Keep your editor next to this page. Reading is not learning; running code is.'],
        ['Check yourself', 'A knowledge check ends each key step. It uses new code, so it tests understanding, not memory.'],
        ['Build Budget Buddy', 'Each phase ends by adding what you learnt to one program that grows with you.']
      ].map(function (s, i) {
        return '<div class="how-step"><span class="how-num">' + (i + 1) + '</span><strong>' + s[0] + '</strong><p>' + s[1] + '</p></div>';
      }).join('') + '</section>' +

      '<div class="section-head"><h2>The path</h2><span>' + t.lessons + ' lessons · about ' + Math.round(t.minutes / 60) + ' hours · go in order</span></div>' +
      '<section class="phase-grid">' + index.phases.map(function (p) {
        var s = phaseStats(p);
        return '<a class="phase-card' + (s.pct === 100 ? ' complete' : '') + (p.id === rp.id ? ' current' : '') + '" href="#/' + p.lessons[0].id + '">' +
          '<span class="pc-num">Phase ' + two(p.order) + (p.id === rp.id ? ' · you are here' : '') + '</span>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p>' + esc(p.blurb) + '</p>' +
          '<div class="bar"><i style="width:' + s.pct + '%"></i></div>' +
          '<span class="pc-meta">' + s.done + '/' + s.total + ' lessons</span></a>';
      }).join('') + '</section>' +
      '</div>';
  }

  function viewRoadmap() {
    main.innerHTML = '<div class="page">' +
      '<h1>Roadmap</h1>' +
      '<p class="lede">Go through the phases in order. Each phase uses what the phases before it taught, so skipping ahead ' +
      'usually means getting lost later. Each phase says what you will be able to do by the end of it.</p>' +
      '<ol class="roadmap">' + index.phases.map(function (p) {
        var s = phaseStats(p);
        return '<li class="' + (s.pct === 100 ? 'complete' : s.done ? 'started' : '') + '">' +
          '<div class="rm-head"><span class="rm-num">' + two(p.order) + '</span>' +
          '<h2>' + esc(p.title) + '</h2><span class="rm-count">' + s.done + '/' + s.total + '</span></div>' +
          (p.goal ? '<p class="rm-goal"><strong>You can do this at the end:</strong> ' + esc(p.goal) + '</p>' : '') +
          '<ul class="rm-lessons">' + p.lessons.map(function (l) {
            return '<li><a href="#/' + l.id + '" class="' + (isDone(l.id) ? 'done' : '') + '">' +
              '<span class="tick">' + (isDone(l.id) ? '✓' : '○') + '</span>' + esc(l.title) +
              '<em>' + l.minutes + ' min</em></a></li>';
          }).join('') + '</ul></li>';
      }).join('') + '</ol></div>';
  }

  function viewProject() {
    var st = project.stages;
    main.innerHTML = '<div class="page">' +
      '<h1>' + esc(project.name) + '</h1>' +
      '<p class="lede">' + esc(project.summary) + '</p>' +
      '<div class="callout-plain"><strong>Where the code lives:</strong> in a folder called <code>budget-buddy</code> on <em>your</em> computer, created in Phase 1. ' +
      'Every stage adds to the code you already wrote. You never start over. Tick a stage once it runs on your machine.</div>' +
      '<ol class="stages">' + st.map(function (s, i) {
        var key = 'stage' + (i + 1);
        return '<li class="' + (stages[key] ? 'complete' : '') + '">' +
          '<label class="stage-check"><input type="checkbox" data-stage="' + key + '"' + (stages[key] ? ' checked' : '') + '><span></span></label>' +
          '<div><div class="stage-head"><h2>Stage ' + (i + 1) + ' · ' + esc(s.title) + '</h2>' +
          '<span class="stage-phase">' + esc(s.phases) + '</span></div>' +
          '<p>' + esc(s.goal) + '</p>' +
          '<ul class="stage-list">' + s.deliverables.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
          '<p class="stage-run"><code>' + esc(s.run) + '</code></p></div></li>';
      }).join('') + '</ol></div>';

    main.querySelectorAll('[data-stage]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        stages[cb.dataset.stage] = cb.checked;
        save(KEY.stages, stages);
        cb.closest('li').classList.toggle('complete', cb.checked);
      });
    });
  }

  function byId(id) { return flat.find(function (l) { return l.id === id; }); }

  function viewLesson(id) {
    var lesson = byId(id);
    if (!lesson) return view404(id);
    var i = flat.indexOf(lesson), prev = flat[i - 1], next = flat[i + 1];
    var phase = phaseOf(lesson);

    main.innerHTML = '<div class="page lesson"><p class="loading">Loading…</p></div>';
    fetch(lesson.path + '?v=' + encodeURIComponent(index.generated))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (raw) {
        var body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
        main.innerHTML =
          '<div class="lesson-layout">' +
          '<article class="lesson">' +
            '<header class="lesson-head">' +
              '<p class="crumb"><a href="#/roadmap">Phase ' + two(phase.order) + '</a> · ' + esc(phase.title) + '</p>' +
              '<h1>' + esc(lesson.title) + '</h1>' +
              (lesson.summary ? '<p class="lede">' + esc(lesson.summary) + '</p>' : '') +
              '<div class="lesson-meta">' + lessonChips(lesson) + '</div>' +
            '</header>' +
            '<div class="stepper" id="stepper"></div>' +
            '<div class="prose" id="prose">' + LessonRender.render(body) + '</div>' +
            '<nav class="step-nav" id="step-nav"></nav>' +
            '<footer class="lesson-foot" id="lesson-foot">' +
              '<div class="finish" id="finish"></div>' +
              '<nav class="pager">' +
                (prev ? '<a class="pg prev" href="#/' + prev.id + '"><span>Previous lesson</span><strong>' + esc(prev.title) + '</strong></a>' : '<span></span>') +
                (next ? '<a class="pg next" href="#/' + next.id + '"><span>Next lesson</span><strong>' + esc(next.title) + '</strong></a>' : '<span></span>') +
              '</nav>' +
            '</footer>' +
          '</article>' +
          '<aside class="rail" id="rail" aria-label="Lesson outline"></aside>' +
          '</div>';
        try { localStorage.setItem(KEY.last, lesson.id); } catch (e) {}
        renderSidebar(lesson.id);
        wireLesson(lesson, location.hash.split('#')[2]);
      })
      .catch(function (err) {
        if (window.console) console.error(err);
        main.innerHTML = '<div class="page"><h1>Could not load this lesson</h1>' +
          '<p>Expected <code>' + esc(lesson.path) + '</code>. If you opened <code>index.html</code> directly from disk, ' +
          'the browser blocks local file reads — start the local server instead:</p>' +
          '<pre><code>./serve.sh</code></pre></div>';
      });
  }

  /* ---------- lesson: steps, knowledge checks, outline ----------------- */
  var WRAP_UP = '.cx-connect, .cx-challenge, .cx-recap, .cx-interview, .cx-checkpoint, .cx-resources';

  // Split the rendered lesson into steps: one per "##" section, plus a final
  // wrap-up step for the review blocks that close every lesson.
  function buildSteps(prose) {
    var kids = Array.prototype.slice.call(prose.children), steps = [], cur = null;
    var lastH2 = -1, wrapAt = -1;
    kids.forEach(function (el, n) { if (el.tagName === 'H2') lastH2 = n; });
    for (var n = lastH2 + 1; n < kids.length; n++) if (kids[n].matches(WRAP_UP)) { wrapAt = n; break; }

    kids.forEach(function (el, n) {
      if (n === wrapAt) {
        cur = { title: 'Wrap-up and review', id: 'wrap-up', els: [] };
        steps.push(cur);
      } else if (el.tagName === 'H2' || !cur) {
        cur = { title: el.tagName === 'H2' ? el.textContent.replace(/^#/, '').trim() : 'Introduction', id: el.id || 'intro', els: [] };
        steps.push(cur);
      }
      cur.els.push(el);
    });
    // A heading with nothing under it (e.g. "Real-world uses" followed straight by the wrap-up) joins the next step.
    steps = steps.filter(function (s, k) {
      if (s.els.length === 1 && s.els[0].tagName === 'H2' && steps[k + 1]) {
        steps[k + 1].els.unshift(s.els[0]);
        return false;
      }
      return true;
    });

    steps.forEach(function (s, k) {
      var wrap = document.createElement('section');
      wrap.className = 'step';
      wrap.dataset.step = k;
      prose.appendChild(wrap);
      s.els.forEach(function (el) { wrap.appendChild(el); });
      s.el = wrap;
      s.quizzes = Array.prototype.slice.call(wrap.querySelectorAll('[data-quiz]'));
    });
    return steps;
  }

  function quizState(key) { return quiz[key] || null; }
  function quizStatus(key) {
    var q = quizState(key);
    if (!q) return 'open';
    if (q.ok) return q.tries === 1 ? 'right' : 'late';
    return q.revealed ? 'revealed' : 'trying';
  }

  function wireQuiz(el, key, onChange) {
    var opts = Array.prototype.slice.call(el.querySelectorAll('.quiz-opt'));
    var check = el.querySelector('.quiz-check');
    var feedback = el.querySelector('.quiz-feedback');
    var reveal = el.querySelector('.quiz-reveal');
    var explain = el.querySelector('.quiz-explain');
    var picked = null;

    function correctOpt() { return opts.find(function (o) { return o.hasAttribute('data-correct'); }); }
    function select(o) {
      picked = o;
      opts.forEach(function (x) { x.setAttribute('aria-checked', x === o ? 'true' : 'false'); });
      check.disabled = !o;
    }
    function finish(message, cls) {
      opts.forEach(function (o) { o.disabled = true; });
      correctOpt().classList.add('is-right');
      explain.hidden = false;
      check.hidden = true;
      reveal.hidden = true;
      feedback.textContent = message;
      feedback.className = 'quiz-feedback ' + cls;
      el.classList.add('is-finished');
    }
    function paint(state) {
      if (!state) return;
      (state.wrong || []).forEach(function (n) { opts[n] && opts[n].classList.add('is-wrong'); opts[n] && (opts[n].disabled = true); });
      if (state.ok) finish(state.tries === 1 ? 'Correct, first time.' : 'Correct.', 'good');
      else if (state.revealed) finish('Here is the answer. Read why, then try the next one.', 'meh');
      else if (state.tries) {
        feedback.textContent = 'Not quite. Have another look, or reveal the answer.';
        feedback.className = 'quiz-feedback bad';
        reveal.hidden = false;
      }
    }

    opts.forEach(function (o) {
      o.addEventListener('click', function () { if (!o.disabled) select(o); });
    });
    check.addEventListener('click', function () {
      if (!picked) return;
      var state = quiz[key] || { tries: 0, wrong: [] };
      state.tries += 1;
      state.pick = +picked.dataset.i;
      if (picked.hasAttribute('data-correct')) state.ok = true;
      else { state.wrong.push(state.pick); picked.setAttribute('aria-checked', 'false'); select(null); }
      quiz[key] = state;
      save(KEY.quiz, quiz);
      paint(state);
      onChange();
    });
    reveal.addEventListener('click', function () {
      var state = quiz[key] || { tries: 0, wrong: [] };
      state.revealed = true;
      quiz[key] = state;
      save(KEY.quiz, quiz);
      paint(state);
      onChange();
    });
    paint(quizState(key));
  }

  function wireLesson(lesson, target) {
    var prose = document.getElementById('prose');
    var stepper = document.getElementById('stepper');
    var stepNav = document.getElementById('step-nav');
    var foot = document.getElementById('lesson-foot');
    var rail = document.getElementById('rail');

    // Heading anchors must keep the lesson in the URL, or the router treats them as a page.
    prose.querySelectorAll('a.anchor').forEach(function (a) {
      a.setAttribute('href', '#/' + lesson.id + a.getAttribute('href'));
    });

    // Checkbox persistence for checkpoints and exercise task lists.
    prose.querySelectorAll('input[type="checkbox"]').forEach(function (box, n) {
      var key = lesson.id + '::' + n;
      box.disabled = false;
      box.checked = !!checks[key];
      box.closest('li') && box.closest('li').classList.toggle('checked', box.checked);
      box.addEventListener('change', function () {
        checks[key] = box.checked;
        if (!box.checked) delete checks[key];
        save(KEY.checks, checks);
        box.closest('li') && box.closest('li').classList.toggle('checked', box.checked);
      });
    });

    prose.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var code = btn.closest('figure').querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(function () {
          btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1200);
        });
      });
    });

    prose.querySelectorAll('details.cx').forEach(function (d) {
      d.addEventListener('toggle', function () {
        var t = d.querySelector('.cx-toggle');
        if (t) t.textContent = d.open ? 'hide' : 'show';
      });
    });

    var steps = buildSteps(prose);
    var memo = stepAt[lesson.id] || { at: 0, seen: [0] };
    var at = Math.min(memo.at || 0, steps.length - 1);
    var seen = {};
    (memo.seen || []).forEach(function (n) { seen[n] = true; });

    prose.querySelectorAll('[data-quiz]').forEach(function (el, n) {
      el.dataset.key = lesson.id + '::q' + n;
      wireQuiz(el, el.dataset.key, function () { paintRail(); paintNav(); });
    });

    function quizzesIn(s) { return s.quizzes.map(function (q) { return quizStatus(q.dataset.key); }); }
    function stepStatus(s, k) {
      var qs = quizzesIn(s);
      if (qs.length && qs.every(function (x) { return x === 'right' || x === 'late'; })) return 'passed';
      if (qs.some(function (x) { return x === 'revealed'; })) return 'revealed';
      return seen[k] ? 'seen' : 'unseen';
    }

    function paintRail() {
      var all = Array.prototype.slice.call(prose.querySelectorAll('[data-quiz]'));
      var right = all.filter(function (q) { var s = quizStatus(q.dataset.key); return s === 'right' || s === 'late'; }).length;
      var firstTry = all.filter(function (q) { return quizStatus(q.dataset.key) === 'right'; }).length;
      var tried = all.some(function (q) { return quizStatus(q.dataset.key) !== 'open'; });
      rail.innerHTML =
        '<div class="rail-inner">' +
          '<div class="mode-switch" role="group" aria-label="Reading mode">' +
            '<button type="button" data-mode="steps" aria-pressed="' + (mode === 'steps') + '">One step at a time</button>' +
            '<button type="button" data-mode="full" aria-pressed="' + (mode === 'full') + '">Whole lesson</button>' +
          '</div>' +
          '<p class="rail-label">In this lesson</p>' +
          '<ol class="rail-steps">' + steps.map(function (s, k) {
            var st = stepStatus(s, k);
            return '<li class="rs-' + st + (k === at ? ' current' : '') + '"><a href="#/' + lesson.id + '#' + s.id + '" data-step="' + k + '">' +
              '<span class="rs-dot">' + (st === 'passed' ? '✓' : k + 1) + '</span>' +
              '<span class="rs-title">' + esc(s.title) + '</span>' +
              (s.quizzes.length ? '<span class="rs-q" title="Knowledge checks in this step">' + s.quizzes.length + '?</span>' : '') +
              '</a></li>';
          }).join('') + '</ol>' +
          (all.length ?
            '<div class="rail-card"><div class="rc-row"><span>Knowledge checks</span><strong>' + right + ' / ' + all.length + '</strong></div>' +
            '<div class="bar"><i style="width:' + pct(right, all.length) + '%"></i></div>' +
            '<p>' + (right === all.length ? 'All done' + (firstTry === all.length ? ', every one first time. Nice.' : '. Nice work.') :
              !tried ? 'Key steps end with a check. It uses new code on purpose, so it tests understanding, not memory.' :
              'Getting one wrong is normal: read the explanation, then carry on. That is where the learning happens.') + '</p></div>' : '') +
          '<div class="rail-card rail-tip"><strong>Tip</strong><p>Put your code editor next to this page. Type every example yourself; do not copy and paste.</p></div>' +
        '</div>';

      rail.querySelectorAll('[data-mode]').forEach(function (b) {
        b.addEventListener('click', function () { setMode(b.dataset.mode); });
      });
      rail.querySelectorAll('a[data-step]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var k = +a.dataset.step;
          if (mode === 'steps') go(k, true);
          else steps[k].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    function paintNav() {
      if (mode !== 'steps') { stepper.hidden = true; stepNav.hidden = true; foot.hidden = false; paintFinish(); return; }
      var s = steps[at], last = at === steps.length - 1;
      stepper.hidden = false;
      stepper.innerHTML =
        '<div class="stepper-row"><span class="stepper-count">Step ' + (at + 1) + ' of ' + steps.length + '</span>' +
        '<span class="stepper-title">' + esc(s.title) + '</span></div>' +
        '<div class="segments">' + steps.map(function (x, k) {
          return '<button type="button" class="seg seg-' + stepStatus(x, k) + (k === at ? ' current' : '') + (k < at ? ' before' : '') +
            '" data-step="' + k + '" title="' + esc(x.title) + '" aria-label="Step ' + (k + 1) + ': ' + esc(x.title) + '"></button>';
        }).join('') + '</div>';
      stepper.querySelectorAll('[data-step]').forEach(function (b) {
        b.addEventListener('click', function () { go(+b.dataset.step, true); });
      });

      var open = s.quizzes.filter(function (q) { var st = quizStatus(q.dataset.key); return st === 'open' || st === 'trying'; }).length;
      stepNav.hidden = false;
      stepNav.innerHTML =
        (at > 0 ? '<button type="button" class="btn sn-prev" data-go="' + (at - 1) + '">← Back</button>' : '<span></span>') +
        (open ? '<span class="sn-note">' + (open === 1 ? 'There is a knowledge check above.' : 'There are ' + open + ' knowledge checks above.') + ' Try it before you move on.</span>' : '<span class="sn-note"></span>') +
        (!last ? '<button type="button" class="btn ' + (open ? '' : 'primary ') + 'sn-next" data-go="' + (at + 1) + '"><span>Next</span><strong>' + esc(steps[at + 1].title) + '</strong></button>' : '<span></span>');
      stepNav.querySelectorAll('[data-go]').forEach(function (b) {
        b.addEventListener('click', function () { go(+b.dataset.go, true); });
      });
      foot.hidden = !last;
      if (last) paintFinish();
    }

    function paintFinish() {
      var box = document.getElementById('finish');
      box.innerHTML = '<button class="btn primary complete-btn" id="complete-btn"></button>';
      var btn = document.getElementById('complete-btn');
      function paint() {
        btn.textContent = isDone(lesson.id) ? '✓ Lesson complete (click to undo)' : 'Mark lesson complete';
        btn.classList.toggle('is-done', isDone(lesson.id));
      }
      btn.addEventListener('click', function () { setDone(lesson.id, !isDone(lesson.id)); paint(); renderSidebar(lesson.id); });
      paint();
    }

    function go(k, scroll) {
      at = Math.max(0, Math.min(steps.length - 1, k));
      seen[at] = true;
      stepAt[lesson.id] = { at: at, seen: Object.keys(seen).map(Number) };
      save(KEY.steps, stepAt);
      steps.forEach(function (s, n) { s.el.hidden = mode === 'steps' && n !== at; });
      paintNav();
      paintRail();
      if (scroll) stepper.scrollIntoView({ block: 'start' });
    }

    function setMode(m) {
      mode = m;
      save(KEY.mode, mode);
      document.body.classList.toggle('mode-full', mode === 'full');
      go(at, false);
      if (mode === 'full') steps[at].el.scrollIntoView({ block: 'start' });
      else stepper.scrollIntoView({ block: 'start' });
    }

    // In whole-lesson mode, the outline follows your scroll position.
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        if (mode !== 'full') return;
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var k = +e.target.dataset.step;
          if (k === at) return;
          at = k; seen[k] = true;
          stepAt[lesson.id] = { at: at, seen: Object.keys(seen).map(Number) };
          save(KEY.steps, stepAt);
          paintRail();
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      steps.forEach(function (s) { spy.observe(s.el); });
    }

    lessonKeys = function (e) {
      if (mode !== 'steps' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
      if (e.key === 'ArrowRight' && at < steps.length - 1) { e.preventDefault(); go(at + 1, true); }
      if (e.key === 'ArrowLeft' && at > 0) { e.preventDefault(); go(at - 1, true); }
    };

    document.body.classList.toggle('mode-full', mode === 'full');
    var el = target && document.getElementById(target);
    var hit = el && steps.findIndex(function (s) { return s.el.contains(el); });
    if (el && hit > -1) {
      go(hit, false);
      el.scrollIntoView();
    } else {
      go(at, false);
      window.scrollTo(0, 0);
    }
  }

  function view404(id) {
    main.innerHTML = '<div class="page"><h1>Not found</h1><p><code>' + esc(id || '') +
      '</code> is not a lesson in this course.</p><p><a href="#/">Back to the start</a></p></div>';
  }

  /* ---------- search --------------------------------------------------- */
  var modal = document.getElementById('search-modal');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var cursor = 0, hits = [];

  function openSearch() {
    modal.hidden = false; input.value = ''; results.innerHTML = ''; input.focus();
    if (!searchDocs) fetch('content/search.json').then(function (r) { return r.json(); })
      .then(function (d) { searchDocs = d; runSearch(); });
  }
  function closeSearch() { modal.hidden = true; }

  function runSearch() {
    var q = input.value.trim().toLowerCase();
    if (!q || !searchDocs) { results.innerHTML = ''; hits = []; return; }
    var terms = q.split(/\s+/);
    hits = searchDocs.map(function (d) {
      var title = d.t.toLowerCase(), body = d.b.toLowerCase(), heads = d.h.join(' ').toLowerCase();
      var score = 0, snippet = '';
      terms.forEach(function (term) {
        if (title.indexOf(term) > -1) score += 12;
        if (heads.indexOf(term) > -1) score += 5;
        if (d.s.toLowerCase().indexOf(term) > -1) score += 4;
        var at = body.indexOf(term);
        if (at > -1) { score += 1; if (!snippet) snippet = d.b.slice(Math.max(0, at - 60), at + 90); }
      });
      return { d: d, score: score, snippet: snippet };
    }).filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; }).slice(0, 12);

    cursor = 0;
    results.innerHTML = hits.length ? hits.map(function (r, i) {
      return '<a class="sr' + (i === 0 ? ' sel' : '') + '" href="#/' + r.d.id + '">' +
        '<span class="sr-phase">' + esc(r.d.p) + '</span>' +
        '<strong>' + esc(r.d.t) + '</strong>' +
        '<span class="sr-snip">' + esc(r.snippet || r.d.s) + '</span></a>';
    }).join('') : '<p class="sr-empty">No matches for “' + esc(input.value) + '”.</p>';
  }

  function moveCursor(delta) {
    var els = results.querySelectorAll('.sr');
    if (!els.length) return;
    els[cursor] && els[cursor].classList.remove('sel');
    cursor = (cursor + delta + els.length) % els.length;
    els[cursor].classList.add('sel');
    els[cursor].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', runSearch);
  document.getElementById('search-trigger').addEventListener('click', openSearch);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeSearch(); });
  results.addEventListener('click', function (e) { if (e.target.closest('.sr')) closeSearch(); });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); return; }
    if (modal.hidden) {
      if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); return; }
      if (lessonKeys) lessonKeys(e);
      return;
    }
    if (e.key === 'Escape') closeSearch();
    else if (e.key === 'ArrowDown') { e.preventDefault(); moveCursor(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveCursor(-1); }
    else if (e.key === 'Enter') { var el = results.querySelectorAll('.sr')[cursor]; if (el) { location.hash = el.getAttribute('href'); closeSearch(); } }
  });

  /* ---------- mobile nav ----------------------------------------------- */
  var sidebar = document.getElementById('sidebar'), scrim = document.getElementById('scrim');
  function toggleNav(on) {
    sidebar.classList.toggle('open', on);
    scrim.classList.toggle('show', on);
  }
  document.getElementById('menu-btn').addEventListener('click', function () { toggleNav(!sidebar.classList.contains('open')); });
  scrim.addEventListener('click', function () { toggleNav(false); });

  /* ---------- router --------------------------------------------------- */
  function route() {
    var path = location.hash.replace(/^#\/?/, '').split('#')[0];
    toggleNav(false);
    lessonKeys = null;
    document.body.classList.remove('mode-full');
    document.body.classList.toggle('on-lesson', !!path && path !== 'roadmap' && path !== 'project');
    if (!path) { renderSidebar(null); return viewHome(); }
    if (path === 'roadmap') { renderSidebar(null); return viewRoadmap(); }
    if (path === 'project') { renderSidebar(null); return viewProject(); }
    viewLesson(path);
  }

  Promise.all([
    fetch('content/index.json').then(function (r) { return r.json(); }),
    fetch('content/project.json').then(function (r) { return r.json(); })
  ]).then(function (data) {
    index = data[0]; project = data[1];
    index.phases.forEach(function (p) { p.lessons.forEach(function (l) { flat.push(l); }); });
    window.addEventListener('hashchange', route);
    route();
  }).catch(function () {
    main.innerHTML = '<div class="page"><h1>Content index missing</h1>' +
      '<p>Run the build script, then start the server:</p><pre><code>python3 tools/build.py\n./serve.sh</code></pre>' +
      '<p>If you opened this file directly from disk, the browser will not allow it to read local content — use the server.</p></div>';
  });
})();
