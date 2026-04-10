
/* PKR conversion rate */
const USD_TO_PKR = 278;
function pkr(usd){ return Math.round(usd * USD_TO_PKR); }
function fmtPKR(usd){ return 'Rs ' + pkr(usd).toLocaleString('en-PK'); }

const PRODUCTS = [
  {id:1,name:"Volcanic Stone Vase",category:"Home Decor",price:89,oldPrice:120,rating:4.8,reviews:124,image:["../assets/vase.png","../assets/vase2.png","../assets/vase3.png"],tag:"New",stock:true,colors:["#2C2C2A","#C8A97E","#FFFFFF"],sizes:[],desc:"Hand-crafted volcanic stone vase with a matte finish. Each piece is unique, formed from natural materials and shaped by skilled artisans. Perfect as a standalone statement or as part of a curated collection.",popular:450},
  {id:2,name:"Linen Midi Dress",category:"Clothing",price:145,oldPrice:null,rating:4.6,reviews:89,image:["../assets/stylish-girl.jpg","../assets/stylish-girl.jpg","../assets/stylish-girl.jpg"],tag:"New",stock:true,colors:["#E8E0D4","#8B6F47","#1A1917"],sizes:["XS","S","M","L","XL"],desc:"Effortlessly elegant linen midi dress crafted from 100% premium linen. Features a relaxed silhouette with subtle side seam pockets. Available in three refined colorways.",popular:312},
  {id:3,name:"Wireless Earbuds Pro",category:"Electronics",price:199,oldPrice:249,rating:4.9,reviews:342,image:["../assets/still-life-wireless-cyberpunk-headphones (1).jpg","../assets/still-life-wireless-cyberpunk-headphones (1).jpg","../assets/still-life-wireless-cyberpunk-headphones (1).jpg"],tag:"Sale",stock:true,colors:["#2C2C2A","#FFFFFF","#C8A97E"],sizes:[],desc:"Premium wireless earbuds with active noise cancellation, 30-hour battery life, and studio-quality sound. Featuring adaptive EQ and spatial audio technology.",popular:890},
  {id:4,name:"Aromatherapy Set",category:"Wellness",price:68,oldPrice:null,rating:4.7,reviews:67,image:["../assets/aroma1.png","../assets/aroma1.png","../assets/aroma1.png"],tag:null,stock:true,colors:["#F5F0E8","#C8A97E"],sizes:[],desc:"A curated collection of 4 hand-poured soy wax candles with essential oil blends. Scents include Cedarwood & Sage, Jasmine & Bergamot, Oud & Amber, and Sea Salt & Driftwood.",popular:234},
  {id:5,name:"Minimal Watch",category:"Accessories",price:320,oldPrice:400,rating:4.9,reviews:201,image:["../assets/watch.webp","../assets/watch.webp","../assets/watch.webp"],tag:"Sale",stock:true,colors:["#2C2C2A","#C8A97E","#8B6F47"],sizes:["38mm","42mm"],desc:"Swiss-made quartz movement with a Milanese mesh strap and sapphire crystal glass. Water resistant to 50m. The perfect fusion of classic watchmaking and contemporary design.",popular:678},
  {id:6,name:"Cashmere Throw",category:"Home Decor",price:215,oldPrice:null,rating:4.8,reviews:156,image:["../assets/cashmre.jpg","../assets/cashmre.jpg","../assets/cashmre.jpg"],tag:null,stock:true,colors:["#E8E0D4","#8B6F47","#2C2C2A"],sizes:[],desc:"Luxuriously soft pure cashmere throw blanket. Measuring 140×180cm, it drapes beautifully over sofas and beds. Ethically sourced Mongolian cashmere.",popular:445},
  {id:7,name:"Ceramic Coffee Set",category:"Home Decor",price:112,oldPrice:140,rating:4.5,reviews:88,image:["../assets/cofee.webp","../assets/cofee.webp","../assets/cofee.webp"],tag:null,stock:false,colors:["#FFFFFF","#2C2C2A","#C8A97E"],sizes:[],desc:"Artisan-crafted ceramic coffee set including 2 mugs and a pour-over dripper. Each piece is wheel-thrown and hand-glazed, making every set one-of-a-kind.",popular:321},
  {id:8,name:"Merino Turtleneck",category:"Clothing",price:175,oldPrice:null,rating:4.7,reviews:142,image:["../assets/wool_sweater.webp","../assets/wool_sweater.webp","../assets/wool_sweater.webp"],tag:"New",stock:true,colors:["#E8E0D4","#1A1917","#8B6F47"],sizes:["S","M","L","XL"],desc:"Fine merino wool turtleneck with a relaxed yet refined fit. Temperature-regulating and naturally odour-resistant. A perennial wardrobe essential.",popular:567},
  {id:9,name:"Smart Desk Lamp",category:"Electronics",price:159,oldPrice:199,rating:4.6,reviews:213,image:["../assets/lamp.jpg","../assets/lamp.jpg","../assets/lamp.jpg"],tag:"Sale",stock:true,colors:["#FFFFFF","#2C2C2A"],sizes:[],desc:"Minimalist desk lamp with wireless charging pad, three colour temperatures, and an adjustable arm. Pairs seamlessly with any workspace aesthetic.",popular:423},
  {id:10,name:"Leather Card Holder",category:"Accessories",price:55,oldPrice:null,rating:4.8,reviews:189,image:["../assets/cardholder.jpg","../assets/cardholder.jpg","../assets/cardholder.jpg"],tag:null,stock:true,colors:["#8B6F47","#2C2C2A","#C8A97E"],sizes:[],desc:"Hand-stitched full-grain leather card holder. Holds 6–8 cards with a convenient cash slot. Developed to age beautifully with daily use.",popular:731},
  {id:11,name:"Plant Mist Diffuser",category:"Wellness",price:79,oldPrice:null,rating:4.4,reviews:56,image:["../assets/plant mist.webp","../assets/plant mist.webp","../assets/plant mist.webp"],tag:null,stock:true,colors:["#FFFFFF","#2C2C2A"],sizes:[],desc:"Ultrasonic essential oil diffuser with 8-hour runtime and LED ambient light modes. Doubles as a room humidifier. Whisper-quiet operation.",popular:189},
  {id:12,name:"Woven Storage Basket",category:"Home Decor",price:48,oldPrice:null,rating:4.3,reviews:43,image:["../assets/candles.jpg","images/candles.jpg","images/candles.jpg"],tag:null,stock:true,colors:["#E8E0D4","#8B6F47"],sizes:["S","M","L"],desc:"Hand-woven seagrass storage basket with leather handles. Naturally sustainable and incredibly durable. Perfect for blankets, magazines, or toy storage.",popular:178},
];

