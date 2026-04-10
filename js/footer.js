const FAQS = [
  {cat:'Orders',q:'How do I track my order?',a:'Once your order is dispatched, you will receive an SMS and email with your tracking number. You can use this on the courier\'s website or contact us on WhatsApp with your order number for a real-time update.'},
  {cat:'Orders',q:'Can I cancel or modify my order?',a:'Orders can be cancelled or modified within 2 hours of placement, before processing begins. Please contact us immediately via WhatsApp or email. Once dispatched, cancellations are no longer possible.'},
  {cat:'Orders',q:'My order arrived damaged. What do I do?',a:'We sincerely apologise for this experience. Please take photos of the damaged item and packaging, then contact us within 48 hours of delivery. We will arrange a replacement or full refund at no cost to you.'},
  {cat:'Orders',q:'Can I place a bulk or corporate order?',a:'Yes! We accommodate bulk orders for businesses, events, and gifts. Please email corporate@lumiere.pk with your requirements and we will provide a custom quote within 48 hours.'},
  {cat:'Shipping',q:'How long does delivery take?',a:'Standard delivery takes 4–6 business days nationwide. Express (2–3 days) and Next Day options are available for major cities. Same-day delivery is available in Lahore for orders placed before 12pm.'},
  {cat:'Shipping',q:'Do you ship to all areas in Pakistan?',a:'Yes, we ship to all provinces and territories including Punjab, Sindh, KPK, Balochistan, AJK, and Gilgit-Baltistan. Remote areas may experience slightly longer delivery windows.'},
  {cat:'Shipping',q:'Is shipping really free?',a:'Yes — completely free on all orders, with no minimum cart value required. We believe delivery costs should never be a barrier to getting quality products.'},
  {cat:'Returns',q:'How do I return an item?',a:'Email returns@lumiere.pk with your order number and reason for return. We\'ll respond within 24 hours with a return authorisation and instructions. Items must be returned within 30 days of delivery.'},
  {cat:'Returns',q:'When will I receive my refund?',a:'Refunds are processed within 1–2 business days of receiving your return. Card refunds take 5–7 business days to appear; digital wallet refunds (JazzCash/EasyPaisa) are typically same or next business day.'},
  {cat:'Returns',q:'Can I exchange for a different size?',a:'Absolutely. We offer free size and colour exchanges within 30 days. Contact us with your preferred replacement and we\'ll arrange the swap, subject to availability.'},
  {cat:'Payment',q:'What payment methods are accepted?',a:'We accept all major credit and debit cards, JazzCash, EasyPaisa, and Cash on Delivery. All online payments are processed through a secure, encrypted gateway.'},
  {cat:'Payment',q:'Is it safe to pay online?',a:'Yes. Our payment gateway uses 256-bit SSL encryption and is PCI-DSS compliant. We never store your full card details on our servers.'},
  {cat:'Payment',q:'Can I pay in instalments?',a:'We are currently working on integrating instalment payment options. Stay tuned to our newsletter for updates — subscribe for early access.'},
  {cat:'Account',q:'Do I need an account to shop?',a:'No, you can checkout as a guest. However, creating an account gives you access to order history, saved addresses, faster checkout, and exclusive member discounts.'},
  {cat:'Account',q:'How do I reset my password?',a:'Click "Forgot password?" on the login page and enter your email address. You\'ll receive a reset link within a few minutes. Check your spam folder if it doesn\'t arrive.'},
  {cat:'Products',q:'Are the products authentic and quality-checked?',a:'Every product on LUMIÈRE is carefully curated and quality-checked before dispatch. We work directly with verified suppliers and artisans to ensure authenticity and craftsmanship.'},
  {cat:'Products',q:'Do you restock out-of-stock items?',a:'Most items are restocked periodically. You can click "Notify Me" on any out-of-stock product page to receive an email alert when it becomes available again.'},
];

/* ── Dark mode ── */
let darkMode = localStorage.getItem('lum_dark') === 'true';
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
  /* 'home' means go back to the main store */
  if (name === 'home') {
    window.location.href = 'index.html';
    return;
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById('page-' + name);
  if (!target) return;
  target.classList.add('active');

  /* Update the URL hash so the browser back button works */
  history.pushState(null, '', '#page-' + name);

  window.scrollTo(0, 0);
  if (name === 'faq') renderFAQ(FAQS);
}

