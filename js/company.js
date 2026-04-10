/* ════════════════════════════════════════
   EVERCARTO — company.js
   Handles About, Blog, Careers, Press pages
════════════════════════════════════════ */

/* ── Data ── */
const BLOG_POSTS = [
  { id:2, cat:'Home', title:'How to Style a Bookshelf Like a Designer', excerpt:'Rhythm, negative space, and the rule of odd numbers — the principles behind every beautiful shelf you\'ve ever admired.', image:'https://images.unsplash.com/photo-1512820790803-83ca734da794', date:'March 28, 2026', readTime:'4 min', featured:false },
  { id:3, cat:'Behind the Brand', title:'Meet the Artisan: Zara Ceramics, Lahore', excerpt:'We visit the studio behind our best-selling ceramic coffee set and talk craft, patience, and the beauty of imperfection.', image:'https://images.unsplash.com/photo-1578926288207-a90a5366759d', date:'March 20, 2026', readTime:'7 min', featured:false },
  { id:4, cat:'Wellness', title:'The Evening Ritual That Changed Everything', excerpt:'How a 20-minute wind-down routine — featuring three of our favourite wellness products — has improved sleep for 1,000+ customers.', image:'https://images.unsplash.com/photo-1600618528240-fb9fc964b853', date:'March 14, 2026', readTime:'6 min', featured:false },
  { id:5, cat:'Guides', title:'Caring for Cashmere: The Complete Guide', excerpt:'Everything you need to know about washing, storing, and preserving your cashmere pieces so they last a lifetime.', image:'https://images.unsplash.com/photo-1542060748-10c28b62716f', date:'March 8, 2026', readTime:'5 min', featured:false },
  { id:6, cat:'Style', title:'Accessorising Minimally — A Visual Guide', excerpt:'The counterintuitive truth about accessories: fewer, better pieces create far more impact than a collection of many.', image:'https://images.unsplash.com/photo-1519741497674-611481863552', date:'March 1, 2026', readTime:'4 min', featured:false },
  { id:7, cat:'Home', title:'Lighting as Mood: A Room-by-Room Breakdown', excerpt:'Why the wrong bulb temperature can ruin even the most beautifully furnished space, and how to fix it for under Rs 2,000.', image:'https://images.unsplash.com/photo-1505691938895-1758d7feb511', date:'Feb 22, 2026', readTime:'6 min', featured:false },
  { id:8, cat:'Behind the Brand', title:'Why We Chose Slow Growth Over Fast Scale', excerpt:'EVERCARTO co-founder Aisha Kamran on turning down investment, staying curated, and why less really is more.', image:'https://images.unsplash.com/photo-1556761175-b413da4baf72', date:'Feb 15, 2026', readTime:'8 min', featured:false },
  { id:9, cat:'Wellness', title:'Building a Morning Routine That Actually Sticks', excerpt:'The science-backed reason most morning routines fail, and the simple reframe that makes them work.', image:'https://images.unsplash.com/photo-1506126613408-eca07ce68773', date:'Feb 8, 2026', readTime:'5 min', featured:false },
];

const JOBS = [
  { dept:'Design', title:'Senior Product Designer', location:'Lahore / Remote', type:'Full-time', id:1 },
  { dept:'Engineering', title:'Frontend Engineer (React)', location:'Remote', type:'Full-time', id:2 },
  { dept:'Engineering', title:'Backend Engineer (Node.js)', location:'Remote', type:'Full-time', id:3 },
  { dept:'Marketing', title:'Content & Social Media Manager', location:'Lahore', type:'Full-time', id:4 },
  { dept:'Marketing', title:'Paid Ads Specialist', location:'Remote', type:'Contract', id:5 },
  { dept:'Operations', title:'Logistics & Fulfilment Coordinator', location:'Lahore', type:'Full-time', id:6 },
  { dept:'Curation', title:'Product Buyer & Curator', location:'Lahore / Remote', type:'Full-time', id:7 },
  { dept:'Customer Experience', title:'CX Specialist (Urdu & English)', location:'Lahore', type:'Part-time', id:8 },
];