/* ── Merge admin-edited products from localStorage ──
   Admin saves flat product objects to lum_products.
   We merge stock/price/tag/rating updates into the store array
   so the store reflects admin changes without losing image arrays. */
(function mergeAdminProducts(){
  const adminProds = JSON.parse(localStorage.getItem('lum_products')||'null');
  if(!adminProds) return;
  adminProds.forEach(ap=>{
    const idx = PRODUCTS.findIndex(p=>p.id===ap.id);
    if(idx>-1){
      /* Update mutable fields from admin */
      PRODUCTS[idx].stock    = ap.stock;
      PRODUCTS[idx].price    = ap.price;
      PRODUCTS[idx].oldPrice = ap.oldPrice;
      PRODUCTS[idx].tag      = ap.tag;
      PRODUCTS[idx].rating   = ap.rating;
      PRODUCTS[idx].name     = ap.name;
      PRODUCTS[idx].category = ap.category;
      PRODUCTS[idx].desc     = ap.desc || PRODUCTS[idx].desc;
    } else {
      /* New product added from admin — build image array from single path */
      const imgPath = ap.image || 'assets/vase.png';
      const adjusted = imgPath.startsWith('assets/') ? '../'+imgPath : imgPath;
      PRODUCTS.push({...ap, image:[adjusted,adjusted,adjusted], colors:[], sizes:[]});
    }
  });
  /* Remove products deleted from admin */
  const adminIds = new Set(adminProds.map(p=>p.id));
  for(let i=PRODUCTS.length-1;i>=0;i--){
    if(!adminIds.has(PRODUCTS[i].id)) PRODUCTS.splice(i,1);
  }
})();

const CATEGORIES = [
  { name: "Home Decor", image: "../assets/home-decor.jpeg", count: 4 },
  { name: "Clothing", image: "../assets/clothing.jpeg", count: 3 },
  { name: "Electronics", image: "../assets/electronic.jpeg", count: 3 },
  { name: "Wellness", image: "../assets/wellness.jpeg", count: 2 },
  { name: "Accessories", image: "../assets/jewellry.jpeg", count: 3 },
  { name: "Sale", image: "../assets/sale1.png", count: 5 },
];
const TESTIMONIALS=[
  {text:"The quality exceeded every expectation. The cashmere throw arrived beautifully packaged and is absolutely divine.",author:"Sofia Mahmood",role:"Interior Designer",init:"SM"},
  {text:"I've been searching for a watch like this for years. The craftsmanship is impeccable and it pairs with everything.",author:"izza shahbaaz",role:"Creative Director",init:"JH"},
  {text:"EVERCARTO curation is second to none. Every product feels considered and intentional. My go-to for gifts.",author:"Ayesha Ilyas",role:"Stylist",init:"AT"},
];

let cart = JSON.parse(localStorage.getItem('lum_cart')||'[]');
let wishlist = JSON.parse(localStorage.getItem('lum_wish')||'[]');
let recentlyViewed = JSON.parse(localStorage.getItem('lum_recent')||'[]');
let currentView='grid', filteredProducts=[...PRODUCTS], currentPage=1;
const PER_PAGE=8;
let authMode='login', selectedProduct=null, searchTimeout=null;
let darkMode = localStorage.getItem('lum_dark')==='true';

function toggleDark(){
  darkMode=!darkMode;
  document.body.classList.toggle('dark',darkMode);
  document.getElementById('darkBtn').textContent=darkMode?'☀️':'🌙';
  localStorage.setItem('lum_dark',darkMode);
}
if(darkMode){document.body.classList.add('dark');document.getElementById('darkBtn').textContent='☀️';}

