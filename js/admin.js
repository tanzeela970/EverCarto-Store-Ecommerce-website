/* ═══════════════════════════════════════════════════
   LUMIÈRE Admin Dashboard — admin.js
   Pure frontend, localStorage-driven
═══════════════════════════════════════════════════ */

/* ── Constants ── */
const USD_TO_PKR = 278;
const pkr = usd => Math.round(usd * USD_TO_PKR);
const fmtPKR = n => 'Rs ' + Math.round(n).toLocaleString('en-PK');
const fmtDate = d => new Date(d).toLocaleDateString('en-PK',{day:'2-digit',month:'short',year:'numeric'});

/* ── Seed product data (mirrors script.js) ── */
const SEED_PRODUCTS = [
  {id:1,name:"Volcanic Stone Vase",category:"Home Decor",price:89,oldPrice:120,rating:4.8,reviews:124,image:"assets/vase.png",tag:"New",stock:true,popular:450,desc:"Hand-crafted volcanic stone vase with a matte finish."},
  {id:2,name:"Linen Midi Dress",category:"Clothing",price:145,oldPrice:null,rating:4.6,reviews:89,image:"assets/dress.jpeg",tag:"New",stock:true,popular:312,desc:"Effortlessly elegant linen midi dress crafted from 100% premium linen."},
  {id:3,name:"Wireless Earbuds Pro",category:"Electronics",price:199,oldPrice:249,rating:4.9,reviews:342,image:"assets/ear-bud.jpeg",tag:"Sale",stock:true,popular:890,desc:"Premium wireless earbuds with active noise cancellation."},
  {id:4,name:"Aromatherapy Set",category:"Wellness",price:68,oldPrice:null,rating:4.7,reviews:67,image:"assets/aroma1.png",tag:null,stock:true,popular:234,desc:"Curated collection of 4 hand-poured soy wax candles."},
  {id:5,name:"Minimal Watch",category:"Accessories",price:320,oldPrice:400,rating:4.9,reviews:201,image:"assets/watch.webp",tag:"Sale",stock:true,popular:678,desc:"Swiss-made quartz movement with Milanese mesh strap."},
  {id:6,name:"Cashmere Throw",category:"Home Decor",price:215,oldPrice:null,rating:4.8,reviews:156,image:"assets/cashmre.jpg",tag:null,stock:true,popular:445,desc:"Luxuriously soft pure cashmere throw blanket."},
  {id:7,name:"Ceramic Coffee Set",category:"Home Decor",price:112,oldPrice:140,rating:4.5,reviews:88,image:"assets/cofee.webp",tag:null,stock:false,popular:321,desc:"Artisan-crafted ceramic coffee set including 2 mugs."},
  {id:8,name:"Merino Turtleneck",category:"Clothing",price:175,oldPrice:null,rating:4.7,reviews:142,image:"assets/wool_sweater.webp",tag:"New",stock:true,popular:567,desc:"Fine merino wool turtleneck with a relaxed yet refined fit."},
  {id:9,name:"Smart Desk Lamp",category:"Electronics",price:159,oldPrice:199,rating:4.6,reviews:213,image:"assets/lamp.jpg",tag:"Sale",stock:true,popular:423,desc:"Minimalist desk lamp with wireless charging pad."},
  {id:10,name:"Leather Card Holder",category:"Accessories",price:55,oldPrice:null,rating:4.8,reviews:189,image:"assets/cardholder.jpg",tag:null,stock:true,popular:731,desc:"Hand-stitched full-grain leather card holder."},
  {id:11,name:"Plant Mist Diffuser",category:"Wellness",price:79,oldPrice:null,rating:4.4,reviews:56,image:"assets/plant mist.webp",tag:null,stock:true,popular:189,desc:"Ultrasonic essential oil diffuser with 8-hour runtime."},
  {id:12,name:"Woven Storage Basket",category:"Home Decor",price:48,oldPrice:null,rating:4.3,reviews:43,image:"assets/wellness.jpeg",tag:null,stock:true,popular:178,desc:"Hand-woven seagrass storage basket with leather handles."},
];

const SEED_CATEGORIES = [
  {id:1,name:"Home Decor",image:"assets/home-decor.jpeg",active:true},
  {id:2,name:"Clothing",image:"assets/clothing.jpeg",active:true},
  {id:3,name:"Electronics",image:"assets/electronic.jpeg",active:true},
  {id:4,name:"Wellness",image:"assets/wellness.jpeg",active:true},
  {id:5,name:"Accessories",image:"assets/jewellry.jpeg",active:true},
];

const SEED_COUPONS = [
  {id:1,code:"LUMIERE15",type:"Percent",value:15,minOrder:0,uses:142,maxUses:500,expiry:"2026-12-31",active:true},
  {id:2,code:"WELCOME",type:"Percent",value:10,minOrder:0,uses:88,maxUses:200,expiry:"2026-12-31",active:true},
  {id:3,code:"SAVE15",type:"Percent",value:15,minOrder:5000,uses:37,maxUses:100,expiry:"2026-06-30",active:true},
  {id:4,code:"FLAT500",type:"Fixed",value:500,minOrder:10000,uses:14,maxUses:50,expiry:"2026-09-30",active:false},
];

const DEMO_CUSTOMERS = [
  {id:1,name:"Fatima Khan",email:"fatima@email.com",city:"Lahore",orders:5,spent:42800,joined:"2024-11-15"},
  {id:2,name:"Hamza Raza",email:"hamza@email.com",city:"Karachi",orders:3,spent:28400,joined:"2025-01-08"},
  {id:3,name:"Ayesha Noor",email:"ayesha@email.com",city:"Islamabad",orders:7,spent:68100,joined:"2024-09-22"},
  {id:4,name:"Usman Tariq",email:"usman@email.com",city:"Faisalabad",orders:2,spent:15600,joined:"2025-03-01"},
  {id:5,name:"Sara Malik",email:"sara@email.com",city:"Lahore",orders:9,spent:94500,joined:"2024-06-14"},
  {id:6,name:"Ali Hassan",email:"ali@email.com",city:"Multan",orders:1,spent:8900,joined:"2025-04-02"},
  {id:7,name:"Zara Ahmed",email:"zara@email.com",city:"Karachi",orders:6,spent:51200,joined:"2024-12-30"},
  {id:8,name:"Omar Siddiqui",email:"omar@email.com",city:"Islamabad",orders:4,spent:33700,joined:"2025-02-18"},
];

const ORDER_STATUS = ["Pending","Processing","Shipped","Delivered","Cancelled"];
const STATUS_COLORS = {Pending:"badge-warning",Processing:"badge-info",Shipped:"badge-neutral",Delivered:"badge-success",Cancelled:"badge-danger"};
const STATUS_DOTS = {Pending:"dot-amber",Processing:"dot-blue",Shipped:"dot-gray",Delivered:"dot-green",Cancelled:"dot-red"};
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CAT_COLORS = ['#C8A97E','#8B6F47','#5C5A54','#9C9A94','#D0CAC0','#F5F0E8'];

/* ── State ── */
let darkMode = localStorage.getItem('lum_dark') === 'true';
let currentSection = 'dashboard';
let activeSettingsTab = 'store';
let editingProductId = null;
let editingCategoryId = null;
let editingCouponId = null;