/* ── Hash-based routing on load ──
   Reads the URL hash so that links like
   support_pages.html#page-faq open the right page directly */
function routeFromHash() {
  const hash = window.location.hash; /* e.g. "#page-faq" */
  if (hash && hash.startsWith('#page-')) {
    const name = hash.replace('#page-', '');
    const target = document.getElementById('page-' + name);
    if (target) {
      /* Hide all pages, show the target */
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      target.classList.add('active');
      if (name === 'faq') renderFAQ(FAQS);
      return;
    }
  }
  /* Default: show hub */
  const hub = document.getElementById('page-hub');
  if (hub) hub.classList.add('active');
}

/* ── FAQ renderer ── */
function renderFAQ(list) {
  const cats = [...new Set(list.map(f => f.cat))];
  const container = document.getElementById('faqList');
  if (!container) return;
  const parent = container.parentElement;
  parent.innerHTML = `
    <p class="section-label" style="margin-top:0">Help Centre</p>
    <h1 class="content-h1" style="margin-bottom:6px">Frequently Asked Questions</h1>
    <p class="content-p" style="margin-bottom:32px;font-size:15px">Can't find what you're looking for? <button style="color:var(--accent2);font-weight:500" onclick="goPage('contact')">Contact us →</button></p>
    ${cats.map(cat => `
      <div class="faq-category-title" style="margin-top:${cat === cats[0] ? '0' : '8px'}">${cat}</div>
      ${list.filter(f => f.cat === cat).map(f => `
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFaq(this)">
            <span>${f.q}</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-a">
            <div class="faq-a-inner">${f.a}</div>
          </div>
        </div>`).join('')}
    `).join('')}`;
}

function toggleFaq(btn) {
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    btn.nextElementSibling.classList.add('open');
  }
}

/* ── Sidebar scroll ── */
function scrollToSection(id, btn) {
  document.querySelectorAll('.sidebar-link').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Hub search ── */
function hubSearchFilter(q) {
  if (!q.trim()) return;
  const r = FAQS.filter(f =>
    f.q.toLowerCase().includes(q.toLowerCase()) ||
    f.a.toLowerCase().includes(q.toLowerCase())
  );
  goPage('faq');
  setTimeout(() => {
    const p = document.querySelector('#page-faq .content-body');
    if (!p) return;
    if (!r.length) {
      p.innerHTML = `<p class="section-label">Search Results</p>
        <h1 class="content-h1" style="margin-bottom:24px">No results for "${q}"</h1>
        <p class="content-p">Try different keywords or <button style="color:var(--accent2);font-weight:500" onclick="goPage('contact')">contact our team</button>.</p>`;
      return;
    }
    p.innerHTML = `<p class="section-label">Search Results</p>
      <h1 class="content-h1" style="margin-bottom:24px">${r.length} result${r.length !== 1 ? 's' : ''} for "${q}"</h1>
      ${r.map(f => `
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFaq(this)"><span>${f.q}</span><span class="faq-icon">+</span></button>
          <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
        </div>`).join('')}`;
  }, 100);
}

/* ── Contact form ── */
function submitContact() {
  const fname   = document.getElementById('cFname').value.trim();
  const email   = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value;
  const msg     = document.getElementById('cMessage').value.trim();

  if (!fname || !email || !subject || !msg) {
    showToast('Please fill all required fields', 'info');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email', 'info');
    return;
  }
  showToast("Message sent! We'll respond within 24 hours.", 'success');
  document.getElementById('cFname').value   = '';
  document.getElementById('cEmail').value   = '';
  document.getElementById('cSubject').value = '';
  document.getElementById('cMessage').value = '';
}

/* ── Browser back/forward ── */
window.addEventListener('popstate', routeFromHash);

/* ── Init: route on page load ── */
document.addEventListener('DOMContentLoaded', routeFromHash);
//footer
function goToHomeSection(sectionId) {
  window.location.href = "index.html#" + sectionId;
}