function showToast(msg,type='success'){
  const c=document.getElementById('toastContainer');
  const t=document.createElement('div');
  t.className=`toast toast-${type}`;
  const icons={success:'✓',error:'✕',info:'ℹ'};
  t.innerHTML=`<span>${icons[type]||'✓'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(()=>{t.style.animation='fadeOut .3s ease forwards';setTimeout(()=>t.remove(),300);},2800);
}

function saveCart(){localStorage.setItem('lum_cart',JSON.stringify(cart));updateBadges();}
function saveWish(){localStorage.setItem('lum_wish',JSON.stringify(wishlist));updateBadges();}
function saveRecent(){localStorage.setItem('lum_recent',JSON.stringify(recentlyViewed));}
function updateBadges(){
  const cc=cart.reduce((a,x)=>a+x.qty,0), wc=wishlist.length;
  const cb=document.getElementById('cartBadge'), wb=document.getElementById('wishBadge');
  cb.textContent=cc; cb.style.display=cc?'flex':'none';
  wb.textContent=wc; wb.style.display=wc?'flex':'none';
}
updateBadges();

function addToCart(pid,qty=1,size='',color=''){
  const p=PRODUCTS.find(x=>x.id===pid); if(!p)return;
  const key=`${pid}-${size}-${color}`;
  const ex=cart.find(x=>x.key===key);
  if(ex){ex.qty+=qty;}else{cart.push({key,pid,qty,size,color,name:p.name,price:p.price,image:p.image[0]});}
  saveCart();
  showToast(`"${p.name}" added to cart`,'success');
}
function removeFromCart(key){
  cart=cart.filter(x=>x.key!==key); saveCart(); renderCart();
  showToast('Item removed','info');
}
function updateQty(key,delta){
  const i=cart.find(x=>x.key===key); if(!i)return;
  i.qty=Math.max(1,i.qty+delta); saveCart(); renderCart();
}
function toggleWish(pid){
  const p=PRODUCTS.find(x=>x.id===pid); if(!p)return;
  const idx=wishlist.findIndex(x=>x.pid===pid);
  if(idx>=0){wishlist.splice(idx,1);showToast('Removed from wishlist','info');}
  else{wishlist.push({pid,name:p.name,price:p.price,image:p.image[0],category:p.category,rating:p.rating});showToast(`"${p.name}" added to wishlist`,'success');}
  saveWish(); refreshWishBtns();
}
function isWished(pid){return wishlist.some(x=>x.pid===pid);}
function refreshWishBtns(){
  document.querySelectorAll('[data-wish]').forEach(b=>{
    b.textContent=isWished(parseInt(b.dataset.wish))?'❤️':'🤍';
  });
}
function moveToCart(pid){addToCart(pid);wishlist=wishlist.filter(x=>x.pid!==pid);saveWish();renderWishlist();}
function removeWish(pid){wishlist=wishlist.filter(x=>x.pid!==pid);saveWish();renderWishlist();showToast('Removed from wishlist','info');}
function stars(r){return '★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r));}

function productCard(p){
  const w=isWished(p.id);
  return `<div class="product-card" onclick="openDetail(${p.id})">
    ${p.tag?`<span class="tag-badge ${p.tag==='New'?'tag-new':'tag-sale'}">${p.tag}</span>`:''}
    <button class="wishlist-btn" data-wish="${p.id}" onclick="event.stopPropagation();toggleWish(${p.id})">${w?'❤️':'🤍'}</button>
    <div class="product-img">
     <img src="${p.image[0]}" alt="${p.name}">
      <div class="product-img-overlay">
        <button class="overlay-btn" onclick="event.stopPropagation();openQuickView(${p.id})">👁</button>
        <button class="overlay-btn" onclick="event.stopPropagation();addToCart(${p.id})">🛒</button>
      </div>
    </div>
    <div class="product-body">
      <div class="product-category">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-rating"><span class="stars">${stars(p.rating)}</span><span class="rating-count">${p.rating} (${p.reviews})</span></div>
      <div class="product-footer">
        <div style="display:flex;align-items:baseline;gap:4px;flex-wrap:wrap">
          <span class="product-price">${fmtPKR(p.price)}</span>
          ${p.oldPrice?`<span class="product-price-old">${fmtPKR(p.oldPrice)}</span>`:''}
        </div>
        <button class="add-cart-btn" onclick="event.stopPropagation();addToCart(${p.id})">+</button>
      </div>
    </div>
  </div>`;
}

function skeletonCards(n){
  return Array(n).fill(0).map(()=>`<div class="skeleton-card"><div class="skeleton sk-img"></div><div class="sk-body"><div class="skeleton sk-line" style="width:40%"></div><div class="skeleton sk-line" style="width:80%"></div><div class="skeleton sk-line" style="width:60%"></div><div class="skeleton sk-line" style="width:50%"></div></div></div>`).join('');
}

function renderHome(){
 document.getElementById('categoriesGrid').innerHTML = CATEGORIES.map(c=>`
  <div class="category-card" onclick="filterByCategory('${c.name}')">
    
    <div class="category-img">
      <img src="${c.image}" alt="${c.name}">
    </div>

    <div class="category-name">${c.name}</div>
    <div class="category-count">${c.count} items</div>

  </div>
`).join('');
  const fg=document.getElementById('featuredGrid');
  fg.innerHTML=skeletonCards(4);
  setTimeout(()=>{fg.innerHTML=PRODUCTS.slice(0,4).map(productCard).join('');refreshWishBtns();},800);
  const tg=document.getElementById('trendingGrid');
  tg.innerHTML=skeletonCards(4);
  setTimeout(()=>{tg.innerHTML=[...PRODUCTS].sort((a,b)=>b.popular-a.popular).slice(0,4).map(productCard).join('');refreshWishBtns();},1000);
  document.getElementById('testimonialsGrid').innerHTML=TESTIMONIALS.map(t=>`
    <div class="testimonial-card">
      <div class="testimonial-quote">"${t.text}"</div>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.init}</div>
        <div><div class="testimonial-name">${t.author}</div><div class="testimonial-role">${t.role}</div></div>
        <span class="stars" style="margin-left:auto;font-size:14px">★★★★★</span>
      </div>
    </div>`).join('');
}

function filterByCategory(cat){
  goPage('shop');
  setTimeout(()=>{
    document.querySelectorAll('.filter-option input[type=checkbox]').forEach(cb=>{
      if(cb.id==='catAll')cb.checked=false;
      else cb.checked=(cb.value===cat);
    });
    filterProducts();
  },100);
}

function filterProducts(){
  const catCbs=[...document.querySelectorAll('.filter-option input[type=checkbox]:not(#catAll):not(#inStockOnly)')].filter(c=>c.checked).map(c=>c.value);
  const allCat=document.getElementById('catAll').checked;
  const minP=parseFloat(document.getElementById('priceMin').value)||0;
  const maxP=parseFloat(document.getElementById('priceMax').value)||999999;
  const minR=parseFloat(document.querySelector('input[name="rating"]:checked').value)||0;
  const inStock=document.getElementById('inStockOnly').checked;
  const sort=document.getElementById('sortSelect').value;

  filteredProducts=PRODUCTS.filter(p=>{
    if(!allCat&&catCbs.length&&!catCbs.includes(p.category))return false;
    if(pkr(p.price)<minP||pkr(p.price)>maxP)return false;
    if(p.rating<minR)return false;
    if(inStock&&!p.stock)return false;
    return true;
  });
  if(sort==='price-asc')filteredProducts.sort((a,b)=>a.price-b.price);
  else if(sort==='price-desc')filteredProducts.sort((a,b)=>b.price-a.price);
  else if(sort==='rating')filteredProducts.sort((a,b)=>b.rating-a.rating);
  else if(sort==='popular')filteredProducts.sort((a,b)=>b.popular-a.popular);
  else if(sort==='newest')filteredProducts.sort((a,b)=>b.id-a.id);
  currentPage=1; renderShopGrid();
}

function resetFilters(){
  document.getElementById('catAll').checked=true;
  document.querySelectorAll('.filter-option input[type=checkbox]:not(#catAll):not(#inStockOnly)').forEach(c=>c.checked=false);
  document.getElementById('priceMin').value=0;
  document.getElementById('priceMax').value=250000;
  document.querySelector('input[name="rating"][value="0"]').checked=true;
  document.getElementById('inStockOnly').checked=false;
  document.getElementById('sortSelect').value='default';
  filterProducts();
}

function setView(v){
  currentView=v;
  document.getElementById('viewGrid').classList.toggle('active',v==='grid');
  document.getElementById('viewList').classList.toggle('active',v==='list');
  renderShopGrid();
}

function renderShopGrid(){
  const start=(currentPage-1)*PER_PAGE,end=start+PER_PAGE;
  const pageProds=filteredProducts.slice(start,end);
  const g=document.getElementById('shopGrid');
  document.getElementById('resultsCount').textContent=`${filteredProducts.length} product${filteredProducts.length!==1?'s':''}`;
  if(currentView==='grid'){
    g.className='products-grid';
    g.innerHTML=pageProds.map(productCard).join('');
  }else{
    g.className='products-list';
    g.innerHTML=pageProds.map(p=>`
      <div class="product-list-card" onclick="openDetail(${p.id})">
        <div class="product-list-img">
        <img src="${p.image[0]}" alt="${p.name}">
      </div>
        <div class="product-list-body">
          <div>
            <div class="product-category">${p.category}</div>
            <div class="product-name" style="font-size:24px;margin-bottom:8px">${p.name}</div>
            <div class="product-rating"><span class="stars">${stars(p.rating)}</span><span class="rating-count">${p.rating} (${p.reviews})</span></div>
            <p style="font-size:14px;color:var(--txt2);margin-top:8px;max-width:500px">${p.desc.substring(0,100)}...</p>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:baseline;gap:8px">
              <span style="font-size:20px;font-weight:500">${fmtPKR(p.price)}</span>
              ${p.oldPrice?`<span class="product-price-old">${fmtPKR(p.oldPrice)}</span>`:''}
              ${!p.stock?'<span style="font-size:12px;color:#A32D2D;font-weight:500">Out of Stock</span>':''}
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn-outline" style="padding:8px 16px;font-size:12px" onclick="event.stopPropagation();toggleWish(${p.id})" data-wish="${p.id}">${isWished(p.id)?'❤️':'🤍'} Wishlist</button>
              <button class="btn-primary" style="padding:8px 18px;font-size:12px" onclick="event.stopPropagation();addToCart(${p.id})" ${!p.stock?'disabled style="opacity:.5"':''}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>`).join('');
  }
  refreshWishBtns(); renderPagination();
}

function renderPagination(){
  const total=Math.ceil(filteredProducts.length/PER_PAGE);
  const pg=document.getElementById('shopPagination');
  if(total<=1){pg.innerHTML='';return;}
  let html='';
  for(let i=1;i<=total;i++){
    if(i===1||i===total||Math.abs(i-currentPage)<=1)html+=`<button class="page-btn${i===currentPage?' active':''}" onclick="gotoPage(${i})">${i}</button>`;
    else if(Math.abs(i-currentPage)===2)html+=`<span class="page-btn dots">…</span>`;
  }
  pg.innerHTML=`<button class="page-btn" onclick="gotoPage(${Math.max(1,currentPage-1)})">‹</button>${html}<button class="page-btn" onclick="gotoPage(${Math.min(total,currentPage+1)})">›</button>`;
}
function gotoPage(n){currentPage=n;renderShopGrid();window.scrollTo(0,100);}

function openDetail(pid){
  selectedProduct=PRODUCTS.find(x=>x.id===pid); if(!selectedProduct)return;
  addRecentlyViewed(pid); goPage('detail'); renderDetail();
}
function addRecentlyViewed(pid){
  recentlyViewed=recentlyViewed.filter(x=>x!==pid);
  recentlyViewed.unshift(pid);
  if(recentlyViewed.length>6)recentlyViewed.pop();
  saveRecent();
}

function renderDetail(){
  const p=selectedProduct;
  document.getElementById('detailBreadcrumb').innerHTML=`<button onclick="goPage('home')">Home</button><span class="breadcrumb-sep">›</span><button onclick="goPage('shop')">Shop</button><span class="breadcrumb-sep">›</span><span style="color:var(--txt)">${p.name}</span>`;
  const disc=p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):null;
  const thumbs = p.image;
  document.getElementById('detailLayout').innerHTML=`
    <div>
      <div class="gallery-main" id="galleryMain">
        <img src="${p.image[0]}" alt="${p.name}">
      </div>
      <div class="gallery-thumbs">
  ${thumbs.map((img,i)=>`
    <div class="gallery-thumb ${i===0?'active':''}" 
         onclick="selectThumb(this,'${img}')">
      <img src="${img}" alt="${p.name}">
    </div>
  `).join('')}