/* ── Helpers: localStorage ── */
function getProducts()   { return JSON.parse(localStorage.getItem('lum_products') || 'null') || SEED_PRODUCTS.map(p=>({...p})); }
function saveProducts(p) { localStorage.setItem('lum_products', JSON.stringify(p)); syncStoreProducts(p); }
function getCategories() { return JSON.parse(localStorage.getItem('lum_categories') || 'null') || SEED_CATEGORIES.map(c=>({...c})); }
function saveCategories(c){ localStorage.setItem('lum_categories', JSON.stringify(c)); }
function getCoupons()    { return JSON.parse(localStorage.getItem('lum_coupons') || 'null') || SEED_COUPONS.map(c=>({...c})); }
function saveCoupons(c)  { localStorage.setItem('lum_coupons', JSON.stringify(c)); }
function getOrders()     { return JSON.parse(localStorage.getItem('lum_orders') || '[]'); }
function saveOrders(o)   { localStorage.setItem('lum_orders', JSON.stringify(o)); }
function getSettings()   { return JSON.parse(localStorage.getItem('lum_settings') || '{}'); }
function saveSettings(s) { localStorage.setItem('lum_settings', JSON.stringify(s)); }
function nextId(arr)     { return arr.length ? Math.max(...arr.map(x=>x.id)) + 1 : 1; }

/* Sync product data so store also uses admin edits */
function syncStoreProducts(products){
  /* store's script.js reads lum_products on next load */
}

/* ── Toast ── */
function toast(msg, type='success'){
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icons = {success:'✓',error:'✕',info:'ℹ',warning:'!'};
  t.innerHTML = `<span style="font-weight:700">${icons[type]||'✓'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(20px)'; t.style.transition='.3s'; setTimeout(()=>t.remove(),300); }, 2800);
}

/* ── Dark mode ── */
function toggleDarkMode(){
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);
  localStorage.setItem('lum_dark', darkMode);
}
if(darkMode) document.body.classList.add('dark');

/* ── Sidebar ── */
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
}
document.addEventListener('click', e=>{
  const sb = document.getElementById('sidebar');
  if(sb.classList.contains('open') && !sb.contains(e.target) && !e.target.closest('.mobile-menu-btn')) sb.classList.remove('open');
});

/* ── Login ── */
function handleLogin(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginErr');
  if(email === 'admin@lumiere.pk' && pass === 'admin123'){
    errEl.style.display = 'none';
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminShell').style.display = 'block';
    initDashboard();
  } else {
    errEl.style.display = 'block';
  }
}
function handleLogout(){
  document.getElementById('adminShell').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
}

/* ── Section switching ── */
function switchSection(name, el){
  currentSection = name;
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById('sec-'+name)?.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(el) el.classList.add('active');
  else { document.querySelectorAll('.nav-item').forEach(n=>{ if(n.getAttribute('onclick')?.includes(`'${name}'`)) n.classList.add('active'); }); }
  const titles = {dashboard:'Dashboard',analytics:'Analytics',products:'Products',categories:'Categories',coupons:'Coupons',orders:'Orders',customers:'Customers',settings:'Settings'};
  document.getElementById('pageTitle').textContent = titles[name] || name;
  switch(name){
    case 'dashboard':  renderDashboard();  break;
    case 'analytics':  renderAnalytics();  break;
    case 'products':   renderProductsTable(); break;
    case 'categories': renderCategoriesTable(); break;
    case 'coupons':    renderCouponsTable(); break;
    case 'orders':     renderOrdersTable(); break;
    case 'customers':  renderCustomersTable(); break;
    case 'settings':   renderSettings();   break;
  }
  document.getElementById('sidebar').classList.remove('open');
}

/* ═══════════════════════════════════
   DASHBOARD
═══════════════════════════════════ */
function initDashboard(){
  renderDashboard();
  updateOrderBadge();
}

function renderDashboard(){
  const orders   = getOrders();
  const products = getProducts();
  const totalRev = orders.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+o.total,0);
  const pending  = orders.filter(o=>o.status==='Pending').length;
  const inStock  = products.filter(p=>p.stock).length;
  const outStock = products.filter(p=>!p.stock).length;

  document.getElementById('dashStats').innerHTML = `
    ${statCard('Total Revenue', fmtPKR(totalRev), '+12% from last month', 'up', revIcon())}
    ${statCard('Total Orders', orders.length, `${pending} pending`, pending>0?'neutral':'up', orderIcon())}
    ${statCard('Products', products.length, `${outStock} out of stock`, outStock>0?'down':'up', prodIcon())}
    ${statCard('Customers', DEMO_CUSTOMERS.length, '+3 this month', 'up', custIcon())}`;

  renderRevenueChart(document.getElementById('revPeriod')?.value || '30');
  renderRecentOrders();
  renderTopProducts();
  renderCategoryDonut();
  updateOrderBadge();
}

function statCard(label, value, change, dir, icon){
  return `<div class="stat-card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div class="stat-label">${label}</div>
      <div style="opacity:.12">${icon}</div>
    </div>
    <div class="stat-value">${value}</div>
    <div class="stat-change stat-${dir}">${dir==='up'?'↑':dir==='down'?'↓':''} ${change}</div>
  </div>`;
}

function renderRevenueChart(days){
  const orders = getOrders();
  const n = parseInt(days);
  const now = Date.now();
  const msDay = 86400000;
  let labels = [], vals = [];

  if(n <= 7){
    for(let i=6;i>=0;i--){
      const d = new Date(now - i*msDay);
      labels.push(d.toLocaleDateString('en',{weekday:'short'}));
      const dayOrders = orders.filter(o=>{
        const od = new Date(o.date);
        return od.getDate()===d.getDate() && od.getMonth()===d.getMonth() && od.getFullYear()===d.getFullYear() && o.status!=='Cancelled';
      });
      vals.push(dayOrders.reduce((s,o)=>s+o.total,0));
    }
  } else if(n <= 30){
    for(let i=29;i>=0;i-=3){
      const d = new Date(now - i*msDay);
      labels.push(`${d.getDate()} ${MONTHS[d.getMonth()]}`);
      const startTs = now - (i+3)*msDay;
      const endTs   = now - i*msDay;
      const chunk = orders.filter(o=> new Date(o.date).getTime() >= startTs && new Date(o.date).getTime() <= endTs && o.status!=='Cancelled');
      vals.push(chunk.reduce((s,o)=>s+o.total,0));
    }
  } else {
    for(let i=2;i>=0;i--){
      const d = new Date(now);
      d.setMonth(d.getMonth()-i);
      labels.push(MONTHS[d.getMonth()]);
      const m=d.getMonth(), y=d.getFullYear();
      const chunk = orders.filter(o=>{ const od=new Date(o.date); return od.getMonth()===m && od.getFullYear()===y && o.status!=='Cancelled'; });
      vals.push(chunk.reduce((s,o)=>s+o.total,0));
    }
  }

  /* Add some baseline so chart isn't flat when no orders yet */
  if(vals.every(v=>v===0)) vals = vals.map((_,i)=>[12000,34000,28000,45000,38000,52000,41000,60000,55000,70000][i] || 30000);

  const max = Math.max(...vals) || 1;
  const bars = labels.map((l,i)=>`
    <div class="chart-bar-wrap">
      <div class="chart-bar" style="height:${Math.round((vals[i]/max)*140)}px" title="${fmtPKR(vals[i])}">
        <span class="chart-bar-val">${fmtPKR(vals[i])}</span>
      </div>
      <div class="chart-bar-label">${l}</div>
    </div>`).join('');

  document.getElementById('revenueChart').innerHTML = `
    <div style="font-size:12px;color:var(--txt3);margin-bottom:4px">Total: ${fmtPKR(vals.reduce((a,b)=>a+b,0))}</div>
    <div class="chart-bars">${bars}</div>`;
}

function renderRecentOrders(){
  const orders = getOrders().slice(-5).reverse();
  const tbody = orders.length ? orders.map(o=>`
    <tr>
      <td style="font-weight:500;font-size:13px">${o.id}</td>
      <td>${o.customer}</td>
      <td><span class="badge ${STATUS_COLORS[o.status]||'badge-neutral'}"><span class="status-dot ${STATUS_DOTS[o.status]}"></span>${o.status}</span></td>
      <td style="font-weight:500">${fmtPKR(o.total)}</td>
    </tr>`).join('') : `<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--txt3);font-size:13px">No orders yet — click "Seed Demo Orders" in Orders tab</td></tr>`;

  document.getElementById('recentOrdersTable').innerHTML = `
    <thead><tr><th>Order</th><th>Customer</th><th>Status</th><th>Total</th></tr></thead>
    <tbody>${tbody}</tbody>`;
}

