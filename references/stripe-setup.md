# Stripe Integration Setup

## Prerequisites
- Stripe account (https://stripe.com)
- Test mode and Live mode keys

## Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Sign up for free account
3. Complete verification

## Step 2: Get API Keys

### Test Mode (Development)
1. Dashboard → Developers → API keys
2. Copy "Publishable key" (pk_test_...)
3. Copy "Secret key" (sk_test_...)

### Live Mode (Production)
1. Enable Live mode toggle
2. Copy "Publishable key" (pk_live_...)
3. Copy "Secret key" (sk_live_...)

## Step 3: Create Products and Prices

### Pro Plan
1. Dashboard → Products → Add product
2. Name: "Pro Plan"
3. Price: $49/month
4. Billing: Recurring
5. Copy Price ID: `price_...`

### Managed Plan
1. Create another product
2. Name: "Managed Plan"
3. Price: $499/month
4. Copy Price ID: `price_...`

## Step 4: Environment Variables

### Development
```
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_STRIPE_PRICE_ID_PRO=price_...
VITE_STRIPE_PRICE_ID_MANAGED=price_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Production
Replace `pk_test_` with `pk_live_` and `sk_test_` with `sk_live_`

## Step 5: Webhook Setup

1. Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy Webhook Secret: `whsec_...`

## Step 6: Test Checkout

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

### Test Flow
1. Go to `/checkout?plan=pro`
2. Enter test email
3. Use test card
4. Verify success page

## Troubleshooting

### "Stripe failed to load"
- Check public key is correct
- Verify key format (pk_test_ or pk_live_)
- Check environment variables

### Webhook not firing
- Verify webhook URL is accessible
- Check webhook secret in code
- Monitor webhook logs in Stripe dashboard

### Payment declined
- Use correct test card
- Check card details
- Verify amount in cents