</div>
    </div>
    <div>
      <div class="detail-brand">${p.category}</div>
      <h1 class="detail-title">${p.name}</h1>
      <div class="detail-price">
        <span class="detail-price-main">${fmtPKR(p.price)}</span>
        ${p.oldPrice?`<span class="detail-price-old">${fmtPKR(p.oldPrice)}</span><span class="detail-price-badge">-${disc}%</span>`:''}
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px">
        <span class="stars" style="font-size:16px;letter-spacing:2px">${stars(p.rating)}</span>
        <span style="font-size:14px;color:var(--txt2)">${p.rating} · ${p.reviews} reviews</span>
      </div>
      ${p.colors.length?`<div class="option-label">Color</div><div class="options-group">${p.colors.map((c,i)=>`<div class="color-chip${i===0?' active':''}" style="background:${c};${c==='#FFFFFF'?'border:1px solid var(--border)':''}" onclick="selectColor(this,'${c}')"></div>`).join('')}</div>`:''}
      ${p.sizes.length?`<div class="option-label">Size</div><div class="options-group">${p.sizes.map((s,i)=>`<div class="option-chip${i===0?' active':''}" onclick="selectSize(this,'${s}')">${s}</div>`).join('')}</div>`:''}
      <div class="option-label">Quantity</div>
      <div class="qty-control">
        <button class="qty-btn" onclick="detailQty(-1)">−</button>
        <div class="qty-num" id="detailQtyNum">1</div>
        <button class="qty-btn" onclick="detailQty(1)">+</button>
      </div>
      <div class="detail-actions">
        <button class="btn-cart" onclick="detailAddCart()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Cart
        </button>
        <button class="btn-wish" onclick="toggleWish(${p.id});this.textContent=isWished(${p.id})?'❤️':'🤍'">${isWished(p.id)?'❤️':'🤍'}</button>
        <button class="btn-primary" style="flex:1;min-width:120px" onclick="detailBuyNow()">Buy Now</button>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px">
        ${['🚚 Free shipping','🔄 30-day returns','🔒 Secure checkout'].map(s=>`<span style="font-size:13px;color:var(--txt2)">${s}</span>`).join('')}
      </div>
      <div class="detail-tabs">
        <div class="detail-tab active" onclick="switchTab(this,'desc')">Description</div>
        <div class="detail-tab" onclick="switchTab(this,'spec')">Details</div>
        <div class="detail-tab" onclick="switchTab(this,'rev')">Reviews (${p.reviews})</div>
      </div>
      <div id="tabContent"><p style="font-size:15px;color:var(--txt2);line-height:1.8">${p.desc}</p></div>
    </div>`;
  window._detailQty=1;window._detailSize=p.sizes[0]||'';window._detailColor=p.colors[0]||'';
  const rv=document.getElementById('recentlyViewed');
  const others=recentlyViewed.filter(id=>id!==p.id).slice(0,4);
  if(others.length){
    rv.innerHTML=`<div style="margin-bottom:24px"><p class="section-label">You Viewed</p><h3 style="font-family:Cormorant Garamond,serif;font-size:24px;font-weight:300;margin-bottom:20px">Recently Viewed</h3></div><div class="products-grid">${others.map(id=>productCard(PRODUCTS.find(x=>x.id===id))).join('')}</div>`;
    refreshWishBtns();
  }else{rv.innerHTML='';}
}

function selectThumb(el,img){document.querySelectorAll('.gallery-thumb').forEach(t=>t.classList.remove('active'));el.classList.add('active');document.getElementById('galleryMain').innerHTML =`<img src="${img}" alt="">`;}
function selectColor(el){document.querySelectorAll('.color-chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');}
function selectSize(el,s){document.querySelectorAll('.option-chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');window._detailSize=s;}
function detailQty(d){window._detailQty=Math.max(1,window._detailQty+d);document.getElementById('detailQtyNum').textContent=window._detailQty;}
function detailAddCart(){addToCart(selectedProduct.id,window._detailQty,window._detailSize,window._detailColor);}
function detailBuyNow(){addToCart(selectedProduct.id,window._detailQty,window._detailSize,window._detailColor);goPage('checkout');}
function switchTab(el,tab){
  document.querySelectorAll('.detail-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');
  const p=selectedProduct,tc=document.getElementById('tabContent');
  if(tab==='desc')tc.innerHTML=`<p style="font-size:15px;color:var(--txt2);line-height:1.8">${p.desc}</p>`;
  else if(tab==='spec')tc.innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:14px">
    <div style="padding:12px;background:var(--bg2);border-radius:var(--rad-sm)"><div style="color:var(--txt3);margin-bottom:4px">Category</div><div style="font-weight:500">${p.category}</div></div>
    <div style="padding:12px;background:var(--bg2);border-radius:var(--rad-sm)"><div style="color:var(--txt3);margin-bottom:4px">Price</div><div style="font-weight:500">${fmtPKR(p.price)}</div></div>
    <div style="padding:12px;background:var(--bg2);border-radius:var(--rad-sm)"><div style="color:var(--txt3);margin-bottom:4px">Rating</div><div style="font-weight:500">${p.rating}★ (${p.reviews})</div></div>
    <div style="padding:12px;background:var(--bg2);border-radius:var(--rad-sm)"><div style="color:var(--txt3);margin-bottom:4px">Availability</div><div style="font-weight:500;color:${p.stock?'var(--success)':'var(--danger)'}">${p.stock?'In Stock':'Out of Stock'}</div></div>
  </div>`;
  else tc.innerHTML=['Fatima K.','Hamza R.','Ayesha N.','Usman T.'].map((n,i)=>`
    <div class="review-item">
      <div class="review-header">
        <div class="reviewer-avatar">${n.split(' ').map(w=>w[0]).join('')}</div>
        <div><div class="reviewer-name">${n}</div><div class="stars" style="font-size:12px">★★★★${i===2?'☆':'★'}</div></div>
        <span class="reviewer-date">March ${10+i*4}, 2026</span>
      </div>
      <p style="font-size:14px;color:var(--txt2)">Absolutely love this product. The quality is exceptional and delivery was prompt. Would definitely recommend.</p>
    </div>`).join('');
}