function renderTopProducts(){
  const products = getProducts().sort((a,b)=>b.popular-a.popular).slice(0,5);
  const maxPop = products[0]?.popular || 1;
  document.getElementById('topProductsList').innerHTML = products.map(p=>`
    <div style="padding:12px 0;border-bottom:1px solid var(--border);last-child:border:none">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span style="font-size:13px;font-weight:500">${p.name}</span>
        <span style="font-size:12px;color:var(--txt3)">${p.popular} views</span>
      </div>
      <div style="height:4px;background:var(--bg3);border-radius:2px">
        <div style="height:100%;width:${Math.round((p.popular/maxPop)*100)}%;background:var(--accent);border-radius:2px;transition:.6s"></div>
      </div>
    </div>`).join('');
}

function renderCategoryDonut(){
  const products = getProducts();
  const cats = {};
  products.forEach(p=>{ cats[p.category]=(cats[p.category]||0)+1; });
  const total = products.length || 1;
  const entries = Object.entries(cats);

  let offset = 0;
  const R = 40, cx = 56, cy = 56, circ = 2*Math.PI*R;
  const slices = entries.map(([name,count],i)=>{
    const pct = count/total;
    const dash = pct * circ;
    const slice = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${CAT_COLORS[i%CAT_COLORS.length]}" stroke-width="18" stroke-dasharray="${dash} ${circ}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})" style="transition:.6s"/>`;
    offset += dash;
    return slice;
  });

  const legend = entries.map(([name,count],i)=>`
    <div class="legend-item">
      <div class="legend-dot" style="background:${CAT_COLORS[i%CAT_COLORS.length]}"></div>
      <span>${name}</span>
      <span class="legend-val">${count}</span>
    </div>`).join('');

  document.getElementById('categoryDonut').innerHTML = `
    <svg viewBox="0 0 112 112" width="112" height="112" style="flex-shrink:0">${slices.join('')}</svg>
    <div class="donut-legend">${legend}</div>`;
}

function updateOrderBadge(){
  const pending = getOrders().filter(o=>o.status==='Pending').length;
  const badge = document.getElementById('ordersNavBadge');
  if(badge){ badge.textContent = pending; badge.style.display = pending ? 'block' : 'none'; }
}

/* ═══════════════════════════════════
   ANALYTICS
═══════════════════════════════════ */
function renderAnalytics(){
  const orders   = getOrders();
  const products = getProducts();
  const rev      = orders.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+o.total,0);
  const avgOrder = orders.length ? Math.round(rev/orders.length) : 0;
  const convRate = '3.8%';

  document.getElementById('analyticsKPI').innerHTML = [
    ['Total Revenue', fmtPKR(rev)],
    ['Total Orders', orders.length],
    ['Avg. Order Value', fmtPKR(avgOrder)],
    ['Conversion Rate', convRate],
    ['Active Products', products.filter(p=>p.stock).length],
    ['Out of Stock', products.filter(p=>!p.stock).length],
  ].map(([l,v])=>`<div class="kpi-card"><div class="kpi-label">${l}</div><div class="kpi-val">${v}</div></div>`).join('');

  renderSalesTrend('monthly');

  /* Category performance bar chart */
  const catData = {};
  getProducts().forEach(p=>{ catData[p.category]=(catData[p.category]||0)+p.popular; });
  const catEntries = Object.entries(catData);
  const maxCat = Math.max(...catEntries.map(e=>e[1])) || 1;
  document.getElementById('catPerfChart').innerHTML = `
    <div style="font-size:12px;color:var(--txt3);margin-bottom:8px">By Popularity Score</div>
    <div class="chart-bars" style="height:140px">${catEntries.map(([name,val],i)=>`
      <div class="chart-bar-wrap">
        <div class="chart-bar" style="height:${Math.round((val/maxCat)*130)}px;background:${CAT_COLORS[i%CAT_COLORS.length]}" title="${val} views">
          <span class="chart-bar-val">${val}</span>
        </div>
        <div class="chart-bar-label">${name.split(' ')[0]}</div>
      </div>`).join('')}
    </div>`;

  /* Order status donut */
  const statusCount = {};
  orders.forEach(o=>{ statusCount[o.status]=(statusCount[o.status]||0)+1; });
  const statusEntries = ORDER_STATUS.map(s=>[s, statusCount[s]||0]).filter(e=>e[1]>0);
  const stColors = {Pending:'#EF9F27',Processing:'#378ADD',Shipped:'#888780',Delivered:'#639922',Cancelled:'#E24B4A'};
  const totalSt = statusEntries.reduce((s,e)=>s+e[1],0) || 1;
  let stOffset = 0;
  const R2=40,cx2=56,cy2=56,circ2=2*Math.PI*R2;
  const stSlices = statusEntries.map(([name,count])=>{
    const pct=count/totalSt, dash=pct*circ2;
    const s=`<circle cx="${cx2}" cy="${cy2}" r="${R2}" fill="none" stroke="${stColors[name]}" stroke-width="18" stroke-dasharray="${dash} ${circ2}" stroke-dashoffset="${-stOffset}" transform="rotate(-90 ${cx2} ${cy2})"/>`;
    stOffset+=dash; return s;
  });
  const stLegend = statusEntries.map(([name,count])=>`
    <div class="legend-item">
      <div class="legend-dot" style="background:${stColors[name]}"></div>
      <span>${name}</span>
      <span class="legend-val">${count}</span>
    </div>`).join('');
  document.getElementById('orderStatusDonut').innerHTML = statusEntries.length
    ? `<svg viewBox="0 0 112 112" width="112" height="112" style="flex-shrink:0">${stSlices.join('')}</svg><div class="donut-legend">${stLegend}</div>`
    : `<p style="padding:20px;color:var(--txt3);font-size:13px">No order data yet.</p>`;
}