const PRESS_COVERAGE = [
  { source:'Dawn', title:'EVERCARTO is quietly redefining how Pakistanis shop for their homes', excerpt:'The Lahore-based platform has carved a distinct niche — luxury aesthetics at accessible prices — and customers are noticing.', date:'March 2026' },
  { source:'Vogue Pakistan', title:'The Edit: 10 Brands Making Pakistani Design Worth Celebrating', excerpt:'Among the standouts this season, EVERCARTO continues to set the standard for considered, beautifully curated lifestyle retail.', date:'February 2026' },
  { source:'TechJuice', title:'How a Two-Person Side Project Became One of Pakistan\'s Fastest-Growing E-Commerce Brands', excerpt:'From Instagram page to 42,000 customers — the EVERCARTO story is one of patience, curation, and genuine product love.', date:'January 2026' },
  { source:'Tribune', title:'Buying Beautiful: The Rise of Conscious Consumerism in Pakistan', excerpt:'EVERCARTO is cited as a leading example of a brand that has successfully paired aesthetic appeal with ethical sourcing practices.', date:'December 2025' },
  { source:'SHE Magazine', title:'Gift Guide: The EVERCARTO Edit for the Design-Conscious Woman', excerpt:'For the woman who already has everything — or everything ordinary — the EVERCARTO collection offers something genuinely special.', date:'November 2025' },
  { source:'Business Recorder', title:'Pakistan E-Commerce: Brands That Survived the Market Correction', excerpt:'While many platforms scaled back, EVERCARTO doubled down on curation and customer experience — and grew 40% year-on-year.', date:'October 2025' },
];

const PRESS_RELEASES = [
  { date:'Apr 2026', title:'EVERCARTO Launches New Home Decor Collection with Five Pakistani Artisans', excerpt:'The Spring 2026 collection features handcrafted ceramics, woven textiles, and stone decoratives sourced directly from artisan studios across Lahore, Multan, and Peshawar.' },
  { date:'Feb 2026', title:'EVERCARTO Expands Free Shipping to All 7 Provinces and Territories', excerpt:'Following strong demand from customers in KPK, Balochistan, and GB, EVERCARTO announces nationwide free standard shipping at no minimum order value.' },
  { date:'Dec 2025', title:'EVERCARTO Reaches 40,000 Customers Milestone', excerpt:'The brand celebrates four years of operation and 40,000 customers served, with a 4.9-star average rating across all product categories.' },
  { date:'Sep 2025', title:'EVERCARTO Partners with Cruelty-Free Wellness Brand Ruh Collective', excerpt:'A new exclusive wellness category launches on the platform, featuring Ruh Collective\'s award-winning essential oil and aromatherapy line.' },
  { date:'Jun 2025', title:'New Packaging Initiative: EVERCARTO Moves to 100% Recyclable Materials', excerpt:'Starting July 2025, all EVERCARTO orders will be shipped in FSC-certified recyclable boxes and tissue paper, eliminating single-use plastic from the fulfilment process.' },
];

/* ── State ── */
let darkMode = localStorage.getItem('lum_dark') === 'true';
let activeBlogCat = 'All';
let activeJobDept = 'All';
let visiblePosts = 6;

/* ── Dark mode ── */
if (darkMode) {
  document.body.classList.add('dark');
  const btn = document.getElementById('darkBtn');
  if (btn) btn.textContent = '☀️';
}
function toggleDark() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);
  const btn = document.getElementById('darkBtn');
  if (btn) btn.textContent = darkMode ? '☀️' : '🌙';
  localStorage.setItem('lum_dark', darkMode);
}

/* ── Toast ── */
function showToast(msg, type = 'success') {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity .3s';
    setTimeout(() => t.remove(), 300);
  }, 2800);
}

/* ── Page navigation ── */
function goPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + name);
  if (!target) return;
  target.classList.add('active');
  history.pushState(null, '', '#page-' + name);
  window.scrollTo(0, 0);
  initPage(name);
}

function initPage(name) {
  if (name === 'blog')    renderBlog();
  if (name === 'careers') renderCareers();
  if (name === 'press')   renderPress();
}

/* ── Hash routing ── */
function routeFromHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#page-')) {
    const name = hash.replace('#page-', '');
    const target = document.getElementById('page-' + name);
    if (target) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      target.classList.add('active');
      initPage(name);
      return;
    }
  }
  /* Default: about */
  const about = document.getElementById('page-about');
  if (about) about.classList.add('active');
}

