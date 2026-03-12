# Vercel Deployment Guide for Pandan Labs

## ✅ Issues Fixed
1. ✅ Node.js version updated to 24.x
2. ✅ Form field mapping corrected in contact.html
3. ✅ Build and start scripts added to package.json
4. ✅ vercel.json optimized for static site with serverless functions

---

## 🔧 REQUIRED SETUP STEPS

### Step 1: Set Environment Variables in Vercel Dashboard

Go to your Vercel project settings → "Environment Variables" and add:

```
GMAIL_USER = your-email@gmail.com
GMAIL_APP_PASSWORD = your-app-specific-password
```

**Where to get these?**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows" → Generate
3. Copy the 16-character password
4. Paste it as `GMAIL_APP_PASSWORD` in Vercel

### Step 2: Verify API Route Structure

The API route at `/api/send-email` uses **ES modules** (import/export).
Make sure your `vercel.json` is configured correctly ✅ (already done)

### Step 3: Test Email Sending Locally

```bash
# Install dependencies
npm install

# Set local environment variables in .env or .env.local
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Test by running API
node api/send-email.js
```

### Step 4: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## ✅ What's Already Configured

| Item | Status | Details |
|------|--------|---------|
| Node.js Version | ✅ | Set to 24.x in package.json |
| Build Command | ✅ | Uses echo (no build needed for static site) |
| Start Command | ✅ | Defined in package.json |
| API Routes | ✅ | `/api/send-email` enabled in vercel.json |
| Static Files | ✅ | All HTML/CSS/JS served from root |

---

## ⚠️ Known Limitations & Recommendations

1. **Email Domain**: Currently using Gmail with app-specific passwords
   - Consider upgrading to a business email service for production
   - Recommended: SendGrid, Mailgun, or Resend

2. **Form Fields**: Currently supported:
   - fname, lname, email, phone, company, service, budget, message, newsletter
   - Any new fields require updates to both form HTML and API handler

3. **Rate Limiting**: No rate limiting implemented
   - Consider adding in future for spam protection

4. **CORS**: API is open to all origins
   - May want to restrict to your domain in production

---

## 🧪 Testing Checklist Before Going Live

- [ ] Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` in Vercel Environment Variables
- [ ] Test contact form on staging deployment
- [ ] Verify emails arrive at info.pandanlabs@gmail.com
- [ ] Verify confirmation email reaches user
- [ ] Test mobile responsiveness
- [ ] Check all image asset paths work correctly
- [ ] Verify all external links (LinkedIn, Facebook, WhatsApp) work

---

## 🆘 Troubleshooting

### "Failed to send email" error
**Solution**: Check if environment variables are set in Vercel dashboard

### Form not submitting
**Solution**: Open browser DevTools → Network tab → check `/api/send-email` response

### "Method not allowed" (405)
**Solution**: Ensure POST method is being used. Check form method attribute.

### Emails not arriving
**Solution**: 
1. Check Gmail app-specific password is correct
2. Check Gmail "Less Secure App Access" isn't blocking
3. Verify recipient email in code

---

## 📝 File Changes Made

- `package.json` - Added start and build scripts
- `vercel.json` - Removed empty buildCommand, kept outputDirectory
- `contact.html` - Fixed form field mapping (fname, lname)
- `Node.js version` - Updated to 24.x

---

Last Updated: March 13, 2026