function renderSalesTrend(mode){
  const orders = getOrders();
  let labels=[], vals=[];
  const now = new Date();

  if(mode==='weekly'){
    for(let i=6;i>=0;i--){
      const d=new Date(now); d.setDate(d.getDate()-i);
      labels.push(d.toLocaleDateString('en',{weekday:'short'}));
      vals.push(orders.filter(o=>{ const od=new Date(o.date); return od.toDateString()===d.toDateString() && o.status!=='Cancelled'; }).reduce((s,o)=>s+o.total,0));
    }
  } else {
    for(let i=11;i>=0;i--){
      const d=new Date(now); d.setMonth(d.getMonth()-i);
      labels.push(MONTHS[d.getMonth()]);
      vals.push(orders.filter(o=>{ const od=new Date(o.date); return od.getMonth()===d.getMonth() && od.getFullYear()===d.getFullYear() && o.status!=='Cancelled'; }).reduce((s,o)=>s+o.total,0));
    }
  }

  if(vals.every(v=>v===0)) vals = [18000,24000,32000,28000,41000,38000,52000,47000,63000,58000,71000,68000].slice(0,labels.length);

  const max=Math.max(...vals)||1;
  const W=600, H=160, pad=10;
  const points = vals.map((v,i)=>{ const x=pad+(i/(vals.length-1||1))*(W-pad*2); const y=H-pad-(v/max)*(H-pad*2); return `${x},${y}`; }).join(' ');
  const areaPoints = `${pad},${H-pad} ${points} ${W-pad},${H-pad}`;

  document.getElementById('salesTrendChart').innerHTML = `
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px">
      ${labels.map((l,i)=>`<span style="font-size:11px;color:var(--txt3);text-align:center;flex:1">${l}</span>`).join('')}
    </div>
    <svg viewBox="0 0 600 160" style="width:100%;height:160px;overflow:visible">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity=".25"/>
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${areaPoints}" fill="url(#lineGrad)"/>
      <polyline points="${points}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${vals.map((v,i)=>{ const x=pad+(i/(vals.length-1||1))*(W-pad*2); const y=H-pad-(v/max)*(H-pad*2); return `<circle cx="${x}" cy="${y}" r="4" fill="var(--accent)" stroke="var(--card)" stroke-width="2"><title>${fmtPKR(v)}</title></circle>`; }).join('')}
    </svg>`;
}

/* ═══════════════════════════════════
   PRODUCTS
═══════════════════════════════════ */
function renderProductsTable(){
  const q    = document.getElementById('prodSearch')?.value.toLowerCase()||'';
  const cat  = document.getElementById('prodCatFilter')?.value||'';
  const stk  = document.getElementById('prodStockFilter')?.value||'';
  let prods  = getProducts();
  if(q)   prods = prods.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));
  if(cat) prods = prods.filter(p=>p.category===cat);
  if(stk==='in')  prods = prods.filter(p=>p.stock);
  if(stk==='out') prods = prods.filter(p=>!p.stock);

  /* Populate category filter */
  const cats = [...new Set(getProducts().map(p=>p.category))];
  const cfEl = document.getElementById('prodCatFilter');
  if(cfEl && cfEl.options.length<=1) cats.forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c; cfEl.appendChild(o); });

  document.getElementById('productsTbody').innerHTML = prods.length
    ? prods.map(p=>`
      <tr>
        <td>
          <div class="td-product">
            <img class="td-img" src="${p.image}" alt="${p.name}" onerror="this.style.background='var(--bg3)'">
            <div><div class="td-name">${p.name}</div><div class="td-sub">ID: ${p.id}</div></div>
          </div>
        </td>
        <td>${p.category}</td>
        <td style="font-weight:500">${fmtPKR(p.price)}</td>
        <td>${p.oldPrice ? fmtPKR(p.oldPrice) : '<span style="color:var(--txt3)">—</span>'}</td>
        <td>
          <label class="toggle">
            <input type="checkbox" ${p.stock?'checked':''} onchange="toggleProductStock(${p.id},this.checked)"/>
            <span class="toggle-slider"></span>
          </label>
        </td>
        <td>${p.rating} <span style="color:var(--accent)">★</span></td>
        <td>${p.tag ? `<span class="badge ${p.tag==='Sale'?'badge-warning':'badge-success'}">${p.tag}</span>` : '<span style="color:var(--txt3)">—</span>'}</td>
        <td>
          <div style="display:flex;gap:6px">
            <button class="btn-sm btn-edit" onclick="openProductModal(${p.id})">Edit</button>
            <button class="btn-sm btn-del"  onclick="deleteProduct(${p.id})">Delete</button>
          </div>
        </td>
      </tr>`).join('')
    : `<tr class="empty-row"><td colspan="8">No products found</td></tr>`;
}

function toggleProductStock(id, val){
  const prods = getProducts();
  const p = prods.find(x=>x.id===id);
  if(p){ p.stock=val; saveProducts(prods); toast(`${p.name} marked as ${val?'In Stock':'Out of Stock'}`, val?'success':'warning'); }
}

function deleteProduct(id){
  if(!confirm('Delete this product? This cannot be undone.')) return;
  const prods = getProducts().filter(p=>p.id!==id);
  saveProducts(prods);
  renderProductsTable();
  toast('Product deleted', 'info');
}

function openProductModal(id=null){
  editingProductId = id;
  const prods = getProducts();
  const p = id ? prods.find(x=>x.id===id) : null;
  const cats = [...new Set(prods.map(x=>x.category))];
  const catOpts = cats.map(c=>`<option value="${c}" ${p?.category===c?'selected':''}>${c}</option>`).join('');

  showModal('product', p ? 'Edit Product' : 'Add New Product', `
    <div class="form-grid-2">
      <div class="form-group span2">
        <label class="form-label">Product Name *</label>
        <input class="form-input" id="pName" placeholder="e.g. Volcanic Stone Vase" value="${p?.name||''}"/>
      </div>
      <div class="form-group">
        <label class="form-label">Category *</label>
        <select class="form-input" id="pCategory">
          <option value="">Select…</option>${catOpts}
          <option value="__new__">+ New Category</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Tag</label>
        <select class="form-input" id="pTag">
          <option value="" ${!p?.tag?'selected':''}>None</option>
          <option value="New" ${p?.tag==='New'?'selected':''}>New</option>
          <option value="Sale" ${p?.tag==='Sale'?'selected':''}>Sale</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Price (USD) *</label>
        <input class="form-input" id="pPrice" type="number" min="0" step="0.01" placeholder="e.g. 89" value="${p?.price||''}"/>
      </div>
      <div class="form-group">
        <label class="form-label">Old Price (USD)</label>
        <input class="form-input" id="pOldPrice" type="number" min="0" step="0.01" placeholder="Leave blank if no discount" value="${p?.oldPrice||''}"/>
      </div>
      <div class="form-group">
        <label class="form-label">Rating (0–5)</label>
        <input class="form-input" id="pRating" type="number" min="0" max="5" step="0.1" placeholder="4.8" value="${p?.rating||''}"/>
      </div>
      <div class="form-group">
        <label class="form-label">Reviews Count</label>
        <input class="form-input" id="pReviews" type="number" min="0" placeholder="124" value="${p?.reviews||''}"/>
      </div>
      <div class="form-group span2">
        <label class="form-label">Image Path</label>
        <input class="form-input" id="pImage" placeholder="assets/product.jpg" value="${p?.image||''}"/>
        <div style="font-size:11px;color:var(--txt3);margin-top:4px">Relative path from ecommerce/ folder. Replace with your actual image path.</div>
      </div>
      <div class="form-group span2">
        <label class="form-label">Description</label>
        <textarea class="form-input" id="pDesc" rows="3" placeholder="Product description…">${p?.desc||''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Stock Status</label>
        <select class="form-input" id="pStock">
          <option value="true"  ${p?.stock!==false?'selected':''}>In Stock</option>
          <option value="false" ${p?.stock===false?'selected':''}>Out of Stock</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Popularity Score</label>
        <input class="form-input" id="pPopular" type="number" min="0" placeholder="450" value="${p?.popular||''}"/>
      </div>
    </div>`, saveProduct);
}

