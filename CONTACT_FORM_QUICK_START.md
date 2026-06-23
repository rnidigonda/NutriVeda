# 🚀 Contact Form - Quick Start Guide

## ✅ What's Done

The contact form is **fully implemented** with:
- ✅ Email notifications (via EmailJS)
- ✅ WhatsApp notifications (via direct link)
- ✅ Form validation (phone, email, required fields)
- ✅ Success/error messages
- ✅ Loading states
- ✅ Auto form reset after success

---

## ⚡ 5-Minute Setup (Required)

To make the form work, you need to configure EmailJS:

### Step 1: Create EmailJS Account (2 minutes)
1. Go to: **https://www.emailjs.com/**
2. Click **Sign Up** (FREE - 200 emails/month)
3. Use: `nidigondaravindar@gmail.com`

### Step 2: Connect Gmail (1 minute)
1. Dashboard → **Email Services** → **Add New Service**
2. Select **Gmail** → **Connect Account**
3. Authorize your Gmail
4. Copy **Service ID** (looks like: `service_abc1234`)

### Step 3: Create Email Template (1 minute)
1. Dashboard → **Email Templates** → **Create New Template**
2. Template Name: `nutriveda_enquiry`
3. Subject: `🔔 New Enquiry from {{from_name}} | NutriVeda`
4. Body:
```
New Customer Enquiry!

👤 Name: {{from_name}}
📞 Phone: {{from_phone}}
📧 Email: {{from_email}}
🛒 Interest: {{product_interest}}

Message: {{message}}
```
5. To Email: `nidigondaravindar@gmail.com`
6. Save and copy **Template ID** (looks like: `template_xyz5678`)

### Step 4: Get Public Key (30 seconds)
1. Dashboard → **Account** → **General**
2. Copy your **Public Key** (looks like: `abcd1234EFGH5678`)

### Step 5: Update Website (30 seconds)
1. Open: `index.html`
2. Find line 255: `publicKey: "YOUR_EMAILJS_PUBLIC_KEY"`
3. Replace with: `publicKey: "abcd1234EFGH5678"`
4. Find line 332: `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID'`
5. Replace with: `emailjs.send('service_abc1234', 'template_xyz5678'`

**Save file and refresh browser!** ✅

---

## 🧪 Test the Form

1. Open: `http://127.0.0.1:8080/index.html`
2. Scroll to **Contact** section
3. Fill form:
   - Name: Test User
   - Phone: 9876543210
   - Email: test@example.com
   - Message: Testing form
4. Click **Send Enquiry**
5. Check your Gmail: `nidigondaravindar@gmail.com`

**Expected Results:**
- ✅ Form shows "Sending..." message
- ✅ WhatsApp opens in new tab
- ✅ Success message appears
- ✅ Form resets automatically
- ✅ Email arrives in Gmail inbox

---

## 📱 How WhatsApp Works

When form is submitted:
1. Email is sent via EmailJS ✉️
2. WhatsApp opens with pre-filled message 📱
3. Message goes to: **+91 78936 39037**

WhatsApp message format:
```
🔔 New Enquiry from NutriVeda Website

👤 Name: [Customer Name]
📞 Phone: [Customer Phone]
📧 Email: [Customer Email]
🛒 Interest: [Product Category]
💬 Message: [Customer Message]
```

---

## ❌ Troubleshooting

### "Failed to send enquiry" error
- ❌ EmailJS keys not configured correctly
- ❌ Gmail not connected in EmailJS
- ❌ Monthly limit exceeded (200 emails)
- ✅ Solution: Double-check all 3 IDs (Service, Template, Public Key)

### Email not received
- ❌ Check spam/junk folder
- ❌ Verify template has correct "To Email"
- ✅ Solution: Check EmailJS dashboard → Logs

### WhatsApp not opening
- ❌ Popup blocker enabled
- ❌ WhatsApp not installed
- ✅ Solution: Allow popups for your site or use WhatsApp Web

---

## 📊 Form Validation

Built-in validation:
- ✅ Name: Required (minimum 2 characters)
- ✅ Phone: Required (10 digits, Indian format)
- ✅ Email: Required (valid email format)
- ✅ Message: Required (minimum 10 characters)
- ✅ Product Interest: Optional (dropdown)

---

## 💰 EmailJS Pricing

- **Free:** 200 emails/month (Perfect for starting out)
- **Personal:** $6.50/month → 1,000 emails
- **Business:** $12.50/month → 5,000 emails

For most small businesses, FREE tier is enough!

---

## 🎯 What You Get

After setup, every form submission automatically:
1. ✅ Sends email to `nidigondaravindar@gmail.com`
2. ✅ Opens WhatsApp with notification
3. ✅ Shows success message to customer
4. ✅ Resets form for next enquiry
5. ✅ Validates all data before sending

---

## 📚 Full Documentation

Need more details? Check:
- **CONTACT_FORM_SETUP.md** - Complete setup guide
- **ALTERNATIVE_FORM_SOLUTIONS.md** - Other options (Formspree, Web3Forms, etc.)

---

## 📞 Need Help?

Contact me:
- **Email:** nidigondaravindar@gmail.com
- **Phone:** +91 78936 39037
- **EmailJS Docs:** https://www.emailjs.com/docs/

---

## ✅ Setup Checklist

- [ ] Created EmailJS account
- [ ] Connected Gmail service
- [ ] Created email template
- [ ] Got Service ID
- [ ] Got Template ID
- [ ] Got Public Key
- [ ] Updated `index.html` with all 3 IDs
- [ ] Tested form with dummy data
- [ ] Received email in Gmail
- [ ] WhatsApp opened correctly
- [ ] **DONE!** 🎉

---

**Time to Setup:** 5 minutes  
**Cost:** FREE  
**Monthly Limit:** 200 enquiries  
**Maintenance:** Zero  

**Status:** ✅ Ready to use after EmailJS configuration

---

**Last Updated:** June 22, 2026  
**Developer:** NutriVeda Team