/* ══════════════════════════════
   BLOG
══════════════════════════════ */
function renderBlog() {
  const posts = activeBlogCat === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.cat === activeBlogCat);

  /* Featured */
  const featured = posts.find(p => p.featured) || posts[0];
  const featEl = document.getElementById('blogFeatured');
  if (featEl && featured) {
    featEl.innerHTML = `
      <div class="blog-feat-img">
      <img src="${featured.image}" alt="${featured.title}">
    </div>
      <div class="blog-feat-body">
        <span class="blog-tag">${featured.cat}</span>
        <div class="blog-feat-title" onclick="showToast('Opening article…','info')">${featured.title}</div>
        <div class="blog-feat-meta">
          <span>${featured.date}</span>
          <span>·</span>
          <span>${featured.readTime} read</span>
          <span class="blog-tag" style="background:var(--bg2);color:var(--txt3)">Featured</span>
        </div>
        <p class="blog-feat-excerpt">${featured.excerpt}</p>
        <button class="btn-primary" style="width:fit-content;padding:11px 24px;font-size:12px;margin-top:4px" onclick="showToast('Opening article…','info')">Read Article →</button>
      </div>`;
  }

  /* Grid (rest, up to visiblePosts) */
  const rest = posts.filter(p => p.id !== (featured ? featured.id : -1));
  const visible = rest.slice(0, visiblePosts);
  const gridEl = document.getElementById('blogGrid');
  if (gridEl) {
    gridEl.innerHTML = visible.map(p => `
      <div class="blog-card" onclick="showToast('Opening article…','info')">
        <div class="blog-card-img">
        <img src="${p.image}" alt="${p.title}">
      </div>
        <div class="blog-card-body">
          <span class="blog-tag">${p.cat}</span>
          <div class="blog-card-title">${p.title}</div>
          <p class="blog-card-excerpt">${p.excerpt}</p>
          <div class="blog-card-meta">
            <span>${p.date}</span>
            <span>·</span>
            <span>${p.readTime} read</span>
          </div>
        </div>
      </div>`).join('');
  }

  /* Load more button */
  const btn = document.getElementById('loadMoreBtn');
  if (btn) btn.style.display = rest.length > visiblePosts ? 'inline-block' : 'none';
}

function filterBlog(cat, el) {
  activeBlogCat = cat;
  visiblePosts = 6;
  document.querySelectorAll('.blog-cat-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderBlog();
}

function loadMorePosts() {
  visiblePosts += 6;
  renderBlog();
}

/* ══════════════════════════════
   CAREERS
══════════════════════════════ */
function renderCareers() {
  const depts = ['All', ...new Set(JOBS.map(j => j.dept))];

  /* Filter bar */
  const fb = document.getElementById('jobFilterBar');
  if (fb) {
    fb.innerHTML = depts.map(d => `
      <button class="blog-cat-btn ${d === activeJobDept ? 'active' : ''}"
        onclick="filterJobs('${d}',this)">${d}</button>`).join('');
  }

  renderJobList();
}

function filterJobs(dept, el) {
  activeJobDept = dept;
  document.querySelectorAll('#jobFilterBar .blog-cat-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderJobList();
}

function renderJobList() {
  const filtered = activeJobDept === 'All'
    ? JOBS
    : JOBS.filter(j => j.dept === activeJobDept);

  const count = document.getElementById('jobCount');
  if (count) count.textContent = `${filtered.length} open position${filtered.length !== 1 ? 's' : ''}`;

  const list = document.getElementById('jobList');
  if (!list) return;

  list.innerHTML = filtered.map(j => `
    <div class="job-item" onclick="openJobModal(${j.id})">
      <span class="job-dept">${j.dept}</span>
      <span class="job-title">${j.title}</span>
      <div class="job-meta">
        <span class="job-badge">📍 ${j.location}</span>
        <span class="job-badge">${j.type}</span>
        <span class="job-arrow">→</span>
      </div>
    </div>`).join('');
}

function openJobModal(id) {
  const j = JOBS.find(x => x.id === id);
  if (!j) return;
  showToast(`Opening: ${j.title}`, 'info');
}

/* ══════════════════════════════
   PRESS
══════════════════════════════ */
function renderPress() {
  /* Coverage cards */
  const grid = document.getElementById('pressGrid');
  if (grid) {
    grid.innerHTML = PRESS_COVERAGE.map(p => `
      <div class="press-card" onclick="showToast('Opening article…','info')">
        <div class="press-source">${p.source}</div>
        <div class="press-title">${p.title}</div>
        <p class="press-excerpt">${p.excerpt}</p>
        <div class="press-meta">
          <span>${p.date}</span>
          <span class="press-read-link">Read Article →</span>
        </div>
      </div>`).join('');
  }

  /* Press releases */
  const releases = document.getElementById('releasesList');
  if (releases) {
    releases.innerHTML = PRESS_RELEASES.map(r => `
      <div class="release-item">
        <div class="release-date">${r.date}</div>
        <div>
          <div class="release-title" onclick="showToast('Opening release…','info')">${r.title}</div>
          <p class="release-excerpt">${r.excerpt}</p>
        </div>
      </div>`).join('');
  }
}

/* ── Browser navigation ── */
window.addEventListener('popstate', routeFromHash);
document.addEventListener('DOMContentLoaded', routeFromHash);