function saveProduct(){
  const name     = document.getElementById('pName').value.trim();
  const category = document.getElementById('pCategory').value;
  const priceRaw = parseFloat(document.getElementById('pPrice').value);
  if(!name || !category || isNaN(priceRaw)){ toast('Please fill required fields','error'); return; }

  const prods = getProducts();
  const data = {
    name, category,
    price:    priceRaw,
    oldPrice: parseFloat(document.getElementById('pOldPrice').value)||null,
    rating:   parseFloat(document.getElementById('pRating').value)||4.5,
    reviews:  parseInt(document.getElementById('pReviews').value)||0,
    image:    document.getElementById('pImage').value.trim() || 'assets/vase.png',
    tag:      document.getElementById('pTag').value || null,
    stock:    document.getElementById('pStock').value === 'true',
    popular:  parseInt(document.getElementById('pPopular').value)||100,
    desc:     document.getElementById('pDesc').value.trim() || '',
  };

  if(editingProductId){
    const idx = prods.findIndex(p=>p.id===editingProductId);
    if(idx>-1) prods[idx] = {...prods[idx], ...data};
    toast('Product updated','success');
  } else {
    data.id = nextId(prods);
    prods.push(data);
    toast('Product added','success');
  }
  saveProducts(prods);
  closeModal();
  renderProductsTable();
}

/* ═══════════════════════════════════
   CATEGORIES
═══════════════════════════════════ */
function renderCategoriesTable(){
  const q    = document.getElementById('catSearch')?.value.toLowerCase()||'';
  const prods = getProducts();
  let cats = getCategories();
  if(q) cats = cats.filter(c=>c.name.toLowerCase().includes(q));

  document.getElementById('categoriesTbody').innerHTML = cats.length
    ? cats.map(c=>{
        const count = prods.filter(p=>p.category===c.name).length;
        return `<tr>
          <td><img class="td-img" src="${c.image}" alt="${c.name}" style="width:48px;height:36px;object-fit:cover" onerror="this.style.background='var(--bg3)'"></td>
          <td><span class="td-name">${c.name}</span></td>
          <td>${count} products</td>
          <td><label class="toggle"><input type="checkbox" ${c.active?'checked':''} onchange="toggleCategory(${c.id},this.checked)"/><span class="toggle-slider"></span></label></td>
          <td><div style="display:flex;gap:6px">
            <button class="btn-sm btn-edit" onclick="openCategoryModal(${c.id})">Edit</button>
            <button class="btn-sm btn-del"  onclick="deleteCategory(${c.id})">Delete</button>
          </div></td>
        </tr>`;}).join('')
    : `<tr class="empty-row"><td colspan="5">No categories found</td></tr>`;
}

function toggleCategory(id, val){
  const cats = getCategories();
  const c = cats.find(x=>x.id===id);
  if(c){ c.active=val; saveCategories(cats); toast(`${c.name} ${val?'enabled':'disabled'}`,val?'success':'info'); }
}

function deleteCategory(id){
  if(!confirm('Delete this category?')) return;
  saveCategories(getCategories().filter(c=>c.id!==id));
  renderCategoriesTable();
  toast('Category deleted','info');
}

function openCategoryModal(id=null){
  editingCategoryId = id;
  const cats = getCategories();
  const c = id ? cats.find(x=>x.id===id) : null;

  showModal('category', c?'Edit Category':'Add Category',`
    <div class="form-group">
      <label class="form-label">Category Name *</label>
      <input class="form-input" id="cName" placeholder="e.g. Home Decor" value="${c?.name||''}"/>
    </div>
    <div class="form-group">
      <label class="form-label">Image Path</label>
      <input class="form-input" id="cImage" placeholder="assets/home-decor.jpeg" value="${c?.image||''}"/>
      <div style="font-size:11px;color:var(--txt3);margin-top:4px">Relative path from ecommerce/ folder.</div>
    </div>
    <div class="form-group">
      <label class="form-label">Status</label>
      <select class="form-input" id="cActive">
        <option value="true"  ${c?.active!==false?'selected':''}>Active</option>
        <option value="false" ${c?.active===false?'selected':''}>Inactive</option>
      </select>
    </div>`, saveCategory);
}

function saveCategory(){
  const name = document.getElementById('cName').value.trim();
  if(!name){ toast('Category name is required','error'); return; }
  const cats = getCategories();
  const data = {
    name,
    image:  document.getElementById('cImage').value.trim() || 'assets/home-decor.jpeg',
    active: document.getElementById('cActive').value === 'true',
  };
  if(editingCategoryId){
    const idx = cats.findIndex(c=>c.id===editingCategoryId);
    if(idx>-1) cats[idx] = {...cats[idx],...data};
    toast('Category updated','success');
  } else {
    data.id = nextId(cats);
    cats.push(data);
    toast('Category added','success');
  }
  saveCategories(cats);
  closeModal();
  renderCategoriesTable();
}

/* ═══════════════════════════════════
   COUPONS
═══════════════════════════════════ */
function renderCouponsTable(){
  const q = document.getElementById('couponSearch')?.value.toLowerCase()||'';
  let coupons = getCoupons();
  if(q) coupons = coupons.filter(c=>c.code.toLowerCase().includes(q));

  document.getElementById('couponsTbody').innerHTML = coupons.length
    ? coupons.map(c=>{
        const expired = c.expiry && new Date(c.expiry) < new Date();
        return `<tr>
          <td><span class="coupon-code">${c.code}</span></td>
          <td>${c.type}</td>
          <td>${c.type==='Percent'? c.value+'%' : fmtPKR(c.value)}</td>
          <td>${c.minOrder ? fmtPKR(c.minOrder) : 'None'}</td>
          <td>${c.uses}${c.maxUses?'/'+c.maxUses:''}</td>
          <td>${c.expiry||'—'}</td>
          <td>
            ${expired ? `<span class="badge badge-danger">Expired</span>`
              : c.active ? `<span class="badge badge-success">Active</span>`
              : `<span class="badge badge-neutral">Disabled</span>`}
          </td>
          <td><div style="display:flex;gap:6px">
            <button class="btn-sm btn-edit" onclick="openCouponModal(${c.id})">Edit</button>
            <button class="btn-sm btn-del"  onclick="deleteCoupon(${c.id})">Delete</button>
          </div></td>
        </tr>`;}).join('')
    : `<tr class="empty-row"><td colspan="8">No coupons found</td></tr>`;
}

function deleteCoupon(id){
  if(!confirm('Delete this coupon?')) return;
  saveCoupons(getCoupons().filter(c=>c.id!==id));
  renderCouponsTable();
  toast('Coupon deleted','info');
}

