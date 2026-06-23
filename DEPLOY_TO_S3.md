# 🚀 Deploy NutriVeda to AWS S3 - Step by Step

## 📋 Pre-Deployment Checklist

### ✅ Files Ready for Production
- [x] Demo mode toggle in `config.js`
- [x] Contact form working (Web3Forms)
- [x] Shopping cart functional
- [x] Product catalog complete
- [x] User session management
- [x] All images optimized
- [x] CSS minified (optional)
- [x] JavaScript cleaned

### ⚙️ Configuration Check

**Open `config.js` and verify:**

```javascript
const CONFIG = {
  DEMO_MODE: false,  // ← Set to false for production
  ENABLE_SMS_OTP: false,  // ← Set to true when backend is ready
  API_BASE_URL: 'your-api-url',  // ← Update with your API
  // ... rest is configured
};
```

---

## 🏗️ Method 1: Deploy Using AWS Console (Easiest)

### Step 1: Create S3 Bucket

1. **Go to AWS Console** → S3
2. **Click "Create bucket"**
3. **Bucket settings:**
   - Name: `nutriveda-website` (must be globally unique, try: `nutriveda-store-2025`)
   - Region: `ap-south-1` (Mumbai - recommended for India)
   - Uncheck "Block all public access" ✅
   - Acknowledge warning ✅
4. **Click "Create bucket"**

### Step 2: Enable Static Website Hosting

1. **Click on your bucket**
2. **Go to "Properties" tab**
3. **Scroll to "Static website hosting"**
4. **Click "Edit"**
5. **Settings:**
   - Enable: **Static website hosting**
   - Hosting type: **Host a static website**
   - Index document: `index.html`
   - Error document: `index.html`
6. **Click "Save changes"**
7. **Note the endpoint URL** (will look like):
   ```
   http://nutriveda-website.s3-website.ap-south-1.amazonaws.com
   ```

### Step 3: Set Bucket Policy (Make it Public)