function openQuickView(pid){
  const p=PRODUCTS.find(x=>x.id===pid); if(!p)return;
  document.getElementById('quickViewContent').innerHTML=`
    <button class="modal-close" onclick="closeQuickView()">✕</button>
    <div class="modal-grid">
      <div class="modal-img">
        <img src="${p.image[0]}" alt="${p.name}">
      </div>
      <div>
        <div class="detail-brand">${p.category}</div>
        <div style="font-family:Cormorant Garamond,serif;font-size:28px;font-weight:300;margin-bottom:12px">${p.name}</div>
        <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px;flex-wrap:wrap">
          <span style="font-size:22px;font-weight:500">${fmtPKR(p.price)}</span>
          ${p.oldPrice?`<span style="font-size:14px;color:var(--txt3);text-decoration:line-through">${fmtPKR(p.oldPrice)}</span>`:''}
        </div>
        <div class="product-rating" style="margin-bottom:16px"><span class="stars">${stars(p.rating)}</span><span class="rating-count">${p.rating} (${p.reviews})</span></div>
        <p style="font-size:14px;color:var(--txt2);line-height:1.7;margin-bottom:20px">${p.desc.substring(0,120)}...</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn-primary" style="flex:1;padding:12px 20px;font-size:12px" onclick="addToCart(${pid});closeQuickView()">Add to Cart</button>
          <button class="btn-outline" style="padding:12px 16px;font-size:12px" onclick="openDetail(${pid});closeQuickView()">View Full</button>
          <button class="btn-outline" style="padding:12px 14px" onclick="toggleWish(${pid});this.textContent=isWished(${pid})?'❤️':'🤍'">${isWished(pid)?'❤️':'🤍'}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('quickViewModal').style.display='flex';
}
function closeQuickView(e){
  if(e&&e.target!==document.getElementById('quickViewModal'))return;
  document.getElementById('quickViewModal').style.display='none';
}

function renderCart(){
  const cl=document.getElementById('cartLayout');
  if(!cart.length){
    cl.innerHTML=`<div style="grid-column:1/-1"><div class="empty-state"><div class="empty-icon">🛒</div><h2 class="empty-title">Your cart is empty</h2><p class="empty-sub">Looks like you haven't added anything yet.</p><button class="btn-primary" onclick="goPage('shop')">Start Shopping</button></div></div>`;
    return;
  }
  const subtotal=cart.reduce((a,x)=>a+pkr(x.price)*x.qty,0);
  const tax=Math.round(subtotal*0.18);
  const total=subtotal+tax;
  cl.innerHTML=`
    <div>
      <h2 style="font-family:Cormorant Garamond,serif;font-size:28px;font-weight:300;margin-bottom:24px">Shopping Cart <span style="font-size:16px;color:var(--txt3);font-family:DM Sans,sans-serif">(${cart.reduce((a,x)=>a+x.qty,0)} items)</span></h2>
      ${cart.map(item=>`
        <div class="cart-item">
          <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-variant">${[item.size&&`Size: ${item.size}`,item.color&&`Color: ${item.color}`].filter(Boolean).join(' · ')||'Standard'}</div>
            <div class="qty-control" style="margin:0">
              <button class="qty-btn" onclick="updateQty('${item.key}',-1)">−</button>
              <div class="qty-num">${item.qty}</div>
              <button class="qty-btn" onclick="updateQty('${item.key}',1)">+</button>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:12px">
            <span style="font-size:16px;font-weight:500">Rs ${(pkr(item.price)*item.qty).toLocaleString('en-PK')}</span>
            <button onclick="removeFromCart('${item.key}')" style="font-size:12px;color:var(--txt3);letter-spacing:1px;text-transform:uppercase;transition:.2s;padding:4px" onmouseover="this.style.color='#A32D2D'" onmouseout="this.style.color='var(--txt3)'">Remove</button>
          </div>
        </div>`).join('')}
    </div>
    <div class="order-summary">
      <div class="summary-title">Order Summary</div>
      <div class="summary-row"><span class="summary-row-label">Subtotal</span><span class="summary-row-val">Rs ${subtotal.toLocaleString('en-PK')}</span></div>
      <div class="summary-row"><span class="summary-row-label">Shipping</span><span class="summary-row-val" style="color:var(--success)">Free</span></div>
      <div class="summary-row"><span class="summary-row-label">GST (18%)</span><span class="summary-row-val">Rs ${tax.toLocaleString('en-PK')}</span></div>
      <div class="summary-total"><div class="summary-row"><span class="summary-row-label">Total</span><span class="summary-row-val">Rs ${total.toLocaleString('en-PK')}</span></div></div>
      <div class="coupon-row">
        <input type="text" class="coupon-input" id="couponInput" placeholder="Coupon code"/>
        <button class="coupon-btn" onclick="applyCoupon()">Apply</button>
      </div>
      <button class="btn-primary" style="width:100%;padding:15px;font-size:13px;letter-spacing:2px" onclick="goPage('checkout')">Proceed to Checkout →</button>
      <button class="btn-outline" style="width:100%;padding:12px;font-size:12px;letter-spacing:1.5px;margin-top:10px" onclick="goPage('shop')">Continue Shopping</button>
    </div>`;
}