function openCouponModal(id=null){
  editingCouponId = id;
  const coupons = getCoupons();
  const c = id ? coupons.find(x=>x.id===id) : null;

  showModal('coupon', c?'Edit Coupon':'Add Coupon',`
    <div class="form-grid-2">
      <div class="form-group span2">
        <label class="form-label">Coupon Code *</label>
        <input class="form-input" id="cpCode" placeholder="e.g. SAVE20" style="text-transform:uppercase" value="${c?.code||''}" oninput="this.value=this.value.toUpperCase()"/>
      </div>
      <div class="form-group">
        <label class="form-label">Discount Type *</label>
        <select class="form-input" id="cpType">
          <option value="Percent" ${c?.type==='Percent'?'selected':''}>Percentage (%)</option>
          <option value="Fixed"   ${c?.type==='Fixed'?'selected':''}>Fixed Amount (Rs)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Discount Value *</label>
        <input class="form-input" id="cpValue" type="number" min="0" placeholder="15" value="${c?.value||''}"/>
      </div>
      <div class="form-group">
        <label class="form-label">Min Order Value (PKR)</label>
        <input class="form-input" id="cpMinOrder" type="number" min="0" placeholder="0 = no minimum" value="${c?.minOrder||0}"/>
      </div>
      <div class="form-group">
        <label class="form-label">Max Uses</label>
        <input class="form-input" id="cpMaxUses" type="number" min="0" placeholder="0 = unlimited" value="${c?.maxUses||''}"/>
      </div>
      <div class="form-group">
        <label class="form-label">Expiry Date</label>
        <input class="form-input" id="cpExpiry" type="date" value="${c?.expiry||''}"/>
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-input" id="cpActive">
          <option value="true"  ${c?.active!==false?'selected':''}>Active</option>
          <option value="false" ${c?.active===false?'selected':''}>Disabled</option>
        </select>
      </div>
    </div>`, saveCoupon);
}

function saveCoupon(){
  const code  = document.getElementById('cpCode').value.trim().toUpperCase();
  const value = parseFloat(document.getElementById('cpValue').value);
  if(!code || isNaN(value)){ toast('Code and value are required','error'); return; }
  const coupons = getCoupons();
  const data = {
    code, value,
    type:     document.getElementById('cpType').value,
    minOrder: parseInt(document.getElementById('cpMinOrder').value)||0,
    maxUses:  parseInt(document.getElementById('cpMaxUses').value)||0,
    expiry:   document.getElementById('cpExpiry').value||null,
    active:   document.getElementById('cpActive').value === 'true',
    uses:     0,
  };
  if(editingCouponId){
    const idx = coupons.findIndex(c=>c.id===editingCouponId);
    if(idx>-1){ data.uses=coupons[idx].uses; coupons[idx]={...coupons[idx],...data}; }
    toast('Coupon updated','success');
  } else {
    data.id = nextId(coupons);
    coupons.push(data);
    toast('Coupon created','success');
  }
  saveCoupons(coupons);
  closeModal();
  renderCouponsTable();
}

/* ═══════════════════════════════════
   ORDERS
═══════════════════════════════════ */
function renderOrdersTable(){
  const q     = document.getElementById('orderSearch')?.value.toLowerCase()||'';
  const stFil = document.getElementById('orderStatusFilter')?.value||'';
  let orders  = getOrders();
  if(q)     orders = orders.filter(o=>o.id.toLowerCase().includes(q)||o.customer.toLowerCase().includes(q)||o.email?.toLowerCase().includes(q));
  if(stFil) orders = orders.filter(o=>o.status===stFil);
  orders = [...orders].reverse();

  document.getElementById('ordersTbody').innerHTML = orders.length
    ? orders.map(o=>`
      <tr>
        <td style="font-weight:500;font-size:13px;font-family:monospace">${o.id}</td>
        <td>
          <div class="td-name">${o.customer}</div>
          <div class="td-sub">${o.email||''}</div>
        </td>
        <td>${o.items?.length||0} item${o.items?.length!==1?'s':''}</td>
        <td style="font-weight:500">${fmtPKR(o.total)}</td>
        <td>${o.payment||'COD'}</td>
        <td>
          <select class="filter-select" style="padding:4px 10px;font-size:12px;border-radius:20px"
            onchange="updateOrderStatus('${o.id}',this.value)" title="Change status">
            ${ORDER_STATUS.map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </td>
        <td style="font-size:12px;color:var(--txt3)">${o.date ? fmtDate(o.date) : '—'}</td>
        <td><div style="display:flex;gap:6px">
          <button class="btn-sm btn-view" onclick="viewOrder('${o.id}')">View</button>
          <button class="btn-sm btn-del"  onclick="deleteOrder('${o.id}')">Delete</button>
        </div></td>
      </tr>`).join('')
    : `<tr class="empty-row"><td colspan="8">No orders yet. Click "Seed Demo Orders" to add sample data or place an order from the store.</td></tr>`;

  updateOrderBadge();
}

function updateOrderStatus(id, status){
  const orders = getOrders();
  const o = orders.find(x=>x.id===id);
  if(o){ o.status=status; saveOrders(orders); updateOrderBadge(); toast(`Order ${id} → ${status}`,'success'); }
}

function deleteOrder(id){
  if(!confirm('Delete this order?')) return;
  saveOrders(getOrders().filter(o=>o.id!==id));
  renderOrdersTable();
  toast('Order deleted','info');
}

function viewOrder(id){
  const o = getOrders().find(x=>x.id===id);
  if(!o) return;
  const itemRows = (o.items||[]).map(i=>`
    <div class="order-item-row">
      <img class="order-item-img" src="${i.image||'assets/vase.png'}" alt="${i.name}" onerror="this.style.background='var(--bg3)'">
      <div>
        <div class="order-item-name">${i.name}</div>
        <div class="order-item-meta">Qty: ${i.qty}${i.size?' · '+i.size:''}${i.color?' · '+i.color:''}</div>
      </div>
      <div class="order-item-price">${fmtPKR(pkr(i.price)*i.qty)}</div>
    </div>`).join('');

  showModal('view', `Order ${o.id}`, `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
      <div>
        <div class="form-label" style="margin-bottom:4px">Customer</div>
        <div style="font-size:14px;font-weight:500">${o.customer}</div>
        <div style="font-size:13px;color:var(--txt2)">${o.email||''}</div>
      </div>
      <div>
        <div class="form-label" style="margin-bottom:4px">Date</div>
        <div style="font-size:14px">${o.date ? fmtDate(o.date) : '—'}</div>
      </div>
      <div>
        <div class="form-label" style="margin-bottom:4px">Shipping Address</div>
        <div style="font-size:13px;color:var(--txt2)">${o.address||'—'}</div>
      </div>
      <div>
        <div class="form-label" style="margin-bottom:4px">Payment</div>
        <div style="font-size:14px">${o.payment||'COD'}</div>
      </div>
    </div>
    <div class="form-label" style="margin-bottom:8px">Items Ordered</div>
    <div class="order-items-list">${itemRows||'<div style="padding:16px;text-align:center;color:var(--txt3);font-size:13px">No item detail available</div>'}</div>
    <div style="border:1px solid var(--border);border-radius:var(--rad-sm);padding:16px;margin-top:12px">
      <div style="display:flex;justify-content:space-between;font-size:14px;padding:4px 0"><span style="color:var(--txt2)">Subtotal</span><span>${fmtPKR(o.subtotal||o.total)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:14px;padding:4px 0"><span style="color:var(--txt2)">GST (18%)</span><span>${fmtPKR(o.tax||0)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:500;padding:8px 0 0;border-top:1px solid var(--border);margin-top:4px"><span>Total</span><span>${fmtPKR(o.total)}</span></div>
    </div>
    <div style="margin-top:16px">
      <div class="form-label" style="margin-bottom:8px">Update Status</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${ORDER_STATUS.map(s=>`<button class="btn-sm ${o.status===s?'btn-edit':'btn-view'}" onclick="updateOrderStatus('${o.id}','${s}');closeModal();renderOrdersTable()">${s}</button>`).join('')}
      </div>
    </div>`, null, true);
}

