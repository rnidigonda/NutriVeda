# 🚀 Production Deployment Guide - NutriVeda Website

## 📋 Overview
This guide helps you deploy the NutriVeda website to AWS S3 as a static website with production-ready features.

---

## ✅ Pre-Deployment Checklist

### 1. **Remove Demo Mode**
- ✅ All demo alerts and debug logs removed
- ✅ Console logs removed from production code
- ✅ Demo OTP display boxes removed

### 2. **SMS OTP Integration**
For production OTP functionality, you need to integrate a real SMS service. Choose one:

#### **Option A: AWS SNS (Recommended for AWS users)**
- Cost: ~$0.00645 per SMS in India
- Setup time: 15 minutes
- [Setup Guide](#aws-sns-setup)

#### **Option B: Twilio**
- Cost: ~$0.0079 per SMS in India
- Setup time: 10 minutes
- Free trial: $15 credit
- [Setup Guide](#twilio-setup)

#### **Option C: MSG91**
- Cost: Starting at ₹0.15 per SMS
- Popular in India
- [Setup Guide](#msg91-setup)

#### **Option D: Fast2SMS**
- Cost: Starting at ₹0.10 per SMS
- Indian service
- [Setup Guide](#fast2sms-setup)

---

## 🔧 Backend API Required

Since S3 is static hosting, you need a backend API to send OTP securely. Options:

### **Option 1: AWS Lambda + API Gateway (Recommended)**
- Serverless, scales automatically
- Pay per request (~$0.0000002 per request)
- [Setup Guide](#lambda-api-setup)

### **Option 2: Heroku Free Tier**
- Simple Node.js/Python backend
- Free tier available
- [Setup Guide](#heroku-api-setup)

### **Option 3: Vercel Serverless Functions**
- Free for personal projects
- Easy deployment
- [Setup Guide](#vercel-api-setup)

---

## 📦 What's Ready for Production

### ✅ Already Production-Ready:
1. **Contact Form** - Uses Web3Forms (already configured)
2. **Shopping Cart** - Client-side localStorage
3. **Product Catalog** - Static data in `data.js`
4. **Navigation & UI** - Fully responsive
5. **User Session Management** - Client-side with localStorage

### ⚠️ Needs Backend Integration:
1. **OTP SMS Sending** - Requires backend API
2. **OTP Verification** - Requires backend API
3. **User Database** (Optional) - If you want to persist users

---

## 🛠️ Quick Production Setup (Without SMS)

If you want to deploy **without SMS OTP** for now:

### **Simple Email-Based Login Alternative**
1. Replace OTP with email magic links
2. Use services like:
   - **Auth0** (Free tier: 7,000 users)
   - **Firebase Auth** (Free tier: 10k verifications/month)
   - **Supabase** (Free tier included)

[See Alternative Auth Guide](#alternative-auth)

---

## 📤 S3 Deployment Steps

### Step 1: Prepare Files
```bash
# In your nutriveda folder
# Ensure all paths are relative (already done)
```

### Step 2: Create S3 Bucket
1. Go to AWS S3 Console
2. Click "Create bucket"
3. Bucket name: `nutriveda-website` (must be globally unique)
4. Region: `ap-south-1` (Mumbai) - Recommended for India
5. Uncheck "Block all public access" ✅
6. Click "Create bucket"

### Step 3: Configure Static Website Hosting
1. Select your bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Enable "Static website hosting"
6. Index document: `index.html`
7. Error document: `index.html`
8. Save changes

### Step 4: Set Bucket Policy
1. Go to **Permissions** tab
2. Scroll to **Bucket Policy**
3. Click **Edit**
4. Paste this policy:

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
**Note:** Replace `nutriveda-website` with your bucket name

5. Save changes

### Step 5: Upload Files
```bash
# Option A: Using AWS CLI
aws s3 sync . s3://nutriveda-website --exclude ".git/*" --exclude "*.md" --exclude "*.zip"

# Option B: Using AWS Console
# 1. Click "Upload"
# 2. Drag and drop all files/folders EXCEPT:
#    - .git folder
#    - .vscode folder
#    - *.md files (documentation)
#    - *.zip files
# 3. Click "Upload"
```

### Step 6: Access Your Website
Your website URL will be:
```
http://nutriveda-website.s3-website.ap-south-1.amazonaws.com
```
(Replace bucket name and region as needed)

---

## 🌐 Custom Domain Setup (Optional)

### Using CloudFront + Route53
1. **Create CloudFront Distribution**
   - Origin: Your S3 website endpoint
   - Enable HTTPS (free SSL via ACM)
   
2. **Configure Route53**
   - Create hosted zone for your domain
   - Add A record pointing to CloudFront

3. **Total Cost**: ~$1-2/month for small traffic

[Detailed Guide](#custom-domain-setup)

---

## 🔐 Security Recommendations

### 1. Enable HTTPS
```
Use CloudFront for SSL/TLS (free certificate)
```

### 2. Set Cache Headers
```
Cache-Control: public, max-age=31536000 for CSS/JS
Cache-Control: public, max-age=3600 for HTML
```

### 3. Enable Versioning
```
S3 → Properties → Bucket Versioning → Enable
```

### 4. Set CORS Policy (if using APIs)
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "POST"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": []
  }
]
```

---

## 💰 Cost Estimate (S3 Static Website)

### Monthly Costs:
| Service | Usage | Cost |
|---------|-------|------|
| S3 Storage | 100 MB | $0.023 |
| S3 Requests | 10,000 | $0.005 |
| Data Transfer | 1 GB | $0.09 |
| **Total** | | **~$0.12/month** |

### With SMS OTP (1000 logins/month):
| Service | Cost |
|---------|------|
| AWS SNS SMS | $6.45 |
| Lambda (API) | $0.20 |
| **Total** | **~$6.77/month** |

---

## 🔥 Current Status

### What Works Without Backend:
- ✅ All pages load perfectly
- ✅ Products display and filter
- ✅ Cart functionality (localStorage)
- ✅ Contact form (Web3Forms)
- ✅ Navigation and responsive design

### What Needs Backend:
- ⚠️ SMS OTP login
- ⚠️ OTP verification

---

## 📞 Next Steps

Choose your path:

### **Path A: Quick Deploy (No Auth Changes)**
1. Deploy to S3 now
2. Disable login temporarily
3. Add backend + SMS later

### **Path B: Replace with Email Auth**
1. Integrate Firebase/Auth0
2. Deploy with working auth
3. Cost: $0 (free tier)

### **Path C: Full SMS OTP Implementation**
1. Set up Lambda API
2. Configure AWS SNS
3. Deploy with SMS OTP
4. Cost: ~$7/month

---

## 📚 Detailed Guides

### AWS SNS Setup
[See `docs/AWS_SNS_SETUP.md`]

### Lambda API Setup
[See `docs/LAMBDA_API_SETUP.md`]

### Alternative Auth Methods
[See `docs/ALTERNATIVE_AUTH.md`]

---

## 🆘 Support

For questions:
- **Owner**: Ravindar Nidigonda
- **Email**: nidigondaravindar@gmail.com
- **Phone**: +91 78936 39037

---

**Ready to deploy? Follow [S3 Deployment Steps](#s3-deployment-steps) above!**
