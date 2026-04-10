# EVERCARTO — Premium E-Commerce Web Application

A production-level frontend e-commerce platform built entirely with HTML, CSS, and Vanilla JavaScript — no frameworks, no build tools, no backend. Designed for a luxury lifestyle brand targeting the Pakistani market, with PKR pricing, local payment methods, and full admin control.

## Live Features

### Storefront
- Multi-page SPA (Home, Shop, Product Detail, Cart, Checkout, Wishlist, Search, Auth, Order Success)
- Product listing with grid/list toggle, category filters, price range, rating filter, and sorting
- Product detail page with image gallery, size/color selector, quantity control, and tabbed reviews
- Cart with quantity management, coupon codes (LUMIERE15, WELCOME, SAVE15), and GST calculation
- Checkout with full form validation, JazzCash / EasyPaisa / Card / COD payment options
- Wishlist with move-to-cart functionality — persisted in localStorage
- Debounced search with live results and "no results" state
- Quick View modal, Recently Viewed products, Skeleton loaders, Toast notifications
- Dark / Light mode toggle — persisted across sessions
- Fully responsive — mobile, tablet, desktop

### Support Pages
- Help Centre hub with live FAQ search
- FAQ with accordion (17 questions across 6 categories)
- Shipping info with delivery rates table and service area coverage
- Returns policy with eligibility table and step-by-step process
- Contact form with validation, WhatsApp / phone / email details

### Company Pages
- About page with brand story, stats, values, and team section
- Blog with category filters, featured article, and load-more
- Careers with culture cards, benefits, and filterable job listings
- Press page with media coverage grid, press releases, and press kit

### Admin Dashboard
- Login screen (admin@evercarto.pk / admin123)
- Dashboard with live revenue chart (7/30/90-day), top products, category donut
- Analytics with SVG line chart, KPI cards, order status breakdown
- Products CRUD — add, edit, delete, toggle stock — syncs to storefront via localStorage
- Categories CRUD with image paths and active/inactive toggle
- Coupons CRUD — percentage or fixed, expiry dates, usage limits
- Orders — real orders from storefront appear here, status management, full order detail modal, demo data seeder
- Customers table with order history per customer
- Settings — store info, GST rate, appearance, notifications, admin account

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Google Fonts — Cormorant Garamond + DM Sans
- localStorage for cart, wishlist, orders, products, and settings
- No frameworks, no npm, no build step — open index.html and go