function seedDemoOrders(){
  const existing = getOrders();
  if(existing.length >= 20){ toast('Demo orders already seeded','info'); return; }
  const customers = ['Fatima Khan','Hamza Raza','Ayesha Noor','Usman Tariq','Sara Malik','Ali Hassan','Zara Ahmed','Omar Siddiqui'];
  const emails    = ['fatima@email.com','hamza@email.com','ayesha@email.com','usman@email.com','sara@email.com','ali@email.com','zara@email.com','omar@email.com'];
  const payments  = ['Credit Card','JazzCash','EasyPaisa','Cash on Delivery'];
  const cities    = ['Lahore','Karachi','Islamabad','Faisalabad','Multan'];
  const prods     = getProducts();
  const newOrders = [];

  for(let i=0;i<18;i++){
    const ci   = i % customers.length;
    const numItems = Math.ceil(Math.random()*3);
    const items = Array.from({length:numItems},()=>{
      const p = prods[Math.floor(Math.random()*prods.length)];
      const qty = Math.ceil(Math.random()*2);
      return {pid:p.id,name:p.name,price:p.price,qty,image:p.image,size:'',color:''};
    });
    const subtotal = items.reduce((s,x)=>s+pkr(x.price)*x.qty,0);
    const tax      = Math.round(subtotal*0.18);
    const total    = subtotal+tax;
    const daysAgo  = Math.floor(Math.random()*60);
    const date     = new Date(Date.now()-daysAgo*86400000).toISOString();
    const status   = ORDER_STATUS[Math.floor(Math.random()*ORDER_STATUS.length)];

    newOrders.push({
      id:`#EC2026-${String(existing.length+i+1).padStart(4,'0')}`,
      customer: customers[ci], email: emails[ci],
      address: `House ${10+i}, Block ${String.fromCharCode(65+i%5)}, ${cities[i%cities.length]}`,
      items, subtotal, tax, total, status, date,
      payment: payments[Math.floor(Math.random()*payments.length)],
    });
  }
  saveOrders([...existing, ...newOrders]);
  renderOrdersTable();
  renderDashboard();
  toast(`${newOrders.length} demo orders added`,'success');
}

/* ═══════════════════════════════════
   CUSTOMERS
═══════════════════════════════════ */
function renderCustomersTable(){
  const q    = document.getElementById('custSearch')?.value.toLowerCase()||'';
  const city = document.getElementById('custCityFilter')?.value||'';

  /* Merge demo customers with any from orders */
  const orders = getOrders();
  const orderCustomers = {};
  orders.forEach(o=>{ if(!orderCustomers[o.email]) orderCustomers[o.email]={orders:0,spent:0}; orderCustomers[o.email].orders++; orderCustomers[o.email].spent+=o.total; });

  let custs = DEMO_CUSTOMERS.map(c=>({
    ...c,
    orders: orderCustomers[c.email]?.orders || c.orders,
    spent:  orderCustomers[c.email]?.spent  || c.spent,
  }));
  if(q)    custs = custs.filter(c=>c.name.toLowerCase().includes(q)||c.email.toLowerCase().includes(q));
  if(city) custs = custs.filter(c=>c.city===city);

  document.getElementById('customersTbody').innerHTML = custs.length
    ? custs.map(c=>{
        const initials = c.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
        return `<tr>
          <td>
            <div class="td-product">
              <div style="width:36px;height:36px;border-radius:50%;background:var(--accent3);color:var(--accent2);display:flex;align-items:center;justify-content:center;font-weight:500;font-size:13px;flex-shrink:0">${initials}</div>
              <div><div class="td-name">${c.name}</div></div>
            </div>
          </td>
          <td style="color:var(--txt2)">${c.email}</td>
          <td>${c.city}</td>
          <td>${c.orders}</td>
          <td style="font-weight:500">${fmtPKR(c.spent)}</td>
          <td style="font-size:12px;color:var(--txt3)">${fmtDate(c.joined)}</td>
          <td><button class="btn-sm btn-view" onclick="viewCustomer(${c.id})">View</button></td>
        </tr>`;}).join('')
    : `<tr class="empty-row"><td colspan="7">No customers found</td></tr>`;
}

