# 🚀 QUICK START GUIDE - NutriVeda Website

## ⚡ Start in 3 Steps

### 1. Open Terminal in Project Folder
```powershell
cd c:\vs_workSpace\nutriveda-website\nutriveda
```

### 2. Start Local Server
```powershell
npx http-server
```

### 3. Open in Browser
```
http://127.0.0.1:8080/index.html
```

**That's it! Your site is running! 🎉**

---

## 📁 Project Structure (Simple View)

```
nutriveda/
│
├── index.html          ← Homepage (START HERE)
│
├── css/
│   └── styles.css      ← All styling
│
├── js/
│   ├── data.js         ← 94 products data
│   └── common.js       ← Shared functions
│
├── pages/
│   ├── products.html   ← All products
│   ├── cart.html       ← Shopping cart
│   ├── checkout.html   ← Checkout
│   └── [15 collection pages]
│
├── docs/               ← Documentation
├── scripts/            ← Automation scripts
└── assets/             ← Images (future)
```

---

## 🔗 Important URLs

| Page | URL |
|------|-----|
| **Homepage** | http://127.0.0.1:8080/index.html |
| **All Products** | http://127.0.0.1:8080/pages/products.html |
| **Shopping Cart** | http://127.0.0.1:8080/pages/cart.html |
| **Makhana** | http://127.0.0.1:8080/pages/makhana.html |
| **Malts** | http://127.0.0.1:8080/pages/malts.html |
| **Cooking** | http://127.0.0.1:8080/pages/cooking.html |

---

## 🎯 Navigation Flow

```
index.html (Homepage)
    ↓
    ├→ pages/products.html (All Products)
    │       ↓
    │       ├→ pages/product.html?id=X (Product Details)
    │       │       ↓
    │       │       └→ pages/cart.html (Cart)
    │       │               ↓
    │       │               └→ pages/checkout.html
    │       │                       ↓
    │       │                       └→ pages/confirmation.html
    │       │
    │       └→ Collection Pages:
    │           ├→ pages/healthy-snacks.html
    │           ├→ pages/kids-nutrition.html
    │           ├→ pages/makhana.html
    │           ├→ pages/malts.html
    │           ├→ pages/amla.html
    │           ├→ pages/instant-mix.html
    │           └→ pages/cooking.html
    │           (and 8 more...)
    │
    └→ pages/cart.html (Direct from navbar)
```

---

## 🛠️ Common Tasks

### Add a New Product
1. Open `js/data.js`
2. Add new product object to PRODUCTS array
3. Increment the `id` number
4. Save file
5. Hard refresh browser (`Ctrl+Shift+R`)

### Modify Styles
1. Open `css/styles.css`
2. Make changes
3. Save file
4. Hard refresh browser (`Ctrl+Shift+R`)

### Add a New Page
1. Create `pages/new-page.html`
2. Use this template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — NutriVeda</title>
  <link rel="stylesheet" href="../css/styles.css?v=3">
</head>
<body>
  <!-- Your content here -->
  <script src="../js/data.js?v=3"></script>
  <script src="../js/common.js"></script>
</body>
</html>
```
3. Note the `../` prefix for paths!

---

## 🐛 Troubleshooting

### Problem: "Cannot GET /index.html"
**Solution:** Make sure you're in the right folder:
```powershell
cd c:\vs_workSpace\nutriveda-website\nutriveda
npx http-server
```

### Problem: Styles not loading
**Solution:** Hard refresh:
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Problem: Old version showing
**Solution:** Clear browser cache or use Incognito mode

### Problem: JS errors in console
**Solution:** Check file paths - should be:
- From `index.html`: `js/data.js`
- From `pages/*.html`: `../js/data.js`

---

## 📝 File Path Rules

### From `index.html` (root):
```html
<link href="css/styles.css">
<script src="js/data.js"></script>
<a href="pages/products.html">
```

### From `pages/*.html` (subfolder):
```html
<link href="../css/styles.css">
<script src="../js/data.js"></script>
<a href="../index.html">        ← Go up one level
<a href="cart.html">           ← Stay in same folder
```

**Remember:** `../` means "go up one folder level"

---

## ✅ Checklist Before Deployment

- [ ] All pages load without 404 errors
- [ ] CSS styles apply correctly
- [ ] Products display on all collection pages
- [ ] Add to cart works
- [ ] Checkout process works
- [ ] All links navigate correctly
- [ ] Responsive on mobile/tablet
- [ ] No console errors (F12)
- [ ] Images load (if any)
- [ ] Contact information is correct

---

## 🎨 Customization Tips

### Change Colors
Edit `css/styles.css` - look for CSS variables:
```css
:root {
  --forest: #2d5a3d;   /* Main green */
  --gold: #c8960c;     /* Accent gold */
  --cream: #faf6ed;    /* Light background */
}
```

### Change Contact Info
Edit `index.html` - search for "Contact" section

### Add Products
Edit `js/data.js` - add objects to PRODUCTS array

### Modify Navigation
Edit each HTML file's `<nav>` section

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Complete project documentation |
| `QUICK_START.md` | This file - quick setup guide |
| `docs/COLLECTION_PAGES.md` | Collection page details |
| `docs/NEW_COLLECTIONS_ADDED.md` | Recent updates |
| `docs/BROWSER_CACHE_FIX.md` | Cache troubleshooting |

---

## 🔥 Pro Tips

1. **Always hard refresh** after changes (`Ctrl+Shift+R`)
2. **Use version numbers** (?v=3) for cache busting
3. **Test in Incognito** to verify cache issues
4. **Check console** (F12) for errors
5. **Organize files** - keep structure clean
6. **Document changes** - update MD files
7. **Backup regularly** - copy project folder
8. **Test on mobile** - responsive design matters

---

## 📞 Need Help?

**Ravindar Nidigonda**
- Phone: +91 78936 39037
- Email: nidigondaravindar@gmail.com

---

## 🎯 Next Steps

1. ✅ Project is organized
2. ✅ All files are in correct folders
3. ✅ Paths are fixed
4. ✅ Ready to run

**Now:** Start the server and browse your site!
```powershell
npx http-server
```

Open: http://127.0.0.1:8080/index.html

**Enjoy! 🎉**
