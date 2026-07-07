// nevenspooner.com
// Content (projects + writing) is loaded from /data/*.json and rendered here,
// so adding a new project or post only means appending one object to the JSON.

(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function getJSON(path) {
    return fetch(path).then(function (res) {
      if (!res.ok) throw new Error('Could not load ' + path);
      return res.json();
    });
  }

  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  // ---------- Home: work + writing lists ----------

  function renderHome() {
    var workList = document.getElementById('work-list');
    var writingList = document.getElementById('writing-list');
    if (!workList && !writingList) return;

    if (workList) {
      getJSON('data/projects.json').then(function (projects) {
        workList.innerHTML = projects.map(function (p) {
          return '' +
            '<a class="work-item" href="project.html?p=' + encodeURIComponent(p.slug) + '">' +
              '<div class="work-item__row">' +
                '<h3>' + esc(p.title) + '</h3>' +
                '<span class="work-item__cta">' + esc(p.cardCta) + ' \u2192</span>' +
              '</div>' +
              '<p>' + esc(p.blurb) + '</p>' +
              '<p class="work-item__stack">' + esc(p.stack) + '</p>' +
            '</a>';
        }).join('');
      }).catch(reportError);
    }

    if (writingList) {
      getJSON('data/posts.json').then(function (posts) {
        writingList.innerHTML = posts.map(function (b) {
          return '' +
            '<a class="note" href="post.html?post=' + encodeURIComponent(b.slug) + '">' +
              '<div class="note__row">' +
                '<h3>' + esc(b.title) + '</h3>' +
                '<span class="note__cta">Read \u2192</span>' +
              '</div>' +
              '<div class="note__teaser">' + esc(b.teaser) + '</div>' +
            '</a>';
        }).join('');
      }).catch(reportError);
    }
  }

  // ---------- Project detail ----------

  function renderProject() {
    var root = document.getElementById('project-root');
    if (!root) return;

    getJSON('data/projects.json').then(function (projects) {
      var slug = param('p');
      var p = projects.filter(function (x) { return x.slug === slug; })[0] || projects[0];
      document.title = p.title + ' · Neven Spooner';

      var services = p.services.map(function (s) {
        return '<div class="stack__row">' +
          '<div class="stack__name">' + esc(s.name) + '</div>' +
          '<div class="stack__role">' + esc(s.role) + '</div></div>';
      }).join('');

      var flow = p.flow.map(function (group) {
        var steps = group.steps.map(function (step, i) {
          var num = (i + 1 < 10 ? '0' : '') + (i + 1);
          return '<div class="flow__step">' +
            '<div class="flow__num">' + num + '</div>' +
            '<div class="flow__text">' + esc(step) + '</div></div>';
        }).join('');
        return '<div class="flow__group"><h3>' + esc(group.heading) + '</h3>' + steps + '</div>';
      }).join('');

      var decisions = p.decisions.map(function (d) {
        return '<div class="decision">' +
          '<div class="decision__title">' + esc(d.title) + '</div>' +
          '<div class="decision__body">' + esc(d.body) + '</div></div>';
      }).join('');

      var learnings = p.learnings.map(function (l) {
        return '<div class="learning">' +
          '<div class="learning__title">' + esc(l.title) + '</div>' +
          '<div class="learning__body">' + esc(l.body) + '</div></div>';
      }).join('');

      var next = p.next.map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('');

      var live = p.demo
        ? '<a class="btn btn--live" href="' + esc(p.demo) + '">LIVE DEMO \u2197</a>'
        : '';

      root.innerHTML = '' +
        '<div class="doc__bar">' +
          '<a class="doc__back" href="index.html">\u2190 Neven Spooner</a>' +
          '<span class="doc__tag">' + esc(p.tag) + '</span>' +
        '</div>' +
        '<header class="doc__header">' +
          '<div class="glow"></div>' +
          '<p class="doc__kicker">PROJECT ' + esc(p.number) + '</p>' +
          '<h1>' + esc(p.title) + '</h1>' +
          '<p class="doc__tagline">' + esc(p.tagline) + '</p>' +
          '<div class="doc__actions">' +
            '<a class="btn" href="' + esc(p.repo) + '">CODE \u2197</a>' + live +
          '</div>' +
        '</header>' +
        '<section class="doc-section"><p class="doc__overview">' + esc(p.overview) + '</p></section>' +
        '<section class="doc-section"><p class="doc-section__label">THE STACK</p>' + services + '</section>' +
        '<section class="doc-section"><p class="doc-section__label">HOW IT WORKS</p>' + flow + '</section>' +
        '<section class="doc-section"><p class="doc-section__label">WHY IT\'S BUILT THIS WAY</p><div class="decisions">' + decisions + '</div></section>' +
        '<section class="doc-section"><p class="doc-section__label">WHAT I LEARNED</p>' + learnings + '</section>' +
        '<section class="doc-section"><p class="doc-section__label">WHAT\'S NEXT</p><div class="next">' + next + '</div></section>';
    }).catch(reportError);
  }

  // ---------- Writing detail ----------

  function renderPost() {
    var root = document.getElementById('post-root');
    if (!root) return;

    getJSON('data/posts.json').then(function (posts) {
      var slug = param('post');
      var b = posts.filter(function (x) { return x.slug === slug; })[0] || posts[0];
      document.title = b.title + ' · Neven Spooner';

      var body = b.body.map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('');

      root.innerHTML = '' +
        '<div class="doc__bar">' +
          '<a class="doc__back" href="index.html">\u2190 Neven Spooner</a>' +
          '<span class="doc__tag">FIELD NOTES</span>' +
        '</div>' +
        '<header class="doc__header doc__header--narrow">' +
          '<div class="glow"></div>' +
          '<p class="doc__kicker">' + esc(b.kicker) + ', FROM THE ' + esc(b.from) + '</p>' +
          '<h1>' + esc(b.title) + '</h1>' +
        '</header>' +
        '<article class="post">' +
          '<p class="post__lead">' + esc(b.lead) + '</p>' + body +
          '<div class="takeaway">' +
            '<p class="takeaway__label">THE TAKEAWAY</p>' +
            '<p>' + esc(b.takeaway) + '</p>' +
          '</div>' +
          '<p class="post__more"><a href="project.html?p=' + encodeURIComponent(b.projectSlug) + '">See the project this came from \u2192</a></p>' +
        '</article>';
    }).catch(reportError);
  }

  // ---------- Nav scroll-spy + section reveal (home only) ----------

  function initScrollSpy() {
    var ids = ['about', 'work', 'writing', 'contact'];
    var sections = ids
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    if (!sections.length) return;

    // Apple-style reveal: fade + rise on enter, fade on leave.
    sections.forEach(function (el) { el.classList.add('reveal'); });
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-in', entry.isIntersecting);
      });
    }, { rootMargin: '-10% 0px -12% 0px', threshold: 0.1 });
    sections.forEach(function (el) { reveal.observe(el); });

    // Deterministic scroll-spy: active link is the last section whose top has
    // crossed a line at 40% of the viewport. Correct scrolling both ways.
    var links = {};
    document.querySelectorAll('.nav__links a[data-nav]').forEach(function (a) {
      links[a.getAttribute('data-nav')] = a;
    });

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var line = window.innerHeight * 0.4;
        var current = '';
        sections.forEach(function (el) {
          if (el.getBoundingClientRect().top <= line) current = el.id;
        });
        Object.keys(links).forEach(function (key) {
          links[key].classList.toggle('is-active', key === current);
        });
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  function reportError(err) {
    console.error(err);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHome();
    renderProject();
    renderPost();
    initScrollSpy();
  });
})();