1. **Go to "Permissions" tab**
2. **Scroll to "Bucket Policy"**
3. **Click "Edit"**
4. **Paste this policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nutriveda-website/*"
    }
  ]
}
```

**⚠️ IMPORTANT:** Replace `nutriveda-website` with YOUR actual bucket name!

5. **Click "Save changes"**

### Step 4: Upload Website Files

#### Option A: Drag & Drop (Simplest)

1. **Go to "Objects" tab**
2. **Click "Upload"**
3. **Drag these folders/files:**
   ```
   ✅ css/
   ✅ js/
   ✅ pages/
   ✅ assets/ (if you have images)
   ✅ config.js
   ✅ index.html
   ✅ All collection HTML files (amla.html, baby-care.html, etc.)
   ```

4. **DO NOT upload:**
   ```
   ❌ .git/
   ❌ .vscode/
   ❌ *.md files
   ❌ *.zip files
   ❌ docs/ folder
   ❌ scripts/ folder
   ❌ node_modules/ (if any)
   ```

5. **Click "Upload"**
6. **Wait for completion** (should take 1-2 minutes)

#### Option B: AWS CLI (Faster for updates)

```bash
# Install AWS CLI first (if not installed)
# https://aws.amazon.com/cli/

# Configure AWS CLI (one-time setup)
aws configure
# Enter your Access Key ID
# Enter your Secret Access Key
# Region: ap-south-1
# Output format: json

# Navigate to your website folder
cd c:\vs_workSpace\nutriveda-website\nutriveda

# Upload all files
aws s3 sync . s3://nutriveda-website ^
  --exclude ".git/*" ^
  --exclude ".vscode/*" ^
  --exclude "*.md" ^
  --exclude "*.zip" ^
  --exclude "docs/*" ^
  --exclude "scripts/*"

# Set proper content types
aws s3 cp s3://nutriveda-website s3://nutriveda-website --recursive ^
  --content-type "text/html" ^
  --exclude "*" ^
  --include "*.html" ^
  --metadata-directive REPLACE

aws s3 cp s3://nutriveda-website s3://nutriveda-website --recursive ^
  --content-type "text/css" ^
  --exclude "*" ^
  --include "*.css" ^
  --metadata-directive REPLACE

aws s3 cp s3://nutriveda-website s3://nutriveda-website --recursive ^
  --content-type "application/javascript" ^
  --exclude "*" ^
  --include "*.js" ^
  --metadata-directive REPLACE
```

### Step 5: Test Your Website

1. **Go back to "Properties" tab**
2. **Scroll to "Static website hosting"**
3. **Click the "Bucket website endpoint" URL**
4. **Your website should load!** 🎉

**Example URL:**
```
http://nutriveda-website.s3-website.ap-south-1.amazonaws.com
```

### Step 6: Test All Features

- ✅ Homepage loads
- ✅ Products page works
- ✅ Cart functions correctly
- ✅ Contact form sends (via Web3Forms)
- ✅ Login page displays (with demo mode or disabled message)
- ✅ Navigation works
- ✅ All images load

---

## 🌐 Method 2: Add Custom Domain (Optional but Recommended)

### Benefits:
- Professional: `www.nutriveda.com` instead of long S3 URL
- HTTPS/SSL (secure)
- Better for SEO
- Customer trust

### Cost: ~$2-3/month

### Quick Setup with CloudFront:

1. **Go to CloudFront** → Create Distribution
2. **Origin domain:** Select your S3 bucket
3. **Viewer protocol:** Redirect HTTP to HTTPS
4. **Default root object:** `index.html`
5. **Click "Create distribution"**
6. **Copy CloudFront domain** (e.g., `d111111abcdef8.cloudfront.net`)

### Connect Your Domain (if you have one):

1. **Go to Route 53** → Create hosted zone
2. **Domain name:** Your domain (e.g., `nutriveda.com`)
3. **Create record:**
   - Type: A
   - Alias: Yes
   - Route traffic to: CloudFront distribution
   - Select your distribution
4. **Update nameservers** at your domain registrar

**Detailed guide:** See `docs/CLOUDFRONT_SETUP.md`

---

## 🔐 Enable HTTPS (Free SSL via CloudFront)

1. **Go to Certificate Manager** (ACM)
2. **Request certificate**
3. **Domain names:** Add your domain
4. **Validation:** DNS or Email
5. **Wait for validation** (5-30 minutes)
6. **Go to CloudFront** → Edit distribution
7. **Alternate domain names:** Add your domain
8. **SSL certificate:** Select your ACM certificate
9. **Save changes**

---

## 🔄 Update Website (After Initial Deploy)

### When you make changes to files:

**Option 1: AWS Console**
1. Go to S3 bucket
2. Upload changed files
3. Confirm replacement

**Option 2: AWS CLI (Faster)**
```bash
# Update single file
aws s3 cp index.html s3://nutriveda-website/index.html

# Update entire folder
aws s3 sync . s3://nutriveda-website --exclude ".git/*"

# Clear CloudFront cache (if using CloudFront)
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## 💰 Cost Breakdown

### Basic S3 Static Website:
| Item | Monthly Cost |
|------|--------------|
| Storage (100MB) | $0.023 |
| Requests (10,000) | $0.005 |
| Data Transfer (1GB) | $0.09 |
| **Total** | **$0.12/month** |

### With CloudFront (HTTPS):
| Item | Monthly Cost |
|------|--------------|
| S3 Storage | $0.023 |
| CloudFront (10GB) | $0.85 |
| SSL Certificate | FREE |
| **Total** | **$0.87/month** |

### With Custom Domain:
| Item | Cost |
|------|------|
| Domain (.com) | $12/year |
| Route 53 Hosted Zone | $0.50/month |
| **Total** | **$1.50/month** |

**Grand Total with everything: ~$2.50/month**

---

## 🆘 Troubleshooting

### Issue: "403 Forbidden" Error
**Solution:**
- Check bucket policy is correct
- Verify "Block public access" is OFF
- Ensure files are uploaded correctly

### Issue: "404 Not Found" on pages
**Solution:**
- Error document set to `index.html`
- All HTML files uploaded
- Check file paths are relative (should be `pages/products.html` not `/pages/products.html`)

### Issue: CSS/JS Not Loading
**Solution:**
- Check paths in HTML files
- Verify files uploaded to correct folders
- Clear browser cache (Ctrl+Shift+R)

### Issue: Contact Form Not Working
**Solution:**
- Verify Web3Forms access key in config.js
- Check browser console for errors
- Test form at: https://web3forms.com/

### Issue: Login Shows "SMS Disabled"
**Solution:**
- This is normal! SMS OTP needs backend setup
- Set `DEMO_MODE: true` in config.js for testing
- Or set `ENABLE_SMS_OTP: false` to disable login

---

## ✅ Production Checklist

Before going live:

- [ ] Set `DEMO_MODE: false` in config.js
- [ ] Update API URLs (if using backend)
- [ ] Test all pages load correctly
- [ ] Test contact form sends emails
- [ ] Test shopping cart works
- [ ] Test on mobile devices
- [ ] Check all images display
- [ ] Verify no console errors
- [ ] Enable CloudFront for HTTPS
- [ ] Set up custom domain (optional)
- [ ] Add Google Analytics (optional)
- [ ] Test with friends/family

---

## 🎉 You're Live!

Your website is now deployed! Share your URL:

**S3 URL:**
```
http://your-bucket-name.s3-website.ap-south-1.amazonaws.com
```

**CloudFront URL:**
```
https://d111111abcdef8.cloudfront.net
```

**Custom Domain:**
```
https://www.nutriveda.com
```

---

## 📞 Need Help?

**Owner:** Ravindar Nidigonda  
**Email:** nidigondaravindar@gmail.com  
**Phone:** +91 78936 39037

---

## 📚 Next Steps

1. **Set up SMS OTP backend** (optional)
   - See: `docs/LAMBDA_OTP_API.md`
   - Cost: ~$6/month for 1000 logins

2. **Add Google Analytics** (optional)
   - Track visitors and conversions
   - Free

3. **Set up order management** (optional)
   - Integrate payment gateway
   - Manage orders via dashboard

4. **Marketing:**
   - Share on social media
   - Google My Business listing
   - WhatsApp Business account

---

**🎊 Congratulations on your deployment!**