function applyCoupon(){
  const code=document.getElementById('couponInput').value.trim().toUpperCase();
  if(code==='LUMIERE15'||code==='SAVE15')showToast('Coupon applied! 15% off','success');
  else if(code==='WELCOME')showToast('Welcome coupon! 10% off','success');
  else showToast('Invalid coupon code','error');
}

function renderCheckout(){
  const subtotal=cart.reduce((a,x)=>a+pkr(x.price)*x.qty,0);
  const tax=Math.round(subtotal*0.18);
  const total=subtotal+tax;
  document.getElementById('checkoutLayout').innerHTML=`
    <div>
      <div class="checkout-section">
        <h2 class="checkout-section-title">Shipping Information</h2>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">First Name</label><input class="form-input" id="fname" placeholder="Ali" oninput="clearErr('fname')"/><span class="form-error" id="fnameErr"></span></div>
          <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" id="lname" placeholder="Khan" oninput="clearErr('lname')"/><span class="form-error" id="lnameErr"></span></div>
          <div class="form-group full"><label class="form-label">Email</label><input class="form-input" id="email" type="email" placeholder="ali@email.com" oninput="clearErr('email')"/><span class="form-error" id="emailErr"></span></div>
          <div class="form-group full"><label class="form-label">Address</label><input class="form-input" id="addr" placeholder="House 12, Block B, Gulberg" oninput="clearErr('addr')"/><span class="form-error" id="addrErr"></span></div>
          <div class="form-group"><label class="form-label">City</label><input class="form-input" id="city" placeholder="Lahore"/></div>
          <div class="form-group"><label class="form-label">Postal Code</label><input class="form-input" id="zip" placeholder="54000" oninput="clearErr('zip')"/><span class="form-error" id="zipErr"></span></div>
          <div class="form-group full"><label class="form-label">Province</label>
            <select class="form-input" id="country">
              <option>Punjab</option><option>Sindh</option><option>KPK</option><option>Balochistan</option><option>Islamabad</option><option>AJK</option>
            </select>
          </div>
        </div>
      </div>
      <div class="checkout-section">
        <h2 class="checkout-section-title">Payment Method</h2>
        <div class="payment-option active" onclick="selectPay(this)"><input type="radio" name="pay" checked/><span class="payment-label">Credit / Debit Card></div>
        <div class="payment-option" onclick="selectPay(this)"><input type="radio" name="pay"/><span class="payment-label">JazzCash</span></div>
        <div class="payment-option" onclick="selectPay(this)"><input type="radio" name="pay"/><span class="payment-label">EasyPaisa</span></div>
        <div class="payment-option" onclick="selectPay(this)"><input type="radio" name="pay"/><span class="payment-label">Cash on Delivery</span></div>
        <div id="cardFields" style="margin-top:16px">
          <div class="form-grid">
            <div class="form-group full"><label class="form-label">Card Number</label><input class="form-input" placeholder="•••• •••• •••• ••••" maxlength="19" oninput="formatCard(this)"/></div>
            <div class="form-group"><label class="form-label">Expiry</label><input class="form-input" placeholder="MM / YY" maxlength="7"/></div>
            <div class="form-group"><label class="form-label">CVV</label><input class="form-input" placeholder="•••" maxlength="4" type="password"/></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="order-summary">
        <div class="summary-title">Order Summary</div>
        ${cart.map(i=>`<div class="summary-row"><span class="summary-row-label" style="flex:1">${i.name} ×${i.qty}</span><span class="summary-row-val">Rs ${(pkr(i.price)*i.qty).toLocaleString('en-PK')}</span></div>`).join('')}
        <div class="summary-row"><span class="summary-row-label">Shipping</span><span class="summary-row-val" style="color:var(--success)">Free</span></div>
        <div class="summary-row"><span class="summary-row-label">GST (18%)</span><span class="summary-row-val">Rs ${tax.toLocaleString('en-PK')}</span></div>
        <div class="summary-total"><div class="summary-row"><span class="summary-row-label">Total</span><span class="summary-row-val">Rs ${total.toLocaleString('en-PK')}</span></div></div>
        <button class="btn-primary" style="width:100%;padding:15px;font-size:13px;letter-spacing:2px" onclick="placeOrder()">Place Order →</button>
      </div>
    </div>`;
}

