// ── CURSOR ──
const cursor = document.getElementById('cursor');
if(cursor) document.addEventListener('mousemove', e => { cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px'; });

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE NAV ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => { const nl = document.getElementById('navLinks'); if(nl) nl.classList.remove('open'); });
});

// ── CART STORAGE ──
function getCart() {
  try { return JSON.parse(localStorage.getItem('nv_cart') || '[]'); } catch(e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem('nv_cart', JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s,i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount, #cartCountMobile').forEach(el => { if(el) el.textContent = total; });
}
function addToCartById(id, btn) {
  const product = PRODUCTS.find(p => p.id === id);
  if(!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if(existing) existing.qty += 1;
  else cart.push({ id: product.id, name: product.name, price: product.price, mrp: product.mrp, emoji: product.emoji, category: product.category, qty: 1 });
  saveCart(cart);
  if(btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#2d5a3d';
    btn.style.color = '#f5d87a';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1800);
  }
  showToast('Added to cart! 🛒');
}

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if(!toast) { toast = document.createElement('div'); toast.id='globalToast'; toast.className='toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// ── REVEAL ON SCROLL ──
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', () => { initReveal(); updateCartBadge(); renderFooter(); });

// ── CONTACT FORM ──
function submitForm(btn) {
  btn.textContent = '✓ Enquiry Sent! We\'ll contact you soon.';
  btn.style.background = 'linear-gradient(135deg,#2d5a3d,#3d7a52)';
  setTimeout(() => { btn.textContent = 'Send Enquiry →'; btn.style.background = ''; }, 3500);
}

// ── RENDER FOOTER ──
function renderFooter() {
  const fp = document.getElementById('footer-placeholder');
  if(!fp) return;
  fp.outerHTML = `
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo">Nutri<span>Veda</span></div>
        <p>Premium nutrition rooted in Ayurvedic wisdom and modern science. Based in Hyderabad, serving all of India.</p>
        <div class="footer-social">
          <div class="social-btn">📘</div>
          <div class="social-btn">📸</div>
          <div class="social-btn">🐦</div>
          <div class="social-btn">💬</div>
        </div>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <ul>
          <li><a href="products.html?cat=protein">Protein Powders</a></li>
          <li><a href="products.html?cat=vitamins">Vitamins & Supplements</a></li>
          <li><a href="products.html?cat=herbal">Herbal Blends</a></li>
          <li><a href="products.html?cat=kids">Kids Nutrition</a></li>
          <li><a href="products.html?cat=porridge">Porridge & Mixes</a></li>
          <li><a href="products.html">All Products</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="index.html#why-us">About Us</a></li>
          <li><a href="index.html#testimonials">Reviews</a></li>
          <li><a href="index.html#contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+917893639037">📞 +91 78936 39037</a></li>
          <li><a href="mailto:nidigondaravindar@gmail.com">✉️ nidigondaravindar@gmail.com</a></li>
          <li><a href="#">📍 Chandanagar, Hyderabad 500049</a></li>
          <li><a href="cart.html">🛒 My Cart</a></li>
        </ul>
      </div>
    </div>
    <hr class="footer-divider">
    <div class="footer-bottom">
      <span>© 2025 NutriVeda. All rights reserved. Owned by Ravindar Nidigonda.</span>
      <span>Made with 💚 in Hyderabad</span>
    </div>
  </footer>`;
}