function viewCustomer(id){
  const c = DEMO_CUSTOMERS.find(x=>x.id===id); if(!c) return;
  const orders = getOrders().filter(o=>o.email===c.email);
  const initials = c.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
  const orderRows = orders.length ? orders.reverse().map(o=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
      <div><div style="font-size:13px;font-weight:500;font-family:monospace">${o.id}</div><div style="font-size:12px;color:var(--txt3)">${fmtDate(o.date)}</div></div>
      <span class="badge ${STATUS_COLORS[o.status]||'badge-neutral'}">${o.status}</span>
      <span style="font-size:13px;font-weight:500">${fmtPKR(o.total)}</span>
    </div>`).join('') : `<p style="font-size:13px;color:var(--txt3);padding:12px 0">No orders yet.</p>`;

  showModal('view', 'Customer Profile', `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)">
      <div style="width:56px;height:56px;border-radius:50%;background:var(--accent3);color:var(--accent2);display:flex;align-items:center;justify-content:center;font-weight:500;font-size:20px;flex-shrink:0">${initials}</div>
      <div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400">${c.name}</div>
        <div style="font-size:13px;color:var(--txt2)">${c.email}</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:20px">
      <div style="background:var(--bg2);border-radius:var(--rad-sm);padding:14px;text-align:center">
        <div style="font-size:11px;color:var(--txt3);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px">Orders</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300">${c.orders}</div>
      </div>
      <div style="background:var(--bg2);border-radius:var(--rad-sm);padding:14px;text-align:center">
        <div style="font-size:11px;color:var(--txt3);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px">Total Spent</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300">${fmtPKR(c.spent)}</div>
      </div>
      <div style="background:var(--bg2);border-radius:var(--rad-sm);padding:14px;text-align:center">
        <div style="font-size:11px;color:var(--txt3);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px">City</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300">${c.city}</div>
      </div>
    </div>
    <div class="form-label" style="margin-bottom:12px">Order History</div>
    ${orderRows}`, null, true);
}

/* ═══════════════════════════════════
   SETTINGS
═══════════════════════════════════ */
function switchSettingsTab(tab, el){
  activeSettingsTab = tab;
  document.querySelectorAll('.settings-nav-item').forEach(i=>i.classList.remove('active'));
  if(el) el.classList.add('active');
  renderSettingsContent(tab);
}

function renderSettings(){
  renderSettingsContent(activeSettingsTab);
}

function renderSettingsContent(tab){
  const s = getSettings();
  const content = {
    store: `
      <div class="settings-panel">
        <div class="settings-section">
          <div class="settings-section-title">Store Information</div>
          <div class="settings-section-desc">Basic details about your store visible to customers.</div>
          <div class="form-group"><label class="form-label">Store Name</label><input class="form-input" id="sStoreName" value="${s.storeName||'LUMIÈRE'}" placeholder="LUMIÈRE"/></div>
          <div class="form-group"><label class="form-label">Store Email</label><input class="form-input" id="sEmail" value="${s.email||'support@lumiere.pk'}" type="email"/></div>
          <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="sPhone" value="${s.phone||'+92 42 0000 0000'}"/></div>
          <div class="form-group"><label class="form-label">Address</label><input class="form-input" id="sAddress" value="${s.address||'14 Gulberg III, Lahore'}"/></div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">Currency & Tax</div>
          <div class="settings-section-desc">Pricing and tax settings used across the store.</div>
          <div class="form-group"><label class="form-label">Currency</label>
            <select class="form-input" id="sCurrency">
              <option value="PKR" selected>Pakistani Rupee (PKR)</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">GST Rate (%)</label><input class="form-input" id="sGST" type="number" value="${s.gst||18}" min="0" max="100"/></div>
          <div class="form-group"><label class="form-label">USD to PKR Rate</label><input class="form-input" id="sRate" type="number" value="${s.rate||278}"/></div>
        </div>
        <button class="btn-add" onclick="saveStoreSettings()">Save Settings</button>
      </div>`,

    appearance: `
      <div class="settings-panel">
        <div class="settings-section">
          <div class="settings-section-title">Theme</div>
          <div class="settings-section-desc">Control the visual appearance of the admin panel.</div>
          <div class="setting-row">
            <div class="setting-info"><div class="setting-name">Dark Mode</div><div class="setting-desc">Switch between light and dark theme</div></div>
            <label class="toggle"><input type="checkbox" ${darkMode?'checked':''} onchange="toggleDarkMode()"/><span class="toggle-slider"></span></label>
          </div>
          <div class="setting-row">
            <div class="setting-info"><div class="setting-name">Accent Colour</div><div class="setting-desc">Primary brand colour used throughout</div></div>
            <div style="display:flex;gap:8px">
              ${['#C8A97E','#8B6F47','#185FA5','#1D9E75','#D85A30'].map(c=>`<div style="width:28px;height:28px;border-radius:50%;background:${c};cursor:pointer;border:3px solid ${c==='#C8A97E'?'var(--txt)':'transparent'}" title="${c}" onclick="toast('Accent colour updated','success')"></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">Store Front Banner</div>
          <div class="settings-section-desc">Text displayed on the homepage hero section.</div>
          <div class="form-group"><label class="form-label">Hero Headline</label><input class="form-input" id="sHero" value="${s.heroText||'Curated for Every Moment'}" placeholder="Hero headline"/></div>
          <div class="form-group"><label class="form-label">Hero Subtext</label><textarea class="form-input" id="sHeroSub" rows="2">${s.heroSub||'Discover our handpicked selection of premium products.'}</textarea></div>
          <button class="btn-add" onclick="toast('Banner settings saved','success')">Save</button>
        </div>
      </div>`,

    notifications: `
      <div class="settings-panel">
        <div class="settings-section">
          <div class="settings-section-title">Email Notifications</div>
          <div class="settings-section-desc">Choose which events trigger an email to the admin.</div>
          ${[['New Order Placed','Receive an email when a customer places an order',true],
             ['Order Status Changed','Notify when an order status is updated',true],
             ['Low Stock Alert','Alert when a product stock is toggled off',false],
             ['New Customer Registration','Email on each new account creation',false],
             ['Coupon Used','Notify when a coupon code is redeemed',false],
          ].map(([name,desc,def])=>`
            <div class="setting-row">
              <div class="setting-info"><div class="setting-name">${name}</div><div class="setting-desc">${desc}</div></div>
              <label class="toggle"><input type="checkbox" ${def?'checked':''} onchange="toast('Preference saved','success')"/><span class="toggle-slider"></span></label>
            </div>`).join('')}
        </div>
      </div>`,

    account: `
      <div class="settings-panel">
        <div class="settings-section">
          <div class="settings-section-title">Admin Account</div>
          <div class="settings-section-desc">Update your login credentials.</div>
          <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" value="Admin User"/></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" value="admin@lumiere.pk"/></div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">Change Password</div>
          <div class="settings-section-desc">Use a strong password of at least 8 characters.</div>
          <div class="form-group"><label class="form-label">Current Password</label><input class="form-input" type="password" placeholder="••••••••"/></div>
          <div class="form-group"><label class="form-label">New Password</label><input class="form-input" type="password" placeholder="••••••••"/></div>
          <div class="form-group"><label class="form-label">Confirm New Password</label><input class="form-input" type="password" placeholder="••••••••"/></div>
          <button class="btn-add" onclick="toast('Password updated','success')">Update Password</button>
        </div>
        <div class="settings-section">
          <div class="settings-section-title" style="color:var(--danger)">Danger Zone</div>
          <div class="setting-row">
            <div class="setting-info"><div class="setting-name">Reset All Demo Data</div><div class="setting-desc">Clears orders, products, and settings from localStorage</div></div>
            <button class="btn-sm btn-del" onclick="resetAllData()">Reset</button>
          </div>
        </div>
      </div>`,
  };
  document.getElementById('settingsContent').innerHTML = content[tab] || '';
}

function saveStoreSettings(){
  const s = getSettings();
  s.storeName = document.getElementById('sStoreName')?.value || s.storeName;
  s.email     = document.getElementById('sEmail')?.value     || s.email;
  s.phone     = document.getElementById('sPhone')?.value     || s.phone;
  s.address   = document.getElementById('sAddress')?.value   || s.address;
  s.gst       = parseInt(document.getElementById('sGST')?.value)||18;
  s.rate      = parseInt(document.getElementById('sRate')?.value)||278;
  saveSettings(s);
  toast('Settings saved','success');
}

function resetAllData(){
  if(!confirm('This will clear all orders and custom products. Continue?')) return;
  localStorage.removeItem('lum_orders');
  localStorage.removeItem('lum_products');
  localStorage.removeItem('lum_categories');
  localStorage.removeItem('lum_coupons');
  localStorage.removeItem('lum_settings');
  toast('All data reset to defaults','warning');
  renderDashboard();
}

/* ═══════════════════════════════════
   MODAL HELPER
═══════════════════════════════════ */
function showModal(type, title, body, onSave, viewOnly=false){
  const footerBtns = viewOnly ? `<button class="btn-outline-sm" onclick="closeModal()">Close</button>`
    : `<button class="btn-outline-sm" onclick="closeModal()">Cancel</button>
       <button class="btn-add" onclick="${onSave?.name||onSave}()" style="padding:9px 24px">Save</button>`;

  document.getElementById('modalBox').innerHTML = `
    <div class="modal-head">
      <span class="modal-head-title">${title}</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">${body}</div>
    <div class="modal-footer">${footerBtns}</div>`;
  document.getElementById('modalBg').style.display = 'flex';
}

function closeModal(e){
  if(e && e.target !== document.getElementById('modalBg')) return;
  document.getElementById('modalBg').style.display = 'none';
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

/* ═══════════════════════════════════
   SVG ICON HELPERS
═══════════════════════════════════ */
function revIcon(){return `<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;}
function orderIcon(){return `<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;}
function prodIcon(){return `<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;}
function custIcon(){return `<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;}