function selectPay(el){
  document.querySelectorAll('.payment-option').forEach(o=>o.classList.remove('active'));
  el.classList.add('active'); el.querySelector('input[type=radio]').checked=true;
  const cf=document.getElementById('cardFields');
  if(cf)cf.style.display=el.querySelector('.payment-label').textContent.includes('Card')?'block':'none';
}
function formatCard(el){let v=el.value.replace(/\D/g,'').substring(0,16);el.value=v.replace(/(.{4})/g,'$1 ').trim();}
function clearErr(id){document.getElementById(id).classList.remove('error');document.getElementById(id+'Err').textContent='';}
function placeOrder(){
  const fields=[{id:'fname',label:'First name'},{id:'lname',label:'Last name'},{id:'email',label:'Email',type:'email'},{id:'addr',label:'Address'},{id:'zip',label:'Postal code'}];
  let valid=true;
  fields.forEach(f=>{
    const el=document.getElementById(f.id),err=document.getElementById(f.id+'Err');
    if(!el||!el.value.trim()){el.classList.add('error');err.textContent=`${f.label} is required`;valid=false;}
    else if(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)){el.classList.add('error');err.textContent='Please enter a valid email';valid=false;}
  });
  if(!valid){showToast('Please fill all required fields','error');return;}

  /* ── Save order to localStorage for admin dashboard ── */
  const fname=document.getElementById('fname').value.trim();
  const lname=document.getElementById('lname').value.trim();
  const email=document.getElementById('email').value.trim();
  const addr =document.getElementById('addr').value.trim();
  const city =document.getElementById('city').value.trim();
  const zip  =document.getElementById('zip').value.trim();
  const prov =document.getElementById('country').value;
  const payEl=document.querySelector('.payment-option.active .payment-label');
  const pay  =payEl?payEl.textContent:'Cash on Delivery';

  const subtotal=cart.reduce((a,x)=>a+pkr(x.price)*x.qty,0);
  const tax=Math.round(subtotal*0.18);
  const total=subtotal+tax;
  const existingOrders=JSON.parse(localStorage.getItem('lum_orders')||'[]');
  const orderId='#LM2026-'+String(existingOrders.length+1).padStart(4,'0');

  const newOrder={
    id: orderId,
    customer: fname+' '+lname,
    email, payment: pay,
    address: addr+', '+city+', '+prov+' '+zip,
    items: cart.map(x=>({pid:x.pid,name:x.name,price:x.price,qty:x.qty,image:x.image||'',size:x.size||'',color:x.color||''})),
    subtotal, tax, total, status:'Pending',
    date: new Date().toISOString(),
  };
  existingOrders.push(newOrder);
  localStorage.setItem('lum_orders',JSON.stringify(existingOrders));
  /* ── end order save ── */

  cart=[];saveCart();
  document.getElementById('orderNum').textContent=orderId;
  goPage('success');showToast('Order placed successfully!','success');
}

