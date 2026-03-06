# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Start Server
```bash
npm run dev
```

### 2. Test API
```bash
# Forgot Password
curl -X POST http://localhost:8080/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'

# Reset Password
curl -X POST http://localhost:8080/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"your-token","password":"newpass"}'
```

### 3. Use Thunder Client
- Import `thunder-client-tests.json`
- Run tests
- Check responses

---

## 📋 What's Included

✅ **API Endpoints**
- POST /forgot-password
- POST /reset-password

✅ **Security**
- Token hashing (SHA-256)
- Password hashing (bcryptjs)
- Email enumeration prevention
- 15-minute token expiry

✅ **Documentation**
- API documentation
- Setup guides
- Test reports
- Deployment checklist

✅ **Testing**
- Thunder Client collection
- Test cases
- API verification

---

## 🔧 Configuration

### .env File
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

### Get Gmail App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select Mail + Windows
3. Generate password
4. Copy to .env

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| API_DOCUMENTATION_PASSWORD_RESET.md | API details |
| GMAIL_SETUP_GUIDE.md | Email setup |
| TESTING_GUIDE.md | How to test |
| PRODUCTION_DEPLOYMENT_CHECKLIST.md | Deployment |
| IMPLEMENTATION_SUMMARY.md | Overview |

---

## ✅ Verify Installation

```bash
# 1. Server running?
curl http://localhost:8080/

# 2. API working?
curl -X POST http://localhost:8080/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# 3. Check logs
# Look for: "User found for password reset"
```

---

## 🎯 Next Steps

1. Configure Gmail credentials
2. Test email sending
3. Integrate with frontend
4. Deploy to production

---

**Ready to go! 🚀**
