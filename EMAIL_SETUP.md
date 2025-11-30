# EmailJS Setup Guide for Chat Inquiry Feature

This guide explains how to set up EmailJS to enable the chat inquiry email functionality that sends chat conversations to new@rion.kr.

## ⚠️ IMPORTANT: Current Status

**The email functionality is currently NOT configured and will show an error message until properly set up.**

Error you might see: `"The Public Key is invalid. To find this ID, visit https://dashboard.emailjs.com/admin/account"`

## Overview

The chat system includes a feature that allows users to send their chat conversation history directly to new@rion.kr via email. This is implemented using EmailJS, a service that allows sending emails directly from the frontend.

**Without proper EmailJS setup, users will see a configuration error message instead of being able to send emails.**

## Setup Steps

### 1. Create EmailJS Account
1. Visit [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID** (e.g., `service_rionco`)

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use the following template structure:

```
Subject: 채팅 문의 내역 - {{subject}}

From: {{from_name}}
To: {{to_email}}

{{message}}

---
This email was sent from RION.co chat system.
```

4. Set the template variables:
   - `to_email`: new@rion.kr
   - `from_name`: 리온코 채팅 시스템
   - `subject`: Will be auto-generated with date
   - `message`: The formatted chat conversation
   - `reply_to`: noreply@rion.kr

5. Note down the **Template ID** (e.g., `template_chat_inquiry`)

### 4. Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `your_public_key_here`)

### 5. Update Environment Variables
Update your `.env.local` file with the actual values:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## How It Works

1. Users chat with the AI assistant
2. When they want to send their inquiry to RION.co, they click the mail icon in the chat header
3. The system formats the entire conversation with timestamps
4. EmailJS sends the formatted conversation to new@rion.kr
5. Users see a success/error message

## Email Format

The emails sent will include:
- Conversation timestamp
- All messages with sender identification (고객/리온코 AI)
- Individual message timestamps
- Formatted content with proper line breaks

## Testing

To test the functionality:
1. Start a chat conversation
2. Send a few messages back and forth
3. Click the mail icon in the chat header
4. Check new@rion.kr for the email

## Troubleshooting

### "The Public Key is invalid" Error
This is the most common error and means EmailJS is not properly configured:

1. **Check .env.local file**: Make sure you've replaced the placeholder values:
   ```
   VITE_EMAILJS_SERVICE_ID=REPLACE_WITH_ACTUAL_SERVICE_ID  ❌
   VITE_EMAILJS_SERVICE_ID=service_abc123                 ✅
   ```

2. **Verify EmailJS Account**: 
   - Go to [https://dashboard.emailjs.com/admin/account](https://dashboard.emailjs.com/admin/account)
   - Copy your actual Public Key (starts with something like `user_` or similar)

3. **Check Service and Template IDs**:
   - Service ID: Found in EmailJS dashboard → Email Services
   - Template ID: Found in EmailJS dashboard → Email Templates

4. **Restart Development Server**: After updating .env.local, restart with `npm run dev`

### Other Common Issues
- **Email not sending**: Check that all environment variables are set correctly
- **Template errors**: Ensure the EmailJS template matches the expected format
- **Service issues**: Verify your email service is properly configured in EmailJS
- **Rate limits**: EmailJS free tier has monthly limits (200 emails/month)
- **CORS errors**: EmailJS should work from localhost and deployed domains

## Security Notes

- The EmailJS public key is safe to expose in frontend code
- All sensitive configuration is handled by EmailJS servers
- No email credentials are stored in the frontend application