function renderAuth(){
  document.getElementById('authLayout').innerHTML=`
    <div class="auth-card">
      <div class="auth-logo">LUMIÈRE</div>
      <div class="auth-sub">${authMode==='login'?'Welcome back. Sign in to continue.':authMode==='signup'?'Create your account.':'Reset your password.'}</div>
      <div class="auth-form">
        ${authMode==='signup'?`<div class="form-group"><label class="form-label">Full Name</label><input class="form-input" placeholder="Ali Khan"/></div>`:''}
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="your@email.com" id="authEmail"/></div>
        ${authMode!=='forgot'?`<div class="form-group"><label class="form-label">Password</label><input class="form-input" type="password" placeholder="••••••••"/></div>`:''}
        ${authMode==='signup'?`<div class="form-group"><label class="form-label">Confirm Password</label><input class="form-input" type="password" placeholder="••••••••"/></div>`:''}
        <button class="btn-primary" style="width:100%;padding:14px;font-size:13px;letter-spacing:2px;margin-top:4px" onclick="doAuth()">
          ${authMode==='login'?'Sign In →':authMode==='signup'?'Create Account →':'Send Reset Link →'}
        </button>
      </div>
      ${authMode!=='forgot'?`<div class="divider"><div class="divider-line"></div><span class="divider-text">or</span><div class="divider-line"></div></div>
      <button class="social-btn">🌐 Continue with Google</button>
      <button class="social-btn">📱 Continue with Phone</button>`:''}
      <div class="auth-footer">
        ${authMode==='login'?`Don't have an account? <span class="auth-link" onclick="setAuthMode('signup')">Sign up</span> · <span class="auth-link" onclick="setAuthMode('forgot')">Forgot password?</span>`:''}
        ${authMode==='signup'?`Already have an account? <span class="auth-link" onclick="setAuthMode('login')">Sign in</span>`:''}
        ${authMode==='forgot'?`<span class="auth-link" onclick="setAuthMode('login')">← Back to login</span>`:''}
      </div>
    </div>`;
}
function setAuthMode(m){authMode=m;renderAuth();}
function doAuth(){
  const e=document.getElementById('authEmail');
  if(!e||!e.value){showToast('Please enter your email','error');return;}
  if(authMode==='login')showToast('Welcome back to LUMIÈRE!','success');
  else if(authMode==='signup')showToast('Account created successfully!','success');
  else showToast('Reset link sent to your email','info');
  setTimeout(()=>goPage('home'),1000);
}

function renderWishlist(){
  document.getElementById('wishlistCount').textContent=`${wishlist.length} item${wishlist.length!==1?'s':''}`;
  const wc=document.getElementById('wishlistContent');
  if(!wishlist.length){
    wc.innerHTML=`<div class="empty-state"><div class="empty-icon">🤍</div><h2 class="empty-title">Your wishlist is empty</h2><p class="empty-sub">Save items you love by clicking the heart icon on any product.</p><button class="btn-primary" onclick="goPage('shop')">Browse Products</button></div>`;
    return;
  }
  wc.innerHTML=`<div class="wishlist-grid">${wishlist.map(item=>`
    <div class="wishlist-card">
      <div class="wishlist-img">
      <img src="${item.image}" alt="${item.name}">
    </div>
      <div class="wishlist-body">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:4px">${item.category}</div>
        <div class="product-name" style="font-size:18px">${item.name}</div>
        <div class="product-rating" style="margin:6px 0"><span class="stars" style="font-size:12px">${stars(item.rating)}</span></div>
        <div style="font-size:16px;font-weight:500;margin-bottom:12px">${fmtPKR(item.price)}</div>
        <div class="wishlist-actions">
          <button class="btn-move-cart" onclick="moveToCart(${item.pid})">Add to Cart</button>
          <button class="btn-remove" onclick="removeWish(${item.pid})">✕</button>
        </div>
      </div>
    </div>`).join('')}</div>`;
}

function debounceSearch(q){clearTimeout(searchTimeout);searchTimeout=setTimeout(()=>runSearch(q),350);}
function runSearch(q){
  if(!q.trim())return;
  const r=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.category.toLowerCase().includes(q.toLowerCase())||p.desc.toLowerCase().includes(q.toLowerCase()));
  document.getElementById('searchTitle').textContent=`"${q}" — ${r.length} result${r.length!==1?'s':''}`;
  const sr=document.getElementById('searchResults');
  if(!r.length){sr.innerHTML=`<div class="no-results"><div class="no-results-icon">🔍</div><h3 style="font-family:Cormorant Garamond,serif;font-size:24px;font-weight:300;margin-bottom:8px">No results found</h3><p style="color:var(--txt2);margin-bottom:20px">Try different keywords or browse our collections.</p><button class="btn-primary" onclick="goPage('shop')">Browse All Products</button></div>`;return;}
  sr.innerHTML=`<div class="products-grid">${r.map(productCard).join('')}</div>`;
  refreshWishBtns();
}

function subscribeNewsletter(){
  const e=document.getElementById('nlEmail').value;
  if(!e||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){showToast('Please enter a valid email','error');return;}
  showToast('Subscribed! Code: LUMIERE15 for 15% off','success');
  document.getElementById('nlEmail').value='';
}

function goPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  const nb=document.getElementById('nav-'+name);
  if(nb)nb.classList.add('active');
  window.scrollTo(0,0);
  if(name==='cart')renderCart();
  else if(name==='checkout')renderCheckout();
  else if(name==='auth')renderAuth();
  else if(name==='wishlist')renderWishlist();
  else if(name==='shop')filterProducts();
}

renderHome();
filterProducts();
//for scroll to specific section
  function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
      // Smoothly scroll to the section
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  //footer
  window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